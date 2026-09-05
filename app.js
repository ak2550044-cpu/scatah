const express = require('express');
const path = require('path');
const indexRouter=require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const expressSession =require("express-session");
const flash =require("connect-flash");
require("dotenv").config();

const app = express();
const cookieparser = require('cookie-parser');

const db = require("./config/mongoose-connection");
// Import your router file
// Import your router file

app.use(cookieparser());
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:process.env.EXPRESS_SESSION_SECRET,
})
);
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/",indexRouter);

app.use('/owners', ownersRouter );
app.use('/users', usersRouter );
app.use('/products', productsRouter );
app.get("/", function(req,res){
 res.render('index');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
