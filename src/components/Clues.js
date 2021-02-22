import React, { useState } from 'react';

export default function Clues(props) {
    const [acrossClues, setAcrossClues] = useState(getAcrossClues());
    const [downClues, setDownClues] = useState(getDownClues());

    function getAcrossClues() {
        let aClues = [];
        for(var i = 0; i < props.gridSize; i++) {
            for(var j = 0; j < props.gridSize; j++) {
                if(props.data[i][j].across) {
                    aClues.push({cellNumber: props.data[i][j].cellNumber, clue: props.data[i][j].across});
                }
            }
        }
        return aClues;
    }

    function getDownClues() {
        let dClues = [];
        for(var i = 0; i < props.gridSize; i++) {
            for(var j = 0; j < props.gridSize; j++) {
                if(props.data[i][j].down) {
                    dClues.push({cellNumber: props.data[i][j].cellNumber, clue: props.data[i][j].down});
                }
            }
        }
        return dClues;
    }

    return (
        
    );
}