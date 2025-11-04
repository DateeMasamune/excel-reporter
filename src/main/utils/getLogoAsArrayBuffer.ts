export function getLogoAsArrayBuffer(logo: string): ArrayBuffer {
  // Vite преобразует импорт в base64 URL
  if (logo.startsWith("data:")) {
    const base64Data = logo.split(",")[1];
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }

  throw new Error("Неверный формат импорта изображения");
}
