---
title:  "[C++] Programmers 나누어 떨어지는 숫자 배열 Lv1" 

categories:
  - C++
tags:
  - [C++]

toc: true
toc_sticky: true

date: 2021-03-24
last_modified_at: 2021-03-26
---

출처: Programmers  
[링크: 나누어 떨어지는 숫자 배열](https://programmers.co.kr/learn/courses/30/lessons/12910){:target="_blank"}  



풀이 1  
```cpp
#include <string>
#include <vector>

using namespace std;

vector<int> solution(vector<int> arr, int divisor) {
    vector<int> answer;
    for(int value : arr){
        if((value % divisor == 0)){
            answer.push_back(value);
        }
    }
    
    for(int i = 0; i < answer.size() - 1; i++){
        for(int j = 0; j < answer.size() - 1 - i; j++){
            if(answer[j] > answer[j + 1]){
                int temp = answer[j];
                answer[j] = answer[j + 1];
                answer[j + 1] = temp;
            }
        }
    }
    
    if(answer.size() == 0){
        answer.push_back(-1);
    }
    
    return answer;
}
```

결과.
테스트케이스 3개도 다 통과 못함.
이유는 `signal: segmentation fault (core dumped)` 컴파일 오류인데
저번에 동일한 오류였을 때 알아보니 보통 배열index를 잘못 접근 했을 때 나는 오류라서
버블정렬 부분에서 잘못된 부분을 찾았으나 아무리 봐도 코드 자체는 잘못 된게 없었다.
그래서 웹 상에서 코딩하던 코드를 xcode로 옮겨와서 Debugging 해봤다.
문제는 `for(int i = 0; i < answer.size() - 1; i++)` 이 부분이었다.
이 코드가 문제될거라고 생각 안했는데 문제가 된 부분은 answer.size()가 0일때 - 1을 해주는 부분.
당연히 코드가 실행되지 않고 for문을 지나칠거라 생각했는데 어처구니 없게도 실행이 된다.
`i < -1` 이때 i는 0인데 실행이 되는 게 문제인건가 아니면 내가 잘못 알고 있었던 것인가..
여튼 문제 발견


풀이 2  
```cpp
#include <string>
#include <vector>

using namespace std;

vector<int> solution(vector<int> arr, int divisor) {
    vector<int> answer;
    for(int value : arr){
        if((value % divisor == 0)){
            answer.push_back(value);
        }
    }
    
    if(answer.size() == 0){
        answer.push_back(-1);
        return answer;
    }
    
    for(int i = 0; i < answer.size() - 1; i++){
        for(int j = 0; j < answer.size() - 1 - i; j++){
            if(answer[j] > answer[j + 1]){
                int temp = answer[j];
                answer[j] = answer[j + 1];
                answer[j + 1] = temp;
            }
        }
    }

    return answer;
}
```

결과. 
정확성:O
`answer.size() == 0`일때 처리하는 코드 부분을 sort부분 위로 올려서 먼저 처리하고 return 되게 함.


<br>

[맨 위](#){: .btn .btn--primary }{: .align-right}