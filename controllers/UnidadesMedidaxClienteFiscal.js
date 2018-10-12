"use strict";

const UnidadesMedidaxClienteFiscal = require("../models/UnidadesMedidaxClienteFiscal");

function getUnidadesMedidaxClienteFiscal(req, res) {
  let idClienteFiscal = req.params.idClienteFiscal;

  UnidadesMedidaxClienteFiscal.find(
    { IDClienteFiscal: idClienteFiscal },
    (err, umxcf) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error al realizar la peticion" });
      }

      if (!umxcf || umxcf.length == 0) {
        return res.status(500).send({ message: "No existen unidades medida" });
      }

      res.status(200).send(umxcf);
    }
  );
}

module.exports = {
  getUnidadesMedidaxClienteFiscal
};
