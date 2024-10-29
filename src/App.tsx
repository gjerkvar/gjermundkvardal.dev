import { useEffect, useState, useRef } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
import Home from './components/Home/Home.component';
import About from './components/About/About.component';
import Projects from './components/Projects/Projects.component';
import Contact from './components/Contact.component';
import ThemeToggle from './components/ThemeToggle/ThemeToggle.component';
import './App.css';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard.component';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin.component';

// Debounce function to limit how often the scroll event fires
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
};

function App() {
  const [isSticky, setIsSticky] = useState(false);
  const themeToggleRef = useRef<HTMLDivElement>(null);
  const stickyThreshold = 800;

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > stickyThreshold && !isSticky) {
        setIsSticky(true);
      } else if (scrollPosition <= stickyThreshold && isSticky) {
        setIsSticky(false);
      }
    }, 50);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} />} />
      </Routes>
      
      <div className="portfolio-container">
        <main className="content">
          <section id="home">
            <Home />
            <p>Do you want to view the page in dark or light mode?</p>
            <div 
              ref={themeToggleRef} 
              className={`theme-toggle-container ${isSticky ? 'sticky-toggle' : ''}`}
            >
              <ThemeToggle />
            </div>
          </section>
          <section id="about">
            <About />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
