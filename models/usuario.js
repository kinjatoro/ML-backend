
const mongoose = require('mongoose');

//original de sarasa


var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    titulo: {
        type: String,
        required: true
    },
    experiencia: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
});


UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('usuario', UserSchema)

module.exports = User;
