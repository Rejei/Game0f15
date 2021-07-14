import { resultSorted, sortBy } from "../Core/Core";

const SET_TIMER = 'SET-TIMER';
const CHANGE_SORT = 'CHANGE-SORT';
const SET_RESULT = 'SET-RESULT';

export type Result = {
    time: number, grid: string
}
type InitialState = {
    timer: { h: number, min: number, sec: number }
    column: string
    direction: "ascending" | "descending" | undefined
    result: Array<Result>
}

let initialState: InitialState = {
    timer: {
        h: 0,
        min: 0,
        sec: 0
    },
    column: '',
    direction: undefined,
    result: []
}

type ActionTypes = ReturnType<typeof setTimer> | ReturnType<typeof setResult> | ReturnType<typeof changeSort>

const timerReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case SET_TIMER:
            return {
                ...state,
                ...action.payload
            }
        case SET_RESULT:
            return {
                ...state,
                result: [...state.result, ...action.payload.result]
            }
        case CHANGE_SORT:
            if (state.column === action.payload) {
                return {
                    ...state,
                    result: state.result.slice().reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }
            return {
                ...state,
                column: action.payload,
                result: resultSorted(sortBy(state.result.map(el => el.time), 'ascending'), state.result),
                direction: 'ascending',
            }
        default:
            return state
    }
}

export const setTimer = (timer: { h: number, min: number, sec: number }) => (
    {
        type: SET_TIMER, payload: { timer }
    } as const)

export const setResult = (result: Array<Result>) => (
    {
        type: SET_RESULT, payload: { result }
    } as const)

export const changeSort = (column: string) => (
    { type: CHANGE_SORT, payload: column } as const
)

export default timerReducer