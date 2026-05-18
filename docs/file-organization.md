# File Organization Map

This project should stay grouped by purpose first, then by subject/chapter where the files are learning content.

## Top-Level Groups

| Group | Folder / Files | What belongs here |
| --- | --- | --- |
| Pages and routes | `pages/` | Next.js page routes, API routes, dynamic route files |
| UI components | `components/` | Reusable React `.jsx` components |
| Visualizers | `components/visualizers/` | Interactive subject visualizer components |
| Subject content | `data/<subject>/chapters/<chapter>/topics/` | Chapter and topic data files |
| Subject indexes | `data/<subject>/index.js` | Subject-level content registry |
| Shared data | `data/*.js` | Cross-site directories, questions, exams, roadmaps, compatibility helpers |
| Shared logic | `lib/` | Utilities, SEO helpers, API client, learning helpers |
| Hooks | `hooks/` | React hooks |
| Models | `models/` | Database models |
| Static assets | `public/` | PDFs, icons, web manifest, worker files |
| Styles | `styles/` | Global CSS |
| App config | root config files | Next, Tailwind, PostCSS, package files, environment examples |

## File Type Counts

| Type | Count | Main location |
| --- | ---: | --- |
| `.js` | 431 | `pages/`, `data/`, `lib/`, `hooks/`, `models/` |
| `.jsx` | 64 | `components/` |
| `.json` | 2 | project package files |
| `.svg` | 2 | `public/brand/` |
| `.css` | 1 | `styles/` |
| `.mjs` | 1 | `public/` |
| `.pdf` | 1 | `public/papers/` |
| `.webmanifest` | 1 | `public/` |
| `.example` | 1 | root env example |

## Subject And Chapter Content

Each subject follows this pattern:

```text
data/<subject>/
  index.js
  chapters/
    <chapter>/
      index.js
      topics/
        <topic>.js
```

### Analog Electronics

- `data/analog-electronics/index.js`
- `01-op-amp-fundamentals` - 2 topic files
- `02-diodes-and-transistors` - 2 topic files
- `03-frequency-response-and-feedback` - 2 topic files

### Antenna Wave Propagation

- `data/antenna-wave-propagation/index.js`
- `01-introduction-to-antennas` - 1 topic file
- `02-antenna-fundamentals` - 1 topic file
- `03-dipole-and-monopole-antennas` - 1 topic file
- `04-antenna-arrays` - 1 topic file
- `05-special-antennas` - 1 topic file
- `06-wave-propagation-basics` - 1 topic file
- `07-ground-wave-and-sky-wave-propagation` - 1 topic file
- `08-space-wave-propagation` - 1 topic file
- `09-antenna-measurements` - 1 topic file
- `10-modern-antenna-applications` - 1 topic file

### Communication Systems

- `data/communication-systems/index.js`
- `01-introduction-to-communication-systems` - 1 topic file
- `02-signals-and-spectra` - 1 topic file
- `03-amplitude-modulation` - 1 topic file
- `04-angle-modulation` - 1 topic file
- `05-pulse-modulation` - 1 topic file
- `06-digital-communication` - 1 topic file
- `07-digital-modulation-techniques` - 1 topic file
- `08-noise-in-communication-systems` - 1 topic file
- `09-information-theory` - 1 topic file
- `10-communication-receivers` - 1 topic file
- `11-antennas-and-propagation-basics` - 1 topic file

### Control Systems

- `data/control-systems/index.js`
- `01-mathematical-modeling-of-systems` - 1 topic file
- `02-block-diagram-and-signal-flow-graph` - 1 topic file
- `03-time-response-analysis` - 1 topic file
- `04-stability-analysis` - 1 topic file
- `05-root-locus-technique` - 1 topic file
- `06-frequency-response-analysis` - 1 topic file
- `07-controllers-and-compensators` - 1 topic file
- `08-state-space-analysis` - 1 topic file
- `09-control-system-design` - 1 topic file

### Digital Electronics

- `data/digital-electronics/index.js`
- `01-combinational-logic` - 2 topic files
- `02-sequential-circuits` - 2 topic files
- `03-logic-implementation` - 2 topic files

### Digital Signal Processing

- `data/digital-signal-processing/index.js`
- `01-introduction-to-dsp` - 1 topic file
- `02-discrete-time-signals-and-systems` - 1 topic file
- `03-convolution-and-correlation` - 1 topic file
- `04-z-transform` - 1 topic file
- `05-discrete-fourier-transform-dft` - 1 topic file
- `06-fast-fourier-transform-fft` - 1 topic file
- `07-digital-filters` - 1 topic file
- `08-filter-design-techniques` - 1 topic file
- `09-sampling-and-reconstruction` - 1 topic file
- `10-dsp-processors-and-applications` - 1 topic file

### Electromagnetic Theory

- `data/electromagnetic-theory/index.js`
- `01-vector-calculus` - 1 topic file
- `02-electrostatics` - 1 topic file
- `03-conductors-and-dielectrics` - 1 topic file
- `04-magnetostatics` - 1 topic file
- `05-electromagnetic-induction` - 1 topic file
- `06-maxwells-equations` - 1 topic file
- `07-electromagnetic-waves` - 1 topic file
- `08-transmission-lines` - 1 topic file
- `09-waveguides` - 1 topic file
- `10-antennas` - 1 topic file
- `11-electromagnetic-compatibility-and-applications` - 1 topic file

### Embedded Systems

- `data/embedded-systems/index.js`
- `01-introduction-to-embedded-systems` - 1 topic file
- `02-embedded-system-architecture` - 1 topic file
- `03-microcontrollers` - 1 topic file
- `04-embedded-c-programming` - 1 topic file
- `05-interfacing-techniques` - 1 topic file
- `06-communication-protocols` - 1 topic file
- `07-timers-counters-and-interrupts` - 1 topic file
- `08-real-time-operating-systems-rtos` - 1 topic file
- `09-memory-and-power-management` - 1 topic file
- `10-embedded-system-design-process` - 1 topic file
- `11-advanced-embedded-applications` - 1 topic file

### Microprocessors

- `data/microprocessors/index.js`
- `01-introduction-to-microprocessors` - 1 topic file
- `02-8085-microprocessor-architecture` - 1 topic file
- `03-8085-instruction-set` - 1 topic file
- `04-assembly-language-programming` - 1 topic file
- `05-timing-diagrams-and-machine-cycles` - 1 topic file
- `06-interrupts-in-8085` - 1 topic file
- `07-memory-interfacing` - 1 topic file
- `08-io-interfacing` - 1 topic file
- `09-8255-programmable-peripheral-interface` - 1 topic file
- `10-8086-microprocessor` - 1 topic file
- `11-advanced-topics` - 1 topic file

### Network Analysis

- `data/network-analysis/index.js`
- `01-basic-concepts` - 5 topic files
- `02-circuit-elements` - 5 topic files
- `03-circuit-laws` - 5 topic files
- `04-network-theorems` - 5 topic files
- `05-dc-circuit-analysis` - 5 topic files
- `06-ac-fundamentals` - 4 topic files
- `07-ac-circuit-analysis` - 4 topic files
- `08-transient-analysis` - 5 topic files
- `09-network-topology` - 5 topic files
- `10-laplace-transform-methods` - 5 topic files
- `11-frequency-domain-analysis` - 5 topic files
- `12-two-port-networks` - 5 topic files
- `13-filters` - 5 topic files
- `14-network-functions` - 5 topic files
- `15-advanced-topics` - 5 topic files

### Signals And Systems

- `data/signals-and-systems/index.js`
- `01-signal-basics` - 2 topic files
- `02-transform-techniques` - 2 topic files
- `03-sampling-and-z-transform` - 2 topic files

### VLSI Design

- `data/vlsi-design/index.js`
- `01-introduction-to-vlsi-design` - 1 topic file
- `02-mos-transistor-basics` - 1 topic file
- `03-cmos-logic-design` - 1 topic file
- `04-cmos-fabrication-technology` - 1 topic file
- `05-vlsi-design-styles` - 1 topic file
- `06-stick-diagrams-and-layout-design` - 1 topic file
- `07-combinational-circuit-design` - 1 topic file
- `08-sequential-circuit-design` - 1 topic file
- `09-vlsi-interconnects-and-scaling` - 1 topic file
- `10-testing-and-verification` - 1 topic file
- `11-hdl-and-vlsi-automation-basics` - 1 topic file

## Page Route Files

The `pages/` folder contains Next.js routes and should not be moved without also changing routes/imports.

- Root/static pages: `about.js`, `contact.js`, `faq.js`, `index.js`, `privacy.js`, `terms.js`, search/practice/notes/mcq landing pages, and subject topic route pages.
- Dynamic routes: `pages/subjects/[slug].js`, `pages/learn/[subjectSlug]/[topicSlug].js`, `pages/notes/[slug].js`, `pages/mcqs/[slug].js`, `pages/practice/[slug].js`, `pages/solution/[slug].js`.
- API routes: `pages/api/questions/*.js`, `pages/api/admin/database-status.js`.
- Metadata routes: `pages/robots.txt.js`, `pages/sitemap.xml.js`.
- App wrappers: `pages/_app.js`, `pages/_document.js`.

## Component Files

All reusable UI components are `.jsx` files under `components/`.

- Subject page components: `AntennaWavePropagationTopicPage.jsx`, `CommunicationSystemTopicPage.jsx`, `ControlSystemTopicPage.jsx`, `DigitalSignalProcessingTopicPage.jsx`, `ElectromagneticTheoryTopicPage.jsx`, `EmbeddedSystemsTopicPage.jsx`, `MicroprocessorTopicPage.jsx`, `VLSIDesignTopicPage.jsx`.
- Layout/navigation: `layout.jsx`, `navbar.jsx`, `Footer.jsx`, `PageBanner.jsx`.
- Learning UI: `LearningTopicCard.jsx`, `ProgressOverview.jsx`, `NetworkTopicMenu.jsx`.
- Question/admin UI: `AdminQuestionForm.jsx`, `FilterPanel.jsx`, `PreviousYearQuestionCard.jsx`, `PdfDocumentViewer.jsx`.
- Generic UI: `BrandIdentity.jsx`, `EmptyState.jsx`, `InsightChart.jsx`, `SmartSearchDropdown.jsx`, `StatCard.jsx`.
- Visualizers: keep all animation and visualizer components in `components/visualizers/`.

## Shared JS Files

- `lib/`: reusable application helpers such as `seo.js`, `learning-utils.js`, `smart-search.js`, `api-client.js`, and visualization utilities.
- `hooks/`: React hooks such as `useVisualizationSteps.js`.
- `models/`: database models such as `Question.js`.
- `data/*.js`: global data such as subject directories, questions, exam guides, paper directories, practice sections, and visualization datasets.

## Static Assets

- Brand SVGs: `public/brand/`
- Papers/PDFs: `public/papers/`
- Browser/app assets: `public/site.webmanifest`
- PDF worker: `public/pdf.worker.min.mjs`

## Organization Rules Going Forward

1. Put new learning content in `data/<subject>/chapters/<chapter>/topics/<topic>.js`.
2. Add or update the chapter registry in `data/<subject>/chapters/<chapter>/index.js`.
3. Add or update the subject registry in `data/<subject>/index.js`.
4. Put reusable UI in `components/`, and subject animations in `components/visualizers/`.
5. Keep Next.js route files in `pages/`; moving them changes public URLs.
6. Put shared helpers in `lib/`, React hooks in `hooks/`, and static files in `public/`.
