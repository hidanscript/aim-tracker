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

    return {
      totalSessions,
      weeklySessions,
      totalTime,
      bestHits,
      bestTime,
      weeklyTrend: weeklySessions > 0 ? ((weeklySessions / totalSessions) * 100) : 0
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <Navbar />
      
      <main className="p-6 lg:px-16 xl:px-24 lg:py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-medium text-white/90">Dashboard</h1>
              <p className="text-sm text-white/50 mt-1">Seguimiento de entrenamiento</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative group inline-flex items-center gap-2 transition-transform active:scale-95"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-white/15 transition duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                <FiPlus className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold">
                  Nueva sesión
                </span>
              </div>
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8">
                  <div className="text-5xl mb-4">🎯</div>
                  <h2 className="text-xl font-semibold text-white mb-2">Sin registros todavía</h2>
                  <p className="text-sm text-gray-300 mb-4">
                    Comenzá tu entrenamiento y registra tu progreso día a día.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/15 transition duration-200">
                      + Añadir tu primera sesión
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <StatsCard
                  title="Total de sesiones"
                  value={stats.totalSessions}
                  icon={<FiActivity className="w-4 h-4" />}
                  trend={{ value: stats.weeklyTrend, isPositive: true }}
                />
                <StatsCard
                  title="Sesiones esta semana"
                  value={stats.weeklySessions}
                  icon={<FiClock className="w-4 h-4" />}
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

              <div className="space-y-6">
                {Object.entries(groupedByDate).map(([date, dateSessions]) => {
                  const exercises: { [exercise: string]: TrainingSession[] } = {};
                  dateSessions.forEach((s) => {
                    if (!exercises[s.exercise]) exercises[s.exercise] = [];
                    exercises[s.exercise].push(s);
                  });

                  return (
                    <div key={date} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-200"></div>
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-white/10">
                          <h2 className="text-xl font-semibold text-blue-300">{date}</h2>
                        </div>
                        <div className="divide-y divide-white/10">
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
                                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <h3 className="text-sm font-medium text-gray-400">{exercise}</h3>
                                    <span className="text-xs text-gray-500">({entries.length} sesiones)</span>
                                  </div>
                                  {isExpanded ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                                </button>
                                
                                {isExpanded && (
                                  <div className="px-6 pb-6">
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="text-left text-gray-400 border-b border-white/10">
                                            <th className="pb-3 font-medium w-12">#</th>
                                            <th className="pb-3 font-medium">Duración / Hits</th>
                                            <th className="pb-3 font-medium">Dificultad</th>
                                            <th className="pb-3 font-medium">Notas</th>
                                            <th className="pb-3 font-medium text-right">Acciones</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                          {sorted.map((session, index) => (
                                            <tr
                                              key={session._id}
                                              className={`group/row hover:bg-white/5 transition-colors ${
                                                session._id === best._id ? 'bg-blue-500/5' : ''
                                              }`}
                                            >
                                              <td className="py-3 text-gray-400">
                                                {index + 1}.
                                              </td>
                                              <td className="py-3">
                                                <div className="flex items-center gap-2">
                                                  <span className="text-white">
                                                    {session.exercise === "Bots Hard"
                                                      ? `${session.hits} bots acertados`
                                                      : `${session.duration} seg`}
                                                  </span>
                                                  {session._id === best._id && (
                                                    <span className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-400/20">
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
                                                          i < (session.difficulty ?? 0) ? 'bg-blue-400' : 'bg-white/10'
                                                        }`}
                                                      />
                                                    ))}
                                                  </div>
                                                )}
                                              </td>
                                              <td className="py-3">
                                                {session.notes ? (
                                                  <span className="text-gray-300 text-sm">{session.notes}</span>
                                                ) : (
                                                  <span className="text-gray-500 text-sm italic">Sin notas</span>
                                                )}
                                              </td>
                                              <td className="py-3 text-right">
                                                <button
                                                  onClick={() => setConfirmingId(session._id)}
                                                  className="text-red-400/70 hover:text-red-400 transition-colors opacity-0 group-hover/row:opacity-100"
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
