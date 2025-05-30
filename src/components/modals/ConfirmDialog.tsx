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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-xl blur opacity-30"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg p-6 shadow-2xl text-white">
              <p className="text-center text-base mb-6 text-gray-200">{message}</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                  <div className="relative px-4 py-2 rounded-lg text-sm bg-white/5 border border-white/20 hover:bg-white/10 transition">
                    Cancelar
                  </div>
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                  <div className="relative px-4 py-2 rounded-lg text-sm bg-white/10 border border-white/20 hover:bg-white/20 transition font-medium text-red-400">
                    Eliminar
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
