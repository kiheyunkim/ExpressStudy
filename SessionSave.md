# 세션 저장



### 파일에 저장하는 방법[Link](https://www.npmjs.com/package/session-file-store)

```bash
npm install session-file-store --save
```



* ##### 사용하는 방법

  ```javascript
  var session = require('express-session')
  var fileStore = require('session-file-store')(session)
  
  app.use(session({
      secret:'123c12v@adv3$341@', 
      resave:false,               
      saveUninitialized:true,    
      store: new fileStore() //세션 저장에 session-file-store를 이용함
  }))
  ```

  * session-file-store는 session과 종속관계이다. 따라서 위와 같이 사용을한다.

  * 첫 실행을 하면서 sessions이라는 폴더를 만들고  세션아이디에 따른 파일을 생성하고 파일에 세션을 저장하게됨.

    

* ##### 세션파일

  ```json
  {"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"__lastAccess":1577599761254}
  ```

  

### Mysql에 저장하는 방법[Link](https://www.npmjs.com/package/express-mysql-session)

```bash
npm install express-mysql-session --save
```





* ##### 사용하는 방법

  ```javascript
  var session = require('express-session')
  var MySQLStore = require('express-mysql-session')(session);
  
  app.use(session({
      secret:'123c12v@adv3$341@', 
      resave:false,               
      saveUninitialized:true,      
      store: new MySQLStore({
          host:'localhost',		//DB 주소
          port:3306,				//DB 포트
          user:'root',			//계정
          password:'toor',		//계정 비밀번호
          database:'o2'			//사용 데이터베이스 이름
      })
  }))
  ```

  * 접속하고 나면 sessions라는 table을 os 데이터베이스에 생성한다.



* ##### 추가적 생각

  ```javascript
  app.get('/auth/logout',(request,response)=>{
      delete request.session.displayName;
      response.redirect('/welcome');//리다이렉션을 하는데 mysql에서 아직 지워지지 
                                    //않았다면 어떻게 하지?
  })
  ```

  

* ##### 안전하게 처리하는 방법

  ```javascript
  app.get('/auth/logout',(request,response)=>{
      delete request.session.displayName;
      request.session.save(()=>{		//저장이 끝난 후에 리다이렉트 시키면 안전해짐.
          response.redirect('/welcome');
      })
  })
  ```
