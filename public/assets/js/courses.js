$(document).ready(function(){
    var gettext = sessionStorage.getItem("for");
    // console.log(gettext)
    $("#for").text(gettext)
    class Post{
        constructor(cogname,type,level,classnum){
            this.cogname = cogname;
            this.type = type;
            this.level = level;
            this.classnum = classnum;
        }
    }
    var app = new Vue ({
        el: "#toAppend",
        data: {
            postList: []
        }
    });
    
    $(document).on("click",".labclass",function(){
        var name = $(this).attr("name");
        var classnum = $(this).attr("classnum");
        localStorage.removeItem("name"); 
        localStorage.removeItem("classnum"); 
        localStorage.setItem("name",name);
        localStorage.setItem("cnum",classnum);
        
    })
    $(document).on("click",".cogTitle",function(){
        $("#myContainer").addClass("animated bounceOutDown");

        setTimeout(() => {
            window.location.href = "test2.html" 
        }, 1000);
        
        
        
    })
    $("#title").text(localStorage.getItem("name"))
   
    
    function displayClass(p){
        $.ajax({
            method: "get",
            url: "/api/dataClasses"
        }).done(function(data){
            // console.log(data);
            // console.log(data[0].type);
            
            
            for(var x of data){
                if(x.type==p){
                    let post = new Post(
                        x.cogname,
                        x.type,
                        x.level,
                        x.classnum
            
                    )
                    app.postList.push(post)
                }
                
            }
            
        });
    }
    displayClass(localStorage.getItem("Class"))

   
  
})