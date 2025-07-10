export const capturePhotoFromFrontCamera = () => {
  return new Promise((resolve, reject) => {
    const iniciarCaptura = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })

        const video = document.createElement("video")
        video.srcObject = stream
        video.play()

        video.onloadedmetadata = () => {
          const canvas = document.createElement("canvas")
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight

          const context = canvas.getContext("2d")
          context.drawImage(video, 0, 0, canvas.width, canvas.height)

          const base64Image = canvas.toDataURL("image/jpeg")

          stream.getTracks().forEach((track) => track.stop())
          resolve(base64Image)
        }

        video.onerror = () => {
          reject("Error cargando el video")
        }
      } catch (err) {
        reject(err)
      }
    }

    iniciarCaptura()
  })
}
