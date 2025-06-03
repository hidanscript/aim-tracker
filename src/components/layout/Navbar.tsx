'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiTarget, FiLogOut, FiBarChart2 } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative bg-zinc-950 border-b border-zinc-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="bg-zinc-800 rounded-xl p-2 shadow-sm group-hover:scale-105 transition-transform">
              <FiTarget className="w-6 h-6 text-zinc-200 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="text-xl font-bold text-zinc-100 tracking-tight group-hover:text-blue-400 transition-colors">Recoil</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className={`text-base font-medium transition-colors px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                pathname === "/dashboard"
                  ? "text-zinc-100 bg-zinc-800"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/reportes"
              className={`flex items-center gap-2 text-base font-medium transition-colors px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                pathname === "/dashboard/reportes"
                  ? "text-zinc-100 bg-zinc-800"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
              }`}
            >
              <FiBarChart2 className="w-5 h-5" />
              <span>Reportes</span>
            </Link>
            <button
              onClick={() => {
                // Aquí iría la lógica de logout
                console.log("Logout clicked");
              }}
              className="text-base font-medium text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 