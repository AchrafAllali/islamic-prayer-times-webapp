import React, { useState, useEffect } from 'react';

function WelcomeGreeting({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide après 5 secondes
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 500); // Attendre la fin de l'animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-4 transform transition-all duration-500 scale-100">
        <div className="text-center space-y-6">
          {/* Emoji Mosque */}
          <div className="text-7xl animate-bounce">🕌</div>
          
          {/* Arabic Greeting */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-emerald-700 arabic-text">
              السلام عليكم
            </h2>
            <p className="text-lg text-gray-600 arabic-text">
              ورحمة الله وبركاته
            </p>
          </div>

          {/* French Translation */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xl font-semibold text-emerald-600 french-text">
              Paix soit sur vous
            </p>
            <p className="text-sm text-gray-500 mt-1 french-text">
              Que la miséricorde et les bénédictions d'Allah soient sur vous
            </p>
          </div>

          {/* English Translation */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xl font-semibold text-emerald-600 english-text">
              Peace be upon you
            </p>
            <p className="text-sm text-gray-500 mt-1 english-text">
              May the mercy and blessings of Allah be upon you
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                if (onClose) onClose();
              }, 500);
            }}
            className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeGreeting;

