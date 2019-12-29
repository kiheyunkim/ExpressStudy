# Multer

js 파일 업로드를 가져오는 모듈



* ##### 설명서: [Link](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)

  

* ##### 설치

  ```bash
  npm install --save multer
  ```

  

* ##### Jade를 통한 업로드 폼 구현

  ```jade
  doctype html
  html
      head
          meta(charset='utf=8')
      body
          form(action='upload' method='post',enctype="multipart/form-data")
              input(type='file' name='userfile')
              input(type='submit')
  ```

  

* ##### 파일의 수신 방법

  ```javascript
  var multer = require('multer');
  var upload = multer({dest:'upload/'});
  
  app.get('/upload',function(request,response){
      response.render('uploadForm')
  })
  
  app.post('/upload',upload.single('userfile'), function(request,response){
      console.log(request.file);
      response.send('uploaded : '+ request.file );                            
  })
  //upload.single('userfile')이라는 것을 넣어줬기 때문에 request안에 있는 file이라는 property에
  //업로드된 파일을 자동으로 입력해준다. 이것을 미들웨어라고 한다.
  //미들웨어는 함수가 실행되기 전에 미들웨어가 들어가서 request에 파일에 대한 정보를 적어줌
  ```

  

* ##### 파일이 웹 서버로 올라갔을 때의 파일 자체의 log 출력

  ```json
  {
    fieldname: 'userfile',
    originalname: 'imbakMall.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: 'upload/',
    filename: 'daf3a8916d374c82272f2a07ce6a2efa',
    path: 'upload\\daf3a8916d374c82272f2a07ce6a2efa',
    size: 0
  }
  ```

  

* ##### 파일에 대해서 업로드에 대한 세부 설정

  ```javascript
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
  ```

  업로드된 파일을 저장할 위치와 저장될 파일의 이름을 지정한다.

