---
title:  "[C++] Programmers 하샤드 수 Lv1" 

categories:
  - C++
tags:
  - [C++, Algorithm]

toc: true
toc_sticky: true

date: 2021-04-04
last_modified_at: 2021-04-04
---


[하샤드 수](https://programmers.co.kr/learn/courses/30/lessons/12947).

# 첫번째 풀이

```cpp
#include <string>
#include <vector>

using namespace std;

bool solution(int x) {
    bool answer = false;
    int sumValue = 0;
    int innerX = x;
    
    while(true){
        
        sumValue += innerX % 10;

        
        if(innerX / 10 == 0){
            break;
        }
        else{
            innerX = innerX / 10;
        }
    }
    
    if(x % sumValue == 0){
        answer = true;
    }
    
    return answer;
}
```

주어진 숫자 `X`의 각 자리수들을 하나씩 잘라서 더한 값으로 자기 자신 `X`가 나누어지는 수
예를 들어 `18` 같은 경우는 `1 + 8 = 9` 이고 `18 / 9 = 2` 로 나누어 떨어지기에 하샤드 수이다.

solution함수의 매개변수로 `x`가 주어졌을 때 하샤드 수인지 아닌지 `true/false`를 리턴하는 코드작성

<br>

<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->