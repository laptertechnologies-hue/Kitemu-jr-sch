import { useEffect, useState } from 'react';

export function Donations() {
  const [donationText, setDonationText] = useState('Loading...');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.donations_text) {
          setDonationText(data.donations_text);
        }
      })
      .catch(err => {
        console.error('Failed to fetch donations text', err);
        setDonationText('Support our Orphans. Any donation helps us provide education and necessities to vulnerable children.');
      });
  }, []);

  return (
    <div className="donations-page">
      <div className="page-banner">
        <div>
          <h1>Support Our Orphans</h1>
          <p>Make a difference in a child's life today</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="section-box">
          <h2>Why Donate?</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{donationText}</p>
          
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
