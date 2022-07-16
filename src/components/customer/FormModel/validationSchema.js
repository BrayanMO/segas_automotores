import * as Yup from "yup";
import customerFormModel from "./customerFormModel";

const {
  formField: {
    firstName,
    lastName,
    address,
    tipo_document,
    document,
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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [tipo_document.name]: Yup.string().nullable().required(`${tipo_document.requiredErrorMsg}`),
    [document.name]: Yup.string()
      .required(`${document.requiredErrorMsg}`)
      .test("lenDNI", `${document.invalidErrorMsgDNI}`, function (value) {
        const dni = this.options.parent.tipo_document;
        if (dni === "1" && (value?.length > 8 || value?.length < 8)) {
          return false;
        } else {
          return true;
        }
      })
      .test("lenCarnet", `${document.invalidErrorMsgCarnet}`, function (value) {
        const carnet = this.options.parent.tipo_document;
        if (carnet === "2" && (value?.length > 12 || value?.length < 12)) {
          return false;
        } else {
          return true;
        }
      })
      .test("lenPasaporte", `${document.invalidErrorMsgPasaporte}`, function (value) {
        const pasaporte = this.options.parent.tipo_document;
        if (pasaporte === "3" && (value?.length > 12 || value?.length < 12)) {
          return false;
        } else {
          return true;
        }
      }),
  }),
  Yup.object().shape({
    [phone.name]: Yup.string()
      .required(`${phone.requiredErrorMsg}`)
      .matches(phoneRegExp, `${phone.invalidErrorMsg}`)
      .test("len", `${phone.invalidErrorMsg}`, (val) => val && val.length === 9),
    [email.name]: Yup.string()
      .email(`${email.invalidErrorMsg}`)
      .required(`${email.requiredErrorMsg}`),
    [address.name]: Yup.string(),
  }),
  Yup.object().shape({
    [made.name]: Yup.string().required(`${made.requiredErrorMsg}`),
    [model.name]: Yup.string().required(`${model.requiredErrorMsg}`),
    [annio.name]: Yup.string()
      .required(`${annio.requiredErrorMsg}`)
      .test("len", `${annio.invalidErrorMsg}`, (value) => value && value.length === 4),
    [placa.name]: Yup.string()
      .required(`${placa.requiredErrorMsg}`)
      .test("len", `${placa.invalidErrorMsg}`, (val) => val && val.length === 7),
    [kilometraje.name]: Yup.number().required(`${kilometraje.requiredErrorMsg}`),
    [observations.name]: Yup.string().required(`${observations.requiredErrorMsg}`),
    [certificate.name]: Yup.string().nullable().required(`${certificate.requiredErrorMsg}`),
  }),
];

export default validationSchema;
