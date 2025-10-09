// Button.jsx
"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function Button({ href, onClick, icon, text, isActive = false }) {
  let className = `inline-flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border border-white`;

  if (isActive) {
    className += " bg-white text-black";
  } else {
    className += " text-white hover:bg-white hover:text-black transition-colors duration-200";
  }

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
