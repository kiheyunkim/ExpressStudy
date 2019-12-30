# 로그인 처리시에 발생할 수 있는 문제



1. #### 조회 할때

   ```javascript
   for(var i=0;i<users.length;++i){
           var user = users[i];
           
           if(username == user.username && pwd == user.password){
               request.session.displayName = user.displayName;
               return request.session.save(()=>{
                    response.redirect('/welcome');
               })
           }
       }
   ```

   * request.session.save()를 이용해서 저장단계를 거치게 되고 안정된 상태에서 redirect를 실행한다면 미쳐 값이 변경되지 못하는 경우를 방지할 수 있다. 또한 콜백함수를 return에 주기 때문에 for문 중간에 탈출 할 수 있다.

     

2. #### 데이터 삽입할 때

   ```javascript
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
   ```

   * 위와 같은 이슈이다. 하지만 여기서는 탈출 할 곳은 없기 때문에 return은 뺐다. 