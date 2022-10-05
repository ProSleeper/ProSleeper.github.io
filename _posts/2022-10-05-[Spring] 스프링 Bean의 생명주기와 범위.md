---
title:  "[Spring] 스프링 Bean의 생명주기와 범위" 



categories:
  - Spring
tags:
  - [Spring, Java]

toc: true
toc_sticky: true

date: 2022-10-05
last_modified_at: 2022-10-05
---

- 스프링에서 Bean의 생명주기(생성, 소멸)와 SingleTon 범위와 Prototype 범위를 알아보자.


# 컨테이너 초기화와 종료
- 스프링 컨테이너의 생명주기는 초기화 -> 사용 -> 종료 라는 기본적인 사이클을 가진다.
- 가운데 사용은 말 그대로 사용하는 부분이고 초기화와 종료는 Bean 객체와 밀접한 관련이 있다.
### 컨테이너 초기화
- 컨테이너를 초기화할때 Bean 객체의 생성, 의존주입, 초기화가 수행된다.
### 컨테이너 종료
- 컨테이너가 종료될때 Bean 객체의 소멸이 이루어진다.

# Bean 객체의 라이프 사이클
- 스프링 컨테이너는 익히 알고 있듯이 Bean 객체의 생명주기를 관리한다.
- 컨테이너가 관리하는 Bean 객체의 생명주기는 아래와 같다.
- 객체생성 -> 의존 설정 -> 초기화 -> 소멸

## Bean 객체의 초기화
- 스프링 컨테이너가 초기화 될때 가장먼저 Bean 객체를 생성하고 의존관계 설정을 수행한다.
- 그 후 Bean 객체의 초기화가 진행되는데 이때 스프링은 지정된 메서드를 호출한다.

```java
//초기화
public interface InitializingBean {
  void afterPropertiesSet() throws Exception;
}
```

## Bean 객체의 소멸
- 스프링 컨테이너가 종료 될때 Bean 객체의 소멸도 실행된다.
- 초기화와 마찬가지로 이때도 지정된 메서드를 호출한다.

```java
//소멸
public interface DisposableBean {
  void destroy() throws Exception;
}
```

- Bean 객체가 위의 인터페이스를 상속받아서 구현하면 스프링 컨테이너는 초기화와 소멸 과정에서 각각의 메서드를 호출한다.
- 그러므로 사용자 정의 초기화, 소멸 과정이 필요하면 해당 메서드들을 상속받아 직접 구현하면 된다.
- 초기화와 소멸 과정이 필요한 대표적인 예로는 데이터베이스 커넥션 풀과, 채팅 클라이언트를 예로 들수 있다.
- 데이터베이스는 컨테이너를 사용하는 동안 연결을 유지하고 빈 객체를 소멸할때 데이터 베이스의 연결을 끊어야한다.
- 채팅 클라이언트는 시작할때 서버와 연결을 생성하고 종료할 때 연결을 끊는다. 이때 서버와의 연결을 생성하고 끊는 작업을 초기화 시점과 소멸 시점에 수행하면된다.;


## 사용자 구현 초기화, 삭제 메서드
- 모든 클래스가 interface를 상속받아서 구현할 수 있는 것은 아니다. 직접 구현한 클래스가 아닌 외부에서 제공받은 클래스를 스프링 빈 객체로 설정 하고 싶을 때도 있다.
- 이럴때는 스프링 설정에서 직접 메서드를 지정해주면 된다.


```java
@Bean(initMethod = "connect", destroyMethod = "close")
public Client2 client2 {
  Client2 client = new Client2();
  client.setHost("host");
  return client;
}
```
- 이때 connect와 close는 메서드 이름으로 지정해주면된다.
- 그리고 두 메서드를 직접 구현할때는 파라미터가 없어야 한다. 있으면 예외발생가 발생한다.


# Bean 객체의 생성과 관리 범위
## 스프링의 Bean 객체는 default값으로 singleton범위이다.
- 스프링에서는 Bean 객체의 범위는 singleTon 과 prototype 있다.
- 사용 빈도는 낮지만 직접 prototype으로 지정할 수 있다.

### @Scope("prototype")
 
```java

@Bean
@Scope("prototype")
public Client client(){
  Client client = new Client();
  client.setHost("host");
  return client;
}

Client client1 = ctx.getBean("client", Client.class);
Client client2 = ctx.getBean("client", Client.class);
```

- 위 코드처럼 직접 prototype으로 지정해주면 client1과 client2는 각각 다른 객체가 만들어진다.
- 스프링 컨테이너의 기본값이 singleton이지만 명시적으로 지정해주고 싶다면 prototype과 동일하게 @Scope 메서드에 작성해주면 된다.

### @Scope("singleton")

```java

@Bean
@Scope("singleton")
public Client client(){
  Client client = new Client();
  client.setHost("host");
  return client;
}

```
## 주의사항
- prototype 범위의 Bean 객체는 생성, 초기화는 스프링 컨테이너가 관리 해주지만, 컨테이너 종료시 소멸메서드를 실행하지 않으므로 따로 소멸을 관리해주어야 한다.



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
