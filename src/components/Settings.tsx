import React from "react";
import BlueprintOverlay from "./Blueprint";

const Settings: React.FC = () => {
  return (
    <div>
      <div className="flex-space-between">
        <h2>Settings</h2>
      </div>
      <div className="panel-inset mb0 mt0"></div>
      <div className="panel-inset-lighter mt0"></div>
      <div className="app">
        <BlueprintOverlay />
      </div>
    </div>
  );
};

export default Settings;
