$(document).ready(function(){
    $("#student").click(function(){
        // $("body").css("background-color","#01579B")
        // $("#signin-col").addClass("animated jello")
        $(".firebaseui-card-content").addClass("animated flipInY")
        // $("#whatami").text("I'm a student !")
        setTimeout(() => {
            $("#signin-col").removeClass("animated jello")
            $(".firebaseui-card-content").removeClass("animated flipInY")
        }, 850);
    })
    $("#parent").click(function(){
        // $("body").css("background-color","#263238")
        // $("#signin-col").addClass("animated jello")
        $(".firebaseui-card-content").addClass("animated flipInY")
        // $("#whatami").text("I'm a parent !")
        setTimeout(() => {
            $("#signin-col").removeClass("animated jello")
            $(".firebaseui-card-content").removeClass("animated flipInY")
        }, 850);
    })
    $("#teacher").click(function(){
        $("#whatami").text("I'm a teacher !")
        $("body").css("background-color","#FF3D00")
        // $("#signin-col").addClass("animated jello")
        $(".firebaseui-card-content").addClass("animated flipInY")
        setTimeout(() => {
            $("#signin-col").removeClass("animated jello")
            $(".firebaseui-card-content").removeClass("animated flipInY")
        }, 850);
    })
    $(".mynav").click(function(){
        $(".mynav").removeClass("active-nav")
        $(".mynav").removeClass("active")
        $(this).addClass("active-nav")
        // $(this).addClass("active")
    })

    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 200
    });
})