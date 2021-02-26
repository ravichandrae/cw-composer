import React, { useEffect, useState } from "react";

const tableCellStyle = {
  border: "1px solid black"
};

const inputStyle = {
  fontSize: "18px",
  textTransform: "uppercase",
  outline: 0,
  border: 0,
  padding: 0,
  margin: "-1px 0 0 -1px",
  width: "1.35em",
  height: "1.35em",
  textAlign: "center",
  background: "none"
};

const blockedTableCellStyle = {
  border: "1px solid black",
  backgroundColor: "grey"
};

const cellNumberStyle = {
  fontSize: "10px",
  float: "left"
};

export default function Cell(props) {
  const [text, setText] = useState(props.data[props.row][props.id].content);
  const [isBlocked, setIsBlocked] = useState(
    props.data[props.row][props.id].isBlocked
  );
  const [cellNumber, setCellNumber] = useState(
    props.data[props.row][props.id].cellNumber
  );

  useEffect(() => {
    setText(props.data[props.row][props.id].content);
    setIsBlocked(props.data[props.row][props.id].isBlocked);
    setCellNumber(props.data[props.row][props.id].cellNumber);
  }, [props.data, props.id, props.row]);

  const handleCellClick = ({ target }) => {
    if (props.mode === "fill") {
      return;
    }
    setIsBlocked(!isBlocked);
    props.stateChangeHandler({
      row: props.row,
      col: props.id,
      cell: { content: text, isBlocked: !isBlocked }
    });
  };

  const handleCellContentChange = ({ target }) => {
    if (props.mode === "mark") {
      return;
    }
    setText(target.value);
    props.stateChangeHandler({
      row: props.row,
      col: props.id,
      cell: { content: target.value, isBlocked: isBlocked }
    });
  };

  return (
    <td style={isBlocked ? blockedTableCellStyle : tableCellStyle}>
      <div style={cellNumberStyle}>{cellNumber}</div>
      <input
        style={inputStyle}
        type="text"
        value={text}
        onChange={handleCellContentChange}
        onClick={handleCellClick}
      />
    </td>
  );
}
