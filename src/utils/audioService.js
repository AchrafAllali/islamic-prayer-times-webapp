// Service pour gérer la lecture audio de l'Adhan
export const audioService = {
  audio: null,
  isPlaying: false,
  currentPrayer: null,
  onPlayCallback: null, // Callback pour notifier quand l'Adhan joue
  onStopCallback: null, // Callback pour notifier quand l'Adhan s'arrête

  // Initialiser l'audio (l'utilisateur a déjà le fichier audio)
  init(audioPath) {
    if (!this.audio) {
      this.audio = new Audio(audioPath);
      this.audio.loop = false;
      this.audio.volume = 0.8; // Volume à 80%
      
      this.audio.addEventListener('loadstart', () => {
        console.log('🔄 Chargement de l\'Adhan...');
      });

      this.audio.addEventListener('canplay', () => {
        console.log('✅ Adhan prêt à être joué');
      });

      this.audio.addEventListener('play', () => {
        console.log('🔊 Adhan en cours de lecture');
        if (this.onPlayCallback) {
          this.onPlayCallback(this.currentPrayer);
        }
      });
      
      this.audio.addEventListener('ended', () => {
        console.log('✅ Adhan terminé');
        this.isPlaying = false;
        if (this.onStopCallback) {
          this.onStopCallback();
        }
        this.currentPrayer = null;
      });

      this.audio.addEventListener('error', (e) => {
        console.error('❌ Erreur de lecture audio:', e);
        console.error('Vérifiez que le fichier adhan.mp3 est bien dans le dossier public/');
        this.isPlaying = false;
        if (this.onStopCallback) {
          this.onStopCallback();
        }
      });

      // Vérifier si le fichier existe
      this.audio.addEventListener('loadstart', () => {
        console.log('📁 Fichier audio trouvé:', audioPath);
      });
    }
  },

  // Définir les callbacks
  setCallbacks(onPlay, onStop) {
    this.onPlayCallback = onPlay;
    this.onStopCallback = onStop;
  },

  // Jouer l'Adhan pour une prière spécifique
  async playAdhan(prayerName, prayerNameArabic) {
    if (!this.audio) {
      console.warn('⚠️ Audio non initialisé. Veuillez appeler init() avec le chemin du fichier audio.');
      return false;
    }

    if (this.isPlaying) {
      console.log('ℹ️ L\'Adhan est déjà en cours de lecture.');
      return false;
    }

    try {
      this.currentPrayer = { name: prayerName, nameArabic: prayerNameArabic };
      this.isPlaying = true;
      
      // Réinitialiser l'audio au début
      this.audio.currentTime = 0;
      
      // Jouer l'audio
      await this.audio.play();
      
      console.log(`🔊 Adhan joué pour ${prayerName} (${prayerNameArabic})`);
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la lecture de l\'Adhan:', error);
      console.error('💡 Vérifiez que le navigateur autorise la lecture audio automatique');
      this.isPlaying = false;
      this.currentPrayer = null;
      return false;
    }
  },

  // Tester la lecture audio (pour vérifier que tout fonctionne)
  async testAudio() {
    if (!this.audio) {
      console.warn('⚠️ Audio non initialisé');
      return false;
    }

    try {
      this.audio.currentTime = 0;
      await this.audio.play();
      console.log('✅ Test audio réussi !');
      return true;
    } catch (error) {
      console.error('❌ Erreur lors du test audio:', error);
      return false;
    }
  },

  // Arrêter l'Adhan
  stopAdhan() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.currentPrayer = null;
    }
  },

  // Vérifier si l'heure de prière est arrivée
  checkPrayerTime(timings, timezone) {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: timezone 
    });

    const prayers = [
      { name: 'Fajr', nameArabic: 'الفجر', time: timings.Fajr },
      { name: 'Dhuhr', nameArabic: 'الظهر', time: timings.Dhuhr },
      { name: 'Asr', nameArabic: 'العصر', time: timings.Asr },
      { name: 'Maghrib', nameArabic: 'المغرب', time: timings.Maghrib },
      { name: 'Isha', nameArabic: 'العشاء', time: timings.Isha }
    ];

    for (let prayer of prayers) {
      const prayerTime = prayer.time.split(' ')[0]; // Extraire seulement l'heure (HH:MM)
      const [prayerHours, prayerMinutes] = prayerTime.split(':').map(Number);
      const [currentHours, currentMinutes] = currentTime.split(':').map(Number);

      // Vérifier si l'heure correspond (avec une marge de 1 minute)
      if (
        prayerHours === currentHours &&
        Math.abs(prayerMinutes - currentMinutes) <= 1
      ) {
        // Vérifier si on n'a pas déjà joué l'Adhan pour cette prière aujourd'hui
        const today = now.toDateString();
        const lastPlayedKey = `adhan_${prayer.name}_${today}`;
        const lastPlayed = localStorage.getItem(lastPlayedKey);

        if (!lastPlayed) {
          // Jouer l'Adhan
          this.playAdhan(prayer.name, prayer.nameArabic);
          
          // Marquer comme joué aujourd'hui
          localStorage.setItem(lastPlayedKey, 'true');
          
          return {
            shouldPlay: true,
            prayer: prayer
          };
        }
      }
    }

    return { shouldPlay: false };
  },

  // Planifier la vérification périodique des heures de prière
  startPrayerTimeChecker(timings, timezone, intervalMs = 60000) {
    // Vérifier immédiatement
    this.checkPrayerTime(timings, timezone);

    // Vérifier toutes les minutes
    const intervalId = setInterval(() => {
      this.checkPrayerTime(timings, timezone);
    }, intervalMs);

    return intervalId;
  },

  // Arrêter la vérification
  stopPrayerTimeChecker(intervalId) {
    if (intervalId) {
      clearInterval(intervalId);
    }
  },

  // Nettoyer (réinitialiser les flags de lecture quotidienne à minuit)
  resetDailyFlags() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
      // Supprimer tous les flags d'Adhan joués
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('adhan_')) {
          localStorage.removeItem(key);
        }
      });
      
      // Programmer le prochain reset
      this.resetDailyFlags();
    }, msUntilMidnight);
  }
};

// Initialiser le reset quotidien au démarrage
audioService.resetDailyFlags();

