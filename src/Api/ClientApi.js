import { base_host } from "../Config/Constants";
import axios from "axios";
import { getToken } from "./TokenApi";

export async function addClient(data) {
  const url = `${base_host}/client/add-client`;

  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": `application/json`,
    },
  });

  return result.data;
}

export async function getClients() {
  const url = `${base_host}/client/list-clients`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  //console.log(result.data);
  return result.data;
}

export async function getClientDocument(document) {
  const url = `${base_host}/client/client-document/${document}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  //console.log(result.data);
  return result.data;
}

export async function getTipoDocument() {
  try {
    const url = `${base_host}/client/tipo-document`;
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

export async function getStatusCertificate() {
  try {
    const url = `${base_host}/client/status-certificate`;
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

export async function deleteClient(id) {
  try {
    const url = `${base_host}/client/delete-client/${id}`;
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

export async function updateClient(id, data) {
  try {
    const url = `${base_host}/client/update-client/${id}`;
    const result = await axios.put(url, data, {
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

// export async function searchClient(nombre) {
//   const url = `${base_host}/client/search-client/${nombre}`;
//   const result = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });
//   //console.log(result.data);
//   return result.data;
// }
