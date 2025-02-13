import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Select,
  Option,
  Typography,
  Input,
} from "@material-tailwind/react";
import { createSwapy } from "swapy";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

export default function SettingCard({ setCode }) {
    const { getAccessTokenSilently } = useAuth0();

    const [folders, setFolders] = useState([]);
    const [modules, setModules] = useState([]);
    const [cardModules, setCardModules] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [cardTitle, setCardTitle] = useState("");
    const [cardId, setCardId] = useState(null);
    const container = useRef(null);
    const swapy = useRef(null);

    useEffect(() => {
        fetchFolders();
        fetchModules();
    }, []);

    const fetchFolders = async () => {
        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUDIENCE, 
              scope: "read:cards write:cards delete:cards"
            },
          });
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/folders`, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setFolders(data);
    };

    const fetchModules = async () => {
        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUDIENCE, 
              scope: "read:cards write:cards delete:cards"
            },
          });
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/modules`, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setModules(data);
    };

    const handleSaveCard = async () => {
        if (!cardTitle || !selectedFolder) return;
        
        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUDIENCE, 
              scope: "read:cards write:cards delete:cards"
            },
          });
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/cards`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ name: cardTitle, folder_id: selectedFolder })
        });

        const data = await response.json();
        setCardId(data.id);
        setCode(data.id);
    };

    const handleAddModule = async (moduleId) => {
        if (!cardId) return;

        const template = modules.find(m => m.id === parseInt(moduleId));
        if (!template) return;

        const newModule = { 
            module_id: template.id,
            content: {}, // Siempre inicializar vacío
            position: cardModules.length 
        };

        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUDIENCE, 
              scope: "read:cards write:cards delete:cards"
            },
          });
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/cards/${cardId}/modules`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(newModule)
        });

        const savedModule = await response.json();
        console.log(savedModule);
        setCardModules([...cardModules, savedModule]);
        setCode(cardId);
    };

    const handleFieldChange = async (moduleId, fieldName, value) => {
        const updatedModules = cardModules.map(m => 
            m.id === moduleId ? { ...m, content: { ...m.content, [fieldName]: value } } : m
        );

        setCardModules(updatedModules);

        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUDIENCE, 
              scope: "read:cards write:cards delete:cards"
            },
          });
        await fetch(`${import.meta.env.VITE_URL_BACKEND}/cards/${cardId}/modules/${moduleId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ data: updatedModules.find(m => m.id === moduleId).content })
        });
        console.log(cardId)
        setCode(cardId);
    };

    const handleDeleteModule = async (moduleId) => {
        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUDIENCE, 
              scope: "read:cards write:cards delete:cards"
            },
          });
        await fetch(`${import.meta.env.VITE_URL_BACKEND}/cards/${cardId}/modules/${moduleId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });

        setCardModules(cardModules.filter(m => m.id !== moduleId));
        setCode(cardId);
    };

    useEffect(() => {
        if (!container.current) return;

        swapy.current?.destroy();
        swapy.current = createSwapy(container.current, { dragOnHold: false, dragAxis: "y" });

        swapy.current.onSwap(async (event) => {
            const newOrder = event.newSlotItemMap.asArray
                .map(({ item }, index) => ({ ...cardModules.find(m => `${m.id}` === item), position: index }))
                .filter(Boolean);

            // setCardModules(newOrder);

            const token = await getAccessTokenSilently({
                authorizationParams: {
                  audience: import.meta.env.VITE_AUDIENCE, 
                  scope: "read:cards write:cards delete:cards"
                },
              });
            await fetch(`${import.meta.env.VITE_URL_BACKEND}/cards/${cardId}/modules/reorder`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ modules: newOrder.map(m => ({ id: m.id, position: m.position })) })
            });
        });

        setCode(cardId);

        return () => swapy.current?.destroy();
    }, [cardModules]);

    return (
        <div className="w-full min-h-screen p-4">
            {!cardId ? (
                <div className="flex flex-col justify-center items-center gap-5">
                    <Select label="Select Folder" onChange={setSelectedFolder}>
                        {folders.map(folder => <Option key={folder.id} value={`${folder.id}`}>{folder.name}</Option>)}
                    </Select>
                    <Input type="text" label="Card Name" value={cardTitle} onChange={e => setCardTitle(e.target.value)} />
                    <Button onClick={handleSaveCard}>Continue</Button>
                </div>
            ) : (
                <>
                    <Select label="Select Module" onChange={handleAddModule}>
                        {modules.map(m => <Option key={m.id} value={`${m.id}`}>{m.name}</Option>)}
                    </Select>
                    <div ref={container}>
                        {cardModules.map(m => (
                            <div key={m.id} data-swapy-slot={`${m.id}`} >
                                <Card data-swapy-item={`${m.id}`} className="p-4">
                                    <div>
                                        <Typography>{m.name || "Unnamed Module"}</Typography>
                                        <Input type="text" value={m.content?.title || ""} onChange={e => handleFieldChange(m.id, "title", e.target.value)} />
                                        <Button color="red" onClick={() => handleDeleteModule(m.id)}>Remove</Button>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
