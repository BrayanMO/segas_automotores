import { base_host } from "src/Config/Constants";
import axios from "axios";
import { getToken } from "./TokenApi";

export async function addProduct(items) {
  const url = `${base_host}/repuestos/add-repuesto`;
  const result = await axios.post(
    url,
    { items },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return result;
}

export async function uploadImageRepuesto(folder, files) {
  let multipar = new FormData();

  /**
   * Convierto el objeto FileList en una matriz para que cada imagen se pueda obtener y enviar a multipar.
   */
  Array.from(files).forEach((element) => {
    multipar.append("image", element);
  });

  const url = `${base_host}/repuestos/upload-image/${folder}`;
  const result = await axios.post(url, multipar, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-type": "multipart/form-data",
    },
  });
  return result.data;
}

export async function destroyImageRepuesto(id) {
  try {
    const url = `${base_host}/repuestos/destroy-image`;
    const result = await axios.post(
      url,
      { id },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProveedores() {
  try {
    const url = `${base_host}/repuestos/list-proveedor`;
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

export async function getProducts() {
  try {
    const url = `${base_host}/repuestos/list-repuestos`;

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

export async function getProductById(id) {
  try {
    const url = `${base_host}/repuestos/get-repuesto/${id}`;
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateProductById(data) {
  try {
    const url = `${base_host}/repuestos/update-repuesto`;
    const result = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": `application/json`,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteProductById(id) {
  try {
    const url = `${base_host}/repuestos/delete-repuesto/${id}`;
    const result = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function discountStock(products) {
  try {
    const url = `${base_host}/repuestos/discount-stock-repuesto-conversion`;
    const result = await axios.put(url, products, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": `application/json`,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
