import type { Product } from "./categories";

export const products: Product[] = [
  // ========== LIMPEZA ==========
  {
    slug: "papel-toalha-interfolhado-2000-folhas",
    name: "Papel Toalha Interfolhado 2000 Folhas",
    category: "limpeza",
    price: "R$ 18,90",
    image: "https://images.unsplash.com/photo-1627931085762-4017812f1773?w=800&h=600&fit=crop&auto=format",
    description:
      "Papel toalha interfolhado branco, 2 dobras, com alta absorção e resistência. Ideal para cozinhas, banheiros e áreas de manipulação de alimentos. Embalagem com 2000 folhas, compatível com dispensers padrão de mercado. Produto essencial para manter a higiene do seu restaurante, evitando contaminação cruzada e garantindo a conformidade com as normas da Vigilância Sanitária.",
    specs: {
      "Quantidade": "2000 folhas",
      "Dobras": "2 dobras",
      "Cor": "Branco",
      "Material": "Celulose virgem",
      "Dimensões da folha": "22 x 24 cm",
    },
    featured: true,
  },
  {
    slug: "saco-de-lixo-preto-100-litros",
    name: "Saco de Lixo Preto 100 Litros — Pacote com 100 Unidades",
    category: "limpeza",
    price: "R$ 34,50",
    image: "https://images.unsplash.com/photo-1708915965975-2a950db0e215?w=800&h=600&fit=crop&auto=format",
    description:
      "Saco de lixo preto de alta resistência, capacidade para 100 litros. Ideal para uso em lixeiras grandes de cozinhas industriais e áreas de serviço. Fabricado em polietileno de baixa densidade (PEBD), suporta resíduos úmidos e perfurantes sem rasgar. Pacote com 100 unidades, garantindo estoque para várias semanas de operação.",
    specs: {
      "Capacidade": "100 litros",
      "Quantidade": "100 unidades",
      "Material": "PEBD (Polietileno de Baixa Densidade)",
      "Cor": "Preto",
      "Espessura": "6 micras",
    },
    featured: true,
  },
  {
    slug: "desinfetante-concentrado-5-litros",
    name: "Desinfetante Concentrado Uso Geral 5 Litros",
    category: "limpeza",
    price: "R$ 42,00",
    image: "https://images.unsplash.com/photo-1640583341059-12deab9bf751?w=800&h=600&fit=crop&auto=format",
    description:
      "Desinfetante concentrado de uso geral com ação bactericida e virucida comprovada. Fórmula com quaternário de amônio, ideal para higienização de pisos, bancadas, equipamentos e superfícies de contato com alimentos. Diluição recomendada de 1:100, rendendo até 500 litros de solução pronta para uso. Fragrância suave de pinho que não interfere no aroma dos alimentos.",
    specs: {
      "Volume": "5 litros (concentrado)",
      "Rendimento": "Até 500 litros (diluído 1:100)",
      "Princípio ativo": "Quaternário de amônio",
      "Fragrância": "Pinho suave",
      "Registro ANVISA": "Sim",
    },
  },
  {
    slug: "luva-descartavel-nitrilica-caixa-100",
    name: "Luva Descartável Nitrílica — Caixa com 100 Unidades",
    category: "limpeza",
    price: "R$ 28,90",
    image: "https://images.unsplash.com/photo-1666479258732-5ea17469b610?w=800&h=600&fit=crop&auto=format",
    description:
      "Luva descartável nitrílica azul, não estéril, ambidestra, com punho longo e textura antiderrapante nos dedos. Ideal para manipulação de alimentos, limpeza pesada e procedimentos que exigem proteção contra agentes químicos. Hipoalergênica — alternativa segura para quem tem alergia a látex. Caixa com 100 unidades.",
    specs: {
      "Quantidade": "100 unidades",
      "Material": "Nitrila",
      "Cor": "Azul",
      "Tamanho": "M (médio)",
      "Hipoalergênica": "Sim",
    },
  },

  // ========== COZINHA ==========
  {
    slug: "fogao-industrial-4-bocas",
    name: "Fogão Industrial 4 Bocas com Forno — Aço Inox",
    category: "cozinha",
    price: "R$ 2.399,00",
    image: "https://images.unsplash.com/photo-1771360963016-1408c2de12c4?w=800&h=600&fit=crop&auto=format",
    description:
      "Fogão industrial 4 bocas com forno, fabricado integralmente em aço inoxidável AISI 304. Queimadores em ferro fundido com chama regulável e sistema de segurança com termopar. Forno com capacidade para 4 assadeiras GN 1/1, termostato ajustável até 320°C. Ideal para restaurantes de médio porte, bares e lanchonetes que precisam de equipamento robusto e durável.",
    specs: {
      "Bocas": "4 queimadores",
      "Forno": "4 assadeiras GN 1/1",
      "Material": "Aço Inox AISI 304",
      "Dimensões": "800 x 750 x 1400 mm (LxPxA)",
      "Peso": "95 kg",
    },
    featured: true,
  },
  {
    slug: "fritadeira-eletrica-industrial-10-litros",
    name: "Fritadeira Elétrica Industrial 10 Litros",
    category: "cozinha",
    price: "R$ 1.599,00",
    image: "https://images.unsplash.com/photo-1760001553414-5634201efc36?w=800&h=600&fit=crop&auto=format",
    description:
      "Fritadeira elétrica industrial com capacidade para 10 litros de óleo, gabinete em aço inox e cesto duplo. Termostato ajustável de 60°C a 200°C, válvula de drenagem frontal para troca fácil do óleo. Potência de 6000W, alimentação 220V. Ideal para bares, pastelarias e restaurantes com alta demanda de frituras.",
    specs: {
      "Capacidade": "10 litros de óleo",
      "Potência": "6000W",
      "Tensão": "220V",
      "Material": "Aço Inox AISI 430",
      "Dimensões": "420 x 520 x 420 mm (LxPxA)",
    },
  },
  {
    slug: "chapa-grill-eletrica-industrial",
    name: "Chapa Grill Elétrica Industrial 60 cm",
    category: "cozinha",
    price: "R$ 1.199,00",
    image: "https://images.unsplash.com/photo-1767785990437-dfe1fe516fe8?w=800&h=600&fit=crop&auto=format",
    description:
      "Chapa grill elétrica industrial com chapa de ferro fundido de 60 cm, aquecimento uniforme e bandeja coletora de gordura removível. Potência de 4000W com controle de temperatura ajustável até 300°C. Ideal para grelhados, carnes, hambúrgueres e sanduíches na chapa. Superfície antiaderente natural após cura inicial. Pés antiderrapantes com regulagem de altura.",
    specs: {
      "Superfície": "60 x 40 cm (ferro fundido)",
      "Potência": "4000W",
      "Temperatura máx.": "300°C",
      "Tensão": "220V",
      "Peso": "28 kg",
    },
  },

  // ========== REFRIGERAÇÃO ==========
  {
    slug: "maquina-de-gelo-50kg",
    name: "Máquina de Gelo 50 kg/dia — Autolimpante",
    category: "refrigeracao",
    price: "R$ 3.499,00",
    image: "https://images.unsplash.com/photo-1768314669089-480e608a0143?w=800&h=600&fit=crop&auto=format",
    description:
      "Máquina de gelo automática com produção de 50 kg por dia, cubos cristalinos (23x23x23 mm). Função autolimpante com ciclo programável, reservatório com isolamento térmico para conservação do gelo. Gabinete em aço inox escovado, compressor de alta eficiência com gás ecológico R290. Ideal para bares, restaurantes e lanchonetes com consumo moderado de gelo. Produz a primeira leva em apenas 15 minutos.",
    specs: {
      "Produção": "50 kg/dia",
      "Tipo de gelo": "Cubos cristalinos 23 mm",
      "Reservatório": "15 kg",
      "Material": "Aço Inox escovado",
      "Alimentação": "220V / 380W",
    },
    featured: true,
  },
  {
    slug: "freezer-horizontal-400-litros",
    name: "Freezer Horizontal 400 Litros — Tampa em Vidro",
    category: "refrigeracao",
    price: "R$ 2.899,00",
    image: "https://images.unsplash.com/photo-1731156679850-e73fbc21564c?w=800&h=600&fit=crop&auto=format",
    description:
      "Freezer horizontal com 400 litros de capacidade e tampa dupla em vidro temperado basculante. Ideal para exposição de sorvetes, picolés, congelados e ingredientes em restaurantes. Compressor de alta eficiência, termostato ajustável externo, dreno frontal para degelo. Iluminação interna em LED que valoriza os produtos expostos. Cestos organizadores removíveis inclusos.",
    specs: {
      "Capacidade": "400 litros",
      "Tampa": "Vidro temperado duplo basculante",
      "Temperatura": "-18°C a -22°C",
      "Iluminação": "LED interno",
      "Dimensões": "1300 x 700 x 900 mm (LxPxA)",
    },
  },
  {
    slug: "balcao-refrigerado-4-portas",
    name: "Balcão Refrigerado 4 Portas — 1200 Litros",
    category: "refrigeracao",
    price: "R$ 4.799,00",
    image: "https://images.unsplash.com/photo-1663790776711-9283bf614ac2?w=800&h=600&fit=crop&auto=format",
    description:
      "Balcão refrigerado 4 portas com 1200 litros de capacidade, ideal para cozinhas profissionais de alto volume. Estrutura externa em aço inox, interior em alumínio com cantos arredondados para fácil limpeza. Prateleiras reguláveis em grade de aço, 4 portas com fechamento magnético e chave. Compressor de 1/2 HP com controle digital de temperatura.",
    specs: {
      "Capacidade": "1200 litros",
      "Portas": "4 portas em inox",
      "Temperatura": "0°C a +8°C",
      "Compressor": "1/2 HP",
      "Dimensões": "1800 x 750 x 2000 mm (LxPxA)",
    },
  },

  // ========== LAVAGEM ==========
  {
    slug: "lava-loucas-industrial-capacidade-40-cestos-hora",
    name: "Lava-Louças Industrial — 40 Cestos por Hora",
    category: "lavagem",
    price: "R$ 5.999,00",
    image: "https://images.unsplash.com/photo-1589109807644-924edf14ee09?w=800&h=600&fit=crop&auto=format",
    description:
      "Lava-louças industrial de alto desempenho para restaurantes de médio a grande porte. Capacidade de 40 cestos por hora, lavagem em 90 segundos por ciclo. Sistema de enxágue com água a 85°C para higienização completa. Construção em aço inox AISI 304, bombas de lavagem e enxágue independentes, painel digital com 3 programas. Baixo consumo de água: apenas 2,5 litros por ciclo. Inclui dosadores automáticos de detergente e secante.",
    specs: {
      "Capacidade": "40 cestos/hora",
      "Ciclo": "90 segundos",
      "Consumo de água": "2,5 L/ciclo",
      "Material": "Aço Inox AISI 304",
      "Alimentação": "380V trifásico / 7,5 kW",
    },
    featured: true,
  },
  {
    slug: "cuba-inox-dupla-com-escamador",
    name: "Cuba Inox Dupla 2,00 m com Escamador",
    category: "lavagem",
    price: "R$ 1.849,00",
    image: "https://images.unsplash.com/photo-1588416820614-f8d6ac6cea56?w=800&h=600&fit=crop&auto=format",
    description:
      "Cuba dupla em aço inox AISI 304 com 2,00 metros de comprimento, ideal para pré-lavagem e lavagem em cozinhas profissionais. Acompanha escamador central, válvula com cesto coletor e sifão. Bordas arredondadas para segurança, pés com regulagem de altura e niveladores. Cuba com profundidade de 40 cm, adequada para imersão de panelas grandes e assadeiras GN.",
    specs: {
      "Comprimento": "2000 mm",
      "Profundidade": "400 mm",
      "Material": "Aço Inox AISI 304",
      "Cubas": "2 (dupla)",
      "Acessórios": "Escamador + válvula + sifão",
    },
  },
  {
    slug: "torneira-parede-cozinha-industrial",
    name: "Torneira de Parede Cozinha Industrial — Bica Móvel",
    category: "lavagem",
    price: "R$ 349,00",
    image: "https://images.unsplash.com/photo-1749478072094-d21cb929490c?w=800&h=600&fit=crop&auto=format",
    description:
      "Torneira de parede para cozinha industrial com bica móvel articulada, ideal para cubas e bancadas de preparo. Construída em latão cromado, acionamento por alavanca com 1/4 de volta, bica com alcance de 25 cm e giro de 360°. Arejador articulado que facilita a lavagem de utensílios em diferentes ângulos. Compatível com instalação padrão de 1/2 polegada.",
    specs: {
      "Tipo": "Parede",
      "Material": "Latão cromado",
      "Acionamento": "Alavanca 1/4 volta",
      "Bica": "Móvel 25 cm, giro 360°",
      "Conexão": "1/2 polegada",
    },
  },

  // ========== UTENSÍLIOS ==========
  {
    slug: "jogo-panelas-aco-inox-industrial-6-pecas",
    name: "Jogo de Panelas Aço Inox Industrial — 6 Peças",
    category: "utensilios",
    price: "R$ 649,00",
    image: "https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?w=800&h=600&fit=crop&auto=format",
    description:
      "Jogo de panelas profissionais em aço inox triplex (3 camadas: inox + alumínio + inox) para distribuição uniforme de calor. Composto por 6 peças: caçarolas de 2L, 3L e 5L, frigideira de 24 cm, panela de pressão de 6L e caçarola alta de 7L. Cabos em aço inox com fixação por solda ponto (sem rebites), tampas em vidro temperado com saída de vapor. Compatível com todos os tipos de fogão, inclusive indução.",
    specs: {
      "Peças": "6 peças",
      "Material": "Aço Inox Triplex",
      "Tampas": "Vidro temperado",
      "Compatibilidade": "Todos os fogões (inclui indução)",
      "Lavável em lava-louças": "Sim",
    },
    featured: true,
  },
  {
    slug: "kit-facas-profissionais-5-pecas",
    name: "Kit Facas Profissionais 5 Peças — Chef, Santoku, Legumes, Desossa e Pão",
    category: "utensilios",
    price: "R$ 289,00",
    image: "https://images.unsplash.com/photo-1778837224432-5e8ac4fc3d76?w=800&h=600&fit=crop&auto=format",
    description:
      "Kit profissional com 5 facas essenciais para qualquer cozinha: Chef 8\", Santoku 7\", Faca para legumes 4\", Faca de desossa 5\" e Faca de pão 8\". Lâminas em aço inox alemão 1.4116 (X50CrMoV15) com dureza 56-58 HRC, fio de precisão. Cabos ergonômicos em polipropileno com tratamento antibacteriano. Inclui estojo de transporte com elásticos de fixação.",
    specs: {
      "Peças": "5 facas",
      "Aço": "Inox alemão 1.4116",
      "Dureza": "56-58 HRC",
      "Cabos": "Polipropileno antibacteriano",
      "Estojo": "Incluso",
    },
  },
  {
    slug: "balanca-digital-30kg-cozinha",
    name: "Balança Digital Cozinha 30 kg — Bandeja Inox",
    category: "utensilios",
    price: "R$ 229,00",
    image: "https://images.unsplash.com/photo-1771574206309-eda78f8afd03?w=800&h=600&fit=crop&auto=format",
    description:
      "Balança digital profissional com capacidade para 30 kg e precisão de 1 g. Bandeja em aço inox removível para fácil higienização, display LCD com backlight azul, função tara, contagem de peças e hold (congelar peso). Bateria interna recarregável via USB com autonomia de 40 horas. Compacta e portátil, ideal para porcionamento de ingredientes e controle de estoque.",
    specs: {
      "Capacidade": "30 kg",
      "Precisão": "1 g",
      "Bandeja": "Aço inox removível",
      "Display": "LCD com backlight",
      "Bateria": "Recarregável USB, 40h",
    },
  },
];
