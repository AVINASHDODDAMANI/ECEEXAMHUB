import Link from "next/link";
import Layout from "../components/layout";
import ControlSystemSubtopicMenu from "../components/ControlSystemSubtopicMenu";
import ControlSystemVisualizer from "../components/ControlSystemVisualizer";
import { controlSystemTopicPages } from "../data/control-system-topic-pages";

function TopicSection({ id, title, children }) {
  return (
    <section
      id={id}
      className="topic-section scroll-mt-32 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function MiniCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      {children}
    </div>
  );
}

function FormulaBox({ children }) {
  return (
    <div className="mt-3 rounded-xl border border-portal-100 bg-[#f8fbff] px-4 py-3 font-mono text-sm font-bold leading-7 text-slate-950 sm:text-base">
      {children}
    </div>
  );
}

function BasicControlSystemRepresentation() {
  const explanationItems = [
    {
      label: "Input (Command Signal):",
      text: "The desired value or command provided to the system.",
      swatchClassName: "border-emerald-700 bg-emerald-50",
      labelClassName: "text-emerald-700",
    },
    {
      label: "Control System (Processing Unit):",
      text: "The combination of components and logic that processes the input and determines the appropriate action.",
      swatchClassName: "border-blue-800 bg-blue-50",
      labelClassName: "text-blue-800",
    },
    {
      label: "Output (System Response):",
      text: "The resulting response or controlled variable produced by the system.",
      swatchClassName: "border-amber-600 bg-amber-50",
      labelClassName: "text-amber-800",
    },
  ];

  return (
    <figure className="mx-auto my-6 w-full max-w-[900px] px-0 py-6">
      <h3 className="text-center text-2xl font-black tracking-tight text-[#0b2d67] sm:text-3xl">
        Basic Block Diagram of a Control System
      </h3>
      <p className="mx-auto mt-2 max-w-[620px] text-center text-sm font-medium leading-6 text-slate-950 sm:text-base">
        A control system operates on an input and produces the desired output according to the
        system objective.
      </p>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
        <div className="rounded-xl border-2 border-emerald-800 bg-emerald-50 px-4 py-4 text-center shadow-sm sm:w-[24%]">
          <p className="text-lg font-black text-emerald-800 sm:text-xl">INPUT</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">
            (Command Signal)
          </p>
        </div>

        <div className="flex items-center justify-center sm:w-[13%]" aria-hidden="true">
          <div className="h-6 w-1 bg-slate-950 sm:h-1 sm:w-full" />
          <div className="hidden h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-slate-950 sm:block" />
        </div>

        <div className="rounded-xl border-2 border-blue-800 bg-blue-50 px-4 py-4 text-center shadow-sm sm:w-[28%]">
          <p className="text-lg font-black text-blue-900 sm:text-xl">CONTROL SYSTEM</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">
            (Processing Unit)
          </p>
        </div>

        <div className="flex items-center justify-center sm:w-[13%]" aria-hidden="true">
          <div className="h-6 w-1 bg-slate-950 sm:h-1 sm:w-full" />
          <div className="hidden h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-slate-950 sm:block" />
        </div>

        <div className="rounded-xl border-2 border-amber-600 bg-amber-50 px-4 py-4 text-center shadow-sm sm:w-[24%]">
          <p className="text-lg font-black text-amber-800 sm:text-xl">OUTPUT</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-950">
            (System Response)
          </p>
        </div>
      </div>

      <figcaption className="mt-4 text-center text-sm italic leading-6 text-slate-950 sm:text-base">
        Figure 1: Basic Block Diagram of a Control System
      </figcaption>

      <h4 className="mt-5 text-lg font-black text-[#0b2d67] sm:text-xl">
        Elements of a Control System
      </h4>
      <div className="mt-3 grid gap-3">
        {explanationItems.map((item) => (
          <div key={item.label} className="grid gap-3 sm:grid-cols-[48px_1fr] sm:items-start">
            <span
              aria-hidden="true"
              className={`mx-auto mt-0.5 h-6 w-6 rounded border-2 sm:mx-0 ${item.swatchClassName}`}
            />
            <p className="text-sm leading-6 text-slate-950 sm:text-base">
              <span className={`font-black ${item.labelClassName}`}>{item.label}</span>{" "}
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-300 pt-3">
        <h4 className="text-lg font-black text-[#0b2d67] sm:text-xl">
          Real-Life Examples of Control Systems
        </h4>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-950 sm:text-base">
          <li>
            <strong>Air conditioner:</strong> Desired temperature (24&deg;C) &rarr; air conditioner
            control system &rarr; room temperature.
          </li>
          <li>
            <strong>Room heater:</strong> Set temperature &rarr; heater control action &rarr;
            maintained room warmth.
          </li>
          <li>
            <strong>Vehicle cruise control:</strong> Set speed &rarr; speed controller &rarr;
            constant vehicle speed.
          </li>
        </ul>

        <h4 className="mt-5 text-lg font-black text-[#0b2d67] sm:text-xl">
          Applications of Control Systems
        </h4>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-950 sm:text-base">
          <li>Industrial automation and process control.</li>
          <li>Robotics, CNC machines, and servo positioning systems.</li>
          <li>Automobiles, power systems, communication systems, and consumer electronics.</li>
        </ul>
      </div>
    </figure>
  );
}

function BulletList({ items, bulletClassName = "bg-portal-600" }) {
  return (
    <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${bulletClassName}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const sectionLinks = [
  { id: "introduction", label: "Introduction" },
  { id: "why-it-matters", label: "Why It Matters" },
  { id: "intuition", label: "Intuition" },
  { id: "visualization", label: "Visualization" },
  { id: "theory", label: "Core Theory" },
  { id: "working", label: "Working" },
  { id: "formulas", label: "Formulas" },
  { id: "examples", label: "Examples" },
  { id: "faq", label: "FAQ" },
  { id: "practice", label: "Practice" },
];

const introSubtopics = [
  { label: "Control system definition", targetId: "theory" },
  { label: "Open-loop control system", targetId: "theory" },
  { label: "Closed-loop control system", targetId: "theory" },
  { label: "Feedback and error signal", targetId: "working" },
  { label: "Closed-loop transfer function", targetId: "formulas" },
  { label: "Real-world applications", targetId: "applications" },
];

const faqItems = [
  {
    question: "Why is Introduction to Control Systems important for GATE ECE?",
    answer:
      "It builds the language for feedback, error, open-loop control, closed-loop control, and transfer functions used throughout Control Systems problems.",
  },
  {
    question: "What is the main difference between open-loop and closed-loop control?",
    answer:
      "Open-loop control does not measure output for correction, while closed-loop control compares output with reference input and acts on the error.",
  },
  {
    question: "How should I revise this topic for university exams?",
    answer:
      "Revise definitions, open-loop and closed-loop examples, the error signal, the negative-feedback transfer function, and practical feedback applications.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Introduction to Control Systems",
    description:
      "Conceptual ECE notes on control systems, open-loop and closed-loop control, feedback, system types, examples, GATE quick notes, and interview preparation.",
    learningResourceType: "Theory Quick Notes",
    educationalLevel: "Undergraduate engineering",
    teaches: [
      "Control system definition",
      "Open-loop control",
      "Closed-loop control",
      "Feedback",
      "System types",
      "Automatic voltage regulator",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export default function IntroductionToControlSystemsPage() {
  return (
    <Layout
      title="Introduction to Control Systems GATE ECE Quick Notes + Formulas + PYQs"
      description="Learn introduction to control systems with open-loop and closed-loop intuition, animated feedback visualization, formulas, examples, GATE notes, FAQ, and practice questions."
      keywords="Introduction to Control Systems, open-loop control system, closed-loop control system, feedback control, automatic voltage regulator, GATE ECE"
      structuredData={structuredData}
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px] pb-20">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-col gap-3 pt-1 sm:flex-row sm:items-start sm:justify-between"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/control-systems" className="font-medium text-slate-600 transition hover:text-portal-700">Control Systems</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="font-semibold text-portal-700">Introduction to Control Systems</span></li>
          </ol>
          <ControlSystemSubtopicMenu
            title="Introduction"
            subtopics={introSubtopics}
          />
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">Control Systems</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Introduction to Control Systems</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            Modern engineering systems are expected to perform specific tasks accurately and consistently. A room air conditioner should maintain the desired temperature, a motor should run at the required speed, and a voltage regulator should provide a stable output despite changes in load conditions. The ability of a system to achieve and maintain a desired performance is made possible through control systems.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Core question</p>
              <p className="mt-1 leading-6">How do we make a system produce the desired output automatically?</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Exam focus</p>
              <p className="mt-1 leading-6">Open-loop, closed-loop, feedback, examples, system classification.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="font-bold text-slate-950">Engineering use</p>
              <p className="mt-1 leading-6">AVR, speed control, robotics, process control, automation.</p>
            </div>
          </div>
        </header>

        <nav aria-label="Introduction to Control Systems topic sections" className="sticky top-20 z-20 mt-4 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {sectionLinks.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="whitespace-nowrap rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700"
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        <article className="mt-5 grid gap-5">
          <TopicSection id="introduction" title="Introduction">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Let’s break it down into engineering terms. A Control System is a configuration of components that directs, regulates, or commands the behavior of devices or processes to produce a desired output. In simple words, it acts like an invisible manager behind the scenes, ensuring that the system operates as intended and delivers the required performance.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
             Control systems are found everywhere around us, from household appliances and automobiles to industrial automation, robotics, aerospace systems, and power plants. The study of control systems forms the foundation for designing intelligent and automated technologies used in modern engineering.
            </p>
          </TopicSection>

          <TopicSection id="what-is-a-control-system" title="What is a Control System?">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
             A control system is an arrangement of components that work together to achieve a desired output. Its primary function is to regulate the behavior of a system and ensure that the output remains within acceptable limits.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
             Consider a simple example of a room heater. During winter, a person may want the room temperature to remain at 25°C. The heater supplies heat to the room, but the desired goal is not merely to generate heat; it is to maintain the required temperature. The mechanism responsible for achieving this objective represents the control system.
             </p>
                <div className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                In general, every control system consists of three basic elements:
              <ul className="mt-3 list-disc pl-6 text-slate-700">
          <li>
         <strong>Input:</strong> The desired value or command given to the system.
         </li>
         <li>
         <strong>System or Process:</strong> The component that performs the required operation.
         </li>
        <li>
        <strong>Output:</strong> The actual result produced by the system.
          </li>
          </ul>
          </div>
          <BasicControlSystemRepresentation />
          </TopicSection>

          <TopicSection id="why-it-matters" title="Why It Matters">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Engineering problem solved">
                <BulletList items={["Maintains desired output despite disturbances.", "Improves accuracy using feedback.", "Controls speed, temperature, position, voltage, pressure, and flow.", "Prepares the base for stability, root locus, frequency response, and controller design."]} />
              </MiniCard>
              <MiniCard title="Exam and interview value">
                <BulletList items={["GATE ECE questions often begin from open-loop versus closed-loop concepts.", "PSU interviews frequently ask real examples of feedback control.", "Later numericals depend on understanding block direction, error signal, and output response."]} />
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="prerequisites" title="Prerequisites">
            <BulletList items={["Basic idea of input and output.", "Laplace Transform basics.", "Electrical circuit variables such as voltage and current.", "Mechanical variables such as force, velocity, displacement, and torque.", "Comfort with simple algebra and block diagrams."]} />
          </TopicSection>

          <TopicSection id="intuition" title="Basic Intuition">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Think of driving a vehicle. If you press the accelerator for a fixed time without checking speed, that is like open-loop control. If you continuously watch the speedometer and adjust the accelerator, that is closed-loop control.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Feedback is the act of looking at the result and using that result to correct future action. This one idea makes automatic control possible.
            </p>
            <blockquote className="mt-4 rounded-2xl border-l-4 border-portal-500 bg-portal-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-800">
              A control system is not just a circuit or machine. It is a decision loop that tries to reduce error.
            </blockquote>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Open-Loop and Closed-Loop Control Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Feedback Error Correction Visualization
            </div>
          </TopicSection>

          <TopicSection id="visualization" title="Step-by-Step Visualization">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              Use this animated view to compare open-loop action with closed-loop feedback correction.
            </p>
            <ControlSystemVisualizer slug="introduction-to-control-systems" />
          </TopicSection>

          <TopicSection id="theory" title="Core Theory">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Definition of control system</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              A control system is a system that manages, commands, directs, or regulates another system to obtain a desired output.
            </p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Open-loop control system</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In an open-loop system, the control action does not depend on the output. The system acts based on input command only.
            </p>
            <FormulaBox>{"$$Output = Plant\\ response\\ to\\ applied\\ input$$"}</FormulaBox>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Closed-loop control system</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              In a closed-loop system, the output is measured and compared with the reference input. The difference is called error, and the controller acts to reduce it.
            </p>
            <FormulaBox>{"$$e(t)=r(t)-c(t)$$"}</FormulaBox>
          </TopicSection>

          <TopicSection id="working" title="Working Principle">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The working principle of feedback control is comparison and correction. The reference says what we want. The sensor reports what we have. The controller acts on the error.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Step 1: Set reference">
                <p className="mt-2 text-sm leading-6 text-slate-700">The desired value is selected, such as target speed, voltage, position, or temperature.</p>
              </MiniCard>
              <MiniCard title="Step 2: Measure output">
                <p className="mt-2 text-sm leading-6 text-slate-700">A sensor measures the actual output and sends it back for comparison.</p>
              </MiniCard>
              <MiniCard title="Step 3: Correct error">
                <p className="mt-2 text-sm leading-6 text-slate-700">The controller changes the input to the plant so the output moves closer to the reference.</p>
              </MiniCard>
            </div>
            <div className="animation-placeholder mt-4 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Reference, Error, Controller, Plant, and Feedback Loop
            </div>
          </TopicSection>

          <TopicSection id="formulas" title="Formula Explanation">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Error signal">
                <FormulaBox>{"$$e(t)=r(t)-c(t)$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Error is the gap between desired output and actual output.</p>
              </MiniCard>
              <MiniCard title="Closed-loop transfer function">
                <FormulaBox>{"$$T(s)=\\frac{G(s)}{1+G(s)H(s)}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">For negative feedback, loop gain appears in the denominator and shapes accuracy and stability.</p>
              </MiniCard>
              <MiniCard title="Open-loop transfer function">
                <FormulaBox>{"$$G(s)=\\frac{C(s)}{R(s)}$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">This describes output-input relation when feedback is not used.</p>
              </MiniCard>
              <MiniCard title="Loop gain">
                <FormulaBox>{"$$L(s)=G(s)H(s)$$"}</FormulaBox>
                <p className="mt-2 text-sm leading-6 text-slate-700">Loop gain tells how strongly the feedback path influences the correction process.</p>
              </MiniCard>
            </div>
          </TopicSection>

          <TopicSection id="diagram" title="Diagram Explanation Placeholder">
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The diagram should show reference input, summing junction, error signal, controller, plant, output, sensor, and feedback path. The most important visual idea is that output information returns to the input side.
            </p>
            <div className="diagram-placeholder mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm font-bold text-slate-500">
              Closed-Loop Feedback Block Diagram Here
            </div>
            <div className="animation-placeholder mt-3 rounded-2xl border border-dashed border-portal-200 bg-portal-50 p-5 text-center text-sm font-bold text-portal-700">
              Animated Closed-Loop Signal Flow Visualization
            </div>
          </TopicSection>

          <TopicSection id="applications" title="Real-World Applications">
            <BulletList items={["Temperature control in ovens, rooms, and industrial furnaces.", "Motor speed control in electric drives and robotics.", "Automatic voltage regulator in power systems.", "Cruise control in vehicles.", "Position control in antennas, CNC machines, and servo systems.", "Process control in chemical plants and manufacturing lines.", "Flight control and stabilization in aerospace systems."]} />
          </TopicSection>

          <TopicSection id="examples" title="Solved Examples">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 1: Identify control type</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">A toaster heats bread for a fixed time without sensing bread color.</p>
            <FormulaBox>{"$$No\\ output\\ measurement\\quad \\Rightarrow\\quad Open\\ loop$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The control action is independent of the final output.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 2: Error signal</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">A motor speed reference is 1500 rpm and actual speed is 1450 rpm.</p>
            <FormulaBox>{"$$e=1500-1450=50\\ rpm$$"}</FormulaBox>
            <p className="mt-2 text-sm leading-7 text-slate-700">The controller should act to reduce the 50 rpm error.</p>

            <h3 className="mt-4 text-lg font-bold text-slate-950">Example 3: Closed-loop transfer function</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">For unity feedback with forward path $$G(s)=10/(s+2)$$:</p>
            <FormulaBox>{"$$T(s)=\\frac{G(s)}{1+G(s)}=\\frac{10}{s+12}$$"}</FormulaBox>
          </TopicSection>

          <TopicSection id="common-mistakes" title="Common Mistakes">
            <BulletList bulletClassName="bg-rose-500" items={["Assuming every automatic system is closed-loop.", "Forgetting that feedback requires output measurement.", "Confusing disturbance rejection with input tracking.", "Using positive feedback formula for negative feedback problems.", "Ignoring sensor block H(s) in non-unity feedback.", "Thinking closed-loop systems are always stable; feedback can improve or ruin stability depending on design."]} />
          </TopicSection>

          <TopicSection id="interview" title="Interview Questions">
            <BulletList items={["What is a control system?", "What is the difference between open-loop and closed-loop control?", "Why is feedback used?", "Give examples of temperature control, speed control, and AVR.", "What are the advantages and disadvantages of closed-loop systems?", "What is error signal in a feedback system?", "Classify control systems as linear/nonlinear and continuous/discrete with examples."]} />
          </TopicSection>

          <TopicSection id="exam-notes" title="Exam Quick Notes">
            <BulletList items={["Open-loop systems are simple but cannot automatically correct error.", "Closed-loop systems use feedback and can reject disturbances better.", "Negative feedback generally improves accuracy and robustness.", "Closed-loop transfer function for negative feedback is $$G(s)/(1+G(s)H(s))$$.", "Always check whether feedback is unity or non-unity.", "System classification questions are usually quick scoring in GATE/PSU exams."]} />
          </TopicSection>

          <TopicSection id="revision" title="Revision Summary">
            <BulletList bulletClassName="bg-emerald-500" items={["Control Systems regulate output behavior.", "Open-loop systems do not measure output.", "Closed-loop systems compare output with reference input.", "Feedback creates an error signal and enables correction.", "Closed-loop systems improve accuracy but require careful stability design.", "Examples include temperature control, motor speed control, and automatic voltage regulator."]} />
          </TopicSection>

          <TopicSection id="faq" title="Introduction to Control Systems FAQ">
            <div className="mt-4 grid gap-3">
              {faqItems.map((item) => (
                <MiniCard key={item.question} title={item.question}>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                </MiniCard>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="related-topics" title="Related Control Systems Topics">
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {controlSystemTopicPages.slice(0, 4).map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/${topic.slug}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-portal-200 hover:bg-portal-50 hover:text-portal-700"
                >
                  {topic.title}
                </Link>
              ))}
            </div>
          </TopicSection>

          <TopicSection id="practice" title="Practice Questions">
            <h3 className="mt-4 text-lg font-bold text-slate-950">Conceptual</h3>
            <BulletList items={["Explain feedback using a daily-life example.", "Why is a washing machine often treated as open-loop in basic control examples?", "Why can feedback improve disturbance rejection?", "Give one example each of linear, nonlinear, continuous, and discrete control systems."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">Numerical</h3>
            <BulletList items={["Find error if reference is 10 V and actual output is 8.5 V.", "For $$G(s)=5/(s+1)$$ and unity feedback, find $$T(s)$$.", "For $$G(s)=4$$ and $$H(s)=0.5$$, find the closed-loop gain.", "If actual motor speed exceeds reference speed, determine the sign of error using $$e=r-c$$."]} />
            <h3 className="mt-4 text-lg font-bold text-slate-950">MCQs</h3>
            <BulletList items={["A system using output measurement is generally: closed-loop / open-loop / uncontrolled / memoryless.", "The error signal is: reference minus output / output plus input / only disturbance / only noise.", "An automatic voltage regulator is an example of: feedback control / pure open-loop control / no-control system / random system."]} />
          </TopicSection>
        </article>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/subjects/control-systems" className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
            Back to Control Systems
          </Link>
          <Link href="/mathematical-modeling-of-systems" className="next-topic-btn inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700">
            Next Mathematical Modeling of Systems
          </Link>
        </div>
      </div>
    </Layout>
  );
}
