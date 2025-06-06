import { Mea_Culpa } from "next/font/google";
import React from "react";

const meaCulpa = Mea_Culpa({
  subsets: ["latin"],
  weight: "400",
});

export default function Header() {
  return (
    <nav className="flex w-full absolute p-4">
      <h1 className={`${meaCulpa.className} text-3xl `}>Wires</h1>
    </nav>
  );
}
