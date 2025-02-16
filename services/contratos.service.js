var Contrato = require('../models/contratos');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

exports.publicarContratacion = async function (contrato) {
    try {
        const newContrato = new Contrato({
            nombre: contrato.nombre || null,
            material: contrato.material || null,
            localidad: contrato.localidad || null,
            direccion: contrato.direccion || null,
            calles: contrato.calles || null,
            telefono: contrato.telefono || null,
            bacha: contrato.bacha || null,
            medidas: contrato.medidas || null,
            factura: contrato.factura || null,
            pago: contrato.pago || null,
            descripcion: contrato.descripcion || null,
            fecha1: contrato.fecha1 || null,
            fecha2: contrato.fecha2 || null,
            fecha3: contrato.fecha3 || null,
            estado: contrato.estado || null,

            notificaciones: {
                notificacion24h: contrato.notificaciones?.notificacion24h || null,
                notificacion1h: contrato.notificaciones?.notificacion1h || null,
            },

            enviada24h: contrato.enviada24h ?? false,
            enviada1h: contrato.enviada1h ?? false,
        });

        const savedContrato = await newContrato.save();

        return jwt.sign(
            { id: savedContrato._id },
            process.env.SECRET,
            { expiresIn: 86400 } // 24 horas
        );

    } catch (e) {
        console.error("Error al crear contrato:", e);
        throw new Error("Error while Creating Contrato");
    }
};

exports.modificarContratacion = async function (contrato) {
    try {
        const oldContrato = await Contrato.findById(contrato._id);
        if (!oldContrato) {
            throw new Error("Contrato not found");
        }

        oldContrato.nombre = contrato.nombre ?? oldContrato.nombre;
        oldContrato.material = contrato.material ?? oldContrato.material;
        oldContrato.localidad = contrato.localidad ?? oldContrato.localidad;
        oldContrato.direccion = contrato.direccion ?? oldContrato.direccion;
        oldContrato.calles = contrato.calles ?? oldContrato.calles;
        oldContrato.telefono = contrato.telefono ?? oldContrato.telefono;
        oldContrato.bacha = contrato.bacha ?? oldContrato.bacha;
        oldContrato.medidas = contrato.medidas ?? oldContrato.medidas;
        oldContrato.factura = contrato.factura ?? oldContrato.factura;
        oldContrato.pago = contrato.pago ?? oldContrato.pago;
        oldContrato.descripcion = contrato.descripcion ?? oldContrato.descripcion;
        oldContrato.fecha1 = contrato.fecha1 ?? oldContrato.fecha1;
        oldContrato.fecha2 = contrato.fecha2 ?? oldContrato.fecha2;
        oldContrato.fecha3 = contrato.fecha3 ?? oldContrato.fecha3;
        oldContrato.estado = contrato.estado ?? oldContrato.estado;

        if (contrato.enviada24h !== undefined) oldContrato.enviada24h = contrato.enviada24h;
        if (contrato.enviada1h !== undefined) oldContrato.enviada1h = contrato.enviada1h;

        return await oldContrato.save();

    } catch (e) {
        console.error("Error al modificar contrato:", e);
        throw new Error("An error occurred while updating the Contrato");
    }
};

exports.borrarContratacion = async function (id) {
    try {
        var deleted = await Contrato.deleteOne({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Contrato Could not be deleted")
        }
        return deleted;
    } catch (e) {
        console.log(e);
        throw Error("Error Occured while Deleting the Contrato")
        
    }

}

exports.getContrataciones = async function () {
    try {
        var Contratos = await Contrato.find({estado: 'activo'})
        return Contratos;
    } catch (e) {
        throw Error('Error while getting Contratos');
    }
}