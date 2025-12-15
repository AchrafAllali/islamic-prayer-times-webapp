import React from 'react';
import { Navigation, Loader } from 'lucide-react';

function GPSButton({ onGPSClick, loading, texts }) {
  const t = texts || {
    locating: 'Localisation en cours...',
    action: '📍 Utiliser ma position GPS',
    accuracy: 'Plus précis'
  };

  return (
    <button
      onClick={onGPSClick}
      disabled={loading}
      className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
    >
      {loading ? (
        <>
          <Loader className="animate-spin" size={24} />
          {t.locating}
        </>
      ) : (
        <>
          <Navigation size={24} />
          {t.action}
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            {t.accuracy}
          </span>
        </>
      )}
    </button>
  );
}

export default GPSButton;