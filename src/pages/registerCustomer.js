import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { map } from "lodash";
import { toast } from "react-toastify";
import { addClient } from "src/Api/ClientApi";
import {
  PersonalInformation,
  ContactInformation,
  VehicleInformation,
} from "src/components/customer/Forms";

import {
  initialValues,
  validationSchema,
  customerFormModel,
} from "src/components/customer/FormModel";

const steps = ["Informacion Personal", "Informacion de Contacto", "Informacion Vehicular"];
const { formId, formField } = customerFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalInformation formField={formField} />;
    case 1:
      return <ContactInformation formField={formField} />;
    case 2:
      return <VehicleInformation formField={formField} />;
    default:
      return <div>No encontrado</div>;
  }
}

export default function RegisterCustomer() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const router = useRouter();

  async function _submitForm(values, actions) {
    // await _sleep(1000);
    // console.log(values);
    // alert(JSON.stringify(values, null, 2));
    const register = await addClient(values);
    //console.log(typeof register.cod);

    if (register.cod === 0) {
      toast.error(register.status);
      router.push("/customers");
    } else {
      console.log(register);
      toast.success(register.status);
      actions.setSubmitting(false);
      router.push("/customers");
    }
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <>
      <Head>
        <title>Registrar Ciente | Template App</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/customers" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Regresar
            </Button>
          </NextLink>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Registrar nuevo Cliente
            </Typography>
            <Stepper activeStep={activeStep} sx={{ my: 2 }}>
              {map(steps, (label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} sx={{ marginTop: "3px", marginLeft: "1px" }}>
                      Atras
                    </Button>
                  )}
                </Box>

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isLastStep ? "Registrar Cliente" : "Siguiente"}
                  </Button>
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      sx={{ position: "absolute", top: "50%", left: "50%" }}
                    />
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
}
