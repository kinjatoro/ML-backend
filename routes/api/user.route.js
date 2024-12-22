var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/registration',upload.single('file'), UserController.createUser)
router.post('/login/',UserController.loginUser)
router.get('/users', UserController.getUsers)
router.get('/getuser', UserController.getUserById)

// Export the Router
module.exports = router;


