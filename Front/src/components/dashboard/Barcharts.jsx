import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Barcharts = ({ title, data, dataKey, color, dataKeyX}) => {
  console.log(data);

  return (
    <div className="bg-zinc-800 p-4 rounded h-80">
      <h3 className="text-white mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data || []}>
          <XAxis
            dataKey={dataKeyX}
            tick={{ fill: "white", fontSize: 8 }}
            interval={0}
            angle={-20}
            textAnchor="end"
          />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barcharts;
