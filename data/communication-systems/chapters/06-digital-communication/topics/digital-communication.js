const digitalCommunication = {
  "slug": "digital-communication",
  "title": "06 Digital Communication",
  "shortTitle": "Digital Communication",
  "summary": "Digital Communication converts analog or discrete information into binary-friendly forms using sampling, quantization, encoding, and tracking methods such as PCM and delta modulation.",
  "metaTitle": "Digital Communication | PCM and Quantization Notes for GATE ECE",
  "metaDescription": "Study Digital Communication with PCM encoding, quantization, binary flow, delta modulation, and quantization error intuition using Communication Systems notes for GATE ECE.",
  "keywords": "GATE ECE Communication Systems, PSU Communication Systems, Communication Systems notes, university exam preparation, digital communication, PCM, quantization, delta modulation",
  "coreQuestion": "How does an analog message become a stream of binary-friendly symbols?",
  "examFocus": "PCM blocks, quantization, encoding, companding intuition, delta modulation, and quantization error.",
  "engineeringUse": "Telephony, storage systems, digital voice links, telemetry, and computer-network interfaces.",
  "intro": [
    "Digital communication converts signals into forms that are easier to regenerate, store, process, and protect against many channel impairments.",
    "PCM is the classic chain: sample, quantize, and encode. Delta modulation simplifies the idea by tracking change instead of sending full amplitude levels every time."
  ],
  "intuition": "The system first measures the signal, then rounds it to allowed levels, then writes those levels in binary language.",
  "overview": [
    "Quantization is the key step where continuous amplitude becomes one of a finite set of levels. That makes binary encoding possible, but it also introduces quantization error.",
    "PCM is strong because repeaters can reconstruct clean digital levels more easily than noisy analog waveforms.",
    "Delta modulation is a more tracking-style approach in which the system sends only whether the signal should step up or down."
  ],
  "learningGoals": [
    "Explain the PCM chain from sampling to binary output.",
    "Interpret quantization as approximation to discrete levels.",
    "Understand why quantization error and slope overload appear in digital communication questions."
  ],
  "keyConcepts": [
    "Quantization replaces exact analog values with nearest allowed levels.",
    "Binary encoding labels each quantized level with a bit pattern.",
    "Quantization error is the price paid for discrete representation.",
    "Delta modulation sends direction of change rather than full sample value."
  ],
  "formulas": [
    {
      "label": "Quantization step idea",
      "expression": "e_q = x - x_q",
      "note": "Quantization error is the difference between original sample value and chosen quantized level."
    },
    {
      "label": "Bit requirement",
      "expression": "L = 2^n",
      "note": "If n bits are used, then 2^n quantization levels can be represented."
    },
    {
      "label": "PCM chain",
      "expression": "Sample -> Quantize -> Encode",
      "note": "This sequence is the high-yield memory line for PCM."
    }
  ],
  "theoryCards": [
    {
      "title": "Sampling before coding",
      "detail": "The analog signal must first be represented by discrete-time samples before digital encoding can begin."
    },
    {
      "title": "Quantization staircase",
      "detail": "Quantization maps every sample to the nearest allowed level, creating the classic staircase approximation."
    },
    {
      "title": "Binary encoding",
      "detail": "Each quantized level is assigned a binary codeword so that the sample sequence can be sent over a digital link."
    },
    {
      "title": "Delta modulation",
      "detail": "Delta modulation is a tracking approach. It is simple but can suffer from slope overload or granular noise if parameters are poorly chosen."
    }
  ],
  "examples": [
    {
      "title": "Relate bit count to levels",
      "prompt": "How many quantization levels are available when 3 bits are used?",
      "steps": [
        "Use the relationship between number of bits and levels.",
        "For n bits, number of levels equals 2^n.",
        "With n = 3, the total number of levels is 8."
      ],
      "answer": "Three bits provide 8 quantization levels."
    }
  ],
  "examPointers": [
    "In PCM, always preserve the sequence sample then quantize then encode.",
    "Quantization error is approximation error, not channel noise.",
    "If delta modulation cannot follow a fast-changing signal, think slope overload."
  ],
  "commonMistakes": [
    "Confusing quantization noise with transmission noise.",
    "Encoding before quantization in explanation order.",
    "Forgetting that more bits mean more available levels."
  ],
  "quickRevision": [
    "PCM = sample, quantize, encode.",
    "Quantization makes amplitudes discrete.",
    "More bits usually reduce quantization error."
  ],
  "insightSummary": "Digital communication topics become much simpler when you see them as structured approximation steps rather than abstract blocks.",
  "formulaHighlights": [
    "L = 2^n",
    "e_q = x - x_q",
    "Sample -> Quantize -> Encode"
  ],
  "relatedTopics": [
    {
      "subjectSlug": "communications",
      "topicSlug": "pulse-modulation"
    },
    {
      "subjectSlug": "communications",
      "topicSlug": "digital-modulation-techniques"
    },
    {
      "subjectSlug": "signals",
      "topicSlug": "sampling-theorem"
    }
  ],
  "subjectSlug": "communications",
  "concepts": [
    "Quantization replaces exact analog values with nearest allowed levels.",
    "Binary encoding labels each quantized level with a bit pattern.",
    "Quantization error is the price paid for discrete representation.",
    "Delta modulation sends direction of change rather than full sample value."
  ],
  "subtopics": [],
  "editMeta": {
    "subject": "Communication Systems",
    "chapter": "06 Digital Communication",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default digitalCommunication;
