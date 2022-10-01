---
title:  "[Spring] 컴포넌트 스캔(ComponentScan)" 



categories:
  - Java
tags:
  - [Spring, Java]

toc: true
toc_sticky: true

date: 2022-10-01
last_modified_at: 2022-10-01
---


# 컴포넌트 스캔 
- 컴포넌트 스캔은 스프링이 직접 클래스를 검색해서 빈으로 등록해주는 기능이다.
- 원래라면 설정클래스(AppCtx, Config)에서 Bean으로 등록을 해야 스프링 컨테이너가 해당 클래스를 알 수 있는데 컴포넌트 스캔을 하면 자동으로 등록하기 때문에 설정 코드가 크게 줄어든다.


# 컴포넌트 스캔 설정 @ComponentScan
- 스프링에서는 @ComponentScan 어노테이션을 가진 설정 클래스가 존재해야 검색을 할 수 있지만 스프링부트는 생성시 만들어지는 @SpringBootApplication 로 내부적으로 @ComponentScan을 가지고 있어서 따로 등록할 필요는 없다.
- 스캔을 사용하면 @Component를 가진 클래스들을 자동으로 등록해주고 범위를 지정할 수 있다.
- 범위 지정 방법은 ```@ComponentScan(basePackages = {"spring"})``` 이렇게 하면 spring 패키지와 그 하위 해키지에 속한 클래스를 스캔 대상으로 설정한다.

# 스캔 대상에서 제외, 포함하기

### 1. FilterType.REGEX
- @Filter 어노테이션을 이용해서 정규표현식으로 제외할 목록을 지정할 수 있다. 
- 아래 코드는 spring으로 시작하고 Dao로 끝나는 컴포넌트를 스캔대상에서 제외한다.
```java
@ComponentScan(basePackages = {"spring"}, excludeFilters = @Filter(type = FilterType.REGEX, pattern = "spring\\..*Dao"))
```
<br/>

### 2. FilterType.ANNOTATION
- 또는 특정 어노테이션을 붙인 클래스를 제외할 수도 있다.
- 아래 코드는 @NoProduct나 @ManualBean 어노테이션을 붙인 클래스를 제외한다.


```java
@ComponentScan(basePackages = {"spring"}, excludeFilters = @Filter(type = FilterType.ANNOTATION, classes = {NoProduct.class, ManualBean.class}))
```

<br/>

### 3. FilterType.ASSIGNABLE_TYPE
- 특정 타입이나 그 하위 타입을 컴포넌트 스캔 대상에서 제외하려면 아래 코드처럼 ASSIGNABLE_TYPE을 filterType으로 사용한다.
```java
@ComponentScan(basePackages = {"spring"}, excludeFilters = @Filter(type = FilterType.ASSIGNABLE_TYPE, classes = MemberDao.class))
```

<br/>

### 4. 여러개의 필터가 필요할때
- 설정할 필터가 두개 이상이면 배열을 사용한다.
```java
@ComponentScan(basePackages = {"spring"}, excludeFilters = {
  @Filter(type = FilterType.ANNOTATION, classes = ManualBean.class),
  @Filter(type = FilterType.REGEX, pattern = "spring3\\..*")
})
```

# 기본 스캔 어노테이션
- @Component, @Controller, @Service, @Repository, @Configuration, @Aspect
- 이 중에서 Aspect를 제외한 나머지 5개는 모두 내부적으로 @Component 어노테이션을 가지고 있다.

# 컴포넌트 스캔시 충돌 처리

### 1. 자동 등록한 2개의 패키지 범위 충돌
- 컴포넌트 스캔을 이용해서 자동으로 빈을 등록할 때는 충돌에 주의해야 한다.
- 아래 코드와 같이 2개의 패키지를 컴포넌트 스캔 범위로 설정했는데 둘다 같은 이름의 클래스가 있다면 충돌이나서 예외가 발생하게 된다.
- 그러므로 같은 이름을 피하거나, 둘 중 하나에 명시적으로 빈 이름을 지정해서 충돌을 피해야 한다.
```java
@ComponentScan(basePackages = {"spring", "spring2})
```

### 2. 수동 등록한 빈과 충돌
- MemberDao에 @Component 어노테이션을 붙여서 컴포넌트 스캔 대상이 되었다.
```java
@Component
public class MemberDao {
  ...
}
```
<br>

- 만약 설정에서 아래와 같이 수동으로 Bean을 등록하면 어떻게 될까?
- 이때는 수동으로 등록한 Bean이 우선이 된다.

```java
@Bean
public MemberDao memberDao(){
  MemberDao memberDao = new MemberDao();
  return memberDao;
}
```

# 마무리
- 스프링부트도 사용해본 입장에서 확실히 컴포넌트 스캔이라는 것은 좋은 방법이다.
- 다만 개인적으로는 프로그래밍에서 자동으로 되는 것은 단 한개도 없다! 라는 생각을 가지고 있기 때문에, 쉽게 사용하는 설정이나 라이브러리, 프레임워크 등은 누군가가 고생해서 만들어 놓은 부분이라고 생각한다.
- 그리고 그것을 더 잘 쓰기 위해서는 어느 정도는 내부적으로 어떻게 동작하는 지 알아둘 필요가 있다고 생각해서 스프링부트를 쓰면 더 간단하지만 스프링이 어떻게 동작하는지 알아가는 것도 중요하다고 생각된다.


<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
