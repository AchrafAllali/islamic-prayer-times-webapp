// Service pour gérer localStorage
export const storageService = {
  // Sauvegarder la ville favorite
  saveFavoriteCity(city, country) {
    const favorite = {
      city,
      country,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("favoriteCity", JSON.stringify(favorite));
  },

  // Récupérer la ville favorite
  getFavoriteCity() {
    const favorite = localStorage.getItem("favoriteCity");
    return favorite ? JSON.parse(favorite) : null;
  },

  // Sauvegarder les dernières données de prière
  savePrayerData(data, isGPS = false) {
    const savedData = {
      data,
      isGPS,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("lastPrayerData", JSON.stringify(savedData));
  },

  // Récupérer les dernières données
  getLastPrayerData() {
    const saved = localStorage.getItem("lastPrayerData");
    if (!saved) return null;

    const { data, isGPS, timestamp } = JSON.parse(saved);
    const savedDate = new Date(timestamp);
    const now = new Date();

    // Vérifier si les données sont du jour même
    if (
      savedDate.getDate() === now.getDate() &&
      savedDate.getMonth() === now.getMonth() &&
      savedDate.getFullYear() === now.getFullYear()
    ) {
      return { data, isGPS };
    }

    return null;
  },

  // Sauvegarder les préférences de notification
  saveNotificationPreference(enabled) {
    localStorage.setItem("notificationsEnabled", enabled.toString());
  },

  // Récupérer les préférences
  getNotificationPreference() {
    const pref = localStorage.getItem("notificationsEnabled");
    return pref === "true";
  },

  // Effacer toutes les données
  clearAll() {
    localStorage.removeItem("favoriteCity");
    localStorage.removeItem("lastPrayerData");
    localStorage.removeItem("notificationsEnabled");
  }
};