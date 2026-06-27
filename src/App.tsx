import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
