import React, { useState, useEffect, ReactNode } from "react";
import styled from "styled-components";

interface DrawerProps {
  isOpen3: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DrawerContainer = styled.div<{ isOpen3: boolean }>`
  position: fixed;
  top: 0;
  ${(props) => "right: 0;"}
  height: 100%;
  width: 300px;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transform: ${(props) => (props.isOpen3 ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

// const Overlay = styled.div<{ isOpen3: boolean }>`
//   display: ${(props) => (props.isOpen3 ? "block" : "none")};
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

const RightDrawer: React.FC<DrawerProps> = ({ isOpen3, onClose, children }) => {
  const [visible, setVisible] = useState(isOpen3);

  useEffect(() => {
    if (isOpen3) {
      setVisible(true);
    }
  }, [isOpen3]);

  const handleTransitionEnd = () => {
    if (!isOpen3) {
      setVisible(false);
    }
  };

  //   const handleOverlayClick = () => {
  //     onClose();
  //   };

  return (
    <>
      {/* <Overlay isOpen3={isOpen3} onClick={handleOverlayClick} /> */}
      {visible && (
        <DrawerContainer className="panel" isOpen3={isOpen3} onTransitionEnd={handleTransitionEnd}>
          <CloseButton onClick={onClose}>X</CloseButton>
          {children}
        </DrawerContainer>
      )}
    </>
  );
};

export default RightDrawer;
