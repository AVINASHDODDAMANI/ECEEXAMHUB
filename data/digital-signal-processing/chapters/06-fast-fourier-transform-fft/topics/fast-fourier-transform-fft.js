const fastFourierTransformFft = {
  "slug": "fast-fourier-transform-fft",
  "title": "Fast Fourier Transform (FFT)",
  "summary": "Understand why FFT is used, Radix-2 FFT, DIT, DIF, butterfly computation, and complexity reduction.",
  "concepts": [
    "Radix-2 FFT",
    "DIT",
    "DIF",
    "Butterfly",
    "N log N"
  ],
  "subtopics": [
    "Need for FFT",
    "Radix-2 FFT",
    "Decimation in Time",
    "Decimation in Frequency",
    "Butterfly computation"
  ],
  "formula": {
    "label": "Complexity reduction",
    "expression": "DFT: O(N^2), FFT: O(N log N)",
    "note": "FFT keeps the same DFT result with far fewer operations."
  },
  "visualFocus": "divide-and-conquer FFT butterfly stages",
  "subjectSlug": "dsp",
  "editMeta": {
    "subject": "Digital Signal Processing",
    "chapter": "Fast Fourier Transform (FFT)",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default fastFourierTransformFft;
