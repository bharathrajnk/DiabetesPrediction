import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

const faqs = [
  {
    question: "What is Diabetes?",
    answer: "Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy. Your body either doesn't make enough insulin or can't use the insulin it makes as well as it should."
  },
  {
    question: "How accurate is the prediction?",
    answer: "Our Machine Learning model (Random Forest Classifier) has been trained on over 5000+ patient records and achieves an accuracy of approximately 98%. However, this is for informational purposes only and should not replace professional medical advice."
  },
  {
    question: "What data is required for prediction?",
    answer: "We require basic health metrics including Age, Gender, BMI, Hypertension history, Heart Disease history, Smoking History, HbA1c Level, and Fasting Blood Glucose Level."
  },
  {
    question: "Can I trust this prediction?",
    answer: "While our AI provides highly accurate risk assessments based on medical data patterns, it is a screening tool, not a diagnostic tool. Always consult a healthcare professional for a clinical diagnosis."
  },
  {
    question: "Is my data stored securely?",
    answer: "Yes. Your privacy is our priority. We process your data in real-time for prediction and do not store your personal identifiable medical data on our servers without explicit consent."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            Frequently Asked <span className="text-[var(--color-accent)]">Questions</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-xl mx-auto mt-8"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-600 rounded-xl leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] sm:text-lg transition-colors"
            />
          </motion.div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No matching questions found.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl overflow-hidden border border-gray-700"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-[var(--color-accent)]" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5 text-gray-400 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
        
        <div className="mt-12 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-center">
          <p className="text-red-400 text-sm italic">
            <strong>Medical Disclaimer:</strong> The DiabPredict system is designed for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding any medical condition.
          </p>
        </div>

      </div>
    </div>
  );
}
