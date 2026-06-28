"use client";
import { useEffect, useState } from "react";
import QrCode from "react-qr-code";
import QRInput from "./components/QRInput";
import QRDisplay from "./components/QRDisplay";
import { useRef } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(200);
  const [history, setHistory] = useState<string[]>([]);
  const qrRef = useRef<HTMLDivElement>(null);

  //handle generate QR code
  const generateQRCode = () => {
    if (text.trim() === "") {
      setError("Please enter a text to generate QR code");
      return;
    }
    setQrValue(text.trim());
    setHistory((prevHistory) => [text.trim(), ...prevHistory]);
    setError("");
  };

  //handle clear QR code
  const clearQRCode = () => {
    setText("");
    setQrValue("");
    setError("");
    setFgColor("#000000");
    setBgColor("#ffffff");
    setSize(200);
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

  // save history to local storage
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // load history from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white  p-8 rounded-xl shadow-lg w-full max-w-md ">
        <h1 className="text-3xl font-bold text-center text-green-800">
          {" "}
          QR Code Generator
        </h1>
        <div className="mt-2 text-gray-500 text-center">
          Generate a QR code instantly
        </div>
        <QRInput text={text} setText={setText} onEnter={generateQRCode} />
        {error && <p className="mt-2 text-red-600">{error}</p>}
        <div className="mt-4 flex gap-4">
          <button
            onClick={generateQRCode}
            disabled={!text.trim() && !qrValue}
            className="flex-1 bg-green-600 text-white p-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:opacity-50"
          >
            Generate
          </button>
          <button
            onClick={clearQRCode}
            className="flex-1 bg-red-500 text-white p-3  rounded-lg hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
        {qrValue && (
          <div className="mt-6 space-y-4 flex">
            <div>
              <label className="text-sm text-gray-600">QR Color</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="ml-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="ml-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="ml-2 w-20 border rounded-lg p-1"
              >
                <option value={100}>Small</option>
                <option value={200}>Medium</option>
                <option value={300}>Large</option>
                <option value={400}>Extra Large</option>
              </select>
            </div>
          </div>
        )}
        {qrValue && (
          <QRDisplay
            value={qrValue}
            ref={qrRef}
            fgColor={fgColor}
            bgColor={bgColor}
            size={size}
          />
        )}
        <div className="mt-8">
          <h2 className="font-semibold">History</h2>
          <ul className="mt-2 space-y-2">
            {history.map((item, index) => (
              <li key={index} className="rounded border p-2 bg-gray-100">
                {item}
              </li>
            ))}
          </ul>
        </div>
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
