const API_URL = "https://backend-node-mjpn.onrender.com/api/inicidencia" 

export const crearIncidencia = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/crear-incidencia`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Error al crear la incidencia")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error en crearIncidencia:", error)
    throw error
  }
}
