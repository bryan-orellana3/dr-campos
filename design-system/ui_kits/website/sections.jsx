// Dr. David Campos — website UI kit: shared sections
// Composes design-system primitives from the compiled bundle.
const DS = window.DrDavidCamposDesignSystem_2a5067;
const { Button, Badge, Card, StatCard, SectionHeading, PulseDivider, Tag } = DS;

const wrap = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 32px' };

function SiteHeader({ view, go }) {
  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'metodo', label: 'El método' },
    { id: 'aplicar', label: 'Aplicar' },
  ];
  return (
    <header style={{ background: 'rgba(246,248,251,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <img src="../../assets/logo.png" alt="Dr. David Campos" style={{ height: 46, cursor: 'pointer' }} onClick={() => go('inicio')} />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {links.map((l) => (
            <a key={l.id} onClick={() => go(l.id)} style={{
              font: `${view === l.id ? 700 : 500} 15px/1 var(--font-body)`,
              color: view === l.id ? 'var(--dc-royal-600)' : 'var(--text-body)',
              padding: '10px 14px', cursor: 'pointer', borderRadius: 'var(--radius-pill)',
              whiteSpace: 'nowrap', flex: 'none',
            }}>{l.label}</a>
          ))}
          <Button size="sm" onClick={() => go('aplicar')}>Aplicar al programa</Button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ go }) {
  return (
    <section style={{ background: 'var(--gradient-hero-dark)', color: 'var(--text-on-dark)', position: 'relative', overflow: 'hidden' }}>
      <img src="../../assets/bg-studio-mic.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(2,39,70,0.92) 0%, rgba(2,39,70,0.55) 65%, rgba(2,39,70,0.35) 100%)' }}></div>
      <div style={{ ...wrap, position: 'relative', padding: '96px 32px 88px', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        <Badge tone="pulse" style={{ background: 'rgba(62,205,232,0.16)', color: 'var(--dc-pulse-400)' }}>Método 4C · para médicos</Badge>
        <h1 style={{ font: 'var(--type-hero)', letterSpacing: 'var(--tracking-display)', margin: 0, maxWidth: '15ch', color: '#fff' }}>
          Presencia digital previsible. Sin burnout.
        </h1>
        <p style={{ font: 'var(--type-body-lg)', color: 'var(--text-muted-on-dark)', margin: 0, maxWidth: '52ch' }}>
          El sistema que llevó al Dr. David Campos a 3.9M de seguidores sin agencias, sin equipo de producción y sin abandonar la consulta — documentado paso a paso para que otros médicos lo repitan.
        </p>
        <div style={{ display: 'flex', gap: 14 }}>
          <Button variant="onDark" size="lg" onClick={() => go('aplicar')}>Aplicar al programa</Button>
          <Button variant="ghost" size="lg" style={{ color: 'var(--dc-sky-300)' }} onClick={() => go('metodo')}>Ver el método</Button>
        </div>
        <PulseDivider onDark align="left" width={360} style={{ marginTop: 8 }} />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section style={{ ...wrap, padding: '64px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      <StatCard value="3.9M" label="Seguidores combinados" detail="Sin agencias ni pauta" />
      <StatCard value="4" label="Años documentados" detail="Rutina real, verificable" />
      <StatCard value="4C" label="Pilares del método" detail="Constancia · Cercanía · Contenido · Conversión" />
      <StatCard value="0" label="Horas de consulta sacrificadas" detail="El sistema cabe en la agenda clínica" />
    </section>
  );
}

const PILARES = [
  { n: '1', t: 'Constancia', d: 'Una rutina de publicación sostenible, diseñada para caber dentro de la agenda clínica. La estrategia es no parar.' },
  { n: '2', t: 'Cercanía', d: 'Hablar como en una cena familiar sin perder autoridad científica. La confianza se construye en el tono.' },
  { n: '3', t: 'Contenido', d: 'Educación médica con evidencia, no tendencias. Formatos probados que un solo médico puede producir.' },
  { n: '4', t: 'Conversión', d: 'De la audiencia a la consulta: pacientes y oportunidades de forma previsible, sin marketing agresivo.' },
];

function Pilares({ compact = false }) {
  return (
    <section style={{ background: 'var(--dc-white)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ ...wrap, padding: '80px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <SectionHeading eyebrow="Método 4C" title="Cuatro pilares, cero improvisación"
          lede={compact ? undefined : 'No es un hack. Es una rutina — la misma que el Dr. Campos ejecuta cada semana, transferida con métricas y plantillas.'} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {PILARES.map((p) => (
            <Card key={p.n} interactive variant={compact ? 'wash' : 'default'}>
              <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'var(--surface-wash)', color: 'var(--dc-royal-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '800 22px/1 var(--font-display)', marginBottom: 14 }}>{p.n}</div>
              <div style={{ font: 'var(--type-h4)', color: 'var(--text-display)', marginBottom: 6 }}>{p.t}</div>
              <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}>{p.d}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mentor() {
  return (
    <section style={{ ...wrap, padding: '80px 32px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <SectionHeading eyebrow="El mentor" title="Médico primero. Creador después." level={2} />
        <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0, maxWidth: '58ch' }}>
          El Dr. David Campos es médico boliviano radicado en São Paulo. Construyó su audiencia publicando entre consultas — sin equipo, sin guiones ajenos. Lo que enseña es lo que hace: cada afirmación del programa está respaldada por su propia rutina documentada.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag>Práctica clínica activa</Tag><Tag>Evidencia verificable</Tag><Tag>Sin agencias</Tag>
        </div>
        <PulseDivider align="left" width={280} />
        <blockquote style={{ margin: 0, font: '600 19px/1.5 var(--font-body)', fontStyle: 'italic', color: 'var(--text-display)', maxWidth: '48ch' }}>
          "La viralidad no es una estrategia. La constancia sí."
        </blockquote>
      </div>
      <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <img src="../../assets/bg-studio-shelf.png" alt="Estudio del Dr. Campos" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  );
}

function SiteFooter({ go }) {
  return (
    <footer style={{ background: 'var(--dc-navy-950)', color: 'var(--text-muted-on-dark)' }}>
      <div style={{ ...wrap, padding: '48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ font: '800 17px/1 var(--font-display)', letterSpacing: 'var(--tracking-caps)', color: '#fff', textTransform: 'uppercase' }}>
          David <span style={{ color: 'var(--dc-sky-300)' }}>Campos</span>
        </div>
        <nav style={{ display: 'flex', gap: 24, font: 'var(--type-body-sm)' }}>
          <a style={{ cursor: 'pointer', color: 'inherit' }} onClick={() => go('inicio')}>Inicio</a>
          <a style={{ cursor: 'pointer', color: 'inherit' }} onClick={() => go('metodo')}>El método</a>
          <a style={{ cursor: 'pointer', color: 'inherit' }} onClick={() => go('aplicar')}>Aplicar</a>
        </nav>
        <div style={{ font: 'var(--type-caption)' }}>© 2026 Dr. David Campos</div>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteHeader, Hero, Stats, Pilares, Mentor, SiteFooter, PILARES, wrapStyle: wrap });
