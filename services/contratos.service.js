var Contrato = require('../models/contratos');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

exports.publicarContratacion = async function (contrato) {
    let fecha3 = contrato.fecha3;

    console.log("📌 Fecha3 recibida en el servicio:", fecha3);

    // ✅ Si fecha3 es undefined, null, "", "null" (string) o "undefined" (string), la seteamos a null
    if (!fecha3 || fecha3 === "" || fecha3 === "null" || fecha3 === "undefined") {
        fecha3 = null;
    } else {
        try {
            fecha3 = new Date(fecha3);
            if (isNaN(fecha3.getTime())) {
                console.error("🚨 Fecha3 con formato inválido:", contrato.fecha3);
                fecha3 = null;  // Evita errores si el formato es incorrecto
            }
        } catch (error) {
            console.error("⚠️ Error al convertir fecha3:", error);
            fecha3 = null;
        }
    }

    const ahora = new Date();
    let notificacion24h = null;
    let notificacion1h = null;

    // Solo calcular notificaciones si fecha3 es válida y está al menos a 24 horas de ahora
    if (fecha3 && fecha3 > ahora) {
        const diferenciaMs = fecha3.getTime() - ahora.getTime();
        const horasRestantes = diferenciaMs / (1000 * 60 * 60); // Convertimos a horas

        if (horasRestantes > 24) {
            notificacion24h = new Date(fecha3.getTime() - 24 * 60 * 60 * 1000);
        }
        if (horasRestantes > 1) {
            notificacion1h = new Date(fecha3.getTime() - 1 * 60 * 60 * 1000);
        }

        console.log(`🕒 Horas restantes para fecha3: ${horasRestantes}`);
        console.log(`📅 Notificación 24h: ${notificacion24h}`);
        console.log(`📅 Notificación 1h: ${notificacion1h}`);
    } else {
        console.warn("⚠️ No se programarán notificaciones porque fecha3 es nula o está demasiado cerca.");
    }

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
        fecha3: fecha3,  // ✅ Ahora siempre tiene un valor válido (null o Date)

        estado: contrato.estado || "activo",

        notificaciones: {
            notificacion24h,
            notificacion1h,
        },

        enviada24h: false,
        enviada1h: false,
    });

    try {
        console.log("✅ Guardando contrato con fecha3:", fecha3);
        const savedContrato = await newContrato.save();
        console.log("🎉 Contrato guardado correctamente:", savedContrato);
        return savedContrato;
    } catch (e) {
        console.error("🚨 Error al guardar contrato:", e);
        throw Error("Error while Creating Contrato");
    }
};



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

    const fecha3 = contrato.fecha3 ? new Date(contrato.fecha3) : oldContrato.fecha3;

    oldContrato.nombre = contrato.nombre ? contrato.nombre : oldContrato.nombre;
    oldContrato.material = contrato.material ? contrato.material : oldContrato.material;
    oldContrato.localidad = contrato.localidad ? contrato.localidad : oldContrato.localidad;
    oldContrato.direccion = contrato.direccion ? contrato.direccion : oldContrato.direccion;
    oldContrato.calles = contrato.calles ? contrato.calles : oldContrato.calles;
    oldContrato.telefono = contrato.telefono ? contrato.telefono : oldContrato.telefono;
    oldContrato.bacha = contrato.bacha ? contrato.bacha : oldContrato.bacha;
    oldContrato.medidas = contrato.medidas ? contrato.medidas : oldContrato.medidas;
    oldContrato.factura = contrato.factura ? contrato.factura : oldContrato.factura;
    oldContrato.pago = contrato.pago ? contrato.pago : oldContrato.pago;
    oldContrato.descripcion = contrato.descripcion ? contrato.descripcion : oldContrato.descripcion;
    oldContrato.fecha1 = contrato.fecha1 ? contrato.fecha1 : oldContrato.fecha1;
    oldContrato.fecha2 = contrato.fecha2 ? contrato.fecha2 : oldContrato.fecha2;
    oldContrato.fecha3 = fecha3;
    oldContrato.estado = contrato.estado ? contrato.estado : oldContrato.estado;

    if (contrato.enviada24h !== undefined) oldContrato.enviada24h = contrato.enviada24h;
    if (contrato.enviada1h !== undefined) oldContrato.enviada1h = contrato.enviada1h;

    if (fecha3) {
        oldContrato.notificaciones.notificacion24h = new Date(fecha3.getTime() - 24 * 60 * 60 * 1000);
        oldContrato.notificaciones.notificacion1h = new Date(fecha3.getTime() - 1 * 60 * 60 * 1000);
        oldContrato.enviada24h = false; // 🔥 **Reiniciamos las flags**
        oldContrato.enviada1h = false;
    }

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