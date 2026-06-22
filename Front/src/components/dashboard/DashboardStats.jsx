

const DashboardStats = ({ stats }) => {
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="border border-blue-700 rounded-3xl p-8">
        <h3 className="text-gray-400">Usuarios</h3>
        <p className="text-5xl font-bold"> {stats.users}</p>
      </div>
      <div className="border border-blue-700 rounded-3xl p-8">
        <h3 className="text-gray-400">Películas</h3>
        <p className="text-5xl font-bold">{stats.movies}</p>
      </div>
      <div className="border border-blue-700 rounded-3xl p-8">
        <h3 className="text-gray-400">Series</h3>
        <p className="text-5xl font-bold">{stats.series}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
