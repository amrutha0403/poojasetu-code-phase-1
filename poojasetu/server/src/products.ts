export type PriceType = "fixed" | "daily";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  /** Price in paise. These are prototype estimates, not supplier quotes. */
  pricePaise: number;
  unit: string;
  priceType: PriceType;
  updatedAt: string | null;
  /** Empty until approved product photography is supplied. The storefront uses an illustrative CSS placeholder. */
  image: string;
  featured?: boolean;
  available: boolean;
}

// Development catalogue only. Prices are illustrative estimates for review, not supplier-confirmed prices.
// Replace with verified supplier pricing and persistent database records before launch.
export const sampleProducts: Product[] = [
  { id: "diya-cotton-wicks", name: "Cotton diya wicks", description: "Soft cotton wicks for your daily diya.", category: "Daily essentials", pricePaise: 4500, unit: "pack", priceType: "fixed", updatedAt: null, image: "", featured: true, available: true },
  { id: "kumkum-haldi", name: "Kumkum & haldi", description: "Two everyday pooja essentials, together.", category: "Daily essentials", pricePaise: 3500, unit: "set", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "incense-sticks", name: "Sandal incense sticks", description: "A gentle sandalwood fragrance for prayer time.", category: "Daily essentials", pricePaise: 6000, unit: "pack", priceType: "fixed", updatedAt: null, image: "", featured: true, available: true },
  { id: "camphor", name: "Pooja camphor", description: "A convenient pack for your regular rituals.", category: "Daily essentials", pricePaise: 5000, unit: "pack", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "vibhuti", name: "Sacred vibhuti", description: "A small pack of sacred ash for daily worship.", category: "Daily essentials", pricePaise: 3000, unit: "pack", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "sandalwood-paste", name: "Sandalwood paste", description: "Ready-to-use paste for your pooja routine.", category: "Daily essentials", pricePaise: 4500, unit: "jar", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "akshata-rice", name: "Akshata rice", description: "A small pack of rice used in traditional rituals.", category: "Daily essentials", pricePaise: 2500, unit: "pack", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "dhoop-cones", name: "Dhoop cones", description: "Fragrant cones for a calm prayer space.", category: "Daily essentials", pricePaise: 5500, unit: "box", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "sambrani-cups", name: "Sambrani cups", description: "Convenient cups for traditional fragrance rituals.", category: "Daily essentials", pricePaise: 7000, unit: "box", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "ghee-diya", name: "Ready-to-use ghee diya", description: "A compact diya option for everyday worship.", category: "Daily essentials", pricePaise: 6500, unit: "pack", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "fresh-marigold", name: "Fresh marigold flowers", description: "Seasonal flowers for garlands and offerings.", category: "Flowers", pricePaise: 8000, unit: "bunch", priceType: "daily", updatedAt: new Date().toISOString(), image: "", featured: true, available: true },
  { id: "loose-flowers", name: "Loose pooja flowers", description: "A colourful mix for your daily offering.", category: "Flowers", pricePaise: 6000, unit: "packet", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "jasmine-flowers", name: "Fresh jasmine", description: "Fragrant jasmine flowers, subject to daily availability.", category: "Flowers", pricePaise: 10000, unit: "string", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "rose-petals", name: "Rose petals", description: "Fresh petals for offerings and pooja decoration.", category: "Flowers", pricePaise: 7000, unit: "packet", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "flower-garland", name: "Pooja flower garland", description: "A simple fresh garland; length and flowers may vary.", category: "Flowers", pricePaise: 15000, unit: "garland", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "daily-pooja-kit", name: "Daily pooja essentials kit", description: "A starter selection of everyday essentials; final contents to be confirmed.", category: "Pooja kits", pricePaise: 24900, unit: "kit", priceType: "fixed", updatedAt: null, image: "", featured: true, available: true },
  { id: "shiva-pooja-kit", name: "Shiva pooja kit", description: "A proposed kit concept; final contents to be confirmed.", category: "Pooja kits", pricePaise: 39900, unit: "kit", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "ganesh-pooja-kit", name: "Ganesh pooja kit", description: "A proposed kit concept for Ganesh worship; contents to be confirmed.", category: "Pooja kits", pricePaise: 44900, unit: "kit", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "lakshmi-pooja-kit", name: "Lakshmi pooja kit", description: "A proposed kit concept for Lakshmi pooja; contents to be confirmed.", category: "Pooja kits", pricePaise: 49900, unit: "kit", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "coconut", name: "Pooja coconut", description: "A traditional offering item; size and availability vary.", category: "Fruits & offerings", pricePaise: 5000, unit: "piece", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "bananas", name: "Offering bananas", description: "A small selection for pooja offerings.", category: "Fruits & offerings", pricePaise: 7000, unit: "dozen", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "betel-leaves", name: "Betel leaves", description: "Fresh leaves for traditional offerings, subject to availability.", category: "Fruits & offerings", pricePaise: 4000, unit: "bundle", priceType: "daily", updatedAt: new Date().toISOString(), image: "", available: true },
  { id: "betel-nuts", name: "Betel nuts", description: "A small pack for pooja offerings.", category: "Fruits & offerings", pricePaise: 6000, unit: "pack", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "brass-diya", name: "Brass pooja diya", description: "A simple brass-style lamp concept; material and finish to be confirmed.", category: "Pooja accessories", pricePaise: 29900, unit: "piece", priceType: "fixed", updatedAt: null, image: "", featured: true, available: true },
  { id: "pooja-bell", name: "Pooja bell", description: "A traditional bell concept; size and material to be confirmed.", category: "Pooja accessories", pricePaise: 24900, unit: "piece", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "pooja-thali", name: "Pooja thali", description: "A simple pooja plate concept; dimensions and material to be confirmed.", category: "Pooja accessories", pricePaise: 39900, unit: "piece", priceType: "fixed", updatedAt: null, image: "", available: true },
  { id: "festival-hamper", name: "Festival pooja hamper", description: "A gift hamper concept; included items and packaging to be confirmed.", category: "Gifts & hampers", pricePaise: 79900, unit: "hamper", priceType: "fixed", updatedAt: null, image: "", featured: true, available: true },
  { id: "housewarming-hamper", name: "Housewarming hamper", description: "A thoughtful gifting concept; final items and packaging to be confirmed.", category: "Gifts & hampers", pricePaise: 99900, unit: "hamper", priceType: "fixed", updatedAt: null, image: "", available: true }
];
