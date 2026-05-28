const embeddedTopics = [
  {
    slug: "introduction-to-embedded-systems",
    title: "Introduction to Embedded Systems",
    summary: "Understand embedded-system meaning, characteristics, types, applications, and the sensor-to-processing-to-output flow.",
    concepts: ["Dedicated function", "Real-time behavior", "Hardware-software interaction", "Sensor to output"],
    subtopics: ["Definition of embedded systems", "Characteristics", "Standalone systems", "Real-time systems", "Applications"],
    visualFocus: "sensor input, firmware processing, and controlled output",
  },
  {
    slug: "embedded-system-architecture",
    title: "Embedded System Architecture",
    summary: "Study processor, memory, input/output devices, sensors, actuators, ADC, DAC, timers, firmware, drivers, and middleware.",
    concepts: ["Processor", "Memory", "I/O", "Sensors and actuators", "Firmware"],
    subtopics: ["Basic architecture", "Hardware components", "ADC and DAC", "Timers and counters", "Software components"],
    visualFocus: "processor-memory-I/O cooperation",
  },
  {
    slug: "microcontrollers",
    title: "Microcontrollers",
    summary: "Build intuition for 8051 architecture, CPU, RAM, ROM, I/O ports, timers, serial communication, ARM basics, and registers.",
    concepts: ["8051 architecture", "I/O ports", "Timers", "Serial communication", "ARM basics"],
    subtopics: ["Introduction to microcontrollers", "8051 CPU", "RAM and ROM", "Register organization", "ARM processor basics"],
    visualFocus: "CPU, register, memory, timer, serial, and GPIO data flow",
  },
  {
    slug: "embedded-c-programming",
    title: "Embedded C Programming",
    summary: "Learn Embedded C basics, data types, variables, bitwise operations, functions, pointers, and interrupt programming.",
    concepts: ["Embedded C", "Bitwise operations", "Pointers", "Register programming", "Interrupts"],
    subtopics: ["Data types and variables", "Bitwise operations", "Functions and pointers", "Interrupt programming"],
    visualFocus: "C statements becoming register-level hardware action",
  },
  {
    slug: "interfacing-techniques",
    title: "Interfacing Techniques",
    summary: "Understand LED, LCD, keyboard, sensor, and motor interfacing with GPIO, timing, drivers, and feedback.",
    concepts: ["LED interfacing", "LCD flow", "Keyboard scanning", "Sensor input", "Motor control"],
    subtopics: ["LED interfacing", "LCD interfacing", "Keyboard interfacing", "Sensor interfacing", "Motor interfacing"],
    visualFocus: "microcontroller pins driving and reading external peripherals",
  },
  {
    slug: "communication-protocols",
    title: "Communication Protocols",
    summary: "Compare UART, SPI, I2C, CAN, USB basics, and data packet transfer in embedded systems.",
    concepts: ["UART", "SPI", "I2C", "CAN", "Data frame"],
    subtopics: ["UART communication", "SPI protocol", "I2C protocol", "CAN protocol", "USB basics"],
    visualFocus: "controller-to-device data transfer and acknowledgement",
  },
  {
    slug: "timers-counters-and-interrupts",
    title: "Timers, Counters, and Interrupts",
    summary: "Study timers, counters, interrupt basics, interrupt handling, watchdog timer, and PWM generation.",
    concepts: ["Timer", "Counter", "Interrupt", "Watchdog", "PWM"],
    subtopics: ["Timers and counters", "Interrupt basics", "Interrupt handling", "Watchdog timer", "PWM generation"],
    visualFocus: "clock ticks turning into flags, interrupts, and PWM output",
  },
  {
    slug: "real-time-operating-systems-rtos",
    title: "Real-Time Operating Systems (RTOS)",
    summary: "Understand RTOS basics, tasks, threads, scheduling, semaphores, mutexes, and interprocess communication.",
    concepts: ["Tasks", "Threads", "Scheduling", "Semaphore", "Mutex"],
    subtopics: ["Basics of RTOS", "Tasks and threads", "Scheduling algorithms", "Semaphores and mutex", "Interprocess communication"],
    visualFocus: "priority-based task execution and synchronization",
  },
  {
    slug: "memory-and-power-management",
    title: "Memory and Power Management",
    summary: "Connect memory organization, EEPROM, Flash, cache, low-power modes, wake-up flow, and power optimization.",
    concepts: ["Flash", "EEPROM", "RAM", "Cache", "Low-power modes"],
    subtopics: ["Memory organization", "EEPROM and Flash", "Cache basics", "Power optimization", "Low power modes"],
    visualFocus: "runtime memory access and sleep-wake behavior",
  },
  {
    slug: "embedded-system-design-process",
    title: "Embedded System Design Process",
    summary: "Follow requirement analysis, hardware-software co-design, testing, debugging, PCB basics, and validation.",
    concepts: ["Requirement analysis", "HW-SW co-design", "Testing", "Debugging", "Validation"],
    subtopics: ["Requirement analysis", "Hardware-software co-design", "Testing and debugging", "PCB design basics", "Embedded validation"],
    visualFocus: "requirement-to-product engineering workflow",
  },
  {
    slug: "advanced-embedded-applications",
    title: "Advanced Embedded Applications",
    summary: "Explore IoT, wireless embedded systems, automotive embedded control, robotics, and AI in embedded systems.",
    concepts: ["IoT", "Wireless systems", "Automotive ECU", "Robotics", "Edge AI"],
    subtopics: ["IoT basics", "Wireless embedded systems", "Automotive embedded systems", "Robotics applications", "AI in embedded systems"],
    visualFocus: "connected embedded applications from sensor node to control output",
  },
];

function topicDetail(topic, index) {
  const previous = embeddedTopics[index - 1];
  const next = embeddedTopics[index + 1];

  return {
    shortTitle: topic.title,
    metaTitle: `${topic.title} GATE ECE Embedded Systems Quick Notes + PYQs + Revision`,
    metaDescription: `Learn ${topic.title} with Embedded Systems quick notes, GATE Embedded Systems revision, PSU exam focus, interview-ready intuition, and lightweight animated visualization.`,
    keywords:
      "Embedded Systems quick notes, GATE Embedded Systems, Embedded C tutorial, Microcontroller programming, Embedded Systems for PSU, RTOS interview questions",
    coreQuestion: `What engineering idea makes ${topic.title} useful in real embedded products?`,
    examFocus: topic.concepts.slice(0, 3).join(", "),
    engineeringUse:
      "Used in microcontroller products, industrial controllers, automotive ECUs, medical instruments, IoT nodes, robots, and real-time embedded devices.",
    intro: [
      `${topic.title} is a core Embedded Systems topic because it connects circuit-level hardware with firmware behavior and real product constraints.`,
      "For GATE ECE, PSU exams, university semester learning, and interview preparation, study the topic as a flow: input, processing, timing, communication, and output.",
    ],
    intuition:
      `Think of ${topic.title} as an engineering chain. A good answer names the hardware block, the software decision, and the timing or reliability reason behind it.`,
    learningGoals: [
      `Build beginner-friendly intuition for ${topic.title}.`,
      "Connect the visual flow with GATE and PSU objective questions.",
      "Remember the labels, buses, registers, tasks, or signals that are likely to appear in interviews.",
    ],
    keyConcepts: topic.concepts,
    theoryCards: [
      { title: "Core idea", detail: topic.summary },
      {
        title: "How to read exam questions",
        detail:
          "First identify whether the question is asking about hardware, firmware, timing, communication, memory, power, or design flow.",
      },
      {
        title: "Visualization focus",
        detail: `The animation highlights ${topic.visualFocus}, keeping the topic practical instead of definition-heavy.`,
      },
      {
        title: "Revision mindset",
        detail:
          "For every chapter, keep one block diagram, one timing idea, and one real product example in mind.",
      },
    ],
    formulas: [
      {
        label: "Embedded design flow",
        expression: "sense -> process -> decide -> communicate/control -> verify",
        note: "Use this chain to organize theory answers and debug embedded-system diagrams.",
      },
    ],
    examples: [
      {
        title: `${topic.title} exam check`,
        prompt: `A question asks about ${topic.title}. What is the safest first step?`,
        steps: [
          "Mark the input, processing block, memory/register/task, and output or communication path.",
          `Recall the high-yield labels: ${topic.concepts.join(", ")}.`,
          "Check timing, priority, power, or reliability only after the signal path is clear.",
        ],
        answer:
          "Start from the block-level flow, then attach the correct firmware, protocol, or timing detail. This avoids memorizing disconnected facts.",
      },
    ],
    examPointers: [
      "Draw a compact block diagram before answering conceptual Embedded Systems questions.",
      "Separate microcontroller hardware, Embedded C behavior, protocol timing, and RTOS scheduling.",
      "Use the visualization as a quick revision cue before solving previous-year questions.",
    ],
    commonMistakes: [
      "Studying hardware and software separately without tracking their interaction.",
      "Ignoring timing, interrupts, and power constraints in real-time embedded examples.",
      "Confusing register-level configuration with high-level programming logic.",
    ],
    quickRevision: [
      `High-yield terms: ${topic.concepts.join(", ")}.`,
      "Revise one practical example and one exam-style block diagram.",
      "Practice explaining the topic in two lines for interview preparation.",
    ],
    insightSummary:
      `${topic.title} becomes easier when you read it as a controlled data flow between hardware blocks and firmware decisions.`,
    relatedTopics: [previous, next]
      .filter(Boolean)
      .map((item) => ({ subjectSlug: "embedded-systems", topicSlug: item.slug })),
  };
}

export const embeddedLearningSubject = {
  slug: "embedded-systems",
  name: "Embedded Systems",
  weightage: "4-6 marks",
  description:
    "Study microcontrollers, Embedded C, interfacing, communication protocols, timers, interrupts, RTOS, memory, power, design flow, and modern embedded applications.",
  chapters: embeddedTopics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    topics: [
      {
        slug: topic.slug,
        title: topic.title,
        summary: topic.summary,
        estimatedTime: "35 min",
        status: "ready",
        concepts: topic.concepts,
        subtopics: topic.subtopics,
      },
    ],
  })),
};

export const embeddedTopicPageMap = embeddedTopics.reduce((pages, topic, index) => {
  pages[topic.slug] = topicDetail(topic, index);
  return pages;
}, {});

export { embeddedTopics };
