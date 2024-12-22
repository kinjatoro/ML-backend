var Contrato = require('../models/contratos');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

exports.publicarContratacion = async function (contrato) {
    const newContrato = new Contrato({
        nombre: contrato.nombre || null,
        material: contrato.material || null,
        localidad: contrato.localidad || null,
        direccion: contrato.direccion || null,
        telefono: contrato.telefono || null,
        bacha: contrato.bacha || null,
        medidas: contrato.medidas || null,
        factura: contrato.factura || null,
        pago: contrato.pago || null,
        descripcion: contrato.descripcion || null,
        fecha1: contrato.fecha1 || null,
        fecha2: contrato.fecha2 || null,
        estado: contrato.estado || null,
      });
      

    try {
        console.log(1)
        var savedContrato = await newContrato.save();
        console.log(2)
        var token = jwt.sign({
            id: savedContrato._id,
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
      
        console.log(e)    
        throw Error("Error while Creating Contrato")
    }

}

exports.modificarContratacion = async function (contrato) {
    var id = { _id: contrato.id }

    try {
        var oldContrato = await Contrato.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Contrato")
    }

    if (!oldContrato) {
        return false;
    }

    oldContrato.nombre = contrato.nombre ? contrato.nombre : oldContrato.nombre;
    oldContrato.material = contrato.material ? contrato.material : oldContrato.material;
    oldContrato.localidad = contrato.localidad ? contrato.localidad : oldContrato.localidad;
    oldContrato.direccion = contrato.direccion ? contrato.direccion : oldContrato.direccion;
    oldContrato.telefono = contrato.telefono ? contrato.telefono : oldContrato.telefono;
    oldContrato.bacha = contrato.bacha ? contrato.bacha : oldContrato.bacha;
    oldContrato.medidas = contrato.medidas ? contrato.medidas : oldContrato.medidas;
    oldContrato.factura = contrato.factura ? contrato.factura : oldContrato.factura;
    oldContrato.pago = contrato.pago ? contrato.pago : oldContrato.pago;
    oldContrato.descripcion = contrato.descripcion ? contrato.descripcion : oldContrato.descripcion;
    oldContrato.fecha1 = contrato.fecha1 ? contrato.fecha1 : oldContrato.fecha1;
    oldContrato.fecha2 = contrato.fecha2 ? contrato.fecha2 : oldContrato.fecha2;
    oldContrato.estado = contrato.estado ? contrato.estado : oldContrato.estado;

    try {
        var savedContrato = await oldContrato.save()
        return savedContrato;
    } catch (e) {
        throw Error("An Error occured while updating the Contrato");
    }
}

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