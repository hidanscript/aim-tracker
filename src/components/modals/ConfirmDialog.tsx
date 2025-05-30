'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  message = "¿Estás seguro?",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}) {
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
            className="bg-white/10 backdrop-blur-xl border border-white/10 text-white p-6 rounded-2xl w-full max-w-sm shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <p className="text-center text-base mb-6">{message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm bg-white/10 border border-white/20 hover:bg-white/20 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
