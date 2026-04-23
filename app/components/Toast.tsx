"use client";

import { useEffect, useState } from "react";

interface Props {
  message: string;
  type: "ok" | "err";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: Props) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hide = setTimeout(() => setHiding(true), 3200);
    const close = setTimeout(onClose, 3400);
    return () => { clearTimeout(hide); clearTimeout(close); };
  }, [onClose]);

  function dismiss() {
    setHiding(true);
    setTimeout(onClose, 200);
  }

  return (
    <div
      className={`toast toast--${type}${hiding ? " toast--hiding" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast-icon" aria-hidden="true">
        {type === "ok" ? "✓" : "!"}
      </span>
      {message}
      <button className="toast-close" onClick={dismiss} aria-label="닫기">×</button>
    </div>
  );
}
