class Post{
    constructor(name,cover,grade,subject,descr,cogid){
      this.name = name;
      this.cover = cover;
      this.grade = grade;
      this.subject = subject;
      this.descr = descr;
      this.cogid = cogid
    }
}

class Post_Class{
    constructor(name,cover,grade,subject,descr,cogid){
      this.name = name;
      this.cover = cover;
      this.grade = grade;
      this.subject = subject;
      this.descr = descr;
      this.cogid = cogid
    }
}

var app = new Vue ({
    el: "#append-cogs",
    data: {
        postList: []
    }
});

var app_class = new Vue ({
    el: "#append-class",
    data: {
        postList: []
    }
})

$(document).ready(function(){
    var db = firebase.firestore();
    var continue_cogimage = localStorage.getItem("continue_cogimage");
    var continue_cogname = localStorage.getItem("continue_cogname");
    var is_darkmode = localStorage.getItem("dark_mode")
    var user = firebase.auth().currentUser;
    var auth = firebase.auth();
    var email = localStorage.getItem("email")
    setTimeout(() => {
        var ref = db.collection("teachers").doc(localStorage.getItem("email"));
    }, 1000);
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          
          
          localStorage.setItem("email",email);
          checkUser(email,displayName,photoURL);
          
          

          if(photoURL !== null){
            $("#user-pic").attr("src",photoURL);
            $("#user-icon").attr("src",photoURL); 
          }
        } else {
          window.location.href = "/"
        }
    });
    
    getmyData();
    //console.log(is_darkmode)
    if(is_darkmode =="0"){
        dark_mode()
        $(".container-toggle").addClass("on");
        $(".container-toggle-btn").addClass("move-on");
        $(".padded-text").text("ON")
    }
    else {
        light_mode()
        $(".container-toggle").removeClass("on");
        $(".container-toggle-btn").removeClass("move-on");
        $(".padded-text").text("OFF")
    }

    if(continue_cogname == null || continue_cogname == undefined){
        $("#continue").text("No class in progress.")
    }
    else{
        $("#continue-cover").attr("src", continue_cogimage)
        $("#continue").text(continue_cogname)
    }
    
      
    function generateUser(p,p2,p3){
        db.collection("teachers").doc(p).set({
        email:p,
        name:p2,
        ppic: p3,
        role: "teacher",
        students: {},
        classes: [],
        schedule: [],
        pin1: {},
        pin2: {},
        pin3: {},
        pin4: {},
        created_on: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    function createGroup(p){
        empty()
        var ref = db.collection("teachers").doc(localStorage.getItem("email"));

        return ref.update({
            students: firebase.firestore.FieldValue.arrayUnion(p)
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }

    $("#setbranch-btn").click(function(){
        var ref = db.collection("teachers").doc(localStorage.getItem("email"));
        alert("Branch set to "+ $("#setbranch-opt").val())
        return ref.update({
            id: $("#setbranch-opt").val()
        })
    })

    function deleteGroup(p){
        var todelete = sessionStorage.getItem("delete_group")
        var ref = db.collection("teachers").doc(localStorage.getItem("email"));

        return ref.update({
            students: firebase.firestore.FieldValue.arrayRemove(p)
        })
        .then(function() {
            console.log("Document successfully removed!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }

    function pinClass(p1,p2,p3){
        var ref = db.collection("teachers").doc(localStorage.getItem("email"));
        var index = sessionStorage.getItem("index")

        if( index == 0){
            return ref.update({
                pin1: {name:p1,cover:p2,id:p3}
            })
        }

        else if( index == 1){
            return ref.update({
                pin2: {name:p1,cover:p2,id:p3}
            })
        }

        else if( index == 2){
            return ref.update({
                pin3: {name:p1,cover:p2,id:p3}
            })
        }

        else if( index == 3){
            return ref.update({
                pin4: {name:p1,cover:p2,id:p3}
            })
        }
    }

    function reset_passwd(){
        auth.sendPasswordResetEmail(email).then(function() {
            alert("Password reset link sent to email !");
            console.log("Password reset link sent to "+email)
        }).catch(function(error) {
            alert("An error occured. Please try again.")
        });
    }

    $("#pin1").click(function(){
        sessionStorage.setItem("index",0)
    })

    $("#pin2").click(function(){
        sessionStorage.setItem("index",1)
    })

    $("#pin3").click(function(){
        sessionStorage.setItem("index",2)
    })

    $("#pin4").click(function(){
        sessionStorage.setItem("index",3)
    })

    $(".pin").change(function(){
        
        sessionStorage.setItem("x",$(this).val());
        sessionStorage.setItem("y",$('option:selected', this).attr('cover'));
        sessionStorage.setItem("z",$('option:selected', this).attr('classid'));
        console.log($(this).val())
        console.log($(this).attr($('option:selected', this).attr('cover')))
        console.log($(this).attr($('option:selected', this).attr('classid')))
    })
    $("#pin-btn").click(function(){
        var x = sessionStorage.getItem("x")
        var y = sessionStorage.getItem("y")
        var z = sessionStorage.getItem("z")
        pinClass(x,y,z);
        empty()
        console.log(x)
        console.log(y)
    })  

    $("#reset-passwd").click(function(){
        console.log("Password reset link sent to "+email)
        reset_passwd()
    })
    $("#signout").click(function(){
        alert("Hope to see you again !")
        firebase.auth().signOut().then(function() {
          console.log("Successfully signed out")
        }).catch(function(error) {
          console.log("An error occured : " + error)
        });
    })
    function checkUser(p,p2,p3){
        var docRef = db.collection("teachers").doc(p);
        
        docRef.get().then(function(doc) {
            if (doc.exists) {
                var db = doc.data();
                $("#email_val").text(db.email)
            } else {
                generateUser(p,p2,p3);
            }
        }).catch(function(error) {
        });
    }

    function delete_user(){
        user.delete().then(function() {
            // User deleted.
        }).catch(function(error) {
            // An error happened.
        });
    }
    $(".nav-item").click(function(){
        $(".nav-item").removeClass("active");
        $(".nav-item").removeClass("active-menu");
        $(".module-card").removeClass("active");
        $(this).addClass("active-menu");
        setTimeout(() => {
            $("#class-status-select").css("left",$("#active-class").position().left);
            $("#class-status-select").css("width",$("#active-class").width());
            $("#class-status-select").css("visibility","visible");
        }, 600);
    })

    $(".module-card").click(function(){
        $(".module-card").removeClass("active");
    })

    $(".tab-menu").click(function(){
        $(".tab-menu").removeClass("active");
        $(".tab-menu").removeClass("active-tab-menu");
        $(".module-card").removeClass("active");
        $(this).addClass("active-tab-menu");
    })

    $(".nav-item-special").click(function(){
        $(".nav-item-special").removeClass("active");
        $(".module-card").removeClass("active");
        $(this).addClass("active-nav-item-special");
    })

    $(".test").click(function(){
        var x = $(this).position().left;
        var y =  $(this).width()
        $("#class-status-select").css("left",x)
        $("#class-status-select").css("width",y)
    })
    var countit = 0
    $("#addtocart").click(function(){
        var x = $("#shopcart").position().left;
        countit++
        $("#buycart").addClass("animated zoomOutUp")
        setTimeout(() => {
            $("#modal-cog-purchase").modal("hide")
            $("#buycart").removeClass("animated zoomOutUp")
        }, 1000);
        setTimeout(() => {
            $("#shopcart").addClass("animated shake")
            $("#cart-number").text(countit)
        }, 1200);
        setTimeout(() => {
            $("#shopcart").removeClass("animated shake")
        }, 1750);
    })
    $("#type").change(function(){
        var x = $(this).val()
        if(x == "STEM Academy"){
            var object = '<option class="d-levels" value="Kinder">Kinder</option><option class="d-levels" value="First">First</option><option class="d-levels" value="Second">Second</option><option class="d-levels" value="Third">Third</option><option class="d-levels" value="Fourth">Fourth</option><option class="d-levels" value="Fifth">Fifth</option>'
            $(".d-levels").remove()
            $("#level").append(object)
        }
        else{
            var object = '<option class="d-levels" value="Sparks">Sparks</option><option class="d-levels" value="Inventors">Inventors</option><option class="d-levels" value="Innovators">Innovators</option>'
            $(".d-levels").remove()
            $("#level").append(object)
        }
        
    })

    $(".filters").change(function(){
        var x = $("#type").val();
        var y = $("#level").val();
        var z = $("#subject").val();
        console.log($(this).val())
        $("#span-type").text(x)
        $("#span-level").text(y)
        $("#span-subject").text(z)

        if(x == "All" && y == "All" && z == "All"){
            getmyData()
        }
        else if(x == "All" && y == "All"){
            app.postList = [];
            setTimeout(() => {
                filterCogs(0,z)
            }, 50);
            
        }
        else if(x == "All"){
            app.postList = [];
            setTimeout(() => {
                filterCogs(1,z,y)
            }, 50);
            
        }
        else{
            app.postList = [];
            setTimeout(() => {
                filterCogs(2,z,y,x)
            }, 50);
            
        }
        
        
    })

    function filterCogs(p,x,y,z){
        if(p==0){
            db.collection("cogs").where("subject", "==", x).onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    app.postList = [];
                    console.log(doc.data())
                    setTimeout(() => {
                        let post = new Post(
                            doc.data().title,
                            doc.data().cover,
                            doc.data().grade,
                            doc.data().subject,
                            doc.data().descr,
                        )
                        app.postList.push(post)
                    }, 150);  
                });
            });
        }

        else if(p==1){
            db.collection("cogs").where("subject", "==", x).where("level","==",y).onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    app.postList = [];
                    console.log(doc.data())
                    setTimeout(() => {
                        let post = new Post(
                            doc.data().title,
                            doc.data().cover,
                            doc.data().grade,
                            doc.data().subject,
                            doc.data().descr,
                        )
                        app.postList.push(post)
                    }, 150);  
                });
            });
        }

        else if(p==2){
            db.collection("cogs").where("subject", "==", x).where("level","==",y).where("type","==",z).onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    app.postList = [];
                    console.log(doc.data())
                    setTimeout(() => {
                        let post = new Post(
                            doc.data().title,
                            doc.data().cover,
                            doc.data().grade,
                            doc.data().subject,
                            doc.data().descr,
                        )
                        app.postList.push(post)
                    }, 150);  
                });
            });
        }
    }
    function displayCogs(p){
        db.collection("cogs").doc(p).onSnapshot(function(doc) {
            console.log(doc.data())
            app.postList = [];
            setTimeout(() => {
                let post = new Post(
                    doc.data().title,
                    doc.data().cover,
                    doc.data().grade,
                    doc.data().subject,
                    doc.data().descr,
                    doc.data().id
                )
                app.postList.push(post)
            }, 150);  
        });

    }
    
    var x_total = 0
    $(document).on("click",".present-btn",function(){
        var x_per = parseFloat(sessionStorage.getItem("per_students"))
        x_total += x_per
        console.log(x_total)
        $(this).parent(".whitesmoke-container").find(".attendance-status").removeClass( "badge-danger" );
        $(this).parent(".whitesmoke-container").find(".attendance-status").text( "present" );
        $(this).parent(".whitesmoke-container").find(".attendance-status").addClass( "badge-success" );
        $("#attendance-percentage").text(x_total.toFixed(2) + " %")
    })
    $(document).on("click",".absent-btn",function(){
        var x_per = parseFloat(sessionStorage.getItem("per_students"))
        if($(this).parent(".whitesmoke-container").find(".attendance-status").hasClass( "badge-success" )){
            x_total -= x_per;
            $("#attendance-percentage").text(x_total.toFixed(2) + " %")
        }
        // else{
        //     $("#attendance-percentage").text(x_total.toFixed(2) + " %")
        // }
        $(this).parent(".whitesmoke-container").find(".attendance-status").removeClass( "badge-success" );
        $(this).parent(".whitesmoke-container").find(".attendance-status").text( "absent" );
        $(this).parent(".whitesmoke-container").find(".attendance-status").addClass( "badge-danger" );
    })

    function appendStudents(p){
        var students = '<div class="p-2 text-center destroy"><div class="student-wrap animated jackInTheBox"><img class="wrap-img" src="http://gamble.marketing/wp-content/uploads/2014/09/person-placeholder-1.jpg" alt=""></div><br><p class="app-title animated jackInTheBox">'+p+'</p></div>'
        $("#append-students").append(students)
        $(".delete-attendance").remove()
        setTimeout(() => {
            $("#append-attendance").append('<div class="d-flex p-2 w-100 whitesmoke-container delete-attendance" style="height: 54px"><button class="btn btn-success present-btn" style="position: absolute;right:150px">Present</button><button class="btn btn-danger absent-btn" style="position: absolute;right:30px">Absent</button><p class="no-margin" style="padding-top: 8px;padding-left: 15px;">'+p+'<span class="badge attendance-status"></span></p></div> <br class="delete-attendance">')
        
        }, 150);
        
    }
    function getmyData(){
        var email = localStorage.getItem("email");
        var count = 0
        empty()
        $(".destroy-session").remove()
        db.collection("teachers").where("email", "==", email).onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var db = doc.data();
                $("#username").text(db.name);
                $("#username-2").text(db.name);
                $(".profile-pic-lg").attr("src",db.ppic)
                $("#user-icon").attr("src",db.ppic)
                localStorage.setItem("displayName",db.name);
                localStorage.setItem("ppic",db.ppic);
                $("#classes-taught").text(db.track_classes)
                $("#attendance-class").text($(".session option:selected").text())
                
                if(db.pin1){
                    $("#pin-card-1").attr("src",db.pin1.cover)
                    $("#pin-card-1").attr("cogid",db.pin1.id)
                    $("#pin-card-1-text").text(db.pin1.name)
                }
                
                if(db.pin2){
                    $("#pin-card-2").attr("src",db.pin2.cover)
                    $("#pin-card-2").attr("cogid",db.pin2.id)
                    $("#pin-card-2-text").text(db.pin2.name)
                }

                if(db.pin3){
                    $("#pin-card-3").attr("src",db.pin3.cover)
                    $("#pin-card-3").attr("cogid",db.pin3.id)
                    $("#pin-card-3-text").text(db.pin3.name) 
                }

                if(db.pin4){
                    $("#pin-card-4").attr("src",db.pin4.cover)
                    $("#pin-card-4").attr("cogid",db.pin4.id)
                    $("#pin-card-4-text").text(db.pin4.name)
                }
    
                if(db.students){
                    for(i=0;i<db.students.length;i++){
                        $(".session").append('<option class="destroy-session" value="'+i+'">'+db.students[i].groupname+'</option>');
                        $(".session-delete").append('<option class="destroy-session" value="'+i+'">'+db.students[i].groupname+'</option>');
                    }
                }
                
               
                if(db.classes){
                    console.log(db.classes)
                    for(i=0;i<db.classes.length;i++){
                        console.log(db.classes)
                        $(".pin").append('<option class="destroy pin-val" index="'+i+'" classid="'+db.classes[i].id+'" cover="'+db.classes[i].cover+'">'+db.classes[i].name+'</option>')
                        displayCogs(db.classes[i].id);
                        $("#active-classes").text(i+1);
                        
                    }
                }
                
                if(db.students){
                    for(i=0;i<db.students[0].students.length;i++){
                        appendStudents(db.students[0].students[i]);
                        $("#span-total").text(i+1)
                        $("#span-name").text(db.students[0].groupname )
                        sessionStorage.setItem("total_students",i+1)
                        sessionStorage.setItem("per_students",100/(i+1))
                    }

                    for(i=0;i<db.students.length;i++){
                        for(j=0;j<db.students[i].students.length;j++){
                            count++
                            $("#enrolled-students").text(count)
                            $("#span-overall-total").text(count)
                        }
                    }
                }
                

                
                
            });

            
            
        });
    }

    function redeem(p){
        var email = localStorage.getItem("email");
        var docRef = db.collection("redeem_codes").doc(p);
        var ref = db.collection("teachers").doc(email);

        docRef.get().then(function(doc) {
            var data = doc.data();
            if (doc.exists && data.state == true) {
                console.log("Document data:", data);
                alert("Coupon applied! Class "+data.cogname+" has been added to your collection.")
                docRef.update({state:false})
                return ref.update({
                    classes: firebase.firestore.FieldValue.arrayUnion({name:data.cogname,cover:data.cogcover})
                })
            }
            else if (doc.exists && data.state == false) {
                alert("Coupon already used!")
            } 
            else {
                alert("Coupon does not exist!")
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
    $("#session-complete").click(function(){
        var ref = db.collection("teachers").doc(localStorage.getItem("email"));

        return ref.update({
            track_classes: firebase.firestore.FieldValue.increment(1)
        })
        .then(function() {
            ////console.log("Document successfully updated!");
            alert("Class finished!")
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    })

    function displayStudents(p1,p2){
        var email = localStorage.getItem("email");
        empty()
        
        db.collection("teachers").where("email", "==", email).onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var db = doc.data();
                ////console.log(db)
                ////console.log(db.students[0].students[0])
                
                if(p1 == 0){
                    for(i=0;i<db.students[p2].students.length;i++){
                        sessionStorage.setItem("total_students",i+1)
                        sessionStorage.setItem("per_students",100/(i+1))
                        appendStudents(db.students[p2].students[i])
                        $("#span-total").text(i+1)
                        $("#span-name").text(db.students[p2].groupname)
                    }

                    // for(i=0;i<db.students.length;i++){
                    //     $(".session").append('<option class="destroy" value="'+i+'">'+db.students[i].groupname+'</option>');
                    //     $(".session-delete").append('<option value="'+i+'">'+db.students[i].groupname+'</option>');
                    // }
                }
                else{
                    // $(".destroy-session").remove()
                    var array = {groupname:db.students[p2].groupname, students: []}
                    for(i=0;i<db.students[p2].students.length;i++){
                        array.students.push(db.students[p2].students[i])
                        sessionStorage.setItem("delete_group",array)
                        deleteGroup(array)
                        ////console.log(array)
                    }
                }
                
                
            });    
        });
    }

    function create_menu(p1,p2){
        var cm = '<div class="col tab-menu tab-menu-custom text-center" data-toggle="tab" href="#'+p1+'">'+p2+'</div>'
        $(".custom-menu").append(cm)
    }
    function append_menu(p){
        var am = '<div class="tab-pane tab-pane-custom fade" id="'+p+'"></div>'
        $(".custom-tab-content").append(am)
    }
    function build_block(p1,p2,p3,p4){
        var d = '<div class="d-flex tocollapse toilk" data-toggle="collapse" data-target="#'+p1+'" style="color:white;background-color:'+p4+'"><i class="material-icons icons-margin c-color icons-collapse">add</i><p class="no-margin">'+p2+'</p></div><div class="collapse dlcollapse whitesmoke-container" id="'+p1+'"></div><br class="toilk">'
        $(p3).append(d)
    }
    function build_block_material(p1,p2,p3,p4){
        var d = '<div class="d-flex tocollapse toilk" data-toggle="collapse" data-target="#'+p1+'" style="color:white;background-color:'+p4+'"><i class="material-icons icons-margin c-color icons-collapse">add</i><p class="no-margin">'+p2+'</p></div><div class="w-100 collapse dlcollapse" id="'+p1+'"><div class="row table-head" style="margin-left:0px;margin-right:0px"><div class="col text-center">Item</div><div class="col text-center">Amount</div><div class="col text-center">Notes</div></div><div class="row append_materials" style="margin-left:0px;margin-right:0px"></div></div><br class="toilk">'
        $(p3).append(d)
    }
    function build_top_card(p1,p2,p3){
        var step_cards = '<div class="card simple-card-top destroy media toilk"><div id="'+p1+'" class="card-body"><p class="text-center" style="padding:10px;color:white;background-color:#1E88E5">'+p2+'</p><br></div></div>'
        $(p3).append(step_cards)
    }
    function build_cards(p1,p2,p3,p4,p5,p6,p7,p8,p9){
        var step_cards = '<div class="card simple-card destroy media toilk" style="border:1px solid '+p1+'"><div class="card-body"><div class="d-flex"><i class="fas fa-cog fa-spin" style="margin-right:8px;color:#1E88E5;display:inline-table"></i><p class="no-margin">'+p2+'</p></div><div class="d-flex"><div class="icons-margin" style="width: 24px;"></div><div>'+p3+'</div></div><i '+p9+' type="'+p4+'" media="'+p5+'" media-text="'+p6+'" class="material-icons media-icon" style="color: '+p1+'">'+p8+'</i></div></div>'
        $(p7).append(step_cards)
    }
    function append_standards(p0,p1,p2,p3){
        var x = '<div class="col-12 destroy toilk" style="background-color: #'+p0+';color:white;padding-left:5px"><b>'+p1+' : </b>'+p2+'</div>'
        $(p3).append(x)
    }
    function append_vocabs(p1,p2,p3){
        var v = '<div class="extend-container col-12 destroy toilk"><b>'+p1+' : </b>'+p2+'</div>'
        $(p3).append(v)
    }
    function append_extend(p1,p2){
        var v = '<div style="padding-left:5px" class="col-12 destroy toilk"style="margin-bottom:4px"><li>'+p1+'</li.</div>'
        $(p2).append(v)
    }
    function append_materials(p1,p2,p3,p4){
        var m = '<div class="col-4 destroy table-content text-center toilk">'+p1+'</div><div class="col-4 destroy table-content text-center">'+p2+'</div><div class="col-4 destroy table-content text-center">'+p3+'</div>'
        $(p4).find(".append_materials").append(m)
    }
    function empty(){
        $(".destroy").remove()
    }


    function attachMedia(p1,p2,p3){
        if(p1 == "image"){
            $("#display-media-video").css("height","0")
            $("#display-media-image").css("width","100%")
            $("#display-media-image").css("object-fit","contain")
            $("#display-media-image").attr("src",p2)
            $("#display-media-text").html(p3)
        }
        else if(p1 == "video"){
            $("#display-media-video").css("height","500px")
            $("#display-media-image").css("width","0")
            $("#display-media-video").attr("src",p2)
            $("#display-media-text").html(p3)
        }
        else if(p1 == "" || p1 == undefined){
            $("#display-media-video").css("height","0")
            $("#display-media-image").css("width","100%")
            $("#display-media-image").css("object-fit","contain")
            $("#display-media-image").attr("src","../assets/gfx/kleki.png")
            $("#display-media-text").html(p3)
        }
        else{
            $('#modal-media').hide()
        }    
    }
    
    function displayClass(p1,p2){
        // empty()
        $(".tab-pane-custom").remove();
        $(".tab-menu-custom").remove();
        $(".toilk").remove();
        $("#custom-overview").addClass("active-tab-menu");
        $("#overview").addClass("active show")
        setTimeout(() => {
            db.collection("modules").where("cogId", "==", p1).where("number","==",p2).onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) { 
                    var data = doc.data(); 
                    var overview = data.tabs[0]
                    var tabs = data.tabs
                    var l = tabs.length
                    $(".skeleton-box").remove();
                    $(".destroy-loader").remove()
                    $("#base").append('<img id="module-image" class="w-100 h-100" src="" alt="">')
                    $("#module-image").append(data.cover)
                    $("#module-title").text(data.name);
                    $("#overview-text").text(data.descr);
                    $("#module-image").attr("src",data.cover);
                    $("#custom-overview").text(data.tabs[0].tabName);

                    if(data.skills && data.skills.length>0){
                        for(i=0;i<data.skills.length;i++){
                            $(".tags").append('<li><a href="#" class="tag">'+data.skills[i]+'</a></li>')
                        }
                    }
                    
                    
                    for(i=0;i<l;i++){
                        if(i==0){
                            let sections = tabs[0].sections.length
                            for(j=0;j<sections;j++){
                                if(tabs[0].sections[j].type == 0){
                                    let x = tabs[0].sections[j];
                                    let id = "ilk"+x.id
                                    build_block(id,x.sectionName,".append_cstm_modules")
                                    for(k=0;k<x.data.length;k++){
                                        if(k<2){
                                            append_standards("8BC34A",x.data[k].stdCode,x.data[k].stdDesc,"#"+id)
                                        }
                                        else if(k>=2 && k<5){
                                            append_standards("7CB342",x.data[k].stdCode,x.data[k].stdDesc,"#"+id)
                                        }
                                        else if(k>=5 && k<7){
                                            append_standards("0288D1",x.data[k].stdCode,x.data[k].stdDesc,"#"+id)
                                        }
                                    }
                                    
                                }

                                else if(tabs[0].sections[j].type == 1){
                                    let x = tabs[0].sections[j];
                                    let id = "ilk"+x.id
                                    build_block(id,x.sectionName,".append_cstm_modules","#007bff")
                                    for(k=0;k<x.data.length;k++){
                                        append_vocabs(x.data[k].vocab,x.data[k].vocabDef,"#"+id)
                                    }
                                    
                                }

                                else if(tabs[0].sections[j].type == 2){
                                    let x = tabs[0].sections[j];
                                    let id = "ilk"+x.id
                                    build_block_material(id,x.sectionName,".append_cstm_modules","#4CAF50")
                                    for(k=0;k<x.data.length;k++){
                                        append_materials(x.data[k].item,x.data[k].quantity,x.data[k].note,"#"+id)
                                    }
                                    
                                }

                                else if(tabs[0].sections[j].type == 3){
                                    let x = tabs[0].sections[j];
                                    let id = "ilk"+x.id
                                    for(k=0;k<x.data.length;k++){
                                        if(x.data[k].popupMediaType == "image"){
                                            build_cards(x.data[k].popupColor,x.sectionName + " "+(k+1),x.data[k].text,x.data[k].popupMediaType,x.data[k].popupMedia,x.data[k].popupText,".append_cstm_modules",x.data[k].popupIcon,'data-toggle="modal" data-target="#modal-media"')
                                        }
                                        else if(x.data[k].popupMediaType == "video"){
                                            build_cards(x.data[k].popupColor,x.sectionName + " "+(k+1),x.data[k].text,x.data[k].popupMediaType,x.data[k].popupMedia,x.data[k].popupText,".append_cstm_modules",x.data[k].popupIcon,'data-toggle="modal" data-target="#modal-media"')
                                        }
                                        else if(!x.data[k].popupMediaType && x.data[k].popupText !=="" || !x.data[k].popupMediaType && x.data[k].popupText !== undefined){
                                            build_cards(x.data[k].popupColor,x.sectionName + " "+(k+1),x.data[k].text,x.data[k].popupMediaType,x.data[k].popupMedia,x.data[k].popupText,".append_cstm_modules",x.data[k].popupIcon,'data-toggle="modal" data-target="#modal-media"')
                                        }
                                        else{
                                            build_cards("rgb(189, 189, 199)",x.sectionName + " "+(k+1),x.data[k].text,x.data[k].popupMediaType,x.data[k].popupMedia,x.data[k].popupText,".append_cstm_modules")
                                        }
                                    }
                                    
                                }

                                else if(tabs[0].sections[j].type == 4){
                                    let x = tabs[0].sections[j];
                                    let id = "ilk"+x.id
                                    build_block(id,x.sectionName,".append_cstm_modules")
                                    for(k=0;k<x.data.length;k++){
                                        append_extend(x.data[k].text,"#"+id)
                                    }
                                    
                                }
                            }
                            
                        }

                        else{
                            let tab_id = "ilkce"+tabs[i].id
                            create_menu(tab_id,tabs[i].tabName)
                            append_menu(tab_id)
                            let sections = tabs[i].sections.length
                            for(j=0;j<sections;j++){
                                if(tabs[i].sections[j].type == 0){
                                    let x = tabs[i].sections[j];
                                    let id = "ilk"+x.id
                                    build_block(id,x.sectionName,"#"+tab_id)
                                    for(k=0;k<x.data.length;k++){
                                        if(k<2){
                                            append_standards("8BC34A",x.data[k].stdCode,x.data[k].stdDesc,"#"+id)
                                        }
                                        else if(k>=2 && k<5){
                                            append_standards("7CB342",x.data[k].stdCode,x.data[k].stdDesc,"#"+id)
                                        }
                                        else if(k>=5 && k<7){
                                            append_standards("0288D1",x.data[k].stdCode,x.data[k].stdDesc,"#"+id)
                                        }
                                    }
                                    
                                }

                                else if(tabs[i].sections[j].type == 1){
                                    let x = tabs[i].sections[j];
                                    let id = "ilk"+x.id
                                    build_block(id,x.sectionName,"#"+tab_id,"#007bff")
                                    for(k=0;k<x.data.length;k++){
                                        append_vocabs(x.data[k].vocab,x.data[k].vocabDef,"#"+id)
                                    }
                                    
                                }

                                else if(tabs[i].sections[j].type == 2){
                                    let x = tabs[i].sections[j];
                                    let id = "ilk"+x.id
                                    build_block_material(id,x.sectionName,"#"+tab_id,"#4CAF50")
                                    for(k=0;k<x.data.length;k++){
                                        append_materials(x.data[k].item,x.data[k].quantity,x.data[k].note,"#"+id)
                                    }
                                    
                                }

                                else if(tabs[i].sections[j].type == 3){
                                    let x = tabs[i].sections[j];
                                    let id = "ilk"+x.id
                                    build_top_card(id,x.sectionName,"#"+tab_id)
                                    for(k=0;k<x.data.length;k++){
                                        if(x.data[k].popupMediaType == "image"){
                                            build_cards(x.data[k].popupColor,x.sectionName + " "+(k+1),x.data[k].text,x.data[k].popupMediaType,x.data[k].popupMedia,x.data[k].popupText,"#"+id,x.data[k].popupIcon,'data-toggle="modal" data-target="#modal-media"')
                                        }
                                        else if(x.data[k].popupMediaType == "video"){
                                            build_cards(x.data[k].popupColor,x.sectionName + " "+(k+1),x.data[k].text,x.data[k].popupMediaType,x.data[k].popupMedia,x.data[k].popupText,"#"+id,x.data[k].popupIcon,'data-toggle="modal" data-target="#modal-media"')
                                        }
                                        else if(!x.data[k].popupMediaType && x.data[k].popupText !=="" || !x.data[k].popupMediaType && x.data[k].popupText !== undefined){
                                            build_cards(x.data[k].popupColor,x.sectionName + " "+(k+1),x.data[k].text,x.data[k].popupMediaType,x.data[k].popupMedia,x.data[k].popupText,"#"+id,x.data[k].popupIcon,'data-toggle="modal" data-target="#modal-media"')
                                        }
                                        else if(!x.data[k].popupMediaType && !x.data[k].popupText){
                                            build_cards("rgb(189, 189, 199)",x.sectionName + " "+(k+1),x.data[k].text,x.data[k].popupMediaType,x.data[k].popupMedia,x.data[k].popupText,"#"+id)
                                        }
                                    }
                                    
                                }

                                else if(tabs[i].sections[j].type == 4){
                                    let x = tabs[i].sections[j];
                                    let id = "ilk"+x.id
                                    build_block(id,x.sectionName,"#"+tab_id,"#FF6D00")
                                    for(k=0;k<x.data.length;k++){
                                        append_extend(x.data[k].text,"#"+id)
                                    }
                                    
                                }

                            }
                            
                        }

                        $(function () {
                            $('[data-toggle="popover"]').popover()
                        })
                    }
                   
                });
            })
        }, 350);
        
        
    }

    function appendModules(p1,p2,p3){
        var mod ='<div class="highlight destroy"><div class="d-flex tocollapse" data-toggle="collapse" href="#'+p1+'"><i class="material-icons icons-margin">add</i><h5>'+p2+'</h5></div><p class="collapse" id="'+p1+'">'+p3+'</p></div>'
        $("#modules-extra-info").append(mod)
    }

    function appendSelectModules(p){
        $(".gh0000").remove()
        db.collection("modules").where("cogId", "==", p).orderBy("number").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data())
                let data = doc.data()
                $("#module-number").append('<option class="gh0000" value="'+data.number+'">'+data.number + ": " +data.name+'</option>')
                appendModules("toc"+data.number,data.name,data.descr)
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        })
    }

    // function displayModules(p){
    //     db.collection("modules").where("cogname", "==", p).orderBy("number").get()
    //     .then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             appendModules
    //         });
    //     })
    //     .catch(function(error) {
    //         console.log("Error getting documents: ", error);
    //     })
    // }
    $(document).on("click",".class-card",function(){
        var cogid = $(this).attr("cogid");
        localStorage.setItem("cogid",cogid);
        appendSelectModules(cogid)
        db.collection("cogs").doc(cogid).onSnapshot(function(doc) {
            var db = doc.data()
            localStorage.setItem("continue_cogname",db.title)
            localStorage.setItem("continue_cogimage",db.cover)
            $("#continue-cover").attr("src", db.cover)
            $("#continue").text(db.title)
            $("#display-cog-image").attr("src",db.cover)
            $("#display-cog-title").html("<b>Name : </b>" + db.title)
            $("#display-cog-type").html("<b>Type : </b>" + db.type)
            $("#display-cog-grade").html("<b>Grade : </b>" + db.grade)
            $("#display-cog-subject").html("<b>Subject : </b>" + db.subject)
            // $("#display-cog-updated").html("<b>Last Updated : </b>" + new Date(db.updatedAt*1000).replace(""))
            $("#display-cog-descr").html(db.overview)
            $("#display-connection-text").html(db.rwc)
            empty();
            for(i=0;i<db.skills.length;i++){
                $("#display-skill-text").append('<li class="destroy">'+db.skills[i]+'</li>')
            }
        });

        

        setTimeout(() => {
            if(localStorage.getItem("dark_mode") == "0"){
                $(".highlight").each(function(){
                    $(".highlight").addClass("highlight-dark")
                })   
            }
            else{
                $(".highlight").each(function(){
                    $(".highlight").removeClass("highlight-dark")
                }) 
            }
        }, 150);
        
        
        
    })
    $("#cogoverview").click(function(){
        setTimeout(() => {
            if(localStorage.getItem("dark_mode") == "0"){
                $(".highlight").each(function(){
                    $(".highlight").addClass("highlight-dark")
                })   
            }
            else{
                $(".highlight").each(function(){
                    $(".highlight").removeClass("highlight-dark")
                }) 
            }
        }, 150);
    })


    $("#display-module").click(function(){
        var cogname = localStorage.getItem("cogid");
        
        displayClass(cogname,1);
        setTimeout(() => {
            if(localStorage.getItem("dark_mode") =="0"){
                $(".simple-card").each(function(){
                    $(".simple-card").addClass("simple-card-dark")
                })

                $(".list-group-item").each(function(){
                    $(".list-group-item").addClass("list-group-item-dark")
                })
            }
            else {
                $(".list-group-item").each(function(){
                    $(".list-group-item").removeClass("list-group-item-dark")
                })  
            }
        }, 1000);

        
    })

    $(".pin-cards").click(function(){
        var cogid = $(this).find(".wrap-img").attr("cogid");
        localStorage.setItem("cogid",cogid)
        // localStorage.setItem("continue_cogid",db.cogid)
        // localStorage.setItem("continue_cogimage",db.cover)
        ////console.log(cogid)
        $(".dboard-menu").removeClass("active active-menu")
        $("#class-dboard").addClass("active active-menu")
        console.log(cogid)
        displayClass(cogid,1);
        appendSelectModules(cogid)
    })
    $("#continue-card").click(function(){
        // localStorage.setItem("continue_cogname",db.cogname)
        // localStorage.setItem("continue_cogimage",db.cover)
        var cogname = $(this).find("#continue").text();
        ////console.log(cogname)
        displayClass(cogname,1);
    })
    
    $(document).on("click",".tab-menu",function(){
        $(".tab-menu").removeClass("active");
        $(".tab-menu").removeClass("active-tab-menu");
        $(".module-card").removeClass("active");
        $(this).addClass("active-tab-menu");
    })

    $(document).on("click",".media-icon",function(){
        var media = $(this).attr("media");
        var type = $(this).attr("type");
        var text = $(this).attr("media-text");
        var text2 = $(this).attr("media-step-text");

        console.log(text)
        if(text == "" || text.length <1){
            attachMedia(type,media,text2)
        }
        else{
            attachMedia(type,media,text)
        }
        
    })
    $(document).on("click",".tocollapse",function(){
        if($(this).attr("aria-expanded") == "true"){
            $(this).find("i").text("remove")
        }
        else if($(this).attr("aria-expanded") == "false"){
            $(this).find("i").text("add")    
        }
    })

    $("#module-number").change(function(){
        let cogid = localStorage.getItem("cogid"); 
        let x = parseInt($(this).val())
        $(".tab-pane-custom").remove();
        $(".tab-menu-custom").remove();
        $(".toilk").remove();
        $(".dlcollapse").remove();
        $("#custom-overview").addClass("active-tab-menu");
        $("#overview").addClass("active show")
        setTimeout(() => {
            displayClass(cogid,x) 
        }, 350);
         
    })
   
    $(".session").change(function(){
        var x = parseInt($(this).val())
        x_total = 0;
        $("#attendance-percentage").text(x_total + " %")
        $("#attendance-class").text($("option:selected",this).text())
        displayStudents(0,x)
    })

    $("#extend").click(function(){
        if($("#dashboard").hasClass("col-md-1")){
            $("#dashboard").removeClass("col-md-1")
            $("#dashboard").addClass("col-md-3")
            $("#main-menu").removeClass("col-md-11")
            $("#main-menu").addClass("col-md-9")
            $(".hide").css("visibility","visible")
            $(this).text("close")

            $(this).addClass("animated flipInX faster")
            setTimeout(() => {
                $(this).removeClass("animated flipInX faster")
            }, 500);
        }
        else{
            $("#dashboard").removeClass("col-md-3")
            $("#dashboard").addClass("col-md-1")

            $("#main-menu").addClass("col-md-11")
            $("#main-menu").removeClass("col-md-9")
            $(".hide").css("visibility","hidden")

            $(this).text("menu")

            $(this).addClass("animated flipInX faster")
            setTimeout(() => {
                $(this).removeClass("animated flipInX faster")
            }, 500);
        }

        
    })

    $(document).on("click",".add-student",function(){
        var input = '<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">Student Name</span></div><input type="text" class="form-control student-val" placeholder="Add a student to the group (First and Last name)" aria-label="student name"><i class="add-student material-icons">add</i><i class="remove-student material-icons">remove</i></div>'
        $("#group-body").append(input)
    })
    $(document).on("click",".remove-student",function(){
        $(this).closest(".mb-3").remove()
    })
    $("#create-group-btn").click(function(){
        ////console.log($(".groupname-val").val())
        empty()
        $(".destroy-session").remove()
        var array = [];
        $( ".student-val" ).each(function() {
            array.push($(this).val());
        });
        createGroup({
            groupname: $("#groupname-val").val(),
            students: array
        })
        setTimeout(() => {
            $("#modal-create-group").modal("hide")
        }, 500);
    })

    $("#delete-group-btn").click(function(){
        var x = parseInt($(".session-delete").val())
        $(".destroy-session").remove()
        console.log(x)
        displayStudents(1,x)
        setTimeout(() => {
            $("#modal-delete-group").modal("hide")
        }, 500);
    })


    $("#darkmode").click(function(){
        var x = $(".container-toggle")
        var y = $(".container-toggle-btn")
        if(!x.hasClass("on") && !y.hasClass("move-on")){
            localStorage.setItem("dark_mode","0")
            $(".container-toggle").addClass("on");
            $(".container-toggle-btn").addClass("move-on");
            $(".padded-text").text("ON")
            dark_mode()
        }
        else{
            localStorage.setItem("dark_mode","1")
            light_mode()
            $(".container-toggle").removeClass("on");
            $(".container-toggle-btn").removeClass("move-on");
            $(".padded-text").text("OFF")
        }
        
    })

    function dark_mode(){
        $("body").css("background-color","#2e2f42")
        $("body").css("color","#bdbdc7")
        $("hr").css("border-top","1px solid #bdbdc7")
        $("#dashboard").removeClass("dashboard-light")
        $("#dashboard").addClass("dashboard-dark")
        // $("#overlay").css("background-color", "transparent"
        $(".list-group-item").addClass("list-group-item-dark")
        $(".custom-class-container").addClass("custom-class-container-dark")
        $(".breadcrumb").addClass("breadcrumb-dark")
        $("#class-status-select").addClass("class-status-select-dark")
        $(".simple-card").addClass("simple-card-dark")
        $(".nav-item").addClass("nav-item-dark")
        $(".tab-menu").addClass("tab-menu-dark")
        $(".whitesmoke-container").addClass("whitesmoke-container-dark")
        $(".custom-modal").addClass("custom-modal-dark")
        $(".highlight").addClass("highlight-dark")
        $("#cover").css("visibility","hidden")
        setTimeout(() => {
            $(".custom-card").addClass("custom-card-dark")
        }, 1500);
    }
    function light_mode(){
        $("body").css("background-color","#f5f7fa")
        $("body").css("color","black")
        $("body").css("background-color","#f5f7fa")
        $("hr").css("border-top","1px solid rgba(0,0,0,.1)")
        $("#dashboard").removeClass("dashboard-dark")
        $("#dashboard").addClass("dashboard-light")
        $("#overlay").css("background-color", "#e65100a1")
        $(".custom-card").removeClass("custom-card-dark")
        $(".list-group-item").removeClass("list-group-item-dark")
        $(".custom-class-container").removeClass("custom-class-container-dark")
        $(".breadcrumb").removeClass("breadcrumb-dark")
        $("#class-status-select").removeClass("class-status-select-dark")
        $(".simple-card").removeClass("simple-card-dark")
        $(".nav-item").removeClass("nav-item-dark")
        $(".tab-menu").removeClass("tab-menu-dark")
        $(".whitesmoke-container").removeClass("whitesmoke-container-dark")
        $(".custom-modal").removeClass("custom-modal-dark")
        $(".highlight").removeClass("highlight-dark")
        $("#cover").css("visibility","visible")
    }

   

    $("#change-name").click(function(){
        var ref = db.collection("teachers").doc(localStorage.getItem("email"));
        $('.toast').toast('show')
        return ref.update({
            name: $("#name-input").val()
        })
        
    })
    $("#redeem-code").click(function(){
        redeem($("#redeem-input").val());
        
    })
    function uploadImg(){
        var file = document.getElementById("filePicker").files[0];
        var storage = firebase.storage();
    
        var storageRef = storage.ref();
        var metadata = {
          contentType: 'image/png'
        };
    
        if(file == undefined || file == null || !file){
          console.log("No attachement");
          createRequest($("#attach-val").val());
        }
        else{
          var uploadTask = storageRef.child('ppic/' + file.name).put(file, metadata);
    
          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            }, function(error) {
              console.log("Unsuccessful upload")
            }, function() {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                return ref.update({
                    ppic: downloadURL
                })
              })
          });
          
        }
        
    }

    $("#request-btn").click(function(){
        uploadImg();
        setTimeout(() => {
          alert("Profile picture changed!")
          $("input").each(function(){
          $(this).val("");
          $("textarea").val("")
          })
        }, 1000);
    })

    if (window.matchMedia("(max-width: 575.98px)").matches) {
        $(".filter-contain").removeClass("d-flex")
        $("#extend").click(function(){
            if($("#dashboard").hasClass("col-2")){
                $("#dashboard").removeClass("col-2")
                $("#dashboard").addClass("col-12")
                $("#main-menu").removeClass("col-10")
                $("#main-menu").addClass("col-0")
            }
            else{
                $("#dashboard").addClass("col-2")
                $("#dashboard").removeClass("col-12")
                $("#main-menu").removeClass("col-0")
                $("#main-menu").addClass("col-10")
            }
        }) 
    } 

   

    if (window.matchMedia("(min-width: 1024px)").matches) {
        $("#extend").click(function(){
            if($("#dashboard").hasClass("col-lg-2")){
                $("#dashboard").removeClass("col-lg-2")
                $("#dashboard").addClass("col-x")
                $("#main-menu").removeClass("col-lg-10")
                $("#main-menu").addClass("col-x-counter")
                $(".hide").css("visibility","hidden")
            }
            else{
                $("#dashboard").addClass("col-lg-2")
                $("#dashboard").removeClass("col-x")
                $("#main-menu").removeClass("col-x-counter")
                $("#main-menu").addClass("col-lg-10")
                $(".hide").css("visibility","visible")
            }
        }) 
    } 
})