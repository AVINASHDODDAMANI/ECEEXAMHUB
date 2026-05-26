import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const transientImages = {
  rcCharging: [
    "https://images.openai.com/static-rsc-4/sEpQV1617j2aDVs1cCc7WSFnfB38OKQZ3xLaQDeloo7bLya9Qi-Mfpv5rhout3umHE-T24HKR16jM05FQw80WaSm3UkacFKHnPtS2Zhk-d1Kx0YOEAbxmIoTy4OesanYveD2azyl45m7wpG83FiMqKliKA50TedNX9OiW5Xm3IQCQSOhm9UuaTuai0K-PsIb?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/M4Vu8JaloHrqAzQOZCv77T1gY8ikIf9nf1x72VZ5635esWsJOfKL0rIzHw3nL-MjriDnrePDbyHRDPhcg1L62qvhKEcopjpyF8-UhxSMbetyhyU9W2UfHqS9jRE2nGelD79SMvo2BzxZtcGB6eHTWUQdOMY5QHZcB0f8t2iAzCCG4lh8ujbfL0X22WFK5JDA?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/PA4SlnmpARW2wn2-J37cCU0ntNimpu8fr_hkuD9ACTSSdUpG7TFR_BNJYWH14tPN8YyO9IPInis1kuhLcwRpof5lMIEHDgMW0IMWuUwFv9XtMLZp9ZEwNGOskBpl9HY6h4hKeUAbVO4gNyoJsWbNmcRtwlznyIx9uDuZyX7JC53qn1v6Xk1qkVeq2XxZ2OmF?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/BXa12ymD8I_OSJ2TWfLNDiX_jlDAdtO6jLlqvDhjARQfY2OX9R6ZUaR6lGkJo2gb8VJfIDBQIq61rLPm0sfFGl0702747WqKaVy_-iE8nUmWrSjkzNdRH1RkbjIFMjo_cgs02l2b7RVYshXDVA3LzWej_1OndGHG_ed9UV0KGVFePZKlCCvuVzIUQWgYhS29?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/guxvMjTWurRXwysSXgGRqSyvaz6nkzQfhdrgqkk4wMEYtGR2p4SH4toF-0MH8MUEQgWnMr_taZf2_Lb14_oYBd2ayTtT31Iij2PBoJ0rp_nXGa0DXWvgRQMgN9eUiFkNt2XUlkoJqkbEarN6xfcO3_d5-OSCM1pEa3hn-sz5HauoMqXAkqKY_qfxNsiDUYdh?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/63HkkkDttj5pbNzN8Owck9ej7CgBYiz1ekYjL1qC-T0MJNdyimCRKfwTC2ib43VEIEmppaDxwF6CRLtibNFQPkcleqaaKqTxP4nLg-a2LSBp7Xhv6z840ydHjUdXaYgvEFQAvv0dNRr1Mkggt0MtSgF8nRWSQPyLk91TpG-p8vSDRtH5j_mqW2DkRPcUXz4V?purpose=fullsize",
  ],
  rcGraph: [
    "https://images.openai.com/static-rsc-4/WwT2iEmJD41ig3AhaP2kKT64uQX1UHNo9HtafMSnmqTYG2oH61EhYafngDybtFLLvBktParLIbfmAtZjU7uaVMgNB_WfQvoXahIUCOUyn3kwGdlaoG_H7UsoCn_PMOkQbJOdzoI1HDWw3A3cUl8kVB92gTn1hvoOxw32ciE7wAOitZ2VORTWDHbUI-s0L5TL?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/fEkGxdk5Eoi1F6_jIns9knKnkEPp3OIv5VCdPdEwC37lEFlGbyP44BUVnWeC8J2__SNC_M9K7glrhb_xXYxGYTBxynb9OIRM-OLz_Ycw4gHzvsR4aL0cU4tipr4i7QJ4me-Z5wmfnWQyJBCZHtTfbjSNFOaSrZsE0hpSbXAD1bjahZtZ-UEeqPe_n6O3rK5H?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/xYLswZaRZEg2fkrd-zI94ys3MXy2LDuoh3wNHNpxSDH_JPhvplL4QaaCePo-cbWsYb2GEjI41tOFb9ohexmFrkn9xyUfPOZXoW0-nOCeZ4VYrAle6F_qchgi3PkAVIwqVSMngib-eSLBS36-gehqjxqFytiv4xbCRST4Rgh4CLDO_taO3rgmz58IKI4aR0vx?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/9w1-vZ-BkzLq-Z4t3h-qA-j3pKyOeAyEWUCX5lje-UWbA-vwMr9upr3b1xd1zlkGOtuF4QyU2oQ8K664yqfL-dLWpJgW3uQKiDJkKRP26E066_FewFor0UgD7JMNMKtiC2zsrRy2vUElWteqRR5o_o1IWWujiOmDh8ipPufrfffDhQ0uKzktbnqw1M42xNi8?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/dcnIOLHQbh-_8RrQ_QLN3E-nrLvxJgm3Xfa5aykmOPKssroD7WaCc1tvXzhEf8MbsvKEU3UnSxAFBAtPIGuNKHcVDTDavu88mzh_nHxcLMd2eMrc68M-fMrIB85scW7jJAk2kum7IkNVA__D6ineBrBwRoIp9ZEdUwRSnwDTLs7eIeenI9A-mR-5folWvS6M?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/wJ8u3WltWRZKk67WzpUrjRA7JOwCrojYow9jPaiPJP4j1LsFPAKO-M5P7uNiCbiUNXmmPr3yT1EZ2tMQT5Zw9f7aqv_oPr5PiXTCsLszB9dJWEXDfcKDGmWOnL-4OG24lyp926Rou6UPrK0nZ6DHFNY0TIwsVY_eMVHVYIaKSSa6iNGly566YyMj1Nm1oRZ_?purpose=fullsize",
  ],
  rcDischarging: [
    "https://images.openai.com/static-rsc-4/nr5iXsSJBH8zunHFVxcZU9gkEI48-8e2mVEdP8zEjJ9dVuPm_92LcMmS1uenSEg6DKelPC3tlwG5fQhOZNVBttyGZFgvXjF8F89agh6Rwp8B0dMSRSQXrgxt-5vrII0sgPNjmHGZxNH56ejWSS-Jemflxj2yi5eVl6dyzUmdAlLcVrwG4tAxA2A5lmACcI7D?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/M4Vu8JaloHrqAzQOZCv77T1gY8ikIf9nf1x72VZ5635esWsJOfKL0rIzHw3nL-MjriDnrePDbyHRDPhcg1L62qvhKEcopjpyF8-UhxSMbetyhyU9W2UfHqS9jRE2nGelD79SMvo2BzxZtcGB6eHTWUQdOMY5QHZcB0f8t2iAzCCG4lh8ujbfL0X22WFK5JDA?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/zS2NKef_bme_npyhLX53vUofAeg5lQ9TPBCYF5RbExDtuIhtPFZungRiJdfTcfRukvYgBkmV_6ibJ44CndAHo99Z8AA3Sy81sqdat4amMlug9jMQb0vrrr9OgfxT6pZNPHCMa7bayXUGpl6WfWIs8oP5M1UBnIjPxEEolKmc1wBV4gnvBHZQnHnQBykvX3PI?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/EcFTf5hbmy0IA8LBq-2EU2AnKdv8nAMJxObaz5nnHJCpbe2k1QJzEFXPVg19349uxK3yoLpgW_lQnE71dHdaMdDLZn7idT-GFCd08JzCIU2U--Dsun_tJ24Jn_7q_b0aWAaQGP8LRdouLrWvST9AUzCAo2W9NuL4nsZ3Z53ja1rPZdXEJv4Yi40C9cabJiyT?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/9UU5c3dhc-f0MsEMPqhxbS5nA1C96Pyb-op0oq6y3-BATXL6J-40YPtgB_Ot9U5HnyqNPVuwU_yiPccKj0oJCrn_WypBIdjT-nRfXI0BbWnTwPbk_Cwlq__itnfXYz-BHyvsp6wC_D1IOJ_SNjSswO-m_JMc7FvMLrJHf4ZqKWjiOiIJW8R7pSK3r1C_NyRy?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/EYVCmawLZ-v0uQzfxU1aYAuCxEvFCzWIEOOlIWzYDPIoGydpSA4_rU8WeboM5_6So3Nw6Z_Sjt78n42SVJY6ezkxuXa9corwVqcb-k4vCuaIe7d3f_I_iHPdjDEzBFvmV-wQNRApShct3L37NPHjR0DwoDErV4tjfVxYHWSLJ2xDkHfAR89Z7Dsz6w_j1zUj?purpose=fullsize",
  ],
  rlCircuit: [
    "https://images.openai.com/static-rsc-4/smeT8CMacwawVveftCOSBS_oaeLoCxJPFGon7O3c68r988UEc7E62y7wmDQzi3BWk9SO5bDc1iw2ZWHsuBYKmsOEDu-QMmJPLpJYfCRmUu8EKsXJ2pUBCNFWk_V1GKXcJCIDJWMGag6Tsawef8KqbuWrcwiEjLn2CiOp4XNH0MOJ3tQlN4uelqRN8TLnKDWr?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/th_Eq7q5UG8dgRb-TGE96oGhBgJ9-Ql93UjYNnvnpadyu-H4pc16wCB7mJ1XjOcFb4bM0-crYM3nS3NhnU9RM7rFP-vRa_1nqJQwKOASazTbR1Up1AtOvADBFatMWQDQVmGzB0azFjg9eSdUvAfF3pb8h7UACkWHhr-Dr1IRDSe1NOjHjWCN3_20Urwt3NP3?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/ZrMxrrXKDZ6WtLpFQ0YEMK0Q7s_o6k1Prjw5IoweMcCEpBvYigfqVfo32XXX29V7Kleq94We3SDA-jYdNjfd1kpE55RM-18AEyCf6ZNpA-zg4iQv-zgRxBs1oNe5EYPwGMubotkNHewpCYJXV7JS3b23vXkpfbdaHbJkJQi1VJQadiL_CE64UPOI_ZO9l1Tf?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/vDx8-qm9ht7mxwyR7v6h4DZCESI2P013GZPL3yLZIw3FSE8t5iRi3eViK--KBXvskWX7_OScOqBjytvy4EB-WQ_j3J_SSQlC7skL-GLBPbH8asDLjzLbKngnKf5DWxn8rPAtypBxuIs_D1-Gr-bxR0Z6MDn34EElCgd0jwvm-zomNLPXyestZR6HmsZJUJwv?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/SySKG8DuVpmnLtNa0mmil-oYQaLSyfcmZXItS5B8Fv3sq3VBu0NB7f-dj0H3nO1QTlfQMEmPNgH4fZcebD0ApVPumXRRCRINaeCza79rhKcj7Mxrn7a9Jv4JlB1UbojZOLyNZURZubfUORBGXXp05OuJcUlWhwyXcHm5e95PEnAz-Fw0B-TjQQcxiX7iZNdr?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/lXBBH8Xe-zV_T27w6e9mENIAozvP_62CMmZHMUWCQLTdXEWYfKC4Dopc1rrxt01g4sS6AlTxV97VYMNL1vd0lYn1YPy-nXP-LHcSAg7wO6r-4UsFLymRl0UVrVVjyNbAtOonhPRWiUi3eT7w2dYjSucldeC34mlzoVZDbTp0TBoL0Y-Wlwkh8GralNUaCAbX?purpose=fullsize",
  ],
  rlGraph: [
    "https://images.openai.com/static-rsc-4/sjGMyLG_ahDBLz66ScxR9qGBbceC2USowKmCkzr_XAgu7gBcah4tdzjpq3iFOtoUU-YzOxu9dKoNAVeeN-6L_4qlrK9S9ZCagljvU9Dpk3BIv-Lm0dXDhSRQYuKsyOPoDkOl9woUcID3M66BLoZV1b7EeffKG-HYASXxvTyrejK1XBla8Hp7PnQEFHEugVft?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/1sBFJ4GOG0ceYLJh4u_pWwwCdVyxv8YybgpfMpPrGqo9rG3m-wxKWNEn_rR1qGRmZR-0HEkYjFPPrNnW-fpR2oFdi5E-Y6C7gfVo-GJj_7Cop_Aw-uF9kH-bwwjiSRn5nfGuI1Rb9tNja8s3MDP30QKLYFaF63TRrR2sNtOhE_ti2M-aTBCa8e_KeSABIEJh?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/WtT00zHRf7_lNgF-MOQcBAIcnJ9rNUCuwBT1FhtUd2VmBAE8oYAOuG9H-4SzSRvIT0dYklSCPmvQ3bp_ZANCLRuOl9YGybSNk3WJhBUKgYHtvilQHhkcYhFDUml1tfWAbpcPXJALY4ufPl3aDOE5iYKSty4Otf3Gkiq8gc5_0VVPQ6yiTI2c-XLtidveezQQ?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/jk699QNyaHiglkE52P-SI5dvKPb5GxZAvcXXh52bERoxNGov4sjdTKxePcUtus5kfkxjkcb8xtOvBm_pilkAQ4kcbKNKITkHR8vbiCpDE8LgDe4j-Ms6YAaiy8J08j8N9QWbtfTgtD8T655wEuVR6m3hQpzMKZa8mnbaeMqu9peu882qCWwky6rJR7c-cJC3?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/6SR91uBNc7NZ4Z-0W9ugDsfJzZelAg9mWOvaN8S8TKaJm_xJbDvOF0XMfQCimXsxd_ZlqqM1MNmwOPoYUnR7Z99SRtCBsbKtIt4zZhoQOOZ4krJE1i_676hNzkX7umub8-moWhxxyC3QxCWm3smqmSv0v5xep02gorMvenqVEl1i48cN_qK54HZ6ufqP2UFy?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/OL6WhRBbmUbmryUdYVjpkpauYEeHcV7GQz_u93NrBzhb1iiAFf6GB2uTbM64qM3C0x5JjmHt0ZRR7wROFB0KokLCYzH2lV_a1yda0tSHmy63gaDsqVHWEZg5VnPpBc_YVhn_StBS5h273gMsKy_uAaH8rt1v8NWJ9M_lyOuI-kOzTKOyeVmS8D1LlJ8ZRG7o?purpose=fullsize",
  ],
};

const importantConcepts = [
  "Exponential behavior",
  "Time constant defines speed",
  "Energy transition",
  "Initial condition is critical",
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
        <div key={src} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img
            src={src}
            alt={`${alt} ${index + 1}`}
            className="h-full min-h-[180px] w-full object-contain"
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

export default function TransientAnalysisPage() {
  return (
    <Layout title="Transient Analysis GATE ECE Notes + Formulas + PYQs | Network Analysis" pageClassName="py-3 sm:py-4">
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
                Transient Analysis
              </span>
            </li>
          </ol>
          <NetworkTopicMenu currentPath="/transient-analysis" />
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Transient Analysis - Complete Step-by-Step Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Transient analysis explains how voltages and currents change with time immediately
            after switching, source changes, or redistribution of stored energy in capacitors
            and inductors.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. Definition">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Transient analysis is the study of how voltages and currents in a circuit
              change with time immediately after a sudden disturbance such as switching ON
              or OFF, a sudden change in source, or initial energy stored in circuit elements.
            </p>
            <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-amber-900 sm:text-base">
              It focuses on the interval between two steady states.
            </p>
          </ConceptCard>

          <ConceptCard title="2. What is a Transient State?">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              When a circuit changes condition, it does not instantly reach the final value.
              It passes through a time-varying state first. This temporary time-varying
              period is called the transient state.
            </p>
            <p className="mt-3 rounded-xl border border-portal-100 bg-portal-50/70 px-4 py-3 text-sm font-bold leading-6 text-slate-900 sm:text-base">
              Key idea: a circuit cannot change instantaneously if it contains energy storage elements.
            </p>
          </ConceptCard>

          <ConceptCard title="3. Energy Storage Elements">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Capacitor">
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  A capacitor stores energy in an electric field.
                </p>
                <FormulaBox>W = (1 / 2) C V^2</FormulaBox>
                <BulletList items={["Capacitor voltage cannot change suddenly."]} />
              </MiniCard>
              <MiniCard title="Inductor">
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  An inductor stores energy in a magnetic field.
                </p>
                <FormulaBox>W = (1 / 2) L I^2</FormulaBox>
                <BulletList items={["Inductor current cannot change suddenly."]} />
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="4. Types of Response">
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MiniCard title="Natural Response">
                <BulletList items={["Due to stored energy.", "No external source is needed."]} />
              </MiniCard>
              <MiniCard title="Forced Response">
                <BulletList items={["Due to an external source.", "It decides the final steady value."]} />
              </MiniCard>
              <MiniCard title="Total Response">
                <FormulaBox>Total = Natural + Forced</FormulaBox>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="5. RC Circuit Transient Analysis">
            <h3 className="mt-2 text-lg font-bold text-slate-950">Circuit Diagram: Charging</h3>
            <ImageGrid images={transientImages.rcCharging} alt="RC charging circuit" />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Step-by-Step Derivation</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Step 1: Apply KVL">
                <FormulaBox>V = vR + vC</FormulaBox>
                <FormulaBox>V = iR + vC</FormulaBox>
              </MiniCard>
              <MiniCard title="Step 2: Use Capacitor Equation">
                <FormulaBox>i = C dvC / dt</FormulaBox>
              </MiniCard>
              <MiniCard title="Step 3: Substitute">
                <FormulaBox>V = RC dvC / dt + vC</FormulaBox>
              </MiniCard>
              <MiniCard title="Step 4: Rearranged">
                <FormulaBox>dvC / dt + (1 / RC)vC = V / RC</FormulaBox>
              </MiniCard>
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Final Solution</h3>
            <FormulaBox>vC(t) = V(1 - e^(-t / RC))</FormulaBox>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Current Equation</h3>
            <FormulaBox>i(t) = (V / R)e^(-t / RC)</FormulaBox>
          </ConceptCard>

          <ConceptCard title="6. Graph: RC Charging">
            <ImageGrid images={transientImages.rcGraph} alt="RC charging graph" />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Observations</h3>
            <BulletList
              items={[
                "Voltage increases exponentially.",
                "Current decreases exponentially.",
                "At steady state, the capacitor acts as an open circuit.",
              ]}
            />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Time Constant</h3>
            <FormulaBox>tau = RC</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              The time constant is the time required for capacitor voltage to reach about
              63 percent of its final value during charging.
            </p>
          </ConceptCard>

          <ConceptCard title="7. RC Discharging">
            <h3 className="mt-2 text-lg font-bold text-slate-950">Circuit</h3>
            <ImageGrid images={transientImages.rcDischarging} alt="RC discharging circuit" />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Equation</h3>
            <FormulaBox>vC(t) = V0 e^(-t / RC)</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              During discharging, capacitor voltage decays exponentially to zero.
            </p>
          </ConceptCard>

          <ConceptCard title="8. RL Circuit Transient Analysis">
            <h3 className="mt-2 text-lg font-bold text-slate-950">Circuit Diagram</h3>
            <ImageGrid images={transientImages.rlCircuit} alt="RL transient circuit" />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Derivation</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="KVL">
                <FormulaBox>V = iR + L di / dt</FormulaBox>
              </MiniCard>
              <MiniCard title="Rearranged">
                <FormulaBox>di / dt + (R / L)i = V / L</FormulaBox>
              </MiniCard>
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Final Equation</h3>
            <FormulaBox>i(t) = (V / R)(1 - e^(-tR / L))</FormulaBox>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Voltage Across Inductor</h3>
            <FormulaBox>vL(t) = V e^(-tR / L)</FormulaBox>
          </ConceptCard>

          <ConceptCard title="9. Graph: RL Response">
            <ImageGrid images={transientImages.rlGraph} alt="RL response graph" />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Time Constant</h3>
            <FormulaBox>tau = L / R</FormulaBox>
          </ConceptCard>

          <ConceptCard title="10. Initial and Final Conditions">
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-950">
                  <tr>
                    <th className="px-4 py-3 font-bold">Element</th>
                    <th className="px-4 py-3 font-bold">At t = 0</th>
                    <th className="px-4 py-3 font-bold">At t = infinity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-950">Capacitor</td>
                    <td className="px-4 py-3">Short circuit</td>
                    <td className="px-4 py-3">Open circuit</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-950">Inductor</td>
                    <td className="px-4 py-3">Open circuit</td>
                    <td className="px-4 py-3">Short circuit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptCard>

          <ConceptCard title="11. General Transient Formula">
            <FormulaBox>x(t) = xf + (x0 - xf)e^(-t / tau)</FormulaBox>
          </ConceptCard>

          <ConceptCard title="12. Physical Interpretation">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Transient behavior is the adjustment of stored energy after a circuit
              condition changes.
            </p>
            <BulletList items={["Capacitor: charge buildup or decay.", "Inductor: magnetic field buildup or collapse."]} />
          </ConceptCard>

          <ConceptCard title="13. Complete Example: RC Charging">
            <h3 className="mt-2 text-lg font-bold text-slate-950">Given</h3>
            <BulletList items={["R = 1 kohm", "C = 1 uF", "V = 10 V"]} />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Time Constant</h3>
            <FormulaBox>tau = RC = 1 ms</FormulaBox>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Voltage After 1 ms</h3>
            <FormulaBox>v = 10(1 - e^(-1)) = 6.3 V approximately</FormulaBox>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              This matches the 63 percent rule.
            </p>
          </ConceptCard>

          <ConceptCard title="14. Important Concepts">
            <BulletList items={importantConcepts} />
          </ConceptCard>

          <ConceptCard title="15. Final Summary">
            <p className="mt-2 rounded-xl border border-portal-100 bg-portal-50/70 px-4 py-3 text-sm font-bold leading-7 text-slate-900 sm:text-base">
              Transient analysis explains how circuits evolve over time due to energy
              storage elements, governed by differential equations and exponential responses.
            </p>
          </ConceptCard>

          <ConceptCard title="16. Website Enhancement Ideas">
            <BulletList
              items={[
                "Add an animation of the charging curve.",
                "Add a real-time graph for voltage and current.",
                "Add a step-switching simulation for RC and RL circuits.",
              ]}
            />
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/ac-circuit-analysis"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            AC Circuit Analysis
          </Link>
          <Link
            href="/network-topology"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Next Network Topology
          </Link>
        </div>
      </div>
    </Layout>
  );
}
