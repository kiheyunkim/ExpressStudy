# Callback

A라는 함수가 B라는 함수를 필요할때 마다 불러쓰는 것을 의미한다.



JavaScript에서는 함수 이름 자체를 전달하고 C++에서는 람다가 비슷하게 동작한다. (C++에서 함수를 전달하는 위치에서 익명으로 전달하는 것을 람다식, 함수명을 전달하는 것은 함수 포인터라고 한다). 언어를 작성하면서 계속 써야하는 함수가 아니라면 굳이 함수로 지정해주는 것보다 함수와 함께 선언해버리는 것이 더 좋다.



* JavaScript

  ```javascript
  a = [5,4,3,2,1];
  a.sort(function(a,b){console.log(a+':'+b); return a-b;})
  console.log(a);
  ```

  

* JavaScript 출력

  ```
  4:5
  3:4
  2:3
  1:2
  [ 1, 2, 3, 4, 5 ]
  ```

  

* C++

  ```c++
  #include <iostream>
  #include <algorithm>
  
  
  int main(int argc, char* argv[])
  {
  	int arr[6] = { 6, 5,4,3,2,1 };
  
  	std::sort(arr, arr + 6,
  		[](const int& a, const int& b)->bool
  		{
  			std::cout << a << ":" << b << "\n";
  			return a < b;
  		}
  	);
  
  	for (int i = 0; i < 6; ++i)
  		std::cout << arr[i] << " ";
  	std::cout << "\n";
  
  	return 0;
  }
  ```

  

* C++ 출력

  ```
  5:6
  6:5
  4:5
  5:4
  3:4
  4:3
  2:3
  3:2
  1:2
  2:1
  1 2 3 4 5 6
  ```

  