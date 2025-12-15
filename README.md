# 🕌 Islamic Prayer Times - Application Web Complète

<div align="center">

![Prayer Times Banner](https://img.shields.io/badge/Islamic-Prayer%20Times-10b981?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3djEwYzAgNS41NSA4LjggOS45OSAxMCAxMHMxMC00LjQ1IDEwLTEwVjdsLTEwLTV6Ii8+PC9zdmc+)

[![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

**Application web moderne et multilingue pour consulter les horaires de prière islamiques avec GPS, boussole Qibla et bien plus.**

[Démo en Ligne](#) • [Documentation](#documentation) • [Signaler un Bug](https://github.com/votre-username/prayer-times-app/issues) • [Demander une Fonctionnalité](https://github.com/votre-username/prayer-times-app/issues)

</div>

---

## 📑 Table des Matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Captures d'écran](#-captures-décran)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du Projet](#-structure-du-projet)
- [API et Services](#-api-et-services)
- [Configuration](#-configuration)
- [Roadmap](#-roadmap)
- [Contribution](#-contribution)
- [Licence](#-licence)
- [Contact](#-contact)
- [Remerciements](#-remerciements)

---

## 🎯 À propos

**Islamic Prayer Times** est une application web Progressive Web App (PWA) complète qui permet aux musulmans du monde entier de consulter les horaires de prière précis selon leur localisation. L'application offre une expérience utilisateur moderne, intuitive et multilingue.

### 🌟 Points Forts

- ✅ **100% Gratuit et Open Source**
- ✅ **Sans Publicité**
- ✅ **Respect de la Vie Privée** - Aucune donnée personnelle collectée
- ✅ **Fonctionne Hors Ligne** (PWA)
- ✅ **Interface Multilingue** (FR/EN/AR)
- ✅ **Responsive Design** - Compatible mobile, tablette et desktop

---

## ✨ Fonctionnalités

### 🎯 Fonctionnalités Principales

| Fonctionnalité | Description | Statut |
|----------------|-------------|--------|
| 📍 **Localisation GPS** | Horaires ultra-précis basés sur votre position GPS en temps réel | ✅ |
| 🧭 **Boussole Qibla** | Direction exacte de La Mecque avec boussole 3D interactive | ✅ |
| ⏰ **Compte à Rebours** | Temps restant avant la prochaine prière avec mise à jour en direct | ✅ |
| 🔔 **Notifications Push** | Alertes personnalisables 10 minutes avant chaque prière | ✅ |
| 🔊 **Adhan Audio** | Lecture automatique de l'Adhan à l'heure de la prière | ✅ |
| 📿 **Adhkâr Quotidiens** | Invocations du matin et du soir en arabe avec traductions | ✅ |
| 🕌 **Mosquées Proches** | Localisation des mosquées à proximité via Google Maps | ✅ |
| ⭐ **Ville Favorite** | Sauvegarde de votre ville pour un accès rapide | ✅ |
| 🌍 **Support Multilingue** | Interface en Français, English et العربية | ✅ |
| 🎨 **Thème Moderne** | Design élégant avec animations fluides et glassmorphism | ✅ |

### 🔧 Fonctionnalités Techniques

- **Calcul Automatique** des méthodes de calcul selon la région géographique
- **Cache Intelligent** des données pour une navigation fluide
- **Mode Hors Ligne** avec Service Workers
- **Optimisation des Performances** avec lazy loading
- **Accessibilité WCAG 2.1** pour tous les utilisateurs

---

## 📸 Captures d'écran

<div align="center">

### 🏠 Page d'Accueil
<img width="1089" height="540" alt="image" src="https://github.com/user-attachments/assets/e46e9362-59a5-494b-9bdb-8bd45818f682" />
<img width="1088" height="539" alt="image" src="https://github.com/user-attachments/assets/823086ca-2428-4b9e-be5d-eab48555363b" />


### ⏰ Horaires de Prière

<img width="1090" height="546" alt="image" src="https://github.com/user-attachments/assets/62b48708-30a9-4b79-ab26-2a0e86c5b417" />
<img width="1089" height="544" alt="image" src="https://github.com/user-attachments/assets/6fd72f50-f07b-4dc2-af4b-9125be8edde9" />

### 🧭 Boussole Qibla
<img width="1089" height="518" alt="image" src="https://github.com/user-attachments/assets/78bbbfa3-75c3-48b4-ab8d-83e7a121c56a" />


### 📿 Adhkâr
<img width="1086" height="484" alt="image" src="https://github.com/user-attachments/assets/068b59be-3c60-4987-b947-62c32990db47" />
<img width="1082" height="482" alt="image" src="https://github.com/user-attachments/assets/d17dc0dd-c307-479e-a975-bd1d9531b5bc" />


</div>

---

## 🛠️ Technologies

### Frontend

```
React.js 18.x          - Framework JavaScript
Tailwind CSS 3.x       - Framework CSS utilitaire
Lucide React           - Bibliothèque d'icônes
```

### APIs & Services

```
Aladhan API            - Horaires de prière islamiques
Geolocation API        - Localisation GPS
Google Maps API        - Recherche de mosquées
Notification API       - Notifications push navigateur
```

### Outils de Développement

```
Create React App       - Configuration React
ESLint                 - Linter JavaScript
Prettier               - Formatage du code
Git                    - Contrôle de version
```

---

## 🚀 Installation

### Prérequis

- Node.js >= 14.x
- npm >= 6.x ou yarn >= 1.22.x
- Git

### Installation Locale

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/prayer-times-app.git

# 2. Accéder au dossier
cd prayer-times-app

# 3. Installer les dépendances
npm install
# ou
yarn install

# 4. Ajouter le fichier audio Adhan
# Téléchargez un fichier adhan.mp3 et placez-le dans le dossier public/

# 5. Ajouter les images de mosquées (optionnel)
# Placez vos images dans public/images/
# - mosque_hassan2.jpg
# - Al-Qods.jpg
# - maka.jpg

# 6. Lancer l'application en développement
npm start
# ou
yarn start

# L'application sera accessible sur http://localhost:3000
```

### Build pour Production

```bash
# Créer un build optimisé
npm run build
# ou
yarn build

# Les fichiers de production seront dans le dossier build/
```

### Déploiement

```bash
# Déployer sur GitHub Pages
npm install -g gh-pages
npm run deploy

# Déployer sur Netlify
netlify deploy --prod --dir=build

# Déployer sur Vercel
vercel --prod
```

---

## 📖 Utilisation

### Démarrage Rapide

1. **Autoriser la Géolocalisation** 
   - Cliquez sur "📍 Utiliser ma position GPS"
   - Autorisez l'accès à votre localisation dans le navigateur

2. **Consulter les Horaires**
   - Les horaires s'affichent automatiquement
   - Le compte à rebours indique le temps avant la prochaine prière

3. **Activer les Notifications**
   - Cliquez sur l'icône 🔔
   - Autorisez les notifications du navigateur
   - Vous recevrez des alertes 10 minutes avant chaque prière

### Recherche Manuelle

Si vous préférez ne pas utiliser le GPS :

```
1. Entrez le nom de votre ville dans la barre de recherche
2. (Optionnel) Précisez le pays pour plus de précision
3. Cliquez sur "Rechercher"
4. Enregistrez comme ville favorite en cliquant sur ⭐
```

### Boussole Qibla

```
1. Utilisez votre position GPS
2. Cliquez sur "Afficher la Boussole Qibla"
3. Orientez votre appareil vers la direction indiquée
4. La flèche pointe vers La Mecque
```

### Adhkâr

```
1. Cliquez sur le bouton "📿 Adhkâr"
2. Sélectionnez "Matin" ou "Soir"
3. Choisissez votre langue (FR/EN/AR)
4. Lisez les invocations affichées
```

---

## 📁 Structure du Projet

```
prayer-times-app/
│
├── public/
│   ├── index.html              # Page HTML principale
│   ├── adhan.mp3              # Fichier audio Adhan
│   ├── images/                # Images de mosquées
│   │   ├── mosque_hassan2.jpg
│   │   ├── Al-Qods.jpg
│   │   └── maka.jpg
│   ├── adhkar-morning-fr.txt  # Adhkâr du matin (FR)
│   ├── adhkar-evening-fr.txt  # Adhkâr du soir (FR)
│   ├── adhkar-morning-en.txt  # Adhkâr du matin (EN)
│   ├── adhkar-evening-en.txt  # Adhkâr du soir (EN)
│   ├── adkar-sabah-ar.txt     # أذكار الصباح
│   └── adkar-masaa-ar.txt     # أذكار المساء
│
├── src/
│   ├── components/            # Composants réutilisables
│   │   ├── AdhanPlayer.jsx
│   │   ├── FavoriteCity.jsx
│   │   ├── GPSButton.jsx
│   │   ├── IslamicAnimatedBackground.jsx
│   │   ├── NextPrayerCountdown.jsx
│   │   ├── PrayerTimes.jsx
│   │   ├── QiblaCompass.jsx
│   │   ├── QiblaToggle.jsx
│   │   ├── RandomMosqueBackground.jsx
│   │   ├── SearchBar.jsx
│   │   └── WelcomeGreeting.jsx
│   │
│   ├── pages/                 # Pages de l'application
│   │   ├── HomePage.jsx
│   │   ├── MainPage.jsx
│   │   ├── AdhkarPage.jsx
│   │   └── MosqueFinderPage.jsx
│   │
│   ├── utils/                 # Services et utilitaires
│   │   ├── audioService.js
│   │   ├── notificationService.js
│   │   ├── qiblaService.js
│   │   └── storageService.js
│   │
│   ├── App.js                 # Composant principal
│   ├── App.css                # Styles globaux
│   ├── index.js               # Point d'entrée
│   └── index.css              # Styles de base
│
├── .gitignore                 # Fichiers ignorés par Git
├── package.json               # Dépendances et scripts
├── README.md                  # Documentation
└── tailwind.config.js         # Configuration Tailwind CSS
```

---

## 🔌 API et Services

### Aladhan API

L'application utilise [Aladhan API](https://aladhan.com/prayer-times-api) pour obtenir les horaires de prière.

**Endpoints utilisés :**

```javascript
// Horaires par coordonnées GPS
https://api.aladhan.com/v1/timings?latitude={lat}&longitude={lon}&method={method}

// Horaires par nom de ville
https://api.aladhan.com/v1/timingsByCity?city={city}&country={country}&method={method}
```

**Méthodes de Calcul :**

| Région | Méthode | Organisation |
|--------|---------|--------------|
| Afrique du Nord | 3 | Muslim World League |
| Moyen-Orient | 4 | Umm Al-Qura University |
| Égypte | 5 | Egyptian General Authority |
| Asie | 1 | University of Islamic Sciences, Karachi |
| Amérique du Nord | 2 | Islamic Society of North America |

### Services Intégrés

```javascript
// audioService.js - Gestion de l'Adhan
audioService.playAdhan(prayerName, prayerNameArabic)
audioService.stopAdhan()

// notificationService.js - Notifications push
notificationService.requestPermission()
notificationService.sendNotification(title, body, icon)

// qiblaService.js - Calcul de la Qibla
qiblaService.calculateQiblaDirection(userLat, userLon)
qiblaService.calculateDistanceToKaaba(userLat, userLon)

// storageService.js - Stockage local
storageService.saveFavoriteCity(city, country)
storageService.savePrayerData(data, isGPS)
```

---

## ⚙️ Configuration

### Variables d'Environnement (optionnel)

Créez un fichier `.env` à la racine :

```env
# API Keys (si nécessaire pour les futures fonctionnalités)
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here

# Configuration de l'application
REACT_APP_DEFAULT_LANGUAGE=fr
REACT_APP_DEFAULT_METHOD=3
```

### Configuration Tailwind

Modifiez `tailwind.config.js` pour personnaliser les couleurs :

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        emerald: {
          // Personnalisez vos couleurs
        }
      }
    }
  }
}
```

### Personnalisation de l'Adhan

Remplacez le fichier `public/adhan.mp3` par votre propre fichier audio.

**Formats supportés :** MP3, WAV, OGG

---

## 🗺️ Roadmap

### Version 1.1 (Q1 2024)

- [ ] Mode sombre / Mode clair
- [ ] Widget pour écran d'accueil (PWA)
- [ ] Support de plus de langues (Urdu, Turc, Indonésien)
- [ ] Calendrier islamique complet
- [ ] Export des horaires en PDF

### Version 1.2 (Q2 2024)

- [ ] Connexion utilisateur (optionnelle)
- [ ] Synchronisation multi-appareils
- [ ] Statistiques de prière
- [ ] Rappels personnalisables
- [ ] Intégration Apple Watch / Wear OS

### Version 2.0 (Q3 2024)

- [ ] Application mobile native (React Native)
- [ ] Mode communautaire
- [ ] Recherche avancée de mosquées avec avis
- [ ] Cours et ressources islamiques
- [ ] Support des khutbahs en direct

---

## 🤝 Contribution

Les contributions sont **grandement appréciées** ! Voici comment vous pouvez aider :

### Comment Contribuer

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. **Committez** vos changements (`git commit -m 'feat: Ajout de NouvelleFonctionnalite'`)
4. **Push** vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. **Ouvrez** une Pull Request

### Conventions de Commit

Nous suivons [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage du code
refactor: Refactorisation
test: Ajout de tests
chore: Tâches de maintenance
```

### Code de Conduite

Veuillez lire notre [Code de Conduite](CODE_OF_CONDUCT.md) avant de contribuer.

---

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2025 Achraf allali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

**Votre Nom** - Achraf Allali

**Email :** achrafallali2003@gmail.com

**Linkden :** [https://www.linkedin.com/in/achraf-allali-9889a0321/](https://www.linkedin.com/in/achraf-allali-9889a0321/)

---

## ❤️ Remerciements

Un grand merci à :

- [Aladhan API](https://aladhan.com/) pour l'API gratuite des horaires de prière
- [Lucide React](https://lucide.dev/) pour les icônes magnifiques
- [Tailwind CSS](https://tailwindcss.com/) pour le framework CSS
- [React](https://reactjs.org/) pour le framework JavaScript
- La communauté musulmane pour les retours et suggestions
- Tous les contributeurs qui ont aidé à améliorer ce projet

---

## 🌟 Remerciements Spéciaux

Ce projet est dédié à tous les musulmans du monde qui cherchent à accomplir leurs prières à l'heure.

> **"إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"**
> 
> *"La Salat demeure, pour les croyants, une prescription, à des temps déterminés."* - Coran 4:103

---

<div align="center">

**Si ce projet vous a été utile, n'hésitez pas à lui donner une ⭐ !**

Fait avec ❤️ et ☪️ pour la Oummah

[⬆ Retour en haut](#-islamic-prayer-times---application-web-complète)

</div>
