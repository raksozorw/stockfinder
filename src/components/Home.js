import React from "react";
import Button from "@material-ui/core/Button";
import history from "../history";

export default function Home() {
  return (
    <div>
      <h1>
        Welcome to Stock Finder, a simple application to view stocks and save a
        custom watchlist.
      </h1>
      <p>Currently only US and Canadian markets available.</p>
      <p>
        To start,
        <br></br>
        <Button
          variant='outlined'
          onClick={() => history.push("/dashboard")}
          color='secondary'
        >
          go to the dashboard{" "}
        </Button>{" "}
        <br></br>
        and create your watchlist.
      </p>
    </div>
  );
}
