$(document).ready(function(){
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    
    
    var printed = sessionStorage.getItem("material_printed");
    var material = sessionStorage.getItem("materials");
    var multiply = localStorage.getItem("toCalculate");


    
    
    $("#back").click(function(){
        sessionStorage.setItem("material_printed",false)
        setTimeout(() => {
            window.location.href = "classes.html"
        }, 500);
        
    })

    console.log(printed)
    if(printed ==="true"){
        setTimeout(() => {
            $('#calculator').modal('show') 
        }, 1000);
    }
    else if(printed ==="false"){
        console.log("You already printed the material")
    }

    $("#gnumber2").text(Math.round(multiply/3))
    $("#student_number").click(function(){
        var cv = $("#student_number").val();
        var xr = Math.round(cv/3);
        localStorage.setItem("toCalculate",cv)
        console.log(cv);
        $("#gnumber").text(xr)
    })
    function scroll(p){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#"+p+"").offset().top
        }, 100);
    }
    
    var x = 4;
    function hello(){
        $( ".single_card" ).each(function( index ) {  
            var val = $( this ).attr("value");  
            if(val <=3){
                $( this ).css("visibility","visible");   
                
            }
        });
    }
   
    $("#print").click(function(){
        window.print();
    })
    $("#nextB").click(function(){
        console.log(x)
        $( ".single_card" ).each(function( index ) {  
            var val = $( this ).attr("value");  
            if(val <=x+3){
                $( this ).css("visibility","visible");
                $( this ).addClass("animated fadeInLeft");   
                
            }
        });
        x = x+4
        setTimeout(() => {
            var val = $( this ).attr("value");  
            if(val < x){
                $( ".single_card" ).each(function( index ) {    
                    $( this ).css("visibility","hidden");   
                });
            }
        }, 2000);
        console.log(x);
    })
   
    
    $(document)
    function findclass(){
        data={
            cname:localStorage.getItem("name"),
            cnum:localStorage.getItem("cnum"),
        }
        $.ajax({
            method: "post",
            url: "/api/displayclass",
            data: JSON.stringify(data),
            contentType: "application/json"
        }).done(function(data){
            
            function build_cards(x){
                var col3 = $('<div class="col-3 single_card" value="'+x+'">');
                var sections = $('<div class="sections"><ul>');
                var close_sections = $('</ul></div>');
                var close = $('</div>');
                
                // function appendlist(a,b,c,d){
                //     $("#stepsList").append(col3);
                //     $(col3).append(sections);
                //     $(sections).append(a,b,c,d);
                //     $(sections).append(close_sections);
                //     $(col3).append(close);
                    
                // }

                if(data[0].steps[x].link !== ""){


                    $("#stepsList").append(col3);
                    $(col3).append(sections);
                    $(sections).append('<p class="popimg" data-toggle="modal" data-target="#playGif" src= '+ data[0].steps[x].link +'>' +data[0].steps[x].text+"</p>");
                    $(sections).append(close_sections);
                    $(col3).append(close);
                    
                }
                else if(data[0].steps[x].info !== ""){
                    $("#stepsList").append(col3);
                    $(col3).append(sections);
                    $(sections).append('<p class="todefine" data-container="body" data-toggle="popover" data-placement="left" data-trigger="hover" data-content='+ data[0].steps[x].info +'>' +data[0].steps[x].text+"</p>");
                    $(sections).append(close_sections);
                    $(col3).append(close);
                    
                    
                }
                else{
                    $("#stepsList").append(col3);
                    $(col3).append(sections);
                    $(sections).append("<p>" +data[0].steps[x].text+"</p>");
                    $(sections).append(close_sections);
                    $(col3).append(close);
                   
                    
                }
    
                hello()
            }









        //    console.log(data)
           $("#classtitle").text(data[0].classtitle);
            $("#otext").text(data[0].o_text);
            $("#o_Timg").attr("src", data[0].o_titleimg);
            $("#o_Fimg").attr("src", data[0].o_finalimg);

            function build_materials(z,p,x,y){
                var row = $('<div class="row">');
                var col_4 = $('<div class="col-4">');
                var col_4_2 = $('<div class="col-4">');
                var col_4_3= $('<div class="col-4">');
                var ul = $('<ul>'+p+'</ul>');
                var ul2 = $('<ul>'+x+'</ul>');
                var ul3 = $('<ul>'+y+'</ul>');
                var close = $('</div>');

                if(z==0){
                    var appendTo = $("#sList")
                }
                else if(z==1){
                    var appendTo = $("#gList")
                }
                else if(z==2){
                    var appendTo = $("#eqList")
                }
                else if(z==3){
                    var appendTo = $("#tList")
                }

                // $("#sList").append("<hr class='hrSep'>");
                appendTo.append(row);
                $(row).append(col_4);
                $(col_4).append(ul);
                $(col_4).append(close);

                $(row).append(col_4_2);
                $(col_4_2).append(ul2);
                $(col_4_2).append(close);

                $(row).append(col_4_3);
                $(col_4_3).append(ul3);
                $(col_4_3).append(close);

                $(row).append(close);
            }

            function calculate_materials(z,p,x){
                var row = $('<div class="row">');
                var col_4 = $('<div class="col-6">');
                var col_4_2 = $('<div class="col-6">');
                var ul = $('<ul>'+(p)+'</ul>');
                var ul2 = $('<ul>'+(x)+'</ul>');
                var close = $('</div>');

               


                if(z==0){
                    var appendTo = $("#sList")
                }
                else if(z==1){
                    var appendTo = $("#gList")
                }
                else if(z==2){
                    var appendTo = $("#eqList")
                }
                else if(z==3){
                    var appendTo = $("#tList")
                }

                // $("#sList").append("<hr class='hrSep'>");
                appendTo.append(row);
                $(row).append(col_4);
                $(col_4).append(ul);
                $(col_4).append(close);

                $(row).append(col_4_2);
                $(col_4_2).append(ul2);
                $(col_4_2).append(close);


                $(row).append(close);
            }
            
            if(material ==0){
                for(i=0;i<data[0].m_student.length;i++){
                    $("#sList").append("<hr class='hrSep'>");
                    if(data[0].m_student[i].notes ==undefined){
                        build_materials(0,data[0].m_student[i].text,data[0].m_student[i].amount,"None")
                    }
                    else{
                        build_materials(0,data[0].m_student[i].text,data[0].m_student[i].amount,data[0].m_student[i].notes)
                    }
                    
                };
                for(i=0;i<data[0].m_group.length;i++){
                    $("#gList").append("<hr class='hrSep'>");
                    if(data[0].m_group[i].notes ==undefined){
                        build_materials(1,data[0].m_group[i].text,data[0].m_group[i].amount,"None")
                    }
                    else{
                        build_materials(1,data[0].m_group[i].text,data[0].m_group[i].amount,data[0].m_group[i].notes)
                    }
                }
                for(i=0;i<data[0].m_equip.length;i++){
                    $("#eqList").append("<hr class='hrSep'>");
                    if(data[0].m_equip[i].notes ==undefined){
                        build_materials(2,data[0].m_equip[i].text,data[0].m_equip[i].amount,"None")
                    }
                    else{
                        build_materials(2,data[0].m_equip[i].text,data[0].m_equip[i].amount,data[0].m_equip[i].notes) 
                    }
                }
                for(i=0;i<data[0].m_teacher.length;i++){
                    $("#tList").append("<hr class='hrSep'>");
                    if(data[0].m_teacher[i].notes ==undefined){
                        build_materials(3,data[0].m_teacher[i].text,data[0].m_teacher[i].amount,"None")
                    }
                    else{
                        build_materials(3,data[0].m_teacher[i].text,data[0].m_teacher[i].amount,data[0].m_teacher[i].notes)
                    }
                }
                for(i=0;i<data[0].e_question.length;i++){
                    $("#quList").append("<hr class='hrSep'>");
                    $("#quList").append("<li>" +data[0].e_question[i]+"</li>");
                }
                for(i=0;i<data[0].e_wtk.length;i++){
                    $("#wtkList").append("<hr class='hrSep'>");
                    $("#wtkList").append("<li>" +data[0].e_wtk[i]+"</li>");
                }
                
                for(i=0;i<data[0].k_engage.length;i++){
                    // $("#engageList").append("<hr class='hrSep'>");
                    // $("#engageList").append("<li>" +data[0].k_engage[i]+"</li>");
    
                    if(data[0].k_engage[i].link !== "" && data[0].k_engage[i].info !== ""){
                        $("#engageList").append("<hr class='hrSep'>");
                        $("#engageList").append('<li class="popimg todefine" data-container="body" data-toggle="popover" data-placement="left" data-trigger="hover" data-toggle="modal" data-target="#playGif" src= '+ data[0].k_engage[i].link +' data-content='+data[0].k_engage[i].info +'>' +data[0].k_engage[i].text+"</li>");
                       
                    }
                    else if(data[0].k_engage[i].link !== ""){
                        $("#engageList").append("<hr class='hrSep'>");
                        $("#engageList").append('<li class="popimg" data-toggle="modal" data-target="#playGif" src= '+ data[0].k_engage[i].link +'>' +data[0].k_engage[i].text+"</li>");
                    }
                    else if(data[0].k_engage[i].info !== ""){
                        $("#engageList").append("<hr class='hrSep'>");
                        $("#engageList").append('<li class="todefine" data-container="body" data-toggle="popover" data-placement="left" data-trigger="hover" data-content="'+ data[0].k_engage[i].info +'">' +data[0].k_engage[i].text+"</li>");
                    }
                    else{
                        $("#engageList").append("<hr class='hrSep'>");
                        $("#engageList").append("<li>" +data[0].k_engage[i].text+"</li>")
                    }
                }
    
                for(i=0;i<data[0].k_ican.length;i++){
                    $("#icanList").append("<hr class='hrSep'>");
                    $("#icanList").append("<li>" +data[0].k_ican[i]+"</li>");
                }
                for(i=0;i<data[0].p_prep.length;i++){
                    $("#prepList").append("<hr class='hrSep'>");
                    $("#prepList").append("<li>" +data[0].p_prep[i]+"</li>");
                }
                for(i=0;i<data[0].p_special.length;i++){
                    $("#specList").append("<hr class='hrSep'>");
                    $("#specList").append("<li>" +data[0].p_special[i]+"</li>");
                }
                
                for(i=0;i<data[0].steps.length;i++){ 
                    build_cards(i);
                   
                }
    
                for(i=0;i<data[0].ffacts.length;i++){
                    $("#factsList").append("<hr class='hrSep'>");
                    $("#factsList").append("<li>" +data[0].ffacts[i]+"</li>");
                }
            }
            
            else if(material ==1){
                for(i=0;i<data[0].m_student.length;i++){
                    $("#sList").append("<hr class='hrSep'>");
                    calculate_materials(0,data[0].m_student[i].text,Math.round(data[0].m_student[i].amount * multiply))
                };
                for(i=0;i<data[0].m_group.length;i++){
                    $("#gList").append("<hr class='hrSep'>");
                    calculate_materials(1,data[0].m_group[i].text,Math.round(data[0].m_group[i].amount * (multiply/3)))
                }
                for(i=0;i<data[0].m_equip.length;i++){
                    $("#eqList").append("<hr class='hrSep'>");
                    calculate_materials(2,data[0].m_equip[i].text,data[0].m_equip[i].amount)
                }
                for(i=0;i<data[0].m_teacher.length;i++){
                    $("#tList").append("<hr class='hrSep'>");
                    calculate_materials(3,data[0].m_teacher[i].text,data[0].m_teacher[i].amount)
                }
            }
            
        });
    }
    
    findclass();
    $(document).on("click",".popimg",function(){
        
        console.log($(this).attr("src"));
        var showImg = $(this).attr("src")
        $("#displayImg").attr("src", showImg)
    })

    $(document).on("mouseover",".todefine",function(){
        $(this).popover('toggle')
    })
    
    
  
})