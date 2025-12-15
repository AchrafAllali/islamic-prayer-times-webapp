import React, { useState, useEffect } from 'react';
import { Volume2, Pause } from 'lucide-react';
import { audioService } from '../utils/audioService';

function AdhanPlayer({ prayerName, prayerNameArabic, texts }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const t = texts || {
    playing: 'Adhan en cours',
    stop: "Arrêter l'Adhan"
  };

  useEffect(() => {
    // Vérifier l'état actuel
    const checkState = () => {
      if (audioService.isPlaying && audioService.currentPrayer) {
        setIsPlaying(true);
        setCurrentPrayer(audioService.currentPrayer);
      } else {
        setIsPlaying(false);
        setCurrentPrayer(null);
      }
    };

    // Vérifier immédiatement
    checkState();

    // Vérifier périodiquement
    const interval = setInterval(checkState, 500);

    return () => clearInterval(interval);
  }, []);

  const handleStop = () => {
    audioService.stopAdhan();
    setIsPlaying(false);
    setCurrentPrayer(null);
  };

  // Afficher la notification quand l'Adhan joue
  if (isPlaying && currentPrayer) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl shadow-2xl p-6 max-w-sm animate-fade-in-scale">
        <div className="flex items-center gap-4">
          <div className="text-4xl animate-pulse">🕌</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="animate-pulse" size={20} />
              <h3 className="font-bold text-lg">{t.playing}</h3>
            </div>
            <p className="text-emerald-100 text-sm arabic-text mb-1">
              {currentPrayer.nameArabic}
            </p>
            <p className="text-emerald-100 text-sm">
              {currentPrayer.name}
            </p>
          </div>
          <button
            onClick={handleStop}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
            title={t.stop}
          >
            <Pause size={20} />
          </button>
        </div>
        
        {/* Barre de progression audio (animation) */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-pulse" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return null;
}

export default AdhanPlayer;

