import React, { useState, useEffect, useRef } from "react";
import { createSwapy } from "swapy";
import {
  Card,
  Typography,
  Chip,
  IconButton
} from "@material-tailwind/react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";

export function MyCards() {
  const [folders, setFolders] = useState([
    { id: "1", icon: "🎉", name: "Party" },
    { id: "2", icon: "📅", name: "Events" },
    { id: "3", icon: "🎂", name: "Birthdays" },
    { id: "4", icon: "💼", name: "Work Projects" },
    { id: "5", icon: "📝", name: "Personal Notes" },
    { id: "6", icon: "🏖️", name: "Vacations" },
    { id: "7", icon: "🛒", name: "Shopping Lists" },
    { id: "8", icon: "💰", name: "Finances" },
    { id: "9", icon: "🎵", name: "Music" },
    { id: "10", icon: "🎥", name: "Movies & Series" },
  ]);

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
        <IconButton variant="text">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
          <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
          <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"/>
        </svg>
        </IconButton>
      </div>

      <Card className="w-full overflow-hidden rounded-md mt-5" ref={container}>
        {folders.map((folder) => (
          <div key={folder.id} data-swapy-slot={folder.id}>
            <div 
            data-swapy-item={folder.id} 
            className="flex justify-between items-center rounded-none py-2 px-3 text-sm font-normal text-blue-gray-700 cursor-pointer hover:bg-gray-200"
            style={{ minHeight: "50px" }}
            >
              <div className="">
                {folder.icon} {'   '} {folder.name}
              </div>
              <Chip
                value="+99"
                variant="ghost"
                size="sm"
                className="rounded-full px-2 py-1 text-xs group-hover:bg-white/20 group-hover:text-white"
              />

            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default withAuthenticationRequired(MyCards, {
  onRedirecting: () => <Loading />,
});
