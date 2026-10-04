import { Product, UGCItem, Review, Article, StoreSettings, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'acnova',
    name: 'Acnova',
    category: 'Acne Control Face Wash',
    size: '100 ml',
    price: 299,
    salePrice: 399,
    positioning: 'Clear Skin. Everyday Confidence.',
    shortDescription: 'Specially formulated to deeply cleanse skin, remove excess oil and impurities, and help reduce acne-causing buildup.',
    description: 'Enriched with Salicylic Acid, Green Tea Extract and Ethyl Ascorbic Acid, Acnova helps control oil, unclog pores, and promote clearer, healthier-looking skin without over-drying.',
    skinConcern: 'acne',
    skinConcernLabel: 'Acne-Prone Skin',
    suitableFor: 'Suitable for Acne-Prone & Oily Skin',
    keyIngredients: ['Salicylic Acid', 'Green Tea Extract', 'Ethyl Ascorbic Acid', 'Aloe Vera Extract', 'Glycerine'],
    benefits: [
      'Unclogs pores — helps remove dirt and impurities',
      'Fights acne — helps reduce acne & breakouts',
      'Controls excess sebum and prevents future blemishes',
      'Fresh, non-drying dermat-approved finish'
    ],
    howToUse: [
      'Take a small amount on your palm.',
      'Apply on wet face.',
      'Massage gently in circular motion.',
      'Rinse thoroughly with water.',
      'Use twice daily for best results.'
    ],
    fullIngredients: 'Green Tree Extract, Ethyl Ascorbic Acid, Alovera Extract, DM Water, Acrylate Copolymer, Sodium Laureth Sulphate, Cocamidopropyl Betaine, Phenoxyethanol (and) Ethylhexylglycerin, Glycerine, Citric Acid, Triethanolamine, Perfume.',
    batchNo: 'AAFW01',
    mfgExp: 'Mfg 06/2026 · Exp 05/2028',
    mfgBy: "Rangoli Aromatherapy, Surat, Gujarat - 395007 / ADSIM CARE PVT LTD, New Delhi - 110003",
    licNo: 'GC 17193',
    images: [
      '/src/assets/images/adsim_acnova_bottle_1791141898362.jpg',
      '/src/assets/images/adsim_acnova_back_1791143348918.jpg'
    ],
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
    isPublished: true,
    stock: 450,
    rating: 4.9,
    reviewCount: 48,
    dermatTested: true
  },
  {
    id: 'glowvera',
    name: 'Glowvera',
    category: 'Tan Remove Face Wash',
    size: '100 ml',
    price: 299,
    salePrice: 299,
    positioning: 'Brighten Every Morning with Natural Radiance',
    shortDescription: 'A powerful formula enriched with Ethyl Ascorbic Acid that helps reduce tan, brighten skin and restore natural glow.',
    description: 'Deeply cleanses, removes impurities and excess oil while keeping the skin refreshed, smooth and even-toned. Perfect for daily sun recovery and antioxidant radiance.',
    skinConcern: 'tan-removal',
    skinConcernLabel: 'Tan & Dullness',
    suitableFor: 'Suitable for Most Skin Types',
    keyIngredients: ['Ethyl Ascorbic Acid (Vitamin C)', 'Aloe Vera Extract', 'Glycerine', 'DM Water'],
    benefits: [
      'Removes tan — helps reduce tan & dullness',
      'Brightens skin — boosts natural glow, evens skin tone',
      'Purifies skin — deeply cleanses and removes environmental grime',
      'Soothes skin — calms sun irritation for soft, fresh skin'
    ],
    howToUse: [
      'Take a small amount on your palm.',
      'Apply on wet face.',
      'Massage gently in circular motion.',
      'Rinse thoroughly with water.',
      'Use twice daily for best results.'
    ],
    fullIngredients: 'DM Water, Acrylate copolymer, Sodium Laureth Sulphate, Cocamidopropyl Betaine, Phenoxyethanol (and) Ethylhexylglycerin, Glycerine, Citric Acid, Triethanolamine, Fragrance, Ethyl Ascorbic Acid.',
    batchNo: 'AGTRFW01',
    mfgExp: 'Mfg 06/2026 · Exp 05/2028',
    mfgBy: "Rangrej's Aromatherapy / ADSIM CARE PVT LTD, New Delhi",
    licNo: 'GC 1793',
    images: [
      '/src/assets/images/adsim_glowvera_bottle_1791141909418.jpg',
      '/src/assets/images/adsim_glowvera_back_1791143362906.jpg'
    ],
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
    isPublished: true,
    stock: 520,
    rating: 4.9,
    reviewCount: 52,
    dermatTested: true
  },
  {
    id: 'oilvera',
    name: 'Oilvera',
    category: 'Oil Control Face Wash',
    size: '100 ml',
    price: 279,
    salePrice: 279,
    positioning: 'Clear Skin & Long-Lasting Oil Control',
    shortDescription: 'Specially formulated to deeply cleanse skin, remove excess oil and impurities, and help reduce acne-causing buildup.',
    description: 'Enriched with Salicylic Acid, Oilvera regulates sebum production, unclogs pores, and promotes clearer, healthy-looking skin with a comfortable, non-drying finish.',
    skinConcern: 'oil-control',
    skinConcernLabel: 'Oily & Combination Skin',
    suitableFor: 'Suitable for Oily & Combination Skin',
    keyIngredients: ['Salicylic Acid', 'Glycerine', 'DM Water', 'Botanical Actives'],
    benefits: [
      'Controls oil & excess sebum — for cleaner & fresher skin all day',
      'Unclogs pores & prevents acne — for clear & healthy skin',
      'Gentle & non-drying — maintains natural moisture barrier',
      'Instant matte feel without tightness'
    ],
    howToUse: [
      'Take a small amount on your palm.',
      'Apply on wet face.',
      'Massage gently in circular motion.',
      'Rinse thoroughly with water.',
      'Use twice daily for best results.'
    ],
    fullIngredients: 'DM Water, Acrylate Copolymer, Sodium Lauroyl Sulphate, Cocamidopropyl Betaine, Phenoxyethanol (and) Ethylhexylglycerin, Glycerine, Citric Acid, Triethanolamine, Fragrance, Salicylic Acid.',
    batchNo: 'AOCFW01',
    mfgExp: 'Mfg 06/2026 · Exp 05/2028',
    mfgBy: "Rangrej's Aromatherapy, Surat / ADSIM CARE PVT LTD, New Delhi 110096",
    licNo: 'GC/1793',
    images: [
      '/src/assets/images/adsim_oilvera_bottle_1791141936152.jpg',
      '/src/assets/images/adsim_oilvera_back_1791143376210.jpg'
    ],
    isBestSeller: true,
    isNewArrival: false,
    isFeatured: true,
    isPublished: true,
    stock: 480,
    rating: 4.8,
    reviewCount: 39,
    dermatTested: true
  },
  {
    id: 'hydrovia',
    name: 'Hydrovia',
    category: 'Hydration Care Face Wash',
    size: '100 ml',
    price: 249,
    salePrice: 249,
    positioning: 'Hydration That Feels Effortless & Refreshing',
    shortDescription: 'A premium foaming formula enriched with Hyaluronic Acid, Aloevera & Liquorice Extracts with gentle scrubbing beads.',
    description: "Cleanses deep, removes impurities and helps maintain skin's natural moisture balance for a soft, hydrated and refreshed feel. Gentle micro-beads exfoliate flaky dead cells without scratching.",
    skinConcern: 'hydration',
    skinConcernLabel: 'Dry & Sensitive Skin',
    suitableFor: 'Suitable for Dry & Sensitive Skin',
    keyIngredients: ['Hyaluronic Acid', 'Aloe Vera Extract', 'Liquorice Extract', 'Gentle Scrubbing Beads', 'Glycerine'],
    benefits: [
      'Deep hydration — keeps skin soft, supple and replenished',
      'Gentle exfoliation — scrubbing beads lift flakiness and impurities',
      'Soothes & refreshes — aloe vera & liquorice calm irritation',
      'Protects natural acid mantle against tightness'
    ],
    howToUse: [
      'Take a small amount on your palm.',
      'Apply on wet face.',
      'Massage gently in circular motion allowing beads to dissolve.',
      'Rinse thoroughly with water.',
      'Use twice daily for best results.'
    ],
    fullIngredients: 'Liquorice Extract, Aloevera extract, Hyaluronic acid, Propylene Glycol, DM water, Acrylate copolymer, Sodium Lauryl Sulphate, Cocamidopropyl Betaine, Phenoxyethanol (and) Ethylhexylglycerin, Scrubbing beads, Glycerine, Citric acid, Triethanolamine, Fragrance, CI 77491.',
    batchNo: 'AHW001',
    mfgExp: 'Mfg 05/2026 · Exp 05/2028',
    mfgBy: 'ADSIM CARE PVT LTD, 915, Vasundhara Enclave, New Delhi 110096',
    licNo: 'CC 1794',
    images: [
      '/src/assets/images/adsim_hydrovia_bottle_1791141921760.jpg',
      '/src/assets/images/adsim_hydrovia_back_1791143389232.jpg'
    ],
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
    isPublished: true,
    stock: 410,
    rating: 4.8,
    reviewCount: 34,
    dermatTested: true
  },
  {
    id: 'moisturizing-yogurt-cream',
    name: 'Moisturizing Yogurt Cream',
    category: 'Moisturizer',
    size: '50 g',
    price: 499,
    salePrice: 499,
    positioning: 'Deep Hydration • Soft & Smooth Skin • Daily Moisture Care',
    shortDescription: 'Lightweight formula that provides deep hydration, softens texture and reinforces skin moisture barrier.',
    description: 'Specially formulated to deeply hydrate and nourish skin with Vitamin E, Hyaluronic Acid, Trehalose and Allantoin. Non-greasy everyday comfort for all skin types, AM & PM.',
    skinConcern: 'barrier-repair',
    skinConcernLabel: 'All Skin Types · Barrier Care',
    suitableFor: 'For All Skin Types · AM & PM Use',
    keyIngredients: ['Sodium Hyaluronate', 'Trehalose', 'Allantoin', 'Vitamin E Oil', 'Panthenol', 'Xanthan Gum'],
    benefits: [
      'Deep hydration — long-lasting moisture cushion',
      'Lightweight formula — absorbs instantly without oily residue',
      'Soft & smooth skin — smooths rough, crepey texture',
      'Skin barrier support — locks moisture in against pollution',
      'Paraben free & Cruelty free'
    ],
    howToUse: [
      'Take a small amount on fingertips.',
      'Apply evenly on clean face & neck.',
      'Massage gently until fully absorbed — use twice daily.'
    ],
    fullIngredients: 'Dm Water, Acacia Senegal Gum (and) Xanthan Gum, Polyacrylate Crosspolymer-6, Caprylic / Capric Triglyceride, Mentha, Glucose Sesquiarurate, Cetearyl Alcohol, Alcohol, Cyclopentasiloxane, Vitamin E Oil, Water (Aqua), Sodium Chloride, Sodium Lactate, Trehalose, Allantoin, Sodium Hyaluronate, Glucose, Panthenol, Glycerin, Fructose, Urea, Citric Acid, Sodium Hydroxide, Maltose, Sodium PCA.',
    batchNo: 'A0/TC/01',
    mfgExp: 'Mfg 05/2025 · Exp 04/2028',
    mfgBy: "Rangrej's Aromatherapy Surfact, Gujarat / Marketed by ADSIM CARE PVT LTD, New Delhi 110096",
    licNo: 'GC/1713',
    images: [
      '/src/assets/images/adsim_yogurt_cream_jar_1791141949881.jpg',
      '/src/assets/images/adsim_yogurt_cream_back_1791143408086.jpg'
    ],
    isBestSeller: true,
    isNewArrival: true,
    isFeatured: true,
    isPublished: true,
    stock: 330,
    rating: 4.9,
    reviewCount: 56,
    dermatTested: true
  }
];

export const INITIAL_UGC: UGCItem[] = [
  {
    id: 'ugc-model-official',
    mediaUrl: '/src/assets/images/adsim_model_skincare_routine_1791143295478.jpg',
    mediaType: 'image',
    creatorName: 'ADSIM Brand Ambassador',
    creatorHandle: '@adsim.care',
    caption: 'Official contracted brand face of ADSIM CARE. Glowing, healthy skin every day with Acnova & Moisturizing Yogurt Cream!',
    productId: 'acnova',
    productName: 'Acnova Acne Control Face Wash',
    isPublished: true,
    isHomepageFeatured: true,
    createdDate: '2026-10-04'
  },
  {
    id: 'ugc-glowvera',
    mediaUrl: '/src/assets/images/hero_adsim_model_banner_1791143281137.jpg',
    mediaType: 'image',
    creatorName: 'Ananya Sharma',
    creatorHandle: '@ananya.routines',
    caption: 'Nothing feels fresher after a long commute in Delhi sun than Glowvera with Vitamin C and Aloe Vera.',
    productId: 'glowvera',
    productName: 'Glowvera Tan Remove Face Wash',
    isPublished: true,
    isHomepageFeatured: true,
    createdDate: '2026-10-01'
  },
  {
    id: 'ugc-yogurt-cream',
    mediaUrl: '/src/assets/images/adsim_about_collection_banner_1791143311373.jpg',
    mediaType: 'image',
    creatorName: 'Kritika Verma',
    creatorHandle: '@kritika_beauty',
    caption: 'The Moisturizing Yogurt Cream feels like a cool water-burst on the cheeks. Lightweight and non-greasy under makeup!',
    productId: 'moisturizing-yogurt-cream',
    productName: 'Moisturizing Yogurt Cream',
    isPublished: true,
    isHomepageFeatured: true,
    createdDate: '2026-09-29'
  },
  {
    id: 'ugc-hydrovia',
    mediaUrl: '/src/assets/images/adsim_category_facewash_1791143323268.jpg',
    mediaType: 'image',
    creatorName: 'Priya Sundaram',
    creatorHandle: '@priya.glow',
    caption: 'Hydrovia has gentle micro beads that melt away dryness while hyaluronic acid hydrates deeply.',
    productId: 'hydrovia',
    productName: 'Hydrovia Hydration Care Face Wash',
    isPublished: true,
    isHomepageFeatured: true,
    createdDate: '2026-09-26'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Aarav Patel',
    rating: 5,
    review: 'Acnova cleared my forehead congestion in two weeks. It foams softly and does not leave that stretchy tight feeling on my skin.',
    purchasedProduct: 'Acnova Acne Control Face Wash',
    reviewDate: 'September 2026',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    customerName: 'Meera Sengupta',
    rating: 5,
    review: 'Glowvera works wonders after daily Delhi commute in the sun. Skin looks instantly refreshed and radiant.',
    purchasedProduct: 'Glowvera Tan Remove Face Wash',
    reviewDate: 'September 2026',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    customerName: 'Sanjay Rawat',
    rating: 5,
    review: 'The Moisturizing Yogurt Cream feels so luxurious yet absorbs in seconds. Perfect for warm Indian climate.',
    purchasedProduct: 'Moisturizing Yogurt Cream',
    reviewDate: 'August 2026',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    customerName: 'Divya Sundaram',
    rating: 5,
    review: 'Hydrovia is my holy grail for sensitive dehydrated skin. The soothing aloe and licorice makes cleansing completely irritation-free.',
    purchasedProduct: 'Hydrovia Hydration Care Face Wash',
    reviewDate: 'October 2026',
    verifiedPurchase: true
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'simple-routine-guide',
    title: 'How to Build a Simple Skincare Routine',
    category: 'Skincare Routine',
    readTime: '4 min read',
    date: 'Oct 2026',
    summary: 'Why an effective skincare routine does not require ten steps — four intentional steps are all your skin barrier needs.',
    content: [
      'In a world of complicated multi-step regimens, skincare can quickly become overwhelming. At ADSIM CARE, our philosophy is anchored in thoughtful, targeted formulations that respect your natural skin barrier.',
      'Step 1: Cleanse with Care. Use a face wash targeted to your primary skin concern. If dealing with excess sebum and congestion, Salicylic acid washes like Acnova or Oilvera work gently to unclog pores. For dry skin, hydrating agents in Hydrovia keep moisture intact.',
      'Step 2: Target Your Concern. After cleansing, allow your skin to absorb active formulations without overlayering.',
      'Step 3: Hydrate & Lock Moisture. Lightweight hydration like our Moisturizing Yogurt Cream replenishes essential fatty acids, Trehalose and Sodium Hyaluronate.',
      'Step 4: Sunscreen Protection. Always complete your morning routine with broad-spectrum SPF to preserve your skin from UVA and UVB rays.'
    ],
    image: '/src/assets/images/hero_adsim_model_banner_1791143281137.jpg'
  },
  {
    id: 'understanding-oily-skin',
    title: 'Understanding Oily Skin in Indian Climates',
    category: 'Oily Skin',
    readTime: '3 min read',
    date: 'Sep 2026',
    summary: 'The difference between over-cleansing and true sebum regulation, and how to maintain a comfortable matte finish.',
    content: [
      'Humidity and tropical temperatures stimulate sebaceous glands to produce excess sebum. Often, the instinct is to wash with harsh surfactants, which strips the moisture barrier and triggers rebound oil production.',
      'The key lies in using gentle beta-hydroxy acids like Salicylic Acid that penetrate deep into the lipid layers of the pore without disrupting the acid mantle.',
      'Pairing Oilvera with an ultra-lightweight water-burst moisturizer like the Moisturizing Yogurt Cream provides adequate hydration so your skin does not overcompensate.'
    ],
    image: '/src/assets/images/adsim_about_collection_banner_1791143311373.jpg'
  },
  {
    id: 'daily-care-acne-prone',
    title: 'Daily Care for Acne-Prone Skin',
    category: 'Acne Care',
    readTime: '5 min read',
    date: 'Sep 2026',
    summary: 'Actionable steps for calming active breakouts, clearing bacterial buildup, and preventing post-inflammatory marks.',
    content: [
      'Acne is rarely solved by scrubbing aggressively. True skin recovery requires a calm, consistent approach that targets the bacteria, sebum accumulation, and inflammation simultaneously.',
      'Our Acnova formulation pairs Salicylic Acid with calming Green Tea Extract and Aloe Vera. While the BHA clears dead cell buildup from inside the pore lining, botanical antioxidants soothe redness and keep inflammation at bay.'
    ],
    image: '/src/assets/images/adsim_model_skincare_routine_1791143295478.jpg'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  announcementText: 'FREE Pan-India Delivery on orders over ₹499 • Crafted with Care by ADSIM CARE PVT LTD',
  enableCod: true,
  freeShippingThreshold: 499,
  standardShippingFee: 49,
  whatsAppNumber: '917079572343',
  contactEmail: 'adsimcaresupport@gmail.com'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8941',
    date: '2026-10-04',
    customerName: 'Ritu Aggarwal',
    mobile: '+91 98112 43210',
    email: 'ritu.aggarwal@gmail.com',
    address: '915, Vasundhara Enclave',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110096',
    items: [
      { productId: 'acnova', productName: 'Acnova Acne Control Face Wash', quantity: 1, price: 299 },
      { productId: 'moisturizing-yogurt-cream', productName: 'Moisturizing Yogurt Cream', quantity: 1, price: 499 }
    ],
    subtotal: 798,
    shipping: 0,
    discount: 0,
    total: 798,
    paymentMethod: 'UPI',
    status: 'Shipped'
  }
];
