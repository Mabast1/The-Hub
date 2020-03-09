$(document).ready(function(){
     var tobeedited = sessionStorage.getItem("editclass")
     displayData()
     
     
     function displayData(){
          $.ajax({
               url: "api/edit/thisclass",
               method: "post",
               data: {val: tobeedited}
          }).done(function(res){
               console.log(res[0]);
               $("#my_overview").text(res[0].o_text);
               $("#p_image").attr("src",res[0].o_titleimg);
               $("#f_image").attr("src",res[0].o_finalimg);
               
               setTimeout(() => {
                    for(i=0;i<res[0].m_student.length;i++){
                         $("#student_material_list").append('<li value="student" class="edit_list">'+res[0].m_student[i]+'</li>');
                    };
                    for(i=0;i<res[0].m_teacher.length;i++){
                         $("#teacher_material_list").append('<li value="teacher" class="edit_list">'+res[0].m_teacher[i]+'</li>');
                    };
                    for(i=0;i<res[0].m_equip.length;i++){
                         $("#equipment_material_list").append('<li value="equip" class="edit_list">'+res[0].m_equip[i]+'</li>'); 
                    };
                    for(i=0;i<res[0].m_group.length;i++){
                         $("#group_material_list").append('<li value="group" class="edit_list">'+res[0].m_group[i]+'</li>');  
                    }
                    for(i=0;i<res[0].p_prep.length;i++){
                         $("#prep_list").append('<li value="prep" class="edit_list">'+res[0].p_prep[i]+'</li>');  
                    }
                    for(i=0;i<res[0].p_special.length;i++){
                         $("#si_list").append('<li value="special" class="edit_list">'+res[0].p_special[i]+'</li>');  
                    }
                    for(i=0;i<res[0].e_question.length;i++){
                         $("#question_list").append('<li value="question" class="edit_list">'+res[0].e_question[i]+'</li>');  
                    }
                    for(i=0;i<res[0].e_wtk.length;i++){
                         $("#wtk_list").append('<li value="wtk" class="edit_list">'+res[0].e_wtk[i]+'</li>');  
                    }
                    for(i=0;i<res[0].k_ican.length;i++){
                         $("#ican_list").append('<li value="ican" class="edit_list">'+res[0].k_ican[i]+'</li>');  
                    }
                    for(i=0;i<res[0].k_engage.length;i++){
                         $("#engage_list").append('<li value="engage" class="edit_list">'+res[0].k_engage[i].text+'</li>');  
                    }
                    for(i=0;i<res[0].steps.length;i++){
                         $("#steps_list").append('<li value="steps" class="edit_list">'+res[0].steps[i].text+'</li>');  
                    }
                    for(i=0;i<res[0].ffacts.length;i++){
                         $("#ffacts_list").append('<li value="ffacts" class="edit_list">'+res[0].ffacts[i]+'</li>');  
                    }  
               }, 300);
               
          })
     }
     

     $(document).on("click",".edit_list",function(){
               var text_edit = $(this).text();
               console.log(text_edit)

               if($(this).attr("value")=="overview"){
                    $("#overview").text(text_edit);
               }
               else if($(this).attr("value")=="student"){
                    $("#student").text(text_edit);
               }
               else if($(this).attr("value")=="teacher"){
                    $("#teacher").text(text_edit);
               }
               else if($(this).attr("value")=="group"){
                    $("#group").text(text_edit);
               }
               else if($(this).attr("value")=="equip"){
                    $("#equip").text(text_edit);
               }
               else if($(this).attr("value")=="prep"){
                    $("#prep").text(text_edit);
               }
               else if($(this).attr("value")=="special"){
                    $("#special").text(text_edit);
               }
               else if($(this).attr("value")=="question"){
                    $("#question").text(text_edit);
               }
               else if($(this).attr("value")=="wtk"){
                    $("#wtk").text(text_edit);
               }
               else if($(this).attr("value")=="ican"){
                    $("#ican").text(text_edit);
               }
               else if($(this).attr("value")=="engage"){
                    $("#engage").text(text_edit);
               }
               else if($(this).attr("value")=="steps"){
                    $("#steps").text(text_edit);
               }
               else if($(this).attr("value")=="ffacts"){
                    $("#ffacts").text(text_edit);
               }
               else{
                    console.log("Nothing was selected")
               }
     })

     $(".submit_change").click(function(){
          if($(this).attr("value")=="overview"){
              var text =$("#overview").val();
              var value =$("#overview").text();
              console.log(text)
              console.log(value)
              editing(text,"none","overview");
          //     $(".edit_list").remove();
          //     $("#student").text("")
          //     $("#student").val("")
              setTimeout(() => {
                   
                  displayData() 
              }, 300);
          }
          else if($(this).attr("value")=="student"){
               var text = $("#student").val();
               var value =$("#student").text();
               editing(text,value,"student");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="teacher"){
               var text = $("#teacher").val();
               var value =$("#teacher").text();
               editing(text,value,"teacher");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="group"){
               var text = $("#group").val();
               var value =$("#group").text();
               editing(text,value,"group");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="equip"){
               var text = $("#equip").val();
               var value =$("#equip").text();
               editing(text,value,"equip");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="prep"){
               var text = $("#prep").val();
               var value =$("#prep").text();
               editing(text,value,"prep");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="special"){
               var text = $("#special").val();
               var value =$("#special").text();
               editing(text,value,"special");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="question"){
               var text = $("#question").val();
               var value =$("#question").text();
               editing(text,value,"question");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="wtk"){
               var text = $("#wtk").val();
               var value =$("#wtk").text();
               editing(text,value,"wtk");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="ican"){
               var text = $("#ican").val();
               var value =$("#ican").text();
               editing(text,value,"ican");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="engage"){
               var text = $("#engage").val();
               var value =$("#engage").text();
               editing(text,value,"engage");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="steps"){
               var text = $("#steps").val();
               var value =$("#steps").text();
               editing(text,value,"steps");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else if($(this).attr("value")=="ffacts"){
               var text = $("#ffacts").val();
               var value =$("#ffacts").text();
               editing(text,value,"ffacts");
               setTimeout(() => {
                    displayData() 
                }, 300);
          }
          else{
               console.log("Nothing was selected")
          }
     })


     function editing(x,y,z){
          $.ajax({
               url:"api/edit/textchange",
               method: "post",
               data: {
                    class:tobeedited,
                    text: x,
                    array: y,
                    ref:z
               }
          }).done(function(res){

          })
     }

})