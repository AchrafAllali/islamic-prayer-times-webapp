import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import AdhkarPage from './pages/AdhkarPage';
import MosqueFinderPage from './pages/MosqueFinderPage';
import WelcomeGreeting from './components/WelcomeGreeting';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'main' | 'adhkar' | 'mosques'
  const [showWelcome, setShowWelcome] = useState(true);

  // Gérer la navigation entre les pages
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      {/* Composant de salutation au début (une seule fois) */}
      {showWelcome && currentPage === 'home' && (
        <WelcomeGreeting onClose={() => setShowWelcome(false)} />
      )}
      
      {/* Navigation entre les pages */}
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'main' && (
        <MainPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'adhkar' && (
        <AdhkarPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'mosques' && (
        <MosqueFinderPage onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;