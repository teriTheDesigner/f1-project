"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="bg-[#E00400]  w-full h-10 md:hidden flex justify-between items-center text-white ">
        <Link href="/" className="ml-4">
          <Image
            src="/logof1.webp"
            alt="Formula 1 Logo"
            width={100}
            height={100}
          />
        </Link>

        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-2 mr-4">
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
            <span className="block w-8 h-0.5 bg-white"></span>
          </div>
        </button>
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-10 absolute md:static top-10 left-0 w-full md:w-auto bg-[#E00400] md:bg-transparent p-5 md:p-0`}
        >
          <Link href="/schedule" className="block md:inline-block py-2 md:py-0">
            Schedule
          </Link>
          <Link
            href="/2024season"
            className="block md:inline-block py-2 md:py-0"
          >
            2024 Season
          </Link>
          <Link href="/teams" className="block md:inline-block py-2 md:py-0">
            Teams
          </Link>
          <Link href="/drivers" className="block md:inline-block py-2 md:py-0">
            Drivers
          </Link>
        </nav>
      </div>
      <div className="bg-[#E00400] hidden w-full h-16 md:flex justify-center items-center text-white ">
        <nav className="flex justify-center items-center gap-10">
          <Link href="/">
            <Image
              src="/logof1.webp"
              alt="Formula 1 Logo"
              width={100}
              height={100}
            />
          </Link>
          <Link href="/schedule" className="active:border active:">
            Schedule
          </Link>
          <Link href="/2024season">2024 Season</Link>
          <Link href="/teams">Teams</Link>
          <Link href="/drivers">Drivers</Link>
        </nav>
      </div>
    </div>
  );
}
