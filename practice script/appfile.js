var express= require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var multer = require('multer');


var _storage = multer.diskStorage({
    destination: function(request,file,cb){
        cb(null,'upload/')
    },
    filename: function(request,file,cb){
        cb(null,file.originalname);
    }
})

var upload = multer({storage : _storage});
app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty = true;

app.set('views','./view_files');
app.set('view engine','jade');


app.get('/upload',function(request,response){
    response.render('uploadForm')
})

app.post('/upload',upload.single('userfile'), function(request,response){ //request안에 file이라는 property가 있다.
    console.log(request.file);
    response.send('uploaded : '+ request.file.originalname );                            //함수가 실행되기 전에 미들웨어가 들어가서 request에 파일에 대한 정보를 적어줌
})

app.get('/topic/new',function(request,response){
    fs.readdir('data',(err,files)=>{
        if(err){
            console.log(err);
            response.status(500).send("Internal Server Error");
        }
        response.render('new',{pathes:files});
    });

});



app.get(['/topic','/topic/:id'],function(request,response){
fs.readdir('data',(err,files)=>{
    if(err){
        console.log(err);
        response.status(500).send("Internal Server Error");
    }

    var id = request.params.id;
    if(id){//값이 없는 null과 undefined는 false와 등가
        //id값이 있을 때
        fs.readFile('data/'+id,'utf8',(err,description)=>{
            if(err){
                console.log(err);
            response.status(500).send("Internal Server Error");
            }
    
            response.render('view',{pathes:files, title:id, data:description});
        })
    }else{
        //id값이 없을 때
        response.render('view',{pathes:files ,title:'Welcome', data:'Hello JS for Server.'});
    }
})
});

/*
app.get('/topic/:id',function(request,response){
    var id = request.params.id;
    fs.readdir('data','utf-8',(err,files)=>{
        if(err){
            console.log(err);
        response.status(500).send("Internal Server Error");
        }
        fs.readFile('data/'+id,'utf8',(err,description)=>{
            if(err){
                console.log(err);
            response.status(500).send("Internal Server Error");
            }
    
            response.render('view',{pathes:files, title:id, data:description});
        })

    })
});
*/

app.post('/topic',function(request,response){
    var title = request.body.title;
    var description = request.body.description;

    fs.writeFile('data/'+title,description,(err)=>{
        if(err){
            console.log('Error Occured\n'+err);
            response.status(500).send("Internal Server Error");
        }
        response.redirect('/topic/'+title);
    });


});

app.listen(3000,function(){
    console.log('Connected, 3000 port!');
});
