const { signup, login } = require('../Controllers/AuthController');
// const { signupValidation } = require('../Middlewares/AuthValidation');

const express = require('express'); // ✅ Import express before using it
const router = express.Router();    // ✅ Use express.Router()


router.post('/login', login);

router.post('/signup', signup );
// router.get('/data', getAllData )

module.exports = router; 