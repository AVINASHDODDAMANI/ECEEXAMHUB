import { antennaTopics } from "./antenna-topic-pages";

const visualizationExtras = {
  "introduction-to-antennas": {
    title: "Transmission and Reception Flow",
    subtitle: "Follow electrical energy as it becomes a radiated wave and is captured by a receiving antenna.",
    ariaLabel: "Antenna transmission and reception visualization showing transmitter antenna wave receiver flow",
    variables: [["Tx", "Transmitter"], ["E/H", "Radiated electromagnetic fields"], ["Rx", "Receiver"]],
    takeaway: "An antenna converts guided electrical signals into radiated waves, and receiving antennas reverse that process.",
    steps: [["Feed antenna", "The transmitter sends RF current into the antenna."], ["Radiate", "Time-varying current launches electromagnetic fields."], ["Receive", "A receiving antenna converts part of the wave back to voltage."]],
  },
  "antenna-fundamentals": {
    title: "Radiation Pattern and Link Budget",
    subtitle: "Compare beamwidth, gain, directivity, polarization, and Friis transmission intuition.",
    ariaLabel: "Antenna fundamentals visualization showing radiation pattern beamwidth gain polarization and Friis equation",
    variables: [["G", "Gain"], ["D", "Directivity"], ["HPBW", "Half-power beamwidth"]],
    takeaway: "Narrower main beams usually mean higher directivity and stronger power concentration.",
    steps: [["Shape pattern", "Radiation is stronger in some directions than others."], ["Read beamwidth", "Half-power points define the main-lobe width."], ["Use link equation", "Friis relates gain, wavelength, distance, and received power."]],
  },
  "dipole-and-monopole-antennas": {
    title: "Dipole Current and Radiation",
    subtitle: "See a half-wave dipole current distribution and the monopole ground-plane image idea.",
    ariaLabel: "Dipole and monopole antenna visualization showing current distribution radiation and ground reflection",
    variables: [["I(z)", "Current distribution"], ["lambda/2", "Half-wave dipole"], ["Rr", "Radiation resistance"]],
    takeaway: "A monopole above a ground plane behaves like half of a dipole with an image below the plane.",
    steps: [["Current peaks", "Current is strongest near the feed point."], ["Fields radiate", "Time-varying current creates outward fields."], ["Ground image", "A monopole uses the ground plane as the missing half."]],
  },
  "antenna-arrays": {
    title: "Array Factor and Beam Steering",
    subtitle: "Watch element spacing and phase make waves add strongly in one direction.",
    ariaLabel: "Antenna array visualization showing multiple elements broadside end fire and beam steering",
    variables: [["d", "Element spacing"], ["beta", "Phase shift"], ["AF", "Array factor"]],
    takeaway: "Array beams are controlled by element spacing, phase, and element pattern.",
    steps: [["Excite elements", "Multiple antennas radiate together."], ["Add fields", "Fields reinforce in preferred directions."], ["Steer beam", "Changing phase moves the main lobe."]],
  },
  "special-antennas": {
    title: "Special Antenna Structures",
    subtitle: "Compare loop, helical, horn, reflector, and patch antenna radiation intuition.",
    ariaLabel: "Special antennas visualization showing helical horn reflector patch and loop antenna behavior",
    variables: [["Horn", "Aperture radiator"], ["Reflector", "Focused beam"], ["Patch", "Low-profile antenna"]],
    takeaway: "Special antennas are chosen by required pattern, bandwidth, polarization, size, and frequency band.",
    steps: [["Pick structure", "Each antenna geometry shapes current or aperture fields differently."], ["Shape beam", "Aperture and reflector antennas concentrate radiation."], ["Match application", "Patch, horn, helix, loop, and reflector antennas solve different design needs."]],
  },
  "wave-propagation-basics": {
    title: "Propagation Mechanism Comparison",
    subtitle: "Compare reflection, refraction, diffraction, scattering, and ground/sky/space paths.",
    ariaLabel: "Wave propagation basics visualization showing reflection refraction diffraction scattering and propagation modes",
    variables: [["GW", "Ground wave"], ["SW", "Sky wave"], ["LOS", "Space wave line of sight"]],
    takeaway: "Propagation mode selection depends on frequency, height, terrain, and atmospheric layers.",
    steps: [["Launch wave", "The wave leaves the antenna and meets the environment."], ["Interact", "Reflection, refraction, diffraction, and scattering change the path."], ["Choose mode", "Ground, sky, or space wave dominates depending on conditions."]],
  },
  "ground-wave-and-sky-wave-propagation": {
    title: "Surface Wave and Ionosphere Path",
    subtitle: "See ground-wave hugging and sky-wave return through the ionosphere.",
    ariaLabel: "Ground wave and sky wave propagation visualization showing surface path ionosphere reflection critical frequency and MUF",
    variables: [["fc", "Critical frequency"], ["MUF", "Maximum usable frequency"], ["Ionosphere", "Reflecting layer"]],
    takeaway: "Sky-wave communication depends on ionosphere condition, incidence angle, critical frequency, and MUF.",
    steps: [["Ground wave", "Low-frequency energy follows the Earth surface."], ["Sky wave", "A higher wave refracts back from the ionosphere."], ["Check MUF", "Oblique paths can support frequencies above critical frequency."]],
  },
  "space-wave-propagation": {
    title: "Line-of-Sight and Radar Path",
    subtitle: "Trace direct waves, reflected rays, ducts, microwave links, and radar echoes.",
    ariaLabel: "Space wave propagation visualization showing line of sight microwave duct propagation and radar echo",
    variables: [["LOS", "Line of sight"], ["Duct", "Tropospheric duct"], ["Echo", "Radar return"]],
    takeaway: "Space-wave links depend heavily on antenna height, terrain, atmosphere, and direct visibility.",
    steps: [["Direct path", "The strongest space wave usually travels by line of sight."], ["Atmosphere bends", "Troposphere or ducts can extend the path."], ["Radar echo", "A transmitted pulse returns after reflecting from a target."]],
  },
  "antenna-measurements": {
    title: "VSWR and Pattern Measurement",
    subtitle: "Connect test antennas, reflected waves, impedance matching, VSWR, and radiation pattern measurement.",
    ariaLabel: "Antenna measurement visualization showing VSWR reflection coefficient gain setup and radiation pattern testing",
    variables: [["Gamma", "Reflection coefficient"], ["VSWR", "Standing wave ratio"], ["Zin", "Input impedance"]],
    takeaway: "Good measurements separate radiation behavior from mismatch and test-setup errors.",
    steps: [["Set up test", "A source, antenna under test, and reference antenna define the measurement."], ["Check match", "Mismatch creates reflected waves and higher VSWR."], ["Measure pattern", "Rotating the antenna maps gain versus angle."]],
  },
  "modern-antenna-applications": {
    title: "Modern Wireless Antenna Systems",
    subtitle: "Visualize satellite links, mobile towers, radar scanning, smart beams, and MIMO paths.",
    ariaLabel: "Modern antenna applications visualization showing satellite mobile tower radar smart antenna beamforming and MIMO",
    variables: [["MIMO", "Multiple-input multiple-output"], ["Beam", "Steered energy"], ["Radar", "Scanning echo system"]],
    takeaway: "Modern antennas often use arrays, beamforming, and multiple spatial paths to improve range and capacity.",
    steps: [["Form link", "Satellite, tower, radar, or device antennas establish a wireless path."], ["Shape energy", "Beamforming sends more energy where it is useful."], ["Use diversity", "MIMO uses multiple antennas and paths for stronger communication."]],
  },
};

export const antennaVisualizationData = antennaTopics.reduce((items, topic) => {
  items[topic.slug] = {
    visualType: topic.visualType,
    ...visualizationExtras[topic.slug],
  };
  return items;
}, {});
