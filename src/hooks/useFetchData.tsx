import { useState, useEffect } from "react";

interface ChangeLogEntry {
  version: string;
  content: string;
}

export const useFetchData = (rootPath: string, setDisclaimerIsOpen: (isOpen: boolean) => void) => {
  const [disclaimer, setDisclaimer] = useState("");
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
  const [roadmap, setRoadmap] = useState<string[]>([]);
  const [appVersion, setAppVersion] = useState("0.0.0");

  useEffect(() => {
    fetch(`.${rootPath}/changelog.json`)
      .then((response) => response.json())
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
  }, [rootPath, setDisclaimerIsOpen]);

  return { disclaimer, changeLog, roadmap, appVersion, setAppVersion };
};
