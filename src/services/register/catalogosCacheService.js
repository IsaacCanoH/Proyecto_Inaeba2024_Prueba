import { db } from "../../db/indexedDB";
import { getDirecciones, getCoordinacionesByDireccion } from "./registerService";

export const precargarCatalogos = async () => {
  try {
    const direcciones = await getDirecciones();
    if (!direcciones.length) return;

    const direccionesDB = direcciones.map(d => ({ id: d.value, nombre: d.label }));
    await db.direcciones.bulkPut(direccionesDB);
    for (const direccion of direcciones) {
      const coordinaciones = await getCoordinacionesByDireccion(direccion.value);

      if (coordinaciones.length) {
        const coordinacionesDB = coordinaciones.map(c => ({
          id: c.value,
          nombre: c.label,
          direccionId: direccion.value
        }));

        await db.coordinaciones.bulkPut(coordinacionesDB);
      }
    }

    console.log("Catálogos precargados exitosamente en IndexedDB");
  } catch (error) {
    console.error("Error al precargar catálogos:", error);
  }
};
