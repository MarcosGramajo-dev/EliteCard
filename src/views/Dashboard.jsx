import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import MenuNavigator from "../components/MenuNavigator";
import MyCards from "../components/MyCards"; // Importa el componente
import NewCard from "../components/NewCard";
import Modules from "../components/Modules";

export const Dashboard = () => {
  const [isOpen, setIsOpen] = useState("My Cards");

  const renderComponent = () => {
    switch (isOpen) {
      case "My Cards":
        return <MyCards />;
      case "New Card":
        return <NewCard />;
      case "Modules":
        return <Modules />;
      default:
        return <MyCards />;
    }
  };

  return (
    <div className="relative pt-24 flex flex-col items-center min-h-screen mb-5">
      <div className="bg-[#eaebea] w-full p-5 text-center">
        <Typography variant="h3" className="text-left pb-2 border-b-2 border-gray-300">
          Dashboard
        </Typography>

        <div className="w-full flex justify-center">{renderComponent()}</div>
      </div>
      
      <MenuNavigator setIsOpen={setIsOpen} />
    </div>
  );
};

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <Loading />,
});
