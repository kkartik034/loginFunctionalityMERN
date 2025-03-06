// const { signup, login } = require('../Controllers/AuthController');
// const { signupValidation } = require('../Middlewares/AuthValidation');

const express = require('express'); // ✅ Import express before using it
const ensureAuthenticated = require('../Middlewares/Auth');
const router = express.Router();    // ✅ Use express.Router()


router.get('/', ensureAuthenticated , (req,res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:2222
        },
        {
            name:"mobile",
            price:2222
        },
        {
            name:"mobile",
            price:2222
        }
    ])
});

module.exports = router; 