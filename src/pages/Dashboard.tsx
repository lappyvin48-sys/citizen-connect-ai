import { FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Star, ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatsCard from '@/components/StatsCard';
import ComplaintCard from '@/components/ComplaintCard';
import { dashboardStats, mockComplaints, categoryDistribution, weeklyTrend } from '@/lib/mockData';

const Dashboard = () => (
  <div className="mx-auto max-w-7xl px-4 py-8">
    <div className="mb-8">
      <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Overview of grievance resolution metrics</p>
    </div>

    {/* Stats */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Complaints" value={dashboardStats.total} icon={FileText} trend="+12% this week" />
      <StatsCard title="Open" value={dashboardStats.open} icon={Clock} variant="accent" />
      <StatsCard title="Resolved" value={dashboardStats.resolved} icon={CheckCircle} variant="success" trend="↑ 8%" />
      <StatsCard title="Escalated" value={dashboardStats.escalated} icon={AlertTriangle} variant="urgent" />
    </div>

    <div className="mt-4 grid gap-4 sm:grid-cols-3">
      <StatsCard title="Avg Resolution" value={`${dashboardStats.avgResolutionDays} days`} icon={TrendingUp} />
      <StatsCard title="Satisfaction" value={`${dashboardStats.satisfactionRate}%`} icon={Star} variant="accent" />
      <StatsCard title="Corruption Flags" value={dashboardStats.corruptionFlags} icon={ShieldAlert} variant="urgent" />
    </div>

    {/* Charts */}
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="font-display text-sm font-semibold text-card-foreground">Weekly Trend</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,88%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="complaints" fill="hsl(38,92%,50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="hsl(152,60%,40%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="font-display text-sm font-semibold text-card-foreground">By Category</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {categoryDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Recent */}
    <div className="mt-8">
      <h2 className="font-display text-lg font-semibold text-foreground">Recent Complaints</h2>
      <div className="mt-4 space-y-3">
        {mockComplaints.map(c => <ComplaintCard key={c.id} complaint={c} />)}
      </div>
    </div>
  </div>
);

export default Dashboard;
