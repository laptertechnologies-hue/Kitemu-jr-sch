import React, { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';

export const Academics: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    updateSEO(
      'Academics - Kitemu Junior School',
      'Discover the academic programs at Kitemu Junior School. We offer Nursery and Primary education.'
    );

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.academics_hero_image) {
          setHeroImage(data.academics_hero_image);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="academics-page">
      <div className="page-banner" style={{ 
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundColor: heroImage ? 'transparent' : 'var(--primary-green)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {heroImage && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1>Academics</h1>
          <p>Nursery and Primary Education Excellence</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="section-box">
          <h2>Our Academic Program</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            At Kitemu Junior School, we focus on providing a strong educational foundation. Our curriculum is tailored to equip pupils with the knowledge and skills necessary for higher education and personal development. We teach core subjects along with extracurricular activities to ensure holistic development.
          </p>
        </div>
      </div>
    </div>
  );
};
