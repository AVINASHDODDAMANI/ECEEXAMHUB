import { vlsiTopics } from "./vlsi-topic-pages";

const visualizationExtras = {
  "introduction-to-vlsi-design": {
    title: "SSI to VLSI Design Flow",
    subtitle: "Watch integration scale up, then follow the chip from specification to fabrication.",
    ariaLabel: "VLSI introduction visualization showing SSI to VLSI scaling and IC design flow",
    variables: [["SSI", "Few gates"], ["VLSI", "Millions to billions of transistors"], ["GDSII", "Layout sent for fabrication"]],
    takeaway: "VLSI design is controlled scaling: more devices, smaller features, and a disciplined flow from idea to silicon.",
    steps: [["Scale", "Integration moves from simple ICs to dense chips."], ["Design", "Architecture, RTL, logic, and layout refine the idea."], ["Fabricate", "The final physical database is manufactured and tested."]],
  },
  "mos-transistor-basics": {
    title: "Gate-Controlled MOS Channel",
    subtitle: "See gate voltage form a channel and control drain current through a MOS device.",
    ariaLabel: "MOS transistor visualization showing gate source drain channel and current flow",
    variables: [["G", "Gate"], ["S/D", "Source and drain"], ["VGS", "Gate-source voltage"]],
    takeaway: "The MOS gate controls channel charge with an electric field, so input current is ideally almost zero.",
    steps: [["Bias gate", "Gate-source voltage creates the vertical electric field."], ["Form channel", "When VGS exceeds threshold, carriers connect source and drain."], ["Drive current", "Drain voltage pulls carriers through the channel."]],
  },
  "cmos-logic-design": {
    title: "CMOS Inverter Switching",
    subtitle: "Follow how complementary PMOS and NMOS networks create a clean logic transition.",
    ariaLabel: "CMOS logic visualization showing pull up pull down inverter switching",
    variables: [["PUN", "Pull-up network"], ["PDN", "Pull-down network"], ["Vout", "Logic output"]],
    takeaway: "Static CMOS uses complementary networks so one path strongly drives the output while the other turns off.",
    steps: [["Input low", "PMOS conducts and pulls output high."], ["Transition", "The switching point moves as both devices briefly share conduction."], ["Input high", "NMOS conducts and pulls output low."]],
  },
  "cmos-fabrication-technology": {
    title: "Layer-by-Layer CMOS Fabrication",
    subtitle: "Trace wafer, oxide, lithography, doping, metal, and contact formation.",
    ariaLabel: "CMOS fabrication visualization showing wafer oxidation lithography doping and metal layers",
    variables: [["Si", "Silicon wafer"], ["Oxide", "Insulating layer"], ["Mask", "Lithography pattern"]],
    takeaway: "CMOS fabrication repeatedly patterns, modifies, and connects materials on a silicon wafer.",
    steps: [["Prepare wafer", "Start with a clean silicon substrate."], ["Pattern layers", "Oxide and photoresist define where changes happen."], ["Build devices", "Doping, contacts, and metal routing complete the circuit."]],
  },
  "vlsi-design-styles": {
    title: "Custom to FPGA Tradeoff",
    subtitle: "Compare area efficiency, design effort, flexibility, and time-to-market.",
    ariaLabel: "VLSI design styles visualization comparing full custom standard cell and FPGA",
    variables: [["ASIC", "Application-specific IC"], ["FPGA", "Programmable fabric"], ["Cells", "Reusable layout blocks"]],
    takeaway: "Choose the design style by balancing performance, area, power, cost, and schedule.",
    steps: [["Full custom", "Maximum control and efficiency, but highest design effort."], ["Standard cell", "Reusable cells reduce layout effort."], ["FPGA", "Programmability improves flexibility and prototyping speed."]],
  },
  "stick-diagrams-and-layout-design": {
    title: "Stick Diagram to Layout",
    subtitle: "See diffusion, polysilicon, metal, and contacts align into a physical CMOS layout.",
    ariaLabel: "Stick diagram and layout visualization showing metal polysilicon diffusion and contacts",
    variables: [["Poly", "Gate layer"], ["Metal", "Routing layer"], ["lambda", "Scalable layout unit"]],
    takeaway: "Stick diagrams preserve connectivity and layer order before detailed geometry is finalized.",
    steps: [["Place layers", "Diffusion, poly, and metal are drawn with conventional colors."], ["Add contacts", "Contacts connect layers where signals must pass."], ["Check rules", "Lambda constraints keep layout manufacturable."]],
  },
  "combinational-circuit-design": {
    title: "Combinational Signal Path",
    subtitle: "Follow inputs through CMOS logic blocks toward an output with no stored state.",
    ariaLabel: "Combinational circuit visualization showing inputs mux decoder adder and output flow",
    variables: [["A,B", "Logic inputs"], ["MUX", "Selected path"], ["Y", "Output"]],
    takeaway: "Combinational circuits depend only on present inputs, so propagation delay is the main timing concern.",
    steps: [["Apply inputs", "Input values enter the logic network."], ["Select or compute", "Gates, MUXes, adders, or decoders perform the function."], ["Read output", "The output settles after propagation delay."]],
  },
  "sequential-circuit-design": {
    title: "Clocked State Update",
    subtitle: "Visualize a flip-flop capturing input and moving a register or counter to the next state.",
    ariaLabel: "Sequential circuit visualization showing clock flip flop register and counter state transition",
    variables: [["CLK", "Clock"], ["D/Q", "Flip-flop input/output"], ["State", "Stored value"]],
    takeaway: "Sequential VLSI design is about controlling when state changes, not just what logic computes.",
    steps: [["Before edge", "Data must be stable around the sampling edge."], ["Capture", "The flip-flop stores the input at the clock edge."], ["Next state", "Registers and counters update together."]],
  },
  "vlsi-interconnects-and-scaling": {
    title: "Interconnect RC Delay",
    subtitle: "See a signal slow down as resistance and capacitance increase along a scaled wire.",
    ariaLabel: "VLSI interconnect visualization showing resistance capacitance and propagation delay",
    variables: [["R", "Wire resistance"], ["C", "Wire capacitance"], ["tau", "Delay constant"]],
    takeaway: "As technology scales, interconnect delay and power become central design constraints.",
    steps: [["Launch signal", "A driver pushes a transition into the wire."], ["Charge capacitance", "Distributed capacitance takes time to charge."], ["Arrive late", "The receiver sees a delayed and softened edge."]],
  },
  "testing-and-verification": {
    title: "Scan Test and Fault Detection",
    subtitle: "Follow a test pattern through scan cells, capture logic response, and compare expected output.",
    ariaLabel: "VLSI testing visualization showing scan chain BIST fault detection and response compare",
    variables: [["ATPG", "Test pattern generation"], ["Scan", "Controllable flip-flop chain"], ["BIST", "Built-In Self-Test"]],
    takeaway: "Verification prevents design mistakes; testing catches manufacturing defects.",
    steps: [["Shift pattern", "Scan chain loads a known test vector."], ["Capture response", "Circuit logic produces an observable output."], ["Compare", "Mismatch indicates a possible fault."]],
  },
  "hdl-and-vlsi-automation-basics": {
    title: "RTL to Gate-Level Flow",
    subtitle: "Follow HDL through simulation, synthesis, netlist generation, and physical automation.",
    ariaLabel: "HDL and VLSI automation visualization showing RTL synthesis gate netlist and CAD flow",
    variables: [["RTL", "Register-transfer level"], ["Netlist", "Gate-level circuit"], ["EDA", "Automation tools"]],
    takeaway: "HDL describes intent; CAD tools transform it into gates and physical implementation data.",
    steps: [["Write RTL", "Verilog or VHDL describes cycle-level behavior."], ["Simulate", "Testbenches check functional correctness."], ["Synthesize", "Tools map RTL into gates and prepare physical design."]],
  },
};

export const vlsiVisualizationData = vlsiTopics.reduce((items, topic) => {
  items[topic.slug] = {
    visualType: topic.visualType,
    ...visualizationExtras[topic.slug],
  };
  return items;
}, {});
