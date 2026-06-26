import DashboardMovies from "@/components/dashboard/DashboardMovies";
import DashboardSeries from "@/components/dashboard/DashboardSeries";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardUsers from "@/components/dashboard/DashboardUsers";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    movies: 0,
    series: 0,
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const getStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setStats(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);
  return (
    <section className="min-h-screen bg-black text-white px-10 py-2">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12">Panel Administrador</h1>
        <DashboardStats stats={stats}/>
        <div className="grid grid-cols-1 gap-8 mt-10">
          <DashboardMovies refreshStats={getStats}/>
          <DashboardSeries refreshStats={getStats}/>
        </div>
        <DashboardUsers refreshStats={getStats}/>
      </div>
    </section>
  );
};

export default Dashboard;
