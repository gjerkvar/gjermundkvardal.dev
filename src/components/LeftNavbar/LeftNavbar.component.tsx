import { NavLink } from "react-router-dom";
import "./LeftNavbar.css";
import ThemeToggle from "../ThemeToggle.component";
import { useState } from "react";

const LeftNavbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Toggle the navbar and blur effect
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Overlay to blur and darken background when navbar is open */}
      <div className={`overlay ${menuOpen ? 'show' : ''}`} onClick={toggleMenu}></div>

      {/* Hamburger button */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      {/* Navbar that slides in like a modal */}
      <div className={`left-navbar ${menuOpen ? 'open' : ''}`}>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>

      {/* Main content that gets blurred when the navbar is open */}
      <div className={`main-content ${menuOpen ? 'blurred' : ''}`}>
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default LeftNavbar;
