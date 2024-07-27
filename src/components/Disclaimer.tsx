import React from "react";

const Disclaimer: React.FC<{ disclaimer: string; changeLog: { version: string; content: string }[]; roadmap: string[]; closeModal: () => void }> = ({ disclaimer, changeLog, roadmap, closeModal }) => (
  <>
    <h2>Welcome to Circuitorio</h2>
    <div>
      <h3>Disclaimer</h3>
      <p>{disclaimer}</p>
      <div style={{ display: "flex", marginTop: "30px" }}>
        <div style={{ flex: "50%" }}>
          <h3>Change Log</h3>
          <ul>
            {changeLog.map((log, index) => (
              <li key={index}>
                <strong>{log.version}:</strong> {log.content}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: "50%" }}>
          <h3>Roadmap</h3>
          <ul>
            {roadmap.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <button className="button" onClick={closeModal}>
      Close
    </button>
  </>
);

export default Disclaimer;
