import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import YouTubeAPI from "../api/api";
import usePlayerStore from "../usePlayerStore";

export default function GridList() {
    const [list, Setlist] = useState([])
    const { setPlayerOpen, setCurrentSong } = usePlayerStore();


    const getHomePage = async (url) => {
        YouTubeAPI.getHomepageVideos()
            .then((data) => {
                console.log('Homepage Videos:', data);
                Setlist(data)

            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const handlePlaySong = (url) => {
        setCurrentSong(url); // Example song URL
        setPlayerOpen(true);
    };


    useEffect(() => {
        getHomePage()
    }, []);

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
            {list.map((item, index) => (
                /* eslint-disable no-console */
                <Card isFooterBlurred key={index} isPressable shadow="sm" className="border-none" radius="lg" onPress={() => handlePlaySong(item.url)}>
                    <Image
                        alt="Woman listing to music"
                        className="object-cover"
                        height={200}
                        src={item.thumbnail}
                        width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">{item.title.slice(0, 50)}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
