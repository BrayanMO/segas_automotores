import { base_host } from "../Config/Constants";
import axios from "axios";
import { getToken } from "./TokenApi";

export async function getTotalClients() {
  const url = `${base_host}/admin/total-clients`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return result.data;
}

export async function getTotalConvertions() {
  const url = `${base_host}/admin/total-convertions`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return result.data;
}

export async function getNextMantenimiento() {
  const url = `${base_host}/admin/next-mantenimiento`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return result.data;
}

export async function getNextChangeFilter() {
  const url = `${base_host}/admin/next-change-filter`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return result.data;
}

export async function getProductsStockMin() {
  const url = `${base_host}/admin/products-stock-min`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return result.data;
}

export async function getProductsByMonth() {
  const url = `${base_host}/admin/products-by-month`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return result.data;
}
