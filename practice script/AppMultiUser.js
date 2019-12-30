var express = require('express')
var session = require('express-session')
var fileStore = require('session-file-store')(session)

var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret:'123c12v@adv3$341@', //쿠키 세팅을 했으면 같은 값을 넣어도 됨.
    resave:false,               //세션아이디를 접속할때마다 새롭게 발급 받을지?
    saveUninitialized:true,      //세션아이디를 사용하기 전까지는 발급받지 말지?
    store: new fileStore()
}))

var users=[
    {
        username:'user',
        password:'81dc9bdb52d04dc20036dbd8313ed055',
        displayName: 'admin'
    }
]

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
    response.redirect('/welcome');
})

app.post('/auth/register',(request,response)=>{
    var user = {
        username:request.body.username,
        password:request.body.password,
        displayName:request.body.displayName
    };

    users.push(user);

    request.session.displayName = request.body.displayName;//세션에 현재 가입한 사람 주입
    request.session.save(()=>{
        response.redirect('/welcome');
    })
})

app.get('/auth/register',(request,response)=>{
    var output = `
    <form action="/auth/register" method ="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="text" name="displayName" placeholder="displayName">
        </p>
        <p>
            <input type="submit">
        </p>
    `;

    response.send(output);
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
        <ul>
            <li><a href="/auth/login"> Login</a></li>
            <li><a href="/auth/register"> Register </a></li>
        </ul>
        `);
    }
})


app.post('/auth/login',(request, response)=>{
    var username = request.body.username;
    var pwd = request.body.password;
    for(var i=0;i<users.length;++i){
        var user = users[i];
        
        if(username == user.username && pwd == user.password){
            request.session.displayName = user.displayName;
            return request.session.save(()=>{
                 response.redirect('/welcome');
            })
        }
    }

    response.send('Who Are You? <a href="/auth/login">login</a>');
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