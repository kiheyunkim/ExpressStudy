var express = require('express')
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);

var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret:'123c12v@adv3$341@', //쿠키 세팅을 했으면 같은 값을 넣어도 됨.
    resave:false,               //세션아이디를 접속할때마다 새롭게 발급 받을지?
    saveUninitialized:true,      //세션아이디를 사용하기 전까지는 발급받지 말지?
    store: new MySQLStore({
        host:'localhost',
        port:3306,
        user:'root',
        password:'toor',
        database:'o2'
    })
}))

//현재는 메모리에 웹이 세션을 저장한다.
//그러므로 이것을 종료하면 값이 초기화된다.
app.get('/count',(request,response)=>{
    if(request.session.count){
        request.session.count++;
    }else{
        request.session.count =1;
    }
    response.send('count : '+request.session.count);
})

app.get('/auth/logout',(request,response)=>{
    delete request.session.displayName;//서버상에서 삭제
    request.session.save(()=>{
        response.redirect('/welcome');
    })
})

app.get('/welcome',(request,response)=>{
    if(request.session.displayName){
        //로그인에 성공
        response.send(`
        <h1>Hello, ${request.session.displayName}</h1>
        <a href="/auth/logout"> Logout</a>
        `);
    }else{
        response.send(`
        <h1>Welcome</h1>
        <a href="/auth/login"> Login</a>
        `);
    }
})


app.post('/auth/login',(request, response)=>{
    var user={
        username:'user',
        password:'1234',
        displayName: 'admin'
    };
    var username = request.body.username;
    var pwd = request.body.password;

    if(username == user.username && pwd == user.password){
        request.session.displayName = user.displayName;
        response.redirect('/welcome');
    }else{
        response.send('Who Are You?');
    }
})

app.get('/auth/login',(request,response)=>{
    var output = `
    <form action="/auth/login" method ="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    `;

    response.send(output);
})

app.listen(3000,()=>{
    console.log("Open Server 8000");
})