export interface Product {
  id: string;
  name: string;
  category: string; // e.g. "Acne Care Face Wash", "Tan Remove Face Wash", "Moisturizer"
  size: string; // e.g. "100 ml", "50 g"
  price: number; // e.g. 299
  salePrice?: number;
  positioning: string; // e.g. "Clear Skin. Everyday Confidence."
  shortDescription: string;
  description: string;
  skinConcern: 'acne' | 'oil-control' | 'tan-removal' | 'hydration' | 'barrier-repair';
  skinConcernLabel: string;
  suitableFor: string;
  keyIngredients: string[];
  benefits: string[];
  howToUse: string[];
  fullIngredients: string;
  batchNo: string;
  mfgExp: string;
  mfgBy: string;
  licNo: string;
  images: string[];
  videoUrl?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isPublished: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  dermatTested: boolean;
}

export interface UGCItem {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  creatorName: string;
  creatorHandle?: string;
  caption: string;
  productId: string;
  productName: string;
  isPublished: boolean;
  isHomepageFeatured: boolean;
  createdDate: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  purchasedProduct: string;
  reviewDate: string;
  verifiedPurchase: boolean;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  status: 'Order Received' | 'Order Confirmed' | 'Processing' | 'Ready for Dispatch' | 'Shipped' | 'Delivered';
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  image: string;
}

export type PageRoute = 
  | 'home' 
  | 'shop' 
  | 'concerns' 
  | 'about' 
  | 'journal' 
  | 'contact' 
  | 'cart' 
  | 'account' 
  | 'admin';

export interface StoreSettings {
  announcementText: string;
  enableCod: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  whatsAppNumber: string;
  contactEmail: string;
  customLogoUrl?: string;
  customModelUrl?: string;
}
