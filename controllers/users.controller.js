var UserService = require('../services/user.service');


_this = this;



exports.createUser = async function (req, res, next) {
    var User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        telefono: req.body.telefono,
        titulo: req.body.titulo,
        experiencia: req.body.experiencia,
    }
    try {
        const fileBuffer = req.file.buffer;
        const urlImg = await CloudinaryService.uploadImage(fileBuffer);
        var createdUser = await UserService.createUser(User, urlImg);
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (e) {
        // Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}


exports.loginUser = async function (req, res, next) {
    // Req.Body contains the form submit values.

    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        if (loginUser===0)
            return res.status(400).json({message: "Error en la contraseña"})
        else
            return res.status(201).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        // Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}



exports.updateUser = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var User = {
       
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }

    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}









exports.getUsersByMail = async function (req, res, next) {

    try {
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10;
        let filtro= {email: req.body.email}
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}






exports.getUsers = async function (req, res, next) {
    
    try {
        var Users = await UserService.getUsers()
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        // Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}


    
exports.removeUser = async function (req, res, next) {

    
    try {
        var id = req.body.id;
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}  

exports.enviarMail = async function (req, res, next) {

    
    try {
        var mail = req.body.mail;
        filtro = {email: req.body.mail}
        var User = await UserService.getUser(filtro)

        var id = User[0]._id;
        console.log(id);
        await MailService.sendMail(
            mail,
            'Recupero contraseña - Neilo',
            `Por favor, hacé clic en el siguiente enlace para recuperar tu contraseña:
            http://neilo.vercel.app/actualizar/${User[0]._id}`
        );
        res.status(200).json(User);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

}

exports.modificarPassword = async function (req, res, next) {

    try {
        var id = req.body.id;
        var password = req.body.password;
        var updatedUser = await UserService.updateUser(id,password)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getUserById = async function (req, res, next) {
    try {
        let filtro= {_id: req.query.id}
        var User = await UserService.getUser(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: User, message: "Succesfully User Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}