import React from "react";
type QRInputProps = {
  text: string;
  setText: (text: string) => void;
};

function QRInput({ text, setText }: QRInputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Type something...."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-6 w-full border rounder-lg p-3"
      />
    </div>
  );
}

export default QRInput;
