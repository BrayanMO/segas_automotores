import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, Button, CircularProgress } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { listVehicleConversion } from "src/Api/VehicleApi";
import dynamic from "next/dynamic";

const DetailVehicleList = dynamic(
  () => import("src/components/detail-vehicle/detail-vehicle-list"),
  {
    loading: () => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
      </Box>
    ),
  }
);

const Vehicle = () => {
  const [listConversion, setListConversion] = useState(null);
  const router = useRouter();
  //console.log(router.query?.vehicle);

  useEffect(() => {
    if (router.query?.vehicle) {
      (async () => {
        const response = await listVehicleConversion(router.query.vehicle);
        setListConversion(response);
      })();
    }
  }, [router.query?.vehicle]);

  //console.log(listConversion);
  if (!listConversion) return null;

  return (
    <>
      <Head>
        <title>Detalles del Cliente | Template Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <NextLink href="/customers" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Regresar
            </Button>
          </NextLink>
          <Box sx={{ pt: 1 }}>
            <Box sx={{ mt: 3 }}>
              <DetailVehicleList data={listConversion} reload={router} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Vehicle.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Vehicle;
