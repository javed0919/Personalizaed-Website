var mongoose      = require("mongoose");
var Campground    = require("./models/campground");
var Comment       = require("./models/comment");
var arr=[
    {
        name:"LEO MESSI",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL2oL_CzQXjCi3Y99F0JaSQ8b8KuT6EJuIIg&usqp=CAU",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque augue ligula, viverra eu faucibus nec, fermentum sed massa. Phasellus leo tortor, dictum a placerat at, tincidunt ac ligula. Vivamus vel lacus quam. Integer id lobortis nisl. Nam commodo urna ligula, quis elementum nibh mattis at. Nam vel rhoncus orci. Fusce mollis efficitur odio, eget accumsan nibh. Duis eget lectus condimentum, egestas nisi id, porta eros. Phasellus ut metus non metus hendrerit feugiat ut a leo."
    },
    {
        name:"LEO MESSI",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDiE8mkN7KuIRV57dlIJ8mub4IZz6Av1LNSA&usqp=CAU",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque augue ligula, viverra eu faucibus nec, fermentum sed massa. Phasellus leo tortor, dictum a placerat at, tincidunt ac ligula. Vivamus vel lacus quam. Integer id lobortis nisl. Nam commodo urna ligula, quis elementum nibh mattis at. Nam vel rhoncus orci. Fusce mollis efficitur odio, eget accumsan nibh. Duis eget lectus condimentum, egestas nisi id, porta eros. Phasellus ut metus non metus hendrerit feugiat ut a leo."
    },
    {
        name:"LEO MESSI",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3cE2fFuvG8Unrp5dL7DbA10bNI3Oy7W0qRg&usqp=CAU",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque augue ligula, viverra eu faucibus nec, fermentum sed massa. Phasellus leo tortor, dictum a placerat at, tincidunt ac ligula. Vivamus vel lacus quam. Integer id lobortis nisl. Nam commodo urna ligula, quis elementum nibh mattis at. Nam vel rhoncus orci. Fusce mollis efficitur odio, eget accumsan nibh. Duis eget lectus condimentum, egestas nisi id, porta eros. Phasellus ut metus non metus hendrerit feugiat ut a leo."
    }
];
function seedDb(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed");
            arr.forEach(function(seed){
                Campground.create(seed,function(err,data){
                    if(err){
                        console.log(err);
                    }
                    else 
                    {
                        console.log("created");
                        Comment.create(
                        {
                            text:"GOAT",
                            author:"Barcelona"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                data.comments.push(comment);
                                data.save();
                                console.log("new comment created");
                            }
                        })
                    }
                })
            })
        }
    })

}

module.exports=seedDb;