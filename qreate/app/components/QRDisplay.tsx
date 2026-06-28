import React from 'react'
import QrCode from "react-qr-code";

type QRDisplayProps = {
  value: string;
};
function QRDisplay({ value }: QRDisplayProps) {
  return (
    <div className="mt-8 flex justify-center">
      <QrCode value={value || "Enter a URL to generate a QR code"} size={200} />
    </div>
  )
}

export default QRDisplay