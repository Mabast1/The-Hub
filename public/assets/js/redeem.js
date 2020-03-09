$(document).ready(function(){
    var db = firebase.firestore();
    
    $(document).on("click",".tab-menu",function(){
        $(".tab-menu").removeClass("active");
        $(".tab-menu").removeClass("active-tab-menu");
        $(".module-card").removeClass("active");
        $(this).addClass("active-tab-menu");
    })
   
    var check = 0;
    $(document).on("click",".tab-menu-custom",function(){
        check++
        if(check == 1){
            $("#modal-ideabot").modal("show")
        }
        
    })
    setTimeout(() => {
        $("#modal-redeem").modal("show")
    }, 1000);
    
    $("#ageselect").change(function(){
        $("#steambtn").prop("disabled",false)
    })

    $("#steambtn").click(function(){
        let code = sessionStorage.getItem("code_in_use")
        setAge(code,parseInt($("#ageselect").val()))
        localStorage.setItem("myage",parseInt($("#ageselect").val()))
    })

    firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
           
           
            
            
            $("#redeem-code").click(function(){
                redeem($("#redeem-input").val());
                sessionStorage.setItem("code_in_use",$("#redeem-input").val())
            })
            // ...
        } else {
            // User is signed out.
            // ...
        }
        // ...
    });

    function setAge(p1,p2){
        var ref = db.collection("redeem_codes").doc(p1);

        return ref.update({
            age: p2
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    function redeem(p){
        var email = localStorage.getItem("email");
        var docRef = db.collection("redeem_codes").doc(p);

        docRef.get().then(function(doc) {
            var data = doc.data();
            if (doc.exists && data.state == true) {
                // docRef.update({state:false})
                // return ref.update({
                //     classes: firebase.firestore.FieldValue.arrayUnion({name:data.cogname,cover:data.cogcover})
                // })
                if(confirm("Coupon applied for "+data.cogname)){
                    sessionStorage.setItem("cog_id",data.id)
                    setTimeout(() => {
                        displayClass(data.id,1)
                        appendSelectModules(data.id)   
                    }, 800);
                    
                }
                else{
                    alert("Operation canceled")
                    setTimeout(() => {
                        $("#modal-redeem").modal("show")
                    }, 3000);
                }
                
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
   
    $("#signup").click(function(){
        window.location.href = "/"
    })

    
    
   

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
                    // $("#base").append('<img id="module-image" class="w-100 h-100" src="" alt="">')
                    $("#base").append('<video width="100%" height="100%" autoplay muted loop><source src="assets/gfx/spookyvid.mp4" type="video/mp4"></video>')
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
        var mod ='<div class="highlight destroy"><div class="d-flex tocollapse" data-toggle="collapse" href="#'+p1+'"><i class="material-icons icons-margin">add</i><p class="no-margin">'+p2+'</p></div><p class="collapse" id="'+p1+'">'+p3+'</p></div>'
        $("#modules-extra-info").append(mod)
    }

    function appendSelectModules(p){
        $(".gh0000").remove()
        db.collection("modules").where("cogId", "==", p).orderBy("number").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let data = doc.data()
                $("#module-number").append('<option class="gh0000" value="'+data.number+'">'+data.number + ": " +data.name+'</option>')
                appendModules("toc"+data.number,data.name,data.descr)
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        })
    }

   
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
    $("#snap").click(function(){
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

    
    

    $(document).on("click",".media-icon",function(){
        var media = $(this).attr("media");
        var type = $(this).attr("type");
        var text = $(this).attr("media-text");
        var text2 = $(this).attr("media-step-text");

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
    
    function uploadMedia(){
        var file = document.getElementById("uploadMedia").files[0];
        var storage = firebase.storage();
    
        var storageRef = storage.ref();
        var metadata = {
          contentType: 'video/mp4'
        };
    
        if(file == undefined || file == null || !file){
          console.log("No attachement");
          createRequest($("#attach-val").val());
        }
        else{
          var uploadTask = storageRef.child('community/spooky_eng/' + file.name).put(file, metadata);
    
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
                // setLinkToDB(sessionStorage.getItem("cog_id"),$("#get-name").val(),downloadURL,localStorage.getItem("myage"))
              })
          });
          
        }
        
    }

    function setLinkToDB(p1,p2,p3,p4){
        db.collection("community").doc(p1).set({
            name: p2,
            url: p3,
            age: p4
        });
    }

    $("#upload-file").click(function(){
        uploadMedia()
    })

    $("#complete").click(function(){
       $("#upload_btn").css("visibility","visible")
    })

    $('#modal-media').on('hide.bs.modal', function (e) {
        $("#display-media-video").attr("src","")
    })

    $(".nav-item").click(function(){
        $(".nav-item").removeClass("active");
        $(".nav-item").removeClass("active-menu");
        $(".module-card").removeClass("active");
        $(this).addClass("active-menu");
    })

    
    $("#redeem-input").on("input",function(){
        if($(this).val().length>5){
            $("#redeem-code").prop("disabled",false)
        }
        else{
            $("#redeem-code").prop("disabled",true)
        }
    })
})