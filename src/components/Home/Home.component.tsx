import { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './Home.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle.component';

const Home: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  // Scroll handler to toggle the sticky state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100); // Set sticky after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      <h1 className="hero-text">Gjermund Kvardal</h1> {/* Hero Text */}
      <div className="typing-effect">
        <Typewriter
          words={['Web Developer', 'Frontend Enthusiast', 'Problem Solver']}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>

{/*       {/* Light/Dark mode toggle section, starts under the typewriter }
      <div className={`theme-mode-section ${isSticky ? 'sticky-toggle' : ''}`}>
        <p className="theme-mode-text">Do you want to view me in dark or light mode?</p>
        <ThemeToggle />
      </div> */}
    </div>
  );
};

export default Home;
