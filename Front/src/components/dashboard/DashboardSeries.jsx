const DashboardSeries = ({ refreshStats }) => {
  return (
    <div className="border border-blue-700 rounded-3xl p-8">
      <h2 className="text-3xl font-bold mb-6">Series</h2>

      <div className="flex gap-4">
        <button className="bg-green-700 px-5 py-2 rounded-xl">Agregar</button>

        <button className="border border-blue-700 px-5 py-2 rounded-xl">
          Administrar
        </button>
      </div>
    </div>
  );
};

export default DashboardSeries;
