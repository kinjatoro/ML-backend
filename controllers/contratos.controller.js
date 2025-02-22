var ContratoService = require('../services/contratos.service');

exports.publicarContratacion = async function (req, res, next) {
    
     console.log("Valor recibido de fecha3:", req.body.fecha3); // 🔍 Debugging
    
    var Contrato = {
        nombre: req.body.nombre,
        material: req.body.material,
        localidad: req.body.localidad,
        direccion: req.body.direccion,
        calles: req.body.calles,
        telefono: req.body.telefono,
        bacha: req.body.bacha,
        medidas: req.body.medidas,
        factura: req.body.factura,
        pago: req.body.pago,
        descripcion: req.body.descripcion,
        fecha1: req.body.fecha1,
        fecha2: req.body.fecha2,
        fecha3: req.body.fecha3,
        estado: 'activo',
    }
    try {
        
        var createdContrato = await ContratoService.publicarContratacion(Contrato);
       
        return res.status(201).json({createdContrato, message: "Succesfully Created Contract"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Contract Creation was Unsuccesfull"})
    }
}

exports.modificarContratacion = async function (req, res, next) {
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id be present"})
    }

    const fecha3 = req.body.fecha3 ? new Date(req.body.fecha3) : null;


    var Contrato = {
        id: req.body._id ? req.body._id : null,
        nombre: req.body.nombre ? req.body.nombre : null,
        material: req.body.material ? req.body.material : null,
        localidad: req.body.localidad ? req.body.localidad : null,
        direccion: req.body.direccion ? req.body.direccion : null,
        calles: req.body.calles ? req.body.calles : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        bacha: req.body.bacha ? req.body.bacha : null,
        medidas: req.body.medidas ? req.body.medidas : null,
        factura: req.body.factura ? req.body.factura : null,
        pago: req.body.pago ? req.body.pago : null,
        descripcion: req.body.descripcion ? req.body.descripcion : null,
        fecha1: req.body.fecha1 ? req.body.fecha1 : null,
        fecha2: req.body.fecha2 ? req.body.fecha2 : null,
        fecha3: fecha3,
        estado: req.body.estado ? req.body.estado : null,

        notificaciones: {
            notificacion24h: fecha3 ? new Date(fecha3.getTime() - 24 * 60 * 60 * 1000) : null,
            notificacion1h: fecha3 ? new Date(fecha3.getTime() - 1 * 60 * 60 * 1000) : null,
        }
    }

    try {
        var updatedContrato = await ContratoService.modificarContratacion(Contrato);
        return res.status(200).json({status: 200, data: updatedContrato, message: "Succesfully Updated Contrato"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.borrarContratacion = async function (req, res, next) {
    
    try {
        var id = req.query.id;
        var deleted = await ContratoService.borrarContratacion(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getContrataciones = async function (req, res, next) {
    
    try {
        var id = req.query.id
        var Contratos = await ContratoService.getContrataciones(id)
        return res.status(200).json({status: 200, data: Contratos, message: "Succesfully Contratos Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

