"use client";

import { Icon } from "@iconify/react";

export function Button({ icon, text, onClick, gradientBackground=false }) {

    return (
        <button onClick={onClick} className={`inline-flex items-center gap-2 px-3 py-2 text-white rounded-lg cursor-pointer ${gradientBackground ? 
        'bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 hover:bg-fuchsia-700/25 hover:bg-blend-overlay transition-colors' : 'bg-blue-500'}`}>
            {icon && <Icon icon={icon} className="block w-6 h-6 shrink-0" />}
            {text && <span className="inline-block align-middle">{text}</span>}
        </button>
    );
}
