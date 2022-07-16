import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, CircularProgress } from "@mui/material";
import { DashboardLayout } from "../layout/dashboard-layout";
import { getClients } from "src/Api/ClientApi";

const CustomerListToolbar = dynamic(() => import("src/components/customer/customer-list-toolbar"));

const CustomerListResults = dynamic(() => import("src/components/customer/customer-list-results"), {
  loading: () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  ),
});

export default function Customers() {
  const [listClient, setListClient] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    clients();
  }, []);

  async function clients() {
    const list = await getClients();
    setListClient(list);
  }

  /**
   * It returns a list of clients that have a name or last name that contains the search string.
   * @param list - the list of clients
   * @returns The filtered list of clients.
   */
  const searchColums = ["nombre", "apellido"];

  function search(list) {
    return list.filter((client) =>
      searchColums.some((column) => {
        return client[column].toLowerCase().includes(searchStr.toLowerCase());
      })
    );
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Clientes | Template Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar callback={setSearchStr} />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults listClient={search(listClient)} callback={clients} />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
