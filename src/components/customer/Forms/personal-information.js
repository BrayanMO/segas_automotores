import React, { useState, useEffect } from "react";
import { InputField, SelectField } from "../../FormFields";
import { getTipoDocument } from "../../../Api/ClientApi";

export default function PersonalInformation(props) {
  const {
    formField: { firstName, lastName, tipo_document, document },
  } = props;

  const [tipoDocument, setTipoDocument] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getTipoDocument();
      setTipoDocument(response);
    })();
  }, []);

  return (
    <>
      <InputField
        name={firstName.name}
        label={firstName.label}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <InputField
        name={lastName.name}
        label={lastName.label}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <SelectField
        name={tipo_document.name}
        label={tipo_document.label}
        data={tipoDocument}
        fullWidth
        margin="normal"
      />
      <InputField
        name={document.name}
        label={document.label}
        margin="normal"
        variant="outlined"
        fullWidth
      />
    </>
  );
}
