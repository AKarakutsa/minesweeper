import { createSlice } from '@reduxjs/toolkit';
import {
    COVER_FOR_CELL,
    COVERED_MINE_CELL,
    EMPTY_CELL,
    MARK_FOR_CELL,
    MINE_CELL,
    N_COLS,
    N_MINES,
    N_ROWS
} from "../config/constants";

const sweeperMapSlice = createSlice({
    name: 'sweeperMapSlice',
    initialState: {
        fields: [],
        minesLeft: 0,
        width: 0,
        height: 0,
        gameStarted: false,
        gameActive: false,
        result: ""
    },
    reducers: {
        startGame(state, action) {
            state.gameStarted = true;
            state.gameActive = true;
            state.minesLeft = N_MINES;
            state.result = N_MINES + " Mines Left";
            state.uncovered = N_ROWS * N_COLS - N_MINES;
            const allCells = N_ROWS * N_COLS;
            state.fields.length = allCells;
            for (let i = 0; i < state.fields.length; i++) {
                state.fields[i] = COVER_FOR_CELL;
            }

            let i = 0;
            let cell;
            while (i < N_MINES) {
                let position = Math.ceil(Math.random() * allCells);

                if ((position < allCells)
                    && (state.fields[position] !== COVERED_MINE_CELL)) {

                    let current_col = position % N_COLS;
                    state.fields[position] = COVERED_MINE_CELL;
                    i++;

                    if (current_col > 0) {
                        cell = position - 1 - N_COLS;
                        if (cell >= 0) {
                            if (state.fields[cell] !== COVERED_MINE_CELL) {
                                state.fields[cell] += 1;
                            }
                        }
                        cell = position - 1;
                        if (cell >= 0) {
                            if (state.fields[cell] !== COVERED_MINE_CELL) {
                                state.fields[cell] += 1;
                            }
                        }

                        cell = position + N_COLS - 1;
                        if (cell < allCells) {
                            if (state.fields[cell] !== COVERED_MINE_CELL) {
                                state.fields[cell] += 1;
                            }
                        }
                    }

                    cell = position - N_COLS;
                    if (cell >= 0) {
                        if (state.fields[cell] !== COVERED_MINE_CELL) {
                            state.fields[cell] += 1;
                        }
                    }

                    cell = position + N_COLS;
                    if (cell < allCells) {
                        if (state.fields[cell] !== COVERED_MINE_CELL) {
                            state.fields[cell] += 1;
                        }
                    }

                    if (current_col < (N_COLS - 1)) {
                        cell = position - N_COLS + 1;
                        if (cell >= 0) {
                            if (state.fields[cell] !== COVERED_MINE_CELL) {
                                state.fields[cell] += 1;
                            }
                        }
                        cell = position + N_COLS + 1;
                        if (cell < allCells) {
                            if (state.fields[cell] !== COVERED_MINE_CELL) {
                                state.fields[cell] += 1;
                            }
                        }
                        cell = position + 1;
                        if (cell < allCells) {
                            if (state.fields[cell] !== COVERED_MINE_CELL) {
                                state.fields[cell] += 1;
                            }
                        }
                    }
                }
            }
        },
        findEmptyCells(state, action) {
            state.fields[action.payload] -= COVER_FOR_CELL;
            state.uncovered--;
            const findEmptyCells = (state, cellPosition) => {
                let allCells = N_ROWS * N_COLS;
                let current_col = cellPosition % N_COLS;
                let cell;

                if (current_col > 0) {
                    cell = cellPosition - N_COLS - 1;
                    if (cell >= 0) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            state.uncovered--;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }

                    cell = cellPosition - 1;
                    if (cell >= 0) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            state.uncovered--;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }

                    cell = cellPosition + N_COLS - 1;
                    if (cell < allCells) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            state.uncovered--;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }
                }

                cell = cellPosition - N_COLS;
                if (cell >= 0) {
                    if (state.fields[cell] > MINE_CELL) {
                        state.fields[cell] -= COVER_FOR_CELL;
                        state.uncovered--;
                        if (state.fields[cell] === EMPTY_CELL) {
                            findEmptyCells(state, cell);
                        }
                    }
                }

                cell = cellPosition + N_COLS;
                if (cell < allCells) {
                    if (state.fields[cell] > MINE_CELL) {
                        state.fields[cell] -= COVER_FOR_CELL;
                        state.uncovered--;
                        if (state.fields[cell] === EMPTY_CELL) {
                            findEmptyCells(state, cell);
                        }
                    }
                }

                if (current_col < (N_COLS - 1)) {
                    cell = cellPosition - N_COLS + 1;
                    if (cell >= 0) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            state.uncovered--;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }

                    cell = cellPosition + N_COLS + 1;
                    if (cell < allCells) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            state.uncovered--;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }

                    cell = cellPosition + 1;
                    if (cell < allCells) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            state.uncovered--;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }
                }
            };
            findEmptyCells(state, action.payload);
        },
        openCell(state, action) {
            state.fields[action.payload] -= COVER_FOR_CELL;
            state.uncovered--;
        },
        flagAsMine(state, action) {
            state.fields[action.payload] += MARK_FOR_CELL;
            state.minesLeft--;
            state.result = state.minesLeft + " Mines Left";
        },
        removeFlagAsMine(state, action) {
            state.fields[action.payload] -= MARK_FOR_CELL;
            state.minesLeft++;
            state.result = state.minesLeft + " Mines Left";
        },
        lose(state, action) {
            state.fields[action.payload] -= COVER_FOR_CELL;
            if (state.gameActive && state.uncovered > 0) {
                state.result = "You loss";
            }
            state.gameStarted = false;
        },
        win(state, action) {
            if (state.gameActive && state.uncovered === 0) {
                state.result = "You win";
            }
            state.gameStarted = false;
        },
        deactivateCurrentGame(state, action) {
            state.gameActive = false;
        }
    },
});

export const sweeperMapSliceActions = sweeperMapSlice.actions;

export default sweeperMapSlice;
