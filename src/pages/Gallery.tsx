import React, { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

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
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="gallery-page">
      <div className="page-banner">
        <div>
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
    </div>
  );
};
