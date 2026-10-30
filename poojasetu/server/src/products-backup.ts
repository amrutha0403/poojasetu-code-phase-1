export type PriceType = "fixed" | "daily";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePaise: number;
  unit: string;
  priceType: PriceType;
  updatedAt: string | null;
  image: string;
  featured?: boolean;
  available: boolean;
}

// Development fixtures only. Replace with an approved catalogue and persistent data layer later.
export const sampleProducts: Product[] = [
  { id: "diya-cotton-wicks", name: "Cotton diya wicks", description: "Soft cotton wicks for your daily diya.", category: "Daily essentials", pricePaise: 4500, unit: "pack", priceType: "fixed", updatedAt: null, image: "", featured: true, available: true },
  { id: "kumkum-haldi", name: "Kumkum & haldi", description: "Two everyday pooja essentials, together.", category: "Daily essentials", pricePaise: 3500, unit: "set", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "incense-sticks", name: "Sandal incense sticks", description: "A gentle sandalwood fragrance for prayer time.", category: "Daily essentials", pricePaise: 6000, unit: "pack", priceType: "fixed", updatedAt: null, image: "", featured: true, available: true },
  { id: "camphor", name: "Pooja camphor", description: "A convenient pack for your regular rituals.", category: "Daily essentials", pricePaise: 5000, unit: "pack", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "fresh-marigold", name: "Fresh marigold flowers", description: "Seasonal flowers for garlands and offerings.", category: "Flowers", pricePaise: 8000, unit: "bunch", priceType: "daily", updatedAt: new Date().toISOString(), image: "", featured: true, available: true },
  { id: "loose-flowers", name: "Loose pooja flowers", description: "A colourful mix for your daily offering.", category: "Flowers", pricePaise: 6000, unit: "packet", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "daily-pooja-kit", name: "Daily pooja essentials kit", description: "A starter selection of everyday essentials.", category: "Pooja kits", pricePaise: 24900, unit: "kit", priceType: "fixed", updatedAt: null, image: "", featured: true, available: true },
  { id: "shiva-pooja-kit", name: "Shiva pooja kit", description: "A proposed kit concept; final contents to be confirmed.", category: "Pooja kits", pricePaise: 39900, unit: "kit", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "coconut", name: "Pooja coconut", description: "A traditional offering item; size varies.", category: "Fruits", pricePaise: 5000, unit: "piece", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "bananas", name: "Offering bananas", description: "A small selection for pooja offerings.", category: "Fruits", pricePaise: 7000, unit: "dozen", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true }
];
