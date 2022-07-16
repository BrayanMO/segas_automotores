import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@mui/material";

export default function InputField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  function _renderHelperText() {
    if (isError) {
      return error;
    }
  }
  return (
    <TextField type="text" error={isError} helperText={_renderHelperText()} {...field} {...rest} />
  );
}
