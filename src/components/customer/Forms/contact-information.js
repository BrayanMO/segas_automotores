import React from "react";
import { InputField } from "../../FormFields";

export default function ContactInformation(props) {
  const {
    formField: { phone, email, address },
  } = props;
  return (
    <>
      <InputField
        name={phone.name}
        label={phone.label}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <InputField
        name={email.name}
        label={email.label}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <InputField
        name={address.name}
        label={address.label}
        margin="normal"
        variant="outlined"
        fullWidth
      />
    </>
  );
}
