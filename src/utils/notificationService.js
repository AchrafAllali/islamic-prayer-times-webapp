// Service pour gérer les notifications
export const notificationService = {
  // Demander la permission
  async requestPermission() {
    if (!("Notification" in window)) {
      console.log("Ce navigateur ne supporte pas les notifications");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return false;
  },

  // Envoyer une notification
  sendNotification(title, body, icon = "🕌") {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: icon,
        badge: icon,
        tag: "prayer-notification",
        requireInteraction: false
      });
    }
  },

  // Calculer le temps jusqu'à la prochaine prière
  getNextPrayer(timings) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { name: "Fajr", nameAr: "الفجر", time: timings.Fajr },
      { name: "Dhuhr", nameAr: "الظهر", time: timings.Dhuhr },
      { name: "Asr", nameAr: "العصر", time: timings.Asr },
      { name: "Maghrib", nameAr: "المغرب", time: timings.Maghrib },
      { name: "Isha", nameAr: "العشاء", time: timings.Isha }
    ];

    for (let prayer of prayers) {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerTime = hours * 60 + minutes;

      if (prayerTime > currentTime) {
        const remainingMinutes = prayerTime - currentTime;
        return {
          ...prayer,
          remainingMinutes,
          hours: Math.floor(remainingMinutes / 60),
          minutes: remainingMinutes % 60
        };
      }
    }

    // Si toutes les prières sont passées, retourner Fajr du lendemain
    const [hours, minutes] = prayers[0].time.split(":").map(Number);
    const fajrTime = hours * 60 + minutes;
    const remainingMinutes = (24 * 60 - currentTime) + fajrTime;

    return {
      ...prayers[0],
      remainingMinutes,
      hours: Math.floor(remainingMinutes / 60),
      minutes: remainingMinutes % 60,
      isTomorrow: true
    };
  },

  // Planifier les notifications
  scheduleNotifications(timings, cityName) {
    const prayers = [
      { name: "Fajr", nameAr: "الفجر", time: timings.Fajr, icon: "🌅" },
      { name: "Dhuhr", nameAr: "الظهر", time: timings.Dhuhr, icon: "☀️" },
      { name: "Asr", nameAr: "العصر", time: timings.Asr, icon: "🌤️" },
      { name: "Maghrib", nameAr: "المغرب", time: timings.Maghrib, icon: "🌆" },
      { name: "Isha", nameAr: "العشاء", time: timings.Isha, icon: "🌙" }
    ];

    const now = new Date();
    
    prayers.forEach(prayer => {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerDate = new Date(now);
      prayerDate.setHours(hours, minutes, 0, 0);

      // Notification 10 minutes avant
      const notificationTime = new Date(prayerDate.getTime() - 10 * 60000);

      if (notificationTime > now) {
        const delay = notificationTime - now;
        setTimeout(() => {
          this.sendNotification(
            `${prayer.icon} ${prayer.name} - ${prayer.nameAr}`,
            `Dans 10 minutes à ${cityName}\nHeure: ${prayer.time}`,
            prayer.icon
          );
        }, delay);
      }
    });
  }
};