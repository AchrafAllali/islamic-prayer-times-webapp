import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

function SearchBar({ onSearch, loading, texts }) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const t = texts || {
    title: 'Votre localisation',
    cityPlaceholder: 'Ville (ex: Casablanca, Paris, Dubai)',
    countryPlaceholder: 'Pays (optionnel, ex: Morocco, France)',
    search: 'Rechercher',
    loading: 'Chargement...'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city, country);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-emerald-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">
          {t.title}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder={t.cityPlaceholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition"
          required
        />

        <input
          type="text"
          placeholder={t.countryPlaceholder}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t.loading}
            </>
          ) : (
            <>
              <Search size={20} />
              {t.search}
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;