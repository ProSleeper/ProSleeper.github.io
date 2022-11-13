---
title:  "Programmers 피보나치 수[⭐⭐]" 



categories:
  - Java
tags:
  - [Java, Algorithm]

toc: true
toc_sticky: true

date: 2022-11-13
last_modified_at: 2022-11-13
---

출처: Programmers  
[피보나치 수](https://school.programmers.co.kr/learn/courses/30/lessons/12945?language=java)


### 1차 풀이
```java
class Solution {
    public int solution(int n) {
        return recursiveFibo(n) % 1234567;
    }
    
    int recursiveFibo(int inputNumber){
        
        if(inputNumber == 0){
            return 0;
        }
        else if(inputNumber == 1){
            return 1;
        }
            
        return recursiveFibo(inputNumber - 1) + recursiveFibo(inputNumber - 2);
    }
}
/*
    내가 생각한 풀이 방법

    1. 피보나치 수를 구하는 재귀함수를 만든다.
    2. 주어진 n에 대한 피보나치 수를 구한다.
    3. 구한 피보나치 수를 1234567 나눈 값이 정답.

    공식이나 계산법이 잘못된것 같지는 않다.
    다만 효율성 부분에서 너무 많은 재귀와 입력 최대값이 100,000인데 실제로 이 크기의 피보나치수는 int의 크기로 감당하지 못한다.
    그래서 int보다 큰 자료형과 memoization을 이용한 이미 실행한 부분의 재귀는 다시 실행하지 않도록 바꿔보기로 했다.
*/
```


### 2차 풀이
```java
import java.math.BigInteger;

class Solution {
    
    BigInteger[] memo = new BigInteger[100000];
    
    public int solution(int n) {
        int answer = 0;
        BigInteger div = new BigInteger("1234567");
        
        return Integer.parseInt((recursiveFibo(n).remainder(div)).toString());
    }
    
    BigInteger recursiveFibo(int inputNumber){
        
        if(memo[inputNumber] != null){
            return memo[inputNumber];
        }
        
        if(inputNumber < 2L){
            return BigInteger.valueOf(inputNumber);
        }
        
        memo[inputNumber] = recursiveFibo(inputNumber - 1).add(recursiveFibo(inputNumber - 2));
        
        return memo[inputNumber];
    }
}
/*
    0. 1차 풀이와 달라진 점은 n은 최대 100,000이 될 수 있으므로 만약 100,000이라면 재귀함수도 말도 안되게 클것이고, 반환하는 숫자도 클 것이다.
    그래서 java에서 제공하는 BigInteger를 사용해서 큰수에서도 처리가 가능하도록 했고, memoization기법을 이용해서 크기 100,000짜리 배열을 만들어서 inputNumber에 해당하는 계산이 끝나면 그 값을 memo 배열에 저장해두고 재귀함수 실행시 같은 inputNumber로 들어왔으면 그 하위 재귀부분을 패스하도록 구현했다.
    다만 아직도 13번 런타임 에러가 발생한다. 검색해보니 이유는 재귀함수의 최대깊이 때문이라고 한다. 자바에서 재귀함수의 최대 깊이는 10000이다. 아마 그 값을 넘어서는 것 같다. 왜냐면 실패가 아니라 런타임 에러가 발생한다. 그래서 반복문으로 구현하도록 변경해야겠다.
    그리고 메모리를 너무 잡아먹는다.. 14번은 통과했는데 사용메모리를 보니 1.08GB 무려 기가였다....

    1. memoization을 사용하기 위해서 n의 최대 입력 값인 100,000 크기의 배열을 만든다.
    2. 피보나치 수를 구하는 재귀함수를 만든다. 이때 이미 한번 진행된 재귀 부분은 더 이상 하위 재귀를 하지 않도록 memo배열에 저장해두고 체크한다.
*/
``` 

### 3차 풀이
```java
import java.math.BigInteger;

class Solution {
    public int solution(int n) {
        int answer = 0;
        BigInteger fFirst = new BigInteger("0");
        BigInteger fSecond = new BigInteger("1");
        BigInteger fTemp = new BigInteger("0");
        BigInteger div = new BigInteger("1234567");
        
        for(int i = 1; i < n; i++){
            fTemp = fSecond;
            fSecond = fFirst.add(fSecond);
            fFirst = fTemp;
        }
        
        return fSecond.remainder(div).intValue();
    }
}
/*
    2차 풀이에서 생긴 최대 재귀함수의 제한 문제점을 해결하려면 결국 재귀말고 반복문으로 해결이 가능하다는 결론이 나왔다.
    다만 결과적으로 큰수를 구해야하니 BigInteger는 계속 사용했다.
    이 코드는 통과되었다. 다만 내 생각에 이런 방식은 정답은 맞겠지만 제일 효율적인 방법은 아니라고 생각이 들었다.
    특히 1234567로 나누는 것이 존재하기 때문에 BigInteger말고 int로 푸는 방법이 존재할거라 생각들어서 질문하기 쪽의 팁들을 참고했다.
*/
```

### 4차 풀이
```java
import java.math.BigInteger;

class Solution {
    public int solution(int n) {
        int answer = 0;
        int fFirst = 0;
        int fSecond = 1;
        int fTemp = 0;
        int div = 1234567;
        
        for(int i = 1; i < n; i++){
            fTemp = fSecond % div;
            fSecond = (fFirst + fSecond) % div;
            fFirst = fTemp;
        }
        
        return fSecond;
    }
}
/*
    https://school.programmers.co.kr/questions/11969
    링크에서 이준희님의 답변을 토대로 다시 만들었다.
    (A + B) % C = (A x C) + (A x B) 이 분배법칙을 중학교 때 배운게 살짝 기억나는걸 보니 참 쉬운 공식이었나보다.
    여튼 이 방법을 실제 코드에 적용하려면 어떻게 해야하나 잠시 고민하다가 냅다 적용하면 된다는 결론이 나왔다.
    0,1,1,2,3,5,8,13 이렇게 증가할때 정답은 n번째 피보나치 수를 1234567로 나눈 값인데,
    위의 공식대로면 n번째 피보나치수를 1234567로 나눈 값이나 0%1234567, 1%1234567, 1%1234567, 2%1234567, ...(n - 1)%1234567은 동일하다는 결론이 나온다.
    그래서 계속해서 F(n-1)%div + F(n-2)%div 이런 방식으로 구현하니 int 범위 내에서도 충분히 답을 구할 수 있었다.
    (A + B) % C = (A x C) + (A x B) 이 공식이 정말 간단한데 떠올리는 게 참 쉽지 않은 것 같다.
    정답을 구한 것보다 하나 더 배운 게 참 재밌었다.
*/
```
