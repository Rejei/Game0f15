import { sortBy } from "../Core/Core";

const SET_TIMER = 'SET-TIMER';
const CHANGE_SORT = 'CHANGE-SORT';
const SET_RESULT_TIME = 'SET-RESULT-TIME';

type InitialState = {
    timer: {h: number, min: number, sec: number}
    column: string
    direction: "ascending" | "descending" | undefined
    resultTime: Array<Array<number>>
}

let initialState: InitialState = {
    timer: {
        h: 0,
        min: 0,
        sec: 0
    },
    column: '',
    direction: undefined,
    resultTime: []
}

type ActionTypes = ReturnType<typeof setTimer> | ReturnType<typeof setResultTime> | ReturnType<typeof changeSort>

const timerReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case SET_TIMER:
            return {
                ...state,
               ...action.payload

            }
        case SET_RESULT_TIME:
            return {
                ...state,
                resultTime: [...state.resultTime, ...[action.payload.resultTime]]
            }
        case CHANGE_SORT:
            if (state.column === action.payload.column) {
                return {
                    ...state,
                    resultTime: state.resultTime.slice().reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }

             return {
                 ...state,
                column: action.payload.column,
                resultTime: [sortBy(state.resultTime[setResultTime.length-1], action.payload.column)],
                direction: 'ascending',
            } 

        default:
            return state
    }
}

export const setTimer = (timer: {h: number, min: number, sec: number}) => (
    {
        type: SET_TIMER, payload: { timer }
    } as const )

    export const setResultTime = (resultTime: Array<number>) => (
        {
            type: SET_RESULT_TIME, payload: { resultTime }
        } as const )

export const changeSort = (column: string) => (
    { type: CHANGE_SORT, payload: { column } } as const
)

export default timerReducer