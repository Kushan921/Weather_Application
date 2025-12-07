import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'weather:favorites';

type FavoritesContextType = {
  favorites: number[];
  toggle: (id: number) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      console.log('Loaded favorites from localStorage:', stored);
      return stored;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    console.log('Saving favorites to localStorage:', favorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggle = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      console.log(`Toggle city ${id}: was in favorites = ${prev.includes(id)}, new favorites:`, newFavorites);
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}
