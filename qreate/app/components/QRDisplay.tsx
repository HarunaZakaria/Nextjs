import React from "react";
import QrCode from "react-qr-code";
import { forwardRef } from "react";

type QRDisplayProps = {
  value: string;
};
const QRDisplay = forwardRef<HTMLDivElement, QRDisplayProps>(
  ({ value }, ref) => {
    return (
      <div className="mt-8 flex justify-center">
        <QrCode value={value || "Enter a URL to generate a QR code"} />
      </div>
    );
  },
);

QRDisplay.displayName = "QRDisplay";
export default QRDisplay;
