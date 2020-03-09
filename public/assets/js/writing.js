$(document).ready(function(){
    var m_studentArr = [];
    var m_groupArr = [];
    var m_teacherArr = [];
    var m_equipArr = [];
    var p_prepArr = [];
    var p_speciallArr = [];
    var e_questionArr = [];
    var e_wtkArr = [];
    var k_icanArr = [];
    var k_engageArr = [];
    var stepsArr = [];
    var ffactsArr = [];
    
    
    var classWrite =  localStorage.getItem("toWrite");
    var classType =  localStorage.getItem("typeNew");
    $("#classname").val(classWrite);
    $("#writeclass").click(function(){
        window.location.href = "writing.html"
    })
    $("#editclass").click(function(){
        window.location.href = "editor.html"
    })


    var className = localStorage.getItem("toWrite");       
    var classVal = localStorage.getItem("cval")  
    $("#inpName").attr("value", className);
    $("#inpVal").attr("value", classVal);
    $("#inpFName").attr("value", className);
    $("#inpFVal").attr("value", classVal);

    function appendLists(x,y,z){
        if(x==0){
            var list = $("<li>"+y.text+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewStudent").append(list);
            $("#reviewStudent").append(line);
            z.push(y);
        }
        else if(x==1){
            var list = $("<li>"+y.text+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewTeacher").append(list);
            $("#reviewTeacher").append(line);
            z.push(y);
        }
        else if(x==2){
            var list = $("<li>"+y.text+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewGroup").append(list);
            $("#reviewGroup").append(line);
            z.push(y);
        }    
        else if(x==3){
            var list = $("<li>"+y.text+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewEquip").append(list);
            $("#reviewEquip").append(line);
            z.push(y);
        }   
        else if(x==4){
            var list = $("<li>"+y+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewPrep").append(list);
            $("#reviewPrep").append(line);
            z.push(y);
        }   
        else if(x==5){
            var list = $("<p>"+y+"</p>");
            $("#reviewSI").append(list);
            z.push(y);
        }   
        else if(x==6){
            var list = $("<li>"+y+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewQ").append(list);
            $("#reviewQ").append(line);
            z.push(y);
        }   
        else if(x==7){
            var list = $("<li>"+y+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewWTK").append(list);
            $("#reviewWTK").append(line);
            z.push(y);
        }   
        else if(x==8){
            var list = $("<li>"+y+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewICS").append(list);
            $("#reviewICS").append(line);
            z.push(y);
        }   
        else if(x==9){
            var list = $("<li>"+y.text+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewEngage").append(list);
            $("#reviewEngage").append(line);
            z.push(y);
        }   
        else if(x==10){
            var list = $("<li>"+y.text+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewSteps").append(list);
            $("#reviewSteps").append(line);
            z.push(y);
        }   
        else if(x==11){
            var list = $("<li>"+y+"</li>");
            var line = $("<hr class='hrSep'>");
            $("#reviewFfacts").append(list);
            $("#reviewFfacts").append(line);
            z.push(y);
        }   
             

    }

    //when these buttons are clicked, the append function pushes the data to their respective array that will then pushed to the db
    //this helps modify and fix data before its sent
    $("#submitSL").click(function(){
        var inpVal = 
        {   text:$("#m_studentList").val(),
            amount: $("#m_studentList_amount").val(),
            notes: $("#m_studentList_notes").val(),
        };
        var arrVal = m_studentArr;

        appendLists(0,inpVal,arrVal);
        console.log(arrVal);
        $("#m_studentList").val("")
    
    })

    $("#submitTL").click(function(){
        var inpVal = 
        {   text:$("#m_teacherList").val(),
            amount: $("#m_teacherList_amount").val(),
            notes: $("#m_teacherList_notes").val(),
        };
        
        var arrVal = m_teacherArr;

        appendLists(1,inpVal,arrVal);
        console.log(arrVal);
        $("#m_teacherList").val("")
    
    })
    
    $("#submitGL").click(function(){
        var inpVal = 
        {   text:$("#m_groupList").val(),
            amount: $("#m_groupList_amount").val(),
            notes: $("#m_groupList_notes").val(),
        };
        var arrVal = m_groupArr;

        appendLists(2,inpVal,arrVal);
        console.log(arrVal);
        $("#m_groupList").val("")
    
    })
    
    $("#submitEL").click(function(){
        var inpVal = 
        {   text:$("#m_equipList").val(),
            amount: $("#m_equipList_amount").val(),
            notes: $("#m_equipList_notes").val(),
        };
        var arrVal = m_equipArr;

        appendLists(3,inpVal,arrVal);
        console.log(arrVal);
        $("#m_equipList").val("")
    
    })

    $("#submitPL").click(function(){
        var inpVal = $("#m_prepList").val();
        var arrVal = p_prepArr;

        appendLists(4,inpVal,arrVal);
        console.log(arrVal);
        $("#m_prepList").val("")
    
    })

    $("#submitSIL").click(function(){
        var inpVal = $("#m_siList").val();
        var arrVal = p_speciallArr;

        appendLists(5,inpVal,arrVal);
        console.log(arrVal);
        $("#m_siList").val("")
    
    })
    $("#submitQL").click(function(){
        var inpVal = $("#m_questionList").val();
        var arrVal = e_questionArr;

        appendLists(6,inpVal,arrVal);
        console.log(arrVal);
        $("#m_questionList").val("")
    
    })
    $("#submitWTK").click(function(){
        var inpVal = $("#m_wtkList").val();
        var arrVal = e_wtkArr;

        appendLists(7,inpVal,arrVal);
        console.log(arrVal);
        $("#m_wtkList").val("")
    
    })
    $("#submitICL").click(function(){
        var inpVal = $("#m_icanList").val();
        var arrVal = k_icanArr;

        appendLists(8,inpVal,arrVal);
        console.log(arrVal);
        $("#m_wtkList").val("")
    
    })
    $("#submitEngage").click(function(){
        var inpVal = {text:$("#m_engageList").val(),link:$("#m_engageList_img").val(),info:$("#m_engageList_info").val()};
        var arrVal = k_engageArr;

        appendLists(9,inpVal,arrVal);
        console.log(arrVal);
        $("#m_engageList").val("")
    
    })

    $("#submitSteps").click(function(){
        var inpVal = {text:$("#m_stepsList").val(),link:$("#m_stepsList_img").val(),info:$("#m_stepsList_info").val()};
        var arrVal = stepsArr;

        appendLists(10,inpVal,arrVal);
        console.log(arrVal);
        $("#m_stepsList").val("");
        $("#m_stepsList_img").val("");
    
    })

    $("#submitFfacts").click(function(){
        var inpVal = $("#m_ffactsList").val();
        var arrVal = ffactsArr;

        appendLists(11,inpVal,arrVal);
        console.log(arrVal);
        $("#m_ffactsList").val("")
    
    })
    
    
    $("#createBtn").click(function(){
        var data={
            cogname: $("#cogname").val(),
            type: $("#type").val(),
            
           
        }
        // console.log(dataToSend)
        $.ajax({
            url: "/createcog",
            method: "POST",
            data: data,
           
        }).done(function(res){
            
        })
        var val = $("#cogname").val();
        var valTy = $("#type").val();
        setTimeout(() => {
            alert("Class Created!");
            localStorage.removeItem("toWrite");
            localStorage.removeItem("typeNew");
            localStorage.setItem("toWrite", val);
            localStorage.setItem("typeNew", valTy)
            $("#cogname").val("");
            $('#createclass').modal('hide')
        }, 100);
        
    })

    $("#writeBtn").click(function(){
        var cval = $("#classnum").val();
        localStorage.setItem("cval", cval);
        console.log(cval);
        var dataToSend={
            classname: $("#classname").val(),
            classtitle: $("#classtitle").val(),
            type: classType,
            o_text: $("#overview").val(),
            classnum:$("#classnum").val(),
            
        }
        // console.log(dataToSend)
        $.ajax({
            url: "/createclass",
            method: "POST",
            data: dataToSend,
           
        }).done(function(res){
            alert("SUCCESS");
            
        })

        setTimeout(() => {
            alert("Class Generated! You may proceed writing...")
        }, 100);

        
    })

    $("#submitBtn").click(function(){
        console.log("updating..");
        content = {
            classname: $("#classname").val(),
            steps: stepsArr,
            ffacts:  ffactsArr,
            k_engage: k_engageArr,
            k_ican: k_icanArr,
            e_wtk: e_wtkArr,
            e_question: e_questionArr,
            p_special: p_speciallArr,
            p_prep: p_prepArr,
            m_equip: m_equipArr,
            m_group: m_groupArr,
            m_teacher: m_teacherArr,
            m_student: m_studentArr,  
            cval: localStorage.getItem("cval")          
                            
        }
        
        $.ajax({
        url: "/test",
        method: "POST",
        data: JSON.stringify(content),
        contentType: "application/json"
        
        }).done(function(res){
        alert("SUCCESS");
            
        })

        setTimeout(() => {
            alert("Class written!")
        }, 300);
    })

   


    $("#oComplete").click(function(){
        console.log("clicked")
        $("#overviewB").addClass("completed")
    })
    $("#iComplete").click(function(){
        console.log("clicked")
        $("#imagesB").addClass("completed")
    })
    $("#mComplete").click(function(){
        console.log("clicked")
        $("#materialB").addClass("completed")
    })
    $("#pComplete").click(function(){
        console.log("clicked")
        $("#prepB").addClass("completed")
    })
    $("#eComplete").click(function(){
        console.log("clicked")
        $("#essentialB").addClass("completed")
    })
    $("#kComplete").click(function(){
        console.log("clicked")
        $("#conceptsB").addClass("completed")
    })
    $("#sComplete").click(function(){
        console.log("clicked")
        $("#stepsB").addClass("completed")
    })
    $("#ffComplete").click(function(){
        console.log("clicked")
        $("#factsB").addClass("completed")
    })
})