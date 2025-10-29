'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { message } from "antd";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  size?: string;
  quantity: number;
};

type CartContextType = {
  cartCount: number;
  cartItems: CartItem[];
  addItemToCart: (item: Omit<CartItem, "quantity">) => void;
  removeItemFromCart: (id: number, size?: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 🧠 ჩატვირთვა localStorage-დან
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error parsing cart from localStorage:", err);
      }
    }
  }, []);

  // 💾 შენახვა localStorage-ში ყოველ ცვლილებაზე
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item: Omit<CartItem, "quantity">) => {
    if (!item.size || item.size.trim() === "") {
      message.warning("გთხოვთ, აირჩიოთ ზომა");
      return;
    }

    const existsIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (existsIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existsIndex].quantity += 1;
      setCartItems(updatedItems);
      message.success("პროდუქტის რაოდენობა გაიზარდა კალათაში");
      return;
    }

    setCartItems([...cartItems, { ...item, quantity: 1 }]);
    message.success("პროდუქტი დაემატა კალათაში");
  };

  const removeItemFromCart = (id: number, size?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id || (size && item.size !== size))
    );
    message.info("პროდუქტი წაიშალა კალათიდან");
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
