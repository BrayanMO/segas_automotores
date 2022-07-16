### INFORMACIÓN

Este repositorio esta enfocado en realizar una ApiRest sencilla, que implemente tecnologia como JWT ([JSON Web Tokens](https://jwt.io/ "JSON Web Tokens")), asi como tambien conexion a base de datos MySQL.

---

### DESGLOSE DEL PROYECTO

- El proyecto consta de la siguiente estructura: carpeta de recursos(src), archivo del servidor (app.js)

* La carpeta **src**, tendra a las siguientes carpetas:
  - **config** --> esta a su vez tendra las siguientes carpetas:
    - **auth** --> en esta carpeta se realizaran todo lo relacionado al token y la verificación del mismo.
    - **db** --> en esta se realizara la conexion a la base de datos MySQL
    - **json** --> aqui se almacenara el payload de cifrado para el token
  - **controller** --> aqui se almacenara los archivos de comunicacion con el servidor
  - **model** -->aqui se almacenaran todos los modelos que se intercomunicaran con la base de datos
  - **routes** --> en esta estaran todas las rutas que permitira la api
  - **test** --> archivos http que serviran de pruebas a la Api
    **app.js** --> archivo que levantara el servidor

### Iniciar el Proyecto

#### Git Clone

`git clone {link-repositorio}`

#### Instalar Modulos

`npm install` or ` yarn install`

#### Levantar servidor

- Modo dev
  `npm dev` or `yarn dev`

- Modo production
  `npm start` or `yarn start`

### Dependencias de Proyecto

- cors
- express
- jsonwebtoken
- morgan
- mysql
