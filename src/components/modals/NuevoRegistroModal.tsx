'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSave } from 'react-icons/fi';

interface NuevoRegistroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function NuevoRegistroModal({ isOpen, onClose, onAdd }: NuevoRegistroModalProps) {
  const [exercise, setExercise] = useState("Bots x100");
  const [duration, setDuration] = useState("");
  const [hits, setHits] = useState("");
  const [difficulty, setDifficulty] = useState(3);
  const [notes, setNotes] = useState("");
  const [dpi, setDpi] = useState("800");
  const [igs, setIgs] = useState("0.31");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const sessionData = {
        exercise,
        date: new Date().toISOString(),
        duration: exercise === "Bots x100" ? parseInt(duration) : undefined,
        hits: exercise === "Bots Hard" ? parseInt(hits) : undefined,
        difficulty,
        notes: notes.trim() || undefined,
        dpi: parseInt(dpi),
        igs: parseFloat(igs)
      };

      const res = await fetch("/api/training-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData),
      });

      if (!res.ok) throw new Error("Error al guardar la sesión");

      onAdd();
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setExercise("Bots x100");
    setDuration("");
    setHits("");
    setDifficulty(3);
    setNotes("");
    setDpi("800");
    setIgs("0.31");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h2 className="text-xl font-semibold text-zinc-100">Nueva sesión</h2>
                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-zinc-300 transition-colors"
                  disabled={isSaving}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      Ejercicio
                    </label>
                    <select
                      value={exercise}
                      onChange={(e) => setExercise(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSaving}
                    >
                      <option value="Bots x100">Bots x100</option>
                      <option value="Bots Hard">Bots Hard</option>
                    </select>
                  </div>

                  {exercise === "Bots x100" ? (
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">
                        Duración (segundos)
                      </label>
                      <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Ej: 45"
                        required
                        disabled={isSaving}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-1">
                        Bots acertados
                      </label>
                      <input
                        type="number"
                        value={hits}
                        onChange={(e) => setHits(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Ej: 25"
                        required
                        disabled={isSaving}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      Dificultad
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setDifficulty(level)}
                          disabled={isSaving}
                          className={`flex-1 py-2 rounded-lg border transition-colors ${
                            difficulty === level
                              ? "bg-zinc-700 border-zinc-600 text-zinc-100"
                              : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700/50"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-zinc-400">
                      Notas
                    </label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-colors"
                      placeholder="Agregá notas sobre tu sesión..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="dpi" className="block text-sm font-medium text-zinc-400">
                        DPI
                      </label>
                      <input
                        id="dpi"
                        type="number"
                        value={dpi}
                        onChange={(e) => setDpi(e.target.value)}
                        className="block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-colors"
                        placeholder="800"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="igs" className="block text-sm font-medium text-zinc-400">
                        IGS
                      </label>
                      <input
                        id="igs"
                        type="number"
                        step="0.01"
                        value={igs}
                        onChange={(e) => setIgs(e.target.value)}
                        className="block w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent transition-colors"
                        placeholder="0.31"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSaving}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-zinc-400"></div>
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        <span>Guardar sesión</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
