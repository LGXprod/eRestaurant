import React, { useRef } from "react";

function SectionTable(props) {
  const sectionRef = useRef(null);

  return (
    <div
      key={props.item.key}
      id={`${props.item.key}`}
      ref={sectionRef}
      style={{
        width: "12.5px",
        height: "12.5px",
        border: "2.5px solid rgba(193, 66, 66, 0.5)",
        left: `${props.item.x}px`,
        top: `${props.item.y}px`,
        backgroundColor: "rgba(63, 191, 127, 0.48)",
        display: "inline-block",
        position: "absolute",
      }}
      onClick={() =>
        props.onSectionClick(
          props.item.key,
          props.selectedSections,
          props.setSelectedSections,
          sectionRef
        )
      }
    ></div>
  );
}

export default SectionTable;
