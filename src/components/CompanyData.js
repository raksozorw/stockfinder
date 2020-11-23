// this is not implemented yet, eventually I would like an autocompleted list of companies

import React from "react";
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
