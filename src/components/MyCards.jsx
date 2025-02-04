import React, { useState, useEffect, useRef } from "react";
import { createSwapy } from "swapy";
import {
  Card,
  Typography,
  Chip,
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Collapse,
  List,
  ListItem,
  ListItemSuffix,
  ListItemPrefix
} from "@material-tailwind/react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";
import NewFolder from "./NewFolder"

export function MyCards() {
  const [openFolder, setOpenFolder] = useState(null);
  const [folders, setFolders] = useState([
    { id: "1", icon: "🎉", name: "Party", subItems: ["New Year's Eve", "Summer Pool Party", "Halloween Bash"] },
    { id: "2", icon: "📅", name: "Events", subItems: ["Conference", "Networking Event", "Product Launch"] },
    { id: "3", icon: "🎂", name: "Birthdays", subItems: ["Ana's Birthday", "John's Birthday", "Surprise Party"] },
    { id: "4", icon: "💼", name: "Work Projects", subItems: ["Website Redesign", "Marketing Campaign", "Product Development"] },
    { id: "5", icon: "📝", name: "Personal Notes", subItems: ["Daily Journal", "Book Recommendations", "Goals for 2024"] },
    { id: "6", icon: "🏖️", name: "Vacations", subItems: ["Hawaii Trip", "Europe Tour", "Road Trip Across USA"] },
    { id: "7", icon: "🛒", name: "Shopping Lists", subItems: ["Groceries", "Christmas Gifts", "Tech Gadgets Wishlist"] },
    { id: "8", icon: "💰", name: "Finances", subItems: ["Monthly Budget", "Investments", "Expense Tracker"] },
    { id: "9", icon: "🎵", name: "Music", subItems: ["Rock Playlist", "Workout Songs", "Relaxing Instrumentals"] },
    { id: "10", icon: "🎥", name: "Movies & Series", subItems: ["To Watch List", "Favorite Classics", "Upcoming Releases"] },
  ]);

  let folder = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>

let trash = <svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
strokeWidth={1.5}
stroke="currentColor"
className="h-4 w-4"
>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
/>
</svg>

  const swapy = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current)

      swapy.current.onSwap((event) => {
      })
    }

    return () => {
      swapy.current?.destroy()
    }
  }, [])

  return (
    <div className="w-full flex flex-col items-start justify-start">
      <div className="w-full flex justify-between py-2">
        <Typography variant="h5" className="text-left mt-2">
          My Cards
        </Typography>

        <Popover placement="bottom-end">
          <PopoverHandler>
            <IconButton variant="text">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
                <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
                <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </IconButton>
          </PopoverHandler>
          <PopoverContent>
            <NewFolder />
          </PopoverContent>
        </Popover>
      </div>

      <Card className="w-full overflow-hidden rounded-md mt-5" ref={container}>
        <List>
          {folders.map((folder) => (
            <div key={folder.id} data-swapy-slot={folder.id}>
              <div 
              data-swapy-item={folder.id} 
              className="flex w-full rounded-none py-2 px-3 text-sm font-normal text-blue-gray-700 cursor-pointer hover:bg-gray-200"
              style={{ minHeight: "50px" }}
              onClick={() => setOpenFolder(openFolder === folder.name ? null : folder.name)}
              >

                <ListItem className="flex flex-col" >
                  <div className="w-full flex items-center">
                    <ListItemPrefix>{folder.icon ? folder.icon : folder}</ListItemPrefix>
                    {folder.name}
                    <ListItemSuffix>
                      <Chip
                        value={folder.subItems.length}
                        variant="ghost"
                        size="sm"
                        className="rounded-full px-2 py-1 text-xs group-hover:bg-white/20 group-hover:text-white"
                      />
                    </ListItemSuffix>
                    <IconButton variant="text" color="red">
                      {trash}
                    </IconButton>
                  </div>

                  <div className="w-full">
                  <Collapse open={openFolder === folder.name}>
                    <List className="ml-5">
                      {folder.subItems.length > 0 ? (
                        folder.subItems.map((subItem, index) => (
                          <ListItem key={index} className="py-1.5 px-3 text-sm text-gray-600">
                            {subItem}
                          </ListItem>
                        ))
                      ) : (
                        <ListItem className="py-1.5 px-3 text-sm text-gray-400 italic">
                          Not Found.
                        </ListItem>
                      )}
                    </List>
                  </Collapse>
                  </div>
                </ListItem>

              </div>

            </div>
          ))}
        </List>
      </Card>
    </div>
  );
}

export default withAuthenticationRequired(MyCards, {
  onRedirecting: () => <Loading />,
});
