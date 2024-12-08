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



const SearchResultsList = ({ data }) => {
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
      );
}

export default SearchResultsList;