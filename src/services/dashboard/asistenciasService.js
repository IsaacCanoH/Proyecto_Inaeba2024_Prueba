import { db } from "../../db/indexedDB";

const API_URL = 'https://backend-node-mjpn.onrender.com/api/registrarasistencia';

export const obtenerAsistenciasPorUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`${API_URL}/${usuarioId}`)

    if (!response.ok) {
      console.error("Error HTTP:", response.status)
      return []
    }

    const result = await response.json()

    if (result.status === "success") {
      return result.data
    } else {
      console.error("Respuesta no exitosa:", result)
      return []
    }
  } catch (error) {
    console.error("Error de red o parsing:", error)
    return []
  }
}

export const guardarAsistenciasOffline = async (asistencias) => {
  try {
    await db.asistencias.clear()
    await db.asistencias.bulkAdd(asistencias)
  } catch (error) {
    console.error("Error al guardar asistencias offline:", error)
  }
}

export const obtenerAsistenciasOffline = async (usuarioId) => {
  try {
    const data = await db.asistencias.where("usuario_id").equals(usuarioId).toArray()
    return data
  } catch (error) {
    console.error("Error al obtener asistencias offline:", error)
    return []
  }
}

