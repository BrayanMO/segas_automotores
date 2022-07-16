import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Box, Container, CircularProgress } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import { getProducts } from "src/Api/RepuestoApi";

const ProductListToolbar = dynamic(() => import("../components/product/product-list-toolbar"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

const ProductListResults = dynamic(() => import("src/components/product/product-list-results"));

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  function search(list) {
    return list.filter((item) => {
      return item.nombre.toLowerCase().includes(searchStr.toLowerCase());
    });
  }

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts(response);
    })();
  }, []);

  return (
    <DashboardLayout>
      <Head>
        <title>Productos | Dashboard Template</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar callback={setSearchStr} />
          <ProductListResults products={search(products)} />
        </Container>
      </Box>
    </DashboardLayout>
  );
}
