import Barcharts from "@/components/dashboard/Barcharts";
import DashboardMovies from "@/components/dashboard/DashboardMovies";
import DashboardSeries from "@/components/dashboard/DashboardSeries";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardUsers from "@/components/dashboard/DashboardUsers";
import SummaryChart from "@/components/dashboard/SummaryChart";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    movies: 0,
    series: 0,
    dislikes: 0,
    likes: 0,
    my_list: 0,
    engagement_rate: 0,
    approval_rate: 0,

    top_movies: [],
    top_series: [],
    top_movies_dislike: [],
    top_series_dislike: [],

    top_users: [],
    top_saved: [],
  });
  const summaryData = [
    { name: "Usuarios", value: stats.users },
    { name: "Películas", value: stats.movies },
    { name: "Series", value: stats.series },
    { name: "Likes", value: stats.likes },
    { name: "Dislikes", value: stats.dislikes },
    { name: "Mi Lista", value: stats.my_list },
  ];
  const approvalData = [
    { name: "Likes", value: stats.likes },
    { name: "Dislikes", value: stats.dislikes },
  ];

  const apiUrl = import.meta.env.VITE_API_URL;
  const getStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener estadísticas");
      }
      const data = await response.json();
      console.log(data);
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const usersData = stats.top_users.map((u) => ({
    name: `User ${u.user_id}`,
    actions: u.actions,
  }));

  const savedData = stats.top_saved.map((item) => ({
    name: item.title || `ID ${item.content_id}`,
    saved: item.saved,
  }));

  useEffect(() => {
    getStats();
  }, []);
  return (
    <section className="min-h-screen bg-black text-white px-10 py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <div className="text-5xl font-bold mb-12">Panel Administrador</div>
          <button
            onClick={() => setShowStatsModal(true)}
            className="bg-blue-600 hover:cursor-pointer hover:bg-blue-500 mb-5 text-white px-4 py-2 rounded"
          >
            Ver estadísticas
          </button>
          {showStatsModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-zinc-900 w-[90%] md:w-[80%] lg:w-[70%] h-[80vh] rounded-xl p-6 relative overflow-y-auto">
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="absolute top-3 right-3 text-white text-xl"
                >
                  ✕
                </button>

                <h2 className="text-white text-2xl font-bold mb-4">
                  📊 Estadísticas del sistema
                </h2>

                <div className="bg-zinc-800 p-4 rounded h-40 flex flex-col justify-center items-center">
                  <h3 className="text-white">Engagement (Actividad general)</h3>
                  <p className="text-3xl text-blue-400 font-bold">
                    {(stats.engagement_rate * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SummaryChart title={"Resumen General"} data={summaryData} />
                  <SummaryChart title={"LIKE VS DISLIKE"} data={approvalData} />
                  <Barcharts
                    title={"Top Usuarios"}
                    data={usersData}
                    dataKey="actions"
                    color="#3b82f6"
                    dataKeyX={"name"}
                  />
                  <Barcharts
                    title={"TOP SAVED"}
                    data={savedData}
                    dataKey="saved"
                    color="#a855f7"
                    dataKeyX={"name"}
                  />
                  <Barcharts
                    title={"Top Movies Likes"}
                    data={stats.top_movies}
                    dataKey="likes"
                    color="#22c55e"
                    dataKeyX={"title"}
                  />
                  <Barcharts
                    title={"Top Series Likes"}
                    data={stats.top_series}
                    dataKey="likes"
                    color="#22c55e"
                    dataKeyX={"title"}
                  />
                  <Barcharts
                    title={"Top Movies DisLikes"}
                    data={stats.top_movies_dislike}
                    dataKey="dislikes"
                    color="#ef4444"
                    dataKeyX={"title"}
                  />
                  <Barcharts
                    title={"Top Series DisLikes"}
                    data={stats.top_series_dislike}
                    dataKey="dislikes"
                    color="#ef4444"
                    dataKeyX={"title"}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <DashboardStats stats={stats} />
        <div className="grid grid-cols-1 gap-8 mt-10">
          <DashboardMovies refreshStats={getStats} />
          <DashboardSeries refreshStats={getStats} />
          <DashboardUsers refreshStats={getStats} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
