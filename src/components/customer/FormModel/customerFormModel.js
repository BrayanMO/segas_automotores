const customerFormModel = {
  formId: "customerForm",
  formField: {
    firstName: {
      name: "firstName",
      label: "Nombres",
      requiredErrorMsg: "Sus nombres son requeridos",
    },
    lastName: {
      name: "lastName",
      label: "Apellidos",
      requiredErrorMsg: "Sus apellidos son requeridos",
    },
    address: {
      name: "address",
      label: "Direccion",
      requiredErrorMsg: "La direccion es requerida",
    },
    document: {
      name: "document",
      label: "Documento de identidad",
      requiredErrorMsg: "El numero de documento es requerido",
      invalidErrorMsgDNI: "El Tipo Documento DNI no puede ser mayor ni menor a 8 digitos",
      invalidErrorMsgCarnet:
        "El Tipo Documento Carnet de Extranjeria no puede ser mayor ni menor a 12 digitos",
      invalidErrorMsgPasaporte:
        "El Tipo Documento Pasaporte no puede ser mayor ni menor a 12 digitos",
    },
    tipo_document: {
      name: "tipo_document",
      label: "Tipo de Documento",
      requiredErrorMsg: "Seleccione su tipo de documento",
    },
    phone: {
      name: "phone",
      label: "N° de Celular",
      requiredErrorMsg: "El numero de celular es requerido",
      invalidErrorMsg: "El numero de celular no es valido (Ejemplo: 123456789)",
    },
    email: {
      name: "email",
      label: "Correo Electronico",
      requiredErrorMsg: "La direccion de correo electronico es requerida",
      invalidErrorMsg: "Ingrese un correo electronico valido",
    },
    made: {
      name: "made",
      label: "Marca",
      requiredErrorMsg: "La marca del vehiculo es requerida",
    },
    model: {
      name: "model",
      label: "Modelo",
      requiredErrorMsg: "El modelo del vehiculo es requerido",
    },
    annio: {
      name: "annio",
      label: "Año",
      requiredErrorMsg: "El año del vehiculo es requerido",
      invalidErrorMsg: "Digite un año valido. (Ejem. 1999)",
    },
    placa: {
      name: "placa",
      label: "N° de Placa",
      requiredErrorMsg: "La placa del vehiculo es requerida",
      invalidErrorMsg: "N° de placa invalido (Ejemplo: AEF-717)",
    },
    kilometraje: {
      name: "kilometraje",
      label: "Kilometraje",
      requiredErrorMsg: "El numero de kilometros de como ingresa el vehiculo es requerido",
    },
    observations: {
      name: "observations",
      label: "Observaciones",
      requiredErrorMsg: "Observaciones del vehiculo son requeridas",
    },
    certificate: {
      name: "certificate",
      label: "Estado del Certificado",
      requiredErrorMsg: "Selecione el estado de su certificado",
    },
  },
};

export default customerFormModel;
