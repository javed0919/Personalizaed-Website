var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");

//show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allcampgrounds){
        if(err){
            req.flash("error","Database crashed ot not connected!")
            res.redirect("back");
        }
        else{
            res.render("campground/index",{campgrounds:allcampgrounds,page: 'campgrounds'});
        }
    })
});

//add a new campground post
router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newcampground={name:name,price:price,image:image,description:description,author:author};
    Campground.create(newcampground,function(err,newcampground){
        if(err){
            req.flash("error","Database crashed ot not connected!")
            res.redirect("back");
        }
        else{
            req.flash("success","Successfully Uploaded!")
            res.redirect("/campgrounds");
        }
    });
});


//adding a new campground get
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campground/new");
});

// show a particular campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundedcampground){
        if(err || !foundedcampground){
            req.flash("error","Campground not Found!")
            res.redirect("back");
        }
        else
        {
            res.render("campground/show",{campground:foundedcampground});
        }
    });
});

//edit a campground get route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
            res.render("campground/edit",{campground:campground});
    })
})
//updating a campground post
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
        if(err){
            req.flash("error","Something went wrong, pls try again!")
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success","Edit Successful!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//delete a campground
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            req.flash("error","Something went wrong!")
            res.redirect("/campgrounds");
        }
        else{
            req.flash("error","Successfully Deleted!")
            res.redirect("/campgrounds");
        }
    })
})



module.exports=router;