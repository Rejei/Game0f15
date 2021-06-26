import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-reducers';
import {setResultTime, setTimer } from '../../redux/timer-reducer';
import styles from './Timer.module.scss'

type TimerProps = {
    timer: {h: number, min: number, sec: number}
    startGame: boolean
    setTimer: (arg0: {h: number, min: number, sec: number}) => void
    success: boolean
    setResultTime: (arg0: Array<number>) => void
}

const Timer: FC<TimerProps> = ({timer, startGame, setTimer, success, setResultTime}): JSX.Element => {

    const {h, min, sec} = timer
    const [time, setTime] = useState(0) 
    
    useEffect(()=> {
        if(startGame){
        const gameTimer = setTimeout(() => {
            setTime(h*3600 + min*60+ sec +1)
        }, 1000)

       return () => { clearTimeout(gameTimer) }
    }
    },[success, startGame, h, min, sec])

    useEffect(() => {
        if(startGame){
            if(!success){
            setTimer({h: Math.floor(time / 3600),min: Math.floor(time % 3600 / 60),sec: Math.floor(time % 3600 % 60)})
            } else if(success && time !== 0){
            setResultTime([Math.floor(time / 3600),Math.floor(time % 3600 / 60),Math.floor(time % 3600 % 60)])
            setTime(0)
            setTimer({h:0, min: 0, sec:0})
            }
        }       
    },[time, startGame, h, min, sec, success, setResultTime, setTimer])

    return <div className={styles.timerWrap}>
        <div className={styles.time}>{h >= 10 ? `${h}` : `0${h}`}.{min >= 10 ? `${min}` : `0${min}`}.{sec >= 10 ? `${sec}` : `0${sec}`} </div>
        </div>
}

type MapStatePropsType = {
    timer: {h: number, min: number, sec: number}
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({

    timer: state.timer.timer
})

const TimerContainer = compose(
    connect(mapStateToProps, { setTimer, setResultTime})(Timer)
)

export default TimerContainer;