import { useEffect, useMemo, useState } from "react";
import { challengeQuestions, gameModes } from "../../data/ece-iq";
import { defaultProgress, progressStore } from "../../lib/ece-iq-storage";
import type { ChallengeQuestion, Difficulty, GameMode, GameModeId, IQProgress } from "../../types/ece-iq";
import EngineeringMission from "./EngineeringMission";

const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced", "GATE/BEL Level"];
const careerTiers = [{ name: "Cadet Engineer", rating: 800 }, { name: "Junior Engineer", rating: 950 }, { name: "Engineer", rating: 1200 }, { name: "Senior Engineer", rating: 1450 }, { name: "BEL Engineer", rating: 1700 }, { name: "ISRO Engineer", rating: 2000 }];
const planets: { name: string; system: string; mode: GameModeId; icon: string; color: string }[] = [{ name: "Digital Electronics", system: "Logic construction", mode: "logic-gate-master", icon: "logic", color: "from-violet-500 to-fuchsia-900" }, { name: "Network Theory", system: "Power-grid paths", mode: "network-challenge", icon: "network", color: "from-emerald-400 to-teal-900" }, { name: "Communication Systems", system: "Telemetry signals", mode: "signal-analyst", icon: "wave", color: "from-blue-400 to-indigo-900" }, { name: "Control Systems", system: "Design missions", mode: "engineering-aptitude", icon: "target", color: "from-amber-400 to-orange-900" }];
const accentMap = {
  cyan: "from-cyan-400 to-blue-500 text-cyan-300 border-cyan-400/25 bg-cyan-400/10",
  violet: "from-violet-400 to-fuchsia-500 text-violet-300 border-violet-400/25 bg-violet-400/10",
  blue: "from-blue-400 to-indigo-500 text-blue-300 border-blue-400/25 bg-blue-400/10",
  amber: "from-amber-300 to-orange-500 text-amber-300 border-amber-400/25 bg-amber-400/10",
  emerald: "from-emerald-400 to-teal-500 text-emerald-300 border-emerald-400/25 bg-emerald-400/10",
  rose: "from-rose-400 to-pink-500 text-rose-300 border-rose-400/25 bg-rose-400/10",
};

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5M8 11l1.5 1.5L13 9"/></>,
    logic: <><path d="M4 6h5c4 0 7 2.5 8 6-1 3.5-4 6-8 6H4c2.5-3 2.5-9 0-12Z"/><path d="M2 9h4M2 15h4M17 12h5"/></>,
    wave: <path d="M2 12h3c2 0 2-7 4-7s2 14 4 14 2-14 4-14 2 7 4 7h1"/>,
    brain: <><path d="M9 5a3 3 0 0 0-5 2.2A3.5 3.5 0 0 0 4.5 14 4 4 0 0 0 9 19V5ZM15 5a3 3 0 0 1 5 2.2 3.5 3.5 0 0 1-.5 6.8A4 4 0 0 1 15 19V5Z"/><path d="M9 9H7M15 9h2M9 14H7M15 14h2M12 3v18"/></>,
    network: <><circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="12" cy="19" r="2"/><path d="m6.5 10.5 4-4m3 0 4 4m0 3-4 4m-3 0-4-4"/></>,
    memory: <><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3M9 9h6v6H9z"/></>,
    bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>,
    coin: <><circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.6-.5-1.4-.8-2.5-.8-1.4 0-2.5.7-2.5 1.7 0 2.8 5 1 5 3.7 0 1.1-1.1 1.9-2.7 1.9-1.2 0-2.2-.4-3-1M12 6.5v11"/></>,
    fire: <path d="M12 22c4 0 7-3 7-7 0-3-1.5-5.3-4-7 .1 2-1 3.5-2.3 4.2.4-4-1.4-7.2-5.2-9.7.5 4-2.5 6.5-2.5 10C5 18 8 22 12 22Z"/>,
    trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4ZM8 6H4v1a4 4 0 0 0 4 4m8-5h4v1a4 4 0 0 1-4 4M12 12v5m-4 3h8m-6-3h4"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.bolt}</g></svg>;
}

function CircuitBackdrop() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
    <svg className="h-full w-full" preserveAspectRatio="none"><defs><pattern id="iq-grid" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M0 15h25v20h20v20h25M15 0v22M55 48v22" fill="none" stroke="#22d3ee" strokeOpacity=".16"/><circle cx="25" cy="15" r="2" fill="#22d3ee"/><circle cx="45" cy="55" r="2" fill="#8b5cf6"/></pattern></defs><rect width="100%" height="100%" fill="url(#iq-grid)"/></svg>
  </div>;
}

function LevelRing({ progress }: { progress: IQProgress }) {
  const level = Math.floor(progress.xp / 500) + 1;
  const percent = (progress.xp % 500) / 5;
  return <div className="relative grid h-28 w-28 place-items-center rounded-full p-[7px]" style={{ background: `conic-gradient(#22d3ee ${percent}%, #25314f ${percent}% 100%)` }}>
    <div className="grid h-full w-full place-items-center rounded-full bg-[#0b1224] text-center shadow-[inset_0_0_24px_rgba(34,211,238,.08)]">
      <div><span className="block text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">Level</span><span className="block text-3xl font-black text-white">{level}</span></div>
    </div>
  </div>;
}

function Stat({ icon, label, value, tint }: { icon: string; label: string; value: string | number; tint: string }) {
  return <article className="rounded-2xl border border-white/10 bg-white/[.045] p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/25">
    <span className={`grid h-9 w-9 place-items-center rounded-xl ${tint}`}><Icon name={icon} className="h-[18px] w-[18px]"/></span>
    <p className="mt-3 text-[11px] font-bold uppercase tracking-[.14em] text-slate-500">{label}</p><p className="mt-1 text-xl font-black text-white">{value}</p>
  </article>;
}

function ModeCard({ mode, onPlay }: { mode: GameMode; onPlay: (id: GameModeId) => void }) {
  const accent = accentMap[mode.accent as keyof typeof accentMap];
  return <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111a30]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,.22)] transition duration-300 hover:-translate-y-1 hover:border-white/20">
    <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${accent.split(" ").slice(0,2).join(" ")} opacity-[.08] blur-2xl transition group-hover:opacity-20`}/>
    <div className="flex items-start justify-between"><span className={`grid h-12 w-12 place-items-center rounded-2xl border ${accent}`}><Icon name={mode.icon} className="h-6 w-6"/></span><span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-400">{mode.available} missions</span></div>
    <h3 className="mt-5 text-lg font-black text-white">{mode.title}</h3><p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-400">{mode.description}</p>
    <div className="mt-4 flex flex-wrap gap-1.5">{mode.skills.map(skill => <span key={skill} className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-semibold text-slate-400">{skill}</span>)}</div>
    <button onClick={() => onPlay(mode.id)} className="mt-5 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[.055] px-3.5 py-2.5 text-xs font-bold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10">Enter lab <Icon name="arrow" className="h-4 w-4 text-cyan-300 transition group-hover:translate-x-1"/></button>
  </article>;
}

function ChallengeDiagram({ type }: { type: ChallengeQuestion["diagram"] }) {
  return <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#07101f] text-cyan-300">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.045)_1px,transparent_1px)] bg-[size:20px_20px]"/>
    {type === "signal" ? <svg viewBox="0 0 360 100" className="relative w-[86%]"><path d="M5 50h350" stroke="#334155"/><path d="M5 50c20 0 20-35 40-35s20 70 40 70 20-70 40-70 20 70 40 70 20-70 40-70 20 70 40 70 20-35 40-35h70" fill="none" stroke="currentColor" strokeWidth="3"/></svg> : null}
    {type === "logic" ? <svg viewBox="0 0 300 110" className="relative w-[78%]"><path d="M35 30h65M35 80h65M100 18h55c42 0 65 28 72 37-7 9-30 37-72 37h-55c18-20 18-54 0-74ZM227 55h42" fill="none" stroke="currentColor" strokeWidth="3"/><text x="45" y="25" fill="white">A</text><text x="45" y="75" fill="white">B</text></svg> : null}
    {type && !["signal","logic"].includes(type) ? <svg viewBox="0 0 360 120" className="relative w-[84%]"><path d="M25 60h55l12-18 20 36 20-36 20 36 12-18h56" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M220 60h28m0-25v50m16-40v30m0-15h55" fill="none" stroke="#a78bfa" strokeWidth="3"/><circle cx="25" cy="60" r="5" fill="currentColor"/><circle cx="319" cy="60" r="5" fill="#a78bfa"/><text x="105" y="30" fill="white" fontSize="12">R1</text><text x="238" y="25" fill="white" fontSize="12">C1</text></svg> : null}
  </div>;
}

function ChallengeModal({ question, onClose, onComplete }: { question: ChallengeQuestion; onClose: () => void; onComplete: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === question.correctIndex;
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-[#030712]/85 p-3 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="challenge-title">
    <div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border border-cyan-400/20 bg-[#0d1629] p-5 text-white shadow-[0_30px_100px_rgba(0,0,0,.6)] sm:p-7">
      <div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">Live mission</span><span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold text-slate-400">{question.difficulty}</span></div><h2 id="challenge-title" className="mt-3 text-xl font-black text-white">Solve the challenge</h2></div><button onClick={onClose} aria-label="Close challenge" className="rounded-xl border border-white/10 p-2 text-slate-400 hover:bg-white/5 hover:text-white"><Icon name="close"/></button></div>
      {question.diagram ? <div className="mt-5"><ChallengeDiagram type={question.diagram}/></div> : null}
      <p className="mt-5 text-base font-bold leading-7 text-slate-100">{question.prompt}</p>
      <div className="mt-4 grid gap-2.5">{question.options.map((option, index) => {
        let style = "border-white/10 bg-white/[.035] text-slate-300 hover:border-cyan-400/35 hover:bg-cyan-400/5";
        if (answered && index === question.correctIndex) style = "border-emerald-400/50 bg-emerald-400/10 text-emerald-200";
        else if (answered && index === selected) style = "border-rose-400/50 bg-rose-400/10 text-rose-200";
        return <button key={option} disabled={answered} onClick={() => setSelected(index)} className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm font-semibold transition ${style}`}><span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-black/20 text-xs">{String.fromCharCode(65 + index)}</span>{option}</button>;
      })}</div>
      {answered ? <div className={`mt-4 rounded-xl border p-4 ${correct ? "border-emerald-400/25 bg-emerald-400/10" : "border-rose-400/25 bg-rose-400/10"}`}><p className={`font-black ${correct ? "text-emerald-300" : "text-rose-300"}`}>{correct ? "Circuit clear — correct!" : "Not quite. Signal recalibrated."}</p><p className="mt-1 text-sm leading-6 text-slate-300">{question.explanation}</p></div> : null}
      <div className="mt-5 flex items-center justify-between"><div className="flex gap-3 text-xs font-bold"><span className="flex items-center gap-1 text-cyan-300"><Icon name="bolt" className="h-4 w-4"/> +{question.xp} XP</span><span className="flex items-center gap-1 text-amber-300"><Icon name="coin" className="h-4 w-4"/> +{question.coins}</span></div>{answered ? <button onClick={() => onComplete(correct)} className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-black text-[#06111e] shadow-[0_10px_30px_rgba(34,211,238,.25)]">Collect reward</button> : <span className="text-xs text-slate-500">Choose one answer</span>}</div>
    </div>
  </div>;
}

export default function EceIQChallenge() {
  const [progress, setProgress] = useState<IQProgress>(defaultProgress);
  const [difficulty, setDifficulty] = useState<Difficulty>("Beginner");
  const [question, setQuestion] = useState<ChallengeQuestion | null>(null);
  const [mission, setMission] = useState<GameModeId | null>(null);
  const [missionResult, setMissionResult] = useState<{ xp: number; coins: number; rating: number } | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setProgress(progressStore.load()); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) progressStore.save(progress); }, [progress, hydrated]);

  const level = Math.floor(progress.xp / 500) + 1;
  const accuracy = progress.attempted ? Math.round(progress.correct / progress.attempted * 100) : 0;
  const iqScore = Math.min(160, Math.round(82 + accuracy * .42 + level * 1.8));
  const engineerRating = progress.rating || 800;
  const rank = engineerRating >= 2000 ? "ISRO Engineer" : engineerRating >= 1700 ? "BEL Engineer" : engineerRating >= 1450 ? "Senior Engineer" : engineerRating >= 1200 ? "Engineer" : engineerRating >= 950 ? "Junior Engineer" : "Cadet Engineer";
  const levelXp = progress.xp % 500;
  const currentMode = question ? gameModes.find(m => m.id === question.mode) : null;

  function start(mode: GameModeId, _preferred = difficulty) {
    setMissionResult(null);
    setMission(mode);
  }
  function complete(correct: boolean) {
    if (!question) return;
    const fresh = !progress.completedIds.includes(question.id);
    setProgress(p => ({ ...p, xp: p.xp + (correct ? question.xp : 30), coins: p.coins + (correct ? question.coins : 3), completed: p.completed + (fresh ? 1 : 0), attempted: p.attempted + 1, correct: p.correct + (correct ? 1 : 0), completedIds: fresh ? [...p.completedIds, question.id] : p.completedIds, lastPlayed: new Date().toISOString(), achievements: correct && p.correct + 1 >= 40 && !p.achievements.includes("precision-pro") ? [...p.achievements, "precision-pro"] : p.achievements }));
    setQuestion(null);
  }

  function completeMission(correct: boolean, reward: { xp: number; coins: number; rating: number }) {
    setProgress(p => ({ ...p, xp: p.xp + reward.xp, coins: p.coins + reward.coins, rating: Math.max(800, (p.rating || 800) + (correct ? reward.rating : -12)), completed: p.completed + (correct ? 1 : 0), attempted: p.attempted + 1, correct: p.correct + (correct ? 1 : 0), lastPlayed: new Date().toISOString() }));
    setMissionResult(reward);
  }

  const leaderboard = useMemo(() => [{ name: "Neha R.", xp: 4820, badge: "NR" }, { name: "Arjun K.", xp: 4510, badge: "AK" }, { name: "You", xp: progress.xp, badge: "YOU" }, { name: "Mira S.", xp: 3180, badge: "MS" }].sort((a,b) => b.xp-a.xp), [progress.xp]);

  return <div className="iq-shell relative overflow-hidden rounded-[28px] border border-slate-800 bg-[#070d1b] text-slate-200 shadow-[0_30px_90px_rgba(15,23,42,.24)]">
    <CircuitBackdrop/><div className="absolute left-[18%] top-[-140px] h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]"/><div className="absolute right-[-70px] top-[30%] h-72 w-72 rounded-full bg-violet-600/10 blur-[100px]"/>
    <div className="relative p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.14)]"><Icon name="bolt"/></span><div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-cyan-300">ECE Exam Guide</p><p className="text-lg font-black text-white">IQ Command Center</p></div></div>
        <div className="flex flex-wrap gap-2"><span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-cyan-200"><Icon name="bolt" className="h-4 w-4"/>{progress.xp.toLocaleString()} XP</span><span className="flex items-center gap-2 rounded-xl border border-amber-400/15 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-200"><Icon name="coin" className="h-4 w-4"/>{progress.coins}</span><span className="flex items-center gap-2 rounded-xl border border-orange-400/15 bg-orange-400/10 px-3 py-2 text-xs font-bold text-orange-200"><Icon name="fire" className="h-4 w-4"/>{progress.streak} day streak</span></div>
      </header>

      {missionResult ? <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-300">Engineering AI · design accepted</p><p className="mt-1 text-sm font-bold text-white">Your solution meets the specification and uses the minimum component count.</p><p className="mt-1 text-xs text-slate-400">Truth-table simulation passed all input states. Next challenge: implement the same behavior using NAND gates only.</p></div><div className="flex flex-none items-center gap-3 text-xs font-black"><span className="text-cyan-300">+{missionResult.xp} XP</span><span className="text-amber-300">+{missionResult.coins} coins</span><span className="text-violet-300">+{missionResult.rating} rating</span><button onClick={() => setMissionResult(null)} aria-label="Dismiss feedback" className="rounded-lg border border-white/10 px-2 py-1 text-slate-400">✕</button></div></div> : null}

      <section className="grid gap-7 py-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300"/> Neural lab online</div><h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">Test your <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">engineering instinct.</span></h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Six interactive labs. Real ECE concepts. One evolving score that measures how you think—not just what you remember.</p><div className="mt-6 flex flex-wrap items-center gap-3"><button onClick={() => start("circuit-detective")} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-black text-[#06111e] shadow-[0_12px_35px_rgba(34,211,238,.22)] transition hover:-translate-y-0.5"><Icon name="bolt"/> Start quick challenge</button><span className="flex items-center gap-2 text-xs text-slate-500"><Icon name="clock" className="h-4 w-4"/> 2–5 min missions</span></div></div>
        <div className="rounded-[24px] border border-white/10 bg-white/[.045] p-5 backdrop-blur"><div className="flex items-center gap-5"><LevelRing progress={progress}/><div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Engineering rank</p><h2 className="mt-1 text-2xl font-black text-white">{rank}</h2><p className="mt-1 text-xs text-slate-400">{500-levelXp} XP to Level {level+1}</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all" style={{width: `${levelXp/5}%`}}/></div></div></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2"><Stat icon="brain" label="IQ Rating" value={engineerRating} tint="bg-violet-400/10 text-violet-300"/><Stat icon="target" label="Accuracy" value={`${accuracy}%`} tint="bg-emerald-400/10 text-emerald-300"/><Stat icon="check" label="Completed" value={progress.completed} tint="bg-cyan-400/10 text-cyan-300"/><Stat icon="trophy" label="Global rank" value="#247" tint="bg-amber-400/10 text-amber-300"/></div></div>
      </section>

      <section className="mb-8 rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-6" aria-labelledby="planet-map-title">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-violet-300">Mission galaxy</p><h2 id="planet-map-title" className="mt-1 text-2xl font-black text-white">Travel between engineering planets</h2></div><p className="text-xs text-slate-500">Complete missions to raise your rating and unlock elite sectors.</p></div>
        <div className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="pointer-events-none absolute left-[10%] right-[10%] top-16 hidden border-t border-dashed border-violet-400/20 lg:block"/>{planets.map((planet,index)=><button key={planet.name} onClick={()=>start(planet.mode)} className="group relative flex min-h-[190px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-4 text-center transition hover:-translate-y-1 hover:border-violet-400/35"><span className={`relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br ${planet.color} text-white shadow-[inset_-18px_-16px_30px_rgba(0,0,0,.35),0_0_38px_rgba(139,92,246,.16)] transition group-hover:scale-105`}><span className="absolute inset-[-7px] rounded-full border border-white/10"/><Icon name={planet.icon}/></span><span className="mt-4 text-sm font-black text-white">{planet.name} Planet</span><span className="mt-1 text-[10px] font-bold text-slate-500">Sector 0{index+1} · {planet.system}</span></button>)}</div>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">{careerTiers.map(tier=>{const unlocked=engineerRating>=tier.rating;const active=tier.name===rank;return <div key={tier.name} className={`rounded-xl border p-2 text-center ${active?"border-cyan-300 bg-cyan-400/15":unlocked?"border-emerald-400/20 bg-emerald-400/5":"border-white/5 bg-black/20 opacity-45"}`}><span className="block text-[9px] font-black text-white">{tier.name}</span><span className="mt-1 block text-[9px] text-slate-500">{unlocked?`${tier.rating} ✓`:`🔒 ${tier.rating}`}</span></div>})}</div>
      </section>
      <section aria-labelledby="labs-title"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">Choose your arena</p><h2 id="labs-title" className="mt-1 text-2xl font-black text-white">Engineering labs</h2></div><div className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-white/10 bg-black/20 p-1">{difficulties.map(item => <button key={item} onClick={() => setDifficulty(item)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-[10px] font-bold transition ${difficulty === item ? "bg-cyan-400 text-[#06111e]" : "text-slate-400 hover:text-white"}`}>{item}</button>)}</div></div><div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{gameModes.map(mode => <ModeCard key={mode.id} mode={mode} onPlay={start}/>)}</div></section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
        <article className="relative overflow-hidden rounded-[22px] border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-5 sm:p-6"><div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl"/><div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-violet-300"><Icon name="target"/><span className="text-[10px] font-bold uppercase tracking-[.18em]">Daily transmission</span></div><h2 className="mt-3 text-xl font-black text-white">Solar Regulator Emergency</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Size and verify the regulator path before the orbital battery enters protection mode.</p><div className="mt-4 flex gap-4 text-xs font-bold"><span className="text-cyan-300">+250 XP</span><span className="text-amber-300">+35 coins</span><span className="text-slate-400">03:00</span></div></div><button onClick={() => start("engineering-aptitude", "Advanced")} className="flex-none rounded-xl border border-violet-400/30 bg-violet-400/15 px-5 py-3 text-sm font-black text-violet-100 transition hover:bg-violet-400/25">Accept challenge</button></div></article>
        <article className="rounded-[22px] border border-white/10 bg-white/[.04] p-5"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-300">Streak rewards</p><h2 className="mt-1 text-lg font-black text-white">Day {progress.streak} of 7</h2></div><Icon name="fire" className="h-8 w-8 text-orange-400"/></div><div className="mt-5 flex justify-between gap-1">{[1,2,3,4,5,6,7].map(day => <div key={day} className={`grid h-9 w-9 place-items-center rounded-full border text-[10px] font-bold ${day <= progress.streak ? "border-orange-400/40 bg-orange-400/15 text-orange-200" : "border-white/10 bg-black/20 text-slate-600"}`}>{day < progress.streak ? <Icon name="check" className="h-4 w-4"/> : day}</div>)}</div><p className="mt-4 text-xs text-slate-400">Return tomorrow for the final <span className="font-bold text-amber-300">100 coin</span> vault.</p></article>
      </section>

      <section className="mt-8 overflow-hidden rounded-[22px] border border-orange-400/20 bg-[radial-gradient(circle_at_right,rgba(249,115,22,.15),transparent_38%),rgba(255,255,255,.035)] p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-orange-300"><Icon name="trophy"/><span className="text-[10px] font-black uppercase tracking-[.18em]">Engineering arena · rating match</span></div><h2 className="mt-2 text-xl font-black text-white">Build against the clock</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Solve the same logic-build specification used in ranked matches. Fast, minimal designs earn the largest rating gain.</p><div className="mt-3 flex gap-4 text-[10px] font-black"><span className="text-emerald-300">Elo scoring active</span><span className="text-cyan-300">Same mission seed</span><span className="text-slate-500">Realtime opponent adapter ready</span></div></div><button onClick={()=>start("logic-gate-master")} className="flex-none rounded-xl bg-gradient-to-r from-orange-400 to-rose-500 px-5 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(249,115,22,.2)]">Enter arena trial</button></div>
      </section>
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="rounded-[22px] border border-white/10 bg-white/[.04] p-5"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">Hall of signals</p><h2 className="mt-1 text-xl font-black text-white">Weekly leaderboard</h2></div><Icon name="trophy" className="h-7 w-7 text-amber-300"/></div><div className="mt-4 space-y-2">{leaderboard.map((player,index) => <div key={player.name} className={`flex items-center gap-3 rounded-xl border p-3 ${player.name === "You" ? "border-cyan-400/25 bg-cyan-400/10" : "border-white/5 bg-black/15"}`}><span className={`w-5 text-center text-xs font-black ${index < 3 ? "text-amber-300" : "text-slate-500"}`}>{index+1}</span><span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[9px] font-black text-slate-200">{player.badge}</span><span className="flex-1 text-sm font-bold text-slate-200">{player.name}</span><span className="text-xs font-black text-cyan-300">{player.xp.toLocaleString()} XP</span></div>)}</div></article>
        <article className="rounded-[22px] border border-white/10 bg-white/[.04] p-5"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-violet-300">Milestones</p><h2 className="mt-1 text-xl font-black text-white">Achievements</h2></div><div className="mt-5 grid grid-cols-2 gap-3">{[{id:"first-spark",name:"First Spark",icon:"bolt",note:"Complete a mission"},{id:"logic-rookie",name:"Gate Keeper",icon:"logic",note:"Clear a logic lab"},{id:"precision-pro",name:"Precision Pro",icon:"target",note:"40 correct answers"},{id:"week-warrior",name:"Week Warrior",icon:"fire",note:"Reach a 7-day streak"}].map(a => { const unlocked = progress.achievements.includes(a.id); return <div key={a.id} className={`rounded-xl border p-3 ${unlocked ? "border-violet-400/25 bg-violet-400/10" : "border-white/5 bg-black/15 opacity-55"}`}><span className={`grid h-9 w-9 place-items-center rounded-xl ${unlocked ? "bg-violet-400/15 text-violet-300" : "bg-white/5 text-slate-500"}`}><Icon name={unlocked ? a.icon : "lock"} className="h-[18px] w-[18px]"/></span><p className="mt-2 text-xs font-black text-white">{a.name}</p><p className="mt-1 text-[10px] leading-4 text-slate-500">{a.note}</p></div>})}</div></article>
      </section>
    </div>
    {mission ? <EngineeringMission mode={mission} onClose={() => setMission(null)} onComplete={completeMission}/> : null}
    {question ? <ChallengeModal key={question.id} question={question} onClose={() => setQuestion(null)} onComplete={complete}/> : null}
    {currentMode ? <span className="sr-only">Playing {currentMode.title}</span> : null}
  </div>;
}
