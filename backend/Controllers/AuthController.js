const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({
          message: "user is already exist, you can login",
          sucess: false,
        });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup success",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "internal server err",
      success: false,
    });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const errorMessage = 'Auth failed email or password is wrong';
      if (!user) {
        return res
          .status(403)
          .json({
            message: "errorMessage",
            success: false,
          });
      }

      const isPassEqual = await bcrypt.compare(password, user.password);
      if(!isPassEqual){
        return res
        .status(403)
        .json({
          message: "errorMessage",
          sucess: false,
        });
    }

      
 const jwtToken = jwt.sign({email:user.email, _id:user._is},
    process.env.JWT_SECRET,
    { expiresIn:'24h'}
 )
      res.status(200).json({
        message: "login success",
        success: true,
        jwtToken,
        email,
        name:user.name
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "internal server err",
        success: false,
      });
    }
  };

//   const getAllData = async(req, res) => {
//     let products = await findById();
//     return res.send(products);
//   }
  

module.exports = {
  signup,
  login
//   getAllData
};
