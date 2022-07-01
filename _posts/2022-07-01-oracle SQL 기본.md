---
title:  "[SQL] Oracle SQL 기본 문법" 

categories:
  - DataBase
tags:
  - [DataBase, Oracle]

toc: true
toc_sticky: true

date: 2022-07-01
last_modified_at: 2022-07-01
---


# Oracle SQL 기본 문법

## SQL이란?
### SQL (Structured Query Language : 구조화된 질의 언어)



## 기본 문법과 의미
1. ddl(data difinition language) 데이터 정의
 - create, alter, drop, rename
2. dml(data maipulation language) 데이터 조작
 - insert, update, delete
3. dcl(data control language) 데이터 제어
 - grant, revoke
4. tcl(transaction control language) 트랜잭션 제어
 - commit, rollback



## 일반적인 사용법
 - select * from personnel;
 - select pno, job, pay from personnel;
 - SELECT JOB FROM PERSONNEL;
 - SELECT DISTINCT JOB FROM PERSONNEL;
 - SELECT * FROM PERSONNEL
 - ORDER BY STARTDATE;
 - select * from tab;
 - SELECT * from PERSONNEL;



## 생각정리
 - 어떤 프로그램을 만들 때도 항상 들었던 생각인데 "이 프로그램의 데이터는 도대체 어떻게 관리하는 게 맞는 것인가?" 라는 생각이 언제나 들었다.
 - 딱 명쾌한 답을 얻지는 못했다. 그래도 계속 생각에 생각을 하다보니 내가 혼자 만드는 범위에서는 어디서 어떻게 데이터를 사용하고 만들어야 할지 알 수 있었다.
 - 오늘부터 Oracle로 DBMS를 배우기 시작했는데, 배우는 시간이 길지 않으니 집중해서 배워보자.
 - 가장 기본적인 SQL문법을 배웠는데 써 놓고 보니 정보처리기사 자격증에 아주 그대로 나오는 부분이어서 다행?이었다.
 - 당장 DBMS를 잘 다루면 좋겠지만, 그것보다는 최소한 기본적인 명령어와 개념이 무엇인지에 집중하고, 앞으로 해나갈 프로젝트에서 사용할 수 있는 수준까지는 익숙해지도록 하자.


##### 
 - 진짜 mac과 window에서 oracle 설치부터 엄청나게 차이가 나서 설정하느라 좀 힘들긴 했다.
 - 그래도 나름 오류는 다 잡은 듯 하니 다른 컴퓨터에서도 잘 되는지 확인해보자.


<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
