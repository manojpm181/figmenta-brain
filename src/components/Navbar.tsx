"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 py-4 dark:bg-black">
      <Link href="/" className="text-lg font-semibold">
        Figmenta Brain
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          Admin
        </Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
