
import React, { useState, useEffect } from 'react';
import { Card, CardBody, Image, ScrollShadow } from "@nextui-org/react";
import usePlayerStore from '../usePlayerStore';
import LoadingSpinner from './LoadingSpinner';

const TopPicks = ({ songs }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setPlayerOpen, setCurrentSong } = usePlayerStore();

  useEffect(() => {
    if (songs && songs.length > 0) {
      setIsLoading(false);
    }
  }, [songs]);

  const handlePlaySong = (url) => {
    setCurrentSong(url);
    setPlayerOpen(true);
  };

  if (isLoading) {
    return (
      <div className="top-picks-section mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Picks</h2>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="top-picks-section mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Picks</h2>
      <ScrollShadow orientation="horizontal" className="w-full">
        <div className="flex gap-4 pb-4">
          {songs.slice(0, 10).map((song, index) => (
            <Card
              key={index}
              isPressable
              onPress={() => handlePlaySong(song.url)}
              className="min-w-[200px] hover:scale-105 transition-transform"
            >
              <CardBody className="p-0">
                <Image
                  alt={song.title}
                  className="object-cover w-full aspect-square"
                  src={song.thumbnail?.url || song.thumbnail}
                />
                <div className="p-3">
                  <p className="font-semibold text-small line-clamp-1">{song.title}</p>
                  <p className="text-tiny text-default-500 line-clamp-1">{song.channel.name}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default TopPicks;
