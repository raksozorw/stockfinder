import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, unsetError } from "../actions";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebaseConfig";
import BottomNav from "./BottomNav";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

export default function Quote(props) {
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});
  const [change, setChange] = useState(0);
  const [increase, setIncrease] = useState(true);
  const [ticker, setTicker] = useState();
  const uid = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const getQuote = async () => {
    await axios
      .get(
        `https://finnhub.io/api/v1/quote?symbol=${props.symbol}&token=${process.env.REACT_APP_API_TOKEN}`
      )
      .then((response) => {
        console.log("worked");
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
          setProfile({ name: "No company data available." }); // something stops the getQuote from firing if the name isn't valid
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

  //   useEffect(() => {
  //     if (props.currentPrice > data.open) {
  //       setIncrease(true);
  //     } else if (props.currentPrice < data.open) {
  //       setIncrease(false);
  //     }
  //     setChange((props.currentPrice - data.open).toFixed(2));
  //   }, [props.currentPrice]);

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
  //change functions back to currentPrice for realtime....

  const firebaseSubmit = () => {
    const date = new Date();
    const dId = date.toUTCString();
    const id = uuidv4();
    db.ref(`lists/${uid}/${dId + id}`).set(data.ticker);
  };

  const up = <ArrowDropUpIcon color='primary' fontSize='large' />;
  const down = <ArrowDropDownIcon color='secondary' fontSize='large' />;

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
      <div className='stock-box-inner'>
        <h1>{data.ticker !== "" ? data.ticker : ""}</h1>
        <h2>{profile && profile.name}.</h2>
        <h5>{profile.exchange}</h5>

        <div className='quote-numbers'>
          <div className='price'>
            <h1>
              {/* {props.currentPrice ? props.currentPrice : <CircularProgress />} */}
              {data.current ? data.current : <CircularProgress />}
            </h1>
            <div className='arrow'>{increase ? up : down}</div>
          </div>
          <div className=''>
            <p style={{ color: `${increase ? "green" : "red"}` }}>
              {data.current &&
                data.open &&
                `${
                  profile.name !== "No company data available."
                    ? profile.currency
                    : ""
                } ${change.actual} (${change.percent}%)`}
            </p>
          </div>

          <div className='quote-data'>
            <div>
              <h2>Open:</h2>
              <p>{data && data.open}</p>
            </div>
            <div>
              <h2>High:</h2>
              <p>{data && data.high}</p>
            </div>
            <div>
              <h2>Low:</h2>
              <p>{data && data.low}</p>
            </div>
          </div>
        </div>
      </div>
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
