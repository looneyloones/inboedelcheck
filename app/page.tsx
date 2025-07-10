import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welkom bij InboedelCheck</h1>
      <p className="mb-6 text-lg">Documenteer moeiteloos de staat van je huurwoning.</p>
      <Link href="/inspectie" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
        Start Inspectie
      </Link>
    </main>
  );
}