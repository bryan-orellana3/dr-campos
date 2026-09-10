// Dr. David Campos — website UI kit: screens + app shell
const DS2 = window.DrDavidCamposDesignSystem_2a5067;
const { Button: BBtn, Card: CCard, Badge: BBadge, Input: FInput, Select: FSelect, Checkbox: FCheck, Radio: FRadio, Tabs: NTabs, Dialog: ODialog, Toast: OToast, SectionHeading: SHead, PulseDivider: PDiv, StatCard: SStat } = DS2;
const wrap2 = window.wrapStyle;

function InicioScreen({ go }) {
  return (
    <main>
      <window.Hero go={go} />
      <window.Stats />
      <window.Pilares />
      <window.Mentor />
      <CtaBand go={go} />
    </main>
  );
}

function CtaBand({ go }) {
  return (
    <section style={{ background: 'var(--gradient-hero-dark)' }}>
      <div style={{ ...wrap2, padding: '72px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
        <SHead onDark align="center" eyebrow="Cupos limitados" title="Tu presencia digital puede ser un sistema" lede="Aplica al programa y recibe una evaluación honesta de tu punto de partida. Respuesta en 48 horas." />
        <BBtn variant="onDark" size="lg" onClick={() => go('aplicar')}>Aplicar al programa</BBtn>
        <PDiv onDark width={320} />
      </div>
    </section>
  );
}

function MetodoScreen({ go }) {
  const [tab, setTab] = React.useState('c1');
  const detail = {
    c1: { t: 'Constancia', d: 'El pilar que sostiene a los demás: un calendario realista de publicación que sobrevive a semanas de guardias. Incluye la plantilla de rutina semanal del Dr. Campos y los indicadores para ajustarla sin abandonarla.', m: ['Plantilla de rutina semanal', 'Calendario de 90 días', 'Indicadores de sostenibilidad'] },
    c2: { t: 'Cercanía', d: 'Cómo hablar a cámara "como en una cena familiar" sin perder autoridad científica: guiones de tono, estructura de apertura y errores que rompen la confianza del paciente.', m: ['Guía de tono conversacional', 'Estructuras de apertura', 'Checklist de autoridad'] },
    c3: { t: 'Contenido', d: 'Los formatos que un médico solo puede producir entre consultas, con evidencia como materia prima. Sin tendencias de baile, sin clickbait.', m: ['Biblioteca de formatos probados', 'Banco de ideas clínicas', 'Flujo de grabación en 30 min'] },
    c4: { t: 'Conversión', d: 'Convertir audiencia en consulta de forma previsible y ética: llamados a la acción medidos, agenda y seguimiento — sin marketing agresivo.', m: ['Embudo consulta-primero', 'Guiones de CTA ético', 'Métricas de conversión'] },
  }[tab];
  return (
    <main>
      <section style={{ ...wrap2, padding: '72px 32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <SHead eyebrow="El método" level={1} title="Método 4C, pilar por pilar" lede="Cada pilar se entrega con plantillas, métricas y la rutina real del Dr. Campos como evidencia." />
        <NTabs items={[{ id: 'c1', label: 'Constancia' }, { id: 'c2', label: 'Cercanía' }, { id: 'c3', label: 'Contenido' }, { id: 'c4', label: 'Conversión' }]} activeId={tab} onChange={setTab} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
          <CCard padding={28}>
            <div style={{ font: 'var(--type-h3)', color: 'var(--text-display)', marginBottom: 10 }}>{detail.t}</div>
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>{detail.d}</p>
            <PDiv align="left" width={240} style={{ margin: '18px 0 0' }} />
          </CCard>
          <CCard variant="wash" padding={28}>
            <div style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--dc-royal-600)', marginBottom: 14 }}>Incluye</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {detail.m.map((x) => (
                <li key={x} style={{ font: 'var(--type-body-sm)', color: 'var(--text-body)', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--dc-blue-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, flex: 'none' }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {x}
                </li>
              ))}
            </ul>
          </CCard>
        </div>
      </section>
      <window.Pilares compact />
      <CtaBand go={go} />
    </main>
  );
}

function AplicarScreen() {
  const [form, setForm] = React.useState({ nombre: '', correo: '', esp: '', tiempo: '1-2', acepta: false });
  const [confirm, setConfirm] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target ? e.target.value : e });
  const submit = () => {
    if (!form.nombre || !form.correo) { setErr(true); return; }
    setErr(false); setConfirm(true);
  };
  return (
    <main>
      <section style={{ ...wrap2, padding: '72px 32px 88px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <SHead eyebrow="Aplicación" level={1} title="Aplica al programa" lede="Sin compromiso: evaluamos tu punto de partida y te decimos con honestidad si el método es para ti." />
          <PDiv align="left" width={260} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
            <SStat value="48h" label="Tiempo de respuesta" />
            <SStat value="1:1" label="Evaluación personal" detail="Revisada por el equipo del Dr. Campos" />
          </div>
        </div>
        <CCard padding={32} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <FInput label="Nombre completo" placeholder="Dra. Ana Rivas" value={form.nombre} onChange={set('nombre')} error={err && !form.nombre ? 'Campo obligatorio' : undefined} />
          <FInput label="Correo profesional" placeholder="dr@clinica.com" value={form.correo} onChange={set('correo')} error={err && !form.correo ? 'Campo obligatorio' : undefined} hint={err && form.correo ? undefined : 'Nunca compartimos tu correo.'} />
          <FSelect label="Especialidad" placeholder="Selecciona…" value={form.esp} onChange={set('esp')} options={['Cardiología', 'Dermatología', 'Pediatría', 'Medicina interna', 'Otra']} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ font: '600 13px/1.2 var(--font-body)', color: 'var(--text-display)' }}>Tiempo disponible por semana</span>
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
              <FRadio name="t" label="1–2 horas" checked={form.tiempo === '1-2'} onChange={() => setForm({ ...form, tiempo: '1-2' })} />
              <FRadio name="t" label="3–5 horas" checked={form.tiempo === '3-5'} onChange={() => setForm({ ...form, tiempo: '3-5' })} />
              <FRadio name="t" label="Más de 5" checked={form.tiempo === '5+'} onChange={() => setForm({ ...form, tiempo: '5+' })} />
            </div>
          </div>
          <FCheck label="Acepto recibir la guía semanal del Método 4C" checked={form.acepta} onChange={() => setForm({ ...form, acepta: !form.acepta })} />
          <BBtn size="lg" fullWidth onClick={submit}>Enviar aplicación</BBtn>
        </CCard>
      </section>
      <ODialog open={confirm} onClose={() => setConfirm(false)} title="Confirmar aplicación"
        footer={<React.Fragment><BBtn variant="ghost" onClick={() => setConfirm(false)}>Cancelar</BBtn><BBtn onClick={() => { setConfirm(false); setSent(true); }}>Enviar</BBtn></React.Fragment>}>
        Vamos a enviar tu aplicación como <strong>{form.nombre || '—'}</strong> ({form.correo || '—'}). ¿Confirmas?
      </ODialog>
      {sent && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>
          <OToast tone="success" title="Aplicación enviada" onClose={() => setSent(false)}>Te responderemos en 48 horas.</OToast>
        </div>
      )}
    </main>
  );
}

function App() {
  const [view, setView] = React.useState('inicio');
  const go = (v) => { setView(v); window.scrollTo(0, 0); };
  return (
    <div style={{ background: 'var(--surface-page)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <window.SiteHeader view={view} go={go} />
      {view === 'inicio' && <InicioScreen go={go} />}
      {view === 'metodo' && <MetodoScreen go={go} />}
      {view === 'aplicar' && <AplicarScreen />}
      <window.SiteFooter go={go} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
