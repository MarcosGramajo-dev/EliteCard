import { useState } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Card,
  Collapse,
  Button,
} from "@material-tailwind/react";

import { BreadcrumbsWithIcon } from "./Breadcrumbs";
import Loading from "./Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export function MyCards() {
  const [openFolder, setOpenFolder] = useState(null);

  const toggleFolder = (folderName) => {
    setOpenFolder(openFolder === folderName ? null : folderName);
  };

  let inbox = <svg
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
    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
  />
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

  let config = <svg
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
    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  />
</svg>

  let folder = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>


let arrayFolders = [
  {
    name: "Party",
    icon: inbox,
    subItems: ["Birthday Bash", "New Year's Eve", "Summer Pool Party"],
  },
  {
    name: "Events",
    icon: trash,
    subItems: [],
  },
  {
    name: "Birthdays",
    icon: config,
    subItems: ["Ana's Birthday", "John's Birthday"],
  },
  {
    name: "Work Projects",
    icon: folder,
    subItems: ["Website Redesign", "Marketing Campaign", "Product Launch"],
  },
  {
    name: "Personal Notes",
    icon: inbox,
    subItems: ["Daily Journal", "Book Recommendations", "Goals for 2024"],
  },
  {
    name: "Vacations",
    icon: trash,
    subItems: ["Hawaii Trip", "Europe Tour", "Road Trip Across USA"],
  },
  {
    name: "Shopping Lists",
    icon: config,
    subItems: ["Groceries", "Christmas Gifts", "Tech Gadgets Wishlist"],
  },
  {
    name: "Finances",
    icon: folder,
    subItems: ["Monthly Budget", "Investments", "Expense Tracker"],
  },
  {
    name: "Music",
    icon: inbox,
    subItems: ["Rock Playlist", "Workout Songs", "Relaxing Instrumentals"],
  },
  {
    name: "Movies & Series",
    icon: trash,
    subItems: ["To Watch List", "Favorite Classics", "Upcoming Releases"],
  },
];



return (
  <div className="w-full flex flex-col items-start justify-start">
    <BreadcrumbsWithIcon />
    <Button fullWidth > Add Folder </Button>
    <Card className="w-full overflow-hidden rounded-md mt-5">
      <List className="my-2 p-0">
        {arrayFolders.map((element) => (
          <div key={element.name}>
            <ListItem
              className="group rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white cursor-pointer"
              onClick={() => toggleFolder(element.name)}
            >
              <ListItemPrefix>{element.icon ? element.icon : folder}</ListItemPrefix>
              {element.name}
              <ListItemSuffix>
                <Chip
                  value={element.subItems.length}
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-2 py-1 text-xs group-hover:bg-white/20 group-hover:text-white"
                />
              </ListItemSuffix>
            </ListItem>

            {/* Contenido colapsable */}
            <Collapse open={openFolder === element.name}>
              <List className="ml-5">
                {element.subItems.length > 0 ? (
                  element.subItems.map((subItem, index) => (
                    <ListItem key={index} className="py-1.5 px-3 text-sm text-gray-600">
                      {subItem}
                    </ListItem>
                  ))
                ) : (
                  <ListItem className="py-1.5 px-3 text-sm text-gray-400 italic">
                    No hay elementos en esta carpeta.
                  </ListItem>
                )}
              </List>
            </Collapse>
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