import React from "react";
type QRInputProps = {
  text: string;
  setText: (text: string) => void;
  onEnter?: () => void;
};

function QRInput({ text, setText, onEnter }: QRInputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Type something...."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            onEnter();
          }
        }}
        className="mt-6 w-full border rounder-lg p-3  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default QRInput;
