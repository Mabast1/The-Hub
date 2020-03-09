var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Class = require('../models/class');
var Count = require('../models/classcount');
var path = require("path");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


cloudinary.config({
  cloud_name: "dkntjizfa",
  api_key: "458755618841847",
  api_secret: "s5GgUOoFfASCZpxgpiuKJI_27Kk"
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  // transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });




//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords do not match");
    return next(err);
    
  }

  if (req.body.username &&
    req.body.firstname &&
    req.body.lastname &&
    req.body.city&&
    req.body.state&&
    req.body.country&&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      city:req.body.city,
      state:req.body.state,
      country:req.body.country,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/modern');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/modern');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
    
  }
})

// GET route after registering
router.get('/modern', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.sendFile(path.resolve(__dirname, "../public/modern.html"));
          listEvents(auth);
        }
      }
    });
});

router.get('/writing', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.sendFile(path.resolve(__dirname, "../public/writing.html"));
          listEvents(auth);
        }
      }
    });
});

router.get('/bbox/piano', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.sendFile(path.resolve(__dirname, "../public/piano/index.html"));
          listEvents(auth);
        }
      }
    });
});



// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


router.post('/createcog', function (req, res, next) {

  console.log(req.body);
  
  
  var countData = {
    cogname: req.body.cogname,   
    type: req.body.type,
  }


  Count.create(countData, function (error, user) {
    if (error) {
      return next(error);
    } else {
      req.session.userId = user._id;
      console.log("The id is "+req.session.userId)
      // return res.redirect('/modern');
    }
  });


    
})

router.post('/createclass', function (req, res, next) {
  console.log(req.body);
  
  var classData = {
    classname: req.body.classname,
    classtitle: req.body.classtitle,
    type: req.body.type,
    o_text: req.body.o_text,
    classnum: req.body.classnum,
    
  }
  
  Class.create(classData, function (error, user) {
    if (error) {
      return next(error);
    } else {
      req.session.userId = user._id;
      console.log("The id is "+req.session.userId)
      // return res.redirect('/modern');
    }
  });
    
})

router.post('/api/edit/get', function (req, res, next) {
  console.log(req.body);
  
  var tosearch = req.body.data
  if(req.body.ref == "0"){
    Count.find({type:tosearch}, function(err,data){
      res.json(data);
      console.log(data)
    })
  }
  else if(req.body.ref == "1"){
    Class.find({classname:tosearch}, function(err,data){
      res.json(data);
      console.log(data)
    })
  }
  

  
    
})
router.post('/api/edit/delete', function (req, res, next) {
  console.log(req.body);
  
  var todelete = req.body.data
  
  Count.findOneAndRemove({cogname:todelete}, function(err,data){
    res.json(data);
    console.log(data)
  })

  Class.deleteMany({classname:todelete}, function(err,data){
    res.json(data);
    console.log(data)
  })

  
    
})
router.post('/api/edit/change', function (req, res, next) {
  console.log(req.body);
  
  var tochange = req.body.data
  var newval = req.body.datanew
  
  Count.findOneAndUpdate({cogname:tochange},{cogname:newval}, function(err,data){
    res.json(data);
    console.log(data)
  })

  Class.updateMany({classname:tochange},{classname:newval}, function(err,data){
    res.json(data);
    console.log(data)
  })

  
    
})

router.post('/api/edit/thisclass', function (req, res, next) {
  console.log(req.body);
  
  var classedit = req.body.val
  
  Class.find({classtitle:classedit}, function(err,data){
    res.json(data);
    console.log(data)
  })

})
router.post('/api/edit/textchange', function (req, res, next) {
  console.log(req.body);
  
  var cname = req.body.class;
  var text = req.body.text;
  var array = req.body.array;
  var ref = req.body.ref
  
  if(ref == "overview"){
    Class.findOneAndUpdate({classtitle:cname}, {o_text:text},console.log);
  }
  else if(ref =="student"){
    Class.findOneAndUpdate(
      {classtitle:cname, m_student: array },
      { $set: { 'm_student.$': text }},
      console.log
    )
  }
  else if(ref =="group"){
    Class.findOneAndUpdate(
      {classtitle:cname, m_group: array },
      { $set: { 'm_group.$': text }},
      console.log
    )
  }
  else if(ref =="teacher"){
    Class.findOneAndUpdate(
      {classtitle:cname, m_teacher: array },
      { $set: { 'm_teacher.$': text }},
      console.log
    )
  }
  else if(ref =="equip"){
    Class.findOneAndUpdate(
      {classtitle:cname, m_equip: array },
      { $set: { 'm_equip.$': text }},
      console.log
    )
  }
  else if(ref =="prep"){
    Class.findOneAndUpdate(
      {classtitle:cname, p_prep: array },
      { $set: { 'p_prep.$': text }},
      console.log
    )
  }
  else if(ref =="special"){
    Class.findOneAndUpdate(
      {classtitle:cname, p_special: array },
      { $set: { 'p_special.$': text }},
      console.log
    )
  }
  else if(ref =="question"){
    Class.findOneAndUpdate(
      {classtitle:cname, e_question: array },
      { $set: { 'e_question.$': text }},
      console.log
    )
  }
  else if(ref =="wtk"){
    Class.findOneAndUpdate(
      {classtitle:cname, e_wtk: array },
      { $set: { 'e_wtk.$': text }},
      console.log
    )
  }
  else if(ref =="ican"){
    Class.findOneAndUpdate(
      {classtitle:cname, k_ican: array },
      { $set: { 'k_ican.$': text }},
      console.log
    )
  }
  else if(ref =="engage"){
    Class.findOneAndUpdate(
      {classtitle:cname, k_engage: array },
      { $set: { 'k_engage.$': text }},
      console.log
    )
  }
  else if(ref =="steps"){
    Class.findOneAndUpdate(
      {classtitle:cname, steps: array },
      { $set: { 'steps.$': text }},
      console.log
    )
  }
  else if(ref =="ffacts"){
    Class.findOneAndUpdate(
      {classtitle:cname, ffacts: array },
      { $set: { 'ffacts.$': text }},
      console.log
    )
  }
  

  
  
    
})


router.post('/api/images', parser.single("image"), (req, res) => {
  console.log(req.file) // to see what is returned to you
  
  function uploadImg(x,y,z){
    if (x == "0"){
      Class.findOneAndUpdate({classname:y,classnum:z}, {o_titleimg:req.file.url},console.log);
      return res.redirect("/writing.html")
    }
    else if (x == "1"){
      Class.findOneAndUpdate({classname:y,classnum:z}, {o_finalimg:req.file.url},console.log);
      return res.redirect("/writing.html")
    }
  
    else if (x == "2"){
      User.findOneAndUpdate({username:y}, {ppic:req.file.url},console.log);
      return res.redirect("/modern.html")
    }
    
  }
  
  const image = {};
  // res.json(req.body);
  image.url = req.file.url;
  image.id = req.file.public_id;
  var className = req.body.classname;
  var classVal = req.body.classval;
  var fVal = req.body.fvalue;
  var username = req.body.username
  console.log(classVal); 

  if(fVal<2){
    uploadImg(fVal,className,classVal)
  }
  else{
    uploadImg(fVal,username)
  }
  
  


  
});


router.post('/test', function (req, res) {
  var classname = req.body.classname;
  var steps = req.body.steps;
  var ffacts =  req.body.ffacts;
  var k_engage = req.body.k_engage;
  var k_ican = req.body.k_ican;
  var e_wtk = req.body.e_wtk;
  var e_question = req.body.e_question;
  var p_special = req.body.p_special;
  var p_prep = req.body.p_prep;
  var m_equip = req.body.m_equip;
  var m_group = req.body.m_group;
  var m_teacher = req.body.m_teacher;
  var m_student = req.body.m_student; 
  
 
  console.log(req.body);
  console.log(req.body.steps);
  for(i=0;i<steps.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {steps:steps[i]}},console.log)
  }
  for(i=0;i<ffacts.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {ffacts:ffacts[i]}},console.log)
  }
  for(i=0;i<k_engage.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {k_engage:k_engage[i]}},console.log)
  }
  for(i=0;i<k_ican.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {k_ican:k_ican[i]}},console.log)
  }
  for(i=0;i<e_wtk.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {e_wtk:e_wtk[i]}},console.log)
  }
  for(i=0;i<e_question.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {e_question:e_question[i]}},console.log)
  }
  for(i=0;i<p_special.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {p_special:p_special[i]}},console.log)
  }
  for(i=0;i<p_prep.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {p_prep:p_prep[i]}},console.log)
  }
  for(i=0;i<m_equip.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {m_equip:m_equip[i]}},console.log)
  }
  for(i=0;i<m_group.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {m_group:m_group[i]}},console.log)
  }
  for(i=0;i<m_teacher.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {m_teacher:m_teacher[i]}},console.log)
  }
  for(i=0;i<m_student.length;i++){
    Class.findOneAndUpdate({classname:classname,classnum:req.body.cval}, {$push : {m_student:m_student[i]}},console.log)
  }
  
})

//==================Send data to the frontend==================== 
router.get("/api/data", function(req,res){
  User.find({_id:req.session.userId}, function(err,data){
    console.log(data);
    res.json(data);
    //  return res.sendFile(path.resolve(__dirname, "../public/myhub.html"));
  })
})

router.get("/api/dataClasses", function(req,res){
  Count.find({}, function(err,data){
    console.log(data);
    res.json(data);
  })
})

router.post("/api/displayclass", function(req,res){
  console.log(req.body)
  Class.find({classname:req.body.cname,classnum:req.body.cnum}, function(err,data){
    console.log(req.body.text);
    res.json(data);
  })
})

router.post("/monster/code/56E56B1F", function(req,res){
  res.json("dsfjjf");
})





module.exports = router;