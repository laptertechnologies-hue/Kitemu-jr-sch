import React, { useEffect } from 'react';
import { updateSEO } from '../utils/seo';

export const Contact: React.FC = () => {
  useEffect(() => {
    updateSEO(
      'Contact Us - Kitemu Junior School',
      'Get in touch with Kitemu Junior School for admissions and inquiries.'
    );
  }, []);

  return (
    <div className="contact-page">
      <div className="page-banner">
        <div>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="grid-container">
          <div className="card">
            <h3><i className="fas fa-phone" style={{ color: 'var(--primary-green)', marginBottom: '15px', display: 'block', fontSize: '2rem' }}></i> Phone</h3>
            <p>0703207764 / 0704546178</p>
            <p>0764706187 / 0768415324</p>
          </div>
          <div className="card">
            <h3><i className="fas fa-map-marker-alt" style={{ color: 'var(--primary-green)', marginBottom: '15px', display: 'block', fontSize: '2rem' }}></i> Address</h3>
            <p>Kitemu - Kivu</p>
            <p>Kyengera Town Council</p>
          </div>
          <div className="card">
            <h3><i className="fas fa-clock" style={{ color: 'var(--primary-green)', marginBottom: '15px', display: 'block', fontSize: '2rem' }}></i> Hours</h3>
            <p>Mon-Fri: 8:00 AM - 5:00 PM</p>
            <p>Weekend: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
