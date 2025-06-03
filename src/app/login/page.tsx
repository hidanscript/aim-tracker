'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTarget, FiArrowRight, FiUser, FiLock } from 'react-icons/fi';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular un delay de carga
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Intento de login:', { username, password });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="relative bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-zinc-800 rounded-lg p-1.5">
                <FiTarget className="w-5 h-5 text-zinc-300" />
              </div>
              <span className="text-lg font-medium text-zinc-100">Recoil</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-zinc-100 mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-zinc-400">
              Ingresá tus credenciales para continuar
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-zinc-400">
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="w-5 h-5 text-zinc-500" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-colors"
                    placeholder="Ingresá tu usuario"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-400">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="w-5 h-5 text-zinc-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-colors"
                    placeholder="Ingresá tu contraseña"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-zinc-300 focus:ring-zinc-700 focus:ring-offset-zinc-900"
                  />
                  <label htmlFor="remember" className="ml-2 block text-zinc-400">
                    Recordarme
                  </label>
                </div>
                <Link
                  href="/recuperar-contraseña"
                  className="text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar sesión
                    <FiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                ¿No tenés una cuenta?{' '}
                <Link
                  href="/registro"
                  className="text-zinc-300 hover:text-zinc-100 transition-colors font-medium"
                >
                  Registrate
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24 py-8">
          <p className="text-sm text-zinc-500 text-center">
            © {new Date().getFullYear()} Recoil. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
} 