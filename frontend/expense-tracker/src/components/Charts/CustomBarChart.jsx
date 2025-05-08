import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";
const CustomBarChart = ({ chartData }) => {
    const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "#cfbefb");
  
    if (!Array.isArray(chartData) || chartData.length === 0) {
      return <p className="text-gray-400 text-sm p-4">No income data available</p>;
    }
  
    return (
      <div className="bg-white mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid stroke="none" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} />
            <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#FF8042" radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  
  
export default CustomBarChart;