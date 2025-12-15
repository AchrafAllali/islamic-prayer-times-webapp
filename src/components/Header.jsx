import React from 'react';

function Header() {
  return (
    <header className="text-center mb-8 pt-8">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="text-5xl">🕌</div>
        <h1 className="text-5xl font-bold text-emerald-800 french-text">
          Horaires de Prière
        </h1>
      </div>
      <p className="text-2xl text-emerald-600 arabic-text mb-2">
        مواقيت الصلاة
      </p>
      <p className="text-lg text-emerald-500 english-text mb-1">
        Prayer Times
      </p>
      <p className="text-sm text-gray-600 mt-2 french-text">
        Des horaires précis pour votre localisation
      </p>
    </header>
  );
}

export default Header;