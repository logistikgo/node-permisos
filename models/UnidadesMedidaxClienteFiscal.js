"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unidadesMedidaxClienteFiscalSchema = Schema(
  {
    IDClienteFiscal: Number,
    ClienteFiscal: String,
    UnidadesMedida: [
      {
        IDUnidadMedida: Number,
        UnidadMedida: String,
        Group: Number
      }
    ]
  },
  { collection: "UnidadesMedidaxClienteFiscal" }
);

module.exports = mongoose.model(
  "UnidadesMedidaxClienteFiscal",
  unidadesMedidaxClienteFiscalSchema
);
