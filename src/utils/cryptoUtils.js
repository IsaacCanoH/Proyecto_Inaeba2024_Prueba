import CryptoJS from "crypto-js";

const SECRET_KEY = "52653b78e2d6eb7e199a3b0b0b09807862b6b6fce485ba848a2855f6fcbf9d40";

export const encryptData = (data) => {
    const strData = JSON.stringify(data);
    return CryptoJS.AES.encrypt(strData, SECRET_KEY).toString();
};

export const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8); 
    return JSON.parse(decrypted);
};

