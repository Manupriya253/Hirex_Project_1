"use client";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
return (
  <header className="z-40 mt-3 w-full md:mt-6">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div
        className="
          relative flex h-16 items-center justify-between gap-6 rounded-xl 
          bg-white bg-opacity-90
          px-6
          shadow-[0_12px_25px_rgba(0,0,0,0.12)]
          border border-gray-200
          before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]
          before:border before:border-white/60
          before:shadow-[0_0_15px_rgba(255,255,255,0.4)]
          after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg after:rounded-xl
          "
      >
        {/* Site branding */}
        <div className="flex flex-1 items-center">
          <Logo />
        </div>

        {/* Desktop sign in links */}
        <ul className="flex flex-1 items-center justify-end gap-5">
         <li>
          <Link
            href="/signin"
            className="
              btn-sm relative
              bg-gradient-to-br from-[#e0f7ff] to-[#ffffff]
              text-[#004aad] font-extrabold uppercase tracking-wide
              px-6 py-2 rounded-lg
              shadow-lg shadow-blue-100
              border-2 border-blue-100
              hover:from-[#d4f0ff] hover:to-white hover:shadow-xl hover:shadow-blue-200
              active:scale-95
              transition-all duration-300 ease-in-out
            "
          >
            Staff Portal
          </Link>
        </li>

        </ul>
      </div>
    </div>
  </header>
);





}
