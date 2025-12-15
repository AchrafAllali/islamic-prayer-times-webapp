import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Compass, Bell } from 'lucide-react';

function HomePage({ onNavigate }) {
  const [mosqueImage, setMosqueImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentMosque, setCurrentMosque] = useState(null);

  // Images réelles de mosquées célèbres depuis le dossier public/images
  const famousMosques = [
    {
      name: 'Mosquée Hassan II',
      nameAr: 'مسجد الحسن الثاني',
      imageUrl: '/images/mosque_hassan2.jpg'
    },
    {
      name: 'Al-Aqsa / Al-Qods',
      nameAr: 'المسجد الأقصى',
      imageUrl: '/images/Al-Qods.jpg'
    },
    {
      name: 'La Mecque',
      nameAr: 'مكة المكرمة',
      imageUrl: '/images/maka.jpg'
    }
  ];

  // Charger une image de mosquée célèbre au démarrage
  useEffect(() => {
    const loadMosqueImage = async () => {
      setLoading(true);
      
      // Sélectionner une mosquée aléatoire
      const randomMosque = famousMosques[Math.floor(Math.random() * famousMosques.length)];
      
      const img = new Image();
      
      img.onload = () => {
        setMosqueImage(img.src);
        setCurrentMosque(randomMosque);
        setLoading(false);
        console.log(`🕌 Image chargée: ${randomMosque.name} (${randomMosque.nameAr})`);
      };
      
      img.onerror = () => {
        // Si l'image ne charge pas, essayer une autre mosquée
        console.log(`⚠️ Erreur de chargement pour ${randomMosque.name}`);
        console.log(`📁 Vérifiez que l'image existe : public${randomMosque.imageUrl}`);
        
        // Essayer les autres mosquées dans l'ordre
        const otherMosques = famousMosques.filter(m => m.imageUrl !== randomMosque.imageUrl);
        
        if (otherMosques.length > 0) {
          const otherMosque = otherMosques[0];
          const fallbackImg = new Image();
          
          fallbackImg.onload = () => {
            setMosqueImage(otherMosque.imageUrl);
            setCurrentMosque(otherMosque);
            setLoading(false);
            console.log(`✅ Image chargée: ${otherMosque.name}`);
          };
          
          fallbackImg.onerror = () => {
            console.error('❌ Aucune image locale trouvée. Assurez-vous que les images sont dans public/images/');
            // Afficher quand même la page avec une couleur de fond
            setMosqueImage('');
            setCurrentMosque(randomMosque);
            setLoading(false);
          };
          
          fallbackImg.src = otherMosque.imageUrl;
        } else {
          setMosqueImage('');
          setCurrentMosque(randomMosque);
          setLoading(false);
        }
      };
      
      // Charger l'image spécifique de la mosquée
      img.src = randomMosque.imageUrl;
    };

    loadMosqueImage();
    
    // Changer l'image toutes les 30 secondes pour voir différentes mosquées
    const interval = setInterval(() => {
      loadMosqueImage();
    }, 30000); // 30 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Image de fond de mosquée */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: mosqueImage ? `url(${mosqueImage})` : 'none',
          opacity: loading ? 0.3 : 0.6,
          filter: 'blur(1px)',
        }}
      >
        {/* Overlay sombre pour le contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
      </div>

      {/* Contenu de la page d'accueil */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
        {/* Logo et titre */}
        <div className="mb-12 animate-fade-in">
          <div className="text-8xl mb-6 animate-bounce">🕌</div>
          <h1 className="text-6xl font-bold text-white mb-4 arabic-text">
            مواقيت الصلاة
          </h1>
          <h2 className="text-5xl font-bold text-emerald-400 mb-3">
            Horaires de Prière
          </h2>
          <p className="text-2xl text-emerald-300 mb-2">
            Prayer Times
          </p>
          <div className="w-32 h-1 bg-emerald-400 mx-auto mt-6"></div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl text-white/90 mb-6 leading-relaxed">
            Découvrez les horaires de prière précis pour votre localisation
          </p>
          <p className="text-lg text-white/80 arabic-text mb-6">
            اكتشف أوقات الصلاة الدقيقة لموقعك
          </p>
          <p className="text-lg text-white/80 mb-6">
            Discover accurate prayer times for your location
          </p>
          
          {/* Afficher le nom de la mosquée actuelle */}
          {currentMosque && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mt-6">
              <p className="text-emerald-300 font-semibold text-lg mb-1">
                {currentMosque.name}
              </p>
              <p className="text-white/90 arabic-text text-base">
                {currentMosque.nameAr}
              </p>
            </div>
          )}
        </div>

        {/* Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <Clock className="text-emerald-400 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Horaires Précis</h3>
            <p className="text-white/80 text-sm">Horaires calculés selon votre position GPS</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <Compass className="text-emerald-400 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Boussole Qibla</h3>
            <p className="text-white/80 text-sm">Direction de la Kaaba en temps réel</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <Bell className="text-emerald-400 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Notifications</h3>
            <p className="text-white/80 text-sm">Rappels avant chaque prière</p>
          </div>
        </div>

        {/* Bouton pour continuer */}
        <button
          onClick={() => onNavigate('main')}
          className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <span className="flex items-center gap-3">
            Commencer
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
          </span>
        </button>

        {/* Bouton Mosquées proches */}
        <button
          onClick={() => onNavigate('mosques')}
          className="mt-4 group bg-sky-500/90 text-white px-10 py-3 rounded-full text-lg font-bold shadow-2xl hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 animate-fade-in"
          style={{ animationDelay: '0.65s' }}
        >
          <span className="flex items-center gap-2">
            🗺️ Mosquées proches
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </span>
        </button>

        {/* Bouton Adhkâr */}
        <button
          onClick={() => onNavigate('adhkar')}
          className="mt-4 group bg-amber-500/90 text-emerald-900 px-10 py-3 rounded-full text-lg font-bold shadow-2xl hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 animate-fade-in"
          style={{ animationDelay: '0.7s' }}
        >
          <span className="flex items-center gap-2">
            📿 Adhkâr matin & soir
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </span>
        </button>

        {/* Texte multilingue */}
        <div className="mt-8 text-white/60 text-sm space-y-1">
          <p className="arabic-text">ابدأ الآن</p>
          <p>Start Now</p>
        </div>
      </div>

      {/* Indicateur de chargement */}
      {loading && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Chargement d'une belle mosquée...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

