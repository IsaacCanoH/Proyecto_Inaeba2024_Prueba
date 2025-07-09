import { db } from "../../db/indexedDB";
import { encryptData, decryptData } from "../../utils/cryptoUtils";

const API_URL = "https://backend-node-mjpn.onrender.com/api/auth";

export const login = async (usuario, password) => {
  try {
    const usuarioInfo = await loginOnline(usuario, password);

    localStorage.setItem("usuario", JSON.stringify(usuarioInfo));
    const encrypted = encryptData({ usuario, password });

    await db.usuarios.put({
      usuario,
      credentials: encrypted,
      data: usuarioInfo,
    });

    return { success: true, usuario: usuarioInfo };
  } catch {
    console.warn("Conexión fallida, intentando login offline");
    return await loginOffline(usuario, password);
  }
};

const loginOnline = async (usuario, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario,
      clave_acceso: password,
    }),
  });

  const json = await response.json();

  if (response.ok && json.status === "success" && json.data?.user) {
    return json.data.user;
  } else {
    throw new Error(json.message || "Credenciales inválidas");
  }
};

const loginOffline = async (usuario, password) => {
  try {
    const stored = await db.usuarios.get(usuario);

    if (!stored) {
      return { success: false, error: "No hay datos locales para este usuario" };
    }

    const decrypted = decryptData(stored.credentials);

    const esValido = decrypted.usuario === usuario && decrypted.password === password;

    if (esValido) {
      const localUser = { ...stored.data, offline: true };
      localStorage.setItem("usuario", JSON.stringify(localUser));
      return { success: true, usuario: localUser };
    }

    return { success: false, error: "Credenciales incorrectas (modo offline)" };
  } catch {
    return { success: false, error: "Fallo al intentar login offline" };
  }
};
