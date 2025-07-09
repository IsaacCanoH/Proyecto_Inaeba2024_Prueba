import { FileText, Upload, CheckCircle } from "lucide-react"

const IncidenciaModal = ({
  incidenciaForm,
  handleIncidenciaChange,
  handleFileUpload,
  handleSubmitIncidencia,
  setShowIncidenciaModal,
  styles,
}) => {
  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 bg-primary text-white">
            <h5 className="modal-title fw-semibold d-flex align-items-center">
              <FileText size={20} className="me-2" />
              Registrar Nueva Incidencia
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowIncidenciaModal(false)}
            ></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmitIncidencia}>
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-dark">Tipo de Incidencia</label>
                  <select
                    className="form-select"
                    name="tipo"
                    value={incidenciaForm.tipo}
                    onChange={handleIncidenciaChange}
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="retardo">Retardo</option>
                    <option value="falta">Falta Justificada</option>
                    <option value="inasistencia">Inasistencia</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold text-dark">Fecha de Incidencia</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fecha_incidencia"
                    value={incidenciaForm.fecha_incidencia}
                    onChange={handleIncidenciaChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold text-dark">Descripción Detallada</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="descripcion"
                    placeholder="Proporciona una explicación detallada de la situación..."
                    value={incidenciaForm.descripcion}
                    onChange={handleIncidenciaChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold text-dark">Documentos de Respaldo</label>
                  <div className={`border border-2 border-dashed rounded-3 p-4 text-center ${styles.uploadZone || ""}`}>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <Upload size={32} className="text-muted" />
                    </div>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                    <small className="text-muted d-block mt-2">
                      Arrastra archivos aquí o haz clic para seleccionar<br />
                      Formatos: JPG, PNG, PDF, DOC, DOCX
                    </small>
                  </div>

                  {incidenciaForm.evidencias.length > 0 && (
                    <div className="mt-3 p-3 bg-success bg-opacity-10 rounded-3">
                      <small className="text-success fw-medium d-flex align-items-center">
                        <CheckCircle size={16} className="me-2" />
                        {incidenciaForm.evidencias.length} archivo(s) seleccionado(s)
                      </small>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex gap-3 mt-4 flex-column flex-sm-row">
                <button
                  type="submit"
                  className="btn btn-primary flex-fill py-2 d-flex align-items-center justify-content-center"
                >
                  <FileText size={16} className="me-2" />
                  Enviar Incidencia
                </button>
                <button
                  type="button"
                  className="btn btn-light flex-fill py-2"
                  onClick={() => setShowIncidenciaModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncidenciaModal
