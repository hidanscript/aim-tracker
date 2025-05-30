import type { Metadata } from 'next'
import { useState } from "react";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Acá podrías hacer el fetch a tu backend o autenticación
    console.log({ email, password });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
            Recoil
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Contraseña</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="relative group w-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
              <div className="relative w-full bg-white/10 border border-white/20 hover:bg-white/20 py-2 rounded-lg text-white font-medium transition">
                Iniciar sesión
              </div>
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
} 