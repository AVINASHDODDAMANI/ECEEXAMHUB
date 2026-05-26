import Link from "next/link";
import Layout from "../components/layout";

function TopicSection({ title, children }) {
  return (
    <section className="topic-section rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-700 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function FormulaCard({ title, formula, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      <p className="mt-2 font-bold text-portal-700">{formula}</p>
      <div className="mt-2 text-sm leading-6 text-slate-700">{children}</div>
    </div>
  );
}

export default function NumberSystemsAndCodesPage() {
  return (
    <Layout
      title="Number Systems and Codes GATE ECE Notes + Conversions + PYQs"
      description="Deep theory notes on number systems, conversions, binary arithmetic, complements, and digital codes for ECE, GATE, PSU, and interviews."
      pageClassName="py-3 sm:py-4"
    >
      <div className="mx-auto max-w-[1440px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li>
              <Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">
                Home
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">
                Subjects
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link
                href="/subjects/digital-electronics"
                className="font-medium text-slate-600 transition hover:text-portal-700"
              >
                Digital Electronics
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                Number Systems and Codes
              </span>
            </li>
          </ol>
        </nav>

        <section className="rounded-[24px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-4 shadow-panel sm:p-5">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Digital Electronics / Number Systems and Codes
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Number Systems and Codes
          </h1>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-800 sm:text-base">
            Learn how information becomes binary data, how bases are converted, why
            complements simplify hardware arithmetic, and how codes represent numbers,
            characters, and transitions inside real digital systems.
          </p>
        </section>

        <div className="mt-5 grid gap-5">
          <TopicSection title="Introduction">
            <p>
              Number systems are methods of representing quantities using symbols and a
              base. Digital electronics uses binary because physical circuits can
              reliably distinguish two voltage regions: LOW and HIGH.
            </p>
            <p>
              Codes are special binary patterns used to represent decimal digits,
              characters, instructions, sensor values, and state information. Without
              number systems and codes, gates and flip-flops would have no meaningful
              data to process.
            </p>
          </TopicSection>

          <TopicSection title="Why This Topic Matters">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Industry relevance: processors, memory, communication frames, ADC outputs, embedded firmware, and digital instruments all store and move data in binary form.</li>
              <li>Hardware relevance: adders, ALUs, counters, registers, decoders, and display drivers depend on binary arithmetic and coding rules.</li>
              <li>Exam relevance: GATE and PSU questions frequently test base conversion, complements, BCD, Gray code, and overflow interpretation.</li>
              <li>Interview relevance: strong candidates can explain why binary is used physically, not just how to convert numbers mechanically.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Prerequisites">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Basic place-value arithmetic</li>
              <li>Powers of 2, 8, 10, and 16</li>
              <li>Simple addition and subtraction</li>
              <li>Meaning of voltage levels LOW and HIGH</li>
              <li>Basic idea of bits and digital storage</li>
              <li>Comfort with repeated division and weighted sums</li>
            </ul>
          </TopicSection>

          <TopicSection title="Basic Intuition">
            <p>
              Think of a number system as a language for counting. Decimal uses ten
              symbols because humans traditionally count with ten fingers. Binary uses
              two symbols because electronic switches are naturally stable in two
              practical states: OFF and ON.
            </p>
            <blockquote className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm font-semibold leading-6 text-amber-950">
              Binary is not chosen because it is short. It is chosen because it is
              electrically reliable.
            </blockquote>
            <p>
              Octal and hexadecimal are compact human-friendly ways to write binary.
              Engineers use hexadecimal because four binary bits map exactly to one hex
              digit, making machine data easier to read.
            </p>
          </TopicSection>

          <TopicSection title="Core Theory Explanation">
            <h3 className="text-base font-bold text-slate-950">1. Positional Number Systems</h3>
            <p>
              In a positional system, the value of a digit depends on both the digit and
              its position. The rightmost position has weight base raised to zero. Moving
              left increases the power of the base.
            </p>
            <p>
              For example, decimal 527 means 5 hundreds, 2 tens, and 7 ones. Binary
              1011 means 1 eight, 0 fours, 1 two, and 1 one.
            </p>

            <h3 className="text-base font-bold text-slate-950">2. Binary Number System</h3>
            <p>
              Binary uses only 0 and 1. Each binary digit is called a bit. A group of
              bits can represent numbers, characters, machine instructions, addresses,
              or logic states.
            </p>

            <h3 className="text-base font-bold text-slate-950">3. Octal and Hexadecimal Systems</h3>
            <p>
              Octal groups binary bits in sets of three. Hexadecimal groups binary bits
              in sets of four. This grouping is useful because long binary numbers are
              hard for humans to read and easy to copy incorrectly.
            </p>

            <h3 className="text-base font-bold text-slate-950">4. Codes</h3>
            <p>
              A code is not always a normal number. BCD stores each decimal digit using
              four bits. Gray code changes only one bit between adjacent values. ASCII
              maps characters to binary patterns. Excess-3 is a self-complementing code
              used in decimal arithmetic concepts.
            </p>
          </TopicSection>

          <TopicSection title="Step-by-Step Mathematical Derivation">
            <h3 className="text-base font-bold text-slate-950">1. General Positional Value</h3>
            <p>
              Suppose a number has digits from left to right. Each digit is multiplied
              by a power of the base. For base $$ r $$:
            </p>
            <p>{"$$ (a_n a_{n-1} ... a_1 a_0)_r = a_n r^n + a_{n-1} r^{n-1} + ... + a_1 r + a_0 $$"}</p>
            <p>
              Physical meaning: position gives weight. A bit in a higher position has
              greater electrical meaning because it contributes a larger numerical
              value to the binary word.
            </p>

            <h3 className="text-base font-bold text-slate-950">2. Binary to Decimal</h3>
            <p>{"For $$ (101101)_2 $$:"}</p>
            <p>{"$$ 1\\times2^5 + 0\\times2^4 + 1\\times2^3 + 1\\times2^2 + 0\\times2^1 + 1\\times2^0 $$"}</p>
            <p>{"$$ = 32 + 0 + 8 + 4 + 0 + 1 = 45 $$"}</p>

            <h3 className="text-base font-bold text-slate-950">3. Decimal to Binary</h3>
            <p>
              Repeatedly divide by 2 and record remainders. The remainders show which
              powers of 2 are needed to build the decimal number.
            </p>
            <p>{"$$ 45_{10} = 101101_2 $$"}</p>

            <h3 className="text-base font-bold text-slate-950">4. Complements</h3>
            <p>
              One's complement flips every bit. Two's complement adds 1 to the one's
              complement. Hardware uses two's complement because subtraction becomes
              addition of a negative number.
            </p>
            <p>{"$$ \\text{2's complement} = \\text{1's complement} + 1 $$"}</p>
          </TopicSection>

          <TopicSection title="Working Principle">
            <ol className="grid gap-2">
              <li>Choose the required representation: binary, octal, decimal, hexadecimal, or code.</li>
              <li>Identify the base and allowed symbols.</li>
              <li>Use positional weights for direct value calculation.</li>
              <li>Use grouping for binary-octal or binary-hex conversion.</li>
              <li>Use complements when subtraction or signed representation is involved.</li>
              <li>Use codes when the binary pattern represents a decimal digit, character, or transition state instead of a pure binary number.</li>
            </ol>
          </TopicSection>

          <TopicSection title="Diagram Explanation">
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
                Number Base Conversion Flow Diagram Here
              </div>
              <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
                Binary Weighted Position Diagram Here
              </div>
              <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
                BCD Code Table Here
              </div>
              <div className="diagram-placeholder flex min-h-[150px] items-center justify-center rounded-2xl border border-portal-100 bg-[#f8fbff] p-4 text-center text-sm font-bold text-portal-700">
                Gray Code Transition Diagram Here
              </div>
            </div>
          </TopicSection>

          <TopicSection title="Important Formulas">
            <div className="grid gap-3 lg:grid-cols-2">
              <FormulaCard title="General positional expansion" formula={"$$ N = \\sum a_i r^i $$"}>
                Here $$ r $$ is the base and $$ a_i $$ is the digit at position $$ i $$.
                It explains why the same digit has different value at different positions.
              </FormulaCard>
              <FormulaCard title="Binary place values" formula={"$$ 2^0, 2^1, 2^2, 2^3, ... $$"}>
                Binary weights are powers of 2. A 1 at a position means that weight is
                included; a 0 means it is absent.
              </FormulaCard>
              <FormulaCard title="One's complement" formula={"$$ 0 \\leftrightarrow 1 $$"}>
                Every bit is inverted. This is easy in hardware but has two zero
                representations, which is why two's complement is preferred.
              </FormulaCard>
              <FormulaCard title="Two's complement" formula={"$$ \\text{2's comp.} = \\text{1's comp.} + 1 $$"}>
                Two's complement gives one unique zero and makes subtraction compatible
                with binary addition circuits.
              </FormulaCard>
              <FormulaCard title="BCD digit range" formula={"$$ 0000 \\text{ to } 1001 $$"}>
                BCD uses four bits for each decimal digit from 0 to 9. Patterns 1010 to
                1111 are invalid for a single BCD digit.
              </FormulaCard>
              <FormulaCard title="Binary to Gray" formula={"$$ G = B \\oplus (B >> 1) $$"}>
                Gray code is formed so adjacent values differ by one bit, reducing
                transition errors in encoders.
              </FormulaCard>
            </div>
          </TopicSection>

          <TopicSection title="Real-World Applications">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Microprocessor registers, addresses, and instruction words</li>
              <li>Memory locations and hexadecimal debugging</li>
              <li>ADC output representation in embedded systems</li>
              <li>Digital display systems using BCD</li>
              <li>Rotary encoders and position sensors using Gray code</li>
              <li>Serial communication data frames using ASCII or binary codes</li>
              <li>ALU subtraction using two's complement</li>
              <li>Digital instruments, counters, calculators, and control panels</li>
            </ul>
          </TopicSection>

          <TopicSection title="Solved Examples">
            <h3 className="text-base font-bold text-slate-950">Beginner Example</h3>
            <p>{"Convert $$ (1101)_2 $$ to decimal."}</p>
            <p>{"$$ 1\\times2^3 + 1\\times2^2 + 0\\times2^1 + 1\\times2^0 = 8+4+0+1=13 $$"}</p>
            <p>{"So, $$ (1101)_2 = (13)_{10} $$."}</p>

            <h3 className="text-base font-bold text-slate-950">Intermediate Numerical</h3>
            <p>{"Convert $$ (156)_{10} $$ to hexadecimal."}</p>
            <p>{"Divide by 16: $$ 156 = 9\\times16 + 12 $$."}</p>
            <p>{"The remainder 12 is written as C in hexadecimal."}</p>
            <p>{"Therefore, $$ (156)_{10} = (9C)_{16} $$."}</p>

            <h3 className="text-base font-bold text-slate-950">Advanced Problem</h3>
            <p>{"Find the 8-bit two's complement representation of $$ -37 $$."}</p>
            <p>{"First write $$ +37 $$ in 8-bit binary: $$ 00100101 $$."}</p>
            <p>{"Take one's complement: $$ 11011010 $$."}</p>
            <p>{"Add 1: $$ 11011011 $$."}</p>
            <p>{"So, $$ -37 $$ in 8-bit two's complement is $$ 11011011 $$."}</p>
          </TopicSection>

          <TopicSection title="Common Mistakes">
            <ul className="grid gap-2">
              <li>Reading a binary number like a decimal number instead of using powers of 2.</li>
              <li>Forgetting to reverse remainders during decimal-to-binary conversion.</li>
              <li>Using BCD as if it were pure binary. BCD 1001 is 9, but 1010 is invalid for one digit.</li>
              <li>Confusing one's complement and two's complement.</li>
              <li>Forgetting fixed word length while representing negative numbers.</li>
              <li>Assuming Gray code is used for arithmetic. It is mainly used for safer transitions.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Comparison Tables">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">System</th>
                  <th className="py-2 pr-3">Base</th>
                  <th className="py-2 pr-3">Symbols</th>
                  <th className="py-2 pr-3">Engineering Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Binary</td><td className="py-2 pr-3">2</td><td className="py-2 pr-3">0, 1</td><td className="py-2 pr-3">Logic circuits and storage</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Octal</td><td className="py-2 pr-3">8</td><td className="py-2 pr-3">0 to 7</td><td className="py-2 pr-3">Compact binary grouping</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Decimal</td><td className="py-2 pr-3">10</td><td className="py-2 pr-3">0 to 9</td><td className="py-2 pr-3">Human-readable values</td></tr>
                <tr><td className="py-2 pr-3">Hexadecimal</td><td className="py-2 pr-3">16</td><td className="py-2 pr-3">0 to 9, A to F</td><td className="py-2 pr-3">Memory, machine code, debugging</td></tr>
              </tbody>
            </table>

            <table className="mt-4 w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-950">
                  <th className="py-2 pr-3">Code</th>
                  <th className="py-2 pr-3">Main Idea</th>
                  <th className="py-2 pr-3">Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">BCD</td><td className="py-2 pr-3">Each decimal digit uses 4 bits</td><td className="py-2 pr-3">Displays and decimal arithmetic</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">Gray</td><td className="py-2 pr-3">Adjacent values differ by one bit</td><td className="py-2 pr-3">Encoders and transition-safe counting</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 pr-3">ASCII</td><td className="py-2 pr-3">Binary code for characters</td><td className="py-2 pr-3">Text and communication</td></tr>
                <tr><td className="py-2 pr-3">Excess-3</td><td className="py-2 pr-3">Decimal digit plus 3 in binary</td><td className="py-2 pr-3">Self-complementing code concepts</td></tr>
              </tbody>
            </table>
          </TopicSection>

          <TopicSection title="Interview Questions">
            <ul className="grid gap-2">
              <li>Why do digital circuits use binary instead of decimal internally?</li>
              <li>Why is hexadecimal preferred while reading machine-level data?</li>
              <li>What is the difference between BCD and pure binary?</li>
              <li>Why is two's complement preferred for signed arithmetic?</li>
              <li>What is the advantage of Gray code in rotary encoders?</li>
              <li>What happens if a BCD digit becomes 1010?</li>
              <li>How does word length affect signed-number representation?</li>
            </ul>
          </TopicSection>

          <TopicSection title="Exam-Oriented Notes">
            <ul className="grid gap-2">
              <li>For binary to decimal, write powers of 2 above each bit before calculating.</li>
              <li>For binary to hexadecimal, group bits in fours from the right side.</li>
              <li>For binary to octal, group bits in threes from the right side.</li>
              <li>In BCD, each decimal digit is converted separately.</li>
              <li>For two's complement, always confirm the word length before solving.</li>
              <li>Gray code questions often check one-bit transition behavior, not arithmetic ability.</li>
            </ul>
          </TopicSection>

          <TopicSection title="Revision Summary">
            <ul className="grid gap-2">
              <li>Digital circuits use binary because two voltage states are reliable and noise-tolerant.</li>
              <li>Every positional number system uses digit weight based on powers of its base.</li>
              <li>Octal and hexadecimal are compact forms of binary representation.</li>
              <li>One's complement flips bits; two's complement flips bits and adds 1.</li>
              <li>BCD represents decimal digits; Gray code reduces transition error.</li>
              <li>{"Key formula: $$ N = \\sum a_i r^i $$."}</li>
            </ul>
          </TopicSection>

          <TopicSection title="Practice Questions">
            <h3 className="text-base font-bold text-slate-950">Conceptual</h3>
            <ul className="grid gap-2">
              <li>Explain why binary representation is suitable for electronic circuits.</li>
              <li>Differentiate between BCD and hexadecimal representation.</li>
              <li>Why does Gray code reduce transition errors?</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">Numerical</h3>
            <ul className="grid gap-2">
              <li>{"Convert $$ (10101101)_2 $$ to decimal and hexadecimal."}</li>
              <li>{"Convert $$ (247)_{10} $$ to binary."}</li>
              <li>{"Find the 8-bit two's complement form of $$ -58 $$."}</li>
            </ul>
            <h3 className="text-base font-bold text-slate-950">MCQs</h3>
            <ul className="grid gap-2">
              <li>Which base is used in hexadecimal number system: 8, 10, 16, or 2?</li>
              <li>How many bits are used to represent one BCD digit?</li>
              <li>Which code changes only one bit between adjacent values?</li>
            </ul>
          </TopicSection>

          <div className="flex justify-end">
            <Link
              href="/logic-gates-and-boolean-algebra"
              className="inline-flex w-full justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700 sm:w-auto"
            >
              Next Logic Gates and Boolean Algebra
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
