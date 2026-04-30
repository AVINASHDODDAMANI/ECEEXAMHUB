export const examGuidePillars = [
  {
    title: "Syllabus Focus",
    description: "See the subject blocks that deserve the most attention for each exam family.",
  },
  {
    title: "Eligibility Basics",
    description: "Use the guide to shortlist suitable exams before reading the current notice.",
  },
  {
    title: "Selection Stages",
    description: "Understand whether the cycle uses CBT only, CBT plus interview, or multi-stage screening.",
  },
  {
    title: "Cutoff Lens",
    description: "Plan around cutoffs as moving targets, not fixed numbers you memorize once.",
  },
  {
    title: "Strategy",
    description: "Match your preparation style to the exam instead of using one common routine everywhere.",
  },
  {
    title: "Roadmap",
    description: "Move from guide to notes to PYQs in a sequence that actually improves recall.",
  },
];

export const examGuideSections = [
  {
    id: 1,
    slug: "gate-ece",
    title: "GATE ECE",
    href: "/ece-exams#gate-ece",
    pyqHref: "/previous-year?exam=GATE",
    shortDescription: "Syllabus priorities, score use-cases, cutoffs, and prep roadmap",
    description:
      "Guide to paper structure, eligibility basics, score targets, and a concept-first preparation plan.",
    icon: "gate",
    accent: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      soft: "bg-blue-50",
    },
    eyebrow: "M.Tech | PSU | Research",
    summary:
      "Use GATE when you want the strongest concept-first exam for higher studies, PSU screening, and long-term core ECE depth.",
    quickFacts: [
      { label: "Primary use", value: "M.Tech admissions, PSU shortlisting, research pathways" },
      { label: "Exam mode", value: "Single CBT with aptitude plus technical coverage" },
      { label: "Cutoff style", value: "Qualifying marks plus institute or recruiter shortlists" },
      { label: "Best prep mode", value: "Concept depth, problem solving, and timed full papers" },
    ],
    syllabus: [
      "Keep General Aptitude and Engineering Mathematics active throughout the full schedule.",
      "Core ECE preparation usually revolves around Networks, Signals, Control, Analog, Digital, Devices, Communications, EMT, and Microprocessors.",
      "After every finished topic, shift immediately into PYQs and short-note revision so theory converts into exam memory.",
    ],
    eligibility: [
      "Recent GATE FAQs allow candidates in the 3rd year or higher of approved programs, as well as degree holders, to apply.",
      "There is generally no age limit for appearing in GATE, but admissions and job usage depend on the receiving institute or recruiter.",
      "Paper choice should match your target admission or recruitment use-case, not just your comfort zone.",
    ],
    selectionProcess: [
      "One computer-based paper determines marks, qualifying status, and score.",
      "The score is then used by institutes, PSUs, and research programs under their own separate rules.",
      "The exam tests depth and consistency, so strong fundamentals matter more than last-minute topic sampling.",
    ],
    cutoffLens: [
      "The qualifying cutoff is only the first threshold; top admissions and recruiter calls often need a much safer margin.",
      "Difficulty level, paper demand, and institute or recruiter preferences can shift the practical target every cycle.",
      "Track the cutoff type you care about: qualifying mark, institute admission, or PSU shortlist.",
    ],
    strategy: [
      "Build concepts and formula recall before chasing too many mocks.",
      "Solve numericals every day and maintain an error log by chapter.",
      "Use topic-wise PYQs first and full-length papers only after the syllabus becomes stable.",
    ],
    roadmap: [
      {
        phase: "Foundation",
        duration: "Weeks 1-6",
        points: [
          "Finish mathematics, networks, and signals basics first.",
          "Create a compact formula book from day one.",
          "Start one PYQ block for every completed chapter.",
        ],
      },
      {
        phase: "Core Build",
        duration: "Weeks 7-14",
        points: [
          "Complete Analog, Digital, Devices, and Control.",
          "Move into medium-difficulty numericals with timed sets.",
          "Revise weak chapters every weekend, not at the end.",
        ],
      },
      {
        phase: "Scoring Layer",
        duration: "Weeks 15-20",
        points: [
          "Add Communications, EMT, and Microprocessors revision.",
          "Start mixed-topic section tests and previous full papers.",
          "Upgrade note-making into last-mile revision sheets.",
        ],
      },
      {
        phase: "Exam Mode",
        duration: "Final 4-6 weeks",
        points: [
          "Attempt full mocks under strict timing.",
          "Revise error logs, formulas, and repeated PYQ patterns.",
          "Reduce new content and focus on accuracy plus speed balance.",
        ],
      },
    ],
    officialNote:
      "Always verify the current GATE brochure for paper combinations, eligibility, and score usage before applying.",
  },
  {
    id: 2,
    slug: "ese-ies",
    title: "ESE / IES",
    href: "/ece-exams#ese-ies",
    pyqHref: "/previous-year?search=ESE",
    shortDescription: "Eligibility, three-stage selection, answer-writing, and cutoff planning",
    description:
      "Guide to UPSC-style prelims, mains, personality test, and a disciplined branch-specific roadmap.",
    icon: "government",
    accent: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      soft: "bg-green-50",
    },
    eyebrow: "UPSC Engineering Services",
    summary:
      "Use this path when you are targeting a structured government engineering exam that demands both objective speed and descriptive technical writing.",
    quickFacts: [
      { label: "Primary use", value: "UPSC engineering services recruitment" },
      { label: "Exam stages", value: "Prelims, mains, and personality test" },
      { label: "Paper style", value: "Objective screening plus conventional technical writing" },
      { label: "Best prep mode", value: "Branch depth, current affairs discipline, and answer practice" },
    ],
    syllabus: [
      "Preparation usually splits into General Studies and Engineering Aptitude plus Electronics and Telecommunication technical coverage.",
      "The mains stage rewards clear written presentation, derivations, structured steps, and diagram-backed answers.",
      "Your syllabus plan should therefore include both objective revision and descriptive recall from the same notes.",
    ],
    eligibility: [
      "An engineering degree in the relevant discipline is the usual base requirement, while age and category relaxations follow the current UPSC notice.",
      "Nationality, medical, and service-related conditions should always be checked from the latest notification rather than old summaries.",
      "Treat eligibility as a notice-reading task, not a one-time assumption.",
    ],
    selectionProcess: [
      "Stage I is the Preliminary Examination with objective papers.",
      "Stage II is the Main Examination with conventional technical papers.",
      "Stage III is the Personality Test, which means written depth and interview readiness both matter.",
    ],
    cutoffLens: [
      "ESE cutoffs are stage-wise, so clearing prelims does not automatically mean the overall target is safe.",
      "The final merit depends on the combined performance across written stages and the personality test.",
      "Track recent stage-wise cutoffs to understand whether your strategy is screening-heavy or final-merit ready.",
    ],
    strategy: [
      "Prepare one set of core notes that can support prelims MCQs and mains descriptive answers together.",
      "Practice writing full technical answers with steps, assumptions, and neat conclusions.",
      "Keep a separate bucket for general studies and engineering aptitude so it does not get ignored by technical prep.",
    ],
    roadmap: [
      {
        phase: "Exam Mapping",
        duration: "Weeks 1-3",
        points: [
          "Read the stage structure and branch syllabus once in full.",
          "List core E&T subjects and the GS&A segments separately.",
          "Create a mains-answer template for later use.",
        ],
      },
      {
        phase: "Technical Depth",
        duration: "Weeks 4-12",
        points: [
          "Build branch notes chapter by chapter with derivations.",
          "Pair objective MCQs with short written answers after each topic.",
          "Start PYQs early to see how UPSC frames the subject.",
        ],
      },
      {
        phase: "Stage Split",
        duration: "Weeks 13-18",
        points: [
          "Shift into prelims speed practice and mains answer-writing blocks.",
          "Add timed writing for numericals, theory, and diagram questions.",
          "Use stage-wise tests instead of only general mock tests.",
        ],
      },
      {
        phase: "Final Refinement",
        duration: "Final 4-6 weeks",
        points: [
          "Revise formulas, standard derivations, and recurring PYQs.",
          "Practice balanced time allocation between objective and written work.",
          "Prepare for interview themes only after written stability is visible.",
        ],
      },
    ],
    officialNote:
      "UPSC updates age limits, dates, and detailed rules every cycle, so the current notification should always override summary guidance.",
  },
  {
    id: 3,
    slug: "psu-exams",
    title: "PSU Exams",
    href: "/ece-exams#psu-exams",
    pyqHref: "/previous-year?search=BEL",
    shortDescription: "Recruiter-specific patterns, written tests, interviews, and GATE-based routes",
    description:
      "Guide to PSU-style technical recruitment across BEL, ECIL, DRDO, ISRO, HAL, NTPC, and related recruiters.",
    icon: "industry",
    accent: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      soft: "bg-orange-50",
    },
    eyebrow: "BEL | ECIL | DRDO | ISRO | HAL",
    summary:
      "Treat PSU preparation as a family strategy: the core syllabus overlaps heavily, but the selection route and final shortlist logic can vary a lot by recruiter.",
    quickFacts: [
      { label: "Primary use", value: "Technical recruitment in public-sector and research organizations" },
      { label: "Exam stages", value: "Varies by recruiter: GATE, written test, interview, or mixed stages" },
      { label: "Cutoff style", value: "Vacancy-driven and recruiter-specific" },
      { label: "Best prep mode", value: "Common-core mastery plus recruiter-wise pattern tracking" },
    ],
    syllabus: [
      "Core Electronics, Analog, Digital, Devices, Communications, Signals, Networks, and EMT form the common preparation base.",
      "Some recruiters lean harder on formula recall and one-step MCQs, while others expect GATE-style depth or interview-ready fundamentals.",
      "Aptitude, reasoning, or recruiter-specific awareness can appear depending on the advertisement, so the notice must shape the final plan.",
    ],
    eligibility: [
      "A relevant B.E. or B.Tech. degree is the usual baseline, while age limits, percentage criteria, and final-year eligibility vary by recruiter.",
      "Some cycles use GATE score filters, while others call eligible candidates directly to a written test or interview process.",
      "Do not assume one PSU notice represents all PSU hiring patterns.",
    ],
    selectionProcess: [
      "Recent official recruiter pages show mixed models: written tests, interviews, GATE-based shortlisting, or written-plus-interview combinations.",
      "BEL advertisements and shortlist pages commonly reference written-test routes, while ISRO cycles may use written tests, interviews, or GATE-linked screening depending on the post.",
      "Document verification and medical or service-condition checks can become important after the technical shortlist stage.",
    ],
    cutoffLens: [
      "Cutoffs are highly vacancy-sensitive because many PSU recruitments have limited openings.",
      "A GATE score that qualifies may still be far below a recruiter shortlist, and a written-test pass line may not guarantee interview safety.",
      "Track recruiter-specific cutoffs, not just a generic PSU benchmark.",
    ],
    strategy: [
      "Study one common ECE core stack, then maintain separate folders for BEL, ISRO, ECIL, DRDO, and other target-specific PYQs.",
      "Revise formulas aggressively because many recruiter papers reward speed on direct concept checks.",
      "If a recruiter uses interviews, convert short notes into explanation-ready revision points, not just formula memory.",
    ],
    roadmap: [
      {
        phase: "Common Core",
        duration: "Weeks 1-6",
        points: [
          "Build the shared ECE base first.",
          "Collect recruiter-wise PYQs and notice patterns in a tracker.",
          "Mark topics that repeat across BEL, ISRO, and other targets.",
        ],
      },
      {
        phase: "Recruiter Mapping",
        duration: "Weeks 7-10",
        points: [
          "Group recruiters by exam style: GATE-based, written-test heavy, or interview-heavy.",
          "Create one-page notes for direct-recall chapters.",
          "Start short timed tests with recruiter-style difficulty.",
        ],
      },
      {
        phase: "Shortlisting Push",
        duration: "Weeks 11-16",
        points: [
          "Attempt company-specific PYQ bundles and direct concept drills.",
          "Revisit weak formula chapters more often than comfortable ones.",
          "Keep one folder for interview explanations if your target usually includes interviews.",
        ],
      },
      {
        phase: "Notice-Driven Finish",
        duration: "Final 3-5 weeks before a target cycle",
        points: [
          "Align prep with the exact advertisement pattern and weightage.",
          "Revise direct questions, recruiter-specific repeated areas, and shortlist-sensitive topics.",
          "Prepare documents and profile notes early if interview or DV may follow.",
        ],
      },
    ],
    officialNote:
      "Recruitment mode, age criteria, and score usage vary sharply across PSUs and research organizations, so the current advertisement always wins over general guidance.",
  },
  {
    id: 4,
    slug: "ssc-je-ece",
    title: "SSC JE (ECE)",
    href: "/ece-exams#ssc-je-ece",
    pyqHref: "/previous-year?search=SSC",
    shortDescription: "Notice-first eligibility check, common sections, and electrical-stream caution",
    description:
      "Guide for ECE students evaluating SSC JE-style preparation, with emphasis on official stream alignment and exam-stage planning.",
    icon: "document",
    accent: {
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      soft: "bg-violet-50",
    },
    eyebrow: "Notice-driven stream check",
    summary:
      "This is the one exam family where eligibility mapping matters before preparation depth: treat SSC JE as a notice-first opportunity, not an automatic ECE target.",
    quickFacts: [
      { label: "Primary use", value: "Junior Engineer recruitment through SSC" },
      { label: "Exam stages", value: "Paper I, Paper II, and post-exam verification stages" },
      { label: "Official caution", value: "Current notices list Civil, Electrical, and Mechanical streams" },
      { label: "Best prep mode", value: "Check stream fit first, then build exam-specific routine" },
    ],
    syllabus: [
      "The official exam pattern uses common screening components along with the General Engineering part chosen in the application.",
      "Recent official notices list Civil, Electrical, and Mechanical streams, so ECE students should verify whether their qualification maps to the Electrical route in the current cycle.",
      "Do not spend months on this path until the eligibility stream mapping is clear for your degree and target post.",
    ],
    eligibility: [
      "Read the current SSC JE notice carefully before committing, especially if you are from Electronics and Communication rather than Electrical.",
      "Qualification rules, stream mapping, age limits, and post-specific requirements can affect whether this is a practical target.",
      "Use this guide as a screening aid, not as a substitute for the official notice.",
    ],
    selectionProcess: [
      "Recent SSC JE notices describe Paper I and Paper II as objective, computer-based stages.",
      "Candidates are required to attempt the General Engineering part aligned to the stream selected in the application.",
      "Verification and other post-exam formalities follow the written stages, so accuracy and eligibility both matter.",
    ],
    cutoffLens: [
      "SSC cutoffs are normalized and can differ by post, category, and available vacancies.",
      "Because the exam is multi-stage, clearing one paper safely still may not protect the final outcome.",
      "If your stream fit is borderline, cutoff planning matters less than eligibility clarity at the start.",
    ],
    strategy: [
      "Confirm stream alignment first, then prepare the common screening areas and engineering portion together.",
      "Use PYQs to understand question brevity, negative marking pressure, and how quickly standard topics are tested.",
      "If you remain uncertain about eligibility, prioritize broader ECE exams first and keep SSC JE as a secondary target.",
    ],
    roadmap: [
      {
        phase: "Eligibility Check",
        duration: "Week 1",
        points: [
          "Read the current notice fully.",
          "Confirm whether your qualification maps to the relevant stream.",
          "Skip deep prep if the stream fit is not clear.",
        ],
      },
      {
        phase: "Common Sections",
        duration: "Weeks 2-5",
        points: [
          "Build the common exam areas listed in the notice.",
          "Create short revision sheets for fast-recall topics.",
          "Start objective-only practice early.",
        ],
      },
      {
        phase: "Engineering Route",
        duration: "Weeks 6-10",
        points: [
          "Prepare the allowed General Engineering route that matches your application.",
          "Use PYQs to learn question style and negative-marking discipline.",
          "Do short timed rounds instead of only long study sessions.",
        ],
      },
      {
        phase: "Final Exam Control",
        duration: "Final 3-4 weeks",
        points: [
          "Focus on speed, clean question selection, and accuracy.",
          "Revise common traps and direct formulas repeatedly.",
          "Keep all document and eligibility proofs ready well before results.",
        ],
      },
    ],
    officialNote:
      "Recent SSC JE notices list Civil, Electrical, and Mechanical General Engineering streams, so ECE candidates should verify current stream eligibility before relying on this path.",
  },
  {
    id: 5,
    slug: "rrb-je-electronics",
    title: "RRB JE (Electronics)",
    href: "/ece-exams#rrb-je-electronics",
    pyqHref: "/previous-year?search=RRB",
    shortDescription: "CBT-1, CBT-2, post-specific eligibility, and region-wise cutoff thinking",
    description:
      "Guide to railway JE recruitment flow, stage planning, and zone- or post-specific preparation priorities.",
    icon: "train",
    accent: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-700",
      soft: "bg-rose-50",
    },
    eyebrow: "Railway recruitment flow",
    summary:
      "RRB JE works best for candidates who can prepare in a stage-wise manner: clear the screening stage, then convert that into technical performance for the main shortlist.",
    quickFacts: [
      { label: "Primary use", value: "Railway JE and allied technical recruitment" },
      { label: "Exam stages", value: "CBT-1, CBT-2, document verification, and medical checks" },
      { label: "Cutoff style", value: "Post, region, and category specific" },
      { label: "Best prep mode", value: "Stage-wise preparation with post-specific filtering" },
    ],
    syllabus: [
      "Treat CBT-1 as a screening stage and CBT-2 as the stage that truly converts the shortlist into selection momentum.",
      "Technical preparation should stay tied to the exact post family and notification rather than a generic electronics assumption.",
      "Use PYQs to spot whether your weak area is screening speed or technical conversion.",
    ],
    eligibility: [
      "Post eligibility can vary by post code, board, and notification, so diploma-versus-degree fit must be checked carefully.",
      "Do not assume every JE opening maps cleanly to Electronics; post families and qualifications can differ within the same CEN.",
      "Keep your target post list fixed early because the study emphasis can shift with the post.",
    ],
    selectionProcess: [
      "Recent official recruitment flows show a 1st Stage CBT, a 2nd Stage CBT, and then document verification plus medical examination.",
      "Candidates are shortlisted stage by stage, and later panels or additional rounds can still depend on merit and vacancy movement.",
      "This means your preparation should be split into screening survival and main-stage conversion.",
    ],
    cutoffLens: [
      "RRB cutoffs are not just exam-wide; they can be post-, category-, and region-sensitive.",
      "A safe CBT-1 score may only earn a CBT-2 chance, not final selection comfort.",
      "Read cutoff lists with post preference and zone reality in mind, not as one national number.",
    ],
    strategy: [
      "Train for speed and calm decision-making in CBT-1, but never let that replace technical revision for CBT-2.",
      "Build a compact post-specific note bank and revise it repeatedly after every mock.",
      "Track your score separately for screening topics and technical topics so you know which stage is failing.",
    ],
    roadmap: [
      {
        phase: "Post Selection",
        duration: "Weeks 1-2",
        points: [
          "Read the current CEN and shortlist the exact post family.",
          "Match degree or diploma eligibility before deep study.",
          "Create separate buckets for screening and technical prep.",
        ],
      },
      {
        phase: "CBT-1 Control",
        duration: "Weeks 3-6",
        points: [
          "Practice fast mixed-paper rounds and review weak sections daily.",
          "Focus on consistency, not only best-case mock scores.",
          "Keep technical revision alive even during screening-heavy weeks.",
        ],
      },
      {
        phase: "CBT-2 Conversion",
        duration: "Weeks 7-12",
        points: [
          "Shift toward technical accuracy and post-linked topics.",
          "Use PYQs and mock sets to understand shortlist-sensitive chapters.",
          "Revise post-preference implications once the notice is stable.",
        ],
      },
      {
        phase: "Final Readiness",
        duration: "Final 3-4 weeks",
        points: [
          "Run targeted mocks with more review than volume.",
          "Collect documents and keep eligibility proofs organized.",
          "Prepare for verification and medical requirements early, not after results.",
        ],
      },
    ],
    officialNote:
      "RRB JE eligibility, post mapping, and cutoff interpretation should always be checked against the current CEN and the relevant board updates.",
  },
  {
    id: 6,
    slug: "state-ae-je",
    title: "State AE / JE Exams",
    href: "/ece-exams#state-ae-je",
    pyqHref: "/previous-year?search=state",
    shortDescription: "State-notification tracking, paper mix, and region-wise roadmap planning",
    description:
      "Guide to state engineering recruitment where pattern, syllabus weightage, and vacancy movement can change from board to board.",
    icon: "state",
    accent: {
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-700",
      soft: "bg-cyan-50",
    },
    eyebrow: "APPSC | TSPSC | KPSC | TNPSC and others",
    summary:
      "Treat state AE and JE exams as notification-driven opportunities that reward flexibility, regional awareness, and a reusable ECE core base.",
    quickFacts: [
      { label: "Primary use", value: "State-level engineering recruitment" },
      { label: "Exam stages", value: "Board-specific: written tests, interviews, or mixed filters" },
      { label: "Cutoff style", value: "Vacancy- and board-specific" },
      { label: "Best prep mode", value: "Reusable core notes plus notification-specific customization" },
    ],
    syllabus: [
      "Most state exams still reward a stable ECE foundation in core technical subjects, even when paper structure changes.",
      "Some boards add aptitude, general studies, or local-language and state-awareness layers on top of the technical paper.",
      "This is one of the strongest use-cases for modular notes because the common technical base can be reused across boards.",
    ],
    eligibility: [
      "Qualification, age, domicile, and reservation rules can vary significantly across boards and advertisements.",
      "Read every state notification separately because one board's eligibility logic cannot be reused safely for another.",
      "Treat state-board applications as notice-management tasks as much as study tasks.",
    ],
    selectionProcess: [
      "Some state boards rely mainly on written tests, while others can include interviews or document-led shortlisting layers.",
      "Paper mix and marking can differ enough that you should not force a single mock strategy across all boards.",
      "The better approach is one stable core plus a short notification-specific adaptation phase.",
    ],
    cutoffLens: [
      "State cutoffs move heavily with local vacancy counts, reservation structure, and participation levels.",
      "A good score in one board's cycle should not become the target assumption for another board.",
      "Track patterns board by board and year by year rather than looking for one universal state-exam benchmark.",
    ],
    strategy: [
      "Keep one common ECE revision system and layer each board's extra requirements on top of it.",
      "Build a checklist for every notification: eligibility, syllabus, weightage, extra sections, and documents.",
      "Use previous papers mainly to decode weightage and tone rather than only to memorize repeated questions.",
    ],
    roadmap: [
      {
        phase: "Board Tracking",
        duration: "Ongoing",
        points: [
          "Track the boards and posts you care about in one sheet.",
          "Save notification summaries with dates and core rules.",
          "Keep documents and category proofs updated in advance.",
        ],
      },
      {
        phase: "Reusable Core",
        duration: "Weeks 1-8",
        points: [
          "Build one strong ECE technical base.",
          "Create modular chapter notes you can reuse across boards.",
          "Start state PYQs to study weightage shifts.",
        ],
      },
      {
        phase: "Board Customization",
        duration: "After notification release",
        points: [
          "Adapt to the exact paper structure of the board.",
          "Add aptitude, GS, or local requirements if present.",
          "Drop low-relevance topics once the board pattern is clear.",
        ],
      },
      {
        phase: "Final Push",
        duration: "Final 3-4 weeks",
        points: [
          "Revise board-heavy chapters and repeated PYQ clusters.",
          "Practice only the sections that match the current notification.",
          "Keep administrative readiness as tight as academic readiness.",
        ],
      },
    ],
    officialNote:
      "State AE and JE recruitment rules can vary significantly, so each board's current notification must override any general planning summary.",
  },
];
