import React, { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';

export const About: React.FC = () => {
  const [aboutText, setAboutText] = useState('Located in Kitemu - Kivu, Kyengera Town Council, Kitemu Junior School stands as a beacon of academic excellence and moral uprightness in our community. We offer quality education from Nursery to Primary 7, catering to the diverse needs of our growing student body. Our mission goes beyond textbooks; we are dedicated to nurturing children into responsible, confident, and compassionate citizens. By fostering a culture of discipline and hard work, we ensure that every pupil who passes through our gates is fully prepared to face the challenges of the modern world. Will Creates Way.');
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    updateSEO(
      'About Us - Kitemu Junior School',
      'Learn about Kitemu Junior School, our history, core values, and mission.'
    );

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.home_about) {
          setAboutText(data.home_about);
        }
        if (data.about_hero_image) {
          setHeroImage(data.about_hero_image);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="about-page">
      <div className="page-banner" style={{ 
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundColor: heroImage ? 'transparent' : 'var(--primary-green)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {heroImage && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1>About Us</h1>
          <p>Learn more about our history, mission, and vision</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="section-box">
          <h2>Our Story</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.8' }}>
            {aboutText}
          </p>
        </div>

        <div className="grid-container" style={{ marginTop: '40px' }}>
          <div className="card">
            <div className="card-icon"><i className="fas fa-eye" aria-hidden="true"></i></div>
            <h3>Our Vision</h3>
            <p>To be a leading provider of quality foundational education, empowering pupils to achieve their full potential.</p>
          </div>
          <div className="card">
            <div className="card-icon"><i className="fas fa-bullseye" aria-hidden="true"></i></div>
            <h3>Our Mission</h3>
            <p>To provide holistic education that equips our learners with knowledge, skills, and values for self-reliance and community development.</p>
          </div>
          <div className="card">
            <div className="card-icon"><i className="fas fa-hand-holding-heart" aria-hidden="true"></i></div>
            <h3>Core Values</h3>
            <p>Excellence, Discipline, Compassion, and Integrity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
