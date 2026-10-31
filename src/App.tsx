import { useState } from 'react'

type Language = 'en' | 'es'
type AgendaItem = { time: string; title: string; description: string; outcome: string; icon: string }

const copy = {
  en: {
    eyebrow: 'A LITTLE PLANNING. A LOT OF MAKING.', title: 'Bring your community\ntogether to build.', intro: 'Plan a welcoming, hands-on AI session where everyone leaves with something real.', language: 'Language', eventName: 'What are we calling this gathering?', eventPlaceholder: 'e.g. Make AI useful for our neighborhood', duration: 'How much time do you have?', hours: 'hours', people: 'How many people are joining?', experience: 'What feels right for your group?', beginner: 'First-timers', mixed: 'A little of everything', curious: 'Curious tinkerers', challenge: 'What should people make?', challengePlaceholder: 'e.g. A tool that helps neighbors find free meals', generate: 'Make our game plan', setup: 'YOUR STARTING POINT', plan: 'THE MAKING PLAN', minutes: 'MIN', peopleLabel: 'MAKERS', materials: 'Bring along', reset: 'Edit the setup', print: 'Print this plan', nameDefault: 'Community AI Build Session', materialsList: 'A laptop or phone per pair, sticky notes, and plenty of curiosity', footer: 'Made for people who make things happen.', step: 'YOUR AFTERNOON, MADE', edit: 'A good plan leaves room for surprises.', output: 'Everyone leaves with a tiny, working prototype they can share.', agenda: [
      ['01', 'Find a real-life friction', 'In pairs, map a small everyday problem someone in your community actually has. Pick one you can improve in an afternoon.', 'A clear problem statement and one person it helps.', '◎'],
      ['02', 'Sketch before you prompt', 'Draw the simplest useful version. Decide what goes in, what AI should do, and what comes out. No code, just paper.', 'A three-step blueprint for your tool.', '↗'],
      ['03', 'Build a tiny AI helper', 'Use a beginner-friendly AI builder to turn your blueprint into a working helper. Test it with a real example, then tweak one thing.', 'A working first version of your community tool.', '✳'],
      ['04', 'Show, tell, and pass it on', 'Give a two-minute demo. Share what surprised you, what needs work, and one way someone else could use your idea.', 'A demo and a next step to keep building.', '↗'],
    ] as string[][],
  },
  es: {
    eyebrow: 'UN POCO DE PLANIFICACIÓN. MUCHO POR CREAR.', title: 'Reúne a tu comunidad\npara crear.', intro: 'Planea una sesión práctica y acogedora de IA donde cada persona termine con algo tangible.', language: 'Idioma', eventName: '¿Cómo se llamará el encuentro?', eventPlaceholder: 'p. ej. IA útil para nuestro vecindario', duration: '¿Cuánto tiempo tienen?', hours: 'horas', people: '¿Cuántas personas participarán?', experience: '¿Qué describe mejor al grupo?', beginner: 'Principiantes', mixed: 'Experiencia variada', curious: 'Con curiosidad por experimentar', challenge: '¿Qué quieren crear?', challengePlaceholder: 'p. ej. Una herramienta para encontrar comida gratis', generate: 'Crear el plan de trabajo', setup: 'PUNTO DE PARTIDA', plan: 'PLAN PARA CREAR', minutes: 'MIN', peopleLabel: 'PERSONAS', materials: 'Qué traer', reset: 'Editar detalles', print: 'Imprimir el plan', nameDefault: 'Sesión comunitaria para crear con IA', materialsList: 'Una computadora o teléfono por pareja, notas adhesivas y mucha curiosidad', footer: 'Hecho para quienes hacen que las cosas sucedan.', step: 'TU SESIÓN, PASO A PASO', edit: 'Un buen plan deja espacio para las sorpresas.', output: 'Cada persona se irá con un prototipo sencillo y funcional para compartir.', agenda: [
      ['01', 'Encuentren un problema cotidiano', 'En parejas, identifiquen un pequeño problema real de su comunidad. Elijan uno que puedan mejorar en una tarde.', 'Una definición clara del problema y a quién ayuda.', '◎'],
      ['02', 'Boceten antes de pedirle a la IA', 'Dibujen la versión útil más sencilla. Decidan qué información entra, qué hará la IA y qué resultado dará. Solo papel.', 'Un esquema de tres pasos para su herramienta.', '↗'],
      ['03', 'Creen un pequeño asistente de IA', 'Usen una herramienta sencilla para convertir el boceto en un asistente funcional. Pruébenlo y ajusten una cosa.', 'Una primera versión funcional de su herramienta comunitaria.', '✳'],
      ['04', 'Compartan, expliquen y continúen', 'Hagan una demostración de dos minutos. Cuenten qué les sorprendió, qué mejorarían y quién podría usar la idea.', 'Una demostración y un siguiente paso para continuar.', '↗'],
    ] as string[][],
  },
}

function makeAgenda(language: Language, hours: number): AgendaItem[] {
  const c = copy[language]
  const total = Math.max(60, hours * 60)
  const shares = [0.15, 0.2, 0.45, 0.2]
  let cursor = 0
  return c.agenda.map((row, index) => {
    const length = index === 3 ? total - cursor : Math.round(total * shares[index] / 5) * 5
    const start = cursor
    cursor += length
    return { time: `${String(Math.floor(start / 60)).padStart(2, '0')}:${String(start % 60).padStart(2, '0')} — ${length} ${c.minutes}`, title: row[1], description: row[2], outcome: row[3], icon: row[4] }
  })
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [hours, setHours] = useState(3)
  const [people, setPeople] = useState(12)
  const [name, setName] = useState('')
  const [challenge, setChallenge] = useState('')
  const [experience, setExperience] = useState('beginner')
  const [agenda, setAgenda] = useState<AgendaItem[] | null>(null)
  const c = copy[language]

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAgenda(makeAgenda(language, hours))
    window.setTimeout(() => document.getElementById('agenda')?.focus(), 0)
  }

  return <main className="page-shell">
    <header className="topbar"><a className="brand" href="#top" aria-label="BuildTogether home"><span className="brand-mark" aria-hidden="true">b<span>+</span></span><span>build<span className="brand-light">together</span></span></a><label className="language">{c.language}<select value={language} onChange={e => setLanguage(e.target.value as Language)} aria-label={c.language}><option value="en">English</option><option value="es">Español</option></select></label></header>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span className="sparkle">✳</span> {c.eyebrow}</p><h1>{c.title}</h1><p className="intro">{c.intro}</p></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-center">AI<span>→</span></div><span className="art-note note-one">ideas</span><span className="art-note note-two">people</span><span className="art-note note-three">making</span></div></section>
    <div className="content-grid"><section className="form-panel" aria-labelledby="form-heading"><div className="section-label"><span>01</span> {c.setup}</div><h2 id="form-heading">Start with your people.</h2><form onSubmit={submit}>
      <label className="field-label" htmlFor="event-name">{c.eventName}</label><input id="event-name" value={name} onChange={e => setName(e.target.value)} placeholder={c.eventPlaceholder} />
      <div className="range-row"><label className="field-label" htmlFor="duration">{c.duration}<output htmlFor="duration">{hours} {c.hours}</output></label><input id="duration" type="range" min="1" max="6" value={hours} onChange={e => setHours(Number(e.target.value))} /></div>
      <div className="range-row"><label className="field-label" htmlFor="people">{c.people}<output htmlFor="people">{people}</output></label><input id="people" type="range" min="4" max="40" step="2" value={people} onChange={e => setPeople(Number(e.target.value))} /></div>
      <label className="field-label" htmlFor="experience">{c.experience}</label><select id="experience" value={experience} onChange={e => setExperience(e.target.value)}><option value="beginner">{c.beginner}</option><option value="mixed">{c.mixed}</option><option value="curious">{c.curious}</option></select>
      <label className="field-label" htmlFor="challenge">{c.challenge}</label><textarea id="challenge" rows={2} value={challenge} onChange={e => setChallenge(e.target.value)} placeholder={c.challengePlaceholder} />
      <button className="primary-button" type="submit">{c.generate}<span aria-hidden="true">↗</span></button>
    </form></section>
    <section className="agenda-panel" id="agenda" tabIndex={-1} aria-labelledby="agenda-heading" aria-live="polite"><div className="section-label"><span>02</span> {c.plan}</div>{agenda ? <><div className="agenda-heading-row"><div><p className="eyebrow">{c.step}</p><h2 id="agenda-heading">{name || c.nameDefault}</h2></div><button className="text-button" onClick={() => setAgenda(null)}>{c.reset}</button></div><p className="agenda-summary">{people} {c.peopleLabel.toLowerCase()} · {hours} {c.hours}</p><p className="tangible">{c.output}</p><ol className="agenda-list">{agenda.map(item => <li className="agenda-item" key={item.title}><span className="item-icon" aria-hidden="true">{item.icon}</span><div className="item-content"><p className="item-time">{item.time}</p><h3>{item.title}</h3><p>{item.description}</p><p className="outcome"><span aria-hidden="true">↳</span> {item.outcome}</p></div></li>)}</ol><div className="materials"><span aria-hidden="true">＋</span><div><strong>{c.materials}</strong><p>{c.materialsList}</p></div></div><button className="print-button" onClick={() => window.print()}>{c.print} <span aria-hidden="true">↗</span></button></> : <div className="empty-state"><div className="empty-doodle" aria-hidden="true"><span>✳</span><span>↗</span><span>◡</span></div><p>{c.edit}</p><div className="empty-line"/><div className="empty-line short"/></div>}</section></div>
    <footer><span className="footer-mark" aria-hidden="true">✳</span>{c.footer}</footer>
  </main>
}
