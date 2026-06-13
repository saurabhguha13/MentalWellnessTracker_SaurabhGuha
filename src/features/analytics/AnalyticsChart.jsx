import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsChart = () => {
  const moodLogs = useSelector((state) => state.wellness.moodLogs);

  // Process data for the chart: group by date (last 7 days or just chronological)
  const data = [...moodLogs]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((log) => ({
      date: new Date(log.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      mood: log.mood,
    }));

  if (data.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>No mood data available to visualize. Start logging your mood!</p>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: 'var(--text-main)' }}
          />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="var(--primary)" 
            strokeWidth={4}
            dot={{ r: 6, fill: 'var(--primary)', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
