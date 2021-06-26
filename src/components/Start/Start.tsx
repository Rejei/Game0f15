import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  readonly start: 'Disabled' | 'Start' | 'Restart'
  readonly disabled: boolean
  readonly onClick: MouseEventHandler<HTMLButtonElement>
}

const StyledButton = styled.button<ButtonProps>`
  color: white;
  display: flex;
  align-self:center;
  justify-content: center;
  background-color: ${props => props.start === 'Start' ? "red" : props.start === 'Restart' ? "green" : "grey"};
  height: 25%;
  min-width: 35%;
  border: blue 5px solid;
  padding-bottom: 3px;
`;

type StartProps = {
  setGrid:(arg0: Array<number>) => void
  start: 'Disabled' | 'Start' | 'Restart'
  preset: string | undefined
  setStart: (arg0: 'Disabled' | 'Start' | 'Restart') => void
  randomizedGrid: (arg0: string) => Array<number>
  setIsDone: (arg0: boolean) => void
  setPresetArr: (arg0: Array<string>) => void
}

const Start: FC<StartProps & {className?: string}>= ({setGrid, start, preset, setStart, randomizedGrid, setIsDone, setPresetArr}) => {

    const [disabled, setDisabled] = useState(false)



    useEffect(()=> {
      preset ? setDisabled(false) : setDisabled(true)
      
     
    }, [disabled, preset])

  const handleclick = () => {
    if(start === 'Start')setStart('Restart')
    if(start === 'Restart'){
      setStart('Start')
      setIsDone(false)
     if(preset){
       setGrid(randomizedGrid(preset))
       setPresetArr([preset])
      }
    }
  };


    return (
       <StyledButton disabled={disabled} onClick={handleclick} start={start}>
       {start} 
    </StyledButton>
  
    )}


export default Start;