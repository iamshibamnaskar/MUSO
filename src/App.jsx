import { useEffect, useState } from 'react';
import './App.css';
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import MusicPlayer from './components/Player';
import GridList from './components/GridList';
import HeroSection from './components/Hero';
import JeonrersSection from './components/Jonres';
import usePlayerStore from './usePlayerStore';
import YouTubeAPI from './api/api';
import SearchResultsList from './components/search';

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
  return (
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
};

const CrossIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
  return (
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
        d="M6 18L18 6M6 6L18 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};


export default function App() {
  const { isPlayerOpen, currentSong, setPlayerOpen, setCurrentSong, closePlayer } = usePlayerStore();
  const [users, SetUsers] = useState([])
  const [search, Setsearch] = useState([])
  const [searchopen, setsearchopen] = useState(false)
  const [list, SetList] = useState([])

  const handleFavouritesClick = () => {
    setCurrentSong('https://music.youtube.com/watch?v=jsWi2KhRorw&list=RDAMVMjsWi2KhRorw'); // Example song URL
    setPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setPlayerOpen(false);
    setCurrentSong('');
  };

  const getAutocompletes = async (txt) => {
    YouTubeAPI.getAutocompletes(txt)
      .then((data) => {
        // console.log('Homepage Videos:', data);
        SetUsers(data)

      })
      .catch((error) => {
        // console.error(error.message);
      });
  };

  const getSearchResults = async (txt) => {
    // console.log("SEARCH")
    YouTubeAPI.getSearchResults(txt)
      .then((data) => {
        // console.log('Homepage Videos:', data);
        setsearchopen(true)
        Setsearch(data)

      })
      .catch((error) => {
        // console.error(error.message);
      });
  };

  const getHomePage = async (url) => {
    YouTubeAPI.getSearchResults("Rock band metal")
      .then((data) => {
        // console.log('Homepage Videos:', data);
        SetList([data[0], data[1], data[2]])

      })
      .catch((error) => {
        // console.error(error.message);
      });
  };

  useEffect(() => {
    getHomePage()
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <AcmeLogo />
            <p className="hidden sm:block font-bold text-inherit">MUSO</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          {/* <Input
            classNames={{
              base: "max-w-full sm:max-w-[100rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          /> */}

          <Autocomplete
            aria-label="Search songs"
            classNames={{
              base: "max-w-xs",
              listboxWrapper: "max-h-[320px]",
              selectorButton: "text-default-500",
            }}
            defaultItems={users.map((user) => ({ name: user }))}
            inputProps={{
              classNames: {
                input: "ml-1",
                inputWrapper: "h-[48px]",
              },
            }}
            onInput={(e) => {
              if (e.target.value.length >= 4) {
                getAutocompletes(e.target.value);
              } else if (e.target.value.length == 0) {
                setsearchopen(false)
              }
            }}



            listboxProps={{
              hideSelectedIcon: true,
              itemClasses: {
                base: [
                  "rounded-medium",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[hover=true]:bg-default-200",
                  "data-[selectable=true]:focus:bg-default-100",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            placeholder="Search songs..."
            popoverProps={{
              offset: 10,
              classNames: {
                base: "rounded-large",
                content: "p-1 border-small border-default-100 bg-background",
              },
            }}
            radius="full"
            startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
            variant="bordered"
          >
            {(item, index) => (
              <AutocompleteItem key={`${item.name}-${index}`} textValue={item.name} onClick={() => { getSearchResults(item.name) }}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">{item.name}</span>
                    </div>
                  </div>

                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>

          {/* <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>

              <DropdownItem key="help_and_feedback" onClick={handleFavouritesClick}>Favourites</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </NavbarContent>
      </Navbar>
      {!searchopen && <div style={{ flexGrow: 1, padding: 20 }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: -220 }}>
          {/* HeroSection with 75% width */}
          <div style={{ flex: 3 }}>
            <HeroSection getSearchResults={getSearchResults} data={list} />
          </div>
          {/* JeonrersSection with 25% width */}
          <div style={{ flex: 1 }}>
            <JeonrersSection getSearchResults={getSearchResults} />
          </div>
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>Top Picks</h1>
        <GridList />
      </div>}

      <MusicPlayer
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        songUrl={currentSong}
      />
      {searchopen && <div style={{ marginLeft: "auto", marginRight: 20, padding: 10 }} onClick={() => { setsearchopen(false) }} ><CrossIcon className="text-default-400" size={20} strokeWidth={2.5} /></div>}
      {searchopen && <SearchResultsList data={search} />}


    </div>
  );
}
