import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateSEO } from '../utils/seo';

export const Home: React.FC = () => {
  const [welcomeText, setWelcomeText] = useState('Welcome to Kitemu Junior School! We believe that Will Creates Way.');

  useEffect(() => {
    updateSEO(
      'KITEMU JUNIOR SCHOOL | Will Creates Way',
      'KITEMU JUNIOR SCHOOL - Nursery and Primary School located in Kitemu - Kivu, Kyengera Town Council. Registration for new pupils is in progress.'
    );

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.home_welcome) {
          setWelcomeText(data.home_welcome);
        }
      })
      .catch(err => console.error('Failed to fetch home content', err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="home" style={{ backgroundColor: 'var(--primary-green)' }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>KITEMU JUNIOR SCHOOL</h1>
          <p>Nursery & Primary Education | "Will Creates Way"</p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/admissions" className="btn">Registration in Progress</Link>
            <Link to="/donations" className="btn btn-secondary">Support Orphans</Link>
          </div>
        </div>
      </section>

      {/* Admin Editable Content */}
      <section className="container section-padding" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Welcome Message</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
          {welcomeText}
        </p>
      </section>

      {/* Core Values Section */}
      <section className="container section-padding">
        <h2 className="section-title">Our Core Values</h2>
        <div className="grid-container">
          <div className="card">
            <div className="card-icon"><i className="fas fa-graduation-cap" aria-hidden="true"></i></div>
            <h3>Academic Excellence</h3>
            <p>Comprehensive curriculum ensuring your child's success from Nursery to P.7.</p>
          </div>
          <div className="card">
            <div className="card-icon"><i className="fas fa-heart" aria-hidden="true"></i></div>
            <h3>Compassion & Care</h3>
            <p>We support all children, including orphans, to build a bright and better future.</p>
          </div>
          <div className="card">
            <div className="card-icon"><i className="fas fa-child" aria-hidden="true"></i></div>
            <h3>Holistic Development</h3>
            <p>Fostering discipline, confidence, and talent in a supportive environment.</p>
          </div>
        </div>
      </section>

      {/* Contact Information Quick Cards */}
      <section className="container section-padding">
        <h2 className="section-title">Contact Information</h2>
        <div className="grid-container">
          <div className="card">
            <h3><i className="fas fa-phone" style={{ color: 'var(--primary-green)', marginBottom: '15px', display: 'block', fontSize: '2rem' }}></i> Telephone</h3>
            <p>0703207764 / 0704546178<br />0764706187 / 0768415324</p>
          </div>
          <div className="card">
            <h3><i className="fas fa-map-marker-alt" style={{ color: 'var(--primary-green)', marginBottom: '15px', display: 'block', fontSize: '2rem' }}></i> Address</h3>
            <p>Kitemu - Kivu<br />Kyengera Town Council</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding" style={{ background: 'linear-gradient(to right, var(--primary-green), var(--dark-green))', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', fontWeight: 700 }}>Registration in Progress!</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 30px', opacity: 0.9 }}>
          Join Kitemu Junior School today. We are enrolling pupils from Nursery to P.7.
        </p>
        <div>
          <Link to="/admissions" className="btn" style={{ background: 'white', color: 'var(--primary-green)', marginRight: '15px' }}>Apply Now</Link>
          <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};
