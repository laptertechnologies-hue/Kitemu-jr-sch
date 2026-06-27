import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Academics } from './pages/Academics';
import { Admissions } from './pages/Admissions';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Donations } from './pages/Donations';
import { Admin } from './pages/Admin';
import { Suspended } from './pages/Suspended';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Suspended />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
