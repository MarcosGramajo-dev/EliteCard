import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Select,
  Option,
  Collapse,
  Typography,
  Input,
  Textarea,
  IconButton
} from "@material-tailwind/react";
import modulesData from "../data/modules.json";
import cardsData from "../data/cards.json";
import Loading from "./Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { TrashIcon } from '@heroicons/react/24/outline';

export function SettingCard({ setCode }) {
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [cardName, setCardName] = useState("");
  const [cards, setCards] = useState(Array.isArray(cardsData) ? [...cardsData] : []);
  const { getAccessTokenSilently } = useAuth0();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setModules(modulesData);
    fetchFolders();
  }, []);

  useEffect(() => {
    // 🔥 Generar código dinámico cuando se actualizan los módulos seleccionados
    const updatedCode = selectedModules
      .map(module => {
        let moduleCode = module.code;
        Object.entries(module.values || {}).forEach(([key, value]) => {
          moduleCode = moduleCode.replace(`{${key}}`, value || "");
        });
        return moduleCode;
      })
      .join("\n");

    setCode(updatedCode);
  }, [selectedModules, setCode]);

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
      const sortedFolders = data.filter(folder => folder.id && folder.position !== undefined)
        .sort((a, b) => a.position - b.position);
  
      setFolders(sortedFolders);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching folders:", error);
      setLoading(false);
    }
  };

  const addModule = (moduleId) => {
    if (selectedModules.some((mod) => mod.id === Number(moduleId))) return;
    
    const moduleToAdd = modules.find((m) => m.id === Number(moduleId));
    if (moduleToAdd) {
      setSelectedModules([...selectedModules, { ...moduleToAdd, values: {} }]);
    }
  };

  const handleFieldChange = (moduleId, fieldName, value) => {
    setSelectedModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, values: { ...module.values, [fieldName]: value } }
          : module
      )
    );
  };

  const removeModule = (moduleId) => {
    setSelectedModules((prevModules) =>
      prevModules.filter((module) => module.id !== moduleId)
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full flex flex-col items-start p-4">
      <div className="w-full flex flex-col justify-between items-center mb-4 gap-5">
        <div className="flex justify-between w-full">
          <Typography variant="h4">Create Your Card</Typography>
          <Button onClick={() => console.log("Save Card")} className="ml-4 min-w-20 bg-gold">Save</Button>
        </div>

        <div className="w-full">
          <Select label="Select Folder">
            {folders.length > 0 ? folders.map((folder) => (
                <Option key={folder.id} value={`${folder.id}`}> {folder.name} </Option>
            )) : <Option> Not Found </Option>}
          </Select>
        </div>

        <div className="flex justify-center items-center w-full">
          <Input
              type="text"
              variant="standard" 
              label="Card Name"
              placeholder="Card Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full border-t-2 border-gray-300 my-5 mb-8"></div>

      <div className="flex gap-2 items-center mb-4 w-full">
        <Select label="Select a module" onChange={(value) => addModule(value)}>
          {modules.map((module) => (
            <Option key={module.id} value={module.id.toString()}>
              {module.name}
            </Option>
          ))}
        </Select>
      </div>

      {selectedModules.map((module) => (
        <Card key={module.id} className="w-full mb-4 p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <Typography
              variant="paragraph"
              className="cursor-pointer"
              onClick={() =>
                setExpandedModule(expandedModule === module.id ? null : module.id)
              }
            >
              {module.name}
            </Typography>
            <IconButton variant="text" size="sm" onClick={() => removeModule(module.id)}> 
              <TrashIcon className="h-4 w-4 text-red-500" />
            </IconButton>
          </div>

          <Collapse open={expandedModule === module.id}>
            <div className="mt-2">
              {module.fields.map((field) => (
                <div key={field.name} className="mb-3">
                  {field.type === "text" ? (
                    <Input
                      type="text"
                      value={module.values[field.name] || ""}
                      onChange={(e) =>
                        handleFieldChange(module.id, field.name, e.target.value)
                      }
                    />
                  ) : field.type === "textarea" ? (
                    <Textarea
                      value={module.values[field.name] || ""}
                      onChange={(e) =>
                        handleFieldChange(module.id, field.name, e.target.value)
                      }
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}

export default withAuthenticationRequired(SettingCard, {
  onRedirecting: () => <Loading />,
});
