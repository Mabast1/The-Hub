$(document).ready(function(){
    //back end to front end
    $.ajax({
        method: "get",
        url: "/api/data"
    }).done(function(data){
        var fname = data[0].firstname;
        var lname = data[0].lastname;
        var user_exp = data[0].achievement[0];
        var user_lvl = data[0].achievement[1];
        var user_ttl = data[0].achievement[2];
        $(".username").text(fname + " " + lname);
        $("#user_name").text(fname + " " + lname);
        $("#user_exp").text(user_exp + " XP");
        $("#user_lvl").text(user_lvl);
        $("#user_ttl").text(user_ttl);
        $("#user_username").text(data[0].username);
        $("#user_location").text(data[0].city +", " + data[0].state);
        $("#user_country").text(data[0].country);

        
    });

    mainMENU();
    catMENU();
    newMenu();

    var menuToggle = 0;

    function removeAll() {
        $("#hhr").removeClass("activate");
        $("#chr").removeClass("activate");
        $("#bhr").removeClass("activate");
        $("#nhr").removeClass("activate");

        $("#hhr").removeClass("non-active");
        $("#chr").removeClass("non-active");
        $("#bhr").removeClass("non-active");
        $("#nhr").removeClass("non-active");

    }

    function removeAllCategories(){
        // $("#webframe").removeClass("show");
        // $("#codeframe").removeClass("show");
        // $("#robotframe").removeClass("show");
        // $("#engineframe").removeClass("show");

        $("#webframe").addClass("d-none");
        $("#codeframe").addClass("d-none");
        $("#robotframe").addClass("d-none");
        $("#engineframe").addClass("d-none");
    }

    function removeAllMenu(){
        $("#dashFrame").addClass("d-none");
        $("#catFrame").addClass("d-none");
        $("#bbFrame").addClass("d-none");
        $("#scFrame").addClass("d-none");
        $("#ppFrame").addClass("d-none");
        // $("#robotframe").addClass("d-none");
        // $("#engineframe").addClass("d-none");
    }

    function mainMENU(){
        $("#hnav").click(function(){
            removeAll();
            setTimeout(() => { $("#hhr").addClass("activate");}, 50);
        })
        $("#cnav").click(function(){
            removeAll();
            setTimeout(() => { $("#chr").addClass("activate");}, 50);
            $("#categories").addClass("show");
           
        })
        $("#bnav").click(function(){
            removeAll();
            setTimeout(() => { $("#bhr").addClass("activate");}, 50);
            $("#bbox").addClass("show");
        })
        $("#nnav").click(function(){
            removeAll();
            setTimeout(() => { $("#nhr").addClass("activate");}, 50);
            $("#news").addClass("show");
        });
        $("#pnav").click(function(){
            removeAll();
            $("#profile").addClass("show");
        })

    }

    function catMENU(){
        $("#web").click(function(){
            removeAllCategories();
            setTimeout(() => { $("#webframe").removeClass("d-none");}, 50);
            setActiveCat();
            $("#web").addClass("catActive");
        })
        $("#coding").click(function(){
            removeAllCategories();
            setTimeout(() => { $("#codeframe").removeClass("d-none");}, 50);
            setActiveCat();
            $("#coding").addClass("catActive");
        })
        $("#robotics").click(function(){
            removeAllCategories();
            setTimeout(() => { $("#robotframe").removeClass("d-none");}, 50);
            setActiveCat();
            $("#robotics").addClass("catActive");
        })
        $("#engineering").click(function(){
            removeAllCategories();
            setTimeout(() => { $("#engineframe").removeClass("d-none");}, 50);
            setActiveCat();
            $("#engineering").addClass("catActive");
        })
    }

    function setActiveCat(){
        $("#coding").removeClass("catActive");
        $("#web").removeClass("catActive");
        $("#robotics").removeClass("catActive");
        $("#engineering").removeClass("catActive");
    }
    
    function newMenu(){
        $("#catB").click(function(){
            removeAllMenu();
            setTimeout(() => { $("#catFrame").removeClass("d-none");}, 50);
        })
        $("#dashB").click(function(){
            removeAllMenu();
            setTimeout(() => { $("#dashFrame").removeClass("d-none");}, 50);
        })
        $("#brainB").click(function(){
            removeAllMenu();
            setTimeout(() => { $("#bbFrame").removeClass("d-none");}, 50);
        })
        $("#profile").click(function(){
            removeAllMenu();
            setTimeout(() => { $("#ppFrame").removeClass("d-none");}, 50);
        })
        $("#socialB").click(function(){
            removeAllMenu();
            setTimeout(() => { $("#scFrame").removeClass("d-none");}, 50);
        })
    }
    
    $("#toggle").click(function(){
        if(menuToggle == 0){
            $("#toggleB").removeClass("menu-load-2");
            setTimeout(() => {
                $("#toggleB").addClass("menu-load");
            }, 5);
            $(".menuP").css("visibility","hidden");
            $(".menuP").css("font-size","0px");
            
            $("#toggleB").text("close");
            console.log("clicked!");
            $("#menu-bar").removeClass("menu-bar-expand");
            $("#menu-bar").addClass("menu-bar-reduce");
            $("#menu-bar").css("max-width","5%");
            $("#menu-bar").css("flex","0 0 5%");
            
            
            // $("#content").css("padding-bottom","30px");
            $("#content").css("flex","0 0 95%");
            $("#content").css("max-width","95%");
            // $(".menuP").css("padding-top","10px");
            // $(".menuP").css("padding-bottom","10px");
            menuToggle =1;
            
            
            
        }

        else if(menuToggle == 1){
            $("#toggleB").removeClass("menu-load");
            setTimeout(() => {
                $("#toggleB").addClass("menu-load-2");
            }, 5);
            
            $("#toggleB").text("menu");
            console.log("clicked!");
            $("#menu-bar").removeClass("menu-bar-reduce");
            $("#menu-bar").addClass("menu-bar-expand");
            $("#menu-bar").css("flex","0 0 16.666667%");
            $("#menu-bar").css("max-width","16.666667%");
            // $("#content").css("padding-bottom","0px");
            $("#content").css("flex","0 0 83.333333%");
            $("#content").css("max-width","83.333333%");
            setTimeout(() => {
                // $(".menuP").css("padding-top","0px");
                // $(".menuP").css("padding-bottom","0px")
                $(".menuP").css("font-size","medium");;
                $(".menuP").css("visibility","visible");
                
                menuToggle =0;
            }, 50);
            
           
            
            
        }
    })
    
})
