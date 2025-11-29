// Dados mockados dos produtos para a loja Rustic Store
export const products = [
  {
    id: 1,
    name: "Mesa de Madeira Rústica",
    price: 899.99,
    originalPrice: 1199.99,
    category: "Móveis",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop"
    ],
    description: "Mesa de jantar em madeira maciça com acabamento rústico. Perfeita para ambientes aconchegantes e familiares.",
    features: ["Madeira maciça", "Acabamento natural", "Capacidade para 6 pessoas", "Resistente e durável"],
    inStock: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    name: "Cadeira Artesanal",
    price: 299.99,
    originalPrice: 399.99,
    category: "Móveis",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop"
    ],
    description: "Cadeira feita à mão com design rústico e confortável. Ideal para complementar sua mesa de jantar.",
    features: ["Feita à mão", "Design ergonômico", "Madeira tratada", "Estofado confortável"],
    inStock: true,
    rating: 4.6,
    reviews: 18
  },
  {
    id: 3,
    name: "Luminária Pendente Industrial",
    price: 189.99,
    originalPrice: 249.99,
    category: "Iluminação",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
    ],
    description: "Luminária pendente com estilo industrial moderno. Perfeita para cozinhas e salas de jantar.",
    features: ["Estilo industrial", "Metal resistente", "Lâmpada LED incluída", "Fácil instalação"],
    inStock: true,
    rating: 4.7,
    reviews: 31
  },
  {
    id: 4,
    name: "Vaso Decorativo Cerâmica",
    price: 79.99,
    originalPrice: 99.99,
    category: "Decoração",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop"
    ],
    description: "Vaso decorativo em cerâmica artesanal. Ideal para plantas ou como peça decorativa.",
    features: ["Cerâmica artesanal", "Design único", "Resistente à água", "Várias cores disponíveis"],
    inStock: false,
    rating: 4.5,
    reviews: 12
  },
  {
    id: 5,
    name: "Espelho Vintage",
    price: 349.99,
    originalPrice: 449.99,
    category: "Decoração",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop"
    ],
    description: "Espelho com moldura vintage em madeira envelhecida. Adiciona charme e elegância ao ambiente.",
    features: ["Moldura em madeira", "Estilo vintage", "Espelho de alta qualidade", "Fácil fixação na parede"],
    inStock: true,
    rating: 4.9,
    reviews: 8
  },
  {
    id: 6,
    name: "Tapete Artesanal",
    price: 259.99,
    originalPrice: 329.99,
    category: "Decoração",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop"
    ],
    description: "Tapete feito à mão com fibras naturais. Traz aconchego e estilo para qualquer ambiente.",
    features: ["Fibras naturais", "Feito à mão", "Antialérgico", "Fácil limpeza"],
    inStock: true,
    rating: 4.4,
    reviews: 15
  },
  {
    id: 7,
    name: "Prateleira Flutuante",
    price: 149.99,
    originalPrice: 199.99,
    category: "Móveis",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop"
    ],
    description: "Prateleira flutuante em madeira maciça. Perfeita para organizar livros e objetos decorativos.",
    features: ["Madeira maciça", "Instalação invisível", "Suporte até 20kg", "Design minimalista"],
    inStock: true,
    rating: 4.7,
    reviews: 22
  },
  {
    id: 8,
    name: "Abajur de Mesa Vintage",
    price: 129.99,
    originalPrice: 169.99,
    category: "Iluminação",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=500&fit=crop"
    ],
    description: "Abajur de mesa com design vintage e cúpula em tecido. Ilumina ambientes com elegância.",
    features: ["Design vintage", "Cúpula em tecido", "Luz ambiente suave", "Interruptor integrado"],
    inStock: true,
    rating: 4.6,
    reviews: 19
  }
];

export const categories = [
  { id: 'all', name: 'Todos os Produtos' },
  { id: 'moveis', name: 'Móveis' },
  { id: 'iluminacao', name: 'Iluminação' },
  { id: 'decoracao', name: 'Decoração' }
];

export const featuredProducts = products.slice(0, 5);
