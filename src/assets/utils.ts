import QRCode from "qrcode";

export const GenerateQRCode = async ({ url, size }: any) => {
  try {
    const data = await QRCode.toDataURL(url, {
      width: size,
      margin: 2,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
