import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // =========================
  // CART
  // =========================

  const addToCart = (product, size) => {
    const selectedSize =
      size || product.sizes?.[0] || "M";

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) =>
          item.id === product.id &&
          item.size === selectedSize
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id &&
          item.size === selectedSize
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          size: selectedSize,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id, size) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id, size) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id && item.size === size
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, size) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product,
      ];
    });
  };

  // Old name support
  const wish = toggleWishlist;

  const isWishlisted = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  // =========================
  // TOTALS
  // =========================

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          item.quantity,
      0
    );
  }, [cart]);

  const wishlistCount =
    wishlist.length;

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    cart,
    wishlist,

    cartCount,
    cartTotal,
    wishlistCount,

    addToCart,

    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,

    toggleWishlist,
    wish,
    isWishlisted,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context =
    useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used inside ShopProvider"
    );
  }

  return context;
}

export default ShopContext;