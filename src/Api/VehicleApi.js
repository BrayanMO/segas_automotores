import { base_host } from "../Config/Constants";
import axios from "axios";
import { getToken } from "./TokenApi";

export async function addVehicleClient(idClient, data) {
  try {
    const url = `${base_host}/vehicle/add-vehicle/${idClient}`;

    const result = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": `application/json`,
      },
    });

    return result;
  } catch (error) {
    return error;
  }
}

/**
 * Indico la ruta donde se guardaran las imagenes, un archivo y una lista de archivos y los sube al servidor
 * @param folder - La carpeta donde se guardará la imagen(es).
 * @param file - es el archivo que quiero subir del certificado.
 * @param files - FileList objeto con multiples imagenes
 * @returns La respuesta es un objeto JSON con la siguiente estructura:
 * {
 *     "cod"   : 1
 *     "status": "Subida de imagenes satisfactoria",
 *     "data": [
 *         "https://example.com/images/certificate/image-1.jpg",
 *         "https://example.com/images/certificate/image-2.jpg",
 *         "https://example.com
 */
export async function uploudImage(folder, file, files) {
  let multipar = new FormData();

  if (folder.includes("certificate")) {
    /*
     * Agregar un archivo a los datos del formulario.
     */
    multipar.append("image", file[0]);
  } else {
    files.forEach((element) => {
      multipar.append("image", element);
    });
  }

  const url = `${base_host}/vehicle/upload-images/${folder}`;
  const result = await axios.post(url, multipar, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-type": "multipart/form-data",
    },
  });
  return result.data;
}

/**
 * Obtiene un token del almacenamiento local, luego usa ese token para realizar una solicitud a una API y devuelve el resultado de esa solicitud.
 * @param placa - "ABC123"
 * @returns {
 *   "nombre": "Luis Enrique",
 *   "apellido": "Morocho Febres",
 *   "ultima_revision": null
 */
export async function getVehiculoPlaca(placa) {
  const url = `${base_host}/vehicle/vehiculo-placa/${placa}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  //console.log(result.data);
  return result.data;
}

export async function addConversionVehiculoClient(json) {
  try {
    const url = `${base_host}/vehicle/add-conversion-vehiculo`;
    const result = await axios.post(url, json, {
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

export async function listVehicleConversion(placa) {
  try {
    const url = `${base_host}/vehicle/list-conversion-vehiculo/${placa}`;
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

export async function updateVehicle(placa) {
  try {
    const url = `${base_host}/vehicle/update-vehicle/${placa}`;
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

export async function updateConvertionVehicle(data) {
  try {
    const url = `${base_host}/vehicle/update-dates-conversion-vehiculo/${data.id}`;
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
