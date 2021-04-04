---
title:  "[C++] Programmers 같은 숫자는 싫어 Lv1" 

categories:
  - C++
tags:
  - [C++]

toc: true
toc_sticky: true

date: 2021-03-24
last_modified_at: 2021-03-24
---

Programmers  
https://programmers.co.kr/learn/courses/30/lessons/12906

풀이 1  
<br>

```cpp
#include <vector>
#include <iostream>

using namespace std;

vector<int> solution(vector<int> arr) 
{
    vector<int> answer;
    int checkValue = arr[0];
    
    for(int i = 1; i < arr.size(); i++){
        if(checkValue == arr[i]){
            arr.erase(arr.begin() + i);
            i--;
        }
        else{
            checkValue = arr[i];
        }
    }
    
    answer = arr;
    return answer;
}
```

결과.
정확성:O, 효율성:X  
효율성은 1개도 통과 못했다.  
반복문을 2개 겹쳐서 사용한 것도 아니고 1차 반복문인데도 통과를 못하거보니  
일부러 최대한 효율적으로 코드를 짜야하는 듯


풀이 2  

```cpp
#include <vector>
#include <set>
#include <iostream>

using namespace std;

vector<int> solution(vector<int> arr) 
{
    vector<int> answer;
    set<int> checkValue;
    answer.push_back(arr[0]);
    
    for(int value : arr){
        if(answer.back() != value){
            answer.push_back(value);
        }
    }
    return answer;
}
```

결과. 
정확성:O, 효율성:O
개인적으로는 풀이 1과 뭐가 크게 다른지 모르겠다. 분명히 간결해지긴 했는데 크게 차이나는 부분은 없어보이는데..  
if else문의 조건비교 시간보다는 asnwer = arr 이 부분에서 할당하는 시간이 많은 것 같다.


<br>

[맨 위](#){: .btn .btn--primary }{: .align-right}