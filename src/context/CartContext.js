import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings } from '../i18n/strings';

const CartContext = createContext(null);

const CART_KEY = '@cart_items';
const LANG_KEY = '@language';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [language, setLanguage] = useState('en');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cartJson, lang] = await Promise.all([
          AsyncStorage.getItem(CART_KEY),
          AsyncStorage.getItem(LANG_KEY),
        ]);

        if (cartJson) {
          const parsed = JSON.parse(cartJson);
          if (Array.isArray(parsed)) setCartItems(parsed);
        }
        if (lang) setLanguage(lang);
      } catch (e) {
        console.log('Failed to load storage', e);
      } finally {
        setHydrated(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems)).catch(() => { });
  }, [cartItems, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(LANG_KEY, language).catch(() => { });
  }, [language, hydrated]);

  const addToCart = product => {
    setCartItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = id => {
    setCartItems(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const value = {
    cartItems,
    cartCount: cartItems.length,
    addToCart,
    removeFromCart,
    clearCart,
    language,
    setLanguage,
    hydrated,
    t: strings[language] || strings.en,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
