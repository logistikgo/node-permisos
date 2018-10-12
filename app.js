"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PermisoController = require("./controllers/PermisoxTipoUsuario");
const Estructura = require("./controllers/EstructuraMenus");
const PermisoxUsuarioController = require("./controllers/PermisoxUsuario");
const Versiones = require("./controllers/Versiones");
const UsuariosxVersion = require("./controllers/UsuariosxVersion");
const ColumnasxTipoUsuario = require("./controllers/ColumnasxTipoUsuario");
const ColumnasxUsuario = require("./controllers/ColumnasxUsuario");
const ElementosxTipoUsuario = require("./controllers/ElementosxTipoUsuario");
const ElementosxUsuario = require("./controllers/ElementosxUsuario");
const UnidadesMedidaxClienteFiscal = require("./controllers/UnidadesMedidaxClienteFiscal");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/estructuramenu/", Estructura.getEstructura);

app.get("/api/permiso/", PermisoController.getPermiso);
app.get(
  "/api/permiso/:idTipoUsuario",
  PermisoController.getPermisoByIDTipoUsuario
);
app.get("/api/permisoxusuario/", PermisoxUsuarioController.getPermisoxUsuario);
app.get(
  "/api/permisoxusuario/:idUsuario",
  PermisoxUsuarioController.getPermisoxUsuarioByIDUsuario
);

app.get(
  "/api/columnasxtipousuario/:idTipoUsuario",
  ColumnasxTipoUsuario.getColumnasByIDTipoUsuario
);

/*app.get(
  "/api/columnasxusuario/:idUsuario",
  ColumnasxUsuario.getColumnasByIDUsuario
);*/

app.get(
  "/api/elementosxtipousuario/:idTipoUsuario",
  ElementosxTipoUsuario.getElementosByIDTipoUsuario
);
app.get(
  "/api/elementosxusuario/:idUsuario",
  ElementosxUsuario.getElementosByIDUsuario
);

app.get("/api/versiones/", Versiones.getVersiones);
app.get("/api/versiones/:entorno", Versiones.getVersiones);

app.get("/api/lastversion/:entorno", Versiones.getUltimaVersion);
app.get("/api/lastversion/", Versiones.getUltimaVersion);

app.get("/api/usuarioxversion", UsuariosxVersion.getUsuarioxVersion);
app.post("/api/usuarioxversion", UsuariosxVersion.postUsuarioxVersion);

app.post("/api/modulos", PermisoController.saveModulo);
app.delete("/api/modulos/:idTipoUsuario", PermisoController.deleteModulo);
app.post("/api/submodulos", PermisoController.saveSubModulo);
app.delete("/api/submodulos/:idTipoUsuario", PermisoController.deleteSubModulo);

app.get("/api/columnasxusuario/", ColumnasxUsuario._get);

app.get(
  "/api/unidadesmedidaxclientefiscal/:idClienteFiscal",
  UnidadesMedidaxClienteFiscal.getUnidadesMedidaxClienteFiscal
);

module.exports = app;
