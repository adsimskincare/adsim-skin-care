import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, UGCItem, CartItem, Order, StoreSettings, PageRoute } from '../types';
import { INITIAL_PRODUCTS, INITIAL_UGC, INITIAL_SETTINGS, INITIAL_ORDERS } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  ugcItems: UGCItem[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  settings: StoreSettings;
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedConcernFilter: string | null;
  setSelectedConcernFilter: (concern: string | null) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSkinMatchOpen: boolean;
  setIsSkinMatchOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Order Actions
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Admin CMS Actions
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addUGC: (ugc: Omit<UGCItem, 'id' | 'createdDate'>) => UGCItem;
  updateUGC: (ugc: UGCItem) => void;
  deleteUGC: (ugcId: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('adsim_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [ugcItems, setUgcItems] = useState<UGCItem[]>(() => {
    try {
      const saved = localStorage.getItem('adsim_ugc');
      return saved ? JSON.parse(saved) : INITIAL_UGC;
    } catch {
      return INITIAL_UGC;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('adsim_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('adsim_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('adsim_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('adsim_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedConcernFilter, setSelectedConcernFilter] = useState<string | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSkinMatchOpen, setIsSkinMatchOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem('adsim_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('adsim_ugc', JSON.stringify(ugcItems));
    } catch (e) {
      console.error(e);
    }
  }, [ugcItems]);

  useEffect(() => {
    try {
      localStorage.setItem('adsim_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('adsim_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('adsim_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('adsim_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Cart helper calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Order Confirmed'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Admin CMS
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const id = productData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4);
    const newProduct: Product = {
      ...productData,
      id
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    if (selectedProductDetail?.id === updated.id) {
      setSelectedProductDetail(updated);
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    if (selectedProductDetail?.id === productId) {
      setSelectedProductDetail(null);
    }
  };

  const addUGC = (ugcData: Omit<UGCItem, 'id' | 'createdDate'>): UGCItem => {
    const newUgc: UGCItem = {
      ...ugcData,
      id: `ugc-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setUgcItems(prev => [newUgc, ...prev]);
    return newUgc;
  };

  const updateUGC = (updated: UGCItem) => {
    setUgcItems(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const deleteUGC = (ugcId: string) => {
    setUgcItems(prev => prev.filter(u => u.id !== ugcId));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setUgcItems(INITIAL_UGC);
    setSettings(INITIAL_SETTINGS);
    setOrders(INITIAL_ORDERS);
    localStorage.removeItem('adsim_products');
    localStorage.removeItem('adsim_ugc');
    localStorage.removeItem('adsim_settings');
    localStorage.removeItem('adsim_orders');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        ugcItems,
        cart,
        wishlist,
        orders,
        settings,
        currentPage,
        setCurrentPage,
        selectedConcernFilter,
        setSelectedConcernFilter,
        selectedProductDetail,
        setSelectedProductDetail,
        isCartOpen,
        setIsCartOpen,
        isSkinMatchOpen,
        setIsSkinMatchOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        toggleWishlist,
        isInWishlist,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addUGC,
        updateUGC,
        deleteUGC,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
