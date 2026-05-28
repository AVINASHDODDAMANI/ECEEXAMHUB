import validator from "validator";

export function normalizeIdentifier(value) {
  const rawValue = String(value || "").trim();

  if (!rawValue) {
    return { error: "Enter an email address or phone number." };
  }

  if (validator.isEmail(rawValue)) {
    return {
      channel: "email",
      field: "email",
      value: validator.normalizeEmail(rawValue, { gmail_remove_dots: false }),
    };
  }

  const compactPhone = rawValue.replace(/[^\d+]/g, "");
  const phoneWithCountry =
    compactPhone.startsWith("+")
      ? compactPhone
      : compactPhone.length === 10
        ? `+91${compactPhone}`
        : compactPhone;

  if (validator.isMobilePhone(phoneWithCountry, "any", { strictMode: true })) {
    return {
      channel: "phone",
      field: "phone",
      value: phoneWithCountry,
    };
  }

  return { error: "Enter a valid email address or phone number with country code." };
}

export function maskIdentifier(identifier, channel) {
  if (channel === "email") {
    const [name, domain] = identifier.split("@");
    const safeName =
      name.length <= 2 ? `${name[0] || "*"}*` : `${name.slice(0, 2)}***${name.slice(-1)}`;
    return `${safeName}@${domain}`;
  }

  return `${identifier.slice(0, 3)}*****${identifier.slice(-2)}`;
}
