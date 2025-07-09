import Dexie from "dexie";

export const db = new Dexie('INAEBA');

db.version(2).stores({
    usuarios: "usuario, credentials, data",
    direcciones: "id,nombre", 
    coordinaciones: "id,nombre,direccionId",
    asistencias: "++id,usuario_id,fecha_hora_registro"
})