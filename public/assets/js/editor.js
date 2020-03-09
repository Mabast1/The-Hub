$(document).ready(function(){
    function refresh_data(x){
        
        $.ajax({
            url:"/api/delete",
            method:"post",
            data: x
        }).done(function(res){

        })
    }

    function get_data(x,y){
        var to_find = {
            data: x,
            ref:y
        }
        $.ajax({
            url:"/api/edit/get",
            method:"post",
            data: to_find
        }).done(function(res){
            console.log(res);
            
            function append_data(x){
                var col = $('<div class="col-3 mycols">');
                var halo =$('<div class="halo cogs" value="'+res[x].cogname+'">');
                var title = $('<h6 class="text-center">');
                var row = $('<div class="row">');
                var col8 = $('<div class="col-8"><h6 class="text-center">'+res[x].cogname+'</h6></div>');
                var col2edit = $('<div class="col-2"> <i class="material-icons edit" data-toggle="modal" data-target="#edit_" value="'+res[x].cogname+'">'+'edit</i></div>');
                var col2delete = $('<div class="col-2"> <i class="material-icons edit" data-toggle="modal" data-target="#delete_" value="'+res[x].cogname+'" type="'+res[x].type+'">'+'delete</i></div>');
                var close_title = $('</h6>');
                var close_div = $('</div>');
                var br = $('<br>');

                $(".mycols").remove();
                setTimeout(() => {
                    $(".appendHere").append(col);
                    $(col).append(halo);
                    $(halo).append(row);
                    
                    $(row).append(col8);
                    $(col8).append(title);
                    $(title).append(close_title);
                    $(close_title).append(close_div);

                    $(row).append(col2edit);
                    $(row).append(col2delete);

                    $(row).append(close_div);
                    
                    $(halo).append(close_div);

                    $(col).append(close_div);
                    // $(close_div).append(br);
                   
                    
                }, 100);
               
            }
            function append_data_other(x){
                var fullcol = $('<div class="col-12">');
                var col = $('<div class="col-3 mycols">');
                var halo =$('<div class="halo classes" value="'+res[x].classtitle+'">');
                var title = $('<h6 class="text-center">'+res[x].classname+'</h6>');
                var row = $('<div class="row">');
                var col8 = $('<div class="col-8"><h6 class="text-center">'+res[x].classtitle+'</h6></div>');
                var col2edit = $('<div class="col-2"> <i class="material-icons edit" data-toggle="modal" data-target="#edit_" value="'+res[x].classname+'">'+'edit</i></div>');
                var col2delete = $('<div class="col-2"> <i class="material-icons edit" data-toggle="modal" data-target="#delete_" value="'+res[x].classname+'" type="'+res[x].type+'">'+'delete</i></div>');
                var close_title = $('</h6>');
                var close_div = $('</div>');

                // $(".mycols").remove();
                // $(".appendHere").append(fullcol);
                // $(fullcol).append(title);
                // $(fullcol).append(close_div);
                setTimeout(() => {
                    // $(".appendHere").append(fullcol);
                    // $(fullcol).append(title);
                    // $(fullcol).append(close_div);
                    $(".appendHere").append(col);
                    $(col).append(halo);
                    $(halo).append(row);
                    
                    $(row).append(col8);
                    // $(col8).append(title);
                    // $(title).append(close_title);
                    // $(close_title).append(close_div);

                    $(row).append(col2edit);
                    $(row).append(col2delete);

                    $(row).append(close_div);

                    $(halo).append(close_div);

                    $(col).append(close_div);
                   
                    
                }, 100);
               
            }
            
            if(res.length>0 && y==0){   
                $(".class_title").remove();
                 $(".titlesep").remove();
                for(i=0;i<res.length;i++){
                    append_data(i)
                }
            }
            else if (res.length > 0 && y ==1){
                var fullcol = $('<div class="col-12 class_title">');
                var title = $('<h4 class="text-center">'+res[0].classname+'</h4>');
                var close_div = $('</div>');

                $(".mycols").remove();
                $(".class_title").remove();
                 $(".titlesep").remove();
                $(".appendHere").append(fullcol);
                $(fullcol).append(title);
                $(fullcol).append(close_div);
                $(".appendHere").append("<hr class='sep titlesep'>");
                $(".appendHere").append("<div style='padding-bottom:20px'></div>");
                for(i=0;i<res.length;i++){
                    append_data_other(i)
                }
            }
            else{
                console.log("no data");
                var col = $('<div class="col-12 mycols">');
                var close_div = $('</div>');
                var halo =$('<div class="halo cogs">');
                var title = $('<h6 class="text-center">No classes were written for this COG</h6>');
                var close_title = $('</h6>')
                $(".mycols").remove();
                $(".class_title").remove();
                 $(".titlesep").remove();
                setTimeout(() => {
                    $(".appendHere").append(col);
                    $(col).append(halo);
                    $(halo).append(title);
                    $(title).append(close_title);
                    $(close_title).append(close_div);
                }, 100);
            }
            
        })
    }

    function deleteCOG(p){
        var to_delete = {
            data: p
        }
        $.ajax({
            url: "/api/edit/delete",
            method: "post",
            data : to_delete
        }).done(function(res){

        })
    }

    function changeCOG(p,y){
        var to_change = {
            data: p,
            datanew: y
        }
        $.ajax({
            url: "/api/edit/change",
            method: "post",
            data : to_change
        }).done(function(res){

        })
    }

    $(".cogtype").click(function(){
        var val = $(this).attr("value");
        console.log(val)
        get_data(val,0)
    })

    $(document).on("click",".edit",function(){
        console.log("clicked")
        sessionStorage.setItem("to_delete",$(this).attr("value"));
        sessionStorage.setItem("refresh",$(this).attr("type"));
    })
    $("#deleteBtn").click(function(){
        var to_del = sessionStorage.getItem("to_delete");
        var to_ref = sessionStorage.getItem("refresh");
        deleteCOG(to_del);
        alert("COG deleted!")
        get_data(to_ref,0);
    })

    $("#editBtn").click(function(){
        var old_val = sessionStorage.getItem("to_delete");
        var to_ref = sessionStorage.getItem("refresh");
        var new_val = $("#newval").val();
        console.log(new_val)
        changeCOG(old_val,new_val);
        alert("COG name changed!")
        get_data(to_ref,0);
    })
    
    $(document).on("click",".cogs",function(){
        console.log("clicked")
        var class_check=$(this).attr("value");
        get_data(class_check,1);
    })
    $(document).on("click",".classes", function(){
        console.log("clicked")
        sessionStorage.setItem("editclass", $(this).attr("value"));
        setTimeout(() => {
            window.location.href="editclass.html"
        }, 100); 
    })
})