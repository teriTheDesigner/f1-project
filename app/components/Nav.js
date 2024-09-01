import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <div className="bg-[#E00400] w-full h-16 flex justify-center items-center text-white ">
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
  );
}
