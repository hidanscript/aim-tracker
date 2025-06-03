'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiTarget, FiHome, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-2">
                <FiTarget className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <span className="text-lg font-medium text-white/90">Recoil</span>
          </Link>

          {/* Navegación */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className={`relative group px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/dashboard'
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center gap-2">
                <FiHome className="w-4 h-4" />
                Dashboard
              </div>
            </Link>

            <button
              onClick={() => {
                // Aquí iría la lógica de logout
                console.log('Logout clicked');
              }}
              className="relative group px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center gap-2">
                <FiLogOut className="w-4 h-4" />
                Cerrar sesión
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 