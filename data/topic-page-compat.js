function normalizeFormula(formula) {
  if (!formula) {
    return null;
  }

  if (Array.isArray(formula)) {
    return {
      label: formula[0] || "Formula",
      expression: formula[1] || "",
      note: formula[2] || "",
    };
  }

  return formula;
}

export function enrichTopicPage(topic, subjectName = "ECE") {
  const formulaList = (topic.formulas || [])
    .map(normalizeFormula)
    .filter(Boolean);
  const primaryFormula = normalizeFormula(topic.formula);
  const formulas = formulaList.length ? formulaList : primaryFormula ? [primaryFormula] : [];
  const keyConcepts = topic.keyConcepts || topic.concepts || [];

  return {
    ...topic,
    shortTitle: topic.shortTitle || topic.title,
    metaTitle: topic.metaTitle || `${topic.title} | GATE ${subjectName} Notes`,
    metaDescription:
      topic.metaDescription ||
      `${topic.summary || `Learn ${topic.title}`} with formulas, examples, exam notes, and revision support.`,
    keywords: topic.keywords || `GATE ${subjectName}, ${topic.title}, ECE notes`,
    coreQuestion: topic.coreQuestion || `What should I understand first in ${topic.title}?`,
    examFocus: topic.examFocus || keyConcepts.slice(0, 3).join(", ") || topic.title,
    engineeringUse:
      topic.engineeringUse ||
      `Used in ${subjectName} problem solving, circuit interpretation, design, and exam preparation.`,
    intro:
      topic.intro ||
      topic.overview || [
        topic.summary || `${topic.title} is an important topic in ${subjectName}.`,
        "Study it through the core idea, formula meaning, common mistakes, and exam-style applications.",
      ],
    intuition:
      topic.intuition ||
      topic.visualFocus ||
      `Read ${topic.title} as a physical or system behavior before memorizing formulas.`,
    learningGoals:
      topic.learningGoals || [
        `Understand the core idea of ${topic.title}.`,
        "Recognize important variables, diagrams, and assumptions.",
        "Apply the concept in GATE and university exam questions.",
      ],
    keyConcepts,
    theoryCards:
      topic.theoryCards ||
      topic.coreTheory || [
        { title: "Core idea", detail: topic.summary || `${topic.title} core theory.` },
        {
          title: "How to read exam questions",
          detail: `Identify the given data, assumptions, and asked quantity before applying ${topic.title} formulas.`,
        },
        {
          title: "Visualization focus",
          detail: topic.visualFocus || topic.visualization?.focus || "Connect the diagram with the formula.",
        },
      ],
    formulas,
    examples:
      topic.examples || [
        {
          title: `${topic.title} exam check`,
          prompt: `A question asks about ${topic.title}. What is the safest first step?`,
          steps: [
            "Identify the topic variables and diagram labels.",
            "Recall the main formula or concept.",
            "Check assumptions before substituting values.",
          ],
          answer: "Start from the concept and assumptions, then apply the formula.",
        },
      ],
    examPointers:
      topic.examPointers ||
      topic.examNotes || [
        "Start from the diagram or definition before using formulas.",
        "Check units, signs, and assumptions in numerical questions.",
      ],
    commonMistakes:
      topic.commonMistakes ||
      topic.mistakes || [
        "Memorizing the formula without checking its assumptions.",
        "Mixing similar-looking terms from nearby topics.",
      ],
    quickRevision:
      topic.quickRevision || [
        topic.summary || `${topic.title} quick revision.`,
        keyConcepts.length ? `High-yield terms: ${keyConcepts.join(", ")}.` : "Revise definitions and formulas together.",
      ],
    relatedTopics: topic.relatedTopics || [],
  };
}
