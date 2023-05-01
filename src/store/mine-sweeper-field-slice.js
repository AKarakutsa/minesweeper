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
            state.minesLeft = N_MINES;
            state.width = N_ROWS;
            state.height = N_COLS;
            state.gameStarted = true;
            state.gameActive = true;
            state.result = N_MINES + " Mines Left";

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
            const findEmptyCells = (state, cellPosition) => {
                let allCells = N_ROWS * N_COLS;
                let current_col = cellPosition % N_COLS;
                let cell;

                if (current_col > 0) {
                    cell = cellPosition - N_COLS - 1;
                    if (cell >= 0) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }

                    cell = cellPosition - 1;
                    if (cell >= 0) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }

                    cell = cellPosition + N_COLS - 1;
                    if (cell < allCells) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
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
                        if (state.fields[cell] === EMPTY_CELL) {
                            findEmptyCells(state, cell);
                        }
                    }
                }

                cell = cellPosition + N_COLS;
                if (cell < allCells) {
                    if (state.fields[cell] > MINE_CELL) {
                        state.fields[cell] -= COVER_FOR_CELL;
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
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }

                    cell = cellPosition + N_COLS + 1;
                    if (cell < allCells) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }

                    cell = cellPosition + 1;
                    if (cell < allCells) {
                        if (state.fields[cell] > MINE_CELL) {
                            state.fields[cell] -= COVER_FOR_CELL;
                            if (state.fields[cell] === EMPTY_CELL) {
                                findEmptyCells(state, cell);
                            }
                        }
                    }
                }
            };
            state.fields[action.payload] -= COVER_FOR_CELL;
            findEmptyCells(state, action.payload);
        },
        openCell(state, action) {
            state.fields[action.payload] -= COVER_FOR_CELL;
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
        finishGame(state, action) {
            state.fields[action.payload] -= COVER_FOR_CELL;
            state.minesLeft--;
            if (state.gameActive && state.minesLeft > 0) {
                state.result = "You loss";
            }
            if (state.gameActive && state.minesLeft === 0) {
                state.result = "You win";
            }
            state.gameStarted = false;
        }
    },
});

export const sweeperMapSliceActions = sweeperMapSlice.actions;

export default sweeperMapSlice;