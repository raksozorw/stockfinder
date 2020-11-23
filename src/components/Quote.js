import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, unsetError } from "../actions";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebaseConfig";
import BottomNav from "./BottomNav";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import StockBoxInner from "./StockBoxInner";

export default function Quote(props) {
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});
  const [change, setChange] = useState(0);
  const [increase, setIncrease] = useState(true);
  const uid = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const getQuote = async () => {
    await axios
      .get(
        `https://finnhub.io/api/v1/quote?symbol=${props.symbol}&token=${process.env.REACT_APP_API_TOKEN}`
      )
      .then((response) => {
        if (response.data.o) {
          const { c, h, l, o, pc, t } = response.data;

          setData({
            ...data,
            ticker: props.symbol,
            open: o.toFixed(2),
            high: h.toFixed(2),
            low: l.toFixed(2),
            current: c.toFixed(2),
          });

          getName();
          props.resetError && dispatch(unsetError());
        } else {
          dispatch(
            setError(
              "Please enter a valid ticker symbol. (eg. AAPL, TSLA, AMZN). Stock must be listed on a U.S. or Canadian exchange."
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getName = async () => {
    await axios
      .get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${props.symbol}&token=${process.env.REACT_APP_API_TOKEN}`
      )
      .then((response) => {
        if (response.data.name) {
          setProfile({
            name: response.data.name,
            exchange: response.data.exchange,
            currency: response.data.currency,
          });
        } else {
          setProfile({ name: "No company data available." });
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuote();
  }, [props.symbol]);

  useEffect(() => {
    if (data.current > data.open) {
      setIncrease(true);
    } else if (data.current < data.open) {
      setIncrease(false);
    }
    const percent = 100 * ((data.current - data.open) / data.open);
    const actual = data.current - data.open;
    setChange({
      percent: percent.toFixed(2),
      actual: actual.toFixed(2),
    });
  }, [data.current]);

  const firebaseSubmit = () => {
    if (uid) {
      const date = new Date();
      const dId = date.toUTCString();
      const id = uuidv4();
      db.ref(`lists/${uid}/${dId + id}`).set(data.ticker);
    } else {
      console.log("Must be signed in to create a watchlist.");
    }
  };

  return (
    <div>
      {props.handleDelete && (
        <div className='delete-button'>
          <IconButton
            aria-label='delete'
            color='secondary'
            fullWidth={false}
            onClick={props.handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <StockBoxInner
        data={data}
        profile={profile}
        increase={increase}
        change={change}
      />

      {!props.handleDelete && (
        <div>
          <BottomNav
            firebaseSubmit={firebaseSubmit}
            refresh={getQuote}
            ticker={data.ticker}
          />
        </div>
      )}
    </div>
  );
}
