const informationTheory = {
  "slug": "information-theory",
  "title": "09 Information Theory",
  "shortTitle": "Information Theory",
  "summary": "Information Theory measures uncertainty, information content, and the ultimate rate limits of reliable communication through entropy and channel capacity.",
  "metaTitle": "Information Theory | Entropy and Channel Capacity Notes for GATE ECE",
  "metaDescription": "Learn Information Theory with entropy, information content, channel capacity, coding intuition, and exam-focused Communication Systems notes for GATE ECE and PSU.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, information theory, entropy, channel capacity",
  "coreQuestion": "How do we measure information and the maximum reliable rate of communication?",
  "examFocus": "Self information, entropy, redundancy, source coding intuition, error control idea, and Shannon channel capacity.",
  "engineeringUse": "Compression, coding design, storage efficiency, wireless system limits, and data-network planning.",
  "intro": [
    "Information Theory is about quantifying uncertainty and asking how efficiently information can be represented and transmitted.",
    "This chapter is important because it links probability with communication limits. It explains why some sources are more compressible and why every noisy channel has a practical rate boundary."
  ],
  "intuition": "A highly predictable message tells you little when it arrives; a surprising message carries more information.",
  "overview": [
    "Self information measures the information in a single event. Rare events carry more information because they reduce more uncertainty.",
    "Entropy is the average information per source symbol and acts like a measure of source uncertainty.",
    "Channel capacity gives the maximum reliable communication rate under channel constraints, which is why it is central in modern digital systems."
  ],
  "learningGoals": [
    "Explain why rare events carry more information than expected events.",
    "Interpret entropy as average uncertainty of a source.",
    "Understand channel capacity as a fundamental communication limit."
  ],
  "keyConcepts": [
    "Information is tied to uncertainty reduction.",
    "Entropy is larger when symbols are more unpredictable.",
    "Coding reduces redundancy to use resources more efficiently.",
    "Capacity sets an upper bound on reliable transmission rate."
  ],
  "formulas": [
    {
      "label": "Self information",
      "expression": "I(x) = log2(1/p(x))",
      "note": "Less probable events carry more information."
    },
    {
      "label": "Entropy",
      "expression": "H = -sum p(x) log2 p(x)",
      "note": "Entropy is the average information content of a source."
    },
    {
      "label": "Shannon capacity",
      "expression": "C = B log2(1 + S/N)",
      "note": "Capacity connects bandwidth and SNR to the theoretical rate limit."
    }
  ],
  "theoryCards": [
    {
      "title": "Surprise and information",
      "detail": "If an event was almost certain, receiving it adds little new knowledge. If it was rare, it gives more information."
    },
    {
      "title": "Entropy meaning",
      "detail": "Entropy is high when source outcomes are uncertain and more evenly distributed. It is low when one outcome dominates strongly."
    },
    {
      "title": "Source coding",
      "detail": "Source coding removes redundancy so the message can be represented more efficiently."
    },
    {
      "title": "Capacity meaning",
      "detail": "Capacity is not the currently used rate. It is the highest theoretically reliable rate for the channel model and conditions."
    }
  ],
  "examples": [
    {
      "title": "Identify the higher-information event",
      "prompt": "Which carries more information: an event with probability 0.9 or 0.1?",
      "steps": [
        "Lower probability means greater surprise.",
        "Greater surprise means more information.",
        "So the event with probability 0.1 carries more information."
      ],
      "answer": "The event with probability 0.1 carries more information."
    }
  ],
  "examPointers": [
    "Rare event means more information, not less.",
    "Entropy is an average quantity over all source events.",
    "Capacity is a rate limit, not a code design itself."
  ],
  "commonMistakes": [
    "Thinking common events carry more information because they happen more often.",
    "Confusing entropy with channel capacity.",
    "Treating capacity as the actual data rate used in every system."
  ],
  "quickRevision": [
    "More surprise means more information.",
    "Entropy measures average uncertainty.",
    "Capacity gives the maximum reliable rate."
  ],
  "insightSummary": "Information Theory feels abstract at first, but it becomes intuitive once you connect it to uncertainty, surprise, and efficiency.",
  "formulaHighlights": [
    "I(x) = log2(1/p(x))",
    "H = -sum p(x) log2 p(x)",
    "C = B log2(1 + S/N)"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "noise-in-communication-systems"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "digital-communication"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "digital-modulation-techniques"
    }
  ],
  "subjectSlug": "communications",
  "concepts": [
    "Information is tied to uncertainty reduction.",
    "Entropy is larger when symbols are more unpredictable.",
    "Coding reduces redundancy to use resources more efficiently.",
    "Capacity sets an upper bound on reliable transmission rate."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "09 Information Theory",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default informationTheory;
