import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table } from 'semantic-ui-react';
import { AppStateType } from '../../redux/redux-reducers';
import './TimerTable.module.scss';

type TableType = {
    resultTime: Array<Array<number>>
    grid: Array<string>
    direction: "ascending" | "descending" | undefined
}

type RowsType = {
    length: number
    resultTime: Array<Array<number>>
    grid: Array<string>
}

const TableRows: FC<RowsType> = ({ length,  resultTime, grid}): JSX.Element => {
    let values = []
for(let i = 0; i < grid.length; i++){
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


const TimerTable: FC<TableType & {className: string}> = ({resultTime, grid, direction }): JSX.Element => {

const [lengthArr, setLengthArr] = useState(0)
useEffect(()=> {
    setLengthArr(resultTime.length > grid.length ? grid.length : resultTime.length)
},[grid.length, resultTime.length])

const handleclick = () => {
    console.log('tablerow')

}
    return <Table sortable celled fixed>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell 
                sorted={ direction }
                onClick={handleclick}
                >
                    Grid
                    </Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
            { resultTime.length > 0 ?  <TableRows resultTime={resultTime} length={lengthArr} grid={grid}/> : null
        }
    </Table>
}

const mapStateToProps = (state: AppStateType) => ({
    resultTime: state.timer.resultTime,
    grid: state.game15.presetArr,
    direction: state.timer.direction
})

const TimerTableContainer = compose(
    connect(mapStateToProps)(TimerTable)
)

export default TimerTableContainer;