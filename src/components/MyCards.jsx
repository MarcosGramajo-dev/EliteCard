import React, { useState, useEffect, useRef } from "react";
import { createSwapy } from "swapy";
import {
  Card,
  Typography,
  Button,
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
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";
import NewFolder from "./NewFolder";
import { TrashIcon, FolderPlusIcon } from '@heroicons/react/24/outline';

export function MyCards() {
  const { getAccessTokenSilently } = useAuth0();
  const [openFolder, setOpenFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const swapy = useRef(null)
  const container = useRef(null)

  const toggleFolder = (folderId) => {
    setOpenFolder(openFolder === folderId ? null : folderId);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUDIENCE, 
          scope: "read:cards write:cards delete:cards"
        },
      });
  
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/folders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
  
      const sortedFolders = data
        .filter(folder => folder.id && folder.position !== undefined) // Evitar `undefined`
        .sort((a, b) => a.position - b.position);
  
      setFolders(sortedFolders);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching folders:", error);
      setLoading(false);
    }
  };
  

  const updateFolderOrder = async (newOrder) => {
    try {

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUDIENCE, 
          scope: "read:cards write:cards delete:cards"
        },
      });
  
      await fetch(`${import.meta.env.VITE_URL_BACKEND}/folders/reorder`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ folders: newOrder }),
      });
    } catch (error) {
      console.error("❌ Error updating folder order:", error);
    }
  };  

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current, {
        dragOnHold: true,
        dragAxis: "y",
      });
    
      swapy.current.onSwap((event) => {
        const newOrder = event.newSlotItemMap.asArray.map(({ item }, index) => ({
          id: item,
          position: index,
        }));
    
        updateFolderOrder(newOrder);
      });

    }
  
    return () => {
      swapy.current?.destroy();
    };
  }, [folders]);
  

  if (loading) return <Loading />;

  return (
    <div className="w-full flex flex-col items-start justify-start">
      <div className="w-full flex justify-between py-2">
        <Typography variant="h5" className="text-left mt-2">
          My Cards
        </Typography>

        <Popover placement="bottom-end">
          <PopoverHandler>
            <IconButton variant="text">
              <FolderPlusIcon strokeWidth={1} className="h-8 w-8" />
            </IconButton>
          </PopoverHandler>
          <PopoverContent>
            <NewFolder fetchFolders={fetchFolders}/>
          </PopoverContent>
        </Popover>
      </div>

      {/* <Card className="w-full overflow-hidden rounded-md mt-5">
        <List  ref={container}>
          {folders.length > 0 ? folders.map((folder) => (
            <div key={folder.id} data-swapy-slot={folder.id}>
              <div 
                data-swapy-item={folder.id} 
                className="flex w-full rounded-none py-2 px-3 text-sm font-normal text-blue-gray-700 cursor-pointer hover:bg-gray-200"
                style={{ minHeight: "50px" }}
                // onClick={() => setOpenFolder(openFolder === folder.id ? null : folder.id)}
              >
                <ListItem className="flex flex-col">
                  <ListItemPrefix>{folder.icon}</ListItemPrefix>
                  {folder.name}
                </ListItem>
              </div>
            </div>
          )) : <span>Folders not found <br></br> Create a new Folder</span>}
        </List>
      </Card> */}

      <Card className="w-full overflow-hidden rounded-md mt-5">
        <List ref={container}>
          {folders.length > 0 ? (
            folders.map((folder) => (
              <div key={folder.id} data-swapy-slot={folder.id}>
                <div 
                  data-swapy-item={folder.id} 
                  className="flex w-full items-center justify-between rounded-none py-2 px-3 text-sm font-normal text-blue-gray-700 cursor-pointer hover:bg-gray-200"
                  style={{ minHeight: "50px" }}
                  onClick={() => toggleFolder(folder.id)}
                >
                  <div className="w-full">
                    <div className="flex items-center min-h-10">
                      <ListItemPrefix>{folder.icon}</ListItemPrefix>
                      {folder.name}
                    <ListItemSuffix className="flex items-center justify-center">
                        {openFolder === folder.id ? "▲" : "▼"}
                    </ListItemSuffix>
                    </div>
                    <Collapse open={openFolder === folder.id}>
                      <div className="p-1">
                        {folder.cards.length > 0 ? (
                          folder.cards.map((card) => (
                            <ListItem key={card.id} className="flex items-center m-2 border-b border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100 transition">
                              <span className="text-sm font-medium">{card.name}</span>
                              <a href={card.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-blue-500 text-xs">
                                View
                              </a>
                            </ListItem>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">No cards available</span>
                        )}
                      </div>
                    </Collapse>
                  </div>
                </div>

                
              </div>
            ))
          ) : (
            <span>Folders not found <br /> Create a new Folder</span>
          )}
        </List>
      </Card>
    </div>
  );
}

export default withAuthenticationRequired(MyCards, {
  onRedirecting: () => <Loading />,
});
