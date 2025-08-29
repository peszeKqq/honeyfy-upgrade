export const ordersTranslations = {
  en: {
    orderHistory: "Order History",
    checkWhatOrdered: "Check what you've ordered",
    shopNow: "🍯 Shop Now",
    loadingOrders: "Loading your orders...",
    noOrdersYet: "No Orders Yet",
    noOrdersMessage: "You haven't placed any orders yet.",
    startShopping: "Start Shopping",
    order: "Order",
    quantity: "Quantity",
    shippingAddress: "Shipping Address",
    previous: "← Previous",
    next: "Next →",
    page: "Page",
    of: "of",
    showing: "Showing",
    orders: "orders"
  },
  nl: {
    orderHistory: "Bestelgeschiedenis",
    checkWhatOrdered: "Bekijk wat je hebt besteld",
    shopNow: "🍯 Nu Winkelen",
    loadingOrders: "Je bestellingen laden...",
    noOrdersYet: "Nog Geen Bestellingen",
    noOrdersMessage: "Je hebt nog geen bestellingen geplaatst.",
    startShopping: "Begin met Winkelen",
    order: "Bestelling",
    quantity: "Aantal",
    shippingAddress: "Verzendadres",
    previous: "← Vorige",
    next: "Volgende →",
    page: "Pagina",
    of: "van",
    showing: "Toont",
    orders: "bestellingen"
  },
  pl: {
    orderHistory: "Historia Zamówień",
    checkWhatOrdered: "Sprawdź co zamówiłeś",
    shopNow: "🍯 Kup Teraz",
    loadingOrders: "Ładowanie twoich zamówień...",
    noOrdersYet: "Brak Zamówień",
    noOrdersMessage: "Nie złożyłeś jeszcze żadnych zamówień.",
    startShopping: "Rozpocznij Zakupy",
    order: "Zamówienie",
    quantity: "Ilość",
    shippingAddress: "Adres Dostawy",
    previous: "← Poprzednia",
    next: "Następna →",
    page: "Strona",
    of: "z",
    showing: "Pokazuje",
    orders: "zamówień"
  }
};

export function getOrdersTranslation(locale: string, key: string): string {
  const translations = ordersTranslations[locale as keyof typeof ordersTranslations] || ordersTranslations.en;
  return translations[key as keyof typeof translations] || key;
}
