'use client';
import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import NuevoRegistroModal from "@/components/modals/NuevoRegistroModal";
import ConfirmDialog from "@/components/modals/ConfirmDialog";

type TrainingSession = {
  _id: string;
  date: string;
  exercise: string;
  duration?: number;
  hits?: number;
};

export default function DashboardPage() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

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

  const groupedByDate = groupByDate(sessions);

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">Tu historial</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold"
          >
            + Añadir registro
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Cargando sesiones...</p>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="bg-white/10 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-md">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-xl font-semibold text-white mb-2">Sin registros todavía</h2>
              <p className="text-sm text-gray-300 mb-4">
                Comenzá tu entrenamiento y registra tu progreso día a día.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
              >
                + Añadir tu primera sesión
              </button>
            </div>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([date, dateSessions]) => {
            const exercises: { [exercise: string]: TrainingSession[] } = {};
            dateSessions.forEach((s) => {
              if (!exercises[s.exercise]) exercises[s.exercise] = [];
              exercises[s.exercise].push(s);
            });

            return (
              <div key={date} className="mb-12">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">{date}</h2>

                {Object.entries(exercises).map(([exercise, entries]) => {
                  const isOpen = openStates[`${date}-${exercise}`] ?? true;

                  const toggle = () =>
                    setOpenStates((prev) => ({
                      ...prev,
                      [`${date}-${exercise}`]: !isOpen,
                    }));

                  const sorted = entries.sort(
                    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                  );

                  const best =
                    exercise === "Bots Hard"
                      ? entries.reduce((max, s) => (s.hits ?? 0) > (max.hits ?? 0) ? s : max)
                      : entries.reduce((min, s) => (s.duration ?? Infinity) < (min.duration ?? Infinity) ? s : min);

                  return (
                    <div key={exercise} className="mb-6 rounded-xl bg-white/5 border border-white/10 shadow-inner backdrop-blur-sm overflow-hidden">
                      <button
                        onClick={toggle}
                        className="w-full px-5 py-3 flex justify-between items-center text-left font-semibold text-blue-300 bg-white/5 hover:bg-white/10 transition"
                      >
                        <span>{exercise}</span>
                        <span className="text-sm text-gray-400">
                          {isOpen ? "▲ Ocultar" : "▼ Mostrar"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="overflow-auto">
                          <table className="min-w-full table-fixed text-sm text-gray-300">
                            <thead className="bg-white/10">
                              <tr>
                                <th className="p-3 text-center w-8">#</th>
                                <th className="p-3 text-left">Duración / Hits</th>
                                <th className="p-3 text-right w-24">Acciones</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                              {sorted.map((s, i) => (
                                <tr
                                  key={s._id}
                                  className={`hover:bg-white/5 transition ${
                                    s._id === best._id ? "bg-blue-500/10" : ""
                                  }`}
                                >
                                  <td className="p-3 text-center text-gray-400 whitespace-nowrap">{i + 1}.</td>
                                  <td className="p-3 flex items-center gap-2">
                                    {s.exercise === "Bots Hard"
                                      ? `${s.hits} bots acertados`
                                      : `${s.duration} seg`}
                                    {s._id === best._id && (
                                      <span className="text-yellow-400 text-xs bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-full font-semibold">
                                        🏆 Mejor marca
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3 text-right">
                                    <button
                                      onClick={() => setConfirmingId(s._id)}
                                      className="text-red-400 hover:text-red-600 text-sm"
                                    >
                                      Eliminar
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })
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
      </main>
    </div>
  );
}
