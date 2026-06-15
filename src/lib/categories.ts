export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
  supplier?: string;
  featured?: boolean;
}

export const CATEGORY_SLUGS = [
  "limpeza",
  "cozinha",
  "refrigeracao",
  "lavagem",
  "utensilios",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "limpeza",
    name: "Limpeza",
    description:
      "Papel toalha, sacos de lixo, desinfetantes e tudo para manter seu restaurante impecável.",
    icon: "🧹",
  },
  {
    slug: "cozinha",
    name: "Cozinha",
    description:
      "Fogões industriais, fritadeiras, chapas, bancadas e equipamentos de preparo.",
    icon: "🍳",
  },
  {
    slug: "refrigeracao",
    name: "Refrigeração",
    description:
      "Máquinas de gelo, freezers, câmaras frias e balcões refrigerados.",
    icon: "❄️",
  },
  {
    slug: "lavagem",
    name: "Lavagem",
    description:
      "Lava-louças industrial, cubas, secadoras e acessórios para higienização.",
    icon: "🚿",
  },
  {
    slug: "utensilios",
    name: "Utensílios",
    description:
      "Panelas, frigideiras, facas, tábuas e utensílios essenciais de cozinha.",
    icon: "🔪",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
