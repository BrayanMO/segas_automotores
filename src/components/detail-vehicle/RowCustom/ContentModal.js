import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Box, Button } from "@mui/material";
import { DatePickerField } from "src/components/FormFields";
import { updateConvertionVehicle } from "src/Api/VehicleApi";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function ContentModal({ row, onCloseModal, reload: router }) {
  // console.log(router);
  // console.log(row);
  function initialValues() {
    return {
      new_date_revision: new Date(),
      new_date_mantenimiento: new Date(),
      new_date_change_filtro: new Date(),
    };
  }

  function validationSchema() {
    return Yup.object().shape({
      new_date_revision: Yup.date().required("Fecha de revisión requerida"),
      new_date_mantenimiento: Yup.date().required("Fecha de mantenimiento requerida"),
      new_date_change_filtro: Yup.date().required("Fecha de cambio de filtro requerida"),
    });
  }

  async function _handleSubmit(values, actions) {
    // console.log(values);

    const data = {
      id: row.id,
      newDateRevision: format(values.new_date_revision, "yyyy-MM-dd"),
      newDateMantenimiento: format(values.new_date_mantenimiento, "yyyy-MM-dd"),
      newDateChangeFiltro: format(values.new_date_change_filtro, "yyyy-MM-dd"),
    };

    // console.log(data);

    const response = await updateConvertionVehicle(data);

    if (response.status === 200) {
      toast.success("Actualizado correctamente");
      onCloseModal();
      router.reload();
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <Box>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema()}
        onSubmit={_handleSubmit}
      >
        <Form>
          <Box>
            <DatePickerField
              openTo="day"
              views={["day", "month"]}
              name="new_date_revision"
              label="Nueva Fecha de revision"
            />
            <DatePickerField
              openTo="day"
              views={["day", "month"]}
              name="new_date_mantenimiento"
              label="Nueva Fecha de mantenimiento"
            />
            <DatePickerField
              openTo="day"
              views={["day", "month"]}
              name="new_date_change_filtro"
              label="Nueva Fecha de cambio de filtro"
            />
          </Box>
          <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Actualizar
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}
