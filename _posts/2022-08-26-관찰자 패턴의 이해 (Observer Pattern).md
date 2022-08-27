---
title:  "[Design Pattern] 관찰자 패턴의 이해 (Observer Pattern)" 

categories:
  - Design Pattern
tags:
  - [python]

toc: true
toc_sticky: true

date: 2022-08-26
last_modified_at: 2022-08-26
---


# 스프링을 공부하다보니 예전에 얼핏 본 관찰자 패턴(Observer Pattern)이 문득 떠올랐다.
 - 예전에 책에서 얼핏 본 기억이 난다. 약간 관심이 있었던 내용이라서 내 기억에 남았었던 것 같다.
 - 예시로 들어주는 내용이 게임에서 업적을 구현하는 방식이었어서 더 기억에 남았다.
 - 내가 예전에 했던 와우를 했던 경험을 돌아보면, 난 그냥 게임을 한다. 이것 저것 한다.
 - 그러다가 뭔가 조건을 충족하면 업적을 달성했다고 뜬다. 사실 유저 입장에서는 이게 아무 상관없는데 프로그래머 입장이 되어보니 완전 다르다.
 - 프로그래밍을 완전 처음 배운다면 이런거 생각조차 안했겠지만 요즘의 목표가 깔끔한 코드를 만들고 싶다. 인데.. 그게 너무 안되어서 고민이다.
 - 여튼 보통의 게임에서 업적달성이라는 것은 매우매우 여러가지에 걸쳐져 있다. 몬스터를 처치했을때도, 돈을 얼마 이상 벌었을 때도, 심지어 로그인 10회도
 - 업적으로 주는 게임들도 있다.

# 유튜브에서 본 관찰자 패턴 예시 코드

```python

class Observer:
    def update(self):
        pass
    
class Cat(Observer):
    def update(self):
        print('meow')
        
class Dog(Observer):
    def update(self):
        print('bark')

class Owner:
    def __init__(self):
        self.animals = []
        
    def register(self, animal:Observer):
        self.animals.append(animal)
        
    def notify(self):
        for animal in self.animals:
            animal.update()
        
owner = Owner()
cat = Cat()
dog = Dog()


owner.register(cat)
owner.register(dog)

owner.notify()

```

 - 이런 코드였는데 코드 자체는 이해가 갔다.
 - 결국 Observer라는 클래스를 상속받게 하면 어떤 해당 부분의 변경이 발생하면 그걸 관찰자(여기서는 Owner)가 알 수 있는 방식이다.
 - 근데 아래에도 적었지만 이건 내가 생각하던 코드가 아니었다.


# 알림 기능
 - 게임에서의 업적기능을 웹으로 빗대면 내 생각에는 알림 기능이 비슷한 느낌이라고 생각했다.
 - 알림 기능도 은근히 되게 다양하다. 당근 마켓을 예시로 들면 판매자가 채팅을 한다거나, 내 물건에 구매요청이 오거나, 내 물건을 찜했다거나 하는 상황이 있다.
 - 직접 구현해보지는 않았지만, 한번 머리속으로 생각을 해봤다 이런 알림이나 업적 같은 것은 어떻게 구현을 해야할까?
 - 알림을 발생시키는 알림이라는 클래스를 만들고 그 클래스는 싱글턴으로 만든 뒤 알림을 발생시키는 어떤 곳이든 불러서 사용할까?
 - 아니면 알림 클래스를 만들어서 알림이 필요한 곳에서 new로 생성해줄까?
 - 이런저런 고민은 해봤지만 뭔가 명쾌하게 이 방법으로 하면 되겠다! 는 생각이 들지 않았다.



# 관찰자 패턴은 이 문제를 해결해 줄 수 있을까?
 - inflearn에서 김영한님의 spring 강의를 들었을 때 마지막 부분에서 AOP라는 것을 설명해주면서 모든 메서드의 시간을 측정하는 기능을 구현하는 방법을 설명해주었다.
 - 위에 알림 기능을 고민한 것과 문제는 비슷하다고 생각했다. 핵심 로직이 아닌데, 많은 곳에서 적용해야하는 코드라는 부분에서 말이다.
 - 책에서 관찰자 패턴의 내용과 예제 코드를 보긴 했는데, 솔직히 별로 깔끔한 느낌이 들지가 않았다. 결국 알림과는 전혀 상관없는 (예를 들면 채팅)코드에 알림을 띄워주는 코드가 들어가기 때문이다.
 - 근데 김영한님이 보여준 Spring에서의 AOP 구현 코드를 봤는데, 내가 이상으로 삼는 딱 그런 코드였다.

```java
package com.hello.hellospring.aop;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class TimeTraceAop {

    @Around("execution(* com.hello.hellospring..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable{
        long start = System.currentTimeMillis();

        System.out.println("START: " + joinPoint.toShortString());
        try {
            return joinPoint.proceed();
        }finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish - start;
            System.out.println("END: " + joinPoint.toShortString() + " " + timeMs + "ms");
        }
    }
}

```

- 이 코드였는데 이 코드 말고는 다른 어떤 부분도 추가하거나 한 부분이 없다.
- 원하는 부분의 메서드 실행시간을 측정하는 코드였는데 딱 이렇게만 쓰고 구현이 된다는 게 정말 너무 신기했다.
- Spring에서 지원하는 무언가가 밑단에서 당연히 여러가지 일을 하겠지만 사용하는 입장에서 이렇게 사용 할 수 있다는 게 진짜 말도 안되는 것 같다.
- Spring의 사용법에 대해서 더 알고싶어졌다.


<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->