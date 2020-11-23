import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unsetError } from "../actions";
import Quote from "./Quote";
import Button from "@material-ui/core/Button";
import NewList from "./NewList";

export default function Dashboard(props) {
  const [input, setInput] = useState("");
  const [symbol, setSymbol] = useState("AAPL");
  const newError = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSymbol(input);
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value.toUpperCase());
    dispatch(unsetError());
  };

  return (
    <div>
      <section id='dashboard'></section>

      <div className='dashboard'>
        <div className='dashboard-search'>
          <form className='stock-search' onSubmit={handleSubmit}>
            <label>Search for a ticker symbol:</label>

            <div>
              <input value={input} onChange={handleInput}></input>
              {newError.error && (
                <div
                  style={{ color: "red", fontSize: ".8rem", paddingTop: "5px" }}
                >
                  {newError.message}
                </div>
              )}
            </div>
            <div>
              <Button
                variant='contained'
                onClick={handleSubmit}
                color='secondary'
                fullWidth={true}
              >
                Search
              </Button>
              <div className='label-message'>
                *Currently only US and Canadian equities are available.
              </div>
            </div>
          </form>
        </div>
        <div className='dashboard-stock-box'>
          <div>
            <Quote symbol={symbol} resetError={true} />
          </div>
        </div>
      </div>
      {props.login !== true && (
        <div>
          <section id='watchlist' />
          <NewList />
        </div>
      )}
    </div>
  );
}
