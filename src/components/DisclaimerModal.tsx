import Modal from "react-modal";
import { useCanvasContext } from "../context/CanvasContext";
import Disclaimer from "./Disclaimer";
import { useEffect, useState } from "react";

const environment = process.env.NODE_ENV;
const rootPath = environment === "development" ? "/circuitorio" : "";

interface ChangeLogEntry {
  version: string;
  content: string;
}

Modal.setAppElement("#root");

export const DisclaimerModal: React.FC = () => {
  const { disclaimerIsOpen, setDisclaimerIsOpen, appVersion, setAppVersion } = useCanvasContext();

  const [disclaimer, setDisclaimer] = useState("");
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const [roadmap, setRoadmap] = useState<string[]>([]);

  useEffect(() => {
    if (!disclaimer) {
      fetch(`.${rootPath}/changelog.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setDisclaimer(data.disclaimer);
          setChangeLog(data.changeLog);
          setRoadmap(data.roadmap);
          setAppVersion(data.changeLog[0].version);
          const lastSeenVersion = localStorage.getItem("appVersion");
          if (lastSeenVersion !== data.changeLog[0].version) {
            setDisclaimerIsOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching the data:", error);
        });
    }
  }, [setDisclaimerIsOpen, appVersion, setAppVersion, changeLog, disclaimer]);

  const closeModal = () => {
    localStorage.setItem("appVersion", appVersion);
    setDisclaimerIsOpen(false);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Modal
        isOpen={disclaimerIsOpen}
        className="panel disclaimer-modal"
        style={{ content: { margin: "50px", padding: "20px 20px 20px 20px", overflowY: "scroll", height: "90%", zIndex: 10000 }, overlay: { backgroundColor: "rgba(0,0,0,0.75)", zIndex: 9999 } }}
        onRequestClose={closeModal}
        contentLabel="Welcome"
      >
        <Disclaimer disclaimer={disclaimer} changeLog={changeLog} roadmap={roadmap} closeModal={closeModal} />
      </Modal>
    </div>
  );
};
