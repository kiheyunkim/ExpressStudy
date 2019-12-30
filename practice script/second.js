var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser('asdwqqv123424v124vsadasd!#'));

var products={
    1:{title:'The History of web 1'},
    2:{title:'The next web'},
}
app.get('/products',(request,response)=>{

    var output ='';
    for(var name in products){
        output += `
        <li>
            <a href="/cart/${name}">${products[name].title}</a>
        </li>`
    }

    response.send(` <h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
})

app.get('/cart',(request,response)=>{
    var cart = request.cookies.cart;
    if(!cart){
        response.send('Empty');
    }else{
        var output = '';
        for(var id in cart){
            output += `<li>${products[id].title} (${cart[id]})</li>`
        }
    }
    response.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Products List</a>
    `)
})

app.get('/cart/:id',(request,response)=>{
    var id = request.params.id;
    if(request.cookies.cart){
        var cart = request.cookies.cart;
    }else{
        var cart ={};
    }
    if(!cart[id]){
        cart[id]=0;
    }
        cart[id] = parseInt(cart[id]) +1;
    response.cookie('cart', cart);
    response.redirect('/cart');
})

app.get('/count',(request,response)=>{
    if(request.signedCookies.count){//브라우저로 부터 온 쿠키는 문자열이다.
        var count = parseInt(request.signedCookies.count) + 1;    
    }else{
        var count = 0;
    }
    response.cookie('count',count,{signed:true});
    response.send('count : '+ count);
});

app.listen(3000,()=>{
    console.log('Connected 3003 port!!');
});