import React, { useState, useEffect, useRef } from 'react';
import GPSButton from '../components/GPSButton';
import FavoriteCity from '../components/FavoriteCity';
import SearchBar from '../components/SearchBar';
import QiblaToggle from '../components/QiblaToggle';
import QiblaCompass from '../components/QiblaCompass';
import NextPrayerCountdown from '../components/NextPrayerCountdown';
import PrayerTimes from '../components/PrayerTimes';
import AdhanPlayer from '../components/AdhanPlayer';
import RandomMosqueBackground from '../components/RandomMosqueBackground';
import IslamicAnimatedBackground from '../components/IslamicAnimatedBackground';
import { notificationService } from '../utils/notificationService';
import { storageService } from '../utils/storageService';
import { audioService } from '../utils/audioService';

const translations = {
  fr: {
    code: 'FR',
    dir: 'ltr',
    backToHome: "Retour à l'accueil",
    online: 'En ligne',
    separator: 'ou',
    headerTitle: 'Horaires de Prière',
    headerArabic: 'مواقيت الصلاة',
    headerEnglish: 'Prayer Times',
    welcome: {
      title: 'Bienvenue',
      arabic: 'مرحبا بك',
      gps: 'Utilisez le GPS pour une précision maximale',
      manual: 'ou recherchez votre ville manuellement'
    },
    errors: {
      geoNotSupported: "❌ La géolocalisation n'est pas supportée.",
      permissionDenied: '❌ Permission refusée. Autorisez l\'accès à votre position.',
      geoError: '❌ Erreur de géolocalisation.',
      apiConnection: "❌ Erreur de connexion à l'API.",
      cityNotFound: '❌ Ville non trouvée.',
      connection: '❌ Erreur de connexion.',
      notificationDenied: '❌ Permission de notification refusée.'
    },
    gpsButton: {
      locating: 'Localisation en cours...',
      action: '📍 Utiliser ma position GPS',
      accuracy: 'Plus précis'
    },
    searchBar: {
      title: 'Votre localisation',
      cityPlaceholder: 'Ville (ex: Casablanca, Paris, Dubai)',
      countryPlaceholder: 'Pays (optionnel, ex: Morocco, France)',
      search: 'Rechercher',
      loading: 'Chargement...'
    },
    favoriteCity: {
      title: 'Ville favorite',
      subtitleAr: 'المدينة المفضلة',
      load: 'Charger',
      loadTitle: 'Charger cette ville',
      removeTitle: 'Supprimer des favoris',
      hint: '⭐ Cliquez sur "Charger" pour afficher les horaires de cette ville'
    },
    qiblaToggle: {
      info: '🧭 Boussole Qibla disponible avec votre position GPS !',
      show: 'Afficher la Boussole Qibla',
      hide: 'Masquer la Boussole Qibla'
    },
    countdown: {
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
      testError: '❌ Erreur : Vérifiez que le fichier adhan.mp3 est bien dans le dossier public/'
    },
    prayerTimes: {
      gpsBadge: 'Horaires calculés avec votre position GPS (précision maximale)',
      timezonePrefix: '📍 ',
      methodPrefix: '📐 ',
      dateLocale: 'fr-FR'
    },
    adhanPlayer: {
      playing: 'Adhan en cours',
      stop: "Arrêter l'Adhan"
    },
    languageLabel: 'Langue'
  },
  en: {
    code: 'EN',
    dir: 'ltr',
    backToHome: 'Back to home',
    online: 'Online',
    separator: 'or',
    headerTitle: 'Prayer Times',
    headerArabic: 'مواقيت الصلاة',
    headerEnglish: 'Prayer Times',
    welcome: {
      title: 'Welcome',
      arabic: 'مرحبا بك',
      gps: 'Use GPS for maximum accuracy',
      manual: 'or search your city manually'
    },
    errors: {
      geoNotSupported: '❌ Geolocation is not supported.',
      permissionDenied: '❌ Permission denied. Allow access to your location.',
      geoError: '❌ Geolocation error.',
      apiConnection: '❌ API connection error.',
      cityNotFound: '❌ City not found.',
      connection: '❌ Connection error.',
      notificationDenied: '❌ Notification permission denied.'
    },
    gpsButton: {
      locating: 'Locating...',
      action: '📍 Use my GPS location',
      accuracy: 'More accurate'
    },
    searchBar: {
      title: 'Your location',
      cityPlaceholder: 'City (e.g., Casablanca, Paris, Dubai)',
      countryPlaceholder: 'Country (optional, e.g., Morocco, France)',
      search: 'Search',
      loading: 'Loading...'
    },
    favoriteCity: {
      title: 'Favorite city',
      subtitleAr: 'المدينة المفضلة',
      load: 'Load',
      loadTitle: 'Load this city',
      removeTitle: 'Remove from favorites',
      hint: '⭐ Click "Load" to show prayer times for this city'
    },
    qiblaToggle: {
      info: '🧭 Qibla compass available with your GPS position!',
      show: 'Show Qibla Compass',
      hide: 'Hide Qibla Compass'
    },
    countdown: {
      title: 'Next prayer',
      audioTest: 'Test Adhan audio',
      notifOnTitle: 'Disable notifications',
      notifOffTitle: 'Enable notifications',
      today: 'Today',
      tomorrow: 'Tomorrow',
      minutes: 'minutes',
      minute: 'minute',
      at: 'at',
      notifyHint: 'You will receive a notification 10 minutes before each prayer',
      testError: '❌ Error: Please ensure adhan.mp3 is inside the public/ folder'
    },
    prayerTimes: {
      gpsBadge: 'Times calculated with your GPS position (highest accuracy)',
      timezonePrefix: '📍 ',
      methodPrefix: '📐 ',
      dateLocale: 'en-US'
    },
    adhanPlayer: {
      playing: 'Adhan playing',
      stop: 'Stop Adhan'
    },
    languageLabel: 'Language'
  },
  ar: {
    code: 'AR',
    dir: 'rtl',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    online: 'متصل',
    separator: 'أو',
    headerTitle: 'مواقيت الصلاة',
    headerArabic: 'مواقيت الصلاة',
    headerEnglish: 'مواقيت الصلاة',
    welcome: {
      title: 'أهلا وسهلا',
      arabic: 'مرحبا بك',
      gps: 'استخدم تحديد الموقع للحصول على أعلى دقة',
      manual: 'أو ابحث عن مدينتك يدويًا'
    },
    errors: {
      geoNotSupported: '❌ المتصفح لا يدعم تحديد الموقع.',
      permissionDenied: '❌ تم رفض الإذن. يرجى السماح بالوصول إلى موقعك.',
      geoError: '❌ خطأ في تحديد الموقع.',
      apiConnection: '❌ خطأ في الاتصال بواجهة البرمجة.',
      cityNotFound: '❌ لم يتم العثور على المدينة.',
      connection: '❌ خطأ في الاتصال.',
      notificationDenied: '❌ تم رفض إذن الإشعارات.'
    },
    gpsButton: {
      locating: 'جاري تحديد الموقع...',
      action: '📍 استخدام موقعي عبر GPS',
      accuracy: 'أكثر دقة'
    },
    searchBar: {
      title: 'موقعك',
      cityPlaceholder: 'المدينة (مثال: الدار البيضاء، باريس، دبي)',
      countryPlaceholder: 'البلد (اختياري، مثال: المغرب، فرنسا)',
      search: 'بحث',
      loading: 'جار التحميل...'
    },
    favoriteCity: {
      title: 'المدينة المفضلة',
      subtitleAr: 'المدينة المفضلة',
      load: 'تحميل',
      loadTitle: 'تحميل هذه المدينة',
      removeTitle: 'حذف من المفضلة',
      hint: '⭐ اضغط "تحميل" لعرض مواقيت الصلاة لهذه المدينة'
    },
    qiblaToggle: {
      info: '🧭 بوصلة القبلة متاحة باستخدام موقعك عبر GPS!',
      show: 'إظهار بوصلة القبلة',
      hide: 'إخفاء بوصلة القبلة'
    },
    countdown: {
      title: 'الصلاة القادمة',
      audioTest: 'تجربة صوت الأذان',
      notifOnTitle: 'إيقاف الإشعارات',
      notifOffTitle: 'تفعيل الإشعارات',
      today: 'اليوم',
      tomorrow: 'غدًا',
      minutes: 'دقائق',
      minute: 'دقيقة',
      at: 'في',
      notifyHint: 'ستصلك إشعارات قبل 10 دقائق من كل صلاة',
      testError: '❌ خطأ: تأكد من وجود ملف adhan.mp3 داخل مجلد public/'
    },
    prayerTimes: {
      gpsBadge: 'المواقيت محسوبة اعتمادًا على موقعك (أدق نتيجة)',
      timezonePrefix: '📍 ',
      methodPrefix: '📐 ',
      dateLocale: 'ar-MA'
    },
    adhanPlayer: {
      playing: 'الأذان قيد التشغيل',
      stop: 'إيقاف الأذان'
    },
    languageLabel: 'اللغة'
  }
};

function MainPage({ onNavigate }) {
  const [prayerData, setPrayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGPS, setIsGPS] = useState(false);
  const [favoriteCity, setFavoriteCity] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [showQibla, setShowQibla] = useState(false);
  const [currentPlayingPrayer, setCurrentPlayingPrayer] = useState(null);
  const [language, setLanguage] = useState('fr');
  const audioCheckerIntervalRef = useRef(null);
  const t = translations[language];

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = translations[language].dir;
    }
  }, [language]);

  // Initialiser le service audio
  useEffect(() => {
    audioService.init('/adhan.mp3');
    
    audioService.setCallbacks(
      (prayer) => {
        if (prayer) {
          setCurrentPlayingPrayer(prayer);
          console.log(`🔊 Adhan joue pour ${prayer.name}`);
        }
      },
      () => {
        setCurrentPlayingPrayer(null);
        console.log('✅ Adhan terminé');
      }
    );
    
    return () => {
      if (audioCheckerIntervalRef.current) {
        audioService.stopPrayerTimeChecker(audioCheckerIntervalRef.current);
      }
      audioService.setCallbacks(null, null);
    };
  }, []);

  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    const saved = storageService.getFavoriteCity();
    if (saved) {
      setFavoriteCity(saved);
    }

    const lastData = storageService.getLastPrayerData();
    if (lastData) {
      setPrayerData(lastData.data);
      setIsGPS(lastData.isGPS);
      
      if (lastData.data) {
        const intervalId = audioService.startPrayerTimeChecker(
          lastData.data.timings,
          lastData.data.meta.timezone
        );
        audioCheckerIntervalRef.current = intervalId;
      }
    }

    const notifPref = storageService.getNotificationPreference();
    setNotificationsEnabled(notifPref);
  }, []);

  const getMethodForCoordinates = (lat, lon) => {
    if (lat >= 28 && lat <= 37 && lon >= -17 && lon <= 25) {
      return 3;
    } else if (lat >= 29 && lat <= 37 && lon >= 25 && lon <= 43) {
      return 5;
    } else if (lat >= 12 && lat <= 32 && lon >= 34 && lon <= 60) {
      return 4;
    } else if (lat >= 23 && lat <= 37 && lon >= 60 && lon <= 97) {
      return 1;
    } else if (lat >= -10 && lat <= 7 && lon >= 95 && lon <= 141) {
      return 11;
    } else if (lat >= 36 && lat <= 42 && lon >= 26 && lon <= 45) {
      return 9;
    } else if (lat >= 25 && lat <= 72 && lon >= -170 && lon <= -52) {
      return 2;
    } else {
      return 3;
    }
  };

  const handleGPSSearch = () => {
    setLoading(true);
    setError('');
    setPrayerData(null);
    
    if (!navigator.geolocation) {
      setError(t.errors.geoNotSupported);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        setUserPosition({ latitude, longitude });
        setShowQibla(true);
        
        const method = getMethodForCoordinates(latitude, longitude);
        
        try {
          const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.code === 200) {
            setPrayerData(data.data);
            setIsGPS(true);
            storageService.savePrayerData(data.data, true);
            
            if (audioCheckerIntervalRef.current) {
              audioService.stopPrayerTimeChecker(audioCheckerIntervalRef.current);
            }
            
            const intervalId = audioService.startPrayerTimeChecker(
              data.data.timings,
              data.data.meta.timezone
            );
            audioCheckerIntervalRef.current = intervalId;
            
            if (notificationsEnabled) {
              notificationService.scheduleNotifications(
                data.data.timings,
                data.data.meta.timezone
              );
            }
          }
        } catch (err) {
          setError(t.errors.apiConnection);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        if (err.code === 1) {
          setError(t.errors.permissionDenied);
        } else {
          setError(t.errors.geoError);
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSearch = async (city, country) => {
    setLoading(true);
    setError('');
    setPrayerData(null);
    setIsGPS(false);
    setUserPosition(null);

    try {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=3`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.code === 200) {
        setPrayerData(data.data);
        storageService.savePrayerData(data.data, false);
        storageService.saveFavoriteCity(city, country);
        setFavoriteCity({ city, country });
        
        if (audioCheckerIntervalRef.current) {
          audioService.stopPrayerTimeChecker(audioCheckerIntervalRef.current);
        }
        
        const intervalId = audioService.startPrayerTimeChecker(
          data.data.timings,
          data.data.meta.timezone
        );
        audioCheckerIntervalRef.current = intervalId;
        
        if (notificationsEnabled) {
          notificationService.scheduleNotifications(
            data.data.timings,
            `${city}${country ? ', ' + country : ''}`
          );
        }
      } else {
        setError(t.errors.cityNotFound);
      }
    } catch (err) {
      setError(t.errors.connection);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadFavorite = () => {
    if (favoriteCity) {
      handleSearch(favoriteCity.city, favoriteCity.country);
    }
  };

  const handleRemoveFavorite = () => {
    storageService.clearAll();
    setFavoriteCity(null);
    setPrayerData(null);
    setUserPosition(null);
  };

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      const granted = await notificationService.requestPermission();
      if (granted) {
        setNotificationsEnabled(true);
        storageService.saveNotificationPreference(true);
        
        if (prayerData) {
          notificationService.scheduleNotifications(
            prayerData.timings,
            prayerData.meta.timezone
          );
        }
      } else {
        setError(t.errors.notificationDenied);
      }
    } else {
      setNotificationsEnabled(false);
      storageService.saveNotificationPreference(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Arrière-plan animé avec motifs islamiques */}
      <IslamicAnimatedBackground />
      
      {/* Overlay sombre pour le contraste */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>
      
      {/* Notification Adhan en cours */}
      <AdhanPlayer texts={t.adhanPlayer} language={language} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Barre de navigation supérieure */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-xl text-sm font-medium transition-all duration-200 border border-white/20 hover:border-white/30 shadow-lg"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToHome}
          </button>

          <div className="flex flex-wrap gap-2 items-center justify-end">
            <button
              onClick={() => onNavigate('mosques')}
              className="group flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white bg-sky-500/80 hover:bg-sky-500 rounded-xl text-sm font-semibold transition-all duration-200 border border-sky-300/40 shadow-lg"
            >
              <span>🗺️</span>
              <span>Mosquées proches</span>
            </button>

            <button
              onClick={() => onNavigate('adhkar')}
              className="group flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white bg-amber-500/80 hover:bg-amber-500 rounded-xl text-sm font-semibold transition-all duration-200 border border-amber-300/40 shadow-lg"
            >
              <span>📿</span>
              <span>Adhkâr</span>
            </button>
          
            <div className="flex items-center gap-3">
              {/* Indicateur de statut */}
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-xl border border-emerald-400/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-xs font-medium">{t.online}</span>
              </div>

              {/* Sélecteur de langue */}
              <div className="flex items-center gap-2 px-2 py-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                {Object.keys(translations).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                      language === lang
                        ? 'bg-emerald-500 text-white shadow'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    aria-label={`${t.languageLabel}: ${translations[lang].code}`}
                  >
                    {translations[lang].code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Header amélioré */}
        <header className="text-center mb-10 pt-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-6xl animate-pulse">🕌</div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white french-text drop-shadow-lg">
              {t.headerTitle}
            </h1>
          </div>
          <p className="text-3xl sm:text-4xl text-emerald-300 arabic-text mb-3 drop-shadow-md">
            {t.headerArabic}
          </p>
          <p className="text-xl sm:text-2xl text-emerald-200 english-text mb-2 drop-shadow-md">
            {t.headerEnglish}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mt-4 rounded-full"></div>
        </header>
        
        <GPSButton onGPSClick={handleGPSSearch} loading={loading} texts={t.gpsButton} />

        {favoriteCity && (
          <FavoriteCity
            city={favoriteCity.city}
            country={favoriteCity.country}
            onLoad={handleLoadFavorite}
            onRemove={handleRemoveFavorite}
            texts={t.favoriteCity}
          />
        )}

        {/* Séparateur élégant */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-white/30"></div>
          <span className="text-white/70 text-sm font-medium px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">{t.separator}</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/30 to-white/30"></div>
        </div>
        
        <SearchBar onSearch={handleSearch} loading={loading} texts={t.searchBar} />

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-md border-l-4 border-red-400 rounded-xl shadow-lg animate-fade-in">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-white font-medium">{error}</p>
            </div>
          </div>
        )}

        <QiblaToggle
          isOpen={showQibla}
          onToggle={() => setShowQibla(!showQibla)}
          hasPosition={!!userPosition}
          texts={t.qiblaToggle}
        />

        {showQibla && <QiblaCompass userPosition={userPosition} />}

        {prayerData && (
          <NextPrayerCountdown
            timings={prayerData.timings}
            onNotificationToggle={handleNotificationToggle}
            notificationsEnabled={notificationsEnabled}
            texts={t.countdown}
          />
        )}

        {prayerData && (
          <PrayerTimes
            data={prayerData}
            isGPS={isGPS}
            language={language}
            texts={t.prayerTimes}
          />
        )}

        {!prayerData && !loading && !error && (
          <div className="text-center p-12 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 animate-fade-in">
            <div className="text-7xl mb-6 animate-bounce">🕌</div>
            <h3 className="text-white text-2xl font-bold mb-3">
              {t.welcome.title}
            </h3>
            <p className="text-white/80 text-lg mb-4 arabic-text">
              {t.welcome.arabic}
            </p>
            <div className="space-y-2 text-white/70">
              <p className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t.welcome.gps}
              </p>
              <p className="text-sm">
                {t.welcome.manual}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;

