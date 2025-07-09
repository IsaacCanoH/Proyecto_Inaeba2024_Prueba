import { useEffect, useRef } from "react"
import { Camera } from "lucide-react"
import { Html5Qrcode } from "html5-qrcode"
import './QRModal.css'

const QRModal = ({ handleOpenCamera, handleCloseCamera, cameraActive, onScanSuccess }) => {
  const scannerRef = useRef(null)
  const html5QrCodeRef = useRef(null)

  useEffect(() => {
    if (cameraActive && scannerRef.current && !html5QrCodeRef.current) {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } }

      html5QrCodeRef.current = new Html5Qrcode(scannerRef.current.id)

      html5QrCodeRef.current
        .start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            if (html5QrCodeRef.current) {
              html5QrCodeRef.current
                .stop()
                .then(() => {
                  html5QrCodeRef.current.clear()
                  html5QrCodeRef.current = null
                  onScanSuccess(decodedText)
                  handleCloseCamera()
                })
                .catch((err) => {
                  console.error("Error al detener el escáner después de escanear:", err)
                  handleCloseCamera()
                })
            }
          },
          // (error) => {
          //   console.error(error);

          // }
        )
        .catch((err) => {
          console.error("Error al iniciar el escáner:", err)
        })
    }

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => {
            html5QrCodeRef.current.clear()
            html5QrCodeRef.current = null
          })
          .catch((err) => {
            console.error("Error al detener el escáner:", err)
          })
      }
    }
  }, [cameraActive, handleCloseCamera, onScanSuccess])

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-0 bg-primary text-white">
            <h5 className="modal-title fw-semibold d-flex align-items-center">
              <Camera size={20} className="me-2" />
              Registrar Asistencia
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={handleCloseCamera}></button>
          </div>
          <div className="modal-body p-4 text-center">
            {!cameraActive ? (
              <div className="py-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4 align-items-center justify-content-center">
                  <Camera size={48} className="text-primary" />
                </div>
                <h6 className="fw-semibold mb-3">Escanear Código QR</h6>
                <p className="text-muted mb-4">Activa tu cámara para escanear el código QR de asistencia</p>
                <button
                  className="btn btn-primary px-4 py-2 d-flex align-items-center mx-auto"
                  onClick={handleOpenCamera}
                >
                  <Camera size={16} className="me-2" />
                  Activar Cámara
                </button>
              </div>
            ) : (
              <div>
                <div
                  ref={scannerRef}
                  id="qr-scanner-container"
                  className="qr-scanner-wrapper"
                ></div>
                <div className="bg-light rounded-3 p-3">
                  <p className="text-muted mb-0 small d-flex align-items-center justify-content-center">
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Buscando código QR...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRModal
