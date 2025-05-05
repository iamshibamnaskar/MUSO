import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react";
import usePlayerStore from "../usePlayerStore";


export const columns = [
  {name: "RESULTS", uid: "name"}
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};



const SearchResultsList = ({ data, onClose }) => {
    const { setPlayerOpen, setCurrentSong } = usePlayerStore();
    

    const handlePlaySong = (url) => {
        setCurrentSong(url); // Example song URL
        setPlayerOpen(true);
    };
    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
    
        switch (columnKey) {
          case "name":
            return (
              <User
                avatarProps={{radius: "lg", src: user['thumbnail']['url']}}
                description={user['channel']['name']}
                name={user['title']}
              >
                {user.email}
              </User>
            );
          
          
          default:
            return cellValue;
        }
      }, []);
    
      return (
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Search Results</h2>
            <Button
              isIconOnly
              color="danger"
              variant="light"
              className="hover:bg-danger-100"
              onClick={onClose}
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </Button>
          </div>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data}>
              {(item) => (
                <TableRow key={item.id} onClick={()=>{handlePlaySong(item.url)}}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      );
}

export default SearchResultsList;