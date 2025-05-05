import React from 'react';
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import useFavoritesStore from '../useFavoritesStore';
import usePlayerStore from '../usePlayerStore';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const { setPlayerOpen, setCurrentSong } = usePlayerStore();

  const handlePlaySong = (song) => {
    setCurrentSong(song.url, song.thumbnail);
    setPlayerOpen(true);
  };

  const handleRemoveFavorite = (e, songUrl) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromFavorites(songUrl);
  };

  if (favorites.length === 0) {
    return (
      <div className="music-grid">
        <h2 className="section-title">Your Favorites</h2>
        <p className="text-center text-gray-500 mt-8">No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="music-grid">
      <h2 className="section-title">Your Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.map((song, index) => (
          <Card
            key={index}
            isPressable
            onPress={() => handlePlaySong(song)}
            className="bg-content1 hover:scale-105 transition-transform"
          >
            <CardBody className="p-0">
              <Image
                alt={song.title}
                className="object-cover aspect-square w-full"
                src={song.thumbnail}
              />
              <div className="p-3">
                <p className="font-semibold text-small line-clamp-2">{song.title}</p>
                <Button
                  size="sm"
                  color="danger"
                  variant="light"
                  className="mt-2"
                  onClick={(e) => handleRemoveFavorite(e, song.url)}
                >
                  Remove from Favorites
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites; 