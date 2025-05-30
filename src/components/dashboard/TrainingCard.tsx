import type { TrainingSession } from '@/types/training';

interface TrainingCardProps {
  session: TrainingSession;
  isBest?: boolean;
  onDelete?: () => void;
}

export default function TrainingCard({ session, isBest, onDelete }: TrainingCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
      <div className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 hover:bg-white/10 transition duration-200 ${isBest ? 'ring-1 ring-yellow-400/30' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{formatDate(session.date)}</span>
            {isBest && (
              <span className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-400/20">
                🏆 Mejor marca
              </span>
            )}
          </div>
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-400/70 hover:text-red-400 text-sm transition-colors"
            >
              Eliminar
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-white">
            {session.exercise === "Bots Hard"
              ? `${session.hits} bots acertados`
              : `${session.duration} seg`}
          </div>
          {session.difficulty && (
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i < (session.difficulty ?? 0) ? 'bg-blue-400' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 