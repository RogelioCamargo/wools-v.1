const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./configs/mongodb");
require("./configs/passport");
const compression = require("compression");
const helmet = require("helmet");
let flash = require("connect-flash");

// import routes
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const warehouseRouter = require("./routes/warehouseRouter");
const productRouter = require("./routes/productRouter");
const announcementRouter = require("./routes/announcementRouter");

const app = express();

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(helmet());
app.use(flash());

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collection: "sessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success"); 
  next();
});

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/warehouses", warehouseRouter); 
app.use("/products", productRouter);
app.use("/announcements", announcementRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
