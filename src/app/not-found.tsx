'use client';
import Link from 'next/link';
import { FiAlertTriangle } from 'react-icons/fi';
import Navbar from '@/components/layout/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-10 flex flex-col items-center max-w-md w-full">
          <div className="bg-zinc-800 rounded-full p-4 mb-4">
            <FiAlertTriangle className="w-10 h-10 text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-zinc-100">Página no encontrada</h1>
          <p className="text-zinc-400 mb-6 text-center">La página que buscás no existe o fue movida. Si creés que esto es un error, por favor revisá la URL o volvé al dashboard.</p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium transition-colors"
          >
            Volver al Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
} 