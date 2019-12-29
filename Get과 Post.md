# Get과 Post

### Get

* ##### 기본적으로 가져오는 방식 모두는 Get방식

  ```
  http://www.test.com/hi?id=2
  http://www.test.com/
  ```

* 주소에서 데이터를 가져오는 데에 주소의 구성은 다음과 같다.

  ```
  http://localhost:3000/dynamic?id=2&description=12345
  
  http                    -> 프로토콜
  localhost               -> 도메인
  3000	                -> 포트
  /dynamic                -> 세부 주소
  ?id=2&description=12345 -> query string
  전체는 URL이라고 부른다.
  ```

  

* ##### Get에서 오는 데이터를 처리하는 방식

  ```javascript
  app.get('/form_receiver',function(request,response){
      var title = request.query.title;
      var description = request.query.description;
      response.send(title+','+description);
  })
  ```

  



### Post

* ##### 사용자의 정보를 서버로 전달할 때 사용하는 방식.

  * ex) 로그인시에 로그인 정보 전달, 작성된 게시글을 서버로 보내는 행위.



* ##### Client측 전송용 코드

  ```html
  <form action="/form_receiver" method="post"> 
        <p>
          <input type="text" name="title">
        </p>
        <p>
          <textarea name="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
  
  <!-- 기본적으로 method는 get이 기본이다. -->
  <!-- Get에 대해서는 처리해줬으나 Post에 대해서 처리하진 않았으므로 다음과 같이 뜬다 -->
  ```

  

* ##### 브라우저에서 본 서버의 반응

  ```
  Cannot POST /form_receiver					//받을 수 있는 것이 없다.
  ```

  

* ##### 왜? Get으로는 받을 수 없기 때문이다. 그래서 Post용으로 바꿔줘야한다.

  ```javascript
  app.post('/form_receiver',function(request,response){
      var title = request.body.title;
      var description=request.body.description;
      response.send(title+','+description);
  })
  
  
  //post는 query가 아닌 body에서 가져온다. get과는 다른 부분에 데이터가 적제되기 때문이다.
  ```

  

* ##### 다시 브라우저에서 본 서버의 반응

  ```
  TypeError: Cannot read property 'title' of undefined
      at c:\Users\kihey\Desktop\temp\app.js:21:30
      at Layer.handle [as handle_request] (c:\Users\kihey\Desktop\temp\node_modules\express\lib\router\layer.js:95:5)
      at next (c:\Users\kihey\Desktop\temp\node_modules\express\lib\router\route.js:137:13)
      at Route.dispatch (c:\Users\kihey\Desktop\temp\node_modules\express\lib\router\route.js:112:3)
      at Layer.handle [as handle_request] (c:\Users\kihey\Desktop\temp\node_modules\express\lib\router\layer.js:95:5)
      at c:\Users\kihey\Desktop\temp\node_modules\express\lib\router\index.js:281:22
      at Function.process_params (c:\Users\kihey\Desktop\temp\node_modules\express\lib\router\index.js:335:12)
      at next (c:\Users\kihey\Desktop\temp\node_modules\express\lib\router\index.js:275:10)
      at expressInit (c:\Users\kihey\Desktop\temp\node_modules\express\lib\middleware\init.js:40:5)
      at Layer.handle [as handle_request] (c:\Users\kihey\Desktop\temp\node_modules\express\lib\router\layer.js:95:5)
  ```

  **이유는 기본적으로 오는 post 방식으로 전달된 데이터는 undefined이다. 따라서 body-parsing을 해줘야한다.**

  

* ##### Body Parser의 이용

  ```javascript
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({extended:false}));       //모듈을 붙이는 것 body의 내용을 처리할 수 있도록!
  ```

  위를 추가한 이후에는 잘 나오게 된다. 이를 **미들웨어**라고 한다.
  
  * 추가로 최신 express에서는 자체적으로 parser를 가지고는 있다. 하지만 Json과 URL-encoded형식 이외에도 Raw,Test형식의 본문도 추가로 해석가능하다.



### Get vs Post

* Post방식은 Get보다는 좀더 안전하다. 왜냐하면 Get은 Post에 비해서 주소에 노출되기 때문이다. 하지만 그렇다고 Post 조차도 안전하다고 할 수는 없다. 알아내는 방식이 힘들뿐 알아내기가 불가능 하지는 않기 때문이다.
* Get은 어느정도 Url(Query String)을 통해서 전달할때는 정보가 크다면 url의 규격상 서버가 데이터 일부를 버린다. 또는 브라우저가 버린다. 전송할 데이터가 많은 경우 반드시 Post로 전송해야 온전한 데이터를 전송시킬 수 있다.