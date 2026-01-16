import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    login: 'Sign In',
    signup: 'Get Started',
    dashboard: 'Browse Items',
    
    // Home Page
    heroTitle: 'Lost Something on',
    heroSubtitle: 'Campus?',
    heroDescription: 'Your intelligent platform for finding lost items on campus. Connect with your community, report lost belongings with AI-powered matching, and help others reunite with their possessions.',
    getStarted: 'Get Started',
    reportLostItem: 'Report Lost Item',
    browseFoundItems: 'Browse Found Items',
    
    // Features
    featuresTitle: 'Powerful Features for Quick Recovery',
    featuresDescription: 'Discover the innovative features that make finding lost items easier than ever',
    smartSearch: 'Smart Search',
    smartSearchDesc: 'AI-powered search by category, keywords, location, and visual similarity',
    communityDriven: 'Community Driven',
    communityDrivenDesc: 'Built by students, for students - fostering campus community spirit',
    secureAndSafe: 'Secure & Safe',
    secureAndSafeDesc: 'Verified profiles and secure contact flow to coordinate pickup safely',
    available247: '24/7 Available',
    available247Desc: 'Report and search for items anytime, anywhere',
    
    // Stats
    itemsRecovered: 'Items Recovered',
    activeUsers: 'Active Users',
    partnerColleges: 'Partner Colleges',
    successRate: 'Success Rate',
    
    // Testimonials
    testimonialsTitle: 'Success Stories from',
    testimonialsSubtitle: 'Our Community',
    testimonialsDescription: 'Join thousands of students who have successfully recovered their lost items',
    
    // Footer
    quickLinks: 'Quick Links',
    support: 'Support',
    legal: 'Legal',
    createdWith: 'Created with',
    allRightsReserved: 'All rights reserved',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    category: 'Category',
    location: 'Location',
    date: 'Date',
    status: 'Status',
    description: 'Description',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Voice Search
    voiceSearch: 'Voice Search',
    listening: 'Listening...',
    speakNow: 'Speak now',
    voiceNotSupported: 'Voice search not supported in this browser',
    
    // Settings
    settings: 'Settings',
    websiteFeatures: 'Website Features',
    language: 'Language',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    autoSave: 'Auto Save',
    compactMode: 'Compact Mode',
    animations: 'Animations',
    soundEffects: 'Sound Effects',
    autoComplete: 'Auto Complete',
    showTips: 'Show Tips',
    offlineMode: 'Offline Mode',
    dataSync: 'Data Sync',
    privacyMode: 'Privacy Mode',
    autoRefresh: 'Auto Refresh',
    mobileOptimized: 'Mobile Optimized',
    desktopNotifications: 'Desktop Notifications',
  },
  
  es: {
    // Navigation
    home: 'Inicio',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    signup: 'Comenzar',
    dashboard: 'Explorar Artículos',
    
    // Home Page
    heroTitle: '¿Perdiste Algo en el',
    heroSubtitle: 'Campus?',
    heroDescription: 'Tu plataforma inteligente para encontrar artículos perdidos en el campus. Conéctate con tu comunidad, reporta pertenencias perdidas con coincidencias impulsadas por IA, y ayuda a otros a reunirse con sus posesiones.',
    getStarted: 'Comenzar',
    reportLostItem: 'Reportar Artículo Perdido',
    browseFoundItems: 'Explorar Artículos Encontrados',
    
    // Features
    featuresTitle: 'Características Poderosas para Recuperación Rápida',
    featuresDescription: 'Descubre las características innovadoras que hacen que encontrar artículos perdidos sea más fácil que nunca',
    smartSearch: 'Búsqueda Inteligente',
    smartSearchDesc: 'Búsqueda impulsada por IA por categoría, palabras clave, ubicación y similitud visual',
    communityDriven: 'Impulsado por la Comunidad',
    communityDrivenDesc: 'Construido por estudiantes, para estudiantes - fomentando el espíritu de comunidad del campus',
    secureAndSafe: 'Seguro y Protegido',
    secureAndSafeDesc: 'Perfiles verificados y flujo de contacto seguro para coordinar la recogida de forma segura',
    available247: 'Disponible 24/7',
    available247Desc: 'Reporta y busca artículos en cualquier momento, en cualquier lugar',
    
    // Stats
    itemsRecovered: 'Artículos Recuperados',
    activeUsers: 'Usuarios Activos',
    partnerColleges: 'Universidades Asociadas',
    successRate: 'Tasa de Éxito',
    
    // Testimonials
    testimonialsTitle: 'Historias de Éxito de',
    testimonialsSubtitle: 'Nuestra Comunidad',
    testimonialsDescription: 'Únete a miles de estudiantes que han recuperado exitosamente sus artículos perdidos',
    
    // Footer
    quickLinks: 'Enlaces Rápidos',
    support: 'Soporte',
    legal: 'Legal',
    createdWith: 'Creado con',
    allRightsReserved: 'Todos los derechos reservados',
    
    // Common
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    category: 'Categoría',
    location: 'Ubicación',
    date: 'Fecha',
    status: 'Estado',
    description: 'Descripción',
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    
    // Voice Search
    voiceSearch: 'Búsqueda por Voz',
    listening: 'Escuchando...',
    speakNow: 'Habla ahora',
    voiceNotSupported: 'La búsqueda por voz no es compatible con este navegador',
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
    login: 'Se connecter',
    signup: 'Commencer',
    dashboard: 'Parcourir les Articles',
    
    // Home Page
    heroTitle: 'Vous avez perdu quelque chose sur le',
    heroSubtitle: 'Campus?',
    heroDescription: 'Votre plateforme intelligente pour trouver des objets perdus sur le campus. Connectez-vous avec votre communauté, signalez des biens perdus avec une correspondance alimentée par IA, et aidez les autres à retrouver leurs possessions.',
    getStarted: 'Commencer',
    reportLostItem: 'Signaler un Objet Perdu',
    browseFoundItems: 'Parcourir les Objets Trouvés',
    
    // Features
    featuresTitle: 'Fonctionnalités Puissantes pour une Récupération Rapide',
    featuresDescription: 'Découvrez les fonctionnalités innovantes qui rendent la recherche d\'objets perdus plus facile que jamais',
    smartSearch: 'Recherche Intelligente',
    smartSearchDesc: 'Recherche alimentée par IA par catégorie, mots-clés, emplacement et similitude visuelle',
    communityDriven: 'Axé sur la Communauté',
    communityDrivenDesc: 'Construit par les étudiants, pour les étudiants - favorisant l\'esprit communautaire du campus',
    secureAndSafe: 'Sécurisé et Sûr',
    secureAndSafeDesc: 'Profils vérifiés et flux de contact sécurisé pour coordonner la récupération en toute sécurité',
    available247: 'Disponible 24/7',
    available247Desc: 'Signalez et recherchez des articles à tout moment, n\'importe où',
    
    // Stats
    itemsRecovered: 'Articles Récupérés',
    activeUsers: 'Utilisateurs Actifs',
    partnerColleges: 'Universités Partenaires',
    successRate: 'Taux de Réussite',
    
    // Testimonials
    testimonialsTitle: 'Histoires de Réussite de',
    testimonialsSubtitle: 'Notre Communauté',
    testimonialsDescription: 'Rejoignez des milliers d\'étudiants qui ont récupéré avec succès leurs objets perdus',
    
    // Footer
    quickLinks: 'Liens Rapides',
    support: 'Support',
    legal: 'Légal',
    createdWith: 'Créé avec',
    allRightsReserved: 'Tous droits réservés',
    
    // Common
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    category: 'Catégorie',
    location: 'Emplacement',
    date: 'Date',
    status: 'Statut',
    description: 'Description',
    submit: 'Soumettre',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    edit: 'Modifier',
    delete: 'Supprimer',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    
    // Voice Search
    voiceSearch: 'Recherche Vocale',
    listening: 'Écoute...',
    speakNow: 'Parlez maintenant',
    voiceNotSupported: 'La recherche vocale n\'est pas prise en charge dans ce navigateur',
  },
  
  hi: {
    // Navigation
    home: 'होम',
    about: 'हमारे बारे में',
    contact: 'संपर्क',
    login: 'साइन इन',
    signup: 'शुरू करें',
    dashboard: 'आइटम ब्राउज़ करें',
    
    // Home Page
    heroTitle: 'कैंपस में कुछ',
    heroSubtitle: 'खो गया?',
    heroDescription: 'कैंपस में खोई हुई वस्तुओं को खोजने के लिए आपका बुद्धिमान प्लेटफॉर्म। अपने समुदाय से जुड़ें, AI-संचालित मैचिंग के साथ खोए हुए सामान की रिपोर्ट करें, और दूसरों को उनके सामान से मिलाने में मदद करें।',
    getStarted: 'शुरू करें',
    reportLostItem: 'खोई वस्तु की रिपोर्ट करें',
    browseFoundItems: 'मिली वस्तुओं को देखें',
    
    // Features
    featuresTitle: 'तेज़ रिकवरी के लिए शक्तिशाली सुविधाएं',
    featuresDescription: 'उन नवाचार सुविधाओं की खोज करें जो खोई हुई वस्तुओं को खोजना पहले से कहीं आसान बनाती हैं',
    smartSearch: 'स्मार्ट खोज',
    smartSearchDesc: 'श्रेणी, कीवर्ड, स्थान और दृश्य समानता द्वारा AI-संचालित खोज',
    communityDriven: 'समुदाय संचालित',
    communityDrivenDesc: 'छात्रों द्वारा, छात्रों के लिए बनाया गया - कैंपस समुदायिक भावना को बढ़ावा देना',
    secureAndSafe: 'सुरक्षित और सुरक्षित',
    secureAndSafeDesc: 'सत्यापित प्रोफाइल और सुरक्षित संपर्क प्रवाह सुरक्षित रूप से पिकअप समन्वय के लिए',
    available247: '24/7 उपलब्ध',
    available247Desc: 'कभी भी, कहीं भी वस्तुओं की रिपोर्ट करें और खोजें',
    
    // Stats
    itemsRecovered: 'वस्तुएं बरामद',
    activeUsers: 'सक्रिय उपयोगकर्ता',
    partnerColleges: 'साझीदार कॉलेज',
    successRate: 'सफलता दर',
    
    // Testimonials
    testimonialsTitle: 'सफलता की कहानियां',
    testimonialsSubtitle: 'हमारे समुदाय से',
    testimonialsDescription: 'हजारों छात्रों में शामिल हों जिन्होंने सफलतापूर्वक अपनी खोई हुई वस्तुओं को बरामद किया है',
    
    // Footer
    quickLinks: 'त्वरित लिंक',
    support: 'सहायता',
    legal: 'कानूनी',
    createdWith: 'के साथ बनाया गया',
    allRightsReserved: 'सभी अधिकार सुरक्षित',
    
    // Common
    search: 'खोजें',
    filter: 'फ़िल्टर',
    sort: 'क्रमबद्ध करें',
    category: 'श्रेणी',
    location: 'स्थान',
    date: 'दिनांक',
    status: 'स्थिति',
    description: 'विवरण',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    
    // Voice Search
    voiceSearch: 'वॉयस सर्च',
    listening: 'सुन रहा है...',
    speakNow: 'अब बोलें',
    voiceNotSupported: 'इस ब्राउज़र में वॉयस सर्च समर्थित नहीं है',
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get language from localStorage or browser preference
    const savedLanguage = localStorage.getItem('findmyitem-language');
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    return translations[browserLang] ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('findmyitem-language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };

  const t = (key) => {
    return translations[currentLanguage][key] || translations['en'][key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
