import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table } from 'semantic-ui-react';
import { AppStateType } from '../../redux/redux-reducers';

type TableType = {
    resultTime: Array<Array<number>>
    grid: Array<number>
    direction: "ascending" | "descending" | undefined
}

type RowsType = {
    length: number
    resultTime: Array<Array<number>>
    grid: Array<number>
}

const TimerTable: FC<TableType & {className: string}> = ({resultTime, grid, direction }): JSX.Element => {

const [lengthArr, setLengthArr] = useState(0)



useEffect(()=> {
    setLengthArr(resultTime.length > grid.length ? grid.length : resultTime.length)
},[grid.length, resultTime.length])

const handleclick = () => {
    console.log('tablerow')

}

    const TableRows: FC<RowsType> = ({ length,  resultTime, grid}): JSX.Element => {
    console.log(resultTime)

        return <Table.Row >
            {grid.map((el, index) => <Table.Cell key={index}>{el}</Table.Cell>)}
           {resultTime.map((el, index) => <Table.Cell key={index}>{`${el[0]}.${el[1]}.${el[2]}`}</Table.Cell>) }
        </Table.Row>
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
        <Table.Body>
            { resultTime.length > 0 ?  <TableRows resultTime={resultTime} length={lengthArr} grid={grid}/> : null
        }
        </Table.Body>
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