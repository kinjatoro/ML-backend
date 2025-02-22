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
        return res.status(400).json({ status: 400, message: "Id must be present" });
    }

    console.log("📌 Valor recibido de fecha3 en request:", req.body.fecha3);

    // ✅ Normalizar fecha3 antes de enviarla al servicio
    let fecha3 = req.body.fecha3;
    if (!fecha3 || fecha3 === "" || fecha3 === "null" || fecha3 === "undefined") {
        fecha3 = null;
    } else {
        try {
            fecha3 = new Date(fecha3);
            if (isNaN(fecha3.getTime())) {
                console.error("🚨 Fecha3 con formato inválido en request:", req.body.fecha3);
                fecha3 = null;
            }
        } catch (error) {
            console.error("⚠️ Error al convertir fecha3 en request:", error);
            fecha3 = null;
        }
    }

    var contrato = {
        id: req.body._id,
        nombre: req.body.nombre || null,
        material: req.body.material || null,
        localidad: req.body.localidad || null,
        direccion: req.body.direccion || null,
        calles: req.body.calles || null,
        telefono: req.body.telefono || null,
        bacha: req.body.bacha || null,
        medidas: req.body.medidas || null,
        factura: req.body.factura || null,
        pago: req.body.pago || null,
        descripcion: req.body.descripcion || null,
        fecha1: req.body.fecha1 || null,
        fecha2: req.body.fecha2 || null,
        fecha3: fecha3, 
        estado: req.body.estado || null
    };

    try {
        var updatedContrato = await ContratoService.modificarContratacion(contrato);
        return res.status(200).json({ status: 200, data: updatedContrato, message: "Successfully Updated Contrato" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


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

