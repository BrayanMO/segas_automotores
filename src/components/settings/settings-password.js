import { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { InputField } from "../FormFields";
import * as Yup from "yup";
import { updatePasswordApi } from "src/Api/AdminApi";
import { useUSer } from "src/context/AuthContext";
import { toast } from "react-toastify";

export default function SettingsPassword(props) {
  const { user, logout } = useUSer();

  function initialValues() {
    return {
      password: "",
      confirm: "",
    };
  }

  function validationSchema() {
    return Yup.object({
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("Este campo es requerido"),
      confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
        .required("Este campo es requerido"),
    });
  }

  const _handleSubmit = async (values, actions) => {
    const response = await updatePasswordApi(user.idUser, values);

    if (response.status === 200) {
      toast.success(response.data.message);
      logout();
    } else toast.error("Error al actualizar la contraseña");
  };

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={validationSchema()}
      onSubmit={_handleSubmit}
    >
      <Form>
        <Card>
          <CardHeader subheader="Actualiza tu Contraseña" title="Contraseña" />
          <Divider />
          <CardContent>
            <InputField
              name="password"
              label="Contraseña"
              type="password"
              margin="normal"
              fullWidth
              autoComplete="new-password"
            />

            <InputField
              name="confirm"
              label="Confirmar Contraseña"
              type="password"
              margin="normal"
              fullWidth
              autoComplete="new-password"
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button type="submit" color="primary" variant="contained">
              Actualizar
            </Button>
          </Box>
        </Card>
      </Form>
    </Formik>
  );
}
