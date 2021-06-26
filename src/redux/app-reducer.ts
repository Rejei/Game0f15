const SET_GRID = 'SET-GRID';
const SET_MOVEMENT = 'SET-MOVEMENT';
const SET_START = 'SET_START';
const SET_PRESET_ARR = 'SET-PRESET-ARR';
const SET_START_GAME = 'SET-START-GAME';
const SET_SUCCESS = 'SET-SUCCESS';

export type SetMovementType = {
    h: Array<number>
    v: Array<number>
}
type InitialState = {
    arr: Array<number>
    movement: SetMovementType
    start: 'Disabled' | 'Start' | 'Restart'
    presetArr: Array<number>
    startGame: boolean
    success: boolean
}
 let initialState: InitialState = {
     arr: [],
     movement: {
         h: [],
         v: []
     },
     start: 'Disabled',
     presetArr: [],
     startGame: false,
     success: false
    }


type ActionTypes = ReturnType<typeof setGrid> | ReturnType<typeof setMovement> | ReturnType<typeof setStart> | ReturnType<typeof setPresetArr> | ReturnType<typeof setStartGame> | ReturnType<typeof setIsDone>

    const appReducer = (state = initialState, action: ActionTypes): InitialState => {
        switch(action.type){
            case SET_GRID:
                return {
                    ...state,
                    ...action.payload
                }
            case SET_MOVEMENT:
                return {
                    ...state,
                    ...action.payload
                }
            case SET_START:
                return {
                    ...state,
                    ...action.payload
                }
            case SET_PRESET_ARR:
                return {
                    ...state,
                    presetArr: [...state.presetArr, ...action.payload.presetArr]
                }
            case SET_START_GAME:
                return {
                    ...state,
                    ...action.payload
                }
            case SET_SUCCESS:
                return {
                    ...state,
                    ...action.payload
                }
            default:
                return state
        }
    }

    export const setGrid = (arr: Array<number>) => (
        {type: SET_GRID, payload: {arr}} as const
        )

    export const setMovement = (movement: SetMovementType)=> (
        {type: SET_MOVEMENT, payload: {movement}
    } as const)

    export const setStart = (start: 'Disabled' | 'Start' | 'Restart') => (
        {type: SET_START, payload: {start}
    } as const)


    export const setStartGame = (startGame: boolean) => (
        {type: SET_START_GAME, payload: {startGame}} as const
    )

    export const setPresetArr = (presetArr: Array<number>) => (
        {type: SET_PRESET_ARR, payload: {presetArr}
    } as const)


    export const setIsDone = (success: boolean) => (
        {type: SET_SUCCESS, payload: {success}
    } as const)
    export default appReducer