import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('rsv_favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('rsv_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (property) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === property.id);
      if (exists) return prev.filter((p) => p.id !== property.id);
      return [...prev, property];
    });
  };

  const value = useMemo(() => ({ favorites, toggleFavorite }), [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => useContext(FavoritesContext);
