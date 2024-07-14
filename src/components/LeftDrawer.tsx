import React, { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DrawerContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  ${(props) => "left: 0;"}
  height: 100%;
  width: 300px;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

// const Overlay = styled.div<{ isOpen: boolean }>`
//   display: ${(props) => (props.isOpen ? "block" : "none")};
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 999;
// `;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const LeftDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setVisible(false);
    }
  };

  //   const handleOverlayClick = () => {
  //     onClose();
  //   };

  return (
    <>
      {/* <Overlay isOpen={isOpen} onClick={handleOverlayClick} /> */}
      {visible && (
        <DrawerContainer className="panel" isOpen={isOpen} onTransitionEnd={handleTransitionEnd}>
          <CloseButton onClick={onClose}>X</CloseButton>
          {children}
        </DrawerContainer>
      )}
    </>
  );
};

export default LeftDrawer;
