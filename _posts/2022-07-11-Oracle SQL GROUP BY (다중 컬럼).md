---
title:  "[SQL] Oracle SQL GROUP BY (다중 컬럼)" 

categories:
  - DataBase
tags:
  - [DataBase, Oracle]

toc: true
toc_sticky: true

date: 2022-07-11
last_modified_at: 2022-07-11
---

# 처음 배우는 데이터베이스
국비교육에서 현재 Oracle로 데이터베이스와 SQL을 배우고 있다.
데이터베이스나 SQL을 제대로 배워 본적이 없었다.
이건 거의 노베이스에서 시작했어서 빠른 진도에 약간 버거운 감이 있었고
특히 수업이 끝나고 내주는 문제들이 점점 어려워져서 
내가 원하는 답을 얻기 힘들어질 때가 많아져갔다.
그 중에서도 GROUP BY 가 이해가 잘 안가서 따로 정리해봤다.
<br>
<br>


# GROUP BY
## 결과 값을 원하는 열로 묶어서 출력해주는 GROUP BY
- 책에서 GROUP BY 가 처음 나올때 설명해주는 부분이다.
- 처음에는 중복되는 데이터들을 모아주는 용도로만 쓴다고 생각하고 넘어갔는데
- 쓰다보니까 개념 정리를 해두지 않으면 나중에 아예 안쓰게 되거나 너무 남발을 하거나 둘 중 하나가 될것 같았다.
<br>
<br>

### EMP 테이블의 기본 출력
- 현재 EMP 테이블의 기본 출력이다.
- SELECT * FROM EMP;
<br>
<br>
- 그림1

![DEFAULT](https://user-images.githubusercontent.com/25880465/178185935-f4e48634-d24f-4a75-bc26-31b107f57170.png){: width="70%" height="70%"0}{: .left}
<br>
<br>

### GROUP BY (COLUMN1)
- GROUP BY 뒤에 하나의 열만 작성.
- JOB 열을 기준으로 중복되는 값을들 모두 묶어서 출력해준다.
- 사실 여기까지는 크게 이해가 안되는 부분은 없었다.
- SELECT JOB FROM EMP GROUP BY JOB;
<br>
<br>

- 그림2
![COL1](https://user-images.githubusercontent.com/25880465/178185930-1fce3835-a3ab-4faa-80b8-87f76c36aea6.png){: width="70%" height="70%"0}{: .left}
<br>
<br>


### GROUP BY (COLUMN1, COLUMN2)
- GROUP BY 뒤에 두개의 열 작성.
- 이때부터 점점 헷갈리기 시작한다.
- 분명히 GROUP BY는 중복되는 값들을 묶어준다고 생각해서 사용하는 것인데
- 열을 나열하면 할 수록 점점 출력되는 행이 커져갔다.
- 그래서 GROUP BY 를 사용해서 SQL문제를 풀거나 할때마다 이해를 해서 푼다기보다는 실행결과를 보고 때려 맞추는 식으로 하게 됐었다.
- SELECT JOB, DEPTNO FROM EMP GROUP BY JOB, DEPTNO;
<br>
<br>
- 그림3

![COL2](https://user-images.githubusercontent.com/25880465/178185932-93a3afe7-a4f8-4259-8728-b94f6c9b5724.png){: width="70%" height="70%"0}{: .left}

<br>
<br>

### GROUP BY (COLUMN1, COLUMN2, COLUMN3)
- GROUP BY 뒤에 세개의 열 작성.
- 3개 이상 되는 열을 나열했을 때부터는 이해라는 것은 없었고 어떻게든 결과가 나오길 바라면서 이거저거 수정하면서 문제를 풀게 됐었다.
- 결국 이 GROUP BY 로는 더 진행을 못하겠다고 생각해서 이해부터 하자고 결론 내렸다.
- SELECT JOB, DEPTNO, SAL FROM EMP GROUP BY JOB, DEPTNO, SAL;
<br>
<br>
- 3개의 열

- 그림4
![COL333](https://user-images.githubusercontent.com/25880465/178187097-8f9bf1e0-68b6-4d3d-b6e0-918024bb303a.png){: width="70%" height="70%"0}{: .left}
<br>
<br>

### GROUP BY (COLUMN1, COLUMN2, COLUMN3, COLUMN4)
- 4개의 열
- 그림5
- SELECT JOB, DEPTNO, SAL, ENAME FROM EMP GROUP BY JOB, DEPTNO, SAL, ENAME;
![COL4](https://user-images.githubusercontent.com/25880465/178185934-bb0b9b2f-9b3d-423f-81fc-db9e4852b5e6.png){: width="70%" height="70%"0}{: .left}

<br>
<br>


### GROUP BY 를 사용할 때 생각해야될 것
- 하나의 열만 GROUP BY 로 쓸때는 별 생각할 것이 없다. 그냥 작성한 열의 중복값을 모두 모아서 출력해주는 것이 끝이다.
- 두개 이상의 GROUP BY 부터는 기준을 생각해야했다. 만약 GROUP BY (COLUMN1, COLUMN2) 이런 문장이라면 COLUMN1을 기준으로 COLUMN2를 그룹화 해준 다는 것이다.
- 위의 (SELECT JOB FROM EMP GROUP BY JOB;) 일때 출력과 (SELECT JOB, DEPTNO FROM EMP GROUP BY JOB, DEPTNO;) 의 결과를 비교해보면 알 수 있다.
- GROUP BY (COLUMN1, COLUMN2) 라는 코드를 실행했다면 먼저 GROUP BY (COLUMN1)을 실행한다. (아래 1번)
- 그 후 JOB을 기준으로 GROUP BY (COLUMN2) 를 실행한다. 이때는 JOB의 행 5개가 각각 가지고 있던 DEPTNO를 모두 표현해야 하기 때문에 5개에서 9개로 출력 데이터가 많아진다.
- 왜 그렇게 되는 지는 1번에서 2번으로 이어지는 선으로 표현해놓았다. 그리고 마지막으로 3번이 표현 되게 된다.
![그림설명](https://user-images.githubusercontent.com/25880465/178223196-59d7b67e-7b49-410a-b3ec-6926259c8fbf.png){: width="70%" height="70%"0}{: .left}


<br>
<br>

### 마무리
- 이렇듯 GROUP BY 는 하나의 열을 기준으로 하기에는 좋지만 여러개의 열을 기준으로 할 수록 GROUP BY 효과는 낮아지기 때문에 조금은 신중하게 사용할 필요가 있다.
- 특히 머리속으로는 잘 모아질 것 같았던 열들이 GROUP BY를 계속 쓰다보면 SELECT * FROM EMP; 와 별반 다르지 않게 되기 때문에 더 조심히 쓰자.


<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
