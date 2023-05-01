import classes from "./Cell.module.css";
import {
    COVER_FOR_CELL,
    COVERED_MINE_CELL,
    MARKED_MINE_CELL,
    MINE_CELL,
    MARK_FOR_CELL
} from "../config/constants";
import {useDispatch, useSelector} from "react-redux";
import {sweeperMapSliceActions} from "../store/mine-sweeper-field-slice";

const Cell = (props) => {
    const dispatch = useDispatch();
    const minesLeft = useSelector((state) => state.sweeperMapSlice.minesLeft);
    const gameStarted = useSelector((state) => state.sweeperMapSlice.gameStarted);
    const { id, field } = props;
    let className;
    if (gameStarted) {
        if (COVERED_MINE_CELL < field) {
            className = classes.mark;
        } else if (COVER_FOR_CELL <= field && field <= COVERED_MINE_CELL) {
            className = classes.cover;
        } else if (MINE_CELL === field) {
            className = classes.mine;
        } else if (MINE_CELL > field) {
            className = classes[`mines-around-${field}`];
        }
    } else {
        if (MINE_CELL === field) {
            className = classes.mine;
        } else if (COVERED_MINE_CELL === field) {
            className = classes.mine;
        } else if (MARKED_MINE_CELL === field) {
            className = classes.mark;
        } else if (COVERED_MINE_CELL < field) {
            className = classes.wrongMark;
        } else if (MINE_CELL < field) {
            className = classes.cover;
        } else if (MINE_CELL > field) {
            className = classes[`mines-around-${field}`];
        }
    }


    const cellClickHandler = (event, id, field, minesLeft,
                              mineCell, coveredMineCell, markForCell, markedMineCell, coverForCell, gameStarted) => {
        if (gameStarted) {
            if (event.button === 1) {
                if (mineCell < field) {
                    if (coveredMineCell >= field) {
                        if (minesLeft > 0) {
                            dispatch(sweeperMapSliceActions.flagAsMine(id));
                        }
                    } else {
                        dispatch(sweeperMapSliceActions.removeFlagAsMine(id));
                    }
                }
            } else if (event.button === 0) {
                if (coveredMineCell < field) {
                    return;
                }
                if (mineCell < field && field < markedMineCell) {
                    if (coveredMineCell === field) {
                        dispatch(sweeperMapSliceActions.finishGame(id))
                    } else {
                        if (coverForCell === field) {
                            dispatch(sweeperMapSliceActions.findEmptyCells(id));
                        } else {
                            dispatch(sweeperMapSliceActions.openCell(id));
                        }
                    }
                }
            }
        } else {
            dispatch(sweeperMapSliceActions.startGame());
        }
    };

    return (
        <div
            id={`cell-${id}`}
            className={`${classes.cell} ${className}`}
            onMouseUp={(event) => cellClickHandler(event, id, field, minesLeft,
                MINE_CELL, COVERED_MINE_CELL, MARK_FOR_CELL, MARKED_MINE_CELL, COVER_FOR_CELL, gameStarted)}>
            {/*{`${cellContent}`}*/}
        </div>
    );
}

export default Cell;