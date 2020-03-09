$(document).ready(function(){
    //creating sign up elements
    var group = $('<div class="text-center" id="uplog">');
    var logform = $('<form action="/" method="post" id="register-form" role="form">');
    var logclose =  $('</form>');
    var inputemail = $('<input class="logininput group text-center" type="username" placeholder="Username" name="username">')
    var inputpassword= $('<input class="logininput group text-center" type="password" placeholder="Password" name="password">');
    var inputpasswordconf = $(' <input class="logininput group text-center" type="password" placeholder="Confirm Password" name="passwordConf">');
    var inputfname = $(' <input class="logininput group text-center" type="text" placeholder="First Name" name="firstname">');
    var inputlname = $('<input class="logininput group text-center" type="text" placeholder="Last Name" name="lastname">');
    var inputcity = $('<input class="logininput group text-center" type="text" placeholder="City" name="city">');
    var inputstate = $(' <input class="logininput group text-center" type="text" placeholder="State" name="state">');
    var inputcountry = $(' <input class="logininput group text-center" type="text" placeholder="Country" name="country">');
    var bsignin = $('<input type="submit" class="btn btn-primary button-s" value="Confirm" name="register-submit" id="register-submit">');
    var bsignup = $('<button type="button" class="btn btn-primary button-s" id="sincoy">Sign in</button>');
    var brake = $('<br>');
    var padding = $('<div style="padding-bottom: 20px"></div>');

    //creating sign in elements
    var group2 = $('<div class="text-center" id="inlog">');
    var inputemail_2 = $('<input class="logininput group text-center" type="username" placeholder="Username">');
    var inputpassword_2 = $('<input class="logininput group text-center" type="password" placeholder="Password">');
    var bbsignin = $('<button type="button" class="btn btn-primary button-s">Confirm</button>');
    var bbsignup = $('<button type="button" class="btn btn-primary button-s" id="supcoy">Sign Up</button>');

    $("#supcoy").click(function(){
        switchIN();
        console.log("Supposed to work");
    })
   
    $(document).on('click', "#sincoy", function() {
        console.log("Supposed to work 2");   
        switchUP();    
    });
    $(document).on('click', "#supcoy", function() {
        console.log("Supposed to work 3");   
        switchIN();    
    });

    function switchIN(){
        $(".logtext").text("Sign Up");
        $("#inlog").remove();
        $("#toAppend").append(group);
        $("#toAppend").append(logform);
        $("#register-form").append(inputemail);
        $("#register-form").append(brake);
        $("#register-form").append(inputpassword);
        $("#register-form").append(brake);
        $("#register-form").append(inputpasswordconf);
        $("#register-form").append(brake);
        $("#register-form").append(inputfname);
        $("#register-form").append(brake);
        $("#register-form").append(inputlname);
        $("#register-form").append(brake);
        $("#register-form").append(inputcity);
        $("#register-form").append(brake);
        $("#register-form").append(inputstate);
        $("#register-form").append(brake);
        $("#register-form").append(inputcountry);
        $("#register-form").append(brake);
        $("#register-form").append('<div style="padding-bottom: 20px"></div>');
        $("#register-form").append(bsignin);
        $("#register-form").append(padding);
        $("#register-form").append(bsignup);
        $("#toAppend").append(logclose);
    }

    function switchUP(){
        $(".logtext").text("Sign In");
        $("#uplog").remove();
        $("#toAppend").append(group2);
        $("#inlog").append(inputemail_2);
        $("#inlog").append(inputpassword_2);
        $("#inlog").append(brake);
        $("#inlog").append('<div style="padding-bottom: 20px"></div>');
        $("#inlog").append(bbsignin);
        $("#inlog").append(padding);
        $("#inlog").append(bbsignup);
    }
 
    
  

});