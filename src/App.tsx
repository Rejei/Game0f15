import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styles from './App.module.scss';
import { setGrid, setMovement, setStart, setPresetArr, setStartGame, setIsDone, SetMovementType } from './redux/app-reducer';
import store from './redux/redux-reducers';
import Start from './components/Start/Start';
import Options from './components/Options/Options';
import Cell from './components/Cell/Cell';
import { isDone, MoveAside, possibleMove, randomizedGrid } from './Core/Core';
import TimerTableContainer from './components/TimerTable/TimerTable';
import Timer from './components/Timer/Timer';
import { AppStateType } from './redux/redux-reducers';
import { Result } from './redux/timer-reducer';

type Props = {
  arr: Array<number>
  movement: SetMovementType
  start: 'Disabled' | 'Start' | 'Restart'
  presetArr: Array<string>
  setGrid: (arg0: Array<number>) => void
  setStart: (arg0: 'Disabled' | 'Start' | 'Restart') => void
  setPresetArr: (arg0: Array<string>) => void
  setMovement: (arg0: SetMovementType) => void
  startGame: boolean
  setStartGame: (arg0: boolean) => void
  setIsDone: (arg0: boolean) => void
  success: boolean
  result: Array<Result>
}

const App: FC<Props> = ({
  arr, movement, start, presetArr, setGrid, setStart,
  setPresetArr, setMovement, startGame, setStartGame,
  setIsDone, success, result
}): JSX.Element => {

  const [options, setOptions] = useState(true)
  const [preset, setPreset] = useState<string | undefined>()
  const [showGrid, setShowGrid] = useState(false)
  const [showTimerDown, setShowTimerDown] = useState(false)
  const [counter, setCounter] = useState<number | undefined>();

  useEffect(() => {
    if (presetArr.length !== 0) setPreset(`${presetArr[presetArr.length - 1]}`)
    if (arr.length === 0 && preset) setGrid(randomizedGrid(preset))
    if (arr.length !== 0) {
      const goodGame = isDone(arr)
      if (goodGame) {
        setIsDone(true)

      } else possibleMove(arr, setMovement)
    }
    if (success) setCounter(5)
  }, [arr, setMovement, preset, presetArr, success, setGrid, setIsDone])

  useEffect(() => {

    if (start === 'Restart') {
      setShowGrid(false)
      setShowTimerDown(true)
    } else if (start === 'Start') {
      setShowGrid(false)
      setCounter(5)

    }
  }, [showGrid, start])

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {

    if (start === 'Restart') {
      if (movement.v.includes(Number(e.currentTarget.innerHTML))) {
        setGrid(MoveAside(arr, Number(e.currentTarget.innerHTML), movement.v))
      } else if (movement.h.includes(Number(e.currentTarget.innerHTML))) {
        setGrid(MoveAside(arr, Number(e.currentTarget.innerHTML), movement.h))
      }
    }
  }


  useEffect(() => {
    if (showGrid) {
      setShowTimerDown(false)
    }
    if (showTimerDown) {
      if (counter !== undefined) counter > 0 ? setTimeout(() => setCounter(counter - 1), 1000) : setShowGrid(true);
    }
    if (counter === 0) setStartGame(true)

  }, [counter, showTimerDown, setStartGame, showGrid]);


  return (
    <div className={styles.app} >
      <div>
        <header className={styles.header} >
          <div>Game of 15</div>
        </header>
        <div className={styles.wrapper} >
          {success ? <div className={styles.success}>SUCCESS</div> : null}
          {counter === 0 ? <Timer startGame={startGame} success={success} /> : null}
          {start !== 'Disabled' ? <div className={styles.game}> {showGrid ?
            arr.map((cell, index) => <Cell onClick={handleClick} key={index} preset={preset}>{cell}</Cell>)
            : <div className={styles.counter}>{counter}</div>
          }</div> : null}
          <Start setPresetArr={setPresetArr} setGrid={setGrid} start={start} preset={preset} setStart={setStart} randomizedGrid={randomizedGrid} setIsDone={setIsDone} />
          <div className={styles.optionsWrap}>
            <button onClick={() => options ? setOptions(false) : setOptions(true)}><p>Options</p></button>
            {options ? <Options setCounter={setCounter} setOptions={setOptions} className={styles.options}
              setGrid={setGrid} randomizedGrid={randomizedGrid} setStart={setStart} setPresetArr={setPresetArr}
              setIsDone={setIsDone} />
              : null}
          </div>
        </div>
      </div>
      <TimerTableContainer className={styles.timerTable} result={result} />
    </div>
  );
}

type MapStatePropsType = {
  arr: Array<number>,
  movement: SetMovementType,
  start: string,
  presetArr: Array<string>,
  startGame: boolean,
  success: boolean,
  result: Array<Result>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  arr: state.game15.arr,
  movement: state.game15.movement,
  start: state.game15.start,
  presetArr: state.game15.presetArr,
  startGame: state.game15.startGame,
  success: state.game15.success,
  result: state.timer.result
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps,
    {
      setGrid,
      setMovement,
      setStart,
      setPresetArr,
      setStartGame,
      setIsDone
    }))(App)

const GameOf15App = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default GameOf15App;
