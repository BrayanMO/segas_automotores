import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Autocomplete,
} from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import DeleteIcon from "@mui/icons-material/Delete";

import { DashboardLayout } from "src/layout/dashboard-layout";
import { DatePickerField, InputField } from "src/components/FormFields";

import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

import { getVehiculoPlaca, addConversionVehiculoClient, uploudImage } from "src/Api/VehicleApi";
import { discountStock, getProducts } from "src/Api/RepuestoApi";

const SingleImagePreview = dynamic(() =>
  import("src/components/vehicle-conversion/single-image-preview")
);
const MultipleImagePreview = dynamic(() =>
  import("src/components/vehicle-conversion/multiple-image-preview")
);

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

export default function VehicleConversion() {
  const [infoVehiculo, setInfoVehiculo] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setListProducts(response);
    })();
  }, []);

  const certificadoRef = useRef(null);
  const collageRef = useRef(null);

  async function _handleSubmit(values, actions) {
    // // console.log(values.imgCertificate);
    // console.log(values.imgsCollage);
    const upload = await uploudImage("certificate", values.imgCertificate, null);
    // console.log(upload);

    const uploadCollage = await uploudImage("collage", null, values.imgsCollage);
    // console.log(uploadCollage);

    // console.log(`Fecha Proxima Revision: ${format(values.fechaNextRevision, "yyyy-MM-dd")}`);
    // console.log(`Fecha cambio de filtro: ${format(values.fechaChangeFilter, "yyyy-MM-dd")}`);
    // console.log(`Fecha de mantenimiento: ${format(values.fechaMantenimiento, "yyyy-MM-dd")}`);

    const dataProcess = {
      idVehiculo: infoVehiculo.id_vehiculo,
      garantia: values.garantia,
      fechaNextRevision: format(values.fechaNextRevision, "yyyy-MM-dd"),
      fechaChangeFilter: format(values.fechaChangeFilter, "yyyy-MM-dd"),
      fechaMantenimiento: format(values.fechaMantenimiento, "yyyy-MM-dd"),
      imgCertificate: upload.data[0].url,
      imgsCollage: JSON.stringify(uploadCollage.data),
      products: JSON.stringify(values.products),
    };

    // console.log(dataProcess);

    const productsDiscount = {
      products: values.products,
    };

    // console.log(productsDiscount);

    const response = await addConversionVehiculoClient(dataProcess);
    const response2 = await discountStock(productsDiscount);

    if (!response || !response2) {
      toast.error("Error al registrar la conversion del vehiculo");
    } else {
      if (response.cod === 1) {
        toast.success(response.message);
        actions.resetForm();
      } else {
        toast.error(response.message);
      }
    }
  }

  function initialValues() {
    return {
      placa: "",
      fechaNextRevision: "",
      fechaChangeFilter: "",
      fechaMantenimiento: "",
      imgCertificate: null,
      imgsCollage: null,
      products: [
        {
          id: "",
          nombre: "",
          cantidad: "",
          serial: "",
          precio_venta: "",
        },
      ],
      garantia: "",
    };
  }

  function validationSchema() {
    return {
      placa: Yup.string()
        .max(12)
        .required("Se requiere el placa del vehiculo")
        .test("len", `N° de placa invalido (Ejemplo: AEF-717)`, (val) => val && val.length === 7),
      fechaNextRevision: Yup.string().required("Ingrese la fecha de la proxima revision"),
      fechaChangeFilter: Yup.string().required("Ingrese la fecha del cambio de filtro"),
      fechaMantenimiento: Yup.string().required("Ingrese la fecha del proximo mantenimiento"),
      imgCertificate: Yup.mixed()
        .nullable()
        .required("La imagen del certificado es necesaria")
        .test(
          "FILE_SIZE",
          "Tamaño del archivo muy grande",
          (value) => !value || (value && value.size <= 1024 * 1024)
        )
        .test(
          "FORMAT_FILE",
          "Solo soporta formatos JPEG, PNG",
          (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
      imgsCollage: Yup.mixed()
        .nullable()
        .required("Las imagenes del cambio son necesarias")
        .test("len", `Solo permite 5 imagenes`, (val) => val && val.length === 5),
      garantia: Yup.string()
        .required("Ingrese la garantia")
        .test("len", `La garantia debe ser validad`, (val) => val > 0),
      products: Yup.array()
        .of(
          Yup.object().shape({
            nombre: Yup.string().required("El nombre es necesario"),
            cantidad: Yup.string()
              .required("La cantidad es necesaria")
              .test("len", `La cantidad debe ser positivo`, (val) => val > 0),
            serial: Yup.string().required("El serial es necesario"),
          })
        )
        .required("Los productos son necesarios"),
    };
  }

  async function buscarVehiculoPlaca(placa) {
    if (placa.length <= 0) {
      toast.error("Ingrese la placa del vehiculo");
    } else {
      const vehiculo = await getVehiculoPlaca(placa);
      console.log(vehiculo);
      setInfoVehiculo(vehiculo);
    }
  }

  const handleImageChange = (e, formik) => {
    //console.log(e.target.files);
    if (e.target.files) {
      formik.setFieldValue("imgsCollage", e.target.files);
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      //console.log("filesArray: ", filesArray);

      setSelectedFiles((imgsCollage) => [...imgsCollage, ...filesArray]);
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>Registrar Caso Conversion | Template App</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "top",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Registro de conversiones
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues()}
            validationSchema={Yup.object(validationSchema())}
            onSubmit={_handleSubmit}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={6}>
                    {/* PLACA */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <TextField
                        name="placa"
                        label="Placa"
                        size="small"
                        variant="outlined"
                        error={Boolean(formik.touched.placa && formik.errors.placa)}
                        helperText={formik.touched.placa && formik.errors.placa}
                        {...formik.getFieldProps("placa")}
                      />
                      <Button
                        color="primary"
                        size="small"
                        fullWidth
                        onClick={() => buscarVehiculoPlaca(formik.values.placa)}
                        variant="outlined"
                      >
                        Buscar Vehiculo
                      </Button>
                    </Grid>
                    <Typography color="textSecondary" gutterBottom variant="body1">
                      {infoVehiculo.length <= 0
                        ? " "
                        : !infoVehiculo.nombre
                        ? "El vehiculo no existe"
                        : `Vehiculo perteneciente: ${infoVehiculo.nombre} ${
                            infoVehiculo.apellido
                          }. Ultima revision: ${
                            infoVehiculo.ultima_revision
                              ? format(parseISO(infoVehiculo.ultima_revision), "yyyy-MM-dd")
                              : "Nunca"
                          }`}
                    </Typography>

                    {/* Fechas */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <DatePickerField
                        name="fechaNextRevision"
                        openTo="day"
                        label="Fecha Proxima revision"
                        views={["day", "month"]}
                      />

                      <DatePickerField
                        name="fechaChangeFilter"
                        openTo="day"
                        label="Fecha Cambio de filtro"
                        views={["day", "month"]}
                      />
                    </Grid>

                    {/* Fecha - Garantia */}
                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <DatePickerField
                        name="fechaMantenimiento"
                        openTo="day"
                        label="Fecha proximo mantenimiento"
                        views={["day", "month"]}
                      />

                      {/* Garantia */}
                      <InputField name="garantia" label="Garantia" margin="normal" type="number" />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography color="textPrimary" variant="h5">
                        Lista de productos utilizados
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          border: "1px dashed rgb(45, 55, 72)",
                          borderRadius: 1,
                          px: 1,
                        }}
                      >
                        <FieldArray name="products">
                          {(arrayHelpers) => (
                            <>
                              {/* add product */}
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>
                                  arrayHelpers.push({
                                    nombre: "",
                                    cantidad: "",
                                    serial: "",
                                  })
                                }
                                sx={{ mt: 1 }}
                              >
                                Agregar
                              </Button>

                              {/* list of products */}
                              {formik.values.products.map((producto, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2,
                                  }}
                                >
                                  <Autocomplete
                                    freeSolo
                                    fullWidth
                                    name={`products[${index}].nombre`}
                                    options={listProducts}
                                    getOptionLabel={(option) => option.nombre}
                                    onOpen={formik.handleBlur}
                                    onChange={(event, newValue) => {
                                      // console.log(newValue);
                                      formik.setFieldValue(
                                        `products[${index}].id`,
                                        newValue !== null ? newValue.id : ""
                                      );
                                      formik.setFieldValue(
                                        `products[${index}].nombre`,
                                        newValue !== null ? newValue.nombre : ""
                                      );
                                      formik.setFieldValue(
                                        `products[${index}].precio_venta`,
                                        newValue !== null ? newValue.precio_venta : ""
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <InputField
                                        name={`products[${index}].nombre`}
                                        label="Buscar Producto"
                                        margin="normal"
                                        {...params}
                                      />
                                    )}
                                  />

                                  <InputField
                                    name={`products[${index}].cantidad`}
                                    label="Cantidad"
                                    margin="normal"
                                    type="number"
                                  />
                                  <InputField
                                    name={`products[${index}].serial`}
                                    label="Serial"
                                    margin="normal"
                                  />

                                  <IconButton
                                    color="error"
                                    aria-label="remove product"
                                    component="span"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              ))}
                            </>
                          )}
                        </FieldArray>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Imagenes */}
                  <Grid item xs={6}>
                    {/* Certificado */}
                    <Grid item xs={12}>
                      <Typography color="textPrimary" variant="h5">
                        Certificado
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px dashed rgb(45, 55, 72)",
                          borderRadius: 1,
                          flexWrap: "wrap",
                          justifyContent: "center",
                          outline: "none",
                          padding: 4,
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            cursor: "pointer",
                            opacity: 0.5,
                          },
                        }}
                      >
                        <input
                          ref={certificadoRef}
                          accept=".png, .jpeg"
                          type="file"
                          autoComplete="off"
                          tabIndex="-1"
                          hidden
                          onChange={(evt) => {
                            formik.setFieldValue("imgCertificate", evt.target.files[0]);
                          }}
                        />
                        {formik.values.imgCertificate ? (
                          <SingleImagePreview file={formik.values.imgCertificate} />
                        ) : (
                          <ImageSearchIcon
                            sx={{
                              height: 100,
                              width: 100,
                            }}
                          />
                        )}
                        <Box sx={{ padding: 3 }}>
                          <Button onClick={() => certificadoRef.current.click()}>
                            Selecciona el certificado
                          </Button>
                        </Box>
                      </Box>
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="imgCertificate" />
                      </Box>
                    </Grid>

                    {/* Collage */}
                    <Grid item xs={12}>
                      <Typography color="textPrimary" variant="h5">
                        Collage del cambio
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px dashed rgb(45, 55, 72)",
                          borderRadius: 1,
                          flexWrap: "wrap",
                          justifyContent: "center",
                          outline: "none",
                          padding: 4,
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            cursor: "pointer",
                            opacity: 0.5,
                          },
                        }}
                      >
                        <input
                          ref={collageRef}
                          accept=".png, .jpeg"
                          type="file"
                          autoComplete="off"
                          tabIndex="-1"
                          hidden
                          multiple
                          onChange={(e) => handleImageChange(e, formik)}
                        />
                        {formik.values.imgsCollage ? (
                          <MultipleImagePreview source={selectedFiles} />
                        ) : (
                          <ImageSearchIcon
                            sx={{
                              height: 100,
                              width: 100,
                            }}
                          />
                        )}
                        <Box sx={{ padding: 3 }}>
                          <Button onClick={() => collageRef.current.click()}>
                            Selecciona 5 fotos
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedFiles([]);
                              formik.setFieldValue("imgsCollage", null);
                            }}
                          >
                            Borrar fotos
                          </Button>
                        </Box>
                      </Box>
                      <Box sx={{ color: "red" }}>
                        <ErrorMessage name="imgsCollage" />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Box sx={{ py: 2 }}>
                  <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                    Registrar
                  </Button>
                </Box>
                {formik.isSubmitting && (
                  <CircularProgress
                    size={24}
                    sx={{ position: "absolute", top: "50%", left: "50%" }}
                  />
                )}
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
