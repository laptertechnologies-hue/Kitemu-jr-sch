import { useEffect, useState } from 'react';

export const Donations: React.FC = () => {
  const [donationsText, setDonationsText] = useState('Kitemu Junior School is deeply committed to supporting orphans and vulnerable children within our local community. We believe every child deserves the right to quality education regardless of their background. Your generous donations help us provide essential tuition, scholastic materials, daily meals, and medical care for these deserving children, ensuring they stay in school and build a brighter future. Every contribution makes a huge difference.');
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.donations_text) {
          setDonationsText(data.donations_text);
        }
        if (data.donations_hero_image) {
          setHeroImage(data.donations_hero_image);
        }
      })
      .catch(err => {
        console.error('Failed to fetch donations text', err);
        setDonationsText('Kitemu Junior School is deeply committed to supporting orphans and vulnerable children within our local community. We believe every child deserves the right to quality education regardless of their background. Your generous donations help us provide essential tuition, scholastic materials, daily meals, and medical care for these deserving children, ensuring they stay in school and build a brighter future. Every contribution makes a huge difference.');
      });
  }, []);

  return (
    <div className="donations-page">
      <div className="page-banner" style={{ 
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundColor: heroImage ? 'transparent' : 'var(--primary-green)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {heroImage && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1>Support Us</h1>
          <p>Help us educate vulnerable children</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="section-box">
          <h2>Why Donate?</h2>
          <p style={{ fontSize: '1rem', lineHeight: '1.8' }}>{donationsText}</p>
          
          <div className="bank-info" style={{ marginTop: '40px' }}>
            <h4>Donation Channels</h4>
            <ul>
              <li><strong>Mobile Money (MTN):</strong> 0764706187 / 0768415324</li>
              <li><strong>Mobile Money (Airtel):</strong> 0703207764 / 0704546178</li>
              <li><strong>Physical Donations:</strong> Visit our school at Kitemu - Kivu, Kyengera Town Council</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
