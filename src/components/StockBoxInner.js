import React from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function StockBoxInner({ data, profile, increase, change }) {
  const up = <ArrowDropUpIcon style={{ color: "green" }} fontSize='large' />;
  const down = <ArrowDropDownIcon style={{ color: "red" }} fontSize='large' />;

  return (
    <div className='stock-box-inner'>
      <h1>{data.ticker !== "" ? data.ticker : ""}</h1>
      <h2>{profile && profile.name}.</h2>
      <h5>{profile.exchange}</h5>

      <div className='quote-numbers'>
        <div className='price'>
          <h1>{data.current ? data.current : <CircularProgress />}</h1>
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
  );
}
