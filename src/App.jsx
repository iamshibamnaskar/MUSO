import { useEffect, useState } from 'react';
import './App.css';
import { Navbar, NavbarBrand, NavbarContent, Input } from "@nextui-org/react";
import TopPicks from './components/TopPicks';
import MusicPlayer from './components/Player';
import GridList from './components/GridList';
import SearchResultsList from './components/search';
import YouTubeAPI from './api/api';
import usePlayerStore from './usePlayerStore';

const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { isPlayerOpen, currentSong, setPlayerOpen, setCurrentSong } = usePlayerStore();

  const handleSearch = async (query) => {
    if (query.length < 3) {
      setIsSearching(false);
      return;
    }

    try {
      const results = await YouTubeAPI.getSearchResults(query);
      setSearchResults(results);
      setIsSearching(true);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <Navbar>
          <NavbarBrand className="py-4 px-6">
            <h1 className="text-xl font-bold">MUSO</h1>
          </NavbarBrand>
        </Navbar>
        <div className="sidebar-menu">
          <a href="#" className={`sidebar-item ${!showFavorites ? 'active' : ''}`} onClick={() => setShowFavorites(false)}>Home</a>
          <a href="#" className={`sidebar-item ${showFavorites ? 'active' : ''}`} onClick={() => setShowFavorites(true)}>Favorites</a>
        </div>
      </div>

      <div className="main-content">
        <Navbar className="navbar">
          <NavbarContent className="search-container" justify="center">
            <Input
              classNames={{
                base: "max-w-xl w-full",
                input: "text-small",
                inputWrapper: "h-10 bg-default-100",
              }}
              placeholder="Search for music..."
              startContent={<SearchIcon className="text-default-400" />}
              type="search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </NavbarContent>
        </Navbar>

        <div className="content-area">
          {isSearching ? (
            <SearchResultsList data={searchResults} />
          ) : showFavorites ? (
            <div className="music-grid">
              <h2 className="section-title">Your Favorites</h2>
              <p className="text-center text-gray-500 mt-8">No favorites yet</p>
            </div>
          ) : (
            <div className="music-grid">
              <TopPicks songs={list} />
              <h2 className="section-title">Recommended for you</h2>
              <GridList />
            </div>
          )}
        </div>
      </div>

      <MusicPlayer
        isOpen={isPlayerOpen}
        onClose={() => setPlayerOpen(false)}
        songUrl={currentSong}
      />
    </div>
  );
}