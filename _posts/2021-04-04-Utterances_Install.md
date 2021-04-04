---
title:  "[Github Pages] Utterances로 댓글기능 추가" 

categories:
  - Blog Dev
tags:
  - [Blog, Github Pages, Jekyll]

toc: true
toc_sticky: true

date: 2021-04-04
last_modified_at: 2021-04-04
---

# 블로그에 댓글 기능을 만들자.
minimal-mistakes에 config.yml의 comments-provider를 보면  
"# false (default), "disqus", "discourse", "facebook", "staticman", "staticman_v2", "utterances", "custom" " 이렇게 많은 댓글기능 적용 방법이 있다.  
대표적으로 disqus가 있는데 구글 검색을 해보니 disqus가 무겁고 광고가 나온다는 얘기가 많아서 대안으로 추천되는 utterances를 적용하기로 했다.  

# 설치 방법
## Utterances설치
<a href="https://github.com/apps/utterances" target="_blank"></a>
(https://github.com/apps/utterances). << 이 링크를 통해서 설치하면 된다.  
링크를 누르면 나오는 install을 누르면 아래 화면들이 나온다.
<span style="color: red;">빨간색 네모로 칠해진 부분만 작성하면 된다.</span>




![utt-2](https://user-images.githubusercontent.com/25880465/113497411-d93b8680-953e-11eb-803e-915ffea4abc8.PNG)  
Select repositories를 눌러서 댓글이 달리면 issue가 생성될 repository를 고르면 된다. 보통 github계정/xxxComments 이렇게 하기도 하는데 나는 github pages repo에서 모든 걸 처리하고 싶어서 내 페이지인 github.io를 선택했다.  




![utt-3](https://user-images.githubusercontent.com/25880465/113497403-caed6a80-953e-11eb-9866-328d26781ae1.PNG)  
조금 내려서 Repository의 repo부분에는 바로 위에서 선택한 repo를 넣어주면 된다. 나의 경우는 Prosleeper/Prosleeper.github.io  




![utt-4](https://user-images.githubusercontent.com/25880465/113497405-ce80f180-953e-11eb-8a26-98c908043c1c.PNG)  
Blog Post - Issue Mapping 이라고 있는데 구글 검색하면 나온다. 간단하게 설명하면 issue에 댓글들이 나올텐데 그걸 어떤 키워드로 적용해서 보여주는지 선택한다. 딱히 중요하지 않다고 생각되어서 pathname(default)으로 설정  
Theme 는 본인이 하고 싶은 걸로 하면 된다.  




![utt-5](https://user-images.githubusercontent.com/25880465/113497408-d476d280-953e-11eb-868a-2c13376f0a7a.PNG)  
이건 원래라면 블로그를 작성하는 post에 넣어야 한다는데 minimal-mistakes는 이걸 안해도 된다고 한다.  
대신 아래 config.yml을 작성해줘야 함.  




![utt-6](https://user-images.githubusercontent.com/25880465/113497608-b316e600-9540-11eb-96fb-dd7b1170a690.PNG)  
<span style="color: red;">빨간색 네모로 칠해진 부분 수정</span>  
※ repository에는 설치시 repo에 넣어준 것과 동일하게 작성  
※ provider는 "utterances"  
※ theme는 선택한 테마  
※ issue_term은 위에서 Blog Post - Issue Mapping에서 선택한 방법 작성. 나는 pathname(default)  


제대로 다 설치 했다고 생각했는데 문제가 발생했다.(파란 동그라미 부분)

## 문제
![Screenshot_20210404-123118_Chrome](https://user-images.githubusercontent.com/25880465/113497810-44d32300-9542-11eb-856a-6599845a87fd.jpg)
![Screenshot_20210404-123142_Chrome](https://user-images.githubusercontent.com/25880465/113497812-4d2b5e00-9542-11eb-82a6-d66cfb5c2f77.jpg)  

난 제대로 다 설치 했다고 생각했는데 commit 후 적용된 상태를 보니 제대로 안됐다. Sign in with Github 버튼을 누르면 File not found 에러가 떠서 확인해보니 URL부분과 index.html 파일이 잘못됐다고 하는데  
index.html 파일에는 딱히 적힌 것이 없어서 config.yml의 url부분을 살펴보면서 혹시나 해서 적혀 있지 않던 http://를 앞에 추가해주니 제대로 작동이 됐다.

그리고 _sass폴더의 _pages에 아래 코드를 맨 아래 추가해서 현재 내 post가 wide로 되어있는데 댓글창도 동일한 크기로 보여지도록 설정했다.

```html
.utterances {
  max-width: 100% !important;
}
```

<br>

<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->