import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend
);

export default function Dashboard() {

const [complaints, setComplaints] = useState<any[]>([]);
const navigate = useNavigate();

useEffect(() => {
fetchComplaints();
}, []);

async function fetchComplaints() {

const { data, error } = await supabase
.from("complaints")
.select("*")
.order("created_at", { ascending: false });

if (!error && data) {
setComplaints(data);
}

}

/* STATS */

const total = complaints.length;

const resolved = complaints.filter(
c => c.status === "Resolved"
).length;

const pending = complaints.filter(
c => c.status === "Pending"
).length;

const urgent = complaints.filter(
c => c.urgency === "High"
).length;


/* CATEGORY ANALYSIS */

const categoryMap:any = {};

complaints.forEach(c => {

if (!categoryMap[c.category]) {
categoryMap[c.category] = 0;
}

categoryMap[c.category]++;

});

const categoryChart = {
labels: Object.keys(categoryMap),
datasets: [
{
label: "Complaints by Category",
data: Object.values(categoryMap),
backgroundColor: "#f59e0b"
}
]
};


/* DEPARTMENT ANALYSIS */

const deptMap:any = {};

complaints.forEach(c => {

if (!deptMap[c.department]) {
deptMap[c.department] = 0;
}

deptMap[c.department]++;

});

const deptChart = {
labels: Object.keys(deptMap),
datasets: [
{
label: "Department Load",
data: Object.values(deptMap),
backgroundColor: "#3b82f6"
}
]
};


/* STATUS PIE */

const statusChart = {
labels: ["Resolved", "Pending"],
datasets: [
{
data: [resolved, pending],
backgroundColor: ["#22c55e", "#ef4444"]
}
]
};


return (

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Government Complaint Analytics Dashboard
</h1>

<button
onClick={() => navigate("/assistant")}
className="bg-purple-600 text-white px-4 py-2 rounded mb-6"
>
Open AI Assistant
</button>

<button
onClick={() => navigate("/map")}
className="bg-blue-600 text-white px-4 py-2 rounded mt-4 mb-6"
>
View Complaint Map
</button>


{/* STATS */}

<div className="grid grid-cols-4 gap-6 mb-10">

<div className="bg-white shadow p-6 rounded text-center">
<h2 className="text-3xl font-bold">{total}</h2>
<p>Total Complaints</p>
</div>

<div className="bg-white shadow p-6 rounded text-center">
<h2 className="text-3xl font-bold">{resolved}</h2>
<p>Resolved</p>
</div>

<div className="bg-white shadow p-6 rounded text-center">
<h2 className="text-3xl font-bold">{pending}</h2>
<p>Pending</p>
</div>

<div className="bg-white shadow p-6 rounded text-center">
<h2 className="text-3xl font-bold">{urgent}</h2>
<p>Urgent</p>
</div>

</div>


{/* CHARTS */}

<div className="grid grid-cols-2 gap-10 mb-10">

<div className="bg-white p-6 shadow rounded">
<h2 className="text-xl font-bold mb-4">
Complaints by Category
</h2>
<Bar data={categoryChart}/>
</div>

<div className="bg-white p-6 shadow rounded">
<h2 className="text-xl font-bold mb-4">
Complaint Status
</h2>
<Pie data={statusChart}/>
</div>

</div>


{/* DEPARTMENT LOAD */}

<div className="bg-white p-6 shadow rounded mb-10">

<h2 className="text-xl font-bold mb-4">
Department Complaint Load
</h2>

<Bar data={deptChart}/>

</div>


{/* TABLE */}

<div className="bg-white p-6 shadow rounded">

<h2 className="text-xl font-bold mb-4">
Recent Complaints
</h2>

<table className="w-full border">

<thead className="bg-gray-200">

<tr>
<th>ID</th>
<th>Title</th>
<th>Category</th>
<th>Department</th>
<th>Status</th>
<th>Urgency</th>
</tr>

</thead>

<tbody>

{complaints.map((c) => (

<tr key={c.id} className="text-center border">

<td>{c.id}</td>
<td>{c.title}</td>
<td>{c.category}</td>
<td>{c.department}</td>
<td>{c.status}</td>
<td>{c.urgency}</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}
