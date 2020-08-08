import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unsetError } from "../actions";
import Quote from "./Quote";
import Button from "@material-ui/core/Button";
import NewList from "./NewList";

export default function Dashboard() {
  const [stock, setStock] = useState();
  const [input, setInput] = useState("");
  const [symbol, setSymbol] = useState("AAPL");
  const newError = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const token = process.env.REACT_APP_API_TOKEN;

  const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

  // Connection opened -> Subscribe
  //   socket.addEventListener("open", function (event) {
  //     socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
  //   });

  // Listen for messages
  //   socket.addEventListener("message", function (event) {
  //     const data = JSON.parse(event.data);
  //     if (data.data) {
  //       const price = data.data[0].p;
  //       if (price > stock) {
  //         setIncrease(true);
  //       } else if (price < stock) {
  //         setIncrease(false);
  //       }
  //       setStock(price.toFixed(2));
  //     }
  //   });

  // Unsubscribe
  var unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

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
      <div>—</div>
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
            <Quote currentPrice={stock} symbol={symbol} resetError={true} />
          </div>
        </div>
      </div>
      <section id='watchlist' />
      <NewList />
    </div>
  );
}
