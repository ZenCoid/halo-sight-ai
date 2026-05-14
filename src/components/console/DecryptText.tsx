import { useEffect, useState } from "react";

const CHARS = "ABCDEF0123456789▓░▒█/\\";

export function DecryptText({ value, className = "", trigger = 0 }: { value: string; className?: string; trigger?: number }) {
  const [out, setOut] = useState(value);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      const next = value
        .split("")
        .map((c, idx) => (idx < i || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("");
      setOut(next);
      i += 1;
      if (i > value.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [value, trigger]);
  return <span className={className}>{out}</span>;
}
