import React, { useEffect } from 'react';
import { updateSEO } from '../utils/seo';

export const Gallery: React.FC = () => {
  useEffect(() => {
    updateSEO(
      'Gallery - Kitemu Junior School',
      'View photos of Kitemu Junior School campus, activities, and students.'
    );
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
        <div className="section-box">
          <h2>School Photos</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            Check back soon for photos of our school, facilities, and student activities!
          </p>
        </div>
      </div>
    </div>
  );
};
