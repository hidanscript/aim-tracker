'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import { FaBullseye, FaChartLine, FaGamepad, FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/5 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          
          {/* Content */}
          <div className="relative container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Mejora tu aim con
                <br />
                <span className="text-white">Recoil</span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Registra, analiza y mejora tu precisión en el juego. Una herramienta diseñada para jugadores que buscan llevar su aim al siguiente nivel.
              </p>
              <Link
                href="/login"
                className="relative group inline-flex items-center gap-2 px-8 py-4 text-lg font-medium"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-[2px] opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white/10 border border-white/20 hover:bg-white/20 px-8 py-3 rounded-lg transition flex items-center gap-2">
                  Comenzar ahora
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="relative py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Feature 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                    <FaBullseye className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Seguimiento Preciso</h3>
                  <p className="text-gray-400">
                    Registra cada sesión de entrenamiento y obtén métricas detalladas de tu rendimiento.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                    <FaChartLine className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Análisis Detallado</h3>
                  <p className="text-gray-400">
                    Visualiza tu progreso con gráficos interactivos y estadísticas en tiempo real.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                    <FaGamepad className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Múltiples Ejercicios</h3>
                  <p className="text-gray-400">
                    Entrena con diferentes ejercicios diseñados para mejorar aspectos específicos de tu aim.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div id="pricing" className="relative py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto text-center"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ¿Listo para mejorar tu aim?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Únete a Recoil hoy y comienza tu viaje hacia un aim más preciso y consistente.
                </p>
                <Link
                  href="/login"
                  className="relative group inline-flex items-center gap-2 px-8 py-4 text-lg font-medium"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-[2px] opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-white/10 border border-white/20 hover:bg-white/20 px-8 py-3 rounded-lg transition flex items-center gap-2">
                    Comenzar gratis
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
