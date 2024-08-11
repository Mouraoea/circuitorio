import pako from "pako";

export const compressBlueprint = (blueprint) => {
  try {
    const jsonString = JSON.stringify(blueprint);
    const compressedData = pako.deflate(jsonString);
    const base64String = btoa(String.fromCharCode(...new Uint8Array(compressedData)));
    return "0" + base64String;
  } catch (error) {
    console.error("Compression error:", error);
    return null;
  }
};

export const decompressBlueprint = (compressedBlueprint) => {
  try {
    const decodedBase64 = atob(compressedBlueprint.substring(1));
    const byteArray = Uint8Array.from(decodedBase64, (c) => c.charCodeAt(0));
    const decompressedData = pako.inflate(byteArray);
    const decodedStr = new TextDecoder("utf-8").decode(decompressedData);
    return JSON.parse(decodedStr);
  } catch (error) {
    console.error("Decompression error:", error);
    return null;
  }
};
