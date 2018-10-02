/*'use strict'

const ColumnasxUsuario = require('../models/ColumnasxUsuario');


function getColumnasByIDUsuario(req,res) {

	let idUsuario = req.params.idUsuario;

	ColumnasxUsuario.find({IDUsuario:idUsuario}, (err, columnas) => {
		if(err){
			return res.status(500).send({message:"Error al realizar la peticion"});
		}

		if(!columnas || columnas.length == 0){
			return res.status(500).send({message:"No existen datos"});
		}

		res.status(200).send(columnas[0]);
	});

}

module.exports = {
	getColumnasByIDUsuario,
}*/

'use strict'

const columnasxusuario = require('../models/ColumnasxUsuario');

function _get(req, res) {
    let idUsuario = parseInt(req.query.idUsuario);
    let idTable = req.query.idTable;

    columnasxusuario.find({idUsuario: idUsuario, idTabla: idTable})
        .then((conf) => {
            conf = conf.sort((a,b)=>{
                a.indice - b.indice
            });
            res.status(200).send(conf);
        })
        .catch((error) => {
            return res.status(500).send({
                message: "Error al realizar la peticion"
            });
        });
}

module.exports = {
    _get
}
