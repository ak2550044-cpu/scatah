const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const isloggedin = require("../middlewares/isloggedin");

router.post("/create", isloggedin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Please select a product image.");
      return res.redirect("/owners/admin");
    }

    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    await productModel.create({
      image,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "Product created successfully.");
    res.redirect("/shop");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports=router;
