export const dashboardTranslations = {
  en: {
    // Topbar notifications
    topbar: {
      customerRating: "Customers rate us ⭐️ 9.9/10",
      fastDelivery: "Order before 2 p.m.? Delivered tomorrow 🚀",
      freeShipping: "Free shipping from €69",
      customerService: "Friendly Customer Service ❤️",
      closeNotification: "Close notification"
    },
    // Dashboard
    dashboard: {
      welcomeBack: "Welcome back",
      manageAccount: "Manage your account and track your sweet journey with Honeyfy",
      accountInfo: "Account Info",
      email: "Email",
      memberSince: "Member since",
      recentOrders: "Recent Orders",
      noOrdersYet: "No orders yet",
      startShopping: "Start Shopping",
      viewAllOrders: "View All Orders",
      loyaltyProgram: "Loyalty Program",
      availablePoints: "Available Points",
      earnPoints: "Earn 1 point for every €1 spent!",
      progressToNext: "Progress to next reward:",
      availableDiscount: "Available Discount",
      totalSpent: "Total Spent",
      howItWorks: "How it works:",
      points50: "• 50 points = €5 discount",
      points100: "• 100 points = €12 discount",
      points150: "• 150 points = €20 discount",
      orderHistory: "Order History",
      viewPastOrders: "View past orders",
      profile: "Profile",
      editDetails: "Edit your details",
      shopNow: "Shop Now",
      browseProducts: "Browse products",
      usePoints: "Use Points",
      applyLoyaltyDiscount: "Apply loyalty discount",
      recommendedForYou: "Recommended for You",
      viewProduct: "View Product",
      needHelp: "Need help?",
      supportReady: "Our support team is ready to assist you.",
      contactSupport: "Contact Support"
    }
  },
  nl: {
    // Topbar notifications
    topbar: {
      customerRating: "Klanten beoordelen ons ⭐️ 9.9/10",
      fastDelivery: "Bestel voor 14:00 uur? Morgen geleverd 🚀",
      freeShipping: "Gratis bezorgd vanaf €69",
      customerService: "Vriendelijke Klantenservice ❤️",
      closeNotification: "Sluit melding"
    },
    // Dashboard
    dashboard: {
      welcomeBack: "Welkom terug",
      manageAccount: "Beheer je account en volg je zoete reis met Honeyfy",
      accountInfo: "Account Info",
      email: "E-mail",
      memberSince: "Lid sinds",
      recentOrders: "Recente Bestellingen",
      noOrdersYet: "Nog geen bestellingen",
      startShopping: "Begin met Winkelen",
      viewAllOrders: "Bekijk Alle Bestellingen",
      loyaltyProgram: "Loyaliteitsprogramma",
      availablePoints: "Beschikbare Punten",
      earnPoints: "Verdien 1 punt voor elke €1 uitgegeven!",
      progressToNext: "Voortgang naar volgende beloning:",
      availableDiscount: "Beschikbare Korting",
      totalSpent: "Totaal Uitgegeven",
      howItWorks: "Hoe het werkt:",
      points50: "• 50 punten = €5 korting",
      points100: "• 100 punten = €12 korting",
      points150: "• 150 punten = €20 korting",
      orderHistory: "Bestelgeschiedenis",
      viewPastOrders: "Bekijk eerdere bestellingen",
      profile: "Profiel",
      editDetails: "Bewerk je gegevens",
      shopNow: "Nu Winkelen",
      browseProducts: "Blader door producten",
      usePoints: "Punten Gebruiken",
      applyLoyaltyDiscount: "Loyaliteitskorting toepassen",
      recommendedForYou: "Aanbevolen voor Jou",
      viewProduct: "Bekijk Product",
      needHelp: "Hulp nodig?",
      supportReady: "Ons supportteam staat klaar om je te helpen.",
      contactSupport: "Contact Support"
    }
  },
  pl: {
    // Topbar notifications
    topbar: {
      customerRating: "Klienci oceniają nas ⭐️ 9.9/10",
      fastDelivery: "Zamów przed 14:00? Dostawa jutro 🚀",
      freeShipping: "Darmowa dostawa od €69",
      customerService: "Przyjazna Obsługa Klienta ❤️",
      closeNotification: "Zamknij powiadomienie"
    },
    // Dashboard
    dashboard: {
      welcomeBack: "Witaj ponownie",
      manageAccount: "Zarządzaj swoim kontem i śledź swoją słodką podróż z Honeyfy",
      accountInfo: "Informacje o Koncie",
      email: "E-mail",
      memberSince: "Członek od",
      recentOrders: "Ostatnie Zamówienia",
      noOrdersYet: "Brak zamówień",
      startShopping: "Rozpocznij Zakupy",
      viewAllOrders: "Zobacz Wszystkie Zamówienia",
      loyaltyProgram: "Program Lojalnościowy",
      availablePoints: "Dostępne Punkty",
      earnPoints: "Zarób 1 punkt za każde wydane €1!",
      progressToNext: "Postęp do następnej nagrody:",
      availableDiscount: "Dostępny Rabat",
      totalSpent: "Łącznie Wydane",
      howItWorks: "Jak to działa:",
      points50: "• 50 punktów = €5 rabatu",
      points100: "• 100 punktów = €12 rabatu",
      points150: "• 150 punktów = €20 rabatu",
      orderHistory: "Historia Zamówień",
      viewPastOrders: "Zobacz poprzednie zamówienia",
      profile: "Profil",
      editDetails: "Edytuj swoje dane",
      shopNow: "Kup Teraz",
      browseProducts: "Przeglądaj produkty",
      usePoints: "Użyj Punktów",
      applyLoyaltyDiscount: "Zastosuj rabat lojalnościowy",
      recommendedForYou: "Polecane dla Ciebie",
      viewProduct: "Zobacz Produkt",
      needHelp: "Potrzebujesz pomocy?",
      supportReady: "Nasz zespół wsparcia jest gotowy, aby Ci pomóc.",
      contactSupport: "Skontaktuj się z Wsparciem"
    }
  }
};

export function getDashboardTranslation(locale: string, key: string): string {
  const translations = dashboardTranslations[locale as keyof typeof dashboardTranslations] || dashboardTranslations.en;
  
  // Navigate through nested objects (e.g., "dashboard.welcomeBack")
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      // Fallback to English
      const fallbackTranslations = dashboardTranslations.en;
      let fallbackValue: any = fallbackTranslations;
      for (const fallbackKey of keys) {
        fallbackValue = fallbackValue?.[fallbackKey];
      }
      return fallbackValue || key;
    }
  }
  
  return value || key;
}
