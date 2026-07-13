import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaHeartbeat, FaMapMarkerAlt, FaEnvelope, FaPhone, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--color-card)] pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaHeartbeat className="text-[var(--color-accent)] text-3xl" />
              <span className="font-bold text-xl">DiabPredict</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Predict your diabetes risk using Machine Learning with accurate medical insights and interactive visualizations.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Home</Link></li>
              <li><Link to="/prediction" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Prediction</Link></li>
              <li><Link to="/visualization" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Visualization</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="mt-1 text-[var(--color-accent)]" />
                <span>123 Medical Center Blvd,<br/>Health City, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-[var(--color-accent)]" />
                <span>support@diabpredict.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaPhone className="text-[var(--color-accent)]" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white transition-all">
                <FaGithub />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white transition-all">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary)] hover:text-white transition-all">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DiabPredict. All rights reserved. Medical Disclaimer: This is for educational purposes.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-all animate-bounce"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
