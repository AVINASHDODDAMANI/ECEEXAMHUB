import introductionToDsp from "./chapters/01-introduction-to-dsp";
import discreteTimeSignalsAndSystems from "./chapters/02-discrete-time-signals-and-systems";
import convolutionAndCorrelation from "./chapters/03-convolution-and-correlation";
import zTransform from "./chapters/04-z-transform";
import discreteFourierTransformDft from "./chapters/05-discrete-fourier-transform-dft";
import fastFourierTransformFft from "./chapters/06-fast-fourier-transform-fft";
import digitalFilters from "./chapters/07-digital-filters";
import filterDesignTechniques from "./chapters/08-filter-design-techniques";
import samplingAndReconstruction from "./chapters/09-sampling-and-reconstruction";
import dspProcessorsAndApplications from "./chapters/10-dsp-processors-and-applications";

export const digitalSignalProcessingChapters = [
  introductionToDsp,
  discreteTimeSignalsAndSystems,
  convolutionAndCorrelation,
  zTransform,
  discreteFourierTransformDft,
  fastFourierTransformFft,
  digitalFilters,
  filterDesignTechniques,
  samplingAndReconstruction,
  dspProcessorsAndApplications,
];

export const digitalSignalProcessingTopics = digitalSignalProcessingChapters.flatMap((chapter) => chapter.topics);

export const digitalSignalProcessingSubject = {
  number: "08",
  slug: "digital-signal-processing",
  title: "Digital Signal Processing",
  name: "Digital Signal Processing",
  weightage: "",
  description: "Digital Signal Processing topic pages for GATE ECE.",
  summary: "Digital Signal Processing topic pages for GATE ECE.",
  chapters: digitalSignalProcessingChapters,
};

export const digitalSignalProcessingTopicPageMap = digitalSignalProcessingTopics.reduce((pages, topic) => {
  pages[topic.slug] = topic;
  return pages;
}, {});
