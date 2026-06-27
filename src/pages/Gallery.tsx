import React, { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    updateSEO(
      'Gallery - Kitemu Junior School',
      'View photos of Kitemu Junior School campus, activities, and students.'
    );

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        const loadedImages: string[] = [];
        for (let i = 1; i <= 6; i++) {
          if (data[`gallery_image_${i}`]) {
            loadedImages.push(data[`gallery_image_${i}`]);
          }
        }
        setImages(loadedImages);
        if (data.gallery_hero_image) {
          setHeroImage(data.gallery_hero_image);
        }
      })
      .catch(err => console.error(err));

    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="gallery-page">
      <div className="page-banner" style={{ 
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundColor: heroImage ? 'transparent' : 'var(--primary-green)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {heroImage && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1>Gallery</h1>
          <p>A glimpse into life at Kitemu Junior School</p>
        </div>
      </div>
      
      <div className="container section-padding">
        {images.length === 0 ? (
          <div className="section-box" style={{ textAlign: 'center' }}>
            <h2>School Photos</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              Check back soon for photos of our school, facilities, and student activities!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {images.map((src, index) => (
              <div key={index} style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <img 
                  src={src} 
                  alt={`Gallery Image ${index + 1}`} 
                  style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Events Section */}
      {events.length > 0 && (
        <div className="container section-padding" style={{ paddingTop: 0 }}>
          <h2 className="section-title" style={{ marginTop: '20px' }}>School Events</h2>
          <div className="grid-container">
            {events.map(evt => (
              <div key={evt.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {evt.image_data && <img src={evt.image_data} alt={evt.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />}
                <div style={{ padding: '25px' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{evt.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--primary-green)', marginBottom: '15px', fontWeight: 'bold' }}>
                    <i className="fas fa-calendar-alt"></i> {new Date(evt.event_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                    {evt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
