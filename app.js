var     express        = require("express"),
        app            = express(),
        bodyParser     = require("body-parser"),
        mongoose       = require("mongoose"),
        flash          = require("connect-flash"),
        passport       = require("passport"),
        LocalStrategy  = require("passport-local"),
        methodOverride = require("method-override"),
        Campground     = require("./models/campground"),
        seedDb         = require("./seeds"),
        Comment        = require("./models/comment"),
        User           = require("./models/user");

var     campgroundRoute = require("./routes/campgrounds"),
        commentRoute    = require("./routes/comments"),
        authRoute       = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
//seedDb();
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret:"Once again Rusty wins cutest dog!",
    save :false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/",authRoute);
app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentRoute);



const port=process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Server has started");
});