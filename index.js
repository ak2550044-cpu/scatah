const express = require('express');

const isloggedin = require('../middlewares/isloggedin');
const productModel = require('../models/product-model');
const router = express.Router();
const userModel = require("../models/user-model");


router.get('/', (req, res) => {
   let error =req.flash("error");
   res.render("index",{error,loggedin:false});



});
router.post('/addtocart/:productid', isloggedin, async (req, res) => {
   let user=await userModel.findOne({email:req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success", "Added  to cart");
   res.redirect("/shop");

});
router.get('/cart', isloggedin, async (req, res) => {
   const user = await userModel.findOne({ email: req.user.email }).populate("cart");
   const success = req.flash("success");
   const error = req.flash("error");
   res.render("cart", { cart: user ? user.cart : [], success, error, loggedin: true });
});

router.post('/removefromcart/:productid', isloggedin, async (req, res) => {
   const user = await userModel.findOne({ email: req.user.email });
   const itemIndex = user.cart.findIndex((item) => item.toString() === req.params.productid);

   if (itemIndex !== -1) {
      user.cart.splice(itemIndex, 1);
      await user.save();
      req.flash("success", "Item removed from your cart.");
   }

   res.redirect('/cart');
});


router.get('/shop',isloggedin,async (req, res) => {
   let product= await productModel.find();
   let success = req.flash("success");
   let error = req.flash("error");
   res.render("shop", { product, success, error, loggedin: true });



});
router.get('/profile', isloggedin, (req, res) => {
   res.render("profile", { user: req.user, loggedin: true });
});
router.get('/logout',isloggedin,(req, res) => {
   res.clearCookie("token");
   res.redirect("/");
});


module.exports = router;
