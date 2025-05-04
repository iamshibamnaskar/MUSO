import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  isPlayerOpen: false,
  currentSong: '',
  currentThumbnail: '',
  setPlayerOpen: (isOpen) => set({ isPlayerOpen: isOpen }),
  setCurrentSong: (songUrl, thumbnail = '') => set({ currentSong: songUrl, currentThumbnail: thumbnail }),
  closePlayer: () => set({ isPlayerOpen: false, currentSong: '', currentThumbnail: '' }),
}));

export default usePlayerStore;