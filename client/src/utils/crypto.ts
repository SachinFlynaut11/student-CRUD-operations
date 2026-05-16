import CryptoJS from "crypto-js";

const SECRET_KEY =
  "FRONTEND_SECRET_KEY";

export const encryptData = (
  data: unknown
): string => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
};

export const decryptData = (
  encryptedText: string
) => {
  const bytes =
    CryptoJS.AES.decrypt(
      encryptedText,
      SECRET_KEY
    );

  const decrypted =
    bytes.toString(
      CryptoJS.enc.Utf8
    );

  return JSON.parse(decrypted);
};