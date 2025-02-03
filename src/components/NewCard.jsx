import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";

import Loading from "./Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export const NewCard = () => {
  const [open, setOpen] = useState(null);
  const [modules, setModules] = useState([
    { id: 1, name: "Module 1", description: "", color: "#ffffff", image: "" },
    { id: 2, name: "Module 2", description: "", color: "#ffffff", image: "" }
  ]);

  const handleOpen = (id) => setOpen(open === id ? null : id);

  const handleInputChange = (id, field, value) => {
    setModules(modules.map(mod => mod.id === id ? { ...mod, [field]: value } : mod));
  };

  const addModule = () => {
    const newModule = {
      id: modules.length + 1,
      name: `Module ${modules.length + 1}`,
      description: "",
      color: "#ffffff",
      image: ""
    };
    setModules([...modules, newModule]);
  };

  return (
    <div className="p-5">
      {/* Accordion to edit modules */}
      {modules.map((mod) => (
        <Accordion key={mod.id} open={open === mod.id} icon={<Icon id={mod.id} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(mod.id)}>
            {mod.name}
          </AccordionHeader>
          <AccordionBody>
            <div className="flex flex-col gap-4">
              <Input 
                label="Module Name" 
                value={mod.name} 
                onChange={(e) => handleInputChange(mod.id, "name", e.target.value)} 
              />
              <Textarea 
                label="Description" 
                value={mod.description} 
                onChange={(e) => handleInputChange(mod.id, "description", e.target.value)} 
              />
              <Input 
                type="color" 
                label="Color" 
                value={mod.color} 
                onChange={(e) => handleInputChange(mod.id, "color", e.target.value)} 
              />
              <Input 
                type="file" 
                label="Image" 
                onChange={(e) => handleInputChange(mod.id, "image", e.target.files[0])} 
              />
            </div>
          </AccordionBody>
        </Accordion>
      ))}

      {/* Button to add a new module */}
      <div className="mt-5 flex justify-center">
        <Button onClick={addModule} className="flex justify-center items-center gap-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Module
        </Button>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(NewCard, {
  onRedirecting: () => <Loading />,
});
