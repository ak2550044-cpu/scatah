
const usermodel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");
const {generatetoken}=require("../utils/generatetoken");







module.exports.registeruser = async (req, res) => {
    
try{
    let {email,password,fullname}=req.body;
    let user=await usermodel.findOne({email:email});
    if(user) return res.status(401).send("Already have account,please login");

    
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
        if(err)return res.send(err.message);
        else {
            let user=await usermodel.create({
    email,
    password:hash,
    fullname
});
   let token=generatetoken(user);
   res.cookie("token",token);
   res.redirect("/owners/admin");
        }
        
        
    });
});



}
catch(err){
    console.log(err.message);
    
}



}
module.exports.loginuser = async (req, res) => {
    let {email,password}=req.body;
   let user =await usermodel.findOne({email:email});
   if(!user) return res.send("Email or password incorrect");


   bcrypt.compare(password,user.password, (err,result)=>{
    if(result){
        let token=generatetoken(user);
        res.cookie("token",token);
        res.redirect("/shop");

    } else {
        res.status(401).send("Email or password incorrect");
    }
   })
   

};

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};
