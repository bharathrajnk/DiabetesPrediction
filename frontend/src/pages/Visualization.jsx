import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { getStatistics, getChartsData } from '../services/api';
import { FaUserMd, FaHeartbeat, FaTint, FaWeight } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Visualization() {
  const [stats, setStats] = useState(null);
  const [chartsData, setChartsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartsRes] = await Promise.all([
          getStatistics(),
          getChartsData()
        ]);
        setStats(statsRes);
        setChartsData(chartsRes);
      } catch (error) {
        toast.error("Failed to load dashboard data. Ensure backend is running.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#2563EB', '#38BDF8', '#22C55E', '#EF4444', '#F59E0B', '#8B5CF6'];

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    );
  }

  if (!stats || !chartsData) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">No Data Available</h2>
        <p className="text-gray-400">Please make sure the backend server is running and dataset exists.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-extrabold text-white mb-2"
            >
              Analytics <span className="text-[var(--color-accent)]">Dashboard</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              Explore insights from our dataset of over 5000+ patient records.
            </motion.p>
          </div>
          <button 
            className="hidden sm:block px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors"
            onClick={() => window.print()}
          >
            Export Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Average BMI', value: stats.average_bmi, icon: FaWeight, color: 'text-green-400' },
            { label: 'Average Age', value: stats.average_age, icon: FaUserMd, color: 'text-yellow-400' },
            { label: 'Avg Glucose', value: stats.average_glucose, icon: FaTint, color: 'text-blue-400' },
            { label: 'Total Cases', value: stats.positive_cases + stats.negative_cases, icon: FaHeartbeat, color: 'text-pink-400' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl flex items-center justify-between border border-gray-700"
            >
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-4 bg-gray-800 rounded-xl ${stat.color}`}>
                <stat.icon className="text-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Age Distribution Area Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-2xl border border-gray-700 h-[400px]"
          >
            <h3 className="text-lg font-bold text-white mb-4">Age Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartsData.ageDistribution}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#374151', color: '#fff' }} />
                <Area type="monotone" dataKey="count" stroke="#38BDF8" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Gender Distribution Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-2xl border border-gray-700 h-[400px]"
          >
            <h3 className="text-lg font-bold text-white mb-4">Gender Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartsData.genderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartsData.genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#374151', color: '#fff' }} />
                <Legend wrapperStyle={{ color: '#9CA3AF' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Glucose Comparison Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass p-6 rounded-2xl border border-gray-700 h-[400px]"
          >
            <h3 className="text-lg font-bold text-white mb-4">Avg Glucose by Risk Level</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartsData.glucoseComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#374151', color: '#fff' }} />
                <Bar dataKey="glucose" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* BMI Comparison Line Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="glass p-6 rounded-2xl border border-gray-700 h-[400px]"
          >
            <h3 className="text-lg font-bold text-white mb-4">Avg BMI by Risk Level</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartsData.bmiComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={['dataMin - 2', 'dataMax + 2']} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: '#374151', color: '#fff' }} />
                <Line type="monotone" dataKey="bmi" stroke="#22C55E" strokeWidth={3} dot={{ r: 6, fill: '#22C55E' }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
