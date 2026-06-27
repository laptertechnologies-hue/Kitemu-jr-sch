import React, { useEffect } from 'react';
import { updateSEO } from '../utils/seo';

export const Academics: React.FC = () => {
  useEffect(() => {
    updateSEO(
      'Academics - Kitemu Junior School',
      'Discover the academic programs at Kitemu Junior School. We offer Nursery and Primary education.'
    );
  }, []);

  return (
    <div className="academics-page">
      <div className="page-banner">
        <div>
          <h1>Academics</h1>
          <p>Excellence from Nursery to P.7</p>
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
