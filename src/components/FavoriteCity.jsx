import React from 'react';
import { Star, Trash2, MapPin } from 'lucide-react';

function FavoriteCity({ city, country, onLoad, onRemove, texts }) {
  const t = texts || {
    title: 'Ville favorite',
    subtitleAr: 'المدينة المفضلة',
    load: 'Charger',
    loadTitle: 'Charger cette ville',
    removeTitle: 'Supprimer des favoris',
    hint: '⭐ Cliquez sur "Charger" pour afficher les horaires de cette ville'
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-lg p-5 mb-6 border-2 border-amber-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <Star className="text-white" size={24} fill="white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="text-amber-600" size={16} />
              <h3 className="text-lg font-bold text-gray-800">
                {t.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-amber-700">
                {city}
              </span>
              {country && (
                <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
                  {country}
                </span>
              )}
            </div>
            <p className="text-xs text-amber-600 mt-1 arabic-text">
              {t.subtitleAr}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onLoad}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-all shadow hover:shadow-md flex items-center gap-2"
            title={t.loadTitle}
          >
            <Star size={16} />
            <span className="hidden sm:inline">{t.load}</span>
          </button>
          
          <button
            onClick={onRemove}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow hover:shadow-md"
            title={t.removeTitle}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-amber-200">
        <p className="text-xs text-gray-600 flex items-center gap-2">
          {t.hint}
        </p>
      </div>
    </div>
  );
}

export default FavoriteCity;