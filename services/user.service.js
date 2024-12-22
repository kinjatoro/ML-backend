
var User = require('../models/usuario');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


_this = this

exports.createUser = async function (user,urlImg) {
  
    console.log("prueba2")
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    
    var newUser = new User({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        telefono: user.telefono,
        titulo: user.titulo,
        experiencia: user.experiencia,
        imagen: urlImg
    })

    try {
    
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            telefono: savedUser.telefono,
            titulo: savedUser.titulo,
            experiencia: savedUser.experiencia,
            imagen: savedUser.imagen
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
      
        console.log(e)    
        throw Error("Error while Creating User")
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id,
            name: _details.name,
            email: _details.email,
            telefono: _details.telefono,
            titulo: _details.titulo,
            experiencia: _details.experiencia,
            imagen: _details.imagen
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return  token;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}
