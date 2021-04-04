---
title:  "[C++] Programmers 최대공약수와 최소공배수 Lv1" 

categories:
  - C++
tags:
  - [C++, Algorithm]

toc: true
toc_sticky: true

date: 2021-04-05
last_modified_at: 2021-04-05
---

출처: Programmers
[최대공약수와 최소공배수](https://programmers.co.kr/learn/courses/30/lessons/12940){:target="_blank"}  

# 유클리드 호제법
최대공약수(GCD)와 최소공배수(LCM)를 구하는 방법은 여러가지가 있는데 보통 중,고등학교에서 배우는 소인수분해로도 구하는 것은 가능하지만  
컴퓨터를 이용할 때, 혹은 큰 수의 GCD와 LCM을 구하는 방법으로는 유클리드 호제법으로 하면 된다.  
  
## 최대공약수 구하기
  1. 두 숫자의 대소를 비교해서 큰 수를 A 작은 수를 B 라고 할 시
  2. A를 B로 나눈다. 이때 나머지가 R 일때 B를 R로 나눈다.
  3. 계속 나누기를 하다가 나머지가 0이 될때 A와B의 최대공약수는 R이다.

### 공식
▶ A % B = R1  
▶ B % R1 = R2  
▶ R1 % R2 = R3  
▶ ...  
▶ Rx == 0 GCD = R(x-1)  

## 최소공배수 구하기
  1. 위에서 구한 최대공약수를 이용하면 아주 쉽게 구할 수 있다.  

### 공식
▶ LCM = A * B / GCD


# 정답
```cpp
#include <string>
#include <vector>

using namespace std;

vector<int> solution(int n, int m) {
    vector<int> answer;
    int upperNumber = 0;
    int lowwerNumber = 0;
    
    if(n > m){
        upperNumber = n;
        lowwerNumber = m;
    }
    else{
        upperNumber = m;
        lowwerNumber = n;
    }
    
    while(true){
        if(upperNumber % lowwerNumber == 0){
            answer.push_back(lowwerNumber);
            answer.push_back(n * m / lowwerNumber);
            break;
        }
        else{
            int tempNumber = lowwerNumber;
            lowwerNumber = upperNumber % lowwerNumber;
            upperNumber = tempNumber;
        }
    }
    //유클리드 호제법을 이용해서 최대공약수를 구하고
    //구한 최대공약수를 이용해서 최소공배수를 구하면 된다.
    
    return answer;
}
```
<br>

<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->