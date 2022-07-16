import { base_host } from "src/Config/Constants";
import axios from "axios";

export async function loginPersonal(data) {
  try {
    const url = `${base_host}/login/admin`;
    const result = await axios.post(url, data);

    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
