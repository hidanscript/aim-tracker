'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBullseye, FaPlus, FaHistory, FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { href: "/dashboard", label: "Inicio", icon: <FaBullseye /> },
  { href: "/dashboard/new", label: "Nueva sesión", icon: <FaPlus /> },
  { href: "/dashboard/historial", label: "Historial", icon: <FaHistory /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const renderNav = () => (
    <nav className="space-y-2">
      {navItems.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={href} href={href} onClick={() => setIsOpen(false)}>
            <div className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200 ${
                isActive ? 'opacity-30' : ''
              }`}></div>
              <div className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition ${
                isActive
                  ? "bg-white/10 text-blue-300"
                  : "hover:bg-white/5 text-white/80"
              }`}>
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-lg text-white">
          <FaBars />
        </div>
      </button>

      {/* Sidebar en desktop */}
      <aside className="w-64 hidden md:flex flex-col p-6 min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-950/50 to-black/50 backdrop-blur-xl border-r border-white/10"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-10 tracking-wide">
            Aim Tracker
          </h2>
          {renderNav()}
        </div>
      </aside>

      {/* Sidebar móvil con animación */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fondo difuminado */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel lateral animado */}
            <motion.div
              className="fixed z-50 left-0 top-0 bottom-0 w-64 p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-950/50 to-black/50 backdrop-blur-xl border-r border-white/10"></div>
              <div className="relative">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
                    Aim Tracker
                  </h2>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-lg text-white">
                      <FaTimes />
                    </div>
                  </button>
                </div>
                {renderNav()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
