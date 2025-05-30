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
    <nav className="space-y-3">
      {navItems.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={href} href={href} onClick={() => setIsOpen(false)}>
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
                isActive
                  ? "bg-blue-500/20 text-blue-300"
                  : "hover:bg-white/10 text-white/80"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
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
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-white/10 backdrop-blur border border-white/20 p-2 rounded-md"
      >
        <FaBars />
      </button>

      {/* Sidebar en desktop */}
      <aside className="w-64 hidden md:flex flex-col p-6 bg-white/10 backdrop-blur-md border-r border-white/10 min-h-screen shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-10 tracking-wide">Aim Tracker</h2>
        {renderNav()}
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
              className="fixed z-50 left-0 top-0 bottom-0 w-64 bg-white/10 backdrop-blur-md border-r border-white/10 p-6 shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold text-white tracking-wide">Aim Tracker</h2>
                <button onClick={() => setIsOpen(false)} className="text-white">
                  <FaTimes />
                </button>
              </div>
              {renderNav()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
