import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Button } from "@material-tailwind/react";
import {
    ArrowPathIcon
  } from "@heroicons/react/24/solid";

import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

export default function PreviewCard({ cardId }) {
    const { getAccessTokenSilently } = useAuth0();
    const [code, setCode] = useState("");
    const [reloadTrigger, setReloadTrigger] = useState(false);

    const fethCard = async () => {
        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUDIENCE, 
              scope: "read:cards write:cards delete:cards"
            },
          });

        fetch(`${import.meta.env.VITE_URL_BACKEND}/cards/${cardId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.modules || data.modules.length === 0) {
                    setCode("<p>No modules added to this card.</p>");
                    return;
                }

                const generatedCode = data.modules.map(m => {
                    return replacePlaceholders(m.code, m.data);
                }).join("\n");

                setCode(DOMPurify.sanitize(generatedCode));
            });
    }

    useEffect(() => {
        console.log("cardId", cardId)
        if (!cardId) return;
        fethCard();
        
    }, [cardId, reloadTrigger]); // ⚡ Ahora se vuelve a ejecutar cuando cambia `cardId`

    const replacePlaceholders = (template, data) => {
        if (!data) return template;
        return template.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()] || "");
    };

    return (
    <div className="min-h-screen">
        <div className="w-full flex justify-end mb-5">
            <Button variant="outlined" className="flex items-center gap-3" onClick={() => setReloadTrigger(prev => !prev)}>
                <ArrowPathIcon className="h-4 w-4"/> Reload
            </Button>
        </div>
        <div className="bg-white">
            <div className="min-h-screen p-4 border" dangerouslySetInnerHTML={{ __html: code }} />
        </div>
    </div>

    );
}
