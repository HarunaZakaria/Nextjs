"use client";
import { useState } from "react";
import QrCode from "react-qr-code";
import QRInput from "./components/QRInput";
import QRDisplay from "./components/QRDisplay";
export default function Home() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");

  //handle generate QR code
  const generateQRCode = () => {
    if (text.trim() === "") {
      setError("Please enter a text to generate QR code");
      return;
    }
    setQrValue(text.trim());
    setError("");
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white  p-8 rounded-xl shadow-lg w-[450px]">
        <h1 className="text-3xl font-bold"> QR Code Generator</h1>
        <div className="mt-2 text-gray-500">Generate a QR code instantly</div>
        <QRInput text={text} setText={setText} />
        {error && <p className="mt-2 text-red-600">{error}</p>}
        <button
          onClick={generateQRCode}
          className="mt-4 w-full bg-blue-600 text-white p-3 px-4 rounded-lg hover:bg-blue-700"
        >
          Generate QR Code
        </button>
        <QRDisplay value={qrValue} />
      </div>
    </main>
  );
}
