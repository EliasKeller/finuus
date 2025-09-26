"use client";

import { useRef } from "react";

export function Button({ icon, text, onClick, }) {
    const containerRef = useRef(null);

    return (
        <button ref={containerRef} onClick={onClick} className="w-full p-2 bg-blue-500 text-white rounded">
            {icon && <span className="mr-2">{icon}</span>}
            {text}
        </button>
    );
}
