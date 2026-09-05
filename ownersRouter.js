const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owners-model");
const isloggedin = require("../middlewares/isloggedin");
if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){
        // Implementation for development environment
       let owners=await ownerModel.find();
       if(owners.length>0){
        return res
        .send(503)
        .send("You don;t have permission to create more than one owner");
       }
       let {fullname,email,password}=req.body;
       let createdowner = await ownerModel.create({
        fullname,
        email,
    password,
   
    
    
       });
       res.status(201).send("we can create new owner");

    });
}


router.get("/admin", isloggedin, function(req,res){
    let success=req.flash("success");
    let error=req.flash("error");
    res.render("createproduct", { success, error, loggedin: true });
});
//if(process.env === "development"){
  //  console.log("hey");
//}

module.exports = router;
