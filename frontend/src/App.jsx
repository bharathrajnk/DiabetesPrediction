import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DataInfo from './pages/DataInfo';
import Prediction from './pages/Prediction';
import Visualization from './pages/Visualization';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-info" element={<DataInfo />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer theme="dark" />
      </div>
    </Router>
  );
}

export default App;
