import React, { useState } from 'react';

function MosqueFinderPage({ onNavigate }) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGPS = () => {
    setError('');
    setLoading(true);

    if (!navigator.geolocation) {
      setError("❌ La géolocalisation n'est pas supportée par ce navigateur.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setPosition({ latitude, longitude, accuracy });
        setLoading(false);
      },
      (err) => {
        if (err.code === 1) {
          setError('❌ Permission refusée. Autorisez l’accès à votre position.');
        } else {
          setError('❌ Impossible de récupérer votre position.');
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const openInGoogleMaps = () => {
    if (!position) return;
    const { latitude, longitude } = position;
    // Recherche "mosque" autour de la position, zoom plus rapproché
    const url = `https://www.google.com/maps/search/mosque/@${latitude},${longitude},16z`;
    window.open(url, '_blank');
  };

  const mapEmbedUrl =
    position &&
    // Vue intégrée centrée sur la zone et filtrée sur "mosque"
    `https://www.google.com/maps?q=mosque&ll=${position.latitude},${position.longitude}&z=16&hl=fr&output=embed`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-semibold transition shadow-lg"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>Recherche de mosquées proches via Google Maps</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🕌</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Mosquées proches de vous
          </h1>
          <p className="text-emerald-200 text-sm sm:text-base">
            Utilisez votre position GPS pour ouvrir la recherche de mosquées dans Google Maps.
          </p>
        </div>

        {/* Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center">
          <button
            onClick={handleGPS}
            disabled={loading}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Localisation en cours...
              </>
            ) : (
              <>
                <span>📍 Utiliser ma position GPS</span>
              </>
            )}
          </button>

          <button
            onClick={openInGoogleMaps}
            disabled={!position}
            className="w-full sm:w-auto bg-white text-emerald-900 px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition disabled:bg-white/40 disabled:text-white/60 disabled:cursor-not-allowed"
          >
            <span>🗺️ Ouvrir dans Google Maps</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border-l-4 border-red-400 rounded-xl">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {position && (
          <div className="mb-6 text-sm text-white/80">
            <p>
              <span className="font-semibold">Latitude :</span> {position.latitude.toFixed(5)}{' '}
              | <span className="font-semibold">Longitude :</span> {position.longitude.toFixed(5)}
            </p>
            {position.accuracy && (
              <p className="text-xs text-white/60">
                Précision estimée : ~{Math.round(position.accuracy)} m
              </p>
            )}
          </div>
        )}

        {/* Map embed */}
        {mapEmbedUrl && (
          <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl h-[360px] sm:h-[420px]">
            <iframe
              title="Mosquées proches"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        {!position && !error && !loading && (
          <div className="mt-6 text-center text-white/70 text-sm">
            Cliquez sur <span className="font-semibold">« Utiliser ma position GPS »</span> pour
            afficher les mosquées autour de vous.
          </div>
        )}
      </div>
    </div>
  );
}

export default MosqueFinderPage;


