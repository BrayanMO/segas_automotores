import { base_host } from "src/Config/Constants";
import { getToken } from "./TokenApi";
import axios from "axios";

export async function getProviders() {
  try {
    const url = `${base_host}/providers`;

    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function registerProvider(data) {
  try {
    const url = `${base_host}/providers/register`;
    const result = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": `application/json`,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteProvider(id) {
  try {
    const url = `${base_host}/providers/${id}`;
    const result = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
