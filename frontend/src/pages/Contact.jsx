import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Simulate API call
    console.log(data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            Get In <span className="text-[var(--color-accent)]">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Have questions about our AI model or need medical support? We're here to help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-gray-700 hover:border-[var(--color-accent)] transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <FaMapMarkerAlt className="text-[var(--color-accent)] text-xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Location</h3>
                <p className="text-gray-400">123 Medical Center Blvd<br/>Health City, NY 10001</p>
              </div>
              
              <div className="glass p-6 rounded-2xl border border-gray-700 hover:border-[var(--color-accent)] transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <FaEnvelope className="text-[var(--color-accent)] text-xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                <p className="text-gray-400">support@diabpredict.com<br/>medical@diabpredict.com</p>
              </div>

              <div className="glass p-6 rounded-2xl border border-gray-700 hover:border-[var(--color-accent)] transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <FaPhone className="text-[var(--color-accent)] text-xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
              </div>

              <div className="glass p-6 rounded-2xl border border-gray-700 hover:border-[var(--color-accent)] transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <FaClock className="text-[var(--color-accent)] text-xl" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Working Hours</h3>
                <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM<br/>Emergency: 24/7</p>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="w-full h-64 bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 relative">
              <iframe 
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620839958178!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 bg-blue-900/20 pointer-events-none mix-blend-overlay"></div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 md:p-10 rounded-3xl border border-gray-700 h-full flex flex-col justify-center shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    {...register("name", { required: "Name is required" })}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.name.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input 
                    type="text" 
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    placeholder="How can we help you?"
                  />
                  {errors.subject && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.subject.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea 
                    {...register("message", { required: "Message is required" })}
                    rows="5"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                  {errors.message && <span className="text-[var(--color-danger)] text-xs mt-1 block">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 px-4 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white rounded-lg font-bold tracking-wide transition-colors shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
