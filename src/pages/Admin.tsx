import { useState, useEffect } from 'react';

export function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [content, setContent] = useState({
    home_welcome: '',
    home_about: '',
    donations_text: ''
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:3001/api/content')
        .then(res => res.json())
        .then(data => {
          setContent({
            home_welcome: data.home_welcome || '',
            home_about: data.home_about || '',
            donations_text: data.donations_text || ''
          });
        });
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleUpdate = async (key: string, value: string) => {
    try {
      await fetch('http://localhost:3001/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section_key: key, text_value: value })
      });
      alert('Content updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update content');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container section-padding" style={{ maxWidth: '500px' }}>
        <div className="section-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      <div className="section-box">
        <h2>Admin Dashboard</h2>
        <p>Edit website content below:</p>
        
        <div style={{ marginTop: '30px' }}>
          <h3>Home Page Welcome</h3>
          <textarea 
            value={content.home_welcome} 
            onChange={e => setContent({...content, home_welcome: e.target.value})}
            style={{ width: '100%', height: '100px', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button className="btn" onClick={() => handleUpdate('home_welcome', content.home_welcome)}>Save Changes</button>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3>Home Page About</h3>
          <textarea 
            value={content.home_about} 
            onChange={e => setContent({...content, home_about: e.target.value})}
            style={{ width: '100%', height: '100px', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button className="btn" onClick={() => handleUpdate('home_about', content.home_about)}>Save Changes</button>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h3>Donations Page Text</h3>
          <textarea 
            value={content.donations_text} 
            onChange={e => setContent({...content, donations_text: e.target.value})}
            style={{ width: '100%', height: '100px', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button className="btn" onClick={() => handleUpdate('donations_text', content.donations_text)}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
