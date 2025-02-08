import React, { useState } from "react";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

export function NewFolder({fetchFolders}) {
  const [selectedIcon, setSelectedIcon] = useState("📁");
  const [folderName, setFolderName] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  

  const iconOptions = [
    { icon: "📁", label: "Folder" },
    { icon: "🎂", label: "Birthday" },
    { icon: "💍", label: "Wedding" },
    { icon: "🎉", label: "Party" },
    { icon: "📅", label: "Meeting" },
    { icon: "🎭", label: "Festival" },
    { icon: "🍽️", label: "Dinner" },
    { icon: "🏆", label: "Competition" },
    { icon: "🎤", label: "Concert" },
    { icon: "🎓", label: "Graduation" },
    { icon: "💼", label: "Business Event" },
  ];

  // const handleSave = () => {
  //   if (!folderName.trim()) {
  //     alert("Folder name cannot be empty!");
  //     return;
  //   }
  //   // addFolder(folderName, selectedIcon);
  //   setFolderName(""); // 🔹 Limpiar el input después de agregar
  // };

  const addFolder = async (folderName, icon) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUDIENCE, 
          scope: "read:cards write:cards delete:cards"
        },
      });
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/folders`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: folderName, icon }),
      });

      console.log({ name: folderName, icon });

      if (!response.ok) {
        throw new Error("Error creating folder");
      }

      const newFolder = await response.json();
      fetchFolders();
      // setFolders([...folders, newFolder]);
    } catch (error) {
      console.error("❌ Error adding folder:", error);
    }
  };

  return (
    <div className="w-full text-left">
      <div className="relative flex w-full max-w-[24rem]">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="blue-gray"
              className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
            >
              <span className="text-lg">{selectedIcon}</span>
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            {iconOptions.map(({ icon, label }) => (
              <MenuItem
                key={label}
                className="flex items-center gap-2"
                onClick={() => setSelectedIcon(icon)}
              >
                <span className="text-lg">{icon}</span> {label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="rounded-none !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
        />
        <Button 
          className="rounded-l-none min-w-[70px]" 
          size="sm" 
          onClick={() => addFolder(folderName, selectedIcon)}
        >
          Save
        </Button>

      </div>
    </div>
  );
}

export default withAuthenticationRequired(NewFolder, {
  onRedirecting: () => <Loading />,
});
