import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Home() {

  const [complaint, setComplaint] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyzeComplaint = () => {

    const text = complaint.toLowerCase();

    let category = "General";
    let department = "Municipal Office";
    let urgency = "Low";

    if (text.includes("water")) {
      category = "Water";
      department = "Water Department";
      urgency = "Medium";
    }

    if (text.includes("road")) {
      category = "Road Damage";
      department = "Roads Department";
      urgency = "High";
    }

    if (text.includes("garbage")) {
      category = "Sanitation";
      department = "Sanitation Department";
    }

    setResult({ category, department, urgency });
  };

  const chartData = {
    labels: ["Water", "Road", "Garbage", "Electricity"],
    datasets: [
      {
        label: "Complaints",
        data: [12, 19, 8, 5],
        backgroundColor: "#f59e0b"
      }
    ]
  };

  return (
    <div>

      {/* HERO */}
      <section className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Citizen Grievance Resolution Portal
        </h1>
        <p className="text-xl mb-6">
          AI-powered complaint categorization and routing
        </p>

        <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg mr-4">
          File Complaint
        </button>

        <button className="bg-white text-black px-6 py-3 rounded-lg">
          Track Complaint
        </button>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-4 gap-6 p-10 text-center">

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-3xl font-bold">128</h2>
          <p>Complaints Today</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-3xl font-bold">94</h2>
          <p>Resolved</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-3xl font-bold">12</h2>
          <p>Departments</p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-3xl font-bold">3.2h</h2>
          <p>Avg Response</p>
        </div>

      </section>

      {/* AI DEMO */}
      <section className="p-10 bg-gray-100">

        <h2 className="text-3xl font-bold mb-4">
          Try AI Complaint Analyzer
        </h2>

        <textarea
          className="w-full p-4 border rounded mb-4"
          rows={4}
          placeholder="Example: Water pipe broken near metro station"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />

        <button
          onClick={analyzeComplaint}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Analyze Complaint
        </button>

        {result && (
          <div className="mt-6 bg-white p-6 shadow rounded">

            <p><b>Category:</b> {result.category}</p>
            <p><b>Department:</b> {result.department}</p>
            <p><b>Urgency:</b> {result.urgency}</p>

          </div>
        )}

      </section>

      {/* ANALYTICS */}
      <section className="p-10">

        <h2 className="text-3xl font-bold mb-6">
          Complaint Analytics
        </h2>

        <Bar data={chartData} />

      </section>

    </div>
  );
}