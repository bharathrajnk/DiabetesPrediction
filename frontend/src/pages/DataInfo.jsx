import { motion } from 'framer-motion';
import { FaVenusMars, FaBirthdayCake, FaHeartbeat, FaLungs, FaSmoking, FaWeight, FaVial, FaTint } from 'react-icons/fa';

const featuresData = [
  {
    title: 'Gender',
    icon: FaVenusMars,
    definition: 'Biological sex of the patient.',
    healthyRange: 'N/A',
    importance: 'Certain types of diabetes and cardiovascular risks can vary based on gender due to hormonal and genetic factors.',
    color: 'text-pink-500'
  },
  {
    title: 'Age',
    icon: FaBirthdayCake,
    definition: 'Age of the patient in years.',
    healthyRange: '1 - 120 years',
    importance: 'Risk for Type 2 diabetes increases significantly as you get older, particularly after age 45.',
    color: 'text-yellow-500'
  },
  {
    title: 'Hypertension',
    icon: FaHeartbeat,
    definition: 'High blood pressure condition.',
    healthyRange: 'Under 120/80 mmHg',
    importance: 'Having high blood pressure is linked to an increased risk of developing type 2 diabetes and cardiovascular disease.',
    color: 'text-red-500'
  },
  {
    title: 'Heart Disease',
    icon: FaLungs,
    definition: 'History of heart-related medical conditions.',
    healthyRange: 'No history',
    importance: 'People with diabetes are twice as likely to have heart disease or a stroke than people without diabetes.',
    color: 'text-red-400'
  },
  {
    title: 'Smoking History',
    icon: FaSmoking,
    definition: 'Record of tobacco usage.',
    healthyRange: 'Never smoked',
    importance: 'Smokers are 30-40% more likely to develop type 2 diabetes than nonsmokers.',
    color: 'text-gray-400'
  },
  {
    title: 'BMI (Body Mass Index)',
    icon: FaWeight,
    definition: 'A measure of body fat based on height and weight.',
    healthyRange: '18.5 - 24.9',
    importance: 'Being overweight or obese is a primary risk factor for type 2 diabetes.',
    color: 'text-green-500'
  },
  {
    title: 'HbA1c Level',
    icon: FaVial,
    definition: 'Average blood sugar level over the past 2-3 months.',
    healthyRange: 'Below 5.7%',
    importance: 'Higher HbA1c levels indicate poorer blood sugar control and a higher risk of diabetes complications.',
    color: 'text-purple-500'
  },
  {
    title: 'Blood Glucose Level',
    icon: FaTint,
    definition: 'Amount of glucose (sugar) in the blood.',
    healthyRange: '70 - 99 mg/dL (fasting)',
    importance: 'Consistently high blood glucose levels are the primary indicator of diabetes and prediabetes.',
    color: 'text-blue-500'
  }
];

export default function DataInfo() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            Understanding the <span className="text-[var(--color-accent)]">Medical Data</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Learn about the health metrics used by our AI to predict your diabetes risk.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuresData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 hover:-translate-y-2 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300 border border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-4 border-b border-gray-700 pb-4">
                <div className={`p-3 rounded-lg bg-gray-800 ${item.color}`}>
                  <item.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
              
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <span className="font-semibold text-[var(--color-accent)] block mb-1">Definition:</span>
                  <p>{item.definition}</p>
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-accent)] block mb-1">Healthy Range:</span>
                  <p className="text-white font-medium bg-gray-800 inline-block px-2 py-1 rounded">{item.healthyRange}</p>
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-accent)] block mb-1">Medical Importance:</span>
                  <p className="text-gray-400 italic">{item.importance}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
