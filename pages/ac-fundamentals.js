import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const waveformImages = [
  "https://images.openai.com/static-rsc-4/fV8UW74hwX5hAfbpywv4_Q65mazEnSiQlZRgIfZ8uLYJGDS3vp4gKysBh3AlPHZePKbtk3FZTjq5joV-tqbIqry_bMYRjvcv1jL7h7KDFKHz4SHb6T9sVJ13e9bMyH51dmW0RuL7o4asx9uwW-a_JqkJZnCsA-LP3noz6h6iap3fL0x6cx4y9P6K3ecECFpL?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/wLuEGD-XQEJVeicZyB7mKt-XnasXCyNrjbpXCn6-RJ9vjgtKyKuLNpMMdb2wQ1YnsYkdfAbGbh61IuiwhVnNqKdrAM81asgPcrPieG8e1FGGzai3PyMnPotH5YYXQ15sk_d33WF9Myuk6e_6pGx8JeUX_ulC6tEdhF3wEE7tXAAB41W-yvNJZ4oRxA7F08hb?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/L-nbUgQlbtq7qAh0pmaGYY9p7-nMobvvss_rLit6_MMFIgUltNh5id1cwt-ryJU5nlYFRxluayw4n9oBjIKpx7CequgxYLZeadj18HlfGtvgrn8gJcZ1S5p0tJyqCpJeb8ZaFponjv__DEbPE6_0-34PeLp3lYS2Xl-v1OeEQipUzQXPv2T1126-gCGFrHhh?purpose=fullsize",
];

const circuitImages = {
  resistor: [
    "https://images.openai.com/static-rsc-4/xPBXxClhcruVKn1q9hju6ojNxFAGiQIhX7LA9wRDgWWhQ83TDVVNx1ipeqvYAAKrW4teMzbJW1OzmmHb2SS5b-2enPkuhVkuqKstH1NRsk3ky38zD-bAIgSyof5xOnL1Qah4NydT9P6d77lUpLUgF3OHavfq3vWzLZhYH-170xg7tD7zwELxoct-rpAbPhl8?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/UMtBvqJK_FCiU6dbTTNzbjRbYWnNaRiI0N4GitqVDGHBjWFhJ2dqM6j9O4rj3yC2alJHIo61S9GWdTK1kqMy9TZQEsDVSa1S1tb_J3MKVJ-AqJqZjVj9LjziTpvV0oNO3tq0sE5pU8Ji-HDBBS9Zw5tq6obH7d1DVC47AFuPDJDKFtxLO2bPvpwogdZGTfpX?purpose=fullsize",
  ],
  inductor: [
    "https://images.openai.com/static-rsc-4/9YFCYQw9q2pe77BP_Q9fq25jf6ZRE-4pgyhzb2OIuQv8vzzqEUF7sANYBwja4072tJDLw4N-la-csNFB5CeWlEd8uNLOpUrH6J6IH9v00atyTkaeqLhDo-oblB3ukAzbI9oSW4dZ6l2WmxXj364MLqW1oa9lxj-r0UwRdjAEX-BKoF54SRg56uvdnLHyXqKK?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/W_SonJVtneQEwdoM3Ci4LqFMyR0O5xwsbNAO8IjNY51l3y3uMGuSeg1iGzXQFdPFYMSz0Ax1VXVEXAt8u-RH-Ujv6cpTbabgnFpk3yPWvRH57fd1W5yyx6ent7pkSdfbvKy1W7tKvoHhmm6woYuGsGwVePIcDOViwIviBZMDQrsXId3C-eveMYPJZ2myhrm5?purpose=fullsize",
  ],
  capacitor: [
    "https://images.openai.com/static-rsc-4/kNTenkBwA9Mi-kN7FDWR3ug3zoZBJoC4PiRm7fZoEkLWKzRfyBm9oYvt1NXR0yqolGDSRptL5fezUF0RFX2Ire0innOc1eOyBsSC953gL88ubAmipskMYGpSPCeok_E0NKxAj0Gfa3VVpn790uzlpCsMlT_WLrFj8nhVT8fpzP0yrRTo7OeaFgD3kgIpY7ix?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/pUjrF_5Gv8gyaU-Nwmv4x2JrMD98ymRACi836HdIYGGKiDyGVBGmx083Fg2DL_mq-VunVa6ZXM3fulSMMCCiaQfT1CRnJdXXbxOzTHzfMC8EIQpX9B0M5kg3Rd9jNkCSMa3oWMXzFd9SpvcMVUy2VsbZ-vWU6epGzI4n76RUJlJxkrO9olw_MxsTJBTJ8bQ8?purpose=fullsize",
  ],
  power: [
    "https://images.openai.com/static-rsc-4/gCTRjd4A1n_LzNGpuZvA7P7FJOwAVq1Cr9-b0mHwIC191go4wB4ylTzstCsnj-K8vN_cktHI6mOJM6GFBVNg1Bt1_uG5jbUc35wVW1RNPqnvuXb3S3cXOf422wCC4OkL7VV_7NbyRWDGHUlxo4pXV7W6SrmzS4n7_DgsnduZkQAQG9zsyifQZXcOyo00Ustk?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/UF2lMCOxZm-8Ha-v8tT-glhqV75rPWRyD2e1D-iKeIXp3fym6AkwDvl17WjAIuvK_xhmV54V1BT53g0PHGQXE9RGeyUuTB99MFpwsTL90kNBpSaLkbD8B2gfZcRENR4ejusOJ0IZ7u9u-XehD8_OQJzqtQswKQm9iVQtQ8v5AnqjXsaBLJf8tLgcOxWfuOEg?purpose=fullsize",
  ],
  rlc: [
    "https://images.openai.com/static-rsc-4/Encbxi8Lf_lnayIo3t9_nN8ZuZlfy7HZYNuIuzXpr9B_DTzNycXjVw3sjSskASE6ZqXop_41GJrCjQIIpMwGcijDDLVmr2HO89BH_y45sSLlU7M-JCtUS8lZJA6jjJVpveDmnbyJsVvyIQBkO0qXSqPOtW0EMpUmrjeL219sp0me_r6fQ04t-dkFsQb4TqCV?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/RnwfsgBx0TrKP7_rhBf1VzIVX72pCmUXxA9pY50QZe0tTh9irJnKjK1fqXQm5XB2n0vAiHw6GJWDHLzxSZPZ3oZ40vB0pU0VywEoKoNjv4194xb2zhLHk0TWvV49LiX9SEY2Ta2dyRPm_3V_QJwjuQrkDbt9slAAd-b1pO0tPg6cnubSF4T-3FNz17m1TXpW?purpose=fullsize",
  ],
  phasor: [
    "https://images.openai.com/static-rsc-4/AwHnwHTNTzNpmizDFgozB0jEgoasbA1jwLAA-dwiznPgoi7qo1v-RHZcZov0xn_qPQKcI9GsTRsviT-TCdK4qM1Fcikr7PJkkis8C_MUU6ukabApvmGzfnvWzLak4GEujPcrtct19kaCU7q_Q2LP37-5kGRcCxyPuM_PoXGsRThSnqrv6uJICzcuGydvMcHS?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/R3t-_gjy-GlwzMRVj_E4yfP_6cGP_izyNiFNVaE6XUx6D7M1e8AVTSuvYemnf9P5uOT9TNTzAVUQp2Q_t8fPhpmxgLzRnoTzaWwROWvXiX3CCKg8IpgHhu0DoiE7MXOnQhBboOg66St4tDzTM0mVJOVff8y5M7BMEJGQg2w5CaOVN6v7ZY5BQqS976hmEx8C?purpose=fullsize",
  ],
};

const quantitySections = [
  {
    title: "2.1 Instantaneous Value",
    formula: "v(t) = Vm sin(omega t + phi)",
    points: [
      "Vm is the maximum or peak voltage.",
      "omega is angular frequency in rad/s.",
      "phi is the phase angle.",
      "t is time.",
    ],
  },
  {
    title: "2.2 Angular Frequency",
    formula: "omega = 2 pi f",
    points: ["f is frequency in hertz."],
  },
  {
    title: "2.3 Time Period",
    formula: "T = 1 / f",
    points: ["T is the time taken to complete one full cycle."],
  },
  {
    title: "2.4 Frequency",
    formula: "f = cycles per second",
    points: ["Frequency is measured in hertz (Hz)."],
  },
];

const valueSections = [
  {
    title: "3.1 RMS Value (Root Mean Square)",
    formula: "Vrms = Vm / sqrt(2)",
    note: "Equivalent DC value producing the same power.",
  },
  {
    title: "3.2 Average Value",
    formula: "Vavg = 2Vm / pi",
    note: "For half-cycle only.",
  },
  {
    title: "3.3 Form Factor",
    formula: "Form Factor = Vrms / Vavg = 1.11",
    note: "It compares heating value with average rectified value.",
  },
];

const elementSections = [
  {
    title: "5.1 Pure Resistive Circuit",
    imageKey: "resistor",
    points: ["Voltage and current are in phase.", "The resistor does not create phase shift."],
    formula: "V = IR",
  },
  {
    title: "5.2 Pure Inductive Circuit",
    imageKey: "inductor",
    points: ["Current lags voltage by 90 deg.", "Inductive reactance increases with frequency."],
    formula: "XL = omega L,  V = IXL",
  },
  {
    title: "5.3 Pure Capacitive Circuit",
    imageKey: "capacitor",
    points: ["Current leads voltage by 90 deg.", "Capacitive reactance decreases as frequency increases."],
    formula: "XC = 1 / omega C",
  },
];

const powerSections = [
  { title: "8.1 Instantaneous Power", formula: "p(t) = v(t) * i(t)" },
  { title: "8.2 Average Power", formula: "P = Vrms Irms cos phi" },
  { title: "8.3 Reactive Power", formula: "Q = Vrms Irms sin phi" },
  { title: "8.4 Apparent Power", formula: "S = Vrms Irms" },
];

const summaryPoints = [
  "AC varies sinusoidally.",
  "RMS value is most practical.",
  "Reactance depends on frequency.",
  "Impedance combines resistance and reactance.",
  "Power factor is crucial for efficiency.",
  "Resonance is an important AC phenomenon.",
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

export default function AcFundamentalsPage() {
  return (
    <Layout title="AC Fundamentals GATE ECE Notes + Formulas + PYQs | Network Analysis" pageClassName="py-3 sm:py-4">
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
              <Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-portal-700">
                Network Analysis
              </Link>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">
                AC Fundamentals
              </span>
            </li>
          </ol>
          <NetworkTopicMenu currentPath="/ac-fundamentals" />
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            AC Fundamentals - Complete Theory Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            This page explains alternating current, sinusoidal quantities, RMS and average
            values, phase, reactance, impedance, AC power, power factor, resonance, and
            phasor representation in one clean sequence.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. What is Alternating Current (AC)?">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Alternating Current (AC) is an electric current that changes magnitude and
              direction periodically. In AC, electrons oscillate back and forth. A common
              example is household power supply, which is 50 Hz in India.
            </p>
            <ImageGrid images={waveformImages} alt="AC waveform" />
          </ConceptCard>

          <ConceptCard title="2. Basic AC Quantities">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {quantitySections.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
                  <FormulaBox>{item.formula}</FormulaBox>
                  <BulletList items={item.points} />
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard title="3. RMS, Average, and Peak Values">
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {valueSections.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
                  <FormulaBox>{item.formula}</FormulaBox>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{item.note}</p>
                </div>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard title="4. Phase and Phase Difference">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Phase indicates the position of a waveform in time. Phase difference occurs
              when two waves are shifted from each other.
            </p>
            <BulletList items={["In phase means both waveforms match.", "Leading means one waveform is ahead.", "Lagging means one waveform is behind."]} />
          </ConceptCard>

          <ConceptCard title="5. AC Circuit Elements">
            <div className="mt-4 grid gap-4">
              {elementSections.map((item) => (
                <section key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                  <ImageGrid images={circuitImages[item.imageKey]} alt={item.title} />
                  <BulletList items={item.points} />
                  <FormulaBox>{item.formula}</FormulaBox>
                </section>
              ))}
            </div>
          </ConceptCard>

          <ConceptCard title="6. Impedance (Z)">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Impedance is the total opposition offered by an AC circuit. It combines
              resistance and net reactance.
            </p>
            <FormulaBox>Z = sqrt(R^2 + (XL - XC)^2)</FormulaBox>
            <p className="mt-3 text-sm leading-6 text-slate-700">Unit: ohms.</p>
          </ConceptCard>

          <ConceptCard title="7. Phase Angle">
            <FormulaBox>tan phi = (XL - XC) / R</FormulaBox>
          </ConceptCard>

          <ConceptCard title="8. AC Power">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {powerSections.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
                  <FormulaBox>{item.formula}</FormulaBox>
                </div>
              ))}
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Power Triangle</h3>
            <ImageGrid images={circuitImages.power} alt="Power triangle" />
          </ConceptCard>

          <ConceptCard title="9. Power Factor">
            <FormulaBox>Power Factor = cos phi</FormulaBox>
            <BulletList items={["Range: 0 to 1.", "High power factor means a more efficient system."]} />
          </ConceptCard>

          <ConceptCard title="10. Types of AC Circuits">
            <h3 className="text-lg font-bold text-slate-950">10.1 Series RLC Circuit</h3>
            <ImageGrid images={circuitImages.rlc} alt="Series RLC circuit" />
            <FormulaBox>Z = R + j(XL - XC)</FormulaBox>

            <h3 className="mt-5 text-lg font-bold text-slate-950">10.2 Resonance Condition</h3>
            <FormulaBox>XL = XC</FormulaBox>
            <FormulaBox>fr = 1 / (2 pi sqrt(LC))</FormulaBox>
            <BulletList items={["At resonance, impedance is minimum.", "At resonance, current is maximum."]} />
          </ConceptCard>

          <ConceptCard title="11. Phasor Representation">
            <BulletList items={["AC quantities are represented as rotating vectors.", "Phasors simplify sinusoidal circuit calculations."]} />
            <ImageGrid images={circuitImages.phasor} alt="Phasor representation" />
          </ConceptCard>

          <ConceptCard title="12. Key Summary">
            <BulletList items={summaryPoints} />
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/ac-circuit-analysis"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Next AC Circuit Analysis
          </Link>
          <Link
            href="/subjects/network-analysis"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Finish Network Analysis
          </Link>
        </div>
      </div>
    </Layout>
  );
}
