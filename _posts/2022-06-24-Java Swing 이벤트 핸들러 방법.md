---
title:  "[Java] Swing 이벤트 핸들러 방법" 

categories:
  - Java
tags:
  - [Java]

toc: true
toc_sticky: true

date: 2022-06-24
last_modified_at: 2022-06-24
---



[출처 1](https://movefast.tistory.com/48){:target="_blank"}  
[출처 2](https://yooniron.tistory.com/13){:target="_blank"}  


# 이벤트란?
- 이벤트(Event)라는 것은 특정한 행동이 발생한 그 자체를 의미합니다.
- 예를 들어 메뉴를 선택했다는가, 아니면 마우스를 클릭하거나, 크기를 조절하거나 등의 행위를 뜻하는 것입니다.
- 이런한 방식의 프로그래밍을 이벤트 중심의 프로그래밍이라고 하는데 프로그래밍에서 중요한 개념 중에 하나입니다.

## 내가 생각하는 이벤트
1. 어떤 프로그램을 만들 때, 이벤트(부르는 방법은 많지만)가 없는 프로그램은 없다.
2. 텍스트를 입력하고 버튼을 클릭하고 두 수의 합계를 내고 이 모든 것을 이벤트라는 단어로 표현할 수 있다.
3. 결국 프로그램이란 어떤 이벤트를 어떻게 처리할 것인가? 라는 것을 해결해주는 것이라고 생각한다.

# Java Swing 에서의 이벤트 처리
## 자바 이벤트 3대속성
1. 이벤트 소스(Event Source)
- 이벤트 소스는 이벤트가 발생되는 컴포넌트를 말한다. 즉, 버튼, 체크박스, 리스트, 프레임, 마우스 등과 같은 컴포넌트들이 이벤트 소스이다. 

2. 이벤트 리스너(Event Listener)  
-이벤트 소스에서 이벤트가 발생하는지를 검사하고 있다가 이벤트가 발생이 되면 실제적으로 이벤트를 처리할 수 있도록 만든 인터페이스이다.  

3. 이벤트 핸들러(Event Handler) 
이벤트 리스너에 전달된 이벤트를 실제로 처리할 수 있도록 이벤트 리스너에 포함되어있는 메서드로 발생된 이벤트 객체를 받아와서 실제적으로 처리해주는 기능을 가지고 있다.  



## 이벤트 리스너
- 위에서 설명한 3대 속성에서 어떤 이벤트가 일어났을 때 그것을 발견하고 처리할 수 있도록 해주는 것은 결국 이벤트 리스너이다.


## Swing 이벤트 리스너 적용방법
1. 독립적인 클래스로 이벤트 처리기를 작성
2. 내부 클래스(inner class)로 작성
3. 해당 클래스가 이벤트를 바로 처리
4. 익명 클래스(Anonymous class)로 작성
5. 람다식을 이용하는 방법
6. Frame에서 이벤트 처리


## 마무리
- 6가지로 나눠놓긴 했지만 몇몇 방법은 사실 비슷하다.
- 그리고 내가 Swing 쓰면서 적용한 방법은 위의 방법과 거의 비슷하지만 똑같지는 않았다.
- 난 Frame을 상속받아서 Component를 만들어서(예를 들어 버튼) 그것에 대한 리스너를 메서드로만 만들어서 생성자에서 붙여주는 방식을 이용했다.
- 다만 이 방법은 내 생각에는 비효율 적인 것 같다. 따로 이벤트 핸들러 클래스를 만들어서 사용하는 게 코드 양을 더 줄일 수 있을 것 같다.
- 현재 방법 말고 위의 방법들 중에서 제일 효율적인 방법으로 코드 수정 시도해보자.

<br>

<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
