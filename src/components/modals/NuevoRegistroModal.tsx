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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <h2 className="text-xl font-bold mb-6 text-center text-blue-300">Nueva sesión</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select de ejercicio */}
              <div>
                <label className="text-sm block mb-1">Ejercicio</label>
                <div className="relative">
                  <FaBullseye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
                  <select
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur text-white appearance-none focus:outline-none"
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
                    <option value="Bots x100">Bots x100</option>
                    <option value="Bots Hard">Bots Hard</option>
                    <option value="Deathmatch">Deathmatch</option>
                    <option value="Flick Training">Flick Training</option>
                    <option value="Tracking Training">Tracking Training</option>
                    <option value="Aim Lab">Aim Lab</option>
                    <option value="Kovaak">Kovaak</option>
                  </select>
                </div>
              </div>

              {/* Campo condicional */}
              {form.exercise === "Bots Hard" ? (
                <div>
                  <label className="text-sm block mb-1">Bots acertados</label>
                  <div className="relative">
                    <FaBullseye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
                    <input
                      type="number"
                      placeholder="Ej: 47"
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur text-white placeholder-white/60 focus:outline-none"
                      value={form.hits}
                      onChange={(e) => setForm({ ...form, hits: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-sm block mb-1">Duración (segundos)</label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
                    <input
                      type="number"
                      placeholder="Ej: 105"
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 border border-white/20 backdrop-blur text-white placeholder-white/60 focus:outline-none"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm bg-white/10 border border-white/20 hover:bg-white/20 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
