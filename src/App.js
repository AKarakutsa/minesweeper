import classes from './App.module.css';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {COVERED_MINE_CELL, MARKED_MINE_CELL, MINE_CELL, N_COLS, N_ROWS} from "./config/constants";
import {sweeperMapSliceActions} from "./store/mine-sweeper-field-slice";
import Cell from "./components/Cell";

function App() {
  const dispatch = useDispatch();
  const sweeperMapSlice = useSelector((state) => state.sweeperMapSlice);

  useEffect(() => {
      if (!sweeperMapSlice.gameStarted && !sweeperMapSlice.gameActive) {
          dispatch(sweeperMapSliceActions.startGame());
      }
  }, [dispatch, sweeperMapSlice])


  return (
      <React.Fragment>
        <div className={`${classes.cells}`} style={{width: `${15 * N_ROWS}px`}}>
          {sweeperMapSlice.fields.map((field, index) => (
              <Cell
                  key={index}
                  id={index}
                  field={field}
              />
          ))}
        </div>
          <p className={classes.result}>{`${sweeperMapSlice.result}`}</p>
      </React.Fragment>

  );
}

export default App;
