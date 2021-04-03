var express=require("express");
var router=express.Router();
var User=require("../models/user");
var passport=require("passport");

//route route
router.get("/",function(req,res){
    res.render("landing");
});

//register form (get)
router.get("/register",function(req,res){
    res.render("register",{page: 'register'});
});


//handling register form route(post)
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            return res.render("register",{error:err.message});
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome! " + user.username);
            res.redirect("/campgrounds");
        })
    })
})

//show login form route(get)
router.get("/login",function(req,res){
    res.render("login",{page: 'login'});
});

//handling login route(post)
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect: "/login"
    }),function(req,res){

});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Succesfully logged you out!");
    res.redirect("/campgrounds");
})


module.exports=router;