"use client";

import React, { useState, useEffect, useRef } from "react";
import SimplifyText from "../../Simplify_Text/page";



interface Step {
  text: string;
  isHeading?: boolean;
}

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
  { text: "Select the metal form the drop down list." },
  { text: "Select the length of the wire from the slider." },
  { text: "Select the diameter of the wire using the slider." },
  { text: "Select the resistance of the rheostat using the slider." },
  {
    text:
      "To see the circuit diagram, click on the 'Show circuit diagram' check box seen inside the simulator window.",
  },
  {
    text:
      "Connections can be made as seen in the circuit diagram by clicking and dragging the mouse form one connecting terminal to the other connecting terminal of the devices to be connected.",
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

export default function Procedure() {
  const [selectedText, setSelectedText] = useState<string>("");
  const [simplifiedText, setSimplifiedText] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Function to handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const text = selection.toString();
      setSelectedText(text);
      fetchSimplifiedText(text);
    }
  };

  // Function to fetch simplified text from backend
  const fetchSimplifiedText = async (text: string) => {
    const response = await fetch("http://localhost:5000/simplify-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const data = await response.json();
      setSimplifiedText(data.simplified_text || "Simplified text not found.");
    } else {
      setSimplifiedText("Error occurred while simplifying text.");
    }
  };

  const handleMouseEnter = (index: number, event: React.MouseEvent) => {
    setIsHovering(true);
    setHoveredIndex(index);
    setHoverPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Ohm's Law Procedure</h1>
      <div className="max-w-3xl mx-auto" ref={containerRef}>
        {steps.map((step, index) => (
          <div
            key={index}
            className="mb-2 relative"
            onMouseUp={handleTextSelection}
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseLeave={handleMouseLeave}
          >
            {step.isHeading ? (
              <h2 className="text-xl font-semibold mt-4">{step.text}</h2>
            ) : (
              <p className="text-lg">{step.text}</p>
            )}
          </div>
        ))}
        {/* Use the imported SimplifyText component */}
        <SimplifyText
          selectedText={selectedText}
          simplifiedText={simplifiedText}
          hoverPosition={hoverPosition}
          isHovering={isHovering}
        />
      </div>
    </div>
  );
}
