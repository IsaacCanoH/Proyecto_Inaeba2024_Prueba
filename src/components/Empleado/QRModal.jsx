import { useEffect, useRef } from "react"
import { Camera } from "lucide-react"
import { Html5Qrcode } from "html5-qrcode"
import './QRModal.css'
import { capturePhotoFromFrontCamera } from "../../utils/capturePhoto"

const QRModal = ({ handleOpenCamera, handleCloseCamera, cameraActive, onScanSuccess }) => {
  const scannerRef = useRef(null)
  const html5QrCodeRef = useRef(null)
  const isRunningRef = useRef(false)

  useEffect(() => {
    const startScanner = async () => {
      if (cameraActive && scannerRef.current && !html5QrCodeRef.current) {
        const config = { fps: 10, qrbox: { width: 230, height: 230 } }
        const qrCode = new Html5Qrcode(scannerRef.current.id)
        html5QrCodeRef.current = qrCode

        try {
          await qrCode.start(
            { facingMode: "environment" },
            config,
            async (decodedText) => {
              if (html5QrCodeRef.current && isRunningRef.current) {
                try {
                  await html5QrCodeRef.current.stop()
                  await html5QrCodeRef.current.clear()
                } catch (stopError) {
                  console.warn("Error al detener después del escaneo:", stopError)
                } finally {
                  html5QrCodeRef.current = null
                  isRunningRef.current = false
                  onScanSuccess(decodedText)

                  try {
                    const fotoBase64 = await capturePhotoFromFrontCamera()
                    console.log("📸 Foto capturada (base64):", fotoBase64)
                    onScanSuccess(decodedText, fotoBase64)
                  } catch (photoError) {
                    console.error("❌ Error al capturar foto frontal:", photoError)
                    onScanSuccess(decodedText, null)
                  }
                  handleCloseCamera()
                }
              }
            }
          )
          isRunningRef.current = true
        } catch (err) {
          console.error("Error al iniciar el escáner:", err)
        }
      }
    }

    startScanner()

    return () => {
      if (html5QrCodeRef.current && isRunningRef.current) {
        html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current.clear())
          .catch((err) => {
            console.warn("Error al detener el escáner al desmontar:", err)
          })
          .finally(() => {
            html5QrCodeRef.current = null
            isRunningRef.current = false
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
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => {
                if (html5QrCodeRef.current && isRunningRef.current) {
                  html5QrCodeRef.current
                    .stop()
                    .then(() => html5QrCodeRef.current.clear())
                    .catch((err) => console.warn("Error al cerrar cámara:", err))
                    .finally(() => {
                      html5QrCodeRef.current = null
                      isRunningRef.current = false
                      handleCloseCamera()
                    })
                } else {
                  handleCloseCamera()
                }
              }}
            ></button>
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
                <div className="qr-scanner-wrapper">
                  <div ref={scannerRef} id="qr-scanner-container" />
                </div>
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
