import React from "react";
import QrCode from "react-qr-code";
import { forwardRef } from "react";

type QRDisplayProps = {
  value: string;
  fgColor: string;
  bgColor: string;
  size: number;
};
const QRDisplay = forwardRef<HTMLDivElement, QRDisplayProps>(
  ({ value, fgColor, bgColor, size }, ref) => {
    return (
      <div className="mt-8 flex justify-center items-center" ref={ref}>
        <QrCode
          value={value || "Enter a URL to generate a QR code"}
          fgColor={fgColor}
          bgColor={bgColor}
          size={size}
        />
      </div>
    );
  },
);

QRDisplay.displayName = "QRDisplay";
export default QRDisplay;
