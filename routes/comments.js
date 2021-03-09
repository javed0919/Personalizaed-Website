var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

//creating a new comment get route
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err || !campground){
            req.flash("error","Campground not found!");
            res.redirect("back");
        }
        else{
            res.render("comment/new",{campground:campground});
        }
 
    })
})


//handling creating  a comment post route
router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            req.flash("error","Something went wrong!")
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong!")
                    res.redirect("back");
                }
                else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Comment created Successfully!")
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

//comment edit get route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err || !campground){
            req.flash("error","Campground not found!");
            return res.redirect("back");
        }
    });
    Comment.findById(req.params.comment_id,function(err,comment){
        if(err || !comment){
            req.flash("error","Comment not found!")
            res.redirect("back");
        }
        else{
            res.render("comment/edit",{campground_id:req.params.id,comment:comment});
        }
    })
})

//comment update post route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
        if(err){
            req.flash("error","Something went wrong!")
            res.redirect("back");
        }
        else{
            req.flash("success","Comment edited successfully!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//delete comment post route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            req.flash("error","Something went wrong!")
            res.redirect("back");
        }
        else{
            req.flash("success","Comment deleted successfully!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


module.exports=router;