const express = require('express');
const router = express.Router();
const {
    registeruser,
    loginuser,
    logout
} = require("../controllers/authController");

const isloggedin = require("../middlewares/isloggedin");


router.get('/', (req,res)=>{
    res.send("hey it's working");

});

router.post("/register",registeruser);

router.post("/login",loginuser);

router.post("/logout",logout);

module.exports=router;