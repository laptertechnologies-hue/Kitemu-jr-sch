import { useState, useEffect } from 'react';
import { compressImage } from '../utils/imageCompressor';

export function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('content'); // content, images, admissions
  
  const [content, setContent] = useState<Record<string, string>>({});
  const [admissions, setAdmissions] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchContent = () => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
      });
  };

  const fetchAdmissions = () => {
    fetch('/api/admissions')
      .then(res => res.json())
      .then(data => {
        setAdmissions(data);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchContent();
      fetchAdmissions();
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
      setContent(prev => ({ ...prev, [key]: base64Image }));
      await handleUpdate(key, base64Image);
    } catch (err) {
      setMessage('Failed to upload image. It might be too large.');
      console.error(err);
    }
  };

  const updateAdmissionStatus = async (id: number, status: string) => {
    try {
      await fetch('/api/admissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      fetchAdmissions();
      setMessage('Status updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update admission status.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container section-padding" style={{ maxWidth: '400px', margin: '100px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Dashboard Login</h2>
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
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6' }}>
      
      {/* Sidebar */}
      <div className="admin-sidebar" style={{ width: '250px', background: 'var(--dark-green)', color: 'white', padding: '20px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.2rem', padding: '0 20px' }}>Kitemu Jr Admin</h2>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li 
            style={{ padding: '15px 20px', cursor: 'pointer', background: activeTab === 'content' ? 'rgba(255,255,255,0.1)' : 'transparent', borderLeft: activeTab === 'content' ? '4px solid var(--gold)' : '4px solid transparent' }}
            onClick={() => setActiveTab('content')}
          >
            <i className="fas fa-file-alt" style={{ marginRight: '10px' }}></i> Text Content
          </li>
          <li 
            style={{ padding: '15px 20px', cursor: 'pointer', background: activeTab === 'images' ? 'rgba(255,255,255,0.1)' : 'transparent', borderLeft: activeTab === 'images' ? '4px solid var(--gold)' : '4px solid transparent' }}
            onClick={() => setActiveTab('images')}
          >
            <i className="fas fa-images" style={{ marginRight: '10px' }}></i> Images & Logos
          </li>
          <li 
            style={{ padding: '15px 20px', cursor: 'pointer', background: activeTab === 'admissions' ? 'rgba(255,255,255,0.1)' : 'transparent', borderLeft: activeTab === 'admissions' ? '4px solid var(--gold)' : '4px solid transparent' }}
            onClick={() => setActiveTab('admissions')}
          >
            <i className="fas fa-users" style={{ marginRight: '10px' }}></i> Admissions
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="admin-main" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {message && (
          <div style={{ position: 'fixed', top: '20px', right: '20px', padding: '15px 25px', background: 'var(--primary-green)', color: 'white', borderRadius: '5px', zIndex: 1000, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {message}
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === 'content' && (
          <div>
            <h1 style={{ marginBottom: '30px', color: '#333' }}>Text Content Management</h1>
            <div className="grid-container">
              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <h3>Home Page: Welcome Message</h3>
                <textarea 
                  value={content.home_welcome || ''} 
                  onChange={e => setContent({ ...content, home_welcome: e.target.value })}
                  style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button className="btn" onClick={() => handleUpdate('home_welcome', content.home_welcome)}>Save Home Welcome</button>
              </div>

              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <h3>About Page: Our Story</h3>
                <textarea 
                  value={content.home_about || ''} 
                  onChange={e => setContent({ ...content, home_about: e.target.value })}
                  style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button className="btn" onClick={() => handleUpdate('home_about', content.home_about)}>Save About Story</button>
              </div>

              <div className="card" style={{ gridColumn: '1 / -1' }}>
                <h3>Donations Page: Content</h3>
                <textarea 
                  value={content.donations_text || ''} 
                  onChange={e => setContent({ ...content, donations_text: e.target.value })}
                  style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button className="btn" onClick={() => handleUpdate('donations_text', content.donations_text)}>Save Donations</button>
              </div>
            </div>
          </div>
        )}

        {/* IMAGES TAB */}
        {activeTab === 'images' && (
          <div>
            <h1 style={{ marginBottom: '30px', color: '#333' }}>Images & Branding</h1>
            
            <div className="card" style={{ marginBottom: '30px' }}>
              <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>School Logo</h3>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'school_logo')} />
                  <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>Upload a square logo (e.g. 500x500px). It will appear in the navigation bar.</p>
                </div>
                {content.school_logo && (
                  <img src={content.school_logo} alt="Logo Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--primary-green)' }} />
                )}
              </div>
            </div>

            <div className="card" style={{ marginBottom: '30px' }}>
              <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Page Hero Banners</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {['home', 'about', 'academics', 'admissions', 'gallery', 'donations', 'contact'].map(page => (
                  <div key={page} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
                    <h4 style={{ textTransform: 'capitalize', marginBottom: '10px' }}>{page} Page Banner</h4>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, `${page}_hero_image`)} style={{ marginBottom: '10px', width: '100%' }} />
                    {content[`${page}_hero_image`] && (
                      <img src={content[`${page}_hero_image`]} alt={`${page} Preview`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Gallery Images (Up to 6)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <div key={`gallery_${num}`} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '5px' }}>
                    <h4 style={{ marginBottom: '10px' }}>Slot {num}</h4>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, `gallery_image_${num}`)} style={{ marginBottom: '10px', width: '100%' }} />
                    {content[`gallery_image_${num}`] ? (
                      <img src={content[`gallery_image_${num}`]} alt={`Gallery ${num}`} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', color: '#ccc' }}>No Image</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ADMISSIONS TAB */}
        {activeTab === 'admissions' && (
          <div>
            <h1 style={{ marginBottom: '30px', color: '#333' }}>Admissions Applications</h1>
            <div className="card">
              {admissions.length === 0 ? (
                <p>No admission applications received yet.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--primary-green)', color: 'white' }}>
                        <th style={{ padding: '12px' }}>Date</th>
                        <th style={{ padding: '12px' }}>Student</th>
                        <th style={{ padding: '12px' }}>Grade</th>
                        <th style={{ padding: '12px' }}>Parent</th>
                        <th style={{ padding: '12px' }}>Contact</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.map(adm => (
                        <tr key={adm.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '12px' }}>{new Date(adm.created_at).toLocaleDateString()}</td>
                          <td style={{ padding: '12px', fontWeight: 'bold' }}>{adm.student_name}</td>
                          <td style={{ padding: '12px' }}>{adm.grade}</td>
                          <td style={{ padding: '12px' }}>{adm.parent_name}</td>
                          <td style={{ padding: '12px' }}>{adm.phone}<br/>{adm.email}</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ 
                              padding: '4px 8px', 
                              borderRadius: '12px', 
                              fontSize: '0.85rem',
                              background: adm.status === 'Approved' ? '#d4edda' : adm.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                              color: adm.status === 'Approved' ? '#155724' : adm.status === 'Rejected' ? '#721c24' : '#856404'
                            }}>
                              {adm.status || 'Pending'}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <select 
                              value={adm.status || 'Pending'} 
                              onChange={(e) => updateAdmissionStatus(adm.id, e.target.value)}
                              style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
