---
title:  "[docker] docker->oracle: 사용중인 컨테이너 포트변경법" 

categories:
  - docker
tags:
  - [docker, Oracle]

toc: true
toc_sticky: true

date: 2022-07-23
last_modified_at: 2022-07-23
---


# 해결법
## Mac에서 오라클과 톰캣 port 충돌시 해결법(오라클에 넣은 table 데이터가 필요하거나, 이미 컨테이너를 생성했을 시)
1. 만약 오라클에 데이터가 없거나 컨테이너를 새로 생성해도 된다면 그냥 생성할때 port번호를 바꿔서 생성하면 된다.
2. 더 간단한 해결법은 톰캣 port를 바꾸면 된다. (이게 제일 쉽긴하다.) [방법](https://fjdkslvn.tistory.com/92){:target="_blank"}  
3. 톰캣은 1도 변경하지 않고 오라클만 바꿔보자.
 - (오라클이 실행 중이라면) 터미널에서 docker ps
 - 그럼 맨 끝에 NAMES가 보인다(실행 중이여야 보인다.)
 - docker commit 컨테이너NAMES 이미지네임 (docker commit my_oracle img_oracle)
 - 그럼 이미지가 생성된다.
 - docker run -it --name my_oracle2 -p 8081:8080 -p 1521:1521  img_oracle
 - 이렇게 하면 새로 컨테이너가 생성되고 데이터도 그대로 들고 온다.
 - 다만 이 방법은 오라클 포트를 변경한 것은 아니고 외부와 오라클 연결시 8081을 사용하고 그걸 오라클은 8080으로 사용해라, 라고 바인딩 시켜준거다.

# 터미널에서 도커로 오라클 접속방법(sqlplus)
 - docker exec -it 컨테이너이름 sqlplus





#### docker ps(테스트 해보느라 NAMES가 아래와 다른데 적힌대로 쓰면 된다.)
<img width="966" alt="1" src="https://user-images.githubusercontent.com/25880465/180595535-441cefb7-d0c1-49cc-a300-8477534bfd1f.png">

#### docker commit my_oracle img_oracle
<img width="630" alt="2" src="https://user-images.githubusercontent.com/25880465/180595465-965cb73a-142c-426c-9ebd-541d76806730.png">

#### docker run -it --name my_oracle2 -p 8081:8080 -p 1521:1521  img_oracle
<img width="658" alt="3" src="https://user-images.githubusercontent.com/25880465/180595464-ca418077-ca89-448e-b3e5-483a328762ea.png">


# 내가 겪은 상황
##

# docker
 - docker라고 좋은 게 나왔다고 예전에 들었던 것 같다.
 - 그냥 약간 vm웨어나 jvm같은 느낌이겠지 라고 한번 생각하고 넘어갔다.

# Mac에서 오라클을 사용해야했다.
 - 국비 웹개발자 강의를 들으면서 오라클을 배웠다.
 - 학원에도 데스크탑이 있고 집에도 있어서 사실 꼭 Mac에 오라클을 깔지는 않아도 됐다.
 - 다만 시도했으면, 불가능하지 않으면, 성공시키고 싶다는 마음이 크기에..

# Mac에 오라클 설치
 - 구글에 "mac에 오라클 설치" 검색하면 oracle은 window, linux만 지원해서 docker를 사용하라고 한다.
 - 그리고 다른 분들이 설명을 너무 잘 해놓았기에 딱히 크게 문제 될건 없었다.
 - 다만 몇몇이 헷갈렸는데 처음에 이미지를 설치하고 컨테이너로 생성하면 된다는 개념이 사실 이해 안갔다.
 - 이미지는 class, 컨테이너는 new로 생성한 instance라고 생각하면 쉽다.
 - 난 아래 주소를 참고했다.
[오라클설치](https://eunoia3jy.tistory.com/87){:target="_blank"}  

# docker에서 오라클 사용 시 발생한 문제
 - 아마 위 링크를 보면 사실 사용에 크게 문제는 없다.
 - 근데 난 사용하다가 문제가 생겼다. 이제 웹을 배워야해서 톰캣을 설치 했는데 톰캣과 오라클이 사용하는 port가 8080으로 동일 한 것이었다.
 - 학원에서는 윈도우를 사용해서 그냥 oracle에서 포트 변경만 하면 됐다. 변경 딱 5초 걸린다.

## Mac에서 오라클 포트 번호 변경
 - 학원에서 배운대로 docker에서 맥을 실행해서 
 - SELECT DBMS_XDB.GETHTTPPORT() FROM DUAL; // 현재 포트 확인
 - EXEC DBMS_XDB.SETHTTPPORT(원하는 포트번호);  // 포트 번호 변경
 - 확인 하면 잘 변경했다고 나온다.

## 그래도 충돌이 난다.
 - 분명히 오라클에서 변경했고, 잘 변경됐다고 나오는데도 충돌이 났다.
 - 이유는 docker에서 오라클을 사용하기 때문이었다. 도커를 사용해서 어떤 프로그램을 사용하던지 조심해야할 것 같다.
 - 외부접속 (port1) 도커 (port2) 프로그램(오라클)
 - 설명하자면 도커에서 오라클을 사용하면 도커와 외부접속 사이에 port1이 있고
 - 도커와 프로그램(오라클) 사이에 port2가 있었다.

## 해결하자~
 - 난 port2만 바꿔놓고 계속 오류가 난다고 징징거렸던 것이다.
 - 그래서 열심히 검색해서 port1을 바꾸는 법을 검색했다.
 - 아직 우리나라는 docker를 많이 사용안해서 그런지 검색결과가 많지는 않았다.
 - 처음에는 방법을 찾지 못해서 톰캣번호를 만들거나 새로 컨테이너를 생성해서 하는 방법등을 사용했다.
 - 근데 한번쯤은 알아두면 좋을 것 같아서 결국 해결했다.
 - 사용하던 컨테이너를 이미지로 만들고, 그 이미지로 컨테이너를 생성할때 포트번호를 변경하면 됐다.








<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
