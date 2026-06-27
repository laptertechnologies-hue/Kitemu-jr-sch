import React, { useEffect } from 'react';
import { updateSEO } from '../utils/seo';

export const Admissions: React.FC = () => {
  useEffect(() => {
    updateSEO(
      'Admissions - Kitemu Junior School',
      'Learn about the admission process at Kitemu Junior School. We enroll pupils from Nursery to P.7.'
    );
  }, []);

  return (
    <div className="admissions-page">
      <div className="page-banner">
        <div>
          <h1>Admissions</h1>
          <p>Join the Kitemu Junior School Community</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="section-box">
          <h2>Registration in Progress</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            We are currently registering new pupils from Nursery to P.7. 
            Parents and guardians are encouraged to visit the school for registration.
          </p>
          
          <h3 style={{ marginTop: '30px', color: 'var(--primary-green)' }}>Requirements for Admission</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.8', fontSize: '1.05rem' }}>
            <li>Previous school report card</li>
            <li>Birth certificate of the child</li>
            <li>Passport photos of the child and parents/guardians</li>
            <li>Medical report (if applicable)</li>
          </ul>

          <p style={{ marginTop: '30px' }}>
            For any inquiries, please contact our admissions office at <strong>0703207764</strong> or <strong>0704546178</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
