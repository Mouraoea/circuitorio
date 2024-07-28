import React from "react";

interface DrawerContentProps {
  content: React.ReactNode;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ content }) => {
  return <div>{content}</div>;
};

export default DrawerContent;
