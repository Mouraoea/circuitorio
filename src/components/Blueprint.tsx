import React, { useState } from "react";
import { compressBlueprint, decompressBlueprint } from "../utils/blueprintCompression";

const BlueprintOverlay = () => {
  const [inputString, setInputString] = useState("");
  const [outputString, setOutputString] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputString(e.target.value);
  };

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const processInput = () => {
    if (isJsonString(inputString)) {
      const compressed = compressBlueprint(JSON.parse(inputString));
      if (compressed) {
        setOutputString(compressed);
      } else {
        setOutputString("Compression failed. Please check the input.");
      }
    } else {
      const decompressed = decompressBlueprint(inputString);
      if (decompressed) {
        setOutputString(JSON.stringify(decompressed, null, 2));
      } else {
        setOutputString("Decompression failed. Please check the input.");
      }
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(outputString);
  };

  return (
    <div className="blueprint-overlay">
      <h2>Blueprint Decoder/Encoder</h2>
      <div>
        <textarea
          value={inputString}
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.focus();
          }}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={handleInputChange}
          placeholder="Paste compressed or decompressed blueprint string here"
        ></textarea>
        <button className="button" onClick={processInput}>
          Process
        </button>
      </div>
      <div>
        <textarea value={outputString} readOnly placeholder="Processed blueprint will appear here"></textarea>
        <button className="button" onClick={copyContent}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default BlueprintOverlay;
