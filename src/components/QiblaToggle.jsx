import React from 'react';
import { Compass, ChevronDown, ChevronUp } from 'lucide-react';

function QiblaToggle({ isOpen, onToggle, hasPosition, texts }) {
  if (!hasPosition) return null;

  const t = texts || {
    info: '🧭 Boussole Qibla disponible avec votre position GPS !',
    show: 'Afficher la Boussole Qibla',
    hide: 'Masquer la Boussole Qibla'
  };

  return (
    <div className="mb-4">
      {/* Badge informatif */}
      {!isOpen && (
        <div className="mb-2 p-3 bg-purple-50 border-l-4 border-purple-500 rounded-lg animate-pulse">
          <p className="text-purple-700 text-sm font-medium flex items-center gap-2">
            <Compass size={16} />
            {t.info}
          </p>
        </div>
      )}
      
      <button
        onClick={onToggle}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        <Compass size={24} />
        {isOpen ? (
          <>
            {t.hide}
            <ChevronUp size={20} />
          </>
        ) : (
          <>
            {t.show}
            <ChevronDown size={20} />
          </>
        )}
      </button>
    </div>
  );
}

export default QiblaToggle;