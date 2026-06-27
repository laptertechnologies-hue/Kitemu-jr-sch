import React, { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';

export const Contact: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    updateSEO(
      'Contact Us - Kitemu Junior School',
      'Get in touch with Kitemu Junior School for admissions and inquiries.'
    );

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.contact_hero_image) {
          setHeroImage(data.contact_hero_image);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="contact-page">
      <div className="page-banner" style={{ 
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundColor: heroImage ? 'transparent' : 'var(--primary-green)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {heroImage && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>}
        <div style={{ position: 'relative', zIndex: 2 }}>
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
