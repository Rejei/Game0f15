import { FC } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Table } from 'semantic-ui-react';
import { AppStateType } from '../../redux/redux-reducers';
import { Result } from '../../redux/timer-reducer';
import './TimerTable.module.scss';

type TableType = {
    result: Array<Result>
    grid: Array<string>
    direction: "ascending" | "descending" | undefined
    column: string | undefined
}

type RowsType = {
    result: Array<Result>
}

const TableRows: FC<RowsType> = ({ result }): JSX.Element => {
    return (
        <Table.Body>
            {result.map((el, index) => {
                const h = Math.floor(el.time[0] / 3600) >= 10 ? Math.floor(el.time[0] / 3600) : `0${Math.floor(el.time[0] / 3600)}`
                const min = Math.floor(el.time[0] % 3600 / 60) >= 10 ? Math.floor(el.time[0] % 3600 / 60) : `0${Math.floor(el.time[0] % 3600 / 60)}`
                const sec = Math.floor(el.time[0] % 3600 % 60) >= 10 ? Math.floor(el.time[0] % 3600 % 60) : `0${Math.floor(el.time[0] % 3600 % 60)}`
                return <Table.Row key={index}>
                    <Table.Cell>{el.grid}</Table.Cell><Table.Cell>{`${h}.${min}.${sec}`}</Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    )
}

const TimerTable: FC<TableType & { className: string }> = ({ result, grid, direction, column }): JSX.Element => {
    const dispatch = useDispatch()

    return <Table sortable celled fixed>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell
                    sorted={column === 'grid' ? direction : undefined}
                    onClick={() => dispatch({ type: 'CHANGE-SORT', payload: 'grid' })}
                >
                    Grid
                </Table.HeaderCell>
                <Table.HeaderCell
                    sorted={column === 'time' ? direction : undefined}
                    onClick={() => dispatch({ type: 'CHANGE-SORT', payload: 'time' })}
                >
                    Time
                    {direction === 'ascending' ? <i className="fas fa-sort-up" /> : direction === 'descending' ? <i className="fas fa-sort-down" /> : null}
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        {result.length > 0 ? <TableRows result={result} /> : null
        }
    </Table>
}

const mapStateToProps = (state: AppStateType) => ({
    grid: state.game15.presetArr,
    direction: state.timer.direction,
    column: state.timer.column
})

const TimerTableContainer = compose(
    connect(mapStateToProps)(TimerTable)
)

export default TimerTableContainer;