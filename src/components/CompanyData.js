// unfortunately this doesn't work very well... I think MUI needs to work on the usability
//color can't be manipulated
// can't figure out how to make it controlled by state... documentation could be better
// Should try contributing to docs!!

import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const companyList = require("../companies.json");

export default function CompanyData(props) {
  const list = companyList.map((item) => {
    const ticker = item.Symbol;
    return ticker;
  });

  return (
    <div>
      <div></div>

      <Autocomplete
        id='combo-box-demo'
        value={props.value}
        inputValue={props.input}
        options={companyList}
        getOptionLabel={(option) => option.Symbol}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField color='secondary' {...params} label='Combo box' />
        )}
      />
    </div>
  );
}
