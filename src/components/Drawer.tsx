import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side: "left" | "right";
}

const DrawerContainer = styled.div<{ isOpen: boolean; side: "left" | "right" }>`
  position: fixed;
  top: 0;
  ${(props) => (props.side === "left" ? "left: 0;" : "right: 0;")}
  height: 100%;
  width: 300px;
  background-color: white;
  box-shadow: ${(props) => (props.side === "left" ? "2px 0 5px rgba(0, 0, 0, 0.3)" : "-2px 0 5px rgba(0, 0, 0, 0.3)")};
  transform: ${(props) => (props.isOpen ? "translateX(0)" : props.side === "left" ? "translateX(-100%)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, side }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    }
  }, [isOpen, side]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setVisible(false);
    }
  };

  return (
    <>
      {visible && (
        <DrawerContainer className="panel" side={side} isOpen={isOpen} onTransitionEnd={handleTransitionEnd}>
          <CloseButton onClick={onClose}>X</CloseButton>
          {children}
        </DrawerContainer>
      )}
    </>
  );
};

export default Drawer;
