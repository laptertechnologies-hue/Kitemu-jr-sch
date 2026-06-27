import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateSEO } from '../utils/seo';

export const Home: React.FC = () => {
  const [welcomeText, setWelcomeText] = useState('Welcome to Kitemu Junior School! We believe that Will Creates Way. Established with a strong commitment to academic excellence and moral uprightness, our school provides a nurturing environment where children from diverse backgrounds can thrive. Our dedicated staff works tirelessly to ensure that every pupil receives the attention, guidance, and resources they need to succeed both in their studies and in life. We invite you to explore our vibrant community.');
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

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
        if (data.home_hero_image) {
          setHeroImage(data.home_hero_image);
        }
        
        // Load up to 3 gallery images for preview
        const loadedImages: string[] = [];
        for (let i = 1; i <= 3; i++) {
          if (data[`gallery_image_${i}`]) {
            loadedImages.push(data[`gallery_image_${i}`]);
          }
        }
        setGalleryImages(loadedImages);
      })
      .catch(err => console.error('Failed to fetch home content', err));

    // Fetch Events
    fetch('/api/events?limit=3')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero" 
        id="home" 
        style={{ 
          backgroundColor: 'var(--primary-green)',
          backgroundImage: heroImage ? `url(${heroImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
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
        <p style={{ fontSize: '1rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
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

      {/* Events Section */}
      {events.length > 0 && (
        <section className="container section-padding" style={{ backgroundColor: 'white' }}>
          <h2 className="section-title">Upcoming Events</h2>
          <div className="grid-container">
            {events.map(evt => (
              <div key={evt.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {evt.image_data && <img src={evt.image_data} alt={evt.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{evt.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--primary-green)', marginBottom: '10px', fontWeight: 'bold' }}>
                    <i className="fas fa-calendar-alt"></i> {new Date(evt.event_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p style={{ fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {evt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Preview Section */}
      {galleryImages.length > 0 && (
        <section className="container section-padding">
          <h2 className="section-title">School Gallery</h2>
          <div className="grid-container">
            {galleryImages.map((src, idx) => (
              <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <img src={src} alt={`Gallery Preview ${idx + 1}`} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link to="/gallery" className="btn btn-secondary">View Full Gallery</Link>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="section-padding" style={{ background: 'linear-gradient(to right, var(--primary-green), var(--dark-green))', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', fontWeight: 700 }}>Registration in Progress!</h2>
        <p style={{ fontSize: '1rem', maxWidth: '700px', margin: '0 auto 30px', opacity: 0.9 }}>
          Join Kitemu Junior School today. We are currently enrolling pupils from Nursery to P.7 for the upcoming academic term. Secure your child's future by providing them with the best educational foundation in Kyengera Town Council.
        </p>
        <div>
          <Link to="/admissions" className="btn" style={{ background: 'white', color: 'var(--primary-green)', marginRight: '15px' }}>Apply Now</Link>
          <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};
