import React, { useState, useEffect } from 'react';

function RandomMosqueBackground() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Liste de mots-clés pour rechercher des mosquées
  const mosqueKeywords = [
    'mosque',
    'masjid',
    'islamic architecture',
    'kaaba',
    'mecca',
    'medina',
    'blue mosque',
    'hagia sophia',
    'sheikh zayed mosque',
    'islamic',
    'dome',
    'minaret',
    'prayer'
  ];

  // IDs de collections Unsplash avec des mosquées (optionnel, pour de meilleures images)
  const mosqueCollections = [
    'mosque',
    'islamic-architecture',
    'mecca',
    'medina'
  ];

  // Fonction pour charger une image aléatoire depuis Unsplash
  const loadRandomMosqueImage = async () => {
    setLoading(true);
    try {
      // Sélectionner un mot-clé aléatoire
      const randomKeyword = mosqueKeywords[Math.floor(Math.random() * mosqueKeywords.length)];
      
      // Méthode 1: Utiliser Unsplash Source API (gratuit, pas besoin de clé API)
      // Ajouter un timestamp pour forcer le rafraîchissement
      const timestamp = Date.now();
      const imageUrl = `https://source.unsplash.com/featured/1920x1080/?${encodeURIComponent(randomKeyword)}&sig=${timestamp}`;
      
      // Créer une nouvelle image pour précharger
      const img = new Image();
      
      img.onload = () => {
        setBackgroundImage(imageUrl);
        setLoading(false);
        console.log(`🕌 Image de mosquée chargée: ${randomKeyword}`);
      };
      
      img.onerror = () => {
        // Si erreur, essayer une autre méthode
        console.log('Tentative avec une autre source...');
        const fallbackUrl = `https://source.unsplash.com/1920x1080/?mosque&sig=${timestamp}`;
        const fallbackImg = new Image();
        
        fallbackImg.onload = () => {
          setBackgroundImage(fallbackUrl);
          setLoading(false);
        };
        
        fallbackImg.onerror = () => {
          // Dernière image de secours
          setBackgroundImage('https://images.unsplash.com/photo-1519735777092-2d37e07b5d66?w=1920&h=1080&fit=crop');
          setLoading(false);
        };
        
        fallbackImg.src = fallbackUrl;
      };
      
      // Déclencher le chargement
      img.src = imageUrl;
      
    } catch (error) {
      console.error('Erreur lors du chargement de l\'image:', error);
      // Image de secours
      setBackgroundImage('https://images.unsplash.com/photo-1519735777092-2d37e07b5d66?w=1920&h=1080&fit=crop');
      setLoading(false);
    }
  };

  // Charger une nouvelle image au montage et périodiquement
  useEffect(() => {
    loadRandomMosqueImage();
    
    // Changer l'image toutes les 60 secondes (1 minute)
    const interval = setInterval(() => {
      loadRandomMosqueImage();
    }, 60000); // 60 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        opacity: loading ? 0.15 : 0.4,
        filter: loading ? 'blur(15px) brightness(0.7)' : 'blur(3px) brightness(0.6) saturate(1.2)',
        transform: 'scale(1.05)',
      }}
    >
      {/* Overlay gradient professionnel pour améliorer la lisibilité */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-teal-950/80 via-emerald-950/75 to-green-950/80 transition-opacity duration-1000"
        style={{
          mixBlendMode: 'multiply',
        }}
      ></div>
      
      {/* Overlay supplémentaire avec dégradé radial pour le centre */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 100%)',
          opacity: loading ? 0.6 : 0.5
        }}
      ></div>
      
      {/* Overlay de brillance subtile */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"
      ></div>
      
      {/* Effet de vignette professionnel */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0, 0, 0, 0.5)'
        }}
      ></div>
      
      {/* Indicateur de chargement élégant */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <div className="text-white/60 text-sm font-medium">Chargement d'une belle mosquée...</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomMosqueBackground;

