import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};

/* ── Default Catalog for Themes, Bundles & Upsells ────────────────────── */
export const PRODUCTS = [
  {
    id: 'plain-jane',
    name: 'Plain Jane Theme',
    subtitle: 'Lookbooks, drop timers, custom fonts',
    price: 99,
    image: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    tag: 'Best Seller',
    badge: 'Popular',
  },
  {
    id: 'plain-jane-lifetime',
    name: 'Plain Jane (Lifetime License)',
    subtitle: 'All future versions & lifetime updates',
    price: 199,
    image: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    tag: 'Lifetime Access',
    badge: 'Lifetime',
  },
  {
    id: 'plain-jane-interactive',
    name: 'Plain Jane Interactive Theme',
    subtitle: '8 3D visualizers, kinetic motion & audio player',
    price: 149,
    image: '/pickyourtheme/3_cf50cd1f-2b11-45c2-ac71-b585cc64e5aa.avif',
    tag: 'Full Creative Control',
    badge: '3D & Motion',
  },
  {
    id: 'plain-jane-interactive-lifetime',
    name: 'Plain Jane Interactive (Lifetime License)',
    subtitle: '8 3D worlds + lifetime updates forever',
    price: 299,
    image: '/pickyourtheme/3_cf50cd1f-2b11-45c2-ac71-b585cc64e5aa.avif',
    tag: 'Best Value',
    badge: 'VIP Lifetime',
  },
  {
    id: 'starter',
    name: 'Plain Jane Starter Theme',
    subtitle: 'Clean product pages & rapid checkout setup',
    price: 59,
    image: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    tag: 'Budget Friendly',
  },
  {
    id: 'elite-bundle',
    name: 'Elite Theme Package — All-In-One Bundle',
    subtitle: 'Every premium theme + lifetime updates included',
    price: 49.99,
    image: '/everythinginonepage/FC6750AB-9ABC-4D70-BDB8-4E357A3E70E0.webp',
    tag: 'Save 80%',
    badge: '100X Value',
  },
  {
    id: 'theme-installation',
    name: 'Theme Installation & Store Setup',
    subtitle: 'Theme installed, licensed & configured for you (1-2 days)',
    price: 20,
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/theme-installation-photo.png?v=1784261615',
    tag: 'Fast Turnaround',
  },
  {
    id: 'quick-task',
    name: 'Quick Task (Shopify Expert Service)',
    subtitle: 'One custom fix, tweak or styling adjustment (1-2 days)',
    price: 65,
    image: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    tag: '1-2 Days',
  },
  {
    id: 'full-theme-setup',
    name: 'Full Theme Setup & Store Launch',
    subtitle: 'Complete launch-ready store with navigation & polish',
    price: 499,
    image: 'https://cdn.shopify.com/s/files/1/0734/5501/0114/files/theme-installation-photo.png?v=1784261615',
    tag: 'Full Service',
  },
];

const STORAGE_KEY = 'openspaces_cart_v1';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  /**
   * Add an item to cart (supports flexible item schemas)
   */
  const addItem = useCallback((itemData) => {
    if (!itemData) return;

    // Normalize price into a clean number
    let rawPrice = itemData.price;
    if (typeof rawPrice === 'string') {
      rawPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0;
    }

    const normalizedItem = {
      id: String(itemData.id || itemData.name || Date.now()),
      name: itemData.name || itemData.title || 'OpenSpaces Item',
      subtitle: itemData.subtitle || itemData.desc || 'Premium Shopify Asset',
      price: rawPrice || 0,
      image: itemData.image || itemData.img || itemData.fallbackImage || '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
      tag: itemData.tag || '',
      badge: itemData.badge || '',
    };

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === normalizedItem.id);
      if (existingIndex > -1) {
        return prev.map((i, idx) =>
          idx === existingIndex ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      }
      return [...prev, { ...normalizedItem, qty: 1 }];
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalQty = items.reduce((sum, item) => sum + (item.qty || 1), 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
