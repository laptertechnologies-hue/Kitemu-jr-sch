import React, { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';

export const Suspended: React.FC = () => {
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  useEffect(() => {
    updateSEO(
      'Site Suspended',
      'This website has been temporarily suspended.'
    );

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.school_logo) {
          setSchoolLogo(data.school_logo);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8d7da',
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      zIndex: 999999
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        {schoolLogo && (
          <div style={{ marginBottom: '20px' }}>
            <img src={schoolLogo} alt="School Logo" style={{ height: '80px', objectFit: 'contain' }} />
          </div>
        )}
        <h1 style={{ color: '#721c24', marginBottom: '20px', fontSize: '2.5rem' }}>Service Suspended</h1>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px', lineHeight: '1.6' }}>
          This website is currently unavailable due to an outstanding administrative issue with the developer.
        </p>
        <p style={{ fontSize: '1rem', color: '#777', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px', border: '1px solid #eee' }}>
          <strong>Notice to Website Owner:</strong> Please settle your outstanding development invoice to have your services restored immediately.
        </p>
      </div>
    </div>
  );
};
