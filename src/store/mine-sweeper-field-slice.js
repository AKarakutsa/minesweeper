// Import the createSlice function from Redux Toolkit
// This function generates action creators and action types that correspond to the reducers and state.
import { createSlice } from '@reduxjs/toolkit';
// Importing constants used within the game logic
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
// Define the initial state for the 'sweeperMapSlice' piece of state
// This is the state for the Minesweeper game board, including the game's current status and the layout of mines and markers on the board.
const sweeperMapSlice = createSlice({
    // Name of this slice of the Redux state
    name: 'sweeperMapSlice',
    // Initial state values
    initialState: {
        fields: [],           // The game board represented as an array
        minesLeft: 0,         // Number of mines yet to be found
        width: 0,             // Width of the game board
        height: 0,            // Height of the game board
        gameStarted: false,   // Flag indicating if the game has started
        gameActive: false,    // Flag indicating if the game is currently active
        result: ""            // String containing the result of the game
    },
    // Reducers are functions that determine changes to an application's state using Redux actions
    reducers: {
        // 'startGame' initializes the game and populates the game board
        startGame(state, action) {
            state.gameStarted = true; // Indicate that the game has started
            state.gameActive = true;  // Indicate that the game is currently active
            state.minesLeft = N_MINES; // Set the number of mines
            state.result = N_MINES + " Mines Left"; // Display the initial number of mines
            state.uncovered = N_ROWS * N_COLS - N_MINES; // Calculate the number of non-mined cells

            // Populate the game board with covered cells
            const allCells = N_ROWS * N_COLS;
            state.fields.length = allCells;
            for (let i = 0; i < state.fields.length; i++) {
                state.fields[i] = COVER_FOR_CELL;
            }

            // Randomly place the mines and calculate the number of neighboring mines for each cell
            // The remaining code in this function handles this
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
        // 'findEmptyCells' recursively uncovers empty cells starting from a given cell
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
        // 'openCell' uncovers a cell
        openCell(state, action) {
            state.fields[action.payload] -= COVER_FOR_CELL;
            state.uncovered--;
        },
        // 'flagAsMine' marks a cell as containing a mine
        flagAsMine(state, action) {
            state.fields[action.payload] += MARK_FOR_CELL;
            state.minesLeft--;
            state.result = state.minesLeft + " Mines Left";
        },
        // 'removeFlagAsMine' removes the mark indicating a cell as a mine
        removeFlagAsMine(state, action) {
            state.fields[action.payload] -= MARK_FOR_CELL;
            state.minesLeft++;
            state.result = state.minesLeft + " Mines Left";
        },
        // 'lose' handles the end of the game if the player loses
        lose(state, action) {
            state.fields[action.payload] -= COVER_FOR_CELL;
            if (state.gameActive && state.uncovered > 0) {
                state.result = "You loss";
            }
            state.gameStarted = false;
        },
        // 'win' handles the end of the game if the player wins
        win(state, action) {
            if (state.gameActive && state.uncovered === 0) {
                state.result = "You win";
            }
            state.gameStarted = false;
        },
        // 'deactivateCurrentGame' stops the current game without declaring a win or loss
        deactivateCurrentGame(state, action) {
            state.gameActive = false;
        }
    },
});

// Export the generated action creators so they can be used by Redux
export const sweeperMapSliceActions = sweeperMapSlice.actions;

// Export the slice to be added to the store
export default sweeperMapSlice;
