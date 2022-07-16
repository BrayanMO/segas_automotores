import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { DashboardLayout } from "src/layout/dashboard-layout";
import { Box, Container, CircularProgress } from "@mui/material";

import { useRouter } from "next/router";
import { getProductById } from "src/Api/RepuestoApi";
import { size } from "lodash";

const DetailProduct = dynamic(() => import("src/components/detail-product/DetailProduct"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

export default function ProductDetail() {
  const [infoProduct, setInfoProduct] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (query.product) {
        const product = await getProductById(query.product);
        setInfoProduct(product);
      }
    })();
  }, [query]);

  if (!size(infoProduct) === 0) return null;

  return (
    <DashboardLayout>
      <Head>
        <title>Detalle producto | Dashboard Template</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          {size(infoProduct) === 0 ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
            </Box>
          ) : (
            <DetailProduct infoProduct={infoProduct} />
          )}
        </Container>
      </Box>
    </DashboardLayout>
  );
}
