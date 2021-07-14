import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface CellProps {
  readonly size: string
}
const StyledCell = styled.button<CellProps>`
display: flex;
height: ${props => props.size ? props.size : null};
width: ${props => props.size ? props.size : null};
color:cadetblue;
border: 2px solid rgb(95, 6, 6);
border-radius: 15%;
align-items: center;
justify-content: center;
font-size: 4rem;
user-select: none;
&:hover {
  background-color: rgb(215, 215, 226);
  color: red;
  font-weight: bold;
  text-shadow: black 0 0 2rem;
  border: 2.5px solid rgb(179, 35, 35);
}
`;

const StyledEmpty = styled.div<CellProps>`
display: flex;
height: ${props => props.size ? props.size : null};
width: ${props => props.size ? props.size : null};
`;

type Type = {children: ReactNode
   onClick: MouseEventHandler<HTMLButtonElement>
   preset: string | undefined
  }
const Cell = ({ children, onClick, preset }: Type) => {
  const [size, setSize] = useState('')
  useEffect(() => {
    const newSize = `${100/Math.sqrt(Number(preset))}%`
    setSize(newSize)
  },[preset])

    return (
      children !== 0 ? <StyledCell size={size} onClick={onClick}>
        {children}
      </StyledCell> : <StyledEmpty size={size}/>)
  }

  export default Cell;
