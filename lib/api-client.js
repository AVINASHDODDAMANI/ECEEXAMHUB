function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

async function parseResponse(response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || `Request failed (${response.status})`);
  }

  return payload;
}

export async function fetchQuestions(filters = {}, options = {}) {
  const query = buildQueryString(filters);
  const response = await fetch(`/api/questions${query}`, {
    cache: "no-store",
    signal: options.signal,
  });
  const payload = await parseResponse(response);
  return Array.isArray(payload.questions) ? payload.questions : [];
}

export async function fetchFilters(filters = {}, options = {}) {
  const query = buildQueryString(filters);
  const response = await fetch(`/api/questions/filters${query}`, {
    cache: "no-store",
    signal: options.signal,
  });
  return parseResponse(response);
}
