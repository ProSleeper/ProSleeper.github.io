---
title:  "[C++] Programmers 소수 찾기 Lv1" 

categories:
  - C++
tags:
  - [C++]

toc: true
toc_sticky: true

date: 2021-03-24
last_modified_at: 2021-03-24
---

출처: Programmers  
[링크: 소수 찾기](https://programmers.co.kr/learn/courses/30/lessons/12921){:target="_blank"}


1차 풀이  
```cpp
#include <string>
#include <vector>

using namespace std;

int solution(int n) {
    int answer = 0;
    
    for(int i = 2; i <= n; i++){
        if(i%2 != 0 and i%3 != 0 and i%5 != 0 and i%7 != 0){
            answer++;
        }
        
        if(i == 2 or i == 3 or i == 5 or i == 7){
            answer++;
        }
    }
    return answer;
}
```

결과.
정확성:X
너무 오랜만에 구해보는 소수구하기 였는지
엄청 간단하게만 생각했다. 소수의 정의를 보고 "2보다 큰 숫자중에서 홀수이고 3으로 나누어지지 않는 수" 라고 생각해서 코드 작성.
테스트케이스는 통과했지만 실제 검사에서는 실패했음. 처음에는 문제가 뭔지 몰라서 왜 틀렸지 생각했는데 실제 성공 코드와 비교해서 실험하니까 알 수 있었음.
예시로 989는 소수가 아님, 근데 위 1차 풀이 코드에서는 소수라고 나옴 989는 23+@의 수로 나눌 수 있다.
그리고 소수를 구하기를 검색하니 "에라토스테네스의 체(이하 에체)" 가 나와서 이걸 봤는데 이 문제에서 정확성은 다른 방법으로도 구하기 쉬운데 효율성은 아마 에체로만 구해야
통과 할 수 있을 것 같다.


2차 풀이
```cpp
int solution(int n) {
    int answer = 0;
    bool sosu = true;
    
    for(int i = 2; i <= n; i++){
        sosu = true;
        for (int j = 2; j <= sqrt(i); j++) {
            if (i% j == 0) {
                //소수가 아님
                sosu = false;
                break;
            }
        }
        if (sosu) {
            answer++;
        }
        
    }
    return answer;
}
```

결과. 
정확성:O, 효율성:X
에라토스테네스의 체(이하 에체)를 봤지만 에체를 구현한것은 아니고 그냥 코드 상의 노다가인데, 어떤 수 x가 소수가 아니라면 x = ab가 성립한다. 이때 a나b 둘중 하나의 수는 √x 보다 작으므로  
x에 대해서 2부터 √x이하의 수까지만 x와 나누어 떨어지는 지 구하면 소수인지 아닌지 알 수 있다.


3차 풀이   //아직 못품
```cpp
int solution(int n) {
    int answer = 0;
    vector<int> era;


    for 
    
    for(int i = 2; i <= n; i++){
        if()
        
    }
    return answer;
}
```

결과. 
정확성:O, 효율성:O

<br>

[맨 위](#){: .btn .btn--primary }{: .align-right}