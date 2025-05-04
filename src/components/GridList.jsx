
import { Card, CardBody, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import YouTubeAPI from "../api/api";
import usePlayerStore from "../usePlayerStore";

export default function GridList() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setPlayerOpen, setCurrentSong } = usePlayerStore();

  const getHomePage = async () => {
    try {
      setIsLoading(true);
      const data = await YouTubeAPI.getHomepageVideos();
      setList(data);
    } catch (error) {
      console.error('Failed to fetch homepage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySong = (url, thumbnail) => {
    setCurrentSong(url, thumbnail);
    setPlayerOpen(true);
  };

  useEffect(() => {
    getHomePage();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {list.map((item, index) => (
        <Card
          key={index}
          isPressable
          onPress={() => handlePlaySong(item.url)}
          className="bg-content1 hover:scale-105 transition-transform"
        >
          <CardBody className="p-0">
            <Image
              alt={item.title}
              className="object-cover aspect-square w-full"
              src={item.thumbnail}
            />
            <div className="p-3">
              <p className="font-semibold text-small line-clamp-2">{item.title}</p>
              <p className="text-tiny text-default-500">{item.channel.name}</p>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
