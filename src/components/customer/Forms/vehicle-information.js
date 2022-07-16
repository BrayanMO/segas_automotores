import React, { useState, useEffect } from "react";
import { Typography, Stack, Box, Grid } from "@mui/material";
import { getStatusCertificate } from "src/Api/ClientApi";
import { InputField, SelectField } from "../../FormFields";

export default function VehicleInformation(props) {
  const {
    formField: { made, model, annio, placa, kilometraje, observations, certificate },
  } = props;

  const [statusCertificate, setStatusCertificate] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getStatusCertificate();
      setStatusCertificate(response);
    })();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={6}>
          <InputField name={made.name} label={made.label} variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <InputField name={model.name} label={model.label} variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <InputField name={placa.name} label={placa.label} variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <InputField
            type="number"
            name={annio.name}
            label={annio.label}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <InputField
              type="number"
              name={kilometraje.name}
              label={kilometraje.label}
              variant="outlined"
              fullWidth
            />
            <Typography fontWeight={700} sx={{ mx: 2 }}>
              KM
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <SelectField
            name={certificate.name}
            label={certificate.label}
            data={statusCertificate}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={observations.name}
            label={observations.label}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}
