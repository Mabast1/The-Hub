
$(document).ready(function(){  

    var blogID = "b00";
    var image = "https://cdn.dribbble.com/users/722563/screenshots/2966091/narwhal_dribbble.gif";
    var titleID = "t00";
    var title = "Level 1 Web Development";
    var textID= "tx00";
    var text = "Welcome to Idea Lab's level 1 web development curriculum! Follow your teacher's instructions and don't forget to have fun!"; 


    var createID = $(" <div class='card-block animated slideInRight toDestroy'><input id='createID' placeholder='Create an ID'> </div> ");
    var createImgLink =  $(" <div class='card-block animated slideInRight toDestroy'><input id='createImgLink' placeholder='<img src= VALUE> (Image)'> </div>");
    var createTitleID = $(" <div class='card-block animated slideInRight toDestroy'><input id='createTitleID' placeholder='Title Id'> </div>");
    var createTitle = $(" <div class='card-block animated slideInRight toDestroy'><input id='createTitle' placeholder='<h1>VALUE</h1> (Title)'> </div>");
    var createTextID = $(" <div class='card-block animated slideInRight toDestroy'><input id='createTextID' placeholder='Text Id'> </div>");
    var createText = $(" <div class='card-block animated slideInRight toDestroy'><input id='createText' placeholder='<p>VALUE</p> (Text)'> </div>");
    var selectID = $(" <div class='card-block animated slideInRight toDestroy'><input id='selectID' placeholder='ID'> </div>");
    var setProperty = $(" <div class='card-block animated slideInRight toDestroy'><input id='setProperty' placeholder='Set property'> </div>");
    var setValue = $(" <div class='card-block animated slideInRight toDestroy'><input id='setValue' placeholder='Set value'> </div>");
    var addButton = $("<div class='card-block animated slideInRight toDestroy'><a> <button type='button' class='myButton ripple' id='addButton'>Enter</button></a></div>");
    var editButton = $("<div class='card-block animated slideInRight toDestroy'> <button type='button' class='myButton' id='editButton'>Enter</button></div>");
    var styleButton = $("<div class='card-block animated slideInRight toDestroy'> <button type='button' class='myButton' id='styleButton'>Enter</button></div>");
    var deleteButton = $("<div class='card-block animated slideInRight toDestroy'> <button type='button' class='myButton' id='deleteButton'>Enter</button></div>");
    
    var card_one = $('<div class="card card-special animated slideInUp">')
    var card_img = $('<img class="card-img" src="https://shuttlerocket.com.au/wp-content/uploads/2015/11/blog-builder-600x400.png?x45173" alt="Card image">');
    var card_overlay = $('<div class="card-img-overlay card-cover">');
    var card_title = $('<h4 class="card-title text-center">Blog Builder</h4>');
    var closing_div = $('</div>');


    var btn_home = $('<div class="menuButton" id="save" ></div>');
    var btn_save = $('<div class="menuButton" id="home" ></div>');
    var btn_preview = $('<div class="menuButton" id="info" ></div>');
    var btn_help = $('<div class="menuButton" id="preview" ></div>');


    function animateCardTheHardWay(){
        $("#justToAnimate").append(card_one);
        $(card_one).append(card_img);
        $(card_one).append(card_overlay);
        $(card_overlay).append(card_title);
        $(card_overlay).append(closing_div);
        $(card_one).append(closing_div);

    }



    var helpTrigger = 0;
    var setIDs = 0;
    
    startCode();

    function add(){
        
        setTimeout(() =>{$(".toDestroy").remove()},10)
        // setTimeout(() => {$(".colplus").append(createID)}, 20);
        setTimeout(() => {$(".colplus").append(createImgLink)}, 30);
        // setTimeout(() => {$(".colplus").append(createTitleID)}, 40);
        setTimeout(() => {$(".colplus").append(createTitle)},50);
        // setTimeout(() => {$(".colplus").append(createTextID)}, 60);
        setTimeout(() => {$(".colplus").append(createText)}, 70);
        setTimeout(() => { $(".colplus").append(addButton)}, 150);
        helpTrigger = 1;
        console.log(helpTrigger);
    }
    function edit(){
        setTimeout(()=>{$(".toDestroy").remove()},10);  
        setTimeout(() => {$(".colplus").append(selectID)}, 20);
        setTimeout(() => { $(".colplus").append(setValue)}, 30);
        setTimeout(() => {$(".colplus").append(editButton)}, 40);
        helpTrigger = 2;
        console.log(helpTrigger);
    }
    function style(){
        $(".toDestroy").remove();
        $(".colplus").append(selectID);
        $(".colplus").append(setProperty);
        $(".colplus").append(setValue);
        $(".colplus").append(styleButton);
        helpTrigger = 3;
        console.log(helpTrigger);
    }
    function toDelete(){
        $(".toDestroy").remove()
        $(".colplus").append(selectID);
        $(".colplus").append(deleteButton);
        helpTrigger = 4;
        console.log(helpTrigger);
       
    }
    
    
   
    
    $("#c-b-button").click(function(){
        var c1 = $("#c-background").val();
        var c2 = $("#c-background2").val();
        changeBG(c1,c2);
    })
    
   
    
    $(".opt-title").hover(function(){
        $("#blog-title").toggleClass("opt-hover")
    })
    $(".opt-add").hover(function(){
        $(".toAppend").toggleClass("opt-hover")
    })
   

    // function changeBG(param){
    //     $("#section-1").css("background-color",param)
    // }
    function changeBG(p1,p2){
        $("#section-1").css(p1,p2);
    }

    function styleElements(p0,p1,p2){
        $("#"+p0+"").css(p1,p2)
    }
    function editElements(p1,p2){
        $("#"+p1+"").text(p2);
    }
    function deleteElements(p){
        $("#"+p+"").remove();
    }

    function checkInput(){
        $("#main-input").keyup(function(){
            if (this.value == "add"){
                add();
                // $(".menuCard").hide( "slow", function() {
                //     alert( "Animation complete." );
                //   });
            } 
            
            else if (this.value == "edit") {
                edit();
            }
            else if (this.value == "style"){
                style();
            }
            else if (this.value == "delete"){
                toDelete();
            }
            
        })
    }

    
        $(".infoB").click(function(){
            if(helpTrigger == 0){
                infoZERO();
            }
            else if(helpTrigger == 1){
                infoADD();
            }
            else if(helpTrigger == 3){
                infoSTYLE();
            }

            
        })
    
    function infoZERO(){
        var text = $(" <p class='infoDestroy'> This coding simulator is divided into four main functions that can help you modify the blog and some styling elements to your liking:</p>");    
        var ul1 = $("<ul>");
        var li1 =$("<li>add: Allows you to add new div element, specifically a new blog following the append method. Once entered fill in the required parameters</li>");
        var li2 =$("<li>edit: Allows you to edit any div element's text.</li>");
        var li3 =$("<li>style: Allows you to style any div element as long as you provide its ID and the proper CSS parameters.</li>");
        var li4 =$("<li>delete: Allows you to delete any div element as long as you provide an ID.</li>");
        var ul2 = $("</ul>");
    }
    
    
    function infoADD(){
        
        var text = $(" <p class='infoDestroy'> Here the append method is used to insert elements into our DOM.The append() method inserts specified content at the end of the selected elements. When filling in the parameters you actually attach the created div to a set one:</p>");
        var igg = $("<img src='es.png' class='test infoDestroy'>")
        $(".infoDestroy").remove();
        $(".infoAppend").append(text);
        $(".infoAppend").append(igg);
    }

    function infoSTYLE(){
        var textSTYLE = $("<p class='infoDestroy'>Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language.[1] Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications</p>")
        var imgSTYLE = $("<img src='eg.png' class='test infoDestroy'>")
        var linkSTYLE = $("<p class='infoDestroy'>You can learn more at <a href='https://www.w3schools.com/html/html_css.asp'>W3.School</a></p>")
        
        $(".infoDestroy").remove();
        $(".infoAppend").append(textSTYLE);
        $(".infoAppend").append(imgSTYLE);
        $(".infoAppend").append(linkSTYLE);
    }
    
    $(document).keypress(function(e) {
        if(e.which == 13) {
            $(".myButton").trigger("click");
        }
    });
    
    setTimeout(() => {checkInput()}, 1000);
    
    function startCode(){
        if ($("#main-input").click(function(){
            $( ".queryCard" ).removeClass( "bounce infinite" );
        }))
        // setTimeout(()=>{$( ".queryCard" ).removeClass( "slideInRight" ).addClass( "bounce infinite" )},1000);        
        $("body").on("click","#addButton",function(){
            var blogID = $("#createID").val();
            var image= $("#createImgLink").val();
            var titleID= $("#createTitleID").val();
            var title= $("#createTitle").val();
            var textID= $("#createTextID").val();
            var text= $("#createText").val();
            
            var post = new Post(
                blogID,
                image,
                titleID,
                title,
                textID,
                text,    
            )
            app.postList.push(post);
        })

        $('body').on('click', '#styleButton', function() {
            var param0 = $("#selectID").val();
            var param1 = $("#setProperty").val();
            var param2 = $("#setValue").val();
            console.log(param0,param1,param2);
            styleElements(param0,param1,param2);
        });
    
        $('body').on('click', '#editButton', function() {
            var x = $("#selectID").val();
            var y =  $("#setValue").val();
            editElements(x,y);
        });

        $('body').on('click', '#deleteButton', function() {
            var param = $("#selectID").val();
            deleteElements(param);
            console.log(deleteElements(param));
        });
       
        // $(".list-group-item").click(function(){
        //    $(".card-special").remove()
        //    setTimeout(()=>{animateCardTheHardWay();},10)
        // })
        $("#item-1").click(function(){
            $(".card-special").remove()
            setTimeout(()=>{animateCardTheHardWay();$(".card-title").text("Blog Builder"); $(".card-img").attr("src","https://shuttlerocket.com.au/wp-content/uploads/2015/11/blog-builder-600x400.png?x45173");},10)
            $("#infoTitle").text("Blog Builder");
            $("#infoText").text("You will be creating your own head to toe customized blog using HTML and Javascript! You will get familiar with  DOM manipulations in web development.")
            $("a").attr("href","protodesign2.html");
        })

        $("#item-2").click(function(){
            $(".card-special").remove()
            setTimeout(()=>{animateCardTheHardWay();$(".card-title").text("TicTacCode !");$(".card-img").attr("src","https://upload.wikimedia.org/wikipedia/commons/8/89/Jogo_da_velha_-_tic_tac_toe.png");},10)
            $("#infoTitle").text("TicTacCode !");
            $("#infoText").text("You will be creating a TicTacToe game using Javascript and HTML5. This course will teach you about condition statements and logics.")
            
        })

        $("#item-3").click(function(){
            $(".card-special").remove()
            setTimeout(()=>{animateCardTheHardWay();$(".card-title").text("Blockly Coding Challenges!");$(".card-img").attr("src","http://revoseek.com/wp-content/uploads/2012/06/Blockly.jpg");},10)
            $("#infoTitle").text("Blockly Coding Challenges!");
            $("#infoText").text("Blockly is a client-side JavaScript library for creating visual block programming languages and editors. Through a set of gradually complex challenges, students will learn the bases of codings through if/else conditions, while loops and much more. ")
            $("a").attr("href","blockly.html");
        })

        // $("#saveButton").click(function(){
        //     $(document).bind("keyup keydown", function(e){
        //         (e.ctrlKey && e.which == 83){
        //             myfunction();
        //         }
        //     });
            
        //     function myfunction(){
        //         alert("Key pressed Ctrl+s");
        //     }
        // })
        $("#saveButton").click(function() {
            var e = $.Event( "keydown keyup", { keyCode: 83, ctrlKey:true} );
            $("body").trigger(e);
           
        });
    }
    
    

    $(".menuButton").click(function(){
        $(".ssss").toggle(".ssssActive");
    })
   
    
    
    function myFunction22() {
        $('.appendMenu').remove(btn_save);
        $('.appendMenu').remove(btn_home);
        $('.appendMenu').remove(btn_help);
        $('.appendMenu').remove(btn_preview);
        $(".menuButton2").toggleClass("menuButton");    
    }
    
    















})