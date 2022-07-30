import { Box, Button, Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { InputField } from "../FormFields";
import * as Yup from "yup";
import { updateMeApi } from "src/Api/AdminApi";
import { toast } from "react-toastify";

export default function AccountProfileDetails(props) {
  const { user, setReloadUser } = props;

  function initialValues() {
    return {
      firstName: `${user?.nombre}`,
      lastName: `${user?.apellido}`,
      phone: `${user?.telef}`,
      email: `${user?.email}`,
      address: `${user?.direccion}`,
    };
  }

  function validationSchema() {
    return Yup.object({
      firstName: Yup.string().max(255).required("Este campo es requerido"),
      lastName: Yup.string().max(255).required("Este campo es requerido"),
      phone: Yup.string()
        .max(255)
        .required("Este campo es requerido")
        .matches(/^[0-9]{9}$/, "El telefono debe tener 9 digitos"),
      email: Yup.string()
        .email("Ingrese un correo valido")
        .max(255)
        .required("Este campo es requerido"),
      address: Yup.string().max(255).required("Este campo es requerido"),
    });
  }

  async function _handleSubmit(values, actions) {
    const response = await updateMeApi(user.id_login, values);

    if (response.status === 200) {
      toast.success(response.data.message);
      setReloadUser(true);
    } else {
      toast.error(response.data.message);
    }
  }

  if (user === undefined) return null;

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={validationSchema()}
      onSubmit={_handleSubmit}
    >
      <Form>
        <Card>
          <CardHeader subheader="La información se puede editar" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <InputField name="firstName" label="Nombre" fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField name="lastName" label="Apellido" fullWidth />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField name="email" label="Email" fullWidth disabled />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputField name="phone" label="Telefono" fullWidth />
              </Grid>
              <Grid item md={12}>
                <InputField name="address" label="Direccion" fullWidth />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Guardar cambios
            </Button>
          </Box>
        </Card>
      </Form>
    </Formik>
  );
}
