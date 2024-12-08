import React from "react";
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar } from "@nextui-org/react";
import YouTubeAPI from "../api/api";

export const genres = [
  {
    id: 1,
    name: "Rock",
    description: "High-energy and electric guitar-driven music.",
    logo: "https://example.com/logos/rock.png",
  },
  {
    id: 2,
    name: "Pop",
    description: "Catchy melodies and chart-topping hits.",
    logo: "https://example.com/logos/pop.png",
  },
  {
    id: 3,
    name: "Jazz",
    description: "Smooth, soulful, and improvisational tunes.",
    logo: "https://example.com/logos/jazz.png",
  },
  {
    id: 4,
    name: "Hip-Hop",
    description: "Rhythmic beats and impactful lyrics.",
    logo: "https://example.com/logos/hiphop.png",
  },
  {
    id: 5,
    name: "Classical",
    description: "Orchestral masterpieces from the great composers.",
    logo: "https://example.com/logos/classical.png",
  },
  {
    id: 6,
    name: "Country",
    description: "Stories of life and love with a twang.",
    logo: "https://example.com/logos/country.png",
  },
  {
    id: 7,
    name: "Electronic",
    description: "Synth-driven beats for the dancefloor.",
    logo: "https://example.com/logos/electronic.png",
  },
  {
    id: 8,
    name: "Reggae",
    description: "Laid-back vibes and positive messages.",
    logo: "https://example.com/logos/reggae.png",
  },
  {
    id: 9,
    name: "Blues",
    description: "Emotional storytelling through soulful tunes.",
    logo: "https://example.com/logos/blues.png",
  },
  {
    id: 10,
    name: "Metal",
    description: "Heavy riffs and thunderous drums.",
    logo: "https://example.com/logos/metal.png",
  },
  {
    id: 11,
    name: "Folk",
    description: "Traditional sounds with a modern twist.",
    logo: "https://example.com/logos/folk.png",
  },
  {
    id: 12,
    name: "R&B",
    description: "Smooth vocals and groovy beats.",
    logo: "https://example.com/logos/rnb.png",
  },
  {
    id: 13,
    name: "Latin",
    description: "Rhythms full of passion and energy.",
    logo: "https://example.com/logos/latin.png",
  },
  {
    id: 14,
    name: "Punk",
    description: "Fast-paced and rebellious anthems.",
    logo: "https://example.com/logos/punk.png",
  },
  {
    id: 15,
    name: "Soul",
    description: "Deep and emotional music from the heart.",
    logo: "https://example.com/logos/soul.png",
  },
  {
    id: 16,
    name: "Dance",
    description: "Upbeat tracks made to get you moving.",
    logo: "https://example.com/logos/dance.png",
  },
  {
    id: 17,
    name: "Gospel",
    description: "Faith-inspired melodies and harmonies.",
    logo: "https://example.com/logos/gospel.png",
  },
  {
    id: 18,
    name: "Alternative",
    description: "Innovative and genre-defying music.",
    logo: "https://example.com/logos/alternative.png",
  },
  {
    id: 19,
    name: "K-Pop",
    description: "Korean pop with global appeal.",
    logo: "https://example.com/logos/kpop.png",
  },
  {
    id: 20,
    name: "Indie",
    description: "Independent music with unique flavors.",
    logo: "https://example.com/logos/indie.png",
  },
];


export const ListboxWrapper = ({ children }) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function JeonrersSection({ getSearchResults }) {
  const [values, setValues] = React.useState(new Set(["1"]));

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }



    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>Genres</Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <ListboxWrapper>
      <Listbox
        classNames={{
          base: "max-w-xs",
          list: "max-h-[320px] overflow-scroll",
        }}
        defaultSelectedKeys={["1"]}
        items={genres}
        label="Assigned to"
        selectionMode="multiple"
        topContent={topContent}
        variant="flat"
        onSelectionChange={setValues}
      >
        {(item) => (
          <ListboxItem key={item.id} textValue={item.name} onClick={() => {
            getSearchResults(`${item.name} songs`)
          }}>
            <div className="flex gap-2 items-center">
              <Avatar alt={item.name} className="flex-shrink-0" size="sm" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAU9rCYSW0_E0BroInzIdfxxpA1or0eUhnDQ&s" />
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}

