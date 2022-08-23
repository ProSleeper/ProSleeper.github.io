---
title:  "[JavaScript] jQuery에서 find와 children의 차이" 

categories:
  - JavaScript
tags:
  - [JavaScript, Selector]

toc: true
toc_sticky: true

date: 2022-08-23
last_modified_at: 2022-08-23
---

# JAVASCRIPT를 사용하다보면 jQuery를 많이 사용하게 된다.
 - 그때마다 헷갈리는 것들이 어떤 메서드가 어떤 자식이나 부모를 찾아오는 지 몰라서 매번 검색하게 된다.
 - 그래서 검색도 좋지만 이렇게 한번씩 간단간단하게 정리 해보자.


## .find()와 .children()의 차이
 - 둘다 하위 자식을 찾는 함수는 맞지만
 - find는 자식의 자식의 자식. 즉 모든 하위 노드들을 탐색해서 찾아주고
 - children은 바로 아래 자식 노드들 중에서만 찾는다.
 - depth로 얘기하자면 children은 무조건 depth 1 까지만 찾고
 - find는 depth가 더 이상 존재하지 않을 때까지 들어가서 찾는다.

## 예상 사용방법
 - 이렇게 보면 find가 더 넓은 범위를 찾으니까 더 좋아보이긴 하지만 그만큼 찾는 범위가 넓으니 성능에는 좋지 않을 것 같다.
 - 모든 depth에서 찾아야 할때는 find를 쓰고 바로 아래만 필요할때는 children을 사용하자.

<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
