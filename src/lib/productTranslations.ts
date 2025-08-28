// Product Translations for Multilingual Support
export interface ProductTranslation {
  name: string;
  description: string;
  features: string[];
}

export interface ProductTranslations {
  [productSlug: string]: {
    en: ProductTranslation;
    nl: ProductTranslation;
    pl: ProductTranslation;
  };
}

export const productTranslations: ProductTranslations = {
  'heather-honey': {
    en: {
      name: "Heather Honey",
      description: "Premium heather honey from the Polish Highlands - a rare and distinctive honey with a strong, aromatic flavor and amber color. Rich in minerals, antioxidants, and natural enzymes. Perfect for tea, baking, and as a natural sweetener. Known for its unique taste and health benefits.",
      features: ["Rare Polish Highland Honey", "Strong Aromatic Flavor", "Rich in Minerals", "Antioxidant Properties"]
    },
    nl: {
      name: "Heidehoning",
      description: "Premium heidehoning uit de Poolse Hooglanden - een zeldzame en onderscheidende honing met een sterke, aromatische smaak en amberkleur. Rijk aan mineralen, antioxidanten en natuurlijke enzymen. Perfect voor thee, bakken en als natuurlijke zoetstof. Bekend om zijn unieke smaak en gezondheidsvoordelen.",
      features: ["Zeldzame Poolse Hoogland Honing", "Sterke Aromatische Smaak", "Rijk aan Mineralen", "Antioxidant Eigenschappen"]
    },
    pl: {
      name: "Miód Wrzosowy",
      description: "Premium miód wrzosowy z polskich gór - rzadki i charakterystyczny miód o intensywnym, aromatycznym smaku i bursztynowym kolorze. Bogaty w minerały, przeciwutleniacze i naturalne enzymy. Idealny do herbaty, pieczenia i jako naturalny słodzik. Znany ze swojego unikalnego smaku i korzyści zdrowotnych.",
      features: ["Wyjątkowy Polski Miód Górski", "Intensywny Aromatyczny Smak", "Bogaty w Minerały", "Właściwości Przeciwutleniające"]
    }
  },
  'acacia-honey': {
    en: {
      name: "Acacia Honey",
      description: "Pure Polish acacia honey with a light, delicate flavor and crystal-clear appearance. Known for its slow crystallization and mild sweetness. Ideal for diabetics, tea lovers, and those who prefer subtle honey flavors. Contains natural enzymes and antibacterial properties.",
      features: ["Polish Acacia Honey", "Light & Delicate", "Slow Crystallization", "Diabetic Friendly"]
    },
    nl: {
      name: "Acaciahoning",
      description: "Pure Poolse acaciahoning met een lichte, delicate smaak en kristalheldere verschijning. Bekend om zijn langzame kristallisatie en milde zoetheid. Ideaal voor diabetici, theeliefhebbers en mensen die de voorkeur geven aan subtiele honingsmaken. Bevat natuurlijke enzymen en antibacteriële eigenschappen.",
      features: ["Poolse Acaciahoning", "Licht & Delicaat", "Langzame Kristallisatie", "Diabetisch Vriendelijk"]
    },
    pl: {
      name: "Miód Akacjowy",
      description: "Czysty polski miód akacjowy o lekkim, delikatnym smaku i krystalicznie czystym wyglądzie. Znany ze swojej powolnej krystalizacji i łagodnej słodyczy. Idealny dla diabetyków, miłośników herbaty i osób preferujących subtelne smaki miodu. Zawiera naturalne enzymy i właściwości antybakteryjne.",
      features: ["Polski Miód Akacjowy", "Lekki i Delikatny", "Powolna Krystalizacja", "Przyjazny dla Diabetyków"]
    }
  },
  'rapeseed-honey': {
    en: {
      name: "Rapeseed Honey (Canola Honey)",
      description: "Smooth and creamy Polish rapeseed honey with a mild, pleasant taste and rapid crystallization. Rich in glucose and perfect for spreading on bread, toast, and pastries. Contains natural antioxidants and is a great source of energy. Popular choice for baking and cooking.",
      features: ["Polish Rapeseed Honey", "Creamy Texture", "Mild Flavor", "Perfect for Spreading"]
    },
    nl: {
      name: "Koolzaadhoning (Canola Honing)",
      description: "Zachte en romige Poolse koolzaadhoning met een milde, aangename smaak en snelle kristallisatie. Rijk aan glucose en perfect voor het smeren op brood, toast en gebak. Bevat natuurlijke antioxidanten en is een geweldige energiebron. Populaire keuze voor bakken en koken.",
      features: ["Poolse Koolzaadhoning", "Romige Textuur", "Milde Smaak", "Perfect voor Smeren"]
    },
    pl: {
      name: "Miód Rzepakowy (Miód Rzepakowy)",
      description: "Gładki i kremowy polski miód rzepakowy o łagodnym, przyjemnym smaku i szybkiej krystalizacji. Bogaty w glukozę i idealny do smarowania na chlebie, tostach i ciastach. Zawiera naturalne przeciwutleniacze i jest doskonałym źródłem energii. Popularny wybór do pieczenia i gotowania.",
      features: ["Polski Miód Rzepakowy", "Kremowa Tekstura", "Łagodny Smak", "Idealny do Smarowania"]
    }
  },
  'bee-pollen': {
    en: {
      name: "Bee Pollen",
      description: "Pure Polish bee pollen granules - nature's most complete superfood. Packed with proteins, vitamins, minerals, and antioxidants. Supports immune system, energy levels, and overall wellness. Perfect for smoothies, yogurt, or as a natural supplement. Harvested sustainably from our Polish hives.",
      features: ["Polish Bee Pollen", "Complete Superfood", "Immune Support", "Energy Boost"]
    },
    nl: {
      name: "Bijenpollen",
      description: "Pure Poolse bijenpollen granulaat - de meest complete superfood van de natuur. Boordevol eiwitten, vitamines, mineralen en antioxidanten. Ondersteunt het immuunsysteem, energieniveaus en algemene welzijn. Perfect voor smoothies, yoghurt of als natuurlijk supplement. Duurzaam geoogst uit onze Poolse bijenkasten.",
      features: ["Poolse Bijenpollen", "Complete Superfood", "Immuunondersteuning", "Energieboost"]
    },
    pl: {
      name: "Pyłek Pszczeli",
      description: "Czyste polskie granulki pyłku pszczelego - najpełniejszy superfood natury. Pełne białka, witamin, minerałów i przeciwutleniaczy. Wspiera układ odpornościowy, poziom energii i ogólne samopoczucie. Idealny do smoothie, jogurtu lub jako naturalny suplement. Zbierany w sposób zrównoważony z naszych polskich uli.",
      features: ["Polski Pyłek Pszczeli", "Kompletny Superfood", "Wsparcie Odporności", "Zwiększenie Energii"]
    }
  },
  'coniferous-honeydew-honey': {
    en: {
      name: "Coniferous Honeydew Honey",
      description: "Unique Polish honeydew honey from coniferous forests with a rich, malty flavor and dark amber color. Produced by bees collecting honeydew from tree sap. High in minerals, especially iron and potassium. Perfect for cooking, marinades, and as a natural sweetener with character.",
      features: ["Polish Forest Honeydew", "Rich Malty Flavor", "High in Minerals", "Unique Taste"]
    },
    nl: {
      name: "Naaldbos Honingdauwhoning",
      description: "Unieke Poolse honingdauwhoning uit naaldbossen met een rijke, moutachtige smaak en donkere amberkleur. Geproduceerd door bijen die honingdauw verzamelen uit boomsap. Hoog in mineralen, vooral ijzer en kalium. Perfect voor koken, marinades en als natuurlijke zoetstof met karakter.",
      features: ["Poolse Bos Honingdauw", "Rijke Moutachtige Smaak", "Hoog in Mineralen", "Unieke Smaak"]
    },
    pl: {
      name: "Miód Spadziowy",
      description: "Unikalny polski miód spadziowy z lasów iglastych o bogatym, słodowym smaku i ciemnej bursztynowej barwie. Wytwarzany przez pszczoły zbierające spadź z soku drzew. Bogaty w minerały, szczególnie żelazo i potas. Idealny do gotowania, marynat i jako naturalny słodzik z charakterem.",
      features: ["Polski Leśny Miód Spadziowy", "Bogaty Słodowy Smak", "Bogaty w Minerały", "Unikalny Smak"]
    }
  },
  'raspberry-honey': {
    en: {
      name: "Raspberry Honey",
      description: "Delightful Polish raspberry honey with subtle berry notes and a light, fruity aroma. Made from bees foraging on Polish raspberry blossoms. Perfect for desserts, fruit salads, and as a natural sweetener for beverages. Contains natural antioxidants and a unique flavor profile.",
      features: ["Polish Raspberry Honey", "Berry Notes", "Fruity Aroma", "Perfect for Desserts"]
    },
    nl: {
      name: "Frambozenhoning",
      description: "Heerlijke Poolse frambozenhoning met subtiele bessennuances en een lichte, fruitige geur. Gemaakt van bijen die foerageren op Poolse frambozenbloesems. Perfect voor desserts, fruitsalades en als natuurlijke zoetstof voor dranken. Bevat natuurlijke antioxidanten en een uniek smaakprofiel.",
      features: ["Poolse Frambozenhoning", "Bessennuances", "Fruitige Geur", "Perfect voor Desserts"]
    },
    pl: {
      name: "Miód Malinowy",
      description: "Przepyszny polski miód malinowy z subtelnymi nutami jagodowymi i lekkim, owocowym aromatem. Wytwarzany przez pszczoły zbierające nektar z polskich kwiatów malin. Idealny do deserów, sałatek owocowych i jako naturalny słodzik do napojów. Zawiera naturalne przeciwutleniacze i unikalny profil smakowy.",
      features: ["Polski Miód Malinowy", "Nuty Malinowe", "Owocowy Aromat", "Idealny do Deserów"]
    }
  },
  'linden-honey': {
    en: {
      name: "Linden Honey",
      description: "Soothing Polish linden honey with a mild, floral taste and calming properties. Traditionally used for relaxation and sleep support. Light amber color with a delicate aroma. Perfect for evening tea, natural remedies, and those seeking a gentle honey experience.",
      features: ["Polish Linden Honey", "Calming Properties", "Mild Floral Taste", "Sleep Support"]
    },
    nl: {
      name: "Lindehonig",
      description: "Verzachtende Poolse lindehonig met een milde, bloemige smaak en kalmerende eigenschappen. Traditioneel gebruikt voor ontspanning en slaapondersteuning. Licht amberkleur met een delicate geur. Perfect voor avondthee, natuurlijke remedies en voor wie een zachte honingervaring zoekt.",
      features: ["Poolse Lindehonig", "Kalmerende Eigenschappen", "Milde Bloemige Smaak", "Slaapondersteuning"]
    },
    pl: {
      name: "Miód Lipowy",
      description: "Uspokajający polski miód lipowy o łagodnym, kwiatowym smaku i właściwościach uspokajających. Tradycyjnie używany do relaksacji i wsparcia snu. Jasny bursztynowy kolor z delikatnym aromatem. Idealny do wieczornej herbaty, naturalnych środków leczniczych i dla osób poszukujących łagodnego doświadczenia miodowego.",
      features: ["Polski Miód Lipowy", "Właściwości Uspokajające", "Łagodny Kwiatowy Smak", "Wsparcie Snu"]
    }
  },
  'buckwheat-honey': {
    en: {
      name: "Buckwheat Honey",
      description: "Dark, robust Polish buckwheat honey with a strong, molasses-like flavor and rich mineral content. High in antioxidants and iron. Perfect for strong tea, marinades, and as a natural sweetener with character. Popular among honey connoisseurs for its distinctive taste.",
      features: ["Polish Buckwheat Honey", "Strong Molasses Flavor", "High in Iron", "Antioxidant Rich"]
    },
    nl: {
      name: "Boekweithoning",
      description: "Donkere, robuuste Poolse boekweithoning met een sterke, melasse-achtige smaak en rijk mineraalgehalte. Hoog in antioxidanten en ijzer. Perfect voor sterke thee, marinades en als natuurlijke zoetstof met karakter. Populair onder honingkenners vanwege zijn onderscheidende smaak.",
      features: ["Poolse Boekweithoning", "Sterke Melasse Smaak", "Hoog in IJzer", "Antioxidant Rijk"]
    },
    pl: {
      name: "Miód Gryczany",
      description: "Ciemny, intensywny polski miód gryczany o silnym, melasowym smaku i bogatej zawartości minerałów. Bogaty w przeciwutleniacze i żelazo. Idealny do mocnej herbaty, marynat i jako naturalny słodzik z charakterem. Popularny wśród koneserów miodu ze względu na charakterystyczny smak.",
      features: ["Polski Miód Gryczany", "Silny Melasowy Smak", "Bogaty w Żelazo", "Bogaty w Przeciwutleniacze"]
    }
  },
  'goldenrod-honey': {
    en: {
      name: "Goldenrod Honey",
      description: "Bright Polish goldenrod honey with a distinctive, slightly spicy flavor and golden color. Late-season honey with a unique taste profile. Rich in natural enzymes and antioxidants. Perfect for autumn recipes, tea, and as a natural sweetener with character.",
      features: ["Polish Goldenrod Honey", "Distinctive Spicy Flavor", "Late Season Honey", "Natural Enzymes"]
    },
    nl: {
      name: "Guldenroedehoning",
      description: "Helder Poolse guldenroedehoning met een onderscheidende, licht pittige smaak en gouden kleur. Laatseizoen honing met een uniek smaakprofiel. Rijk aan natuurlijke enzymen en antioxidanten. Perfect voor herfstrecepten, thee en als natuurlijke zoetstof met karakter.",
      features: ["Poolse Guldenroedehoning", "Onderscheidende Pittige Smaak", "Laatseizoen Honing", "Natuurlijke Enzymen"]
    },
    pl: {
      name: "Miód Nawłociowy",
      description: "Jasny polski miód nawłociowy o charakterystycznym, lekko pikantnym smaku i złotym kolorze. Miód późnego sezonu o unikalnym profilu smakowym. Bogaty w naturalne enzymy i przeciwutleniacze. Idealny do jesiennych przepisów, herbaty i jako naturalny słodzik z charakterem.",
      features: ["Polski Miód Nawłociowy", "Charakterystyczny Pikantny Smak", "Naturalne Enzymy"]
    }
  },
  'multiflower-honey': {
    en: {
      name: "Multiflower Honey",
      description: "Classic Polish multiflower honey with a balanced, complex flavor from diverse floral sources. Versatile and popular choice for everyday use. Contains a wide range of natural nutrients and enzymes. Perfect for tea, baking, cooking, and as a natural sweetener.",
      features: ["Polish Multiflower Honey", "Balanced Flavor", "Versatile Use", "Natural Nutrients"]
    },
    nl: {
      name: "Meerbloemenhoning",
      description: "Klassieke Poolse meerbloemenhoning met een gebalanceerde, complexe smaak van diverse bloembronnen. Veelzijdige en populaire keuze voor dagelijks gebruik. Bevat een breed scala aan natuurlijke voedingsstoffen en enzymen. Perfect voor thee, bakken, koken en als natuurlijke zoetstof.",
      features: ["Poolse Meerbloemenhoning", "Gebalanceerde Smaak", "Veelzijdig Gebruik", "Natuurlijke Voedingsstoffen"]
    },
    pl: {
      name: "Miód Wielokwiatowy",
      description: "Klasyczny polski miód wielokwiatowy o zrównoważonym, złożonym smaku z różnych źródeł kwiatowych. Uniwersalny i popularny wybór do codziennego użytku. Zawiera szeroki zakres naturalnych składników odżywczych i enzymów. Idealny do herbaty, pieczenia, gotowania i jako naturalny słodzik.",
      features: ["Polski Miód Wielokwiatowy", "Zrównoważony Smak", "Uniwersalne Zastosowanie", "Naturalne Składniki Odżywcze"]
    }
  }
};

// Category translations
export const categoryTranslations = {
  en: {
    "All": "All",
    "Bestseller": "Bestseller",
    "Premium": "Premium",
    "Classic": "Classic",
    "Superfood": "Superfood",
    "Fruit Honey": "Fruit Honey",
    "Wellness": "Wellness",
    "Dark Honey": "Dark Honey",
    "SALE!": "SALE!"
  },
  nl: {
    "All": "Alle",
    "Bestseller": "Bestseller",
    "Premium": "Premium",
    "Classic": "Klassiek",
    "Superfood": "Superfood",
    "Fruit Honey": "Fruithoning",
    "Wellness": "Welzijn",
    "Dark Honey": "Donkere Honing",
    "SALE!": "UITVERKOOP!"
  },
  pl: {
    "All": "Wszystkie",
    "Bestseller": "Bestseller",
    "Premium": "Premium",
    "Classic": "Klasyczny",
    "Superfood": "Superfood",
    "Fruit Honey": "Miód Owocowy",
    "Wellness": "Dobrostan",
    "Dark Honey": "Ciemny Miód",
    "SALE!": "WYPRZEDAŻ!"
  }
};

// Helper function to get translated product data
export function getTranslatedProduct(productSlug: string, locale: 'en' | 'nl' | 'pl') {
  const translation = productTranslations[productSlug];
  if (!translation) {
    return null;
  }
  return translation[locale];
}

// Helper function to get translated category
export function getTranslatedCategory(category: string, locale: 'en' | 'nl' | 'pl') {
  const localeTranslations = categoryTranslations[locale];
  if (!localeTranslations) {
    return category;
  }
  return localeTranslations[category as keyof typeof localeTranslations] || category;
}
