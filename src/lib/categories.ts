export interface Product {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  price: string;
  image_url: string;
  image_key: string;
  description: string;
  specs: Record<string, string>;
  supplier: string | null;
  featured: boolean;
  categories?: { id: string; name: string; slug: string; } | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
}
