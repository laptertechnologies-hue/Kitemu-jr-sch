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
          <h2>Our Academic Philosophy</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', marginBottom: '20px' }}>
            At Kitemu Junior School, we focus on providing a strong educational foundation that caters to the unique learning styles of every child. Our curriculum is specifically tailored to equip pupils with the vital knowledge, critical thinking skills, and moral values necessary for higher education and personal development.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: '1.8', marginBottom: '30px' }}>
            We teach all core subjects including Mathematics, English, Science, and Social Studies, alongside enriching extracurricular activities like music, sports, and arts. Our goal is to ensure holistic development, turning out pupils who are not only academically competitive but also socially responsible.
          </p>
          
          <div className="grid-container" style={{ marginTop: '40px' }}>
            <div className="card" style={{ padding: '25px', textAlign: 'left' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '15px', fontSize: '1.3rem' }}>Nursery Section</h3>
              <p style={{ fontSize: '0.95rem' }}>Our Nursery section (Baby, Middle, and Top Class) offers a safe, playful, and engaging environment. We focus on early childhood development, basic literacy, numeracy, and social skills to prepare the little ones for primary education.</p>
            </div>
            <div className="card" style={{ padding: '25px', textAlign: 'left' }}>
              <h3 style={{ color: 'var(--primary-green)', marginBottom: '15px', fontSize: '1.3rem' }}>Primary Section</h3>
              <p style={{ fontSize: '0.95rem' }}>From Primary 1 to Primary 7, our pupils undergo rigorous academic training aligned with the national curriculum. Our experienced teachers use interactive methods to make learning enjoyable while ensuring top performance in PLE examinations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
