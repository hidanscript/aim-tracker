'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBullseye, FaClock } from "react-icons/fa";

export default function NuevoRegistroModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}) {
  const [form, setForm] = useState({
    exercise: "Bots x100",
    duration: 0,
    hits: 0,
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload =
      form.exercise === "Bots Hard"
        ? { exercise: form.exercise, hits: form.hits }
        : { exercise: form.exercise, duration: form.duration };

    await fetch("/api/training-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    onAdd();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-2xl text-white">
              <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nueva sesión
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Select de ejercicio */}
                <div>
                  <label className="text-sm block mb-1 text-gray-300">Ejercicio</label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                    <div className="relative">
                      <FaBullseye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm" />
                      <select
                        className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-900/90 border border-white/20 backdrop-blur text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
                        value={form.exercise}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            exercise: e.target.value,
                            duration: 0,
                            hits: 0,
                          })
                        }
                        required
                      >
                        <option value="Bots x100" className="bg-gray-900 text-white">Bots x100</option>
                        <option value="Bots Hard" className="bg-gray-900 text-white">Bots Hard</option>
                        <option value="Deathmatch" className="bg-gray-900 text-white">Deathmatch</option>
                        <option value="Flick Training" className="bg-gray-900 text-white">Flick Training</option>
                        <option value="Tracking Training" className="bg-gray-900 text-white">Tracking Training</option>
                        <option value="Aim Lab" className="bg-gray-900 text-white">Aim Lab</option>
                        <option value="Kovaak" className="bg-gray-900 text-white">Kovaak</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Campo condicional */}
                {form.exercise === "Bots Hard" ? (
                  <div>
                    <label className="text-sm block mb-1 text-gray-300">Bots acertados</label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                      <div className="relative">
                        <FaBullseye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm" />
                        <input
                          type="number"
                          placeholder="Ej: 47"
                          className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/20 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                          value={form.hits}
                          onChange={(e) => setForm({ ...form, hits: Number(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-sm block mb-1 text-gray-300">Duración (segundos)</label>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                      <div className="relative">
                        <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-sm" />
                        <input
                          type="number"
                          placeholder="Ej: 105"
                          className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 border border-white/20 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                          value={form.duration}
                          onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Botones */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                    <div className="relative px-4 py-2 rounded-lg text-sm bg-white/5 border border-white/20 hover:bg-white/10 transition">
                      Cancelar
                    </div>
                  </button>
                  <button
                    type="submit"
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                    <div className="relative px-4 py-2 rounded-lg text-sm bg-white/10 border border-white/20 hover:bg-white/20 transition font-medium">
                      Guardar
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
