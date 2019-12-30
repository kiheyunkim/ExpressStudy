const  express = require('express');
var app = express();
var bodyParser = require('body-parser');





app.use(bodyParser.urlencoded({extended:false}));       //모듈을 붙이는 것 body의 내용을 처리할 수 있도록!

app.locals.pretty = true;
app.set('view engine','jade');//Jade엔진을 사용하겠다는 선언
app.set('views', './views');//없어도 기본값


app.get('/template',function(request,response){
    response.render('temp',{title:'Jade',time:Date()}) 
})

app.get('/form_receiver',function(request,response){
    var title = request.query.title;
    var description = request.query.description;
    response.send(title+','+description);
})

app.post('/form_receiver',function(request,response){
    var title = request.body.title;
    var description=request.body.description;
    response.send(title+','+description);
})

app.get('/form',function(request,response){
    response.render('form') //template로 들어온 사용자에게 function이 실행되면서 temp라는 템플릿 파일을 웹으로 렌더링 해서 쏴준다.
    //옵션을 통해서 변수를 전달한다.
    //Send는 그냥 보내주는것
    //render는 템플릿 엔진을 쓰는것
})


app.get('/topic',function(request,response){
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ]

    var output =`
        <a href="/topic?id=0">JavaScript</a><br>
        <a href="/topic?id=1">Nodejs</a><br>
        <a href="/topic?id=2">Express</a><br><br>
        ${topics[request.query.id]}
    `

    response.send(output);

})

app.get('/topic/:id/:mode',function(request,response){
    response.send(request.params.id + ','+ request.params.mode);
});

app.get('/topic/:id',function(request,response){
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ]

    response.send(topics[request.params.id]);
});

app.use(express.static('public'));

app.get('/dynamic',function(request,response){
    var lis ='';
    var time = Date();
    for(var i=0;i<5;++i){
        lis = lis +'<li>coding</li>';
    }

    var output= `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
          Hello, Dynamic!
            <ul>
              ${lis}
            </ul>

            ${time}
      </body>
    </html>`

    response.send(output);
})

app.get('/',function(request,response){
    response.redirect('/login');    
});

app.get('/login',function(request,response) {
    response.send('Login!');
})


app.listen(3000,function(){
    console.log('connected 3000 port');
});