import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Table } from 'semantic-ui-react';
import { AppStateType } from '../../redux/redux-reducers';
import './TimerTable.module.scss';

type TableType = {
    resultTime: Array<Array<number>>
    grid: Array<string>
    direction: "ascending" | "descending" | undefined
    column: string | undefined
}

type RowsType = {
    length: number
    resultTime: Array<Array<number>>
    grid: Array<string>
}

const TableRows: FC<RowsType> = ({ length,  resultTime, grid}): JSX.Element => {
    let values = []
for(let i = 0; i < length; i++){
    values.push([grid[i],resultTime[i]])

}
        return (
            <Table.Body>
                {values.map((el, i) => <Table.Row key={i}>
                    <Table.Cell>{el[0]}</Table.Cell><Table.Cell>{`${el[1][0]}.${el[1][1]}.${el[1][2]}`}</Table.Cell>
                </Table.Row>)}
        </Table.Body>
           )
    }


const TimerTable: FC<TableType & {className: string}> = ({resultTime, grid, direction, column }): JSX.Element => {

    const dispatch = useDispatch()
const [lengthArr, setLengthArr] = useState(0)
useEffect(()=> {
    setLengthArr(resultTime.length > grid.length ? grid.length : resultTime.length)
},[grid.length, resultTime.length])


    return <Table sortable celled fixed>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell 
                sorted ={ column === 'grid' ? direction : undefined}
                onClick={() => dispatch({type: 'CHANGE-SORT', payload: 'grid'})}
                >
                    Grid
                    </Table.HeaderCell>
                <Table.HeaderCell
                sorted={ column === 'time' ? direction : undefined}
                onClick={() => dispatch({type: 'CHANGE-SORT', payload: 'time'})}
                >
                    Time
                    </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
            { resultTime.length > 0 ?  <TableRows resultTime={resultTime} length={lengthArr} grid={grid}/> : null
        }
    </Table>
}

const mapStateToProps = (state: AppStateType) => ({
    resultTime: state.timer.resultTime,
    grid: state.game15.presetArr,
    direction: state.timer.direction,
    column: state.timer.column
})

const TimerTableContainer = compose(
    connect(mapStateToProps)(TimerTable)
)

export default TimerTableContainer;