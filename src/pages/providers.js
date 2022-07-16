import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, CircularProgress } from "@mui/material";
import { DashboardLayout } from "src/layout/dashboard-layout";
import { getProviders } from "src/Api/ProviderApi";

const ProviderToolbar = dynamic(() => import("../components/providers/provider-toolbar"));

const ProviderListResults = dynamic(() => import("src/components/providers/provider-list-result"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

export default function Providers() {
  const [listProviders, setListProviders] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    providers();
  }, []);

  async function providers() {
    const list = await getProviders();
    setListProviders(list);
  }

  const searchColums = ["ruc", "razon_social"];

  function search(list) {
    return list.filter((item) => {
      return searchColums.some((column) => {
        return item[column].toLowerCase().includes(searchStr.toLowerCase());
      });
    });
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Proveedores | Dashboard Template</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProviderToolbar callback={setSearchStr} />
          <Box sx={{ mt: 3 }}>
            <ProviderListResults listProviders={search(listProviders)} callback={providers} />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
