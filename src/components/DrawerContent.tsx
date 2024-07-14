import React from "react";

interface DrawerContentProps {
  content: React.ReactNode;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ content }) => {
  return (
    <div>
      <h1>Drawer Content</h1>
      {content}
    </div>
  );
};

export default DrawerContent;
