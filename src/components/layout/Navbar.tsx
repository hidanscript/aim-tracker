'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGamepad } from 'react-icons/fa';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border-b border-white/10"></div>
      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-[2px] opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center gap-2">
                <FaGamepad className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Recoil
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition">
              Características
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition">
              Precios
            </Link>
            <Link href="/login" className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-[2px] opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative px-4 py-2 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 transition">
                Iniciar sesión
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
} 