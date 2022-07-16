import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Grid, CircularProgress } from "@mui/material";
import { DashboardLayout } from "../layout/dashboard-layout";
import {
  getTotalClients,
  getTotalConvertions,
  getNextMantenimiento,
  getProductsStockMin,
  getProductsByMonth,
  getNextChangeFilter,
} from "src/Api/AdminApi";

const TotalCustomers = dynamic(() => import("src/components/dashboard/total-customers"));
const TotalConvertions = dynamic(() => import("src/components/dashboard/total-convertions"));
const NextManteinace = dynamic(() => import("src/components/dashboard/next-manteinace"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});
const ProductStock = dynamic(() => import("src/components/dashboard/product-stock"));
const MostUsedProducts = dynamic(() => import("src/components/dashboard/most-used-products"));
const NextChangeFilter = dynamic(() => import("src/components/dashboard/next-change-filter"));
const LatestConvertions = dynamic(() => import("src/components/dashboard/latest-convertions"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

export default function Dashboard() {
  const [totalClients, setTotalClients] = useState();
  const [totalConvertions, setTotalConvertions] = useState();
  const [nextManteinace, setNextManteinace] = useState([]);
  const [productStock, setProductStock] = useState([]);
  const [mostUsedProducts, setMostUsedProducts] = useState([]);
  const [nextChangeFilter, setNextChangeFilter] = useState([]);

  useEffect(() => {
    // (async () => {
    //   const [
    //     resTotalClients,
    //     resTotalConvertions,
    //     resNextManteinace,
    //     resProductStock,
    //     resNnextChangeFilter,
    //   ] = await Promise.all([
    //     getTotalClients(),
    //     getTotalConvertions(),
    //     getNextMantenimiento(),
    //     getProductsStockMin(),
    //     getNextChangeFilter(),
    //   ]);
    //   setTotalClients(resTotalClients);
    //   setTotalConvertions(resTotalConvertions);
    //   setNextManteinace(resNextManteinace);
    //   setProductStock(resProductStock);
    //   setNextChangeFilter(resNnextChangeFilter);
    // })();

    getData();
  }, []);

  async function getData() {
    const response = await getTotalClients();
    setTotalClients(response);

    const response2 = await getTotalConvertions();
    setTotalConvertions(response2);

    const response3 = await getNextMantenimiento();
    setNextManteinace(response3);

    const response4 = await getProductsStockMin();
    setProductStock(response4);

    const response5 = await getNextChangeFilter();
    setNextChangeFilter(response5);
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | Template Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TotalCustomers callback={totalClients} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TotalConvertions callback={totalConvertions} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <NextManteinace callback={nextManteinace} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <ProductStock callback={productStock} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <MostUsedProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <NextChangeFilter callback={nextChangeFilter} />
            </Grid>

            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestConvertions />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}

// export const getServerSideProps = requireAuthentication(async (ctx) => {
//   return {
//     props: {},
//   };
// });
