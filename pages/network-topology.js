import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import NetworkTopicMenu from "../components/NetworkTopicMenu";

const topologyImages = {
  graph: [
    "https://images.openai.com/static-rsc-4/_R3pVA0OCN6Z7kr8uRR6KpwF0H02ZxDqgJNCTyJdQeZpL2Qn6xake8cHsDeDJsFrfw2pVK80ocA7YjozFgCblqMXaYtB66WQlkjDVqPcYF07Akm9iiLbWZqig4kQDprra7IpwF5BaLlPlCdbM0PJ5cLKRi58gK-QhqcAef4R4BiF4lsfMyBKYx7bnLKfdM0H?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/SOoxFSpZPlZ1_OqV44QNW6ZHsY95JVmdaUUxcu4Y1jjg94jShdw9yLHblEnFV6gLiy5FrML5EZRguJXCNj2ocrxAmVjvR3kBrJnzEMxzrRJq3mkF-ru_oU-FZClVYGNkEQVMCUM86wZxMO--uml8O8Rnj1aom4ljG1B5b-Dr_Q68y2UycUuAyTMhL7YigYYw?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/H8T0GDQKJpUb49zVcicHvx8NuijZCyuTFhUBiGJWH-lIb1kijx3pA5mB6VBQoS8VjkYQyegPJ8SrcHOflEZOA4WMZKvgZWWnXClLgBm1PABwfEETi2wNw5zeL9EEkVl2F-RQkuin0bZ2WZFVXP44yY1VZ3MH5a7WmttWh2t6thyy1xPMq5a8B8-HafJFWXbH?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/pvkAM3DOIEMgTULIEX1wU908X-PTnF8DRTVqcZegJ40tww06V4TeYSswS1cHIFFdmze8ZAx7fTiB77F3Gnety2TLvzfNZg-myH_gYx3f9r9TM6qY3NlbivQ0oGVotGE0feSI7OROIGNKtZgN7eGBKwg__RIr8As4HBlIDcUrFZ_OO2UylereD8TYr54gEwzR?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/uk2sRCJxOvIhYALoHYdIypAh2_m-F1CKiZ7A_rzC1GG7PQmw9W_ZKasZHvSLGKttpmW8JzpvoWN0x7Vdi5lX_8Sx6uuhXff70U2ufqLcOhIubAm9xsECF04DZNvtqHWEUEe49XvH8EbngDDRqS33mJRnt09Ws75hITwXX5OdCp2QBn6t83XOpeRDmFwQujRF?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/fws3I2lVeucloQTZg_HXBfQfPsR-LwDe5yu_DlsOchztSOVcHlhlV0cpCNT4B80ulGXfnCgwqJvBwTWK532c50vUJFck61PShjGu1BGLWysvavHaSgRZB8tSgR9nqJjvMKD73O3RS7BTfSh8ceslphQ9HEl-P5SdNp7gENxH3cfHtpnGecMUIyVRmLnTsa2g?purpose=fullsize",
  ],
  tree: [
    "https://images.openai.com/static-rsc-4/hOMT8pQ6-dvidCiuaKcw_oJGYEW3BnC0OGcMdrTkOqHPYUihSKALKIVpbFpjsbveDqzXD9TAQrSMlpXwt4Yjcjs8FKQ5HPdXfkjuMxoiGU3hnTPrNa3dAKRzYICji_VNeyBvkzw8r70rRV3FLIuvxrkDhooXkJKIvSZX6zlV6KVHay_2c489_r1fCj4go2Id?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/lXjcRHZ_H3kcDNF2LZmVgbzgXeerbpMLKkHtjRh_FeabnRzsm28vSsReZA6Ncl0khsL_o-TULZcnqNhAazB-0vQhEQdM1eBTcEDM0X73FX0NeXpE8-xzIsNhG0DEo5EpBDAnSNIQqVMkG9l7p0G7_o2YX447Ies3ca0vFkgsyn8sve6O2V6dsXJeXW5-3H4z?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/DAKLH24LLfLQoUZ1pi_p0XEs8jsUNA4l7yREzT0vAykMJj7pQHe4T3My5mSCKDzxFPpKvKwMjyjBt5RsSf2AlV4PwoVtM-HV-G4Y5q_6TnHzu5qZfcJqwI1xRjkbgmPC_vOE6FkFcqgRlymLPUJIDktt6u7hpolMX5U-Gb9etsPTMkXRAagWuqZFgxD5eRFr?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/9udF7cvr2uAfXeKAfzo0u7qOpdC_gtVn-TqdYECPdndJqeWxzw2gwwRFOzcOaGqqBrmIIjGb9ok6UZYLusem_tV2Ew7_2Iq12GlmW884CNsS3dJK6TjJ6c0VVE99OvyIJQx_peOCvCymBxMpic6pGWds8kPbOLYkaCk78DtF48PMKP4uNLMBqbGtSN4mtnRE?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/0SqFGMMKTWRlO-D1NCw5LvTCJty4pUDZc0C-aa1FeIt8-7nukU1ILeaenXKmWoDeJKG1SIVh0dd2mpcrv3MYSvc4FyT9Vs090E-pitRhVb8pO4p0g-7Hkujf430CqJgZJ1nHiucj3PLz1n5kOWTV8mM5f4sYIQ2I1Jw4ZFQKnz7Ng8rH3bYGyo1M5srfaUJL?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/H15N9gqPd3JtXaUkrNDJoy9-65XvZ6a6iPVWLcYNOFE9GzbtoPL8xswhA3wmm6kXPyHhp3evh9cWNjwvA4XXdxqUF0F99WI5hSm4Wq35AkVAGEJ37PHgdd3WSA78QI0xBVkktcT6rcWMqrSNQQAXWjYIL2_XGQlbVziqpQjM2a6Q8qundabhD3K0i3LBE5nP?purpose=fullsize",
  ],
  tieSet: [
    "https://images.openai.com/static-rsc-4/-rJ-7ga9jg6U7cEfLDm8ZP5taEz5nwnADx-fXbVPYgGeBoZCfs-YAVj9lalGoX9HMd98M0q7ZFxjqLcvQVAyeFcLAzSQBM3diMKYa9pY0HAmoM2aw8YwgYl8sd0NkvjVox0eEuyWkaaROPSl9Y0BJmHBtGTJ_4vHIl48fS4q6catYPHWrLk2iAIQzYVJaqAm?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/fltZVn_fVC3tUBw8Len2eayGBofwCGVWWCTRv0ICx4LNn7b4AwZDnqHYx9oShsoguISh-PkltVODx5LdO5lIIR7eeU0b12eBNtX6qho0wTEmhu3T0xWVR7b91HnOp8fYmtitv08s_1zwomnpkQvxb4aqjPe19BKMQI9R8tNxRAnimwLBih0cWrZisTn6SFJr?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/Q087xmtvwn4IWr1SHCEvSjAt0yEyzIsgDho3sdl2yTL39RzPzbuovn2FthUMf_oolCYaKd9lQBJnkmsJI-g8UityQdOTsgxhpcBilFsI2Qyo6K6PfWme7uDPMHVczoBl__gpFSHLBq2nCUHvydI6lAMzzV5td1To0-kNpYrkIDW3p-0n06utvw5u3BFBFV-s?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/vI3FMIqrH8iLIdIYQfZfGc9j6Kt03jFNbZrUiD91ScZ0DlIq_i_VsXEdU4DVyTDw7q0ObPJcEIBj8jRlykwPBkhGs83MjpWoCoxIcn4sPf7noB42s5F7aHcbyExq_pYg6YZANj7mURq8WM4zZGSLkXw5oIKQ6xbHPE_JXE3cUC8TaN5v8WDIsGVrQArmkOP5?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/frpnL5DIbxEOEJEZw-7lV37zayorsIcIkcVCSFS0vyrIAVMffVrBr8q_jGrUSrj6YFlpkUU5BAOBa6kcyfbmZgjXV92Brs_Fzlk7voV3ToQKPm25JaH03hl5NA7L5GbjYn7ENcFD2zkz68VdnrJ4u2yHeN6mzfIiw3UaIF76Dsft2Hru-x62sioVtva9zAB8?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/LSZYOsQ56GKS8gm_BfVnO_ZwjGqLBwrvrBKKGs6CB1VwqtitaY4MFwR2nDUxsAcdpdETXnzqKcidlPC8LhqmKxn7OqBUQGQY2Lsw47t6jROR2CAaGK03VZnfZLHk1uDfTF9Uh6VWS00ZrdDOWqMrRJUv0155TcCUwch5AEGVvVYVQ8g-n0VGhKfDXVh4yArc?purpose=fullsize",
  ],
  cutSet: [
    "https://images.openai.com/static-rsc-4/52D72zQeU13_99a2PCRwAJJgiXlZow0uP8UDCWXjKdXhGirVoqEFaisk4rxXaSiR0Bd4T0uwEKBbRRZ0u2o7jfKbqgy4E-xxKyhi3pwj3j3Q2tMjVHrXwZHya2w0QJqqicC4cChJMIFPKbtlHohkKpUOnYwOY_hlw4HUTZTObZtiC2aj1BzHu9LiR66COFeN?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/5iwNtbNy6Z-NbWsbFune966yQzJgtrb5fb3m00BsGJ7oYOt2PDuHjg9PJupJxr_25LTZ5AnnsO0jeyxdkxFp2SF2XniwiZC-hBIiShYlBLxPzy_Eq5IzV07OthKkDc_phqQPBL9XuqYTdhyTJu-0Lzgo0ykrgaZPvv9Fb-Ica0CulOiOUsqiHUHszcR2u7Ey?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/uCXEe3JegFE3B4yF5qGUWz-XbwjSh8IrS1kOV-tyWkcqG4eR-c4HC-sb4CMpZfA7Jkagu8NRie6RW7cd4s1Os9mpsWw6cAveVK1X3J5Q6PFT9f9WzgucbQzwVyK5xovMUkuJLavu-av-RWzp4VqN66nmiq1nUxxiA06J74ZKoL3fkVvA8css5OWqa1rUtqqF?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/t7l_0bSN8PXeRqnIShYGSkwQZRs2-ZmxRJYIffz-qs6alCeiiNn1Z4BToW0cFtLNp6uoHjyyFB89tSZ-vdaPO98JxxNsjXx8AxjNX1vuYPttCCQKlHGpE7SUlbhv1Y9nJ8LyVdIwIYagRZ5TDvb6tV0GKhaIbK86WPQKV2WtGF_b1yW0crUK6UFpqIhQirL1?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/4FluuCFeFp9OBhXDSZTuKWZ-2yO1HD6ORbt9EqV8RQ_WGarrka4GyZnlKfuSMn_vJfGBgw7gBCKy0c7Op16_qkPcGoaZeMByYoor4vnfX9-8vrLB2R9Lpe41GZnvVnyU_MFAeWrMsnJ7peg-8F0QwFHtZjWryf3UzKlw1Iv_auFV0KCZRYoS9cUTIbZPjUbk?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/3S4kjXATTja20UjkM4Vc9Sy-iVJnI0YS9ME4k9byq9NWOQp3gx4ou12WUl1QejxhkR7r2aZF8a6Ept_By7IrBW8AXq7lHwEZQRyWmMF-HLSq9Yxh32_xkM0RSg2giRsNmhiQDzu4SsBVWBtgWZ0b0lcV9DhBorAAOYMXRzZUzs3mIpRZ0J3rhU3FOFCibJRT?purpose=fullsize",
  ],
};

const modes = {
  graph: {
    label: "Graph",
    title: "Full connected graph",
    note: "All nodes and all six branches are visible. Topology studies this connection pattern without using element values.",
    activeEdges: ["12", "23", "34", "41", "13", "24"],
    dashedEdges: [],
    cut: false,
  },
  tree: {
    label: "Tree",
    title: "Tree formation",
    note: "A tree connects all four nodes using n - 1 = 3 branches and creates no loop.",
    activeEdges: ["12", "23", "34"],
    dashedEdges: ["41", "13", "24"],
    cut: false,
  },
  tie: {
    label: "Tie-set",
    title: "Tie-set loop",
    note: "Adding one link to the tree creates one unique loop. The highlighted path is a fundamental tie-set.",
    activeEdges: ["12", "23", "13"],
    dashedEdges: ["34", "41", "24"],
    cut: false,
  },
  cut: {
    label: "Cut-set",
    title: "Cut-set separation",
    note: "A cut-set is the smallest branch set whose removal separates the graph into two parts.",
    activeEdges: ["12", "23", "34", "41"],
    dashedEdges: ["13", "24"],
    cut: true,
  },
};

const edgeData = {
  "12": { x1: 90, y1: 80, x2: 310, y2: 80, labelX: 198, labelY: 58, label: "b1" },
  "23": { x1: 310, y1: 80, x2: 310, y2: 250, labelX: 324, labelY: 170, label: "b2" },
  "34": { x1: 310, y1: 250, x2: 90, y2: 250, labelX: 198, labelY: 278, label: "b3" },
  "41": { x1: 90, y1: 250, x2: 90, y2: 80, labelX: 46, labelY: 170, label: "b4" },
  "13": { x1: 90, y1: 80, x2: 310, y2: 250, labelX: 170, labelY: 148, label: "b5" },
  "24": { x1: 310, y1: 80, x2: 90, y2: 250, labelX: 226, labelY: 148, label: "b6" },
};

const nodeData = [
  { id: "1", x: 90, y: 80 },
  { id: "2", x: 310, y: 80 },
  { id: "3", x: 310, y: 250 },
  { id: "4", x: 90, y: 250 },
];

const terms = [
  { title: "Node", body: "A point where two or more elements are connected. A wire junction is a common node." },
  { title: "Branch", body: "A single element between two nodes. It carries branch current." },
  { title: "Loop", body: "A closed path in a circuit." },
  { title: "Mesh", body: "A loop that does not contain any other loop inside it." },
  { title: "Path", body: "A route between two nodes without repeating nodes." },
  { title: "Graph", body: "A simplified representation using only nodes and branches." },
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
  if (!images.length) return null;

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

function TopologyAnimator() {
  const [mode, setMode] = useState("graph");
  const activeMode = modes[mode];

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(modes).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              mode === key
                ? "bg-portal-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <svg viewBox="0 0 400 330" role="img" aria-label="Animated network topology graph" className="h-auto w-full">
            <rect width="400" height="330" fill="#f8fafc" />
            {activeMode.cut ? (
              <line x1="200" y1="35" x2="200" y2="295" stroke="#f97316" strokeWidth="4" strokeDasharray="10 8" />
            ) : null}
            {Object.entries(edgeData).map(([key, edge]) => {
              const isActive = activeMode.activeEdges.includes(key);
              const isDashed = activeMode.dashedEdges.includes(key);
              return (
                <g key={key}>
                  <line
                    x1={edge.x1}
                    y1={edge.y1}
                    x2={edge.x2}
                    y2={edge.y2}
                    stroke={isActive ? "#2563eb" : "#cbd5e1"}
                    strokeWidth={isActive ? "7" : "4"}
                    strokeLinecap="round"
                    strokeDasharray={isDashed ? "9 8" : "0"}
                    className={isActive ? "topology-edge" : ""}
                  />
                  {isActive ? (
                    <circle r="5" fill="#f97316" className="topology-pulse">
                      <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${edge.x1},${edge.y1} L${edge.x2},${edge.y2}`} />
                    </circle>
                  ) : null}
                  <text x={edge.labelX} y={edge.labelY} textAnchor="middle" className="fill-slate-500 text-[13px] font-bold">
                    {edge.label}
                  </text>
                </g>
              );
            })}
            {nodeData.map((node) => (
              <g key={node.id}>
                <circle cx={node.x} cy={node.y} r="20" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
                <circle cx={node.x} cy={node.y} r="28" fill="none" stroke="#2563eb" strokeWidth="2" className="topology-ring" />
                <text x={node.x} y={node.y + 5} textAnchor="middle" className="fill-slate-950 text-[15px] font-black">
                  {node.id}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-portal-700">Working visual</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">{activeMode.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-700">{activeMode.note}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-bold text-slate-950">Nodes</p>
              <p className="mt-1 text-slate-700">n = 4</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-bold text-slate-950">Branches</p>
              <p className="mt-1 text-slate-700">b = 6</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-bold text-slate-950">Loops</p>
              <p className="mt-1 text-slate-700">l = 3</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-bold text-slate-950">Tree branches</p>
              <p className="mt-1 text-slate-700">n - 1 = 3</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .topology-edge {
          animation: edgeGlow 1.7s ease-in-out infinite alternate;
        }
        .topology-ring {
          animation: ringPulse 1.8s ease-in-out infinite;
          transform-origin: center;
        }
        .topology-pulse {
          filter: drop-shadow(0 0 6px rgba(249, 115, 22, 0.75));
        }
        @keyframes edgeGlow {
          from {
            opacity: 0.72;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes ringPulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.85;
          }
        }
      `}</style>
    </div>
  );
}

export default function NetworkTopologyPage() {
  return (
    <Layout title="ECE Exam Guide | Network Topology" pageClassName="py-3 sm:py-4">
      <div className="mx-auto max-w-[1200px] pb-24">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-start justify-between gap-3 pt-1">
          <ol className="flex flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm text-slate-500 shadow-sm backdrop-blur">
            <li><Link href="/" className="font-medium text-slate-600 transition hover:text-portal-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects" className="font-medium text-slate-600 transition hover:text-portal-700">Subjects</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/subjects/network-analysis" className="font-medium text-slate-600 transition hover:text-portal-700">Network Analysis</Link></li>
            <li className="text-slate-300">/</li>
            <li><span className="rounded-full bg-portal-50 px-3 py-1 font-semibold text-portal-700">Network Topology</span></li>
          </ol>
          <NetworkTopicMenu currentPath="/network-topology" />
        </nav>

        <section className="rounded-[30px] border border-portal-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,249,255,0.94))] p-5 shadow-panel sm:p-6">
          <p className="inline-flex rounded-full border border-portal-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-portal-700">
            Network Analysis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Network Topology - Complete Step-by-Step Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Network topology studies circuit structure using nodes, branches, paths, loops,
            trees, tie-sets, cut-sets, and matrices. It ignores actual element values and
            focuses only on how the network is connected.
          </p>
        </section>

        <section className="mt-5 grid gap-4">
          <ConceptCard title="1. What is Network Topology?">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Network Topology is the study of the structure of an electrical network,
              independent of the actual values of elements such as R, L, C, and sources.
              It focuses on how elements are connected, how current can flow, and how
              loops and paths are formed.
            </p>
            <p className="mt-3 rounded-xl border border-portal-100 bg-portal-50/70 px-4 py-3 text-sm font-bold leading-7 text-slate-900 sm:text-base">
              Key idea: topology ignores element values and studies only the interconnection of circuit elements.
            </p>
          </ConceptCard>

          <ConceptCard title="2. Animated Network Topology Function">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Use the buttons to see how the same network becomes a graph, a tree,
              a tie-set loop, and a cut-set separation. The moving dots show branch
              direction and active current paths.
            </p>
            <TopologyAnimator />
          </ConceptCard>

          <ConceptCard title="3. Basic Terms in Network Topology">
            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {terms.map((term) => (
                <MiniCard key={term.title} title={term.title}>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{term.body}</p>
                </MiniCard>
              ))}
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Example Graph Representation</h3>
            <ImageGrid images={topologyImages.graph} alt="Network topology graph representation" />
          </ConceptCard>

          <ConceptCard title="4. Basic Relations">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              Let n be the number of nodes and b be the number of branches.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Number of Independent Loops">
                <FormulaBox>l = b - n + 1</FormulaBox>
                <BulletList items={["Used in mesh analysis.", "Used for independent loop equations."]} />
              </MiniCard>
              <MiniCard title="Number of Independent Node Equations">
                <FormulaBox>n - 1</FormulaBox>
                <BulletList items={["Used in nodal analysis.", "One node is selected as reference."]} />
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="5. Tree in Network Topology">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A tree is a subgraph that connects all nodes and contains no loops.
            </p>
            <BulletList items={["Contains n - 1 branches.", "Has no closed path.", "Ensures all nodes remain connected."]} />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Tree Representation</h3>
            <ImageGrid images={topologyImages.tree} alt="Tree representation in network topology" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Twigs">
                <p className="mt-2 text-sm leading-6 text-slate-700">Branches that are part of the tree.</p>
              </MiniCard>
              <MiniCard title="Links or Chords">
                <p className="mt-2 text-sm leading-6 text-slate-700">Branches that are not part of the tree.</p>
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="6. Tie-Set or Loop Matrix">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A tie-set is a loop formed by adding one link to a tree. Each link creates
              one unique loop.
            </p>
            <FormulaBox>Number of tie-sets = b - (n - 1)</FormulaBox>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Tie-Set Formation</h3>
            <ImageGrid images={topologyImages.tieSet} alt="Tie-set formation" />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Tie-Set Matrix</h3>
            <BulletList items={["+1 means branch direction is same as loop direction.", "-1 means branch direction is opposite to loop direction.", "0 means branch is not included in that tie-set."]} />
          </ConceptCard>

          <ConceptCard title="7. Cut-Set or Node Separation">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              A cut-set is a set of branches that, when removed, divides the network into
              two separate parts. It is closely related to node analysis and KCL.
            </p>
            <FormulaBox>Number of cut-sets = n - 1</FormulaBox>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Cut-Set Example</h3>
            <ImageGrid images={topologyImages.cutSet} alt="Cut-set example" />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Cut-Set Matrix</h3>
            <BulletList items={["+1 means current leaving the selected node or section.", "-1 means current entering the selected node or section.", "0 means branch is not part of the cut-set."]} />
          </ConceptCard>

          <ConceptCard title="8. Incidence Matrix">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              The incidence matrix shows the relationship between nodes and branches.
            </p>
            <FormulaBox>Matrix size = n x b</FormulaBox>
            <BulletList items={["+1 means branch leaving the node.", "-1 means branch entering the node.", "0 means no connection between that node and branch."]} />
          </ConceptCard>

          <ConceptCard title="9. Graph Theory in Circuits">
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              In graph theory based circuit analysis, a physical circuit is converted into
              a graph. Actual components are replaced by branches, and connection points
              are represented by nodes.
            </p>
            <BulletList items={["Simplifies large circuit analysis.", "Helps apply matrix methods.", "Used in computer-based circuit analysis.", "Useful in network algorithms and simulation."]} />
          </ConceptCard>

          <ConceptCard title="10. Example: Full Understanding">
            <h3 className="mt-2 text-lg font-bold text-slate-950">Given</h3>
            <BulletList items={["Nodes = 4", "Branches = 6"]} />
            <h3 className="mt-5 text-lg font-bold text-slate-950">Number of Loops</h3>
            <FormulaBox>l = 6 - 4 + 1 = 3</FormulaBox>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Tree Branches</h3>
            <FormulaBox>n - 1 = 3</FormulaBox>
            <h3 className="mt-5 text-lg font-bold text-slate-950">Links</h3>
            <FormulaBox>6 - 3 = 3</FormulaBox>
            <BulletList items={["3 independent loops.", "3 links.", "3 tree branches."]} />
          </ConceptCard>

          <ConceptCard title="11. Why Network Topology is Important">
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniCard title="Used In">
                <BulletList items={["Circuit analysis using KVL and KCL.", "Computer simulation.", "Power systems.", "Signal networks."]} />
              </MiniCard>
              <MiniCard title="Helps In">
                <BulletList items={["Reducing complexity.", "Systematic equation formation.", "Matrix-based solving.", "Understanding connectivity."]} />
              </MiniCard>
            </div>
          </ConceptCard>

          <ConceptCard title="12. Common Mistakes">
            <BulletList items={["Confusing loop and mesh.", "Ignoring the tree condition that it must have no loops.", "Using the wrong sign convention in matrices.", "Counting branches without checking whether dependent sources are also branches."]} />
          </ConceptCard>

          <ConceptCard title="13. Final Summary">
            <p className="mt-2 rounded-xl border border-portal-100 bg-portal-50/70 px-4 py-3 text-sm font-bold leading-7 text-slate-900 sm:text-base">
              Network topology studies the structure of circuits using graphs, trees, loops,
              and matrices, independent of element values, to simplify analysis and understand
              connectivity.
            </p>
          </ConceptCard>

          <ConceptCard title="14. Website Enhancement Ideas">
            <BulletList items={["Node connection animation.", "Tree formation step-by-step.", "Tie-set loop creation.", "Cut-set separation."]} />
          </ConceptCard>
        </section>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/transient-analysis"
            className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Transient Analysis
          </Link>
          <Link
            href="/laplace-transform-methods"
            className="inline-flex justify-center rounded-xl bg-portal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-portal-700"
          >
            Next Laplace Transform Methods
          </Link>
        </div>
      </div>
    </Layout>
  );
}
