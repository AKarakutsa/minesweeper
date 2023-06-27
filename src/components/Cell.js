// Importing styles specific to the Cell component
import classes from "./Cell.module.css";
// Importing constants from configuration
import {
    COVER_FOR_CELL,
    COVERED_MINE_CELL,
    MARKED_MINE_CELL,
    MINE_CELL,
    MARK_FOR_CELL
} from "../config/constants";
// Importing Redux hooks
import {useDispatch, useSelector} from "react-redux";
// Importing actions from the slice
import {sweeperMapSliceActions} from "../store/mine-sweeper-field-slice";

// defineClassName is a helper function that determines the CSS class to be applied to a cell
// based on the game's state and the cell's value
const defineClassName = (gameStarted, field) => {
    // Checks are performed to determine whether the game has started and what the cell's value is,
    // with the appropriate CSS class being returned in each case
    if (gameStarted) {
        if (COVERED_MINE_CELL < field) {
            return classes.mark;
        } else if (COVER_FOR_CELL <= field && field <= COVERED_MINE_CELL) {
            return classes.cover;
        } else if (MINE_CELL === field) {
            return classes.mine;
        } else if (MINE_CELL > field) {
            return classes[`mines-around-${field}`];
        }
    } else {
        if (MINE_CELL === field) {
            return classes.mine;
        } else if (COVERED_MINE_CELL === field) {
            return classes.mine;
        } else if (MARKED_MINE_CELL === field) {
            return classes.mark;
        } else if (COVERED_MINE_CELL < field) {
            return classes.wrongMark;
        } else if (MINE_CELL < field) {
            return classes.cover;
        } else if (MINE_CELL > field) {
            return classes[`mines-around-${field}`];
        }
    }
    return "";
}

// Cell component represents an individual cell on the Minesweeper board
const Cell = (props) => {
    // Hook up to Redux to dispatch actions and select parts of the state
    const dispatch = useDispatch();
    const minesLeft = useSelector((state) => state.sweeperMapSlice.minesLeft);
    const gameStarted = useSelector((state) => state.sweeperMapSlice.gameStarted);
    const uncovered = useSelector((state) => state.sweeperMapSlice.uncovered);
    // Retrieve the id and field value from the passed props
    const { id, field } = props;
    // Determine the class of the cell based on whether the game has started and the cell's value
    let className = defineClassName(gameStarted, field);

    // cellClickHandler responds to click events on the cell
    const cellClickHandler = (event, id, field, minesLeft, uncovered,
                              mineCell, coveredMineCell, markForCell, markedMineCell, coverForCell, gameStarted) => {
        // Check if game has started and implement the logic based on the button clicked (left click, right click, or mouse wheel click) and the current cell's state
        if (gameStarted) {
            if (uncovered === 0) {
                dispatch(sweeperMapSliceActions.win(id));
            } else {
                if (event.button === 1) { //mousewheel clicked
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
                            dispatch(sweeperMapSliceActions.lose(id))
                        } else {
                            if (coverForCell === field) {
                                dispatch(sweeperMapSliceActions.findEmptyCells(id));
                            } else {
                                dispatch(sweeperMapSliceActions.openCell(id));
                            }
                        }
                    }
                }
            }
        } else {
            dispatch(sweeperMapSliceActions.deactivateCurrentGame());
        }
    };

    // Render the cell with the appropriate CSS classes, and attach the click event handler
    return (
        <div
            id={`cell-${id}`}
            className={`${classes.cell} ${className}`}
            onMouseUp={(event) => cellClickHandler(event, id, field, minesLeft, uncovered,
                MINE_CELL, COVERED_MINE_CELL, MARK_FOR_CELL, MARKED_MINE_CELL, COVER_FOR_CELL, gameStarted)}>
        </div>
    );
}

export default Cell;