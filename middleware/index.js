var Campground=require("../models/campground");
var Comment=require("../models/comment");

//all middlewares
var middlewareObj={};

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","You need to Login First!")
        res.redirect("/login");
    }

}

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,campground){
            if(err || !campground){
                req.flash("error","Campground not found!");
                res.redirect("back");
            }
            else{
                if(campground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that!")
                    res.redirect("back");
                }
            }
        })
    }
    else{
        req.flash("error","You need to Login First!")
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err || !comment){
                req.flash("error","Comment not found!");
                res.redirect("back");
            }
            else{
                if(comment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }
                else{
                    req.flash("error","You need have permission to do that!")
                    res.redirect("back");
                }
            }
        })
    }
    else{
        req.flash("error","You need to Login First!")
        res.redirect("back");
    }
}

module.exports=middlewareObj;