import styles from './Options.module.scss'
import { Field, Form } from 'react-final-form';
import { Dispatch, FC, SetStateAction } from 'react';

type OptionProps = {
  setPresetArr: (arg: Array<string>)=> void
  setCounter: Dispatch<SetStateAction<number | undefined>>
  setStart: (arg0: "Start" | "Disabled" | "Restart") => void
  setOptions: (arg1: boolean) => void
  randomizedGrid: (arg1: string) => Array<number>
  setGrid: (arg1: Array<number>) => void
  setIsDone: (arg1: boolean) => void
}

interface GridType {grid: string}

const Options: FC<OptionProps & {className: string}> = ({setPresetArr, setCounter, setStart, setOptions, randomizedGrid, setGrid, setIsDone}): JSX.Element => {

    const onSubmit = ({grid}: GridType) => {
      setOptions(false)
      if(grid)setStart('Start')
      setGrid(randomizedGrid(grid))
      setIsDone(false)
      setPresetArr([grid])
      setCounter(5)
    }

    return (
        <Form 
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
            return <form  className={styles.options} onSubmit={handleSubmit} >
                    <div>       
             <label>Choose the Grid</label>
             </div>
            <div>
            <label>
                <Field
                  name="grid"
                  component="input"
                  type="radio"
                  value="9"
                />{' '}
                3*3
              </label>
              <label>
                <Field
                  name="grid"
                  component="input"
                  type="radio"
                  value="16"
                />{' '}
                4*4
              </label>
              <label>
                <Field
                  name="grid"
                  component="input"
                  type="radio"
                  value="25"
                />{' '}
                5*5
              </label>
              <label>
                <Field
                  name="grid"
                  component="input"
                  type="radio"
                  value="36"
                />{' '}
                6*6
              </label>
          </div>
                <button type='submit'>Set Up</button>
            </form>
        }} 
        />
    )
}


export default Options