import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  DevicePhoneMobileIcon
} from "@heroicons/react/24/solid";

import SettingCard from "./SettingCard";
import PreviewCard from "./PreviewCard";
 
export default function NewCard() {
  const [code, setCode] = useState("");

  return (
    <Tabs value="dashboard" className="w-full">
      <TabsHeader>
        <Tab value="dashboard">
          <div className="flex items-center gap-2">
            <Square3Stack3DIcon className="h-4 w-4" />
            Dashboard
          </div>
        </Tab>

        <Tab value="preview">
          <div className="flex items-center gap-2">
            <DevicePhoneMobileIcon className="h-4 w-4" />
            Preview
          </div>
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value="dashboard">
          <SettingCard setCode={setCode} />
        </TabPanel>
        <TabPanel value="preview">
          <PreviewCard code={code} />
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
