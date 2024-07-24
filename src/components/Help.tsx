import React from "react";

const Help: React.FC = () => {
  return (
    <div>
      <div className="flex-space-between">
        <h2>Help</h2>
      </div>
      <div className="panel-inset mb0 mt0">Shortcuts</div>
      <div className="panel-inset-lighter mt0">
        e: Inventory
        <br />
        o: Debug
        <br />
        q: Cancel Placement
        <br />
        r: Rotate element
        <br />
        F1/h: Help
        <br />
        F2: Settings
        <br />
        Escape: Close drawers
        <br />
        Mouse middle button/Arrow keys/ASWD: Pan
        <br />
        Scroll: Zoom
        <br />
        \: Reset zoom and pan
      </div>
    </div>
  );
};

export default Help;
