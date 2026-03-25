import { useEffect, useState } from "react";
import API from "../api/axios";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

const Analytics = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionPercentage: 0
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data } = await API.get("/tasks/analytics");
      setStats(data);
    };

    fetchAnalytics();
  }, []);

  const chartData = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending }
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Analytics</h2>

      <div className="analytics-box">
        <div className="bg-blue-100 p-4 rounded">
          <p>Total Tasks</p>
          <h3 className="text-2xl font-bold">{stats.total}</h3>
        </div>
        <div className="analytics-box">
          <p>Completed</p>
          <h3 className="text-2xl font-bold">{stats.completed}</h3>
        </div>
        <div className="analytics-box">
          <p>Pending</p>
          <h3 className="text-2xl font-bold">{stats.pending}</h3>
        </div>
        <div className="analytics-box">
          <p>Completion %</p>
          <h3 className="text-2xl font-bold">{stats.completionPercentage}%</h3>
        </div>
      </div>

      <PieChart width={300} height={250}>
        <Pie data={chartData} dataKey="value" outerRadius={80} label>
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Analytics;