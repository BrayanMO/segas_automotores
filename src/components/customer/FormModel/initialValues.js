import customerFormModel from "./customerFormModel";
const {
  formField: {
    firstName,
    lastName,
    address,
    document,
    tipo_document,
    phone,
    email,
    made,
    model,
    annio,
    placa,
    kilometraje,
    observations,
    certificate,
  },
} = customerFormModel;

const initialValues = {
  [firstName.name]: "",
  [lastName.name]: "",
  [address.name]: "",
  [document.name]: "",
  [tipo_document.name]: "",
  [phone.name]: "",
  [email.name]: "",
  [made.name]: "",
  [model.name]: "",
  [annio.name]: "",
  [placa.name]: "",
  [kilometraje.name]: "",
  [observations.name]: "",
  [certificate.name]: "",
};

export default initialValues;
