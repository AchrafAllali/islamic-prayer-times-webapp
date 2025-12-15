import React, { useState, useEffect } from 'react';
import { Navigation, Compass, MapPin, Info } from 'lucide-react';
import { qiblaService } from '../utils/qiblaService';

function QiblaCompass({ userPosition }) {
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [distance, setDistance] = useState(null);
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [error, setError] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Calculer la direction Qibla
  useEffect(() => {
    if (userPosition) {
      const direction = qiblaService.calculateQiblaDirection(
        userPosition.latitude,
        userPosition.longitude
      );
      const dist = qiblaService.calculateDistanceToKaaba(
        userPosition.latitude,
        userPosition.longitude
      );
      
      setQiblaDirection(direction);
      setDistance(dist);
    }
  }, [userPosition]);

  // Gérer l'orientation de l'appareil
  useEffect(() => {
    if (!qiblaService.isOrientationSupported()) {
      setError('Votre appareil ne supporte pas la boussole');
      return;
    }

    const handleOrientation = (event) => {
      let heading = 0;

      if (event.webkitCompassHeading !== undefined) {
        // iOS
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        // Android
        heading = 360 - event.alpha;
      }

      setDeviceHeading(heading);
      setIsCalibrating(false);
    };

    const startListening = async () => {
      const granted = await qiblaService.requestOrientationPermission();
      setPermissionGranted(granted);

      if (granted) {
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      } else {
        setError('Permission refusée pour accéder à la boussole');
      }
    };

    startListening();

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Demander la permission manuellement (pour iOS)
  const handleRequestPermission = async () => {
    const granted = await qiblaService.requestOrientationPermission();
    setPermissionGranted(granted);
    if (!granted) {
      setError('Permission refusée. Activez la boussole dans les paramètres.');
    }
  };

  if (!userPosition) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
        <Compass className="mx-auto mb-4 text-gray-400" size={64} />
        <p className="text-gray-600">
          📍 Utilisez le GPS pour activer la boussole Qibla
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <Info className="text-red-500 flex-shrink-0 mt-1" size={24} />
          <div>
            <p className="text-red-700 font-medium mb-2">{error}</p>
            {!permissionGranted && (
              <button
                onClick={handleRequestPermission}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
              >
                Autoriser la boussole
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Calculer l'angle relatif entre l'appareil et la Qibla
  const relativeAngle = (qiblaDirection - deviceHeading + 360) % 360;
  const cardinalDirection = qiblaService.getCardinalDirection(qiblaDirection);
  
  // Déterminer si on est aligné (tolérance de ±15 degrés)
  const isAligned = Math.abs(relativeAngle) <= 15 || Math.abs(relativeAngle - 360) <= 15;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Compass className="text-emerald-600" size={28} />
            Direction Qibla
          </h3>
          <p className="text-sm text-gray-600 arabic-text mt-1">اتجاه القبلة</p>
        </div>
        
        {isCalibrating && (
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            Calibration...
          </div>
        )}
      </div>

      {/* Boussole 3D */}
      <div className="relative w-full aspect-square max-w-sm mx-auto mb-6 perspective-1000">
        {/* Conteneur 3D principal avec animation subtile */}
        <div 
          className="relative w-full h-full transform-style-preserve-3d"
          style={{
            transform: 'perspective(1000px) rotateX(8deg)',
            transformStyle: 'preserve-3d',
            animation: 'float3D 6s ease-in-out infinite'
          }}
        >
          {/* Cercle extérieur 3D avec relief */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-50"
            style={{
              boxShadow: `
                inset 0 0 30px rgba(16, 185, 129, 0.3),
                inset 0 0 60px rgba(16, 185, 129, 0.1),
                0 10px 40px rgba(0, 0, 0, 0.2),
                0 0 0 8px rgba(16, 185, 129, 0.1),
                0 0 0 16px rgba(20, 184, 166, 0.05)
              `,
              border: '3px solid rgba(16, 185, 129, 0.2)',
              transform: 'translateZ(0px)'
            }}
          ></div>
          
          {/* Bordure 3D avec effet de profondeur */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              border: '4px solid',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              boxShadow: `
                inset 0 0 20px rgba(16, 185, 129, 0.2),
                0 5px 15px rgba(0, 0, 0, 0.15)
              `,
              transform: 'translateZ(2px)'
            }}
          ></div>
          
          {/* Marqueurs cardinaux 3D */}
          <div className="absolute inset-0" style={{ transform: 'translateZ(5px)' }}>
            {['N', 'E', 'S', 'O'].map((dir, index) => {
              const angle = index * 90;
              const radius = 140;
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const y = -Math.cos((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={dir}
                  className="absolute text-lg font-bold"
                  style={{
                    top: '50%',
                    left: '50%',
                    color: dir === 'N' ? '#ef4444' : '#374151',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) translateZ(10px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {dir}
                </div>
              );
            })}
          </div>

          {/* Marqueurs intermédiaires 3D */}
          <div className="absolute inset-0" style={{ transform: 'translateZ(3px)' }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
              const radius = 130;
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const y = -Math.cos((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute w-1 h-4 bg-gray-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle}deg) translateZ(5px)`,
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                ></div>
              );
            })}
          </div>

          {/* Flèche Qibla 3D (fixe) */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `rotate(${relativeAngle}deg) translateZ(8px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Kaaba 3D */}
            <div 
              className="absolute top-1/2 left-1/2"
              style={{
                transform: 'translate(-50%, -50%) translateZ(15px)',
                filter: isAligned ? 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
              }}
            >
              <div className={`text-6xl ${isAligned ? 'animate-bounce' : ''}`} style={{
                transform: 'scale(1.1)',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.4)'
              }}>
                🕋
              </div>
            </div>
            
            {/* Flèche Qibla 3D avec ombre */}
            <div 
              className="absolute top-1/2 left-1/2"
              style={{
                transform: 'translate(-50%, -50%) translateZ(10px)'
              }}
            >
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-32 -mt-32"
                style={{
                  background: `linear-gradient(to top, ${isAligned ? '#22c55e' : '#10b981'} 0%, ${isAligned ? '#16a34a' : '#059669'} 100%)`,
                  borderRadius: '4px',
                  boxShadow: `
                    0 4px 8px rgba(0, 0, 0, 0.3),
                    inset 0 0 10px rgba(255, 255, 255, 0.2)
                  `,
                  transform: 'translateZ(5px)'
                }}
              ></div>
              
              {/* Pointe de flèche 3D */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderBottom: `20px solid ${isAligned ? '#16a34a' : '#059669'}`,
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
                  transform: 'translateZ(8px)'
                }}
              ></div>
            </div>
          </div>

          {/* Indicateur Nord 3D (suit l'appareil) */}
          <div 
            className="absolute top-4 left-1/2 -translate-x-1/2"
            style={{
              transform: 'translateZ(12px)',
              filter: 'drop-shadow(0 4px 8px rgba(239, 68, 68, 0.5))'
            }}
          >
            <Navigation className="text-red-500" size={36} style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }} />
          </div>

          {/* Centre 3D avec relief */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '16px',
              height: '16px',
              background: 'radial-gradient(circle, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              boxShadow: `
                0 4px 8px rgba(0, 0, 0, 0.3),
                inset 0 2px 4px rgba(255, 255, 255, 0.3),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2)
              `,
              transform: 'translateZ(15px)',
              border: '2px solid rgba(255, 255, 255, 0.5)'
            }}
          ></div>
          
          {/* Reflet de lumière 3D */}
          <div 
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
              transform: 'translateZ(1px)',
              pointerEvents: 'none'
            }}
          ></div>
        </div>
      </div>

      {/* Statut d'alignement */}
      {isAligned && (
        <div className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-xl text-center animate-pulse">
          <p className="text-green-700 font-bold text-lg">✅ Aligné avec la Qibla !</p>
          <p className="text-green-600 text-sm arabic-text mt-1">محاذاة القبلة</p>
        </div>
      )}

      {/* Informations */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-emerald-50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-emerald-600">
            {Math.round(qiblaDirection)}°
          </div>
          <div className="text-sm text-gray-600 mt-1">Direction</div>
          <div className="text-xs text-emerald-600 arabic-text">{cardinalDirection.nameAr}</div>
        </div>

        <div className="bg-teal-50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-teal-600">
            {distance?.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 mt-1">km vers La Mecque</div>
          <div className="text-xs text-teal-600 arabic-text">إلى مكة</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">💡 Comment utiliser :</p>
            <ul className="space-y-1 text-xs">
              <li>• Tenez votre téléphone à plat</li>
              <li>• Tournez-vous jusqu'à ce que la Kaaba 🕋 soit en haut</li>
              <li>• Quand c'est vert, vous êtes aligné !</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QiblaCompass;