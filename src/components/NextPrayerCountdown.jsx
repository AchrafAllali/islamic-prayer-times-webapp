import React, { useState, useEffect } from 'react';
import { Clock, Bell, BellOff, Volume2 } from 'lucide-react';
import { notificationService } from '../utils/notificationService';
import { audioService } from '../utils/audioService';

function NextPrayerCountdown({ timings, onNotificationToggle, notificationsEnabled, texts }) {
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [isTestingAudio, setIsTestingAudio] = useState(false);
  const t = texts || {
    title: 'Prochaine prière',
    audioTest: "Tester l'audio Adhan",
    notifOnTitle: 'Désactiver notifications',
    notifOffTitle: 'Activer notifications',
    today: "Aujourd'hui",
    tomorrow: 'Demain',
    minutes: 'minutes',
    minute: 'minute',
    at: 'à',
    notifyHint: 'Vous recevrez une notification 10 minutes avant chaque prière',
    testError: '❌ Erreur : Vérifiez que le fichier adhan.mp3 est bien dans le dossier public/',
    prayerNames: {}
  };

  const getPrayerName = (name) => {
    if (t.prayerNames && t.prayerNames[name]) {
      return t.prayerNames[name];
    }
    return name;
  };

  const handleTestAudio = async () => {
    setIsTestingAudio(true);
    const success = await audioService.testAudio();
    if (success) {
      setTimeout(() => {
        setIsTestingAudio(false);
      }, 2000);
    } else {
      setIsTestingAudio(false);
      alert(t.testError);
    }
  };

  useEffect(() => {
    if (!timings) return;

    const updateCountdown = () => {
      const next = notificationService.getNextPrayer(timings);
      setNextPrayer(next);

      if (next) {
        const hours = String(next.hours).padStart(2, '0');
        const minutes = String(next.minutes).padStart(2, '0');
        setCountdown(`${hours}:${minutes}`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Mise à jour chaque minute

    return () => clearInterval(interval);
  }, [timings]);

  if (!nextPrayer) return null;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-purple-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">
            {t.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Bouton Test Audio */}
          <button
            onClick={handleTestAudio}
            disabled={isTestingAudio}
            className={`p-2 rounded-lg transition ${
              isTestingAudio
                ? 'bg-emerald-600 text-white animate-pulse'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
            title={t.audioTest}
          >
            <Volume2 size={20} />
          </button>
          
          {/* Toggle Notifications */}
          <button
            onClick={onNotificationToggle}
            className={`p-2 rounded-lg transition ${
              notificationsEnabled 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
            title={notificationsEnabled ? t.notifOnTitle : t.notifOffTitle}
          >
            {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-purple-600">
            {getPrayerName(nextPrayer.name)}
          </div>
          <div className="text-lg text-purple-500 arabic-text">
            {nextPrayer.nameAr}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {nextPrayer.isTomorrow ? t.tomorrow : t.today} {t.at} {nextPrayer.time}
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-1">
            {countdown}
          </div>
          <div className="text-sm text-gray-600">
            {nextPrayer.hours > 0
              ? `${nextPrayer.hours}h ${nextPrayer.minutes} ${nextPrayer.minutes === 1 ? t.minute : t.minutes}`
              : `${nextPrayer.minutes} ${nextPrayer.minutes === 1 ? t.minute : t.minutes}`}
          </div>
        </div>
      </div>

      {notificationsEnabled && (
        <div className="mt-4 p-3 bg-white/50 rounded-lg">
          <p className="text-xs text-gray-600 flex items-center gap-2">
            <Bell size={14} />
            {t.notifyHint}
          </p>
        </div>
      )}
    </div>
  );
}

export default NextPrayerCountdown;