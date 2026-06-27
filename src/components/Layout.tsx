import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    setFormattedDate(now.toLocaleDateString('en-US', options));
  }, []);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-to-content" style={{ display: 'none' }}>
        Skip to main content
      </a>

      {/* Header Section */}
      <header className="header" role="banner">
        <div className="header-container">
          <Link to="/" className="logo-container" aria-label="KITEMU JUNIOR SCHOOL Home" onClick={closeMenu}>
            <div className="logo-text">
              <h3>KITEMU JUNIOR SCHOOL</h3>
              <span>Will Creates Way</span>
            </div>
          </Link>
          
          <button 
            className="menu-toggle" 
            onClick={toggleMenu} 
            aria-label="Toggle navigation menu" 
            aria-expanded={isMobileMenuOpen}
          >
            ☰
          </button>
          
          <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`} role="navigation" aria-label="Main navigation">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu} end>
              <i className="fas fa-home" aria-hidden="true"></i> Home
            </NavLink>
            <NavLink to="/academics" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <i className="fas fa-graduation-cap" aria-hidden="true"></i> Academics
            </NavLink>
            <NavLink to="/admissions" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <i className="fas fa-sign-in-alt" aria-hidden="true"></i> Admissions
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <i className="fas fa-images" aria-hidden="true"></i> Gallery
            </NavLink>
            <NavLink to="/donations" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <i className="fas fa-heart" aria-hidden="true"></i> Donations
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <i className="fas fa-info-circle" aria-hidden="true"></i> About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              <i className="fas fa-address-book" aria-hidden="true"></i> Contact
            </NavLink>
            
            <NavLink to="/admin" className="login-btn" onClick={closeMenu}>
              <i className="fas fa-user-shield"></i> Admin
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" style={{ flex: '1 0 auto' }}>
        {children}
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Kitemu Junior School</h3>
            <p style={{ marginBottom: '15px' }}>
              Excellence in Education. We are committed to providing holistic, quality education that empowers students from Nursery to P.7.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon facebook" title="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon twitter" title="Twitter/X"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="social-icon whatsapp" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" onClick={closeMenu}><i className="fas fa-chevron-right"></i> Home</Link></li>
              <li><Link to="/academics" onClick={closeMenu}><i className="fas fa-chevron-right"></i> Academics</Link></li>
              <li><Link to="/admissions" onClick={closeMenu}><i className="fas fa-chevron-right"></i> Admissions</Link></li>
              <li><Link to="/gallery" onClick={closeMenu}><i className="fas fa-chevron-right"></i> Gallery</Link></li>
              <li><Link to="/donations" onClick={closeMenu}><i className="fas fa-chevron-right"></i> Donations</Link></li>
              <li><Link to="/about" onClick={closeMenu}><i className="fas fa-chevron-right"></i> About Us</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact Information</h3>
            <p style={{ marginBottom: '10px' }}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: '10px', color: 'var(--gold)' }}></i>
              Kitemu - Kivu, Kyengera Town Council
            </p>
            <p style={{ marginBottom: '10px' }}>
              <i className="fas fa-phone" style={{ marginRight: '10px', color: 'var(--gold)' }}></i>
              0703207764 / 0704546178 / 0764706187
            </p>
            <p>
              <i className="fas fa-clock" style={{ marginRight: '10px', color: 'var(--gold)' }}></i>
              Mon - Fri: 8:00 AM - 5:00 PM
            </p>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Kitemu Junior School. All Rights Reserved.</p>
          <p style={{ fontSize: '0.8rem', color: '#b0cbb0', marginTop: '5px' }}>
            "Will Creates Way"
          </p>
          <p style={{ fontSize: '0.8rem', color: '#b0cbb0', marginTop: '5px' }}>
            Today's Date: {formattedDate}
          </p>
        </div>
      </footer>
    </div>
  );
};
