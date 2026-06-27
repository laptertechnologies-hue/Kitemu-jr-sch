import React, { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';

export const About: React.FC = () => {
  const [aboutText, setAboutText] = useState('Located in Kitemu - Kivu, Kyengera Town Council, we offer quality education from Nursery to P.7.');

  useEffect(() => {
    updateSEO(
      'About Us - Kitemu Junior School',
      'Learn about Kitemu Junior School, our history, core values, and mission.'
    );

    fetch('http://localhost:3001/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.home_about) {
          setAboutText(data.home_about);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="about-page">
      <div className="page-banner">
        <div>
          <h1>About Kitemu Junior School</h1>
          <p>Will Creates Way</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="section-box">
          <h2>Our Story</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
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
