import { useState, useEffect } from 'react';
import { compressImage } from '../utils/imageCompressor';

export function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchContent = () => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent({
          home_welcome: data.home_welcome || '',
          home_about: data.home_about || '',
          donations_text: data.donations_text || '',
          home_hero_image: data.home_hero_image || '',
          gallery_image_1: data.gallery_image_1 || '',
          gallery_image_2: data.gallery_image_2 || '',
          gallery_image_3: data.gallery_image_3 || '',
          gallery_image_4: data.gallery_image_4 || '',
          gallery_image_5: data.gallery_image_5 || '',
          gallery_image_6: data.gallery_image_6 || '',
        });
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchContent();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
      } else {
        setMessage('Invalid credentials');
      }
    } catch (err) {
      setMessage('Login failed. Ensure database is connected.');
    }
    setLoading(false);
  };

  const handleUpdate = async (key: string, value: string) => {
    setMessage('Saving...');
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section_key: key, text_value: value })
      });
      setMessage('Saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessage('Compressing and uploading image...');
    try {
      const base64Image = await compressImage(file, 1200, 0.7);
      
      // Update locally immediately for preview
      setContent(prev => ({ ...prev, [key]: base64Image }));
      
      // Send to server
      await handleUpdate(key, base64Image);
    } catch (err) {
      setMessage('Failed to upload image. It might be too large.');
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container section-padding" style={{ maxWidth: '400px', margin: '100px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
        {message && <div style={{ padding: '10px', background: '#fee', color: 'red', marginBottom: '15px' }}>{message}</div>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '10px' }} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px' }} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      <h1>Admin Dashboard</h1>
      <p style={{ marginBottom: '30px' }}>Edit your website content below. Changes save automatically when you click "Save".</p>
      
      {message && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', padding: '15px 25px', background: 'var(--primary-green)', color: 'white', borderRadius: '5px', zIndex: 1000, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          {message}
        </div>
      )}

      <div className="grid-container">
        {/* TEXT CONTENT SECTION */}
        <div style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ borderBottom: '2px solid var(--primary-green)', paddingBottom: '10px', marginBottom: '20px' }}>Text Content</h2>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3>Home Page: Welcome Message</h3>
          <textarea 
            value={content.home_welcome} 
            onChange={e => setContent({ ...content, home_welcome: e.target.value })}
            style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '10px' }}
          />
          <button className="btn" onClick={() => handleUpdate('home_welcome', content.home_welcome)}>Save Home Welcome</button>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3>About Page: Our Story</h3>
          <textarea 
            value={content.home_about} 
            onChange={e => setContent({ ...content, home_about: e.target.value })}
            style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '10px' }}
          />
          <button className="btn" onClick={() => handleUpdate('home_about', content.home_about)}>Save About Story</button>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3>Donations Page: Content</h3>
          <textarea 
            value={content.donations_text} 
            onChange={e => setContent({ ...content, donations_text: e.target.value })}
            style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '10px' }}
          />
          <button className="btn" onClick={() => handleUpdate('donations_text', content.donations_text)}>Save Donations</button>
        </div>

        {/* IMAGES SECTION */}
        <div style={{ gridColumn: '1 / -1', marginTop: '40px' }}>
          <h2 style={{ borderBottom: '2px solid var(--primary-green)', paddingBottom: '10px', marginBottom: '20px' }}>Website Images</h2>
        </div>

        {/* Hero Image */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h3>Home Page Hero Background</h3>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'home_hero_image')} />
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>Upload a landscape image. It will be compressed automatically.</p>
            </div>
            {content.home_hero_image && (
              <img src={content.home_hero_image} alt="Preview" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '5px' }} />
            )}
          </div>
        </div>

        {/* Gallery Images */}
        <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
          <h3>Gallery Images (Up to 6)</h3>
        </div>
        
        {[1, 2, 3, 4, 5, 6].map(num => (
          <div className="card" key={`gallery_${num}`}>
            <h4>Gallery Slot {num}</h4>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, `gallery_image_${num}`)} style={{ marginBottom: '10px', width: '100%' }} />
            {content[`gallery_image_${num}`] ? (
              <img src={content[`gallery_image_${num}`]} alt={`Gallery ${num}`} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
            ) : (
              <div style={{ width: '100%', height: '150px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', color: '#999' }}>No Image</div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}
