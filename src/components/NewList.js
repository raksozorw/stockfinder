import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebaseConfig";
import DisplayListItem from "./DisplayListItem";
import Quote from "./Quote";
import { v4 as uuidv4 } from "uuid";
import history from "../history";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function NewList() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const uid = useSelector((state) => state.auth.userId);
  const fetching = useSelector((state) => state.fetching.isFetching);

  // reads the db

  useEffect(() => {
    db.ref(`lists/${uid}`).on("value", (snapshot) => {
      const fireList = [];
      snapshot.forEach((snap) => {
        const value = {
          value: snap.val(),
          key: snap.key,
        };
        fireList.push(value);
      });
      setList(fireList);
    });
  }, [uid]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // on submit, create a timestamp
  // timestamp may work as key... could concatenate even
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const dId = date.toUTCString();
    const id = uuidv4();
    db.ref(`lists/${uid}/${dId + id}`).set(input);
    setInput("");
  };

  const handleDelete = (index) => {
    db.ref(`lists/${uid}/${index}`).remove();
  };

  const autoPopulate = () => {
    const popular = ["AAPL", "TSLA", "AMZN", "GOOGL", "FB"];

    popular.forEach((item) => {
      const date = new Date();
      const dId = date.toUTCString();
      const id = uuidv4();
      db.ref(`lists/${uid}/${dId + id}`).set(item);
    });
  };

  return uid ? (
    <div className='watchlist'>
      <h1 className='watchlist-title'>Your watchlist:</h1>

      {list.length === 0 && (
        <div className='no-list'>
          <p>
            Seach for a stock and click "add to watchlist" to start your list.{" "}
          </p>
          <div onClick={autoPopulate}>
            Or, <Button color='secondary'>click here</Button> to add some
            popular stocks to your list!
          </div>
        </div>
      )}

      {list.length > 0 && (
        <div className='list'>
          {list &&
            list.map((item) => {
              return (
                <div className='stock-list-item'>
                  <Quote
                    symbol={item.value}
                    handleDelete={() => handleDelete(item.key)}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  ) : (
    <div className='no-user-id'>
      <CircularProgress />
      <br></br>
      {!fetching && <p>Sign in to create a list.</p>}
    </div>
  );
}

// try to mess around i nthe action creator .... just want to redirect if there is no uid after a few seconds
