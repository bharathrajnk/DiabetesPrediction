import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function PredictionForm({ onSubmit, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass p-8 rounded-2xl w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Patient Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
          <select 
            {...register("gender", { required: "Gender is required" })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
          >
            <option value="">Select Gender</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
          {errors.gender && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.gender.message}</span>}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
          <input 
            type="number" 
            {...register("age", { 
              required: "Age is required",
              min: { value: 1, message: "Minimum age is 1" },
              max: { value: 120, message: "Maximum age is 120" }
            })}
            placeholder="e.g. 45"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)]"
          />
          {errors.age && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.age.message}</span>}
        </div>

        {/* Hypertension */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Hypertension</label>
          <select 
            {...register("hypertension", { required: "This field is required" })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)]"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          {errors.hypertension && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.hypertension.message}</span>}
        </div>

        {/* Heart Disease */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Heart Disease</label>
          <select 
            {...register("heart_disease", { required: "This field is required" })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)]"
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          {errors.heart_disease && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.heart_disease.message}</span>}
        </div>

        {/* Smoking History */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Smoking History</label>
          <select 
            {...register("smoking_history", { required: "This field is required" })}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)]"
          >
            <option value="">Select</option>
            <option value="0">Never</option>
            <option value="1">Former</option>
            <option value="2">Current</option>
          </select>
          {errors.smoking_history && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.smoking_history.message}</span>}
        </div>

        {/* BMI */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">BMI</label>
          <input 
            type="number" step="0.1"
            {...register("bmi", { 
              required: "BMI is required",
              min: { value: 10, message: "Minimum BMI is 10" },
              max: { value: 60, message: "Maximum BMI is 60" }
            })}
            placeholder="e.g. 25.5"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)]"
          />
          {errors.bmi && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.bmi.message}</span>}
        </div>

        {/* HbA1c Level */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">HbA1c Level</label>
          <input 
            type="number" step="0.1"
            {...register("hba1c_level", { 
              required: "HbA1c is required",
              min: { value: 3, message: "Minimum is 3" },
              max: { value: 15, message: "Maximum is 15" }
            })}
            placeholder="e.g. 5.5"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)]"
          />
          {errors.hba1c_level && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.hba1c_level.message}</span>}
        </div>

        {/* Blood Glucose Level */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Blood Glucose Level</label>
          <input 
            type="number"
            {...register("blood_glucose_level", { 
              required: "Blood Glucose is required",
              min: { value: 50, message: "Minimum is 50" },
              max: { value: 400, message: "Maximum is 400" }
            })}
            placeholder="e.g. 100"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)]"
          />
          {errors.blood_glucose_level && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.blood_glucose_level.message}</span>}
        </div>
        
      </div>

      <div className="mt-8">
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:from-[var(--color-accent)] hover:to-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Predicting Risk...
            </div>
          ) : "Predict Risk"}
        </button>
      </div>
    </motion.form>
  );
}
