import React from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";

import {
  InputLabel,
  FormControl,
  Select,
  TextField,
  MenuItem,
  FormHelperText,
} from "@mui/material";

function SelectField(props) {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  function _renderHelperText() {
    if (isError) {
      return error;
    }
  }
  return (
    <TextField
      type="text"
      select
      value={selectedValue ? selectedValue : ""}
      label={label}
      error={isError}
      helperText={_renderHelperText()}
      {...field}
      {...rest}
    >
      {data.map((item, index) => (
        <MenuItem key={index} value={item.id}>
          {item.nombre}
        </MenuItem>
      ))}
    </TextField>
  );
}

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectField;
