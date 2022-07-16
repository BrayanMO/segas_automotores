import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, CircularProgress, Button } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getClientDocument } from "src/Api/ClientApi";

const DetailCustomerToolbar = dynamic(() =>
  import("src/components/detail-customer/detail-customer-toolbar")
);
const DetailCustomerListVehicles = dynamic(
  () => import("src/components/detail-customer/detail-customer-list-vehicles"),
  {
    loading: () => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
      </Box>
    ),
  }
);

const Detail = () => {
  const [detailCustomer, setDetailCustomer] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (query.detail) {
        const response = await getClientDocument(query.detail);
        setDetailCustomer(response);
      }
    })();
  }, [query]);

  //console.log(detailCustomer);

  if (!detailCustomer) return null;

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
            <DetailCustomerToolbar callback={detailCustomer} />
            <Box sx={{ mt: 3 }}>
              <DetailCustomerListVehicles callback={detailCustomer} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Detail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Detail;
