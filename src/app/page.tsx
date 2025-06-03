'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { FiTarget, FiArrowRight, FiTrendingUp, FiClock, FiActivity, FiGithub, FiTwitter } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="relative bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-zinc-800 rounded-lg p-1.5">
                <FiTarget className="w-5 h-5 text-zinc-300" />
              </div>
              <span className="text-lg font-medium text-zinc-100">Recoil</span>
            </div>
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-6xl font-bold text-zinc-100 leading-tight">
                    Entrená tu aim con{' '}
                    <span className="text-zinc-300">precisión</span>
                  </h1>
                  <p className="text-lg text-zinc-400 max-w-lg">
                    Seguí tu progreso, analizá tus sesiones y convertite en un mejor jugador con nuestra herramienta de entrenamiento.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors"
                  >
                    Comenzar ahora
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                  <div className="p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-semibold text-zinc-200">Dashboard</h2>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-zinc-800 rounded-lg p-4">
                        <div className="text-sm font-medium text-zinc-400 mb-1">Total de sesiones</div>
                        <div className="text-2xl font-semibold text-zinc-100">24</div>
                      </div>
                      <div className="bg-zinc-800 rounded-lg p-4">
                        <div className="text-sm font-medium text-zinc-400 mb-1">Tiempo total</div>
                        <div className="text-2xl font-semibold text-zinc-100">2h 30m</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-zinc-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-zinc-300">Bots x100</div>
                          <div className="text-xs text-zinc-500">Hace 2 horas</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-zinc-400">45 segundos</div>
                          <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-zinc-300">Bots Hard</div>
                          <div className="text-xs text-zinc-500">Ayer</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-zinc-400">28 bots acertados</div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-zinc-900/50">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-zinc-900 rounded-xl p-8 border border-zinc-800"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6">
                  <FiTarget className="w-6 h-6 text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-3">Seguimiento preciso</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Registrá cada sesión con detalles específicos y seguí tu evolución día a día.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900 rounded-xl p-8 border border-zinc-800"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6">
                  <FiTrendingUp className="w-6 h-6 text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-3">Análisis detallado</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Visualizá tu progreso con métricas claras y estadísticas en tiempo real.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-zinc-900 rounded-xl p-8 border border-zinc-800"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6">
                  <FiClock className="w-6 h-6 text-zinc-300" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-3">Entrenamiento eficiente</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Optimizá tus rutinas de práctica y maximizá tu tiempo de entrenamiento.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-zinc-900 rounded-xl border border-zinc-800 p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-zinc-100 mb-4">
                ¿Listo para mejorar tu aim?
              </h2>
              <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                Comenzá a registrar tus sesiones hoy y llevá tu precisión al siguiente nivel.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors"
              >
                Comenzar gratis
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-zinc-800 rounded-lg p-1.5">
                  <FiTarget className="w-5 h-5 text-zinc-300" />
                </div>
                <span className="text-lg font-medium text-zinc-100">Recoil</span>
              </div>
              <p className="text-sm text-zinc-400">
                Mejorá tu aim con seguimiento inteligente y análisis detallado.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-100 mb-4">Producto</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/login" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-100 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacidad" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                    Términos
                  </Link>
                </li>
              </ul>
        </div>

        <div>
              <h3 className="text-sm font-semibold text-zinc-100 mb-4">Social</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  <FiTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-500 text-center">
              © {new Date().getFullYear()} Recoil. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
