import { useState } from "react";

export const useDrawerState = () => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [leftOpenDrawerId, setLeftOpenDrawerId] = useState<string | null>(null);
  const [leftDrawerContent, setLeftDrawerContent] = useState<React.ReactNode>(null);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [rightOpenDrawerId, setRightOpenDrawerId] = useState<string | null>(null);
  const [rightDrawerContent, setRightDrawerContent] = useState<React.ReactNode>(null);

  return {
    isLeftDrawerOpen,
    setIsLeftDrawerOpen,
    leftOpenDrawerId,
    setLeftOpenDrawerId,
    leftDrawerContent,
    setLeftDrawerContent,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
    rightOpenDrawerId,
    setRightOpenDrawerId,
    rightDrawerContent,
    setRightDrawerContent,
  };
};
