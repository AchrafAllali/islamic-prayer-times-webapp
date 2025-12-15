import React, { useEffect, useState } from 'react';

const languageOptions = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

const periodOptions = [
  { key: 'morning', label: { fr: 'Adhkâr du matin', en: 'Morning Adhkar', ar: 'أذكار الصباح' } },
  { key: 'evening', label: { fr: 'Adhkâr du soir', en: 'Evening Adhkar', ar: 'أذكار المساء' } },
];

function AdhkarPage({ onNavigate }) {
  const [language, setLanguage] = useState('fr');
  const [period, setPeriod] = useState('morning');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const labels = {
    title: {
      fr: 'Adhkâr du matin et du soir',
      en: 'Morning & Evening Adhkar',
      ar: 'أذكار الصباح والمساء',
    },
    back: {
      fr: "Retour",
      en: "Back",
      ar: "رجوع",
    },
    language: {
      fr: 'Langue',
      en: 'Language',
      ar: 'اللغة',
    },
    loading: {
      fr: 'Chargement...',
      en: 'Loading...',
      ar: 'جار التحميل...',
    },
    errorPrefix: {
      fr: 'Erreur de chargement : ',
      en: 'Load error: ',
      ar: 'خطأ في التحميل: ',
    },
    fileMissingHint: {
      fr: 'Ajoutez le fichier texte correspondant dans public/.',
      en: 'Add the matching text file inside public/.',
      ar: 'أضف ملف النص المقابل داخل مجلد public/.',
    },
  };

  const loadAdhkar = async () => {
    setLoading(true);
    setError('');
    setContent('');
    try {
      // Choisir le bon fichier selon la langue et la période
      let filePath;
      if (language === 'ar') {
        // Tes fichiers arabes séparés matin / soir
        filePath = period === 'morning' ? '/adkar-sabah-ar.txt' : '/adkar-masaa-ar.txt';
      } else {
        // FR / EN gardent le schéma adhkar-morning/ evening-<lang>.txt
        filePath = `/adhkar-${period}-${language}.txt`;
      }

      const res = await fetch(filePath);
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const text = await res.text();
      setContent(text);
    } catch (err) {
      setError(`${labels.errorPrefix[language]}${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdhkar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, period]);

  const isArabic = language === 'ar';
  const lines = content ? content.split(/\r?\n/) : [];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white ${
        isArabic ? 'direction-rtl' : ''
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <button
            onClick={() => onNavigate('main')}
            className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-semibold transition shadow-lg"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {labels.back[language]}
          </button>

          <div className="flex items-center gap-3">
            <div className="text-xs text-white/70">{labels.language[language]}</div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-2 py-1">
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLanguage(opt.code)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    language === opt.code ? 'bg-emerald-500 text-white shadow' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📿</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{labels.title[language]}</h1>
        </div>

        {/* Period selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {periodOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setPeriod(opt.key)}
              className={`px-5 py-3 rounded-2xl border transition shadow ${
                period === opt.key ? 'bg-amber-400 text-emerald-900 border-amber-300' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {opt.label[language]}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl min-h-[320px] max-h-[75vh] overflow-y-auto">
          {loading && (
            <div className="text-center text-white/80">{labels.loading[language]}</div>
          )}

          {!loading && error && (
            <div className="text-center text-red-200 space-y-2">
              <p>{error}</p>
              <p className="text-xs text-white/70">{labels.fileMissingHint[language]}</p>
            </div>
          )}

          {!loading && !error && (
            <div
              className={`text-white/90 leading-relaxed text-sm sm:text-base space-y-2 ${
                isArabic ? 'text-right arabic-text text-lg leading-loose' : 'text-left'
              }`}
            >
              {lines.map((line, idx) =>
                line.trim() === '' ? (
                  <div key={idx} className="h-2" />
                ) : (
                  <p key={idx}>{line}</p>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdhkarPage;

