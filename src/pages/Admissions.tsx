import React, { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';

export const Admissions: React.FC = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    student_name: '',
    grade: '',
    parent_name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateSEO(
      'Admissions - Kitemu Junior School',
      'Apply online for admission at Kitemu Junior School. We enroll pupils from Nursery to P.7.'
    );

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.admissions_hero_image) {
          setHeroImage(data.admissions_hero_image);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ student_name: '', grade: '', parent_name: '', phone: '', email: '', address: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <div className="admissions-page">
      <div className="page-banner" style={{ 
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundColor: heroImage ? 'transparent' : 'var(--primary-green)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {heroImage && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1>Admissions</h1>
          <p>Apply to Join Kitemu Junior School</p>
        </div>
      </div>
      
      <div className="container section-padding">
        <div className="grid-container">
          
          <div className="section-box">
            <h2 style={{ color: 'var(--primary-green)', marginBottom: '20px' }}>Why Choose Kitemu?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '20px', lineHeight: '1.8' }}>
              We provide a holistic educational foundation from Nursery to Primary 7. Our dedicated teaching staff ensures that every child receives the attention they need to succeed academically and morally.
            </p>
            <h3 style={{ marginTop: '30px', color: 'var(--dark-green)' }}>Admission Requirements</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '30px' }}>
              <li>Previous school report card (if applicable)</li>
              <li>Birth certificate of the child</li>
              <li>Passport photos of the child and parents/guardians</li>
            </ul>
            <div style={{ background: '#f4f7f6', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
              <h4 style={{ marginBottom: '10px' }}>Need Help?</h4>
              <p>Contact our admissions office at:<br/><strong>0703207764</strong> or <strong>0704546178</strong></p>
            </div>
          </div>

          <div className="card" style={{ background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>Online Application Form</h2>
            
            {status === 'success' && (
              <div style={{ padding: '15px', background: '#d4edda', color: '#155724', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
                <strong>Application Submitted!</strong><br/>We will contact you shortly regarding the next steps.
              </div>
            )}
            
            {status === 'error' && (
              <div style={{ padding: '15px', background: '#f8d7da', color: '#721c24', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>
                Failed to submit application. Please try again or call us.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Pupil's Full Name *</label>
                <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Applying for Class/Grade *</label>
                <select name="grade" value={formData.grade} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="">Select a Class</option>
                  <option value="Nursery - Baby Class">Nursery - Baby Class</option>
                  <option value="Nursery - Middle Class">Nursery - Middle Class</option>
                  <option value="Nursery - Top Class">Nursery - Top Class</option>
                  <option value="Primary 1">Primary 1</option>
                  <option value="Primary 2">Primary 2</option>
                  <option value="Primary 3">Primary 3</option>
                  <option value="Primary 4">Primary 4</option>
                  <option value="Primary 5">Primary 5</option>
                  <option value="Primary 6">Primary 6</option>
                  <option value="Primary 7">Primary 7</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Parent/Guardian Name *</label>
                <input type="text" name="parent_name" value={formData.parent_name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Physical Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows={2} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
              </div>

              <button type="submit" className="btn" disabled={loading} style={{ marginTop: '10px', padding: '12px', fontSize: '1.1rem' }}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};
