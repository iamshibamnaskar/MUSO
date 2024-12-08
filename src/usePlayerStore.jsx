import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  isPlayerOpen: false,
  currentSong: '',
  setPlayerOpen: (isOpen) => set({ isPlayerOpen: isOpen }),
  setCurrentSong: (songUrl) => set({ currentSong: songUrl }),
  closePlayer: () => set({ isPlayerOpen: false, currentSong: '' }),
}));

export default usePlayerStore;