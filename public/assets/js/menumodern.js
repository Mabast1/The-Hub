$(document).ready(function(){
    var last_active = sessionStorage.getItem("last_activeTab");
    // console.log(last_active)
    web_page_start()
    
    $(".learnCards_demo").click(function(){
        alert("This demo limits your access to certain pieces. Only Fifth grade is currently available.")
    })
    $(".learnCards_demo2").click(function(){
        alert("This demo limits your access to certain pieces. You can take a peek at Coding & Programming however.")
    })
    function activeBBox(){
        // console.log(animClick)
        $(".circMnu").removeClass("circMnuSlt");
        $(".mTxt").css("color","black");
        $("#txt3").css("color","#1f94d2");
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#bboxB").addClass("active");
        $("#bboxB").addClass("show");
        $("#nav-bbox").addClass("active");
        $("#nav-bbox").addClass("show");

        if(2 < animClick ){
            $(".activeMnu").addClass("animated fadeInRight");
            $(".activeMnu").removeClass("activate");
            $("#bhr").addClass("activate");
            animClick = 2
            setTimeout(() => {
                $(".activeMnu").removeClass("animated fadeInRight");
            }, 810);
        }
        else{
            $(".activeMnu").addClass("animated fadeInLeft");
            $(".activeMnu").removeClass("activate");
            $("#bhr").addClass("activate");
            animClick = 2
            setTimeout(() => {
                $(".activeMnu").removeClass("animated fadeInLeft");
            },810) 
        }
    }

    function activeSocial(){
        // console.log(animClick)
        $(".circMnu").removeClass("circMnuSlt");
        $(".mTxt").css("color","black");
        $("#txt4").css("color","#1f94d2");
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#socialB").addClass("active");
        $("#socialB").addClass("show");
        $("#nav-social").addClass("active");
        $("#nav-social").addClass("show");

        if(3 < animClick ){
            $(".activeMnu").addClass("animated fadeInLeft");
            $(".activeMnu").removeClass("activate");
            $("#nhr").addClass("activate");
            animClick = 3
            setTimeout(() => {
                $(".activeMnu").removeClass("animated fadeInLeft");
            }, 810);
        }
        else{
            $(".activeMnu").addClass("animated fadeInLeft");
            $(".activeMnu").removeClass("activate");
            $("#nhr").addClass("activate");
            animClick = 3
            setTimeout(() => {
                $(".activeMnu").removeClass("animated fadeInLeft");
            },810) 
        }
    }

    function activeCategory(){
        console.log(animClick)
        $(".circMnu").removeClass("circMnuSlt");
        $(".mTxt").css("color","black");
        $("#txt2").css("color","#1f94d2");
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#catB").addClass("active");
        $("#catB").addClass("show");
        $("#nav-cat").addClass("active");
        $("#nav-cat").addClass("show");

        $(".sMenu").removeClass("active");
        $(".sMenu").removeClass("show");
        $(".catPanel").removeClass("active");
        $(".catPanel").removeClass("show");
        $("#codePane").addClass("active");
        $("#codePane").addClass("show");

        if(1 < animClick ){
            $(".activeMnu").addClass("animated fadeInRight");
            $(".activeMnu").removeClass("activate");
            $("#chr").addClass("activate");
            animClick = 1
            setTimeout(() => {
                $(".activeMnu").removeClass("animated fadeInRight");
            }, 810);
        }
        else{
            $(".activeMnu").addClass("animated fadeInLeft");
            $(".activeMnu").removeClass("activate");
            $("#chr").addClass("activate");
            animClick = 1
            setTimeout(() => {
                $(".activeMnu").removeClass("animated fadeInLeft");
            },810) 
        }
    }

    function activeHome(){
        // console.log(animClick)
        $(".circMnu").removeClass("circMnuSlt");
        $(".mTxt").css("color","black");
        $("#txt1").css("color","#1f94d2");
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#homeB").addClass("active");
        $("#homeB").addClass("show");
        $("#nav-home").addClass("active");
        $("#nav-home").addClass("show");

        if(1 < animClick ){
            $(".activeMnu").addClass("animated fadeInRight");
            $(".activeMnu").removeClass("activate");
            $("#hhr").addClass("activate");
            animClick = 1
            setTimeout(() => {
                $(".activeMnu").removeClass("animated fadeInRight");
            }, 810);
        }
        else{
            $(".activeMnu").addClass("animated fadeInRight");
            $(".activeMnu").removeClass("activate");
            $("#hhr").addClass("activate");
            animClick = 1
            setTimeout(() => {
                $(".activeMnu").removeClass("animated fadeInRight");
            },810) 
        }
    }

    function activeProfile(){
        $(".mTxt").css("color","black");
        $("#txt3").css("color","#1f94d2");
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#profileB").addClass("active");
        $("#profileB").addClass("show");
        $("#nav-profile").addClass("active");
        $("#nav-profile").addClass("show");

        $(".activeMnu").addClass("animated fadeInRight");
        $(".activeMnu").removeClass("activate");
        $("#phr").addClass("activate");
        animClick = 0
        setTimeout(() => {
            $(".activeMnu").removeClass("animated fadeInRight");
        }, 810);
    }

    function activeClasses(){
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#classesB").addClass("active");
        $("#classesB").addClass("show");
        $("#nav-classes").addClass("active");
        $("#nav-classes").addClass("show");
        $("#learnOpt").removeClass("fadeOutLeft");   
    }

    function activeStem_academy(){
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#stemB").addClass("active");
        $("#stemB").addClass("show");
        $("#nav-stemacademy").addClass("active");
        $("#nav-stemacademy").addClass("show");
        $("#learnOpt").removeClass("fadeOutLeft");   
    }
    
    
    
    function web_page_start(){
        if(last_active === "bbox"){
            activeBBox()
        }
        else if(last_active === "home"){
            activeHome()
        }
        else if(last_active === "categories"){
            activeCategory()
        }
        else if(last_active === "social"){
            activeSocial()
        }
        else if(last_active === "profile"){
            activeProfile()
        }
        else if(last_active === "classes"){
            activeClasses();
            if(3 < animClick ){
                $(".activeMnu").addClass("animated fadeInLeft");
                $(".activeMnu").removeClass("activate");
                $("#nhr").addClass("activate");
                animClick = 3
                setTimeout(() => {
                    $(".activeMnu").removeClass("animated fadeInLeft");
                }, 810);
            }

            else if(last_active === "stem"){
                activeStem_academy();
                if(3 < animClick ){
                    $(".activeMnu").addClass("animated fadeInLeft");
                    $(".activeMnu").removeClass("activate");
                    $("#nhr").addClass("activate");
                    animClick = 3
                    setTimeout(() => {
                        $(".activeMnu").removeClass("animated fadeInLeft");
                    }, 810);
                }
                else{
                    $(".activeMnu").addClass("animated fadeInLeft");
                    $(".activeMnu").removeClass("activate");
                    $("#nhr").addClass("activate");
                    animClick = 3
                    setTimeout(() => {
                        $(".activeMnu").removeClass("animated fadeInLeft");
                    },810) 
                }
            }

            else{
                $(".activeMnu").addClass("animated fadeInLeft");
                $(".activeMnu").removeClass("activate");
                $("#nhr").addClass("activate");
                animClick = 3
                setTimeout(() => {
                    $(".activeMnu").removeClass("animated fadeInLeft");
                },810) 
            }
        }

        
    }
    


    var mode = localStorage.getItem("mode")
    if(mode == "dark"){
        dark_mode();
        $("#dmodeOn").addClass("activate");
        $("#dmodeOff").removeClass("activate");
        $("#textOn").css("color","#2492d0")
    }
    else if(mode == "light"){
        $("#dmodeOff").addClass("activate");
        $("#dmodeOn").removeClass("activate");
        $("#textOff").css("color","#2492d0")
    }
    


    $(".steps").hover(function(){
        $(this).addClass("animated bounceIn");
        setTimeout(() => {
            $(this).removeClass("animated bounceIn ");
        }, 1000);
    })

    // $(".l-menuTest").hover(function(){
    //     $(this).removeClass("animated rollIn");
    //     $(this).addClass("animated bounceIn");
    //     setTimeout(() => {
    //         $(this).removeClass("animated bounceIn");

    //     }, 1000);
    // })


    //=====================================
    //back end to front end
    $.ajax({
        method: "get",
        url: "/api/data"
    }).done(function(data){
        // console.log(data)
        var fname = data[0].firstname;
        var lname = data[0].lastname;
        var user_exp = data[0].achievement[0];
        var user_lvl = data[0].achievement[1];
        var user_ttl = data[0].achievement[2];
        $(".username").text(fname + " " + lname);
        $("#user_name").text(fname + " " + lname);  
        $("#u_name").text(fname + " " + lname);  
        $("#u_title").text(user_ttl); 
        $("#u_lvl").text(user_lvl);   
        $("#u_exp").text(user_exp); 
        $("#avatar").attr("src",data[0].ppic); 
        $("#dashboard_avatar").attr("src",data[0].ppic);
        sessionStorage.setItem("user_",data[0].username);     
    });
    var username = sessionStorage.getItem("user_");
    $("#inpUser").attr("value",username)
    
    $(".d_modeB").click(function(){
        // console.log("clicked");
        // console.log($(this).text())
        
        if($(this).text() === "On"){
            dark_mode();
            localStorage.removeItem("mode");
            localStorage.setItem("mode","dark");
            $("#dmodeOn").addClass("activate");
            $("#dmodeOff").removeClass("activate");
            $(this).css("color","#2492d0")
        }
        else if($(this).text() == "Off") {
            light_mode();
            localStorage.removeItem("mode");
            localStorage.setItem("mode","light");
            $("#dmodeOff").addClass("activate");
            $("#dmodeOn").removeClass("activate");
            $(this).css("color","#2492d0")
        }
    })
    function dark_mode(){
        $("body").css("background-color","#2e2e2e");
        $("#navTab").attr("style","background-color:#2e2e2e !important");
        $(".wrapper").css("background-color","#2e2e2e");
        $(".sections").css("background-color"," rgba(0, 0, 0, 0.3)");
        $(".modal-content").css("background-color"," rgba(255, 255, 255, 0.3)");
        $(".infobox").css("background-color"," rgba(0, 0, 0, 0.3)");
        $(".infobox2").css("background-color"," rgba(0, 0, 0, 0.3)");
        $(".pHighlights").css("background-color"," rgba(0, 0, 0, 0.3)");
        $(".l-menu").css("background-color"," rgba(0, 0, 0, 0.3)");
        $(".l-menu").addClass("hover_dark");
        $(".learnCards").addClass("hover_dark");
        $(".learnCards").css("background-color"," rgba(0, 0, 0, 0.3)");
        $(".overlay-custom").css("background-color"," rgba(0, 0, 0, 0.6)");
        $("h4").css("color","white");
        $("ul").css("color","white");
        $("ol").css("color","white");
        $(".hrSep").css("background-color","whitesmoke");
        $("h6").css("color","whitesmoke");
        $("h3").css("color","whitesmoke");
        $("p").css("color","white");
        $(".text-center").css("color","white");
        $("i").css("color","white");
        $(".textInfo").css("color","white");
        $(".mytext").css("background-color","white");
        $(".card-title").css("color","white");
        $(".navText").css("color","whitesmoke");
        $(".username").css("color","white");
        $(".custom_input").css("color","white");
        $(".sep").css("background-color","whitesmoke");
        

       
    }

    function light_mode(){
        $("body").css("background-color","white");
        $("#navTab").attr("style","background-color:white !important");
        $(".wrapper").css("background-color","white");
        $(".sections").css("background-color"," rgba(255, 255, 255, 0.25)");
        $(".infobox").css("background-color"," rgba(255, 255, 255, 0.25)");
        $(".infobox2").css("background-color"," rgba(255, 255, 255, 0.25)");
        $(".pHighlights").css("background-color"," rgba(255, 255, 255, 0.25)");
        $(".l-menu").css("background-color"," rgba(255, 255, 255, 0.25)");
        $(".l-menu").removeClass("hover_dark");
        $(".learnCards").removeClass("hover_dark");
        $(".learnCards").css("background-color"," rgba(255, 255, 255, 0.25)");
        $(".overlay-custom").css("background-color"," rgba(255, 255, 255, 0.89)");
        $("h4").css("color","black");
        $("ul").css("color","black");
        $("ol").css("color","black");
        $(".hrSep").css("background-color","whitesmoke");
        $("h6").css("color","black");
        $("h3").css("color","black");
        $("p").css("color","black");
        $(".text-center").css("color","black");
        $("i").css("color","black");
        $(".textInfo").css("color","black");
        $(".mytext").css("background-color","black");
        $(".card-title").css("color","black");
        $(".navText").css("color","#5e5e5e");
        $(".username").css("color","black");
        $(".sep").css("background-color","whitesmoke");
        setTimeout(() => {
            location.reload()
        }, 150);
        

       
    }
    

    
    
    var clicked = false;
    var darkMode = false;
    var animClick = 0;
    // console.log(clicked);
    $(function () {
        $('[data-toggle="popover"]').popover()
    })

    $("#coding").click(function(){
        $(".sMenu").removeClass("selected");
        $("#coding").addClass("selected");
    })

    $("#web").click(function(){
        $(".sMenu").removeClass("selected");
        $("#web").addClass("selected");
    })

    $("#robot").click(function(){
        $(".sMenu").removeClass("selected");
        $("#robot").addClass("selected");
    })

    $("#engine").click(function(){
        $(".sMenu").removeClass("selected");
        $("#engine").addClass("selected");
    })

    //----------------------------------------------------------------------------------
    $("#homeB").click(function(){
        sessionStorage.setItem("last_activeTab","home");    
        activeHome()    
    })

    
    $("#catB").click(function(){
        sessionStorage.setItem("last_activeTab","categories");    
        activeCategory()    
    });

    $("#bboxB").click(function(){
        sessionStorage.setItem("last_activeTab","bbox");    
        activeBBox()      
    });
    $("#socialB").click(function(){
        sessionStorage.setItem("last_activeTab","social");    
        activeSocial()
    })

    $("#profileB").click(function(){
        sessionStorage.setItem("last_activeTab","profile");    
        activeProfile()    
    })
    $("#stemB").click(function(){
        sessionStorage.setItem("last_activeTab","stem");    
        activeStem_academy()    
    })


    $("#materialB").click(function(){
        // $(".circMnu").removeClass("circMnuSlt");
        // $(".mTxt").css("color","black");
        // $("#txt4").css("color","#1f94d2");
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#materialB").addClass("active");
        $("#materialB").addClass("show");
        $("#nav-material").addClass("active");
        $("#nav-material").addClass("show");
    })
    $("#prepB").click(function(){
        // $(".circMnu").removeClass("circMnuSlt");
        // $(".mTxt").css("color","black");
        // $("#txt4").css("color","#1f94d2");
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#prepB").addClass("active");
        $("#prepB").addClass("show");
        $("#nav-prep").addClass("active");
        $("#nav-prep").addClass("show");
    })
    $("#overviewB").click(function(){
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#overviewB").addClass("active");
        $("#overviewB").addClass("show");
        $("#nav-overview").addClass("active");
        $("#nav-overview").addClass("show");
    })
    $("#imagesB").click(function(){
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#imagesB").addClass("active");
        $("#imagesB").addClass("show");
        $("#nav-images").addClass("active");
        $("#nav-images").addClass("show");
    })
    $("#essentialB").click(function(){
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#essentialB").addClass("active");
        $("#essentialB").addClass("show");
        $("#nav-essential").addClass("active");
        $("#nav-essential").addClass("show");
    })
    $("#conceptsB").click(function(){
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#conceptsB").addClass("active");
        $("#conceptsB").addClass("show");
        $("#nav-concepts").addClass("active");
        $("#nav-concepts").addClass("show");
    })
    $("#stepsB").click(function(){
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#stepsB").addClass("active");
        $("#stepsB").addClass("show");
        $("#nav-steps").addClass("active");
        $("#nav-steps").addClass("show");
        
    })
    $("#factsB").click(function(){
        $(".menu-item").removeClass("active");
        $(".menu-item").removeClass("show");
        $(".tab-pane").removeClass("active");
        $(".tab-pane").removeClass("show");
        $("#factsB").addClass("active");
        $("#factsB").addClass("show");
        $("#nav-facts").addClass("active");
        $("#nav-facts").addClass("show");
    })

    $(".gearClass").click(function(){
        var x = $(this).attr("value");
        if(x == "material"){
            $(this).addClass("animated flipInX")
            $(this).attr("src","assets/covers/Material-Dark-Blue.png");

            $("#prepB").attr("src","assets/covers/Prep-Light-Blue.png")
            $("#essentialB").attr("src","assets/covers/Essentials-Light-Blue.png")
            $("#conceptsB").attr("src","assets/covers/KeyConcepts-Light-Blue.png")
            $("#stepsB").attr("src","assets/covers/Steps-Light-Blue.png")
            $("#factsB").attr("src","assets/covers/FunFacts-Light-Blue.png")
            setTimeout(() => {
                $(this).removeClass("animated flipInX")
            }, 500);
            
        }
        else if(x == "prep"){
            $(this).addClass("animated flipInX")
            $(this).attr("src","assets/covers/Prep-Dark-Blue.png")

            $("#materialB").attr("src","assets/covers/Material-Light-Blue.png")
            $("#essentialB").attr("src","assets/covers/Essentials-Light-Blue.png")
            $("#conceptsB").attr("src","assets/covers/KeyConcepts-Light-Blue.png")
            $("#stepsB").attr("src","assets/covers/Steps-Light-Blue.png")
            $("#factsB").attr("src","assets/covers/FunFacts-Light-Blue.png")
            setTimeout(() => {
                $(this).removeClass("animated flipInX")
            }, 500);
            
        }
        else if(x == "essentials"){
            $(this).addClass("animated flipInX")
            $(this).attr("src","assets/covers/Essentials-Dark-Blue.png")

            $("#prepB").attr("src","assets/covers/Prep-Light-Blue.png")
            $("#materialB").attr("src","assets/covers/Material-Light-Blue.png")
            $("#conceptsB").attr("src","assets/covers/KeyConcepts-Light-Blue.png")
            $("#stepsB").attr("src","assets/covers/Steps-Light-Blue.png")
            $("#factsB").attr("src","assets/covers/FunFacts-Light-Blue.png")
            setTimeout(() => {
                $(this).removeClass("animated flipInX")
            }, 500);
            
        }
        else if(x == "concepts"){
            $(this).addClass("animated flipInX")
            $(this).attr("src","assets/covers/KeyConcepts-Dark-Blue.png")

            $("#prepB").attr("src","assets/covers/Prep-Light-Blue.png")
            $("#essentialB").attr("src","assets/covers/Essentials-Light-Blue.png")
            $("#materialB").attr("src","assets/covers/Material-Light-Blue.png")
            $("#stepsB").attr("src","assets/covers/Steps-Light-Blue.png")
            $("#factsB").attr("src","assets/covers/FunFacts-Light-Blue.png")
            setTimeout(() => {
                $(this).removeClass("animated flipInX")
            }, 500);
            
        }
        else if(x == "steps"){
            $(this).addClass("animated flipInX")
            $(this).attr("src","assets/covers/Steps-Dark-Blue.png")

            $("#prepB").attr("src","assets/covers/Prep-Light-Blue.png")
            $("#essentialB").attr("src","assets/covers/Essentials-Light-Blue.png")
            $("#conceptsB").attr("src","assets/covers/KeyConcepts-Light-Blue.png")
            $("#materialB").attr("src","assets/covers/Material-Light-Blue.png")
            $("#factsB").attr("src","assets/covers/FunFacts-Light-Blue.png")
            setTimeout(() => {
                $(this).removeClass("animated flipInX")
            }, 500);
            
        }
        else if(x == "ffacts"){
            $(this).addClass("animated flipInX")
            $(this).attr("src","assets/covers/FunFacts-Dark-Blue.png")

            $("#prepB").attr("src","assets/covers/Prep-Light-Blue.png")
            $("#essentialB").attr("src","assets/covers/Essentials-Light-Blue.png")
            $("#conceptsB").attr("src","assets/covers/KeyConcepts-Light-Blue.png")
            $("#stepsB").attr("src","assets/covers/Steps-Light-Blue.png")
            $("#MaterialB").attr("src","assets/covers/Material-Light-Blue.png")
            setTimeout(() => {
                $(this).removeClass("animated flipInX")
            }, 500);
            
        }

        else if(x == "submit"){
            $(this).addClass("animated flipInX")
            $(this).attr("src","assets/covers/Selected-Gear-Menu")

            $("#factsB").attr("src","assets/covers/FunFacts-Light-Blue.png")
            $("#prepB").attr("src","assets/covers/Prep-Light-Blue.png")
            $("#essentialB").attr("src","assets/covers/Essentials-Light-Blue.png")
            $("#conceptsB").attr("src","assets/covers/KeyConcepts-Light-Blue.png")
            $("#stepsB").attr("src","assets/covers/Steps-Light-Blue.png")
            $("#MaterialB").attr("src","assets/covers/Material-Light-Blue.png")
            setTimeout(() => {
                $(this).removeClass("animated flipInX")
            }, 500);
            
        }

    })

    $("#classesB").click(function(){
        sessionStorage.setItem("last_activeTab","classes");    
        // $("#learnOpt").addClass("fadeOutLeft");
        $(".l-menuTest").addClass("rollOut");
        setTimeout(() => {
            $(".l-menuTest").removeClass("rollOut");
            activeClasses()
        }, 550);
        
        
        
    })

    $("#mBtn").click(function(){
        if(clicked == false){
            $("#mBtn").text("close");
            // console.log(clicked);
            clicked = true;
            
        }
        else if (clicked == true){
            $("#mBtn").text("menu");
            // console.log(clicked);
            clicked = false;

            
        }
    })

    // $("#robot").click(function(){
    //     $(".menu-item").removeClass("active");
    //     $("#robot").addClass("active");
    // })

    // $("#engine").click(function(){
    //     $(".menu-item").removeClass("active");
    //     $("#engine").addClass("active");
    // })

    $(".popvideo").click(function(){
        
        // console.log($(this).attr("src"));
        var display = $(this).attr("src")
        $("#poppedVid").attr("src", display)
    })

    $(".popimg").click(function(){
        
        // console.log($(this).attr("src"));
        var showImg = $(this).attr("src")
        $("#displayImg").attr("src", showImg)
    })

    // panel for category section
    $("#web").click(function(){
        $(".sMenu").removeClass("active");
        $(".sMenu").removeClass("show");
        $(".catPanel").removeClass("active");
        $(".catPanel").removeClass("show");
        $("#webPane").addClass("active");
        $("#webPane").addClass("show");
    })
    $("#coding").click(function(){
        $(".sMenu").removeClass("active");
        $(".sMenu").removeClass("show");
        $(".catPanel").removeClass("active");
        $(".catPanel").removeClass("show");
        $("#codePane").addClass("active");
        $("#codePane").addClass("show");
    })
    $("#engine").click(function(){
        $(".sMenu").removeClass("active");
        $(".sMenu").removeClass("show");
        $(".catPanel").removeClass("active");
        $(".catPanel").removeClass("show");
        $("#noapp").addClass("active");
        $("#noapp").addClass("show");
    })
    $("#robot").click(function(){
        $(".sMenu").removeClass("active");
        $(".sMenu").removeClass("show");
        $(".catPanel").removeClass("active");
        $(".catPanel").removeClass("show");
        $("#noapp").addClass("active");
        $("#noapp").addClass("show");
    })

    $("#btn1").click(function(){
        $("#materialB").css("background-color","#43A047")
    })
    $("#btn2").click(function(){
        $("#prepB").css("background-color","#43A047")
    })
    $("#btn3").click(function(){
        $("#essentialB").css("background-color","#43A047")
    })
    $("#btn4").click(function(){
        $("#conceptsB").css("background-color","#43A047")
    })
    $("#btn5").click(function(){
        $("#stepsB").css("background-color","#43A047")
    })
    $("#btn6").click(function(){
        $("#materialB").css("background-color","#43A047")
    })
    $("#btn1").click(function(){
        $("#materialB").css("background-color","#43A047")
    })

    function checkScreen(x) {
        if (x.matches) { // If media query matches
            $('#alertMsg').modal("show")
        } 
    }
      
    var x = window.matchMedia("(max-width: 767px)")
    checkScreen(x) // Call listener function at run time
    x.addListener(checkScreen) // Attach listener function on state changes

    
    //adding extra text boxes for classes
    var inputGroup = $('<div class="input-group">');
    var inputGPrep = $('<div class="input-group-prepend">');
    var span = $('<span class="input-group-text">Material</span>');
    var textarea = $('<textarea class="form-control" aria-label="With textarea"></textarea>');
    var closeDiv = $('</div>');
    
    function appendList(){
        // console.log("clicked")
        $("#stArea").append(inputGroup);
        $(inputGroup).append(inputGPrep);
        $(inputGPrep).append(span);
        $(inputGPrep).append(closeDiv);
        $(inputGPrep).append(textarea);
        $(inputGroup).append(closeDiv);
        $("#stArea").append(closeDiv);
    }
    $("#addStudent").click(function(){
        for(i=0;i<10;i++){
            // console.log("hello")
            appendList()
        }
    })
    
    $(".learnCards").click(function(){
        var type = $(this).attr("value");
        var text = $(this).text();
        localStorage.removeItem("Class");
        localStorage.setItem("Class", type);
        sessionStorage.setItem("for",text);
        sessionStorage.setItem("last_activeTab","classes")
        window.location.href = "courses.html"
    })
    $(".btn").click(function(){
        var type = $(this).val();
        localStorage.removeItem("Class");
        localStorage.setItem("Class", type);
    })
    
})
