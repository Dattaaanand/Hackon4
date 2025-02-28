"use client";
import React, { useState, useRef } from "react";

interface Step {
  text: string;
  isHeading?: boolean; // Optional property
}

export default function Procedure() {
  const [selectedText, setSelectedText] = useState<string>("");
  const [simplifiedText, setSimplifiedText] = useState<string>("");
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());
  const [simplifiedTexts, setSimplifiedTexts] = useState<Record<number, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample steps for Ohm's Law Procedure
  const steps: Step[] = [
    { text: "Materials Required:", isHeading: true },
    { text: "A resistance wire" },
    { text: "A voltmeter and an ammeter of appropriate range" },
    { text: "A battery (battery eliminator)" },
    { text: "A rheostat" },
    { text: "A metre scale" },
    { text: "One way key" },
    { text: "Connecting wires" },
    { text: "A piece of sand paper" },
    { text: "Screw gauge" },
    { text: "Real Lab Procedure:", isHeading: true },
    { text: "First we'll draw the circuit diagram." },
    { text: "Arrange the apparatus in the same manner as given in the arrangement diagram." },
    { text: "Clean the ends of the connecting wires with sand paper to remove insulation, if any." },
    {
      text:
        "Make neat, clean and tight connections according to the circuit diagrams. While making connections ensure that +ve marked terminals of the voltmeter and ammeter are joined towards the +ve terminals of the battery.",
    },
    { text: "Determine the least count of voltmeter and ammeter, and also note the zero error, if any." },
    { text: "Insert the key K, slide the rheostat contact and see that the ammeter and voltmeter are working properly." },
    {
      text:
        "Adjust the sliding contact of the rheostat such that a small current passes through the resistance coil or the resistance wire.",
    },
    { text: "Note down the value of the potential difference V from the voltmeter and current I from the ammeter." },
    {
      text:
        "Shift the rheostat contact slightly so that both the ammeter and voltmeter show full divisions readings and not in fraction.",
    },
    { text: "Record the readings of the voltmeter and ammeter." },
    { text: "Take at least six sets of independent observations." },
    { text: "Record the observations in a tabular column" },
    {
      text:
        "Now, cut the resistance wire at the points where it leaves the terminals, stretch it and find its length by the meter scale.",
    },
    {
      text:
        "Then find out the diameter and hence the radius of the wire using the screw gauge and calculate the cross-sectional area A (πr²).",
    },
    { text: "Plot a graph between current (I) along X-axis and potential difference across the wire (V) along Y-axis." },
    { text: "The graph should be a straight line." },
    {
      text:
        "Determine the slope of the graph. The slope will give the value of resistance (R) of the material of the wire.",
    },
    { text: "Calculate the resistance per centimeter of the wire." },
    { text: "Now, calculate the resistivity of the material of the wire using the formula," },
    { text: "ρ = (πR) / l" },
    { text: "Simulator Procedure (as performed through the Online Labs)", isHeading: true },
    { text: "Select the metal from the drop down list." },
    { text: "Select the length of the wire from the slider." },
    { text: "Select the diameter of the wire using the slider." },
    { text: "Select the resistance of the rheostat using the slider." },
    {
      text:
        "To see the circuit diagram, click on the 'Show circuit diagram' check box seen inside the simulator window.",
    },
    {
      text:
        "Connections can be made as seen in the circuit diagram by clicking and dragging the mouse from one connecting terminal to the other connecting terminal of the devices to be connected.",
    },
    { text: "Drag the wire and place it on the voltmeter to have it connected." },
    { text: "Once all connections are made, click and drag the key to insert it into the switch." },
    {
      text:
        "Slowly move the rheostat contact to change the voltage and current in the voltmeter and ammeter accordingly.",
    },
    { text: "Calculate the resistivity of the materials based on the length of the wire selected." },
    { text: "Click on the 'Show result' check box to verify your result." },
    { text: "Click on the 'Reset' button to redo the experiment." },
    { text: "Observations:", isHeading: true },
    { text: "1. Length" },
    { text: "Length of the resistance wire l =......cm" },
    { text: "2. Range" },
    { text: "Range of the given ammeter = .......A." },
    { text: "Range of the given voltmeter = .......V." },
    { text: "3. Least count" },
    { text: "Least count of ammeter = .......A." },
    { text: "Least count of voltmeter = .......V." },
    { text: "4. Zero error" },
    { text: "Zero error in ammeter, e1 = .......A." },
    { text: "Zero error in voltmeter,e2 = ......V." },
    { text: "5. Zero correction" },
    { text: "Zero correction for ammeter, (-e1) = .......A." },
    { text: "Zero correction for voltmeter, (-e2) = ......V." },
  ];

  // Function to fetch simplified text from the backend
  const fetchSimplifiedText = async (text: string, index: number) => {
    const response = await fetch("http://localhost:5000/simplify-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const data = await response.json();
      const simplified = data.simplified_text || "Simplified text not found.";
      
      // Use index directly to set the simplified text
      setSimplifiedTexts((prev) => ({ ...prev, [index]: simplified }));
      setSimplifiedText(simplified);
    } else {
      setSimplifiedText("Error occurred while simplifying text.");
    }
  };

  // Function to handle text selection
  const handleTextSelection = (index: number) => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const text = selection.toString();
      setSelectedText(text);
      // Call fetchSimplifiedText with text and index
      fetchSimplifiedText(text, index);
    }
  };

  const handleTextClick = (index: number) => {
    setSelectedIndexes((prev) => {
      const newIndexes = new Set(prev);
      if (newIndexes.has(index)) {
        newIndexes.delete(index);
      } else {
        newIndexes.add(index);
      }
      return newIndexes;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6" ref={containerRef}>
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                     bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600 text-center mb-6">
        Ohm's Law Procedure
      </h1>
      
      {/* Instruction message */}
      <div className="bg-gray-700 p-4 text-center text-lg rounded-md mb-6">
        <p>Select text + click on it to simplify the text.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="mb-4">
            {step.isHeading ? (
              <h2 className="text-xl font-semibold text-transparent bg-clip-text 
                             bg-gradient-to-r from-blue-400 to-indigo-500 mt-4">
                {step.text}
              </h2>
            ) : (
              <span
                className="text-lg text-gray-300 cursor-text"
                onMouseUp={() => handleTextSelection(index)} // Pass index here
                onClick={() => handleTextClick(index)}
                style={{ display: "inline-block", marginBottom: "0.5rem" }}
              >
                {step.text}
              </span>
            )}
            {/* Show Simplified Text only if the index is selected */}
            {selectedIndexes.has(index) && (
              <div className="mt-2 p-2 bg-gray-800 bg-opacity-90 text-white rounded-lg">
                <p className="text-sm">{simplifiedTexts[index] || simplifiedText}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
