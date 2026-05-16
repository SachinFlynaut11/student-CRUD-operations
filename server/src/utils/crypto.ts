import CryptoJS from "crypto-js";

const FRONTEND_SECRET =
  "FRONTEND_SECRET_KEY";

const BACKEND_SECRET =
  "BACKEND_SECRET_KEY";

export const decryptFrontendData =
  (
    encryptedData: string
  ) => {
    const bytes =
      CryptoJS.AES.decrypt(
        encryptedData,
        FRONTEND_SECRET
      );

    const decrypted =
      bytes.toString(
        CryptoJS.enc.Utf8
      );

    return JSON.parse(decrypted);
  };

export const encryptBackendData =
  (data: unknown) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      BACKEND_SECRET
    ).toString();
  };

export const decryptBackendData =
  (
    encryptedData: string
  ) => {
    const bytes =
      CryptoJS.AES.decrypt(
        encryptedData,
        BACKEND_SECRET
      );

    const decrypted =
      bytes.toString(
        CryptoJS.enc.Utf8
      );

    return JSON.parse(decrypted);
  };