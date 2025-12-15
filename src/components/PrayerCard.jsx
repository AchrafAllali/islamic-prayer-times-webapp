import React from 'react';

function PrayerCard({ name, nameArabic, time, icon }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
          {icon}
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-lg">
            {name}
          </div>
          <div className="text-emerald-600 arabic-text text-sm">
            {nameArabic}
          </div>
        </div>
      </div>
      <div className="text-3xl font-bold text-emerald-700">
        {time}
      </div>
    </div>
  );
}

export default PrayerCard;