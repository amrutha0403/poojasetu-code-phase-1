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
