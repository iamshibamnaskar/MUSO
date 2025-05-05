import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],
      addToFavorites: (song) => set((state) => {
        // Check if song already exists in favorites
        const exists = state.favorites.some(fav => fav.url === song.url);
        if (exists) return state;
        return { favorites: [...state.favorites, song] };
      }),
      removeFromFavorites: (songUrl) => set((state) => ({
        favorites: state.favorites.filter(song => song.url !== songUrl)
      })),
      isFavorite: (songUrl) => {
        const state = useFavoritesStore.getState();
        return state.favorites.some(song => song.url === songUrl);
      }
    }),
    {
      name: 'favorites-storage',
    }
  )
);

export default useFavoritesStore; 