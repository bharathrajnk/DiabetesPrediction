import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChartLine, FaRobot, FaStethoscope, FaShieldAlt, FaMobileAlt, FaBolt, FaArrowRight, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const stats = [
  { id: 1, name: 'Accuracy', value: '98%' },
  { id: 2, name: 'Predictions', value: '5000+' },
  { id: 3, name: 'Trusted by', value: 'Doctors' },
  { id: 4, name: 'Analysis', value: 'Fast' },
];

const features = [
  { name: 'AI Prediction', description: 'Advanced ML algorithms for precise risk assessment.', icon: FaRobot },
  { name: 'Instant Analysis', description: 'Get results in milliseconds with real-time processing.', icon: FaBolt },
  { name: 'Data Visualization', description: 'Comprehensive charts and graphs for better understanding.', icon: FaChartLine },
  { name: 'Medical Suggestions', description: 'Personalized recommendations based on your risk profile.', icon: FaStethoscope },
  { name: 'Responsive Design', description: 'Works seamlessly across all your devices.', icon: FaMobileAlt },
  { name: 'Highly Secure', description: 'Your medical data is processed securely and privately.', icon: FaShieldAlt },
];

const testimonials = [
  {
    id: 1,
    content: "This prediction system is remarkably accurate and provides great preliminary insights for our patients.",
    author: "Dr. Sarah Jenkins",
    role: "Endocrinologist",
    hospital: "City General Hospital",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    content: "A fantastic tool for early detection. The visualizations make it easy to explain risks to patients.",
    author: "Dr. Michael Chen",
    role: "General Practitioner",
    hospital: "Wellness Clinic",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    content: "The personalized suggestions are exactly what patients need to start their journey to better health.",
    author: "Dr. Emily Rodriguez",
    role: "Chief Medical Officer",
    hospital: "HealthFirst Center",
    image: "https://images.unsplash.com/photo-1594824436998-d50d0322c366?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[var(--color-background)] to-[var(--color-card)] py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 bg-[var(--color-primary)] blur-[120px] rounded-full mix-blend-screen"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              AI Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)]">Diabetes Prediction</span> System
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300"
            >
              Predict your diabetes risk using Machine Learning with accurate medical insights and interactive visualizations.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex justify-center gap-4 flex-col sm:flex-row"
            >
              <Link to="/prediction" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]">
                Get Prediction <FaArrowRight className="ml-2" />
              </Link>
              <Link to="/data-info" className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-800 transition-colors">
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[var(--color-card)] border-y border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-extrabold text-[var(--color-accent)]">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-gray-400 uppercase tracking-wide">{stat.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-[var(--color-accent)] font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              A better way to assess health risks
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-secondary)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] transition-colors">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.name}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className="py-24 bg-[var(--color-card)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white">Trusted by Medical Professionals</h2>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
              <motion.div 
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="glass p-8 md:p-12 rounded-3xl text-center"
              >
                <div className="flex justify-center mb-6 text-[#FBBF24]">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-xl mx-1" />)}
                </div>
                <p className="text-xl md:text-2xl italic text-gray-300 mb-8">"{testimonials[currentTestimonial].content}"</p>
                <div className="flex flex-col items-center">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].author}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-[var(--color-accent)]"
                  />
                  <h4 className="text-lg font-bold text-white">{testimonials[currentTestimonial].author}</h4>
                  <p className="text-[var(--color-accent)]">{testimonials[currentTestimonial].role}</p>
                  <p className="text-gray-400 text-sm">{testimonials[currentTestimonial].hospital}</p>
                </div>
              </motion.div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-colors"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
