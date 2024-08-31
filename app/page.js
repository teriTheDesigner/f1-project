import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-7xl font-extrabold">Hellloo to all F1 Fans!</h1>

      <Link href="/drivers">Drivers</Link>
    </main>
  );
}
