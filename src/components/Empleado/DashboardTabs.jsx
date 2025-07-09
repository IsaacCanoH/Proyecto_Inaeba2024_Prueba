import { Clock, BarChart3, Settings, Camera, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const DashboardTabs = ({
  activeTab,
  setActiveTab,
  historialAsistencias,
  estadisticas,
  setShowQRModal,
  setShowIncidenciaModal,
  usuario,
  isOffline,
  styles,
}) => {
  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "puntual": return <CheckCircle size={18} />
      case "retardo": return <Clock size={18} />
      case "falta": return <XCircle size={18} />
      default: return null
    }
  }

  const getEstadoBadge = (estado) => {
    const baseClasses = "badge rounded-pill px-3 py-2 fw-normal d-inline-flex align-items-center"
    switch (estado) {
      case "puntual": return `${baseClasses} bg-success bg-opacity-10 text-success`
      case "retardo": return `${baseClasses} bg-warning bg-opacity-10 text-warning`
      case "falta": return `${baseClasses} bg-danger bg-opacity-10 text-danger`
      default: return `${baseClasses} bg-secondary bg-opacity-10 text-secondary`
    }
  }

  const renderTabContent = () => {
    if (activeTab === "asistencias") {
      return (
        <>
          {/* Estadísticas */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-lg-3">
              <div className="card border-0 bg-success bg-opacity-10 h-100">
                <div className="card-body text-center py-4">
                  <CheckCircle size={32} className="text-success mb-3" />
                  <h4 className="fw-bold text-success mb-1">{estadisticas.asistencias ?? 0}</h4>
                  <small className="text-success opacity-75 fw-medium">Asistencias</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card border-0 bg-warning bg-opacity-10 h-100">
                <div className="card-body text-center py-4">
                  <Clock size={32} className="text-warning mb-3" />
                  <h4 className="fw-bold text-warning mb-1">{estadisticas.retardos ?? 0}</h4>
                  <small className="text-warning opacity-75 fw-medium">Retardos</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card border-0 bg-danger bg-opacity-10 h-100">
                <div className="card-body text-center py-4">
                  <XCircle size={32} className="text-danger mb-3" />
                  <h4 className="fw-bold text-danger mb-1">{estadisticas.faltas ?? 0}</h4>
                  <small className="text-danger opacity-75 fw-medium">Faltas</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card border-0 bg-primary bg-opacity-10 h-100">
                <div className="card-body text-center py-4">
                  <BarChart3 size={32} className="text-primary mb-3" />
                  <h4 className="fw-bold text-primary mb-1">{estadisticas.porcentaje ?? 0}%</h4>
                  <small className="text-primary opacity-75 fw-medium">Efectividad</small>
                </div>
              </div>
            </div>
          </div>

          {/* Historial */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-4 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 text-dark fw-semibold d-flex align-items-center">
                <Clock size={20} className="me-2 text-primary" />
                Registros Recientes
              </h6>
              <span className="badge bg-light text-muted">Últimos 30 días</span>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {historialAsistencias.length === 0 ? (
                  <div className="text-center py-5 text-muted fw-medium">
                    <p className="mb-0">No tienes asistencias registradas aún.</p>
                  </div>
                ) : (
                  historialAsistencias.map((registro, index) => (
                    <div key={index} className="list-group-item border-bottom border-0 py-4 px-4">
                      <div className="d-flex justify-content-between flex-wrap gap-3 align-items-center">
                        <div>
                          <div className="fw-semibold text-dark">{registro.fecha}</div>
                          <small className="text-muted d-md-none">{registro.horas}</small>
                        </div>
                        <div className="d-none d-md-flex gap-4">
                          <div className="text-center">
                            <small className="text-muted fw-medium">Entrada</small>
                            <div className="fw-semibold text-dark">{registro.entrada}</div>
                          </div>
                          <div className="text-center">
                            <small className="text-muted fw-medium">Salida</small>
                            <div className="fw-semibold text-dark">{registro.salida}</div>
                          </div>
                          <div className="text-center">
                            <small className="text-muted fw-medium">Horas</small>
                            <div className="fw-semibold text-dark">{registro.horas}</div>
                          </div>
                        </div>
                        <span className={getEstadoBadge(registro.estado)}>
                          {getEstadoIcon(registro.estado)}
                          <span className="ms-2 text-capitalize fw-medium">{registro.estado}</span>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </>
      )
    }
    return null
  }

  return (
    <>
      <div className="row g-4 mb-4">
        <div className="col-12 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
          <div>
            <h4 className="fw-bold text-dark mb-1">¡Bienvenido, {usuario.nombre}!</h4>
            <p className="text-muted mb-0">Gestiona tu asistencia y mantén tu registro actualizado</p>
            {isOffline && (
              <div className="alert alert-warning mt-3 d-flex flex-wrap align-items-center gap-2 py-2 px-3 small">
                <AlertTriangle size={16} className="text-warning flex-shrink-0" />
                <span className="text-break">
                  Estás usando la aplicación en <strong>modo offline</strong>. Algunas funcionalidades podrían estar limitadas.
                </span>
              </div>
            )}
          </div>

          <div className="d-flex gap-2 flex-column flex-sm-row">
            <button className="btn btn-primary px-4 py-2 d-flex align-items-center justify-content-center" onClick={() => setShowQRModal(true)}>
              <Camera size={18} className="me-2" />
              Registrar Asistencia
            </button>
            <button className="btn btn-outline-primary px-4 py-2 d-flex align-items-center justify-content-center" onClick={() => setShowIncidenciaModal(true)}>
              <FileText size={18} className="me-2" />
              Nueva Incidencia
            </button>
          </div>
        </div>
      </div>

      {/* Tabs navegación */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-0 px-0 pt-0">
          <ul className={`nav nav-tabs border-0 px-4 pt-4 ${styles.tabsContainer}`}>
            {[
              { key: "asistencias", label: "Asistencias", icon: <Clock size={16} className="me-2" /> },
            ].map(({ key, label, icon }) => (
              <li className="nav-item" key={key}>
                <button
                  className={`nav-link border-0 px-3 py-2 fw-medium d-flex align-items-center ${activeTab === key ? "active text-primary bg-primary bg-opacity-10" : "text-muted"
                    }`}
                  onClick={() => setActiveTab(key)}
                >
                  {icon}
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body p-4">{renderTabContent()}</div>
      </div>
    </>
  )
}

export default DashboardTabs
