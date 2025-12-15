import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import PrayerCard from './PrayerCard';

function PrayerTimes({ data, isGPS, language = 'fr', texts }) {
  if (!data) return null;

  const t = texts || {
    gpsBadge: 'Horaires calculés avec votre position GPS (précision maximale)',
    timezonePrefix: '📍 ',
    methodPrefix: '📐 ',
    dateLocale: 'fr-FR',
    prayerNames: {
      Fajr: 'Fajr',
      Dhuhr: 'Dhuhr',
      Asr: 'Asr',
      Maghrib: 'Maghrib',
      Isha: 'Isha'
    }
  };

  const locale = t.dateLocale || 'fr-FR';

  const prayers = [
    { 
      name: t.prayerNames?.Fajr || 'Fajr', 
      nameArabic: 'الفجر', 
      key: 'Fajr',
      icon: '🌅'
    },
    { 
      name: t.prayerNames?.Dhuhr || 'Dhuhr', 
      nameArabic: 'الظهر', 
      key: 'Dhuhr',
      icon: '☀️'
    },
    { 
      name: t.prayerNames?.Asr || 'Asr', 
      nameArabic: 'العصر', 
      key: 'Asr',
      icon: '🌤️'
    },
    { 
      name: t.prayerNames?.Maghrib || 'Maghrib', 
      nameArabic: 'المغرب', 
      key: 'Maghrib',
      icon: '🌆'
    },
    { 
      name: t.prayerNames?.Isha || 'Isha', 
      nameArabic: 'العشاء', 
      key: 'Isha',
      icon: '🌙'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Badge GPS */}
      {isGPS && (
        <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
          <p className="text-green-700 text-sm font-medium flex items-center gap-2">
            <MapPin size={16} />
            {t.gpsBadge}
          </p>
        </div>
      )}

      {/* Info Date */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            {t.timezonePrefix}{data.meta.timezone}
          </h3>
          <p className="text-gray-600 mt-1">
            {new Date(data.date.readable).toLocaleDateString(locale, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-emerald-600 text-sm mt-1 arabic-text">
            {data.date.hijri.date} {data.date.hijri.month.ar} {data.date.hijri.year}
          </p>
        </div>
        <Clock className="text-emerald-600" size={36} />
      </div>

      {/* Liste des Prières */}
      <div className="space-y-3">
        {prayers.map((prayer) => (
          <PrayerCard
            key={prayer.key}
            name={prayer.name}
            nameArabic={prayer.nameArabic}
            time={data.timings[prayer.key].split(' ')[0]}
            icon={prayer.icon}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t-2 border-gray-100 text-center">
        <p className="text-sm text-gray-500">
          {t.methodPrefix}{data.meta.method.name}
        </p>
      </div>
    </div>
  );
}

export default PrayerTimes;