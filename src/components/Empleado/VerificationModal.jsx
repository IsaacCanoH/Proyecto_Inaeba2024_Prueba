import { Camera, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { useState, useRef } from "react"

const VerificationModal = ({ onVerificationComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1) // 1: facial, 2: password
  const [faceVerified, setFaceVerified] = useState(false)
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [password, setPassword] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const videoRef = useRef(null)
  const [cameraActive, setCameraActive] = useState(false)

  const progress = currentStep === 1 ? 50 : 100

  // Simular verificación facial
  const handleFaceVerification = async () => {
    setIsVerifying(true)
    setError("")

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCameraActive(true)

      setTimeout(() => {
        setFaceVerified(true)
        setIsVerifying(false)

        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks()
          tracks.forEach((track) => track.stop())
        }
        setCameraActive(false)

        setTimeout(() => {
          setCurrentStep(2)
        }, 1000)
      }, 3000)
    } catch (error) {
      setError("No se pudo acceder a la cámara")
      console.error(error);
      setIsVerifying(false)
    }
  }

  const handlePasswordVerification = () => {
    setIsVerifying(true)
    setError("")

    // Simular verificación de contraseña
    setTimeout(() => {
      if (password.length >= 4) {
        // Validación simple
        setPasswordVerified(true)
        setIsVerifying(false)

        setTimeout(() => {
          onVerificationComplete()
        }, 1000)
      } else {
        setError("Contraseña incorrecta")
        setIsVerifying(false)
      }
    }, 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep === 1 && !faceVerified) {
      handleFaceVerification()
    } else if (currentStep === 2 && !passwordVerified) {
      handlePasswordVerification()
    }
  }

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 bg-primary text-white">
            <h5 className="modal-title fw-semibold d-flex align-items-center">
              <Lock size={20} className="me-2" />
              Verificación de Identidad
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            {/* Barra de progreso */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted fw-medium">Progreso de verificación</small>
                <small className="text-muted fw-medium">{progress}%</small>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-primary transition-all"
                  style={{ width: `${progress}%`, transition: "width 0.5s ease" }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Paso 1: Verificación Facial */}
              {currentStep === 1 && (
                <div className="text-center">
                  <div className="mb-4">
                    <div
                      className={`bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-3 align-items-center justify-content-center ${faceVerified ? "bg-success bg-opacity-10" : ""}`}
                    >
                      {faceVerified ? (
                        <CheckCircle size={48} className="text-success" />
                      ) : (
                        <Camera size={48} className="text-primary" />
                      )}
                    </div>
                    <h6 className="fw-semibold mb-2">{faceVerified ? "Rostro Verificado" : "Verificación Facial"}</h6>
                    <p className="text-muted mb-4">
                      {faceVerified
                        ? "Tu identidad ha sido confirmada correctamente"
                        : "Posiciona tu rostro frente a la cámara para verificar tu identidad"}
                    </p>
                  </div>

                  {!faceVerified && !cameraActive && (
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2 d-flex align-items-center mx-auto"
                      disabled={isVerifying}
                    >
                      <Camera size={16} className="me-2" />
                      {isVerifying ? "Iniciando..." : "Iniciar Verificación"}
                    </button>
                  )}

                  {cameraActive && (
                    <div>
                      <video ref={videoRef} autoPlay className="w-100 rounded-3 mb-3" style={{ maxHeight: "300px" }} />
                      <div className="bg-light rounded-3 p-3">
                        <p className="text-muted mb-0 small d-flex align-items-center justify-content-center">
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Verificando rostro...
                        </p>
                      </div>
                    </div>
                  )}

                  {faceVerified && (
                    <div className="bg-success bg-opacity-10 rounded-3 p-3 mt-3">
                      <p className="text-success mb-0 small d-flex align-items-center justify-content-center">
                        <CheckCircle size={16} className="me-2" />
                        Verificación facial completada
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Paso 2: Verificación de Contraseña */}
              {currentStep === 2 && (
                <div className="text-center">
                  <div className="mb-4">
                    <div
                      className={`bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-3 align-items-center justify-content-center ${passwordVerified ? "bg-success bg-opacity-10" : ""}`}
                    >
                      {passwordVerified ? (
                        <CheckCircle size={48} className="text-success" />
                      ) : (
                        <Lock size={48} className="text-primary" />
                      )}
                    </div>
                    <h6 className="fw-semibold mb-2">
                      {passwordVerified ? "Contraseña Verificada" : "Verificación de Contraseña"}
                    </h6>
                    <p className="text-muted mb-4">
                      {passwordVerified
                        ? "Verificación completada exitosamente"
                        : "Ingresa tu contraseña para completar la verificación"}
                    </p>
                  </div>

                  {!passwordVerified && (
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-8">
                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control form-control-lg text-center"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isVerifying}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary px-4 py-2 d-flex align-items-center mx-auto"
                          disabled={isVerifying || !password}
                        >
                          {isVerifying ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Verificando...
                            </>
                          ) : (
                            <>
                              <Lock size={16} className="me-2" />
                              Verificar Contraseña
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {passwordVerified && (
                    <div className="bg-success bg-opacity-10 rounded-3 p-3 mt-3">
                      <p className="text-success mb-0 small d-flex align-items-center justify-content-center">
                        <CheckCircle size={16} className="me-2" />
                        Verificación completada. Abriendo escáner QR...
                      </p>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-3 d-flex align-items-center">
                  <AlertCircle size={16} className="me-2" />
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationModal
