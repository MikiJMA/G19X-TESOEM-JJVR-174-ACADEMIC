import { useState, useEffect } from 'react'
import { MARCA } from './marca.mjs'
import IconoMarca from './IconoMarca'
import { SECCIONES } from './secciones.mjs'

const titulos = {
  seguimiento: 'Resumen de evaluaciones',
  evaluacion: 'Evaluación de riesgo crediticio',
  historial: 'Historial y revisión manual',
  creditos: 'Créditos, pagos y alertas · DEMO',
  laboratorio: 'Laboratorio académico · IA predictiva',
  indicadores: 'Indicadores financieros',
  documentos: 'Documentos de demostración',
}

export default function MarcoAplicacion({ user, seccion, onSeccionChange, children }) {
  const [tema, setTema] = useState(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const guardado = localStorage.getItem('nexocredit-tema')
      if (guardado === 'oscuro' || guardado === 'claro') return guardado
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'oscuro'
      }
    }
    return 'claro'
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', tema)
      if (document.body) {
        document.body.setAttribute('data-theme', tema)
      }
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('nexocredit-tema', tema)
    }
  }, [tema])

  const alternarTema = () => {
    setTema(prev => (prev === 'oscuro' ? 'claro' : 'oscuro'))
  }

  const nombre = user?.nombre || 'Cuenta autorizada'
  const iniciales = nombre.trim().split(/\s+/).slice(0, 2).map(parte => parte[0]).join('').toUpperCase()
  const seccionActual = SECCIONES.find(([id]) => id === seccion)?.[1] || 'Evaluaciones'
  const titulo = seccion === 'seguimiento' && user?.nombre?.trim() ? `Hola, ${nombre.trim().split(/\s+/)[0]}` : titulos[seccion] || titulos.evaluacion

  return (
    <main className={`enterprise-app ${tema === 'oscuro' ? 'dark-theme' : ''}`} data-theme={tema}>
      <a className="enterprise-skip" href="#contenido-principal">Ir al contenido</a>
      <aside className="enterprise-sidebar" aria-label="Navegación principal">
        <div>
          <a className="enterprise-brand" href="/" onClick={event => onSeccionChange('seguimiento', event)}>
            <span className="enterprise-brand-icon" aria-hidden="true">
              <IconoMarca size={24} />
            </span>
            <span>{MARCA}<small>ANÁLISIS CREDITICIO</small></span>
          </a>
          <nav className="enterprise-navigation" aria-label="Secciones">
            {SECCIONES.map(([id, label, path, ruta]) => (
              <a
                key={id}
                href={ruta}
                className={seccion === id ? 'active' : ''}
                aria-current={seccion === id ? 'location' : undefined}
                onClick={event => onSeccionChange(id, event)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {label}
              </a>
            ))}
          </nav>
          <div className="enterprise-sidebar-note">
            <span className="enterprise-dot" /> Entorno de demostración
            <p>Escenarios ficticios.<br />Revisión humana requerida.</p>
          </div>
        </div>
        <div>
          <div className="enterprise-theme-sidebar">
            <button
              type="button"
              className="enterprise-theme-toggle-sidebar"
              onClick={alternarTema}
              aria-label={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {tema === 'oscuro' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <span>Modo claro</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>Modo oscuro</span>
                </>
              )}
            </button>
          </div>
          <div className="enterprise-profile">
            <span className="enterprise-avatar" aria-hidden="true">{iniciales}</span>
            <div>
              <strong>{nombre}</strong>
              <small>{user?.roles?.join(' · ') || 'Acceso autenticado'}</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="enterprise-main">
        <header className="enterprise-topbar">
          <div><p>{MARCA} / {seccionActual}</p><h1>{titulo}</h1></div>
          <div className="enterprise-topbar-actions">
            <button
              type="button"
              className="enterprise-theme-toggle"
              onClick={alternarTema}
              aria-label={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {tema === 'oscuro' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <span>Modo claro</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>Modo oscuro</span>
                </>
              )}
            </button>
          </div>
        </header>
        <div className="enterprise-content" id="contenido-principal">
          {children}
          <footer>
            <span>{MARCA} · Prototipo académico</span>
            <span>{user?.proveedor === 'local' ? 'Acceso con cuenta local' : user?.proveedor === 'microsoft' ? 'Acceso con Microsoft Entra ID' : 'Acceso autenticado'} · No autoriza créditos</span>
          </footer>
        </div>
      </div>
    </main>
  )
}
