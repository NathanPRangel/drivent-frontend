import { useState } from "react"
import styled from "styled-components"

export default function DayButton(props) {
    return (
        <DayDiv $selected={props.selected===props.id} onClick={()=>props.func(props.id)}>
            {props.children}
        </DayDiv>
    )
}

const DayDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 131px;
    height: 37px;
    border-radius: 4px;
    background-color: ${props=>props.$selected?"#FFD37D":"#E0E0E0"};

    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 14px;
    font-weight: 400;
`