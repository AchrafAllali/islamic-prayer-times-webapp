// Service pour calculer la direction de la Qibla
export const qiblaService = {
  // Coordonnées de la Kaaba (Makkah)
  KAABA: {
    latitude: 21.4225,
    longitude: 39.8262
  },

  // Convertir degrés en radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  },

  // Convertir radians en degrés
  toDegrees(radians) {
    return radians * (180 / Math.PI);
  },

  // Calculer la direction Qibla depuis une position
  calculateQiblaDirection(userLat, userLon) {
    const kaabaLat = this.toRadians(this.KAABA.latitude);
    const kaabaLon = this.toRadians(this.KAABA.longitude);
    const userLatRad = this.toRadians(userLat);
    const userLonRad = this.toRadians(userLon);

    const deltaLon = kaabaLon - userLonRad;

    // Formule de calcul de l'angle
    const y = Math.sin(deltaLon);
    const x = Math.cos(userLatRad) * Math.tan(kaabaLat) - 
              Math.sin(userLatRad) * Math.cos(deltaLon);

    let qiblaDirection = this.toDegrees(Math.atan2(y, x));

    // Normaliser entre 0 et 360
    qiblaDirection = (qiblaDirection + 360) % 360;

    return qiblaDirection;
  },

  // Calculer la distance vers la Kaaba (en km)
  calculateDistanceToKaaba(userLat, userLon) {
    const R = 6371; // Rayon de la Terre en km
    
    const lat1 = this.toRadians(userLat);
    const lon1 = this.toRadians(userLon);
    const lat2 = this.toRadians(this.KAABA.latitude);
    const lon2 = this.toRadians(this.KAABA.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance);
  },

  // Obtenir la direction cardinale
  getCardinalDirection(degrees) {
    const directions = [
      { name: 'Nord', nameAr: 'شمال', range: [0, 22.5] },
      { name: 'Nord-Est', nameAr: 'شمال شرق', range: [22.5, 67.5] },
      { name: 'Est', nameAr: 'شرق', range: [67.5, 112.5] },
      { name: 'Sud-Est', nameAr: 'جنوب شرق', range: [112.5, 157.5] },
      { name: 'Sud', nameAr: 'جنوب', range: [157.5, 202.5] },
      { name: 'Sud-Ouest', nameAr: 'جنوب غرب', range: [202.5, 247.5] },
      { name: 'Ouest', nameAr: 'غرب', range: [247.5, 292.5] },
      { name: 'Nord-Ouest', nameAr: 'شمال غرب', range: [292.5, 337.5] },
      { name: 'Nord', nameAr: 'شمال', range: [337.5, 360] }
    ];

    for (let dir of directions) {
      if (degrees >= dir.range[0] && degrees < dir.range[1]) {
        return dir;
      }
    }

    return directions[0];
  },

  // Vérifier si l'appareil supporte l'orientation
  isOrientationSupported() {
    return 'DeviceOrientationEvent' in window;
  },

  // Demander la permission pour iOS 13+
  async requestOrientationPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.error('Erreur permission orientation:', error);
        return false;
      }
    }
    return true; // Pas besoin de permission sur Android/Desktop
  }
};