"use client";
import { useState } from "react";
import QrCode from "react-qr-code";
export default function Home() {
  const [text, setText] = useState("");
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white  p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold"> QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-6 w-full border rounder-lg p-3"
        />
        <button className="mt-4 w-full bg-blue-600 text-white p-3 px-4 rounded-lg hover:bg-blue-700">
          Generate QR Code
        </button>
        <div className="mt-8 flex justify-center">
          <QrCode value={text || "Enter a URL to generate a QR code"} size={200} />
        </div>
      </div>
    </main>
  );
}
