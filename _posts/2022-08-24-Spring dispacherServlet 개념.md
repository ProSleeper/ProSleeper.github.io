---
title:  "[Java] Spring dispacherServlet 개념" 

categories:
  - Java
tags:
  - [Java, Spring]

toc: true
toc_sticky: true

date: 2022-08-24
last_modified_at: 2022-08-24
---


# Spring FrameWork 학습 시작
 - 오늘 학원에서 spring 첫 시간이었다. 만약 Spring만 배웠다면 Spring이 왜 그렇게 돌아가는지를 잘 몰랐을 거 같은데
 - servlet부터 struct1,2를 거쳐서 spring을 배우니까 100% 다 이해하지는 못해도 왜 이런 흐름으로 구성을 했는지, frontController를 왜 만드는지 이해는 갔다.
 - 아마 선배 개발자들의 어마어마한 고민이 있었을 것 같다.


# Srping FrameWork에서 dispatcherServlet의 역할
 - 며칠 전에 인프런에서 김영한님의 스프링부트 강의를 들었다. 역시 유명한 분은 이유가 있었다. 잘 가르치시더라.
 - 여튼 배우면서 이것저것 이론을 설명해주는데 가장 기억에 남았던 클라이언트의 요청이 왔을 때 실행 순서 부분이었는데
 - 오늘 학원에서 Spring 첫 시간에 dispatcherServlet을 배우면서 좀 더 이해가 갔다.
 - 그림으로 설명하자면 이렇다.

# dispatcherServlet의 frontcontroller로서의 역할
 - 아래 그림을 설명하자면

![spring frontcontroller](https://user-images.githubusercontent.com/25880465/186456971-eabd8827-815a-4e85-a462-1e973441ef0b.png){: width="50%" height="50%"}

 1. 클라이언트로부터 요청이 오면 was인 tomcat이 요청을 spring 컨테이너로 보낸다. 이때 spring 컨테이너로 보내진 모든 요청을 dispatcherServlet이 받는다.
 2. 그리고 dispatcherServlet은 해당 요청을 처리할 컨트롤러에게 매핑시킨다.
 3. 컨트롤러는 받은 요청을 처리(비즈니스 로직) 하고 필요한 모델(데이터)를 반환한다.
 4. dispatcherServlet는 처리된 모델을 보여줄 화면을 viewResolver에게 요청해서 매핑시킨다.
 5. view는 클라이언트에게 보여줄 화면을 처리해서 반환한다.
 6. 클라이언트에게 응답.

 - 여기서 2번과 4번은 보통 미리 매핑이 되어있다고 생각하면 된다. 매핑하는 방법은 직접 bean으로 등록을 하거나 어노테이션을 이용하는 방법이 있다고 배웠다.


# dispatcherServlet는 직관적이다.
 - 김영한님 강의와 학원 강의를 다 들으면서 느낀건데 이 frontController 방식은 상당히 직관적이라서 이해하기 쉬운 것 같다.
 - frontcontroller pattern 이라고 하는 걸 보면 아마 다른 여러가지 방식이 있는 듯하다.
 - 학원에서 배운 것 모든 것이 이해되는 것은 아니지만 최대한 흐름을 따라가려고 노력해야겠다.
 - 개인적인 생각이지만 백엔드는 결국 흐름을 파악하는 것이 중요한 것 같다.

# web.xml 과 dispatcher-servlet 코드
```java

//생략..

	<!-- Spring 환경설정 -->

	<servlet>
		<servlet-name>dispatcher</servlet-name> //3
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class> //4
	</servlet>

	<servlet-mapping>
		<servlet-name>dispatcher</servlet-name> //2
		<url-pattern>*.action</url-pattern> //1
	</servlet-mapping>

	<listener>
		<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
	</listener>

//생략...

```
 - web.xml 파일
 - 다른 부분은 중요하지 않아서 생략하고 *.action으로 요청이 들어왔을 때의 요청 이름을 dispatcher라고 선언하고 그 이름을 가진 servlet-class를 찾아간다.
 - 1, 2, 3, 4 순서로 동작한다.





```java

//생략...

  //2
	<bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
		<property name="prefix" value="/" />
		<property name="suffix" value=".jsp" />
	</bean>

	//1
	<bean id="handlerMapping" class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">
		<property name="order" value ="1"/>
		<property name="alwaysUseFullPath" value = "true"/>
		<property name="mappings">
			<props>
				<prop key="/test/write.action">listFormController</prop>
				<prop key="/test/write_ok.action">listController</prop>
				<prop key="/test1/login.action">loginController</prop>
				<prop key="/test2/mem.action">memController</prop>
				<prop key="/multi/*.action">multiTestController</prop>
			</props>
		</property>
	</bean>


<bean id="propsResolver" class = "org.springframework.web.servlet.mvc.multiaction.PropertiesMethodNameResolver">
	<property name="mappings">
		<props>
			<prop key="/multi/list.action">list</prop>
			<prop key="/multi/view.action">view</prop>
		</props>
	</property>
</bean>


<bean name = "multiTestController" class="com.test3.MultiTestController">
		<property name="methodNameResolver" ref="propsResolver"></property>
</bean>


<bean name = "memController" class="com.test2.MemController">
	<property name = "pages">
		<list>
			<value>test2/mem1</value>
			<value>test2/mem2</value>
			<value>test2/mem3</value>
		</list>
	</property>
</bean>


<bean name="authenticator-ref" class="com.test1.LoginAuthenticatorImpl"/>
<bean name="loginController" class = "com.test1.LoginController">
	<property name="authenticator" ref="authenticator-ref"/>
	<property name="commandClass" value="com.test1.LoginCommand"/>
	<property name="commandName" value = "loginCommand"/>
	<property name="formView" value="test1/login"></property>
</bean>

<bean name="listFormController" class="com.test.ListFormController"/>
<bean name="listController" class="com.test.ListController"/>


//생략...

```
- dispatcher-servlet.xml 파일
- 여러 코드가 있지만 결국에 중요한 것은 위에서 설명한 dispatcherServlet의 동작 과정 중에서 중요한 2번과 4번이 주석1 주석2 이다.
- 주석 1번이 컨트롤러를 매핑시킨 handler이고 주석2번이 controller의 처리 결과로 나온 데이터를 보여줄 view에 매핑 시켜주는 handler이다.

# 마무리
 - 조금 어렵다고 느껴졌다. 근데 정말 쉬운 것보다 훨씬 재밌는 것 같다. 수업 시간에도 뭔가 어렵다고 느껴지지만 재밌어서 조금 즐거웠다.
<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
