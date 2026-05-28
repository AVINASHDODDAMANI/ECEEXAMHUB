import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const diagramImages = {
  phasor: [
    "https://images.openai.com/static-rsc-4/4Lhalmq_UEAZgI-FKz9OvU8T47VxYxsyt4l7fpnEK7WRwmABG9TP_ZJi6hQWAM3DJLK0wcBiCL61GrM8i7CGmTIJcsRyZCQeRxXdTJUj6VFDOH9fH5421JdfRY1_zlT-EERj0BJczKJRcLSYCBuAhMs6ivR_ruj4D7L2U1wr6VyImh1Ox_6pb9hV43MRIFI9?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/VhuLUDJQ-lbOk3n-C3uWvrjdttjAlIFeF3Q1_TSZVVBwsWJSXa12c0LmxFBwvDTQiD5dNTka6C8qG3WxlTbcYukrcSRDSR8pWvtji43HM5IQwMUrd1rShT3vcJGKgJVhw05KOvNQ8dKIGbda1cJWcJf5n0Fo0X-mvbPd4YGcKU904TRN8O41Pm88OZ2R_44O?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/UF2lMCOxZm-8Ha-v8tT-glhqV75rPWRyD2e1D-iKeIXp3fym6AkwDvl17WjAIuvK_xhmV54V1BT53g0PHGQXE9RGeyUuTB99MFpwsTL90kNBpSaLkbD8B2gfZcRENR4ejusOJ0IZ7u9u-XehD8_OQJzqtQswKQm9iVQtQ8v5AnqjXsaBLJf8tLgcOxWfuOEg?purpose=fullsize",
  ],
  resistive: [
    "https://images.openai.com/static-rsc-4/7ydE4yaLKBdaBBGBt7DvaN6IuM9KgIJDCi6HxGrfPtaSIXIyhg3RyhijpLkAMl2JJofluQiLYT7A-3ZokQ8ASXa_AMHwQmOp4ewvknNgHxO-xZHUqAju5ZD3PgAF7urSuzSWqjq4SvdRpQ4SZUz7qmMAELxoug6l5OIdS47ETy-e6xMewoXfXG2HxvuIl58S?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/UMtBvqJK_FCiU6dbTTNzbjRbYWnNaRiI0N4GitqVDGHBjWFhJ2dqM6j9O4rj3yC2alJHIo61S9GWdTK1kqMy9TZQEsDVSa1S1tb_J3MKVJ-AqJqZjVj9LjziTpvV0oNO3tq0sE5pU8Ji-HDBBS9Zw5tq6obH7d1DVC47AFuPDJDKFtxLO2bPvpwogdZGTfpX?purpose=fullsize",
  ],
  inductive: [
    "https://images.openai.com/static-rsc-4/9YFCYQw9q2pe77BP_Q9fq25jf6ZRE-4pgyhzb2OIuQv8vzzqEUF7sANYBwja4072tJDLw4N-la-csNFB5CeWlEd8uNLOpUrH6J6IH9v00atyTkaeqLhDo-oblB3ukAzbI9oSW4dZ6l2WmxXj364MLqW1oa9lxj-r0UwRdjAEX-BKoF54SRg56uvdnLHyXqKK?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/W_SonJVtneQEwdoM3Ci4LqFMyR0O5xwsbNAO8IjNY51l3y3uMGuSeg1iGzXQFdPFYMSz0Ax1VXVEXAt8u-RH-Ujv6cpTbabgnFpk3yPWvRH57fd1W5yyx6ent7pkSdfbvKy1W7tKvoHhmm6woYuGsGwVePIcDOViwIviBZMDQrsXId3C-eveMYPJZ2myhrm5?purpose=fullsize",
  ],
  capacitive: [
    "https://images.openai.com/static-rsc-4/aezf43n0A9m6IhQ7_H_yn8sRiV0BJ2MCbAnt1OfE4L18Mj-R9OzZopjJcjyu7SpNsW3Ut88SBNq7qVE1vV2y49vUOdPtot9w3lWsA7lNzQl2CrrZR94v3qZrl9Na6RFZKZvE8nTQ5tRh4eMyqwXi9W7puQm7UxFbDdatray-0r3EEsdYgGvktIUTqINRaXvB?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/WlWDoP6lmp_C_UZRsjPF2KVa6kl_36EoQEnVwADZQjoZFCIjg1jPU1NO_Qjae_kxQrRDeG2QCfSYXqzn_XnywxvBHpc_SuNcKtB22CzypJ_lp4tiivGL2N-0kxW7ma2eRAS8QS53H7p7cS9q8Hluv2U6uZrM64D7kRSLb_uKlCdMG0UwKgHnOXEv9hMeRbQq?purpose=fullsize",
  ],
  seriesRlc: [
    "https://images.openai.com/static-rsc-4/QbMEQAxL88sp-h-1UIoiMy2Be_0ezaIFbiJzxBSoqTuThCn_3lzI5lJEPvST_nGNm0B4UAJK7F3wRc_DHDEQLXbTDgV7EgE1CTw73D8K1akNJmPckugJmsG6gnCM6PvjPhKLlweIo0ipAvIgppSFr4NzB8quEgPehgz1hbZeH1fjyETUDp61Kk7qZcYsH3Eg?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/RnwfsgBx0TrKP7_rhBf1VzIVX72pCmUXxA9pY50QZe0tTh9irJnKjK1fqXQm5XB2n0vAiHw6GJWDHLzxSZPZ3oZ40vB0pU0VywEoKoNjv4194xb2zhLHk0TWvV49LiX9SEY2Ta2dyRPm_3V_QJwjuQrkDbt9slAAd-b1pO0tPg6cnubSF4T-3FNz17m1TXpW?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/Yy8THR6RWqSzBQtC6_H-ttFjeWmYXmO130vxo6I_O8qmeF-oLnBd_EuAYNC_DKUgNg5o7dMLHqeyelKnz3VGbEoaZX-bGD4N9iX7Uq3hjeTYQtJL-DRam7XHIq-oxNNk_vok6lb3WkUWht0xVqlf4tqp-Y6x2NgCT8Btk1eY00vmt0cqJoPntFX0Fn_zOV86?purpose=fullsize",
  ],
  parallelRlc: [
    "https://images.openai.com/static-rsc-4/-suUNI2nmVhvC2VWRTZPpHXnZmsnRvnUOr9ASSpSf_2sZEW75hVdR8Dr8IMgbwkU3sFymM8g-F_caUAXK5Oq9JjSm52an3yNOdfd4tKHNi-E--CfiamXXBGjGXRnGEKO6TJmq739WoDc_QJuQq8C0GxoT8iVgxjsSAK9BfCxL36CV_wjRRiR0XBgNo5ZMj6l?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/CLSSbpYsgPwtFoMcWH8H3MN1iCgp6OvDK3EutNNLuLyHCNXzRh4-kPR_B7bUUoFG0IA5VRXwUNPRocFQOKS4AHRixmxtcpVKcequNBXUyAIUmSlK4f3vALa-1ooRTbkZy4D0JYOFQNWTBXViaFc42hHB_nt242gE_8314-Aha7iAtwatwKBfRuIW_L2UcP55?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/xSezTdtP4jUM_0EOov3RqThpRfqxOIorLW7ODbvpxPuf-_CCGKMIAKZFsQ2rcpRLOx7VKczWE2Zv8QHPzYoZay8e1_eoYFJp-LAp3k7_Vs6rhKDP7fBcHuFnvkXurH-WIN7LJRNthlP90EBPIYvMFopIuW1asy4fNHpn4zMmXRF7nOMb4fTWV-OT11LXz6Sm?purpose=fullsize",
  ],
  power: [
    "https://images.openai.com/static-rsc-4/I__PGY4ecXuI8O1hqodq8GHuSuvwjB14NjGx80GCtviDlWOpEN2GNbdbQTL9fetyJG9If29XQLzzbyx1OLaCsig0EIRhl0yHIYi5bJpBPQX1YKm0R_JxHbVExip3kgFiVDq0G3dym3vhWEUQ7QdLITPBv7GL2KDTdAROVteWNaQokPgVsQvvrjtyIsmiKnmT?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/gCTRjd4A1n_LzNGpuZvA7P7FJOwAVq1Cr9-b0mHwIC191go4wB4ylTzstCsnj-K8vN_cktHI6mOJM6GFBVNg1Bt1_uG5jbUc35wVW1RNPqnvuXb3S3cXOf422wCC4OkL7VV_7NbyRWDGHUlxo4pXV7W6SrmzS4n7_DgsnduZkQAQG9zsyifQZXcOyo00Ustk?purpose=fullsize",
  ],
};

const quickSummary = [
  "AC analysis uses phasors and complex numbers.",
  "Impedance replaces resistance in sinusoidal steady state.",
  "Reactance depends on frequency.",
  "Phase angle decides leading, lagging, and power behavior.",
  "RLC circuits are the basis of practical AC networks.",
];

const solutionSteps = [
  "Convert sinusoidal sources into RMS phasors.",
  "Replace R, L, and C by their impedance forms.",
  "Apply Ohm's Law, KVL, KCL, nodal analysis, or mesh analysis.",
  "Solve the equations using complex algebra.",
  "Convert the result back to time domain only when the question asks for it.",
];

function FormulaBox({ children }) {
  return (
    <p className="mt-3 rounded-xl border border-portal-100 bg-portal-50/70 px-4 py-3 font-mono text-sm font-bold leading-6 text-slate-950 sm:text-base">
      {children}
    </p>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-portal-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ImageGrid({ images = [], alt }) {
  if (!images.length) {
    return null;
  }

  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {images.map((src, index) => (
        <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src={src}
            alt={`${alt} ${index + 1}`}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
            className="object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

function ConceptCard({ title, children }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-xl font-bold tracking-tight text-slate-950">{title}</h2>
      {children}
    </article>
  );
}

function MiniCard({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      {children}
    </div>
  );
}

export default function AcCircuitAnalysisPage() {
  return (
    <Layout title="AC Circuit Analysis GATE ECE Quick Notes + Formulas + PYQs | Network Analysis" pageClassName="py-3 sm:py-4">
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
              <Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Notes</Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-portal-700">
                Network Analysis
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                AC Circuit Analysis
              </span>
            </li>
          </ol>
          <NetworkTopicMenu currentPath="/ac-circuit-analysis" />
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            AC Circuit Analysis - Complete Step-by-Step Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            AC circuit analysis finds voltages, currents, impedance, phase angle, power,
            power factor, and resonance behavior in circuits where signals vary
            sinusoidally with time.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. What is AC Circuit Analysis?">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              AC circuit analysis is the process of determining voltage, current, and
              power in sinusoidal circuits. Unlike DC, values change with time, phase
              relationships matter, and complex numbers make the solution easier.
            </p>
            <BulletList items={["Voltages and currents are time-dependent.", "Phase relationships decide leading or lagging behavior.", "Phasors convert sinusoidal equations into algebra."]} />
          </ConceptCard>

          <ConceptCard title="2. Sinusoidal Signals in AC Circuits">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              The general voltage or current equation is the foundation of AC analysis.
            </p>
            <FormulaBox>v(t) = Vm sin(omega t + phi)</FormulaBox>
            <BulletList items={["Vm is the peak value.", "omega = 2 pi f is angular frequency.", "phi is the phase angle."]} />
          </ConceptCard>

          <ConceptCard title="3. Phasor Representation">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A phasor represents a sinusoid as a complex number with magnitude and
              angle. It changes differential equations into simpler algebraic equations.
            </p>
            <FormulaBox>V = Vrms angle phi</FormulaBox>
            <ImageGrid images={diagramImages.phasor} alt="Phasor diagram" />
          </ConceptCard>

          <ConceptCard title="4. Impedance (Z) - Core of AC Analysis">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              In AC circuits, resistance becomes impedance. Impedance combines ordinary
              resistance and frequency-dependent reactance.
            </p>
            <FormulaBox>Z = R + jX</FormulaBox>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="4.1 Inductive Reactance">
                <FormulaBox>XL = omega L</FormulaBox>
                <BulletList items={["Increases with frequency.", "Causes current to lag voltage."]} />
              </MiniCard>
              <MiniCard title="4.2 Capacitive Reactance">
                <FormulaBox>XC = 1 / (omega C)</FormulaBox>
                <BulletList items={["Decreases with frequency.", "Causes current to lead voltage."]} />
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="5. AC Ohm's Law">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              AC Ohm's Law has the same shape as DC Ohm's Law, but voltage, current,
              and impedance are complex phasor quantities.
            </p>
            <FormulaBox>V = IZ</FormulaBox>
          </ConceptCard>

          <ConceptCard title="6. Basic AC Circuit Analysis">
            <div className="mt-4 grid gap-4">
              <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-lg font-bold text-slate-950">6.1 Pure Resistive Circuit</h3>
                <ImageGrid images={diagramImages.resistive} alt="Pure resistive AC circuit" />
                <BulletList items={["Z = R", "Voltage and current are in phase."]} />
                <FormulaBox>I = V / R</FormulaBox>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-lg font-bold text-slate-950">6.2 Pure Inductive Circuit</h3>
                <ImageGrid images={diagramImages.inductive} alt="Pure inductive AC circuit" />
                <BulletList items={["Z = jXL", "Current lags voltage by 90 deg."]} />
                <FormulaBox>I = V / XL</FormulaBox>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-lg font-bold text-slate-950">6.3 Pure Capacitive Circuit</h3>
                <ImageGrid images={diagramImages.capacitive} alt="Pure capacitive AC circuit" />
                <BulletList items={["Z = -jXC", "Current leads voltage by 90 deg."]} />
                <FormulaBox>I = V / XC</FormulaBox>
              </section>
            </div>
          </ConceptCard>

          <ConceptCard title="7. Series RLC Circuit Analysis">
            <ImageGrid images={diagramImages.seriesRlc} alt="Series RLC circuit" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="7.1 Total Impedance">
                <FormulaBox>Z = sqrt(R^2 + (XL - XC)^2)</FormulaBox>
              </MiniCard>
              <MiniCard title="7.2 Current Calculation">
                <FormulaBox>I = V / Z</FormulaBox>
              </MiniCard>
              <MiniCard title="7.3 Phase Angle">
                <FormulaBox>tan phi = (XL - XC) / R</FormulaBox>
              </MiniCard>
              <MiniCard title="7.4 Voltage Drops">
                <FormulaBox>VR = IR, VL = IXL, VC = IXC</FormulaBox>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="8. Parallel RLC Circuit Analysis">
            <ImageGrid images={diagramImages.parallelRlc} alt="Parallel RLC circuit" />
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              Parallel AC circuits are usually solved using admittance because branch
              currents add naturally.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="8.1 Admittance (Y)">
                <FormulaBox>Y = 1 / Z</FormulaBox>
                <FormulaBox>Y = G + jB</FormulaBox>
                <BulletList items={["G is conductance.", "B is susceptance."]} />
              </MiniCard>
              <MiniCard title="8.2 Total Current">
                <FormulaBox>I = VY</FormulaBox>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="9. Power in AC Circuits">
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="9.1 Real Power">
                <FormulaBox>P = Vrms Irms cos phi</FormulaBox>
              </MiniCard>
              <MiniCard title="9.2 Reactive Power">
                <FormulaBox>Q = Vrms Irms sin phi</FormulaBox>
              </MiniCard>
              <MiniCard title="9.3 Apparent Power">
                <FormulaBox>S = Vrms Irms</FormulaBox>
              </MiniCard>
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Power Triangle</h3>
            <ImageGrid images={diagramImages.power} alt="AC power triangle" />
          </ConceptCard>

          <ConceptCard title="10. Power Factor">
            <FormulaBox>cos phi = P / S</FormulaBox>
            <BulletList items={["Lagging power factor means an inductive load.", "Leading power factor means a capacitive load.", "Unity power factor means voltage and current are in phase."]} />
          </ConceptCard>

          <ConceptCard title="11. Resonance in AC Circuits">
            <FormulaBox>XL = XC</FormulaBox>
            <FormulaBox>fr = 1 / (2 pi sqrt(LC))</FormulaBox>
            <BulletList items={["At resonance, series impedance is minimum.", "Current is maximum in a series RLC circuit.", "Power factor becomes 1."]} />
          </ConceptCard>

          <ConceptCard title="12. Step-by-Step Method to Solve AC Circuits">
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {solutionSteps.map((step, index) => (
                <li key={step} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <span className="inline-flex rounded-lg bg-portal-600 px-2.5 py-1 text-xs font-black text-white">
                    Step {index + 1}
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">{step}</p>
                </li>
              ))}
            </ol>
            <FormulaBox>R maps to R, L maps to j omega L, C maps to 1 / (j omega C)</FormulaBox>
            <FormulaBox>v(t) = Vm sin(omega t + phi)</FormulaBox>
          </ConceptCard>

          <ConceptCard title="13. Key Concepts Summary">
            <BulletList items={quickSummary} />
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/ac-fundamentals"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            AC Fundamentals
          </Link>
          <Link
            href="/transient-analysis"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Next Transient Analysis
          </Link>
        </div>
      </div>
    </Layout>
  );
}
