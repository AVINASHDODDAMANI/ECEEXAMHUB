const discreteFourierTransformDft = {
  "slug": "discrete-fourier-transform-dft",
  "title": "Discrete Fourier Transform (DFT)",
  "summary": "Convert finite time-domain samples into frequency-domain bins and interpret magnitude spectrum and circular periodicity.",
  "concepts": [
    "DFT bins",
    "Magnitude spectrum",
    "Circular periodicity",
    "Frequency analysis"
  ],
  "subtopics": [
    "DFT definition",
    "Properties of DFT",
    "Circular convolution using DFT",
    "Frequency spectrum analysis"
  ],
  "formula": {
    "label": "DFT",
    "expression": "X[k] = sum x[n]e^(-j2pi kn/N)",
    "note": "Each bin measures the presence of one discrete frequency basis."
  },
  "visualFocus": "time-domain samples transforming into frequency bins",
  "subjectSlug": "dsp",
  "editMeta": {
    "subject": "Digital Signal Processing",
    "chapter": "Discrete Fourier Transform (DFT)",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default discreteFourierTransformDft;
