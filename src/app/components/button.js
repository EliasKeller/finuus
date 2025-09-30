// Button.jsx
"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function Button({ href, onClick, icon, text, gradientBackground=false }) {
  const className = `inline-flex items-center gap-2 px-3 py-2 text-white rounded-lg cursor-pointer ${
    gradientBackground
      ? "bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 hover:bg-fuchsia-700/25 hover:bg-blend-overlay transition-colors"
      : "bg-blue-500"
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {icon && <Icon icon={icon} className="block w-6 h-6 shrink-0" />}
        {text && <span>{text}</span>}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {icon && <Icon icon={icon} className="block w-6 h-6 shrink-0" />}
      {text && <span>{text}</span>}
    </button>
  );
}
