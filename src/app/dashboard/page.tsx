'use client';
import { useEffect, useState } from "react";
import { FiTarget, FiClock, FiTrendingUp, FiActivity, FiChevronDown, FiChevronUp, FiPlus, FiTrash2 } from 'react-icons/fi';
import Navbar from "@/components/layout/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import TrainingCard from "@/components/dashboard/TrainingCard";
import NuevoRegistroModal from "@/components/modals/NuevoRegistroModal";
import ConfirmDialog from "@/components/modals/ConfirmDialog";
import type { TrainingSession } from "@/types/training";

const formatDuration = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (remainingSeconds > 0 && days === 0 && hours === 0) {
    parts.push(`${remainingSeconds}s`);
  }

  return parts.join(' ') || '0s';
};

export default function DashboardPage() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const fetchSessions = async () => {
    const res = await fetch("/api/training-session");
    const data = await res.json();
    setSessions(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const groupByDate = (data: TrainingSession[]) => {
    const grouped: { [date: string]: TrainingSession[] } = {};
    data.forEach((session) => {
      const date = new Date(session.date).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(session);
    });
    return grouped;
  };

  const calculateStats = () => {
    const lastWeek = sessions.filter(s => {
      const sessionDate = new Date(s.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= weekAgo;
    });

    const totalSessions = sessions.length;
    const weeklySessions = lastWeek.length;
    
    // Calcular tiempo total considerando solo Bots x100 y contando Bots Hard como 30 segundos
    const totalTime = sessions.reduce((acc, s) => {
      if (s.exercise === "Bots Hard") {
        return acc + 30; // Cada sesión de Bots Hard cuenta como 30 segundos
      } else if (s.exercise === "Bots x100") {
        return acc + (s.duration || 0); // Sumar la duración real de Bots x100
      }
      return acc; // Ignorar otros tipos de ejercicios
    }, 0);

    const bestHits = Math.max(...sessions.map(s => s.hits || 0));

    // Calcular mejor tiempo de Bots x100
    const bestTime = sessions
      .filter(s => s.exercise === "Bots x100" && s.duration)
      .reduce((min, s) => {
        if (!min || (s.duration && s.duration < (min.duration || Infinity))) {
          return s;
        }
        return min;
      }, null as TrainingSession | null)
      ?.duration || 0;

    // Obtener el DPI e IGS más reciente
    const latestSession = sessions.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    return {
      totalSessions,
      weeklySessions,
      totalTime,
      bestHits,
      bestTime,
      weeklyTrend: weeklySessions > 0 ? ((weeklySessions / totalSessions) * 100) : 0,
      currentDpi: latestSession?.dpi || 800,
      currentIgs: latestSession?.igs || 0.31
    };
  };

  const stats = calculateStats();
  const groupedByDate = groupByDate(sessions);

  const toggleCategory = (date: string, exercise: string) => {
    const key = `${date}-${exercise}`;
    setExpandedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-8 lg:px-20 xl:px-32">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <FiTarget className="w-4 h-4" />
                  <span>DPI: {stats.currentDpi}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiTarget className="w-4 h-4" />
                  <span>IGS: {stats.currentIgs.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg text-sm font-medium transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Nueva sesión
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total de sesiones"
              value={stats.totalSessions}
              icon={<FiActivity className="w-4 h-4" />}
              trend={{ value: stats.weeklyTrend, isPositive: true }}
            />
            <StatsCard
              title="Tiempo total"
              value={formatDuration(stats.totalTime)}
              icon={<FiTrendingUp className="w-4 h-4" />}
            />
            <StatsCard
              title="Mejor marca"
              value={`${stats.bestHits} hits`}
              icon={<FiTarget className="w-4 h-4" />}
            />
            <StatsCard
              title="Mejor tiempo"
              value={stats.bestTime ? `${stats.bestTime} seg` : 'N/A'}
              icon={<FiClock className="w-4 h-4" />}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-400"></div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center">
              <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
                <div className="text-5xl mb-4">🎯</div>
                <h2 className="text-xl font-semibold text-zinc-100 mb-2">Sin registros todavía</h2>
                <p className="text-sm text-zinc-400 mb-4">
                  Comenzá tu entrenamiento y registra tu progreso día a día.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-zinc-800 hover:bg-zinc-700 rounded-lg px-4 py-2 text-sm font-medium transition"
                >
                  + Añadir tu primera sesión
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {Object.entries(groupedByDate).map(([date, dateSessions]) => {
                  const exercises: { [exercise: string]: TrainingSession[] } = {};
                  dateSessions.forEach((s) => {
                    if (!exercises[s.exercise]) exercises[s.exercise] = [];
                    exercises[s.exercise].push(s);
                  });

                  return (
                    <div key={date} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                      <div className="p-6 border-b border-zinc-800">
                        <h2 className="text-xl font-semibold text-zinc-200">{date}</h2>
                      </div>
                      <div className="divide-y divide-zinc-800">
                        {Object.entries(exercises).map(([exercise, entries]) => {
                          const sorted = entries.sort(
                            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                          );
                          const best = exercise === "Bots Hard"
                            ? entries.reduce((max, s) => (s.hits ?? 0) > (max.hits ?? 0) ? s : max)
                            : entries.reduce((min, s) => (s.duration ?? Infinity) < (min.duration ?? Infinity) ? s : min);

                          const categoryKey = `${date}-${exercise}`;
                          const isExpanded = expandedCategories[categoryKey] ?? false;

                          return (
                            <div key={exercise}>
                              <button
                                onClick={() => toggleCategory(date, exercise)}
                                className="w-full p-6 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <h3 className="text-sm font-medium text-zinc-300">{exercise}</h3>
                                  <span className="text-xs text-zinc-500">({entries.length} sesiones)</span>
                                </div>
                                {isExpanded ? <FiChevronUp className="text-zinc-500" /> : <FiChevronDown className="text-zinc-500" />}
                              </button>
                              
                              {isExpanded && (
                                <div className="px-6 pb-6">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="text-left text-zinc-400 border-b border-zinc-800">
                                          <th className="pb-3 font-medium w-12">#</th>
                                          <th className="pb-3 font-medium">Duración / Hits</th>
                                          <th className="pb-3 font-medium">Dificultad</th>
                                          <th className="pb-3 font-medium">Notas</th>
                                          <th className="pb-3 font-medium text-right">Acciones</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-zinc-800">
                                        {sorted.map((session, index) => (
                                          <tr
                                            key={session._id}
                                            className={`group/row hover:bg-zinc-800/30 transition-colors ${
                                              session._id === best._id ? 'bg-zinc-800/50' : ''
                                            }`}
                                          >
                                            <td className="py-3 text-zinc-400">
                                              {index + 1}.
                                            </td>
                                            <td className="py-3">
                                              <div className="flex items-center gap-2">
                                                <span className="text-zinc-100">
                                                  {session.exercise === "Bots Hard"
                                                    ? `${session.hits} bots acertados`
                                                    : `${session.duration} seg`}
                                                </span>
                                                {session._id === best._id && (
                                                  <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-600">
                                                    🏆 Mejor marca
                                                  </span>
                                                )}
                                              </div>
                                            </td>
                                            <td className="py-3">
                                              {session.difficulty && (
                                                <div className="flex gap-1">
                                                  {[...Array(5)].map((_, i) => (
                                                    <div
                                                      key={i}
                                                      className={`w-1.5 h-1.5 rounded-full ${
                                                        i < (session.difficulty ?? 0) ? 'bg-zinc-400' : 'bg-zinc-700'
                                                      }`}
                                                    />
                                                  ))}
                                                </div>
                                              )}
                                            </td>
                                            <td className="py-3">
                                              {session.notes ? (
                                                <span className="text-zinc-300 text-sm">{session.notes}</span>
                                              ) : (
                                                <span className="text-zinc-500 text-sm italic">Sin notas</span>
                                              )}
                                            </td>
                                            <td className="py-3 text-right">
                                              <button
                                                onClick={() => setConfirmingId(session._id)}
                                                className="text-zinc-400 hover:text-zinc-300 transition-colors opacity-0 group-hover/row:opacity-100"
                                              >
                                                Eliminar
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <NuevoRegistroModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={fetchSessions}
          />

          <ConfirmDialog
            isOpen={!!confirmingId}
            onClose={() => setConfirmingId(null)}
            onConfirm={async () => {
              if (!confirmingId) return;
              await fetch(`/api/training-session/${confirmingId}`, { method: "DELETE" });
              setConfirmingId(null);
              fetchSessions();
            }}
            message="¿Querés eliminar este registro de entrenamiento?"
          />
        </div>
      </main>
    </div>
  );
}
