import { useEffect, useState } from 'react';
import './App.css';
import { Navbar, NavbarBrand, NavbarContent, Input, Button } from "@nextui-org/react";
import { SunIcon } from './components/SunIcon';
import { MoonIcon } from './components/MoonIcon';
import TopPicks from './components/TopPicks';
import MusicPlayer from './components/Player';
import GridList from './components/GridList';
import SearchResultsList from './components/search';
import YouTubeAPI from './api/api';
import usePlayerStore from './usePlayerStore';
import Favorites from './components/Favorites';

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

const HomeIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => (
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
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M9 22V12h6v10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

const FavoritesIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => (
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
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

const GithubIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => (
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
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      fill="currentColor"
    />
  </svg>
);

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const { isPlayerOpen, currentSong, setPlayerOpen, setCurrentSong } = usePlayerStore();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await YouTubeAPI.getHomepageVideos();
        setSongsList(data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };
    fetchSongs();
  }, []);

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
            <img src="/src/assets/logo.png" alt="MUSO" className="logo-image" />
          </NavbarBrand>
        </Navbar>
        <div className="sidebar-menu">
          <a href="#" className={`sidebar-item ${!showFavorites ? 'active' : ''}`} onClick={() => setShowFavorites(false)}>
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </a>
          <a href="#" className={`sidebar-item ${showFavorites ? 'active' : ''}`} onClick={() => setShowFavorites(true)}>
            <FavoritesIcon className="w-5 h-5" />
            <span>Favorites</span>
          </a>
        </div>
        <div className="sidebar-footer">
          <p className="made-by">Made by Shibam Naskar</p>
          <a 
            href="https://github.com/iamshibamnaskar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-link"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
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
            <SearchResultsList data={searchResults} onClose={() => setIsSearching(false)} />
          ) : showFavorites ? (
            <Favorites />
          ) : (
            <div className="music-grid">
              <TopPicks songs={songsList.slice(0, 10)} />
              <h2 className="section-title">Recommended for you</h2>
              <GridList initialSongs={songsList.slice(10)} />
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