"use client";
import { useState } from "react";
import QrCode from "react-qr-code";
import QRInput from "./components/QRInput";
import QRDisplay from "./components/QRDisplay";
import { useRef } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");

  const qrRef = useRef<HTMLDivElement>(null);

  //handle generate QR code
  const generateQRCode = () => {
    if (text.trim() === "") {
      setError("Please enter a text to generate QR code");
      return;
    }
    setQrValue(text.trim());
    setError("");
  };

  //handle clear QR code
  const clearQRCode = () => {
    setText("");
    setQrValue("");
    setError("");
  };

  //handle download QR code
  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector("svg");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white  p-8 rounded-xl shadow-lg w-[450px]">
        <h1 className="text-3xl font-bold text-center text-gray-600"> QR Code Generator</h1>
        <div className="mt-2 text-gray-500 text-center">Generate a QR code instantly</div>
        <QRInput text={text} setText={setText} onEnter={generateQRCode} />
        {error && <p className="mt-2 text-red-600">{error}</p>}
        <div className="mt-4 flex gap-4">
          <button
            onClick={generateQRCode}
            className="flex-1 bg-green-600 text-white p-3 px-4 rounded-lg hover:bg-blue-700"
          >
            Generate QR Code
          </button>
          <button
            onClick={clearQRCode}
            className="flex-1 bg-red-500 text-white p-3  rounded-lg hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
        {qrValue && <QRDisplay value={qrValue} ref={qrRef} />}
        {qrValue && (
          <button
            onClick={downloadQRCode}
            disabled={!qrValue}
            className="mt-4 w-full bg-green-500 text-white p-3  rounded-lg hover:bg-green-700"
          >
            {!qrValue ? "No QR code yet" : "Download QR Code"}
          </button>
        )}
      </div>
    </main>
  );
}
