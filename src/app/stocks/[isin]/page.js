"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  return (
    <div>
      <h1>Stock {params.isin}</h1>
    </div>
  );
}