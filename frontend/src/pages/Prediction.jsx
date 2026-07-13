import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PredictionForm from '../components/PredictionForm';
import { predictRisk } from '../services/api';
import { FaHeartbeat, FaExclamationTriangle, FaCheckCircle, FaStethoscope } from 'react-icons/fa';

export default function Prediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await predictRisk(data);
      setResult(response);
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to predict risk. Ensure backend is running.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const isHighRisk = result.prediction === "High Risk";
    const circleColor = isHighRisk ? "text-[var(--color-danger)]" : "text-[var(--color-success)]";
    const bgGlow = isHighRisk ? "shadow-[0_0_30px_rgba(239,68,68,0.3)]" : "shadow-[0_0_30px_rgba(34,197,94,0.3)]";

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mt-12 glass p-8 rounded-3xl ${bgGlow} border border-gray-700`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Analysis Result</h2>
          <p className="text-gray-400">Based on our Machine Learning model assessment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-center justify-center">
            {/* Circular Progress (Gauge) */}
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="stroke-gray-700" strokeWidth="10" fill="none" />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  className={`stroke-current ${circleColor}`}
                  strokeWidth="10" 
                  fill="none"
                  strokeDasharray={`${parseInt(result.risk) * 2.82} 282`} // 2 * PI * r
                  initial={{ strokeDasharray: "0 282" }}
                  animate={{ strokeDasharray: `${parseInt(result.risk) * 2.82} 282` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white">{result.risk}</span>
                <span className="text-sm text-gray-400">Risk</span>
              </div>
            </div>

            <div className={`text-2xl font-bold flex items-center space-x-2 ${isHighRisk ? 'text-red-400' : 'text-green-400'}`}>
              {isHighRisk ? <FaExclamationTriangle /> : <FaCheckCircle />}
              <span>{result.prediction}</span>
            </div>
            <div className="mt-2 text-gray-400 text-sm">
              Confidence Score: <span className="text-white font-semibold">{result.confidence}</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <FaStethoscope className="mr-2 text-[var(--color-accent)]" /> 
              Medical Suggestions
            </h3>
            <ul className="space-y-4">
              {result.suggestions.map((suggestion, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3 bg-gray-800 p-4 rounded-xl border border-gray-700"
                >
                  <FaHeartbeat className="mt-1 text-[var(--color-accent)] flex-shrink-0" />
                  <span className="text-gray-300">{suggestion}</span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-background)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            Predict Your <span className="text-[var(--color-accent)]">Risk Status</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Enter your health metrics below to receive a personalized, AI-driven assessment of your diabetes risk.
          </motion.p>
        </div>

        <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />

        {renderResult()}

      </div>
    </div>
  );
}
