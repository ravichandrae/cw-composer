import React, { useState } from 'react';

const tableCellStyle = {
    border: "1px solid black"
};

const inputStyle = {
    fontSize: "24px",
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
    const [content, setContent] = useState(props.data[props.row][props.id].content);
    const [isBlocked, setIsBlocked] = useState(props.data[props.row][props.id].isBlocked);

    const handleCellClick = ({ target }) => {
       if(props.mode === "fill") {
           return;
       }
       setIsBlocked(!isBlocked);
       props.stateChangeHandler({row: props.row, col: props.id, cell: {content: content, isBlocked: !isBlocked}});
    };

    const handleCellContentChange = ({ target }) => {
        if(props.mode === "mark") {
            return;
        }
        setContent(target.value);
        props.stateChangeHandler({row: props.row, col: props.id, cell: {content: content, isBlocked: isBlocked}});
    };

   
    return (
            <td style={isBlocked? blockedTableCellStyle : tableCellStyle}  onClick={handleCellClick} >
                <div style={cellNumberStyle}> {props.data[props.row][props.id].cellNumber} </div>
                <input style={inputStyle} 
                        inputype="text" 
                        value={content} 
                        onBlur={handleCellContentChange} 
                        onChange={handleCellContentChange}
                       />
            </td>      
     );
   
}