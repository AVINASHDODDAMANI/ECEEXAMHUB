import Link from "next/link";
import Layout from "../../components/layout";
import { grammarTopicMap, grammarTopics, getTopicPractice } from "../../data/grammar-hub";
import { buildBreadcrumbList, SITE_URL } from "../../lib/seo";

function PrintButton() { return <button type="button" onClick={() => window.print()} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-extrabold text-[#071d49] hover:border-orange-400 hover:text-orange-700">Save PDF notes</button>; }
function Section({ id, title, children }) { return <section id={id} className="scroll-mt-28 border-t border-slate-200 py-7 first:border-t-0"><h2 className="text-2xl font-black text-[#071d49]">{title}</h2><div className="mt-4 text-sm leading-7 text-slate-700">{children}</div></section>; }

export default function GrammarTopicPage({ topic }) {
  const practice = getTopicPractice(topic);
  const related = topic.related.map(slug => grammarTopicMap[slug]).filter(Boolean);
  const faqs = [
    { q:`What is ${topic.shortTitle}?`, a:topic.definition },
    { q:`Why is ${topic.shortTitle.toLowerCase()} important for placement exams?`, a:`It is commonly tested through sentence correction, error detection, fill-in-the-blank, verbal ability, and interview communication tasks.` },
    { q:`How should I study ${topic.shortTitle.toLowerCase()}?`, a:`Understand the underlying meaning, learn the core rules, compare correct and incorrect examples, and then practise questions with explanations.` },
    { q:`Can I save these ${topic.shortTitle.toLowerCase()} notes as a PDF?`, a:`Yes. Use the Save PDF notes button and select Save as PDF in your browser's print dialog.` },
  ];
  const structuredData = [
    buildBreadcrumbList([{name:"Home",item:"/"},{name:"English Grammar",item:"/grammar"},{name:topic.shortTitle,item:`/grammar/${topic.slug}`}]),
    { "@context":"https://schema.org", "@type":"Article", headline:topic.title, description:topic.description, mainEntityOfPage:`${SITE_URL}/grammar/${topic.slug}`, author:{"@type":"Organization",name:"ECE Exam Guide"}, publisher:{"@type":"Organization",name:"ECE Exam Guide"}, inLanguage:"en-IN" },
    { "@context":"https://schema.org", "@type":"FAQPage", mainEntity:faqs.map(item => ({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}})) },
  ];
  return <Layout title={topic.title} description={topic.description} canonicalUrl={`/grammar/${topic.slug}`} keywords={`${topic.keyword}, English grammar for placements, grammar exercises, competitive exam English`} structuredData={structuredData} pageClassName="py-3 sm:py-5">
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"><Link href="/">Home</Link><span>/</span><Link href="/grammar">English Grammar</Link><span>/</span><span className="text-slate-700">{topic.shortTitle}</span></nav>
    <article className="border border-slate-200 bg-white px-5 py-7 sm:px-8">
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[.14em] text-portal-700">English Grammar for Placements</p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-[#071d49] sm:text-4xl">{topic.title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">{topic.description}</p>
        <div className="mt-5 flex flex-wrap gap-3"><PrintButton/><a href="#practice" className="rounded-md bg-[#071d49] px-4 py-2 text-xs font-extrabold text-white hover:bg-portal-700">Start practice</a></div>
      </header>

      <nav aria-label="On this page" className="mt-7 border-y border-slate-200 py-4"><p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">On this page</p><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-portal-700">{[["introduction","Introduction"],["definition","Definition"],...(topic.importance ? [["importance","Why grammar is important"]] : []),["formula","Formula"],["rules","Rules"],["examples","Examples"],["mistakes","Common mistakes"],["practice","Practice"],["interview","Interview questions"],["faq","FAQ"]].map(([id,label]) => <a key={id} href={`#${id}`} className="hover:text-orange-600">{label}</a>)}</div></nav>

      <Section id="introduction" title="Introduction">{topic.introduction.map(paragraph => <p key={paragraph} className="mt-3 first:mt-0">{paragraph}</p>)}</Section>
      <Section id="definition" title="Definition">{(topic.definitionDetails || [topic.definition,"The definition should be applied through meaning and context. In objective examinations, two forms may appear structurally possible, but only one expresses the intended relationship accurately."]).map(paragraph => <p key={paragraph} className="mt-3 first:mt-0">{paragraph}</p>)}</Section>{topic.importance ? <Section id="importance" title="Why Grammar Is Important">{topic.importance.map(paragraph => <p key={paragraph} className="mt-3 first:mt-0">{paragraph}</p>)}</Section> : null}
      <Section id="formula" title="Formula and structure">
        {topic.structure ? <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
            <h3 className="font-bold text-slate-900">Formula</h3>
            <div className="mt-5 space-y-5 font-mono text-sm font-semibold leading-7 text-slate-900">{topic.formulas.map((formula,index) => <div key={formula}>{index > 0 ? <p className="mb-4 font-sans font-bold">OR</p> : null}<p>{formula}</p></div>)}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
            <h3 className="font-bold text-slate-900">Structure</h3>
            <div className="mt-5 font-mono text-sm font-semibold text-slate-900">{topic.structure.map((item,index) => <div key={item}><p>{item}</p>{index < topic.structure.length - 1 ? <p aria-hidden="true" className="py-1">↓</p> : null}</div>)}</div>
          </div>
        </div> : <div className="space-y-2 border-l-4 border-portal-300 bg-slate-50 px-4 py-3 font-mono text-sm font-bold text-slate-900">{topic.formulas.map(formula => <p key={formula}>{formula}</p>)}</div>}
        {topic.formulaExplanation ? <div className="mt-5"><h3 className="font-bold text-slate-900">Explanation</h3><p className="mt-3">{topic.formulaExplanation}</p></div> : null}
      </Section>
      <Section id="rules" title={`${topic.shortTitle} rules`}>
        {topic.ruleDetails ? <div>{topic.ruleDetails.map((rule,index) => <div key={rule.title} className="border-b border-slate-200 py-6 first:pt-0 last:border-b-0">
          <h3 className="text-base font-bold text-slate-900">{index + 1}. {rule.title}</h3>
          <p className="mt-3">{rule.explanation}</p>
          <p className="mt-4"><strong className="text-slate-900">Example:</strong> {rule.example}</p>
          {rule.incorrect ? <p><strong className="text-slate-900">Incorrect:</strong> {rule.incorrect}</p> : null}
          {rule.note ? <p className="mt-1">{rule.note}</p> : null}
        </div>)}</div> : <ol className="list-decimal space-y-3 pl-5">{topic.rules.map(rule => <li key={rule} className="pl-1">{rule}</li>)}</ol>}
        {topic.rulesTakeaway ? <div className="mt-6 border-t border-slate-200 pt-6"><h3 className="font-bold text-slate-900">Key Takeaway</h3><p className="mt-3">{topic.rulesTakeaway}</p></div> : null}
      </Section>
      <Section id="examples" title="Examples with explanation"><div className="space-y-3">{topic.examples.map((example,index) => <div key={example}><p className="font-semibold text-slate-900">{example}</p><p className="mt-1 text-xs text-slate-600">This example demonstrates rule {Math.min(index+1,topic.rules.length)}: {topic.rules[index % topic.rules.length]}</p></div>)}</div></Section>
      <Section id="mistakes" title="Common mistakes"><div className="space-y-3">{topic.mistakes.map(mistake => <p key={mistake} className="border-l-4 border-amber-300 pl-3">{mistake}</p>)}</div></Section>

      <Section id="practice" title={`${topic.shortTitle} practice questions`}>
        <p>{topic.slug === "what-is-grammar" ? "Choose the correct answer for each question and use the answer key to check your understanding of basic grammar." : "Answer each question before opening the solution. These initial questions demonstrate the practice format; the bank is designed to expand without changing the page URL."}</p>
        <h3 className="mt-6 text-lg font-extrabold text-slate-900">Multiple-choice questions</h3>
        {topic.slug === "what-is-grammar" ? <div className="mt-3 divide-y divide-slate-200">{practice.mcqs.map((question,index) => <div key={question.id} className="py-6 first:pt-2">
          <p className="font-bold text-slate-900">Question {index + 1}</p>
          <p className="mt-3 font-semibold text-slate-900">{question.question}</p>
          <ol className="mt-4 list-[upper-alpha] space-y-3 pl-5">{question.options.map(option => <li key={option} className="pl-1">{option}</li>)}</ol>
          <p className="mt-4 font-medium text-slate-900"><span aria-hidden="true" className="mr-2 text-emerald-600">☑</span>Answer: {question.answer}</p>
        </div>)}</div> : <div className="mt-3 space-y-3">{practice.mcqs.map((question,index) => <details key={question.id} className="border-b border-slate-200 pb-3"><summary className="cursor-pointer font-semibold text-slate-900">{index+1}. {question.question}</summary><div className="mt-2 pl-4"><ul className="list-[upper-alpha] pl-5 text-sm">{question.options.map(option => <li key={option}>{option}</li>)}</ul><p className="mt-2 font-bold text-emerald-700">Answer: {question.answer}</p></div></details>)}</div>}
        <h3 className="mt-7 text-lg font-extrabold text-slate-900">Fill in the blanks</h3>
        {topic.slug === "what-is-grammar" ? <div className="mt-3 divide-y divide-slate-200">{practice.fills.map((item,index) => <div key={item.id} className="py-6 first:pt-2">
          <p className="font-bold text-slate-900">{index + 1}. Complete the statement:</p>
          <p className="mt-3">{item.prompt}</p>
          <p className="mt-4"><strong className="text-slate-900">Answer:</strong> {item.answer}</p>
          <p className="mt-3"><strong className="text-slate-900">Explanation:</strong> {item.explanation}</p>
        </div>)}</div> : <div className="mt-3 space-y-3">{practice.fills.map((item,index) => <details key={item.id} className="border-b border-slate-200 pb-3"><summary className="cursor-pointer font-semibold text-slate-900">{index+1}. {item.prompt}</summary><p className="mt-2 font-bold text-emerald-700">Answer: {item.answer}</p></details>)}</div>}
        <h3 className="mt-7 text-lg font-extrabold text-slate-900">Error detection</h3>
        {topic.slug === "what-is-grammar" ? <div className="mt-3 divide-y divide-slate-200">{practice.errors.map((item,index) => <div key={item.id} className="py-6 first:pt-2">
          <p className="font-bold text-slate-900">{index + 1}. Identify the error:</p>
          <p className="mt-3"><strong className="text-slate-900">Incorrect:</strong> {item.incorrect}</p>
          <p className="mt-3"><strong className="text-slate-900">Answer:</strong> {item.answer}</p>
          {item.correct ? <p className="mt-3"><strong className="text-slate-900">Correct:</strong> {item.correct}</p> : null}
          <p className="mt-3"><strong className="text-slate-900">Explanation:</strong> {item.explanation}</p>
        </div>)}</div> : <div className="mt-3 space-y-3">{practice.errors.map((item,index) => <details key={item.id} className="border-b border-slate-200 pb-3"><summary className="cursor-pointer font-semibold text-slate-900">{index+1}. Find or correct the error: {item.prompt}</summary><p className="mt-2 font-bold text-emerald-700">Explanation: {item.answer}</p></details>)}</div>}
      </Section>

      <Section id="interview" title={`${topic.shortTitle} interview questions`}><ol className="list-decimal space-y-3 pl-5">{[`Explain ${topic.shortTitle.toLowerCase()} in your own words.`,`What is the most important rule in ${topic.shortTitle.toLowerCase()}?`,`Give a correct workplace example involving ${topic.shortTitle.toLowerCase()}.`,`Which ${topic.shortTitle.toLowerCase()} mistake do candidates make most often?`,`How would you correct an unclear sentence involving this topic?`].map(question => <li key={question}>{question}</li>)}</ol></Section>
      <Section id="pdf" title="PDF notes"><p>This page is formatted for printing. Select the button below and choose <strong>Save as PDF</strong> to keep an offline copy without creating a separate duplicate-content URL.</p><div className="mt-4"><PrintButton/></div></Section>
      <Section id="faq" title="Frequently asked questions"><div className="divide-y divide-slate-200">{faqs.map(item => <details key={item.q} className="py-4"><summary className="cursor-pointer font-extrabold text-slate-900">{item.q}</summary><p className="mt-2">{item.a}</p></details>)}</div></Section>
      <Section id="related" title="Related grammar topics"><div className="grid gap-3 sm:grid-cols-2">{related.map(item => <Link key={item.slug} href={`/grammar/${item.slug}`} className="border border-slate-200 p-4 hover:border-orange-300"><span className="font-extrabold text-[#071d49]">{item.shortTitle}</span><span className="mt-1 block text-xs leading-5 text-slate-600">{item.description}</span></Link>)}</div></Section>
    </article>
  </Layout>;
}

export function getStaticPaths() { return { paths:grammarTopics.map(topic => ({params:{slug:topic.slug}})), fallback:false }; }
export function getStaticProps({ params }) { const topic=grammarTopicMap[params.slug]; return topic ? { props:{topic} } : { notFound:true }; }
