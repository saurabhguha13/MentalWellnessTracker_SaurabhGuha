import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WellnessProvider } from './context/WellnessContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Companion from './pages/Companion';

function App() {
  return (
    <WellnessProvider>
      <Router>
        <Header />
        <main style={{ padding: '0 32px 32px', flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/companion" element={<Companion />} />
          </Routes>
        </main>
      </Router>
    </WellnessProvider>
  );
}

export default App;
