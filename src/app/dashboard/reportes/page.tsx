'use client';

import { useEffect, useState } from "react";
import { FiTarget, FiClock, FiTrendingUp } from 'react-icons/fi';
import Navbar from "@/components/layout/Navbar";
import type { TrainingSession } from "@/types/training";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

interface DailyStats {
  date: string;
  averageTime: number;
  totalSessions: number;
  bestTime: number;
}

export default function ReportesPage() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch("/api/training-session");
      const data = await res.json();
      setSessions(data);
      setLoading(false);
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      const stats = calculateDailyStats(sessions);
      setDailyStats(stats);
    }
  }, [sessions]);

  const calculateDailyStats = (data: TrainingSession[]): DailyStats[] => {
    const dailyData: { [date: string]: TrainingSession[] } = {};

    // Agrupar sesiones por fecha (usando fecha ISO para ordenar)
    data.forEach((session) => {
      const dateISO = new Date(session.date).toISOString().split('T')[0];
      if (!dailyData[dateISO]) dailyData[dateISO] = [];
      dailyData[dateISO].push(session);
    });

    // Calcular estadísticas diarias
    return Object.entries(dailyData).map(([date, sessions]) => {
      const botSessions = sessions.filter(s => s.exercise === "Bots x100" && s.duration);
      const averageTime = botSessions.length > 0
        ? botSessions.reduce((acc, s) => acc + (s.duration || 0), 0) / botSessions.length
        : 0;
      const bestTime = Math.min(...botSessions.map(s => s.duration || Infinity));

      return {
        date, // ISO
        averageTime,
        totalSessions: sessions.length,
        bestTime: bestTime === Infinity ? 0 : bestTime
      };
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-8 lg:px-20 xl:px-32">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-100 mb-2">Reportes</h1>
            <p className="text-zinc-400">Análisis detallado de tu progreso y rendimiento</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-400"></div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center">
              <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800">
                <div className="text-5xl mb-4">📊</div>
                <h2 className="text-xl font-semibold text-zinc-100 mb-2">Sin datos para mostrar</h2>
                <p className="text-sm text-zinc-400 mb-4">
                  Comenzá a registrar tus sesiones para ver tus estadísticas.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-zinc-800 rounded-lg p-2">
                      <FiClock className="w-5 h-5 text-zinc-300" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-100">Tiempo Promedio</h3>
                  </div>
                  <p className="text-3xl font-bold text-zinc-100">
                    {Math.round(dailyStats[dailyStats.length - 1]?.averageTime || 0)} seg
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Último día registrado</p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-zinc-800 rounded-lg p-2">
                      <FiTarget className="w-5 h-5 text-zinc-300" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-100">Mejor Tiempo</h3>
                  </div>
                  <p className="text-3xl font-bold text-zinc-100">
                    {Math.round(dailyStats[dailyStats.length - 1]?.bestTime || 0)} seg
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Último día registrado</p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-zinc-800 rounded-lg p-2">
                      <FiTrendingUp className="w-5 h-5 text-zinc-300" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-100">Sesiones Totales</h3>
                  </div>
                  <p className="text-3xl font-bold text-zinc-100">
                    {dailyStats[dailyStats.length - 1]?.totalSessions || 0}
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Último día registrado</p>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-zinc-800 rounded-lg p-2">
                    <FiTarget className="w-5 h-5 text-zinc-300" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-100">Progreso Diario</h3>
                </div>
                <p className="text-xs text-zinc-500 mb-6 ml-12">Estadísticas de <span className="font-semibold text-zinc-200">Bots x100</span> (tiempo promedio y mejor tiempo por día)</p>
                <div className="h-[400px] px-6 pb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={dailyStats}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#a1a1aa"
                        tick={{ fill: '#a1a1aa' }}
                        tickLine={{ stroke: '#27272a' }}
                        tickFormatter={(iso) => {
                          const d = new Date(iso);
                          return d.toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: '2-digit',
                          });
                        }}
                      />
                      <YAxis 
                        stroke="#a1a1aa"
                        tick={{ fill: '#a1a1aa' }}
                        tickLine={{ stroke: '#27272a' }}
                        label={{ 
                          value: 'Tiempo (segundos)', 
                          angle: -90, 
                          position: 'insideLeft',
                          fill: '#a1a1aa'
                        }}
                        domain={[70, 0]}
                        reversed={true}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#18181b',
                          border: '1px solid #27272a',
                          borderRadius: '0.5rem',
                          color: '#f4f4f5'
                        }}
                        labelStyle={{ color: '#a1a1aa' }}
                      />
                      <Legend 
                        wrapperStyle={{
                          paddingTop: '20px',
                          color: '#a1a1aa'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="averageTime"
                        name="Tiempo Promedio"
                        stroke="#f4f4f5"
                        strokeWidth={2}
                        dot={{ fill: '#f4f4f5', strokeWidth: 2 }}
                        activeDot={{ r: 8, fill: '#f4f4f5' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="bestTime"
                        name="Mejor Tiempo"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', strokeWidth: 2, fillOpacity: 0.5 }}
                        activeDot={{ r: 8, fill: '#ef4444', fillOpacity: 0.7 }}
                      />
                      <ReferenceLine y={85} stroke="#f59e42" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'TenZ (85s)', position: 'right', fill: '#f59e42', fontSize: 12, opacity: 0.7 }} />
                      <ReferenceLine y={87} stroke="#38bdf8" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'yay (87s)', position: 'right', fill: '#38bdf8', fontSize: 12, opacity: 0.7 }} />
                      <ReferenceLine y={82} stroke="#f43f5e" strokeDasharray="3 3" strokeOpacity={0.5} label={{ value: 'Top 0.001% (82s)', position: 'right', fill: '#f43f5e', fontSize: 12, opacity: 0.7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 