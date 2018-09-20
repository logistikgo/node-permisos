"use strict";

const PermisoxTipoUsuario = require("../models/PermisoxTipoUsuario");

function getPermiso(req, res) {
  PermisoxTipoUsuario.find({}, (err, permisos) => {
    if (err) {
      return res.status(500).send({ message: "Error al realizar la peticion" });
    }

    if (!permisos || permisos.length == 0) {
      return res.status(500).send({ message: "No existen permisos" });
    }

    res.status(200).send(permisos);
  });
}

function getPermisoByIDTipoUsuario(req, res) {
  let idTipoUsuario = req.params.idTipoUsuario;

  PermisoxTipoUsuario.find(
    { IDTipoUsuario: idTipoUsuario },
    (err, permisos) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error al realizar la peticion" });
      }

      if (!permisos || permisos.length == 0) {
        return res.status(500).send({ message: "No existen permisos" });
      }

      res.status(200).send(permisos[0]);
    }
  );
}

async function saveModulo(req, res) {
  let queryFind = PermisoxTipoUsuario.findOne({
    IDTipoUsuario: req.body.IDTipoUsuario
  });
  let currentTipoUsuario = await queryFind.exec();
  if (currentTipoUsuario == undefined) {
    let permiso = new PermisoxTipoUsuario();
    permiso.IDTipoUsuario = req.body.IDTipoUsuario;
    permiso.Modulos.push({ ID: req.body.IDMenu });
    permiso.save(err => {
      if (err) {
        console.log("Error al guardar el modulo.");
        res.status(500).send({ message: `Error al guardar el modulo.` });
      }

      console.log("Modulo guardado correctamente.");
      res.status(200).send({ message: `Modulo guardado correctamente.` });
    });
  } else {
    currentTipoUsuario.Modulos.push({ ID: req.body.IDMenu });
    currentTipoUsuario.save(err => {
      if (err) {
        console.log(`Error al guardad el modulo.`);
        res.status(500).send({ message: `Error al guardar el modulo.` });
      }

      console.log(`Modulo guardado correctamente.`);
      res.status(200).send({ message: `Modulo guardado correctamente.` });
    });
  }
}

async function deleteModulo(req, res) {
  PermisoxTipoUsuario.findOneAndUpdate(
    { IDTipoUsuario: req.params.idTipoUsuario },
    { $pull: { Modulos: { ID: { $eq: req.body.IDMenu } } } },
    (err, item) => {
      if (err) {
        console.log("Error al eliminar el modulo");
        res.status(500).send({ message: `Error al eliminar el modulo.` });
      }

      console.log("Modulo eliminado correctamente.");
      res.status(200).send({ message: `Modulo eliminado correctamente.` });
    }
  );
}

async function saveSubModulo(req, res) {
  let queryFind = PermisoxTipoUsuario.findOne({
    IDTipoUsuario: req.body.IDTipoUsuario
  });
  let currentTipoUsuario = await queryFind.exec();
  if (currentTipoUsuario == null) {
    let permiso = new PermisoxTipoUsuario();
    permiso.IDTipoUsuario = req.body.IDTipoUsuario;
    permiso.Modulos.push({ ID: req.body.IDMenu });
    let currentModulo = permiso.Modulos.filter(f => {
      return f.ID == req.body.IDMenu;
    });
    currentModulo[0].SubModulos.push({ ID: req.body.IDSubMenu });
    permiso.save(err => {
      if (err) {
        console.log("Error al guardar el sub-modulo.");
        res.status(500).send({ message: `Error al guardar el sub-modulo.` });
      }
      console.log("Sub-Modulo guardado correctamente.");
      res.status(200).send({ message: `Sub-Modulo guardado correctamente.` });
    });
  } else {
    let verifyModulo = currentTipoUsuario.Modulos.filter(f => {
      return f.ID == req.body.IDMenu;
    });

    if (verifyModulo.length == 0) {
      currentTipoUsuario.Modulos.push({ ID: req.body.IDMenu });
    }

    let currentModulo = currentTipoUsuario.Modulos.filter(f => {
      return f.ID == req.body.IDMenu;
    });

    currentModulo[0].SubModulos.push({ ID: req.body.IDSubMenu });

    currentTipoUsuario.save(err => {
      if (err) {
        console.log(`Error al guardar el sub-modulo.`);
        res.status(500).send({ message: `Error al guardar el sub-modulo.` });
      }
      console.log(`Sub-Modulo guardado correctamente.`);
      res.status(200).send({ message: `Sub-Modulo guardado correctamente.` });
    });
  }
}

async function deleteSubModulo(req, res) {
  PermisoxTipoUsuario.findOneAndUpdate(
    { IDTipoUsuario: req.params.idTipoUsuario },
    {
      $pull: {
        "Modulos.$[menu].SubModulos": {
          $elemMatch: {
            ID: { $eq: req.body.IDSubMenu }
          }
        }
      }
    },
    { arrayFilters: [{ "menu.ID": req.body.IDMenu }], multi: true },
    (err, item) => {
      if (err) {
        console.log("Error al eliminar el sub-modulo.");
        res.status(500).send({ message: `Error al eliminar el sub-modulo.` });
      }

      console.log("Sub-Modulo eliminado correctamente.");
      res.status(200).send({ message: `Sub-Modulo eliminado correctamente.` });
    }
  );
}

module.exports = {
  getPermiso,
  getPermisoByIDTipoUsuario,
  saveModulo,
  deleteModulo,
  saveSubModulo,
  deleteSubModulo
};
