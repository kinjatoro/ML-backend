var ContratoService = require('../services/contratos.service');

exports.publicarContratacion = async function (req, res) {
    try {
        const fecha3 = req.body.fecha3 ? new Date(req.body.fecha3) : null;

        const Contrato = {
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
            estado: 'activo',

            notificaciones: {
                notificacion24h: fecha3 ? new Date(fecha3.getTime() - 24 * 60 * 60 * 1000) : null,
                notificacion1h: fecha3 ? new Date(fecha3.getTime() - 1 * 60 * 60 * 1000) : null,
            },

            enviada24h: false,
            enviada1h: false,
        };

        const createdContrato = await ContratoService.publicarContratacion(Contrato);
        return res.status(201).json({ createdContrato, message: "Successfully Created Contract" });

    } catch (e) {
        console.error("Error al crear contrato:", e);
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.modificarContratacion = async function (req, res) {
    try {
        if (!req.body._id) {
            return res.status(400).json({ status: 400, message: "ID is required" });
        }

        const fecha3 = req.body.fecha3 ? new Date(req.body.fecha3) : null;

        const Contrato = {
            _id: req.body._id,
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
            estado: req.body.estado || null,

            notificaciones: {
                notificacion24h: fecha3 ? new Date(fecha3.getTime() - 24 * 60 * 60 * 1000) : null,
                notificacion1h: fecha3 ? new Date(fecha3.getTime() - 1 * 60 * 60 * 1000) : null,
            }
        };

        const updatedContrato = await ContratoService.modificarContratacion(Contrato);
        return res.status(200).json({ status: 200, data: updatedContrato, message: "Successfully Updated Contrato" });

    } catch (e) {
        console.error("Error al modificar contrato:", e);
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

