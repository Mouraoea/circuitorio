import React from "react";

const Help: React.FC = () => {
  return (
    <div>
      <div className="flex-space-between">
        <h2>Help</h2>
      </div>
      <div className="panel-inset mb0 mt0">Shortcuts</div>
      <div className="panel-inset-lighter mt0">
        h: Help
        <br />
        e: Inventory
        <br />
        o: Debug
        <br />
        F1/h: Help
        <br />
        F2: Settings
        <br />
        Escape: Close drawers
      </div>
    </div>
  );
};

export default Help;
