---
title:  "[Java] Java에서의 remove 동작" 

categories:
  - Java
tags:
  - [Java, Algorithm]

toc: true
toc_sticky: true

date: 2022-06-17
last_modified_at: 2022-06-17
---


# 자바에서의 remove 동작
- C언어에서는 변수나 객체의 할당 후 메모리 삭제까지도 직접 delete나 free 해줘야 했는데 자바는 가비지 컬렉터가 자동으로 해준다고 알고 있었다.
- 자바를 제대로 배우면서 new를 계속 쓰는데 해제하는 구분은 없었다.
- 변수는 0으로 초기화를 하는 방식으로 지우는 개념이 가능했는데 객체를 사용하면서는 해당 값을 remove해주어서 삭제를 한다.
- 다만 remove를 한다고 delete나 free 처럼 메모리를 지우는 개념이 아니라 해당 메모리를 가리키는 것을 삭제해준다고 보면 된다.
- 이렇게 하면 해당 메모리는 쓰레기 값이 되고, 이걸 가비지 컬렉터가 삭제해준다. 라고 알고 있다.


# 예시

```java
private ArrayList<ScoreVO> lists = new ArrayList<>();

public void deleteName() {
		System.out.println("입력????");
		String name = sc.next();
		Iterator<ScoreVO> it = lists. iterator();
		while(it.hasNext()) {
			ScoreVO vo = it.next();
			if(name.equals(vo.getName())) {       
				lists.remove(vo);                   // 1번
				System.out.println(vo.getName());   // 2번
        //break;
			}
			System.out.println("해위");           // 3번
		}
	} //4번
```


- if문으로 검사해서 이름이 같다면 1번이 실행되어서 lists에서 해당 객체를 삭제한다.
- *중요* 1번이 remove이기 때문에 보통이라면 삭제되었다고 생각하지만 실제로는 아직 삭제 되지 않았다.
- 1번 줄이 실행되기 전에는 해당 데이터를 참조하고 있는 변수는 총 3개이다. lists, vo, it
- 1번 줄이 실행되었기 때문에 lists의 참조는 지워졌지만 아직 vo와 it이 참조하고 있기 때문이다.
- 실제로 1번에서 데이터가 지워졌다면 2번은 실행되지 않거나 에러가 나야한다. 하지만 실제로 실행해보면 잘 실행된다.
- 그래서 이 코드로 삭제를 하면 1번이 실행된 후에 에러가 나게 된다.
- 이유는 it으로 반복을 돌고 있을때는 it.remove()로 삭제를 해야 it의 내부 index가 이동을 해서 삭제를 판단하고 다음 데이터로 이동할 수 있는데
- lists.remove(vo) 로 삭제했기 때문에 it의 내부 index가 이동하지 않아서 it은 lists.remove(vo)로 삭제한 부분을 가리키고 있기 때문이다.
- 이걸 방지하려면 iterator로 반복문을 돌때는 it.remove()를 해야 안전하다.
- 다만 삭제하는 메서드라서 2번 위치에 break문을 쓰면 정상적으로 돌아간다.
- 1번이 실행되고 실제로 참조가 모두 사라져서 쓰레기 값이 되는 순간은 while문을 모두 돌고 빠져나오는 순간이다. 물론 그 전에 오류가 난다.




![설명1](https://user-images.githubusercontent.com/25880465/174220519-7afe06f9-5af3-481a-8c82-ce18deb6de05.png)
- 기본 상태




![설명2](https://user-images.githubusercontent.com/25880465/174221179-1a228fb9-a630-4359-9274-314631a62de8.png)
- 1번 실행




![설명3](https://user-images.githubusercontent.com/25880465/174221181-a9929f20-1728-4ebc-9c43-48162f30bbe5.png)
- 3번 실행




![설명4](https://user-images.githubusercontent.com/25880465/174221183-ecfb84ce-8cd5-4a15-bb35-21951884bf8c.png)
- 4번 실행




- 4번까지 실행되면 더 이상 참조가 없기 때문에 가비지 컬렉터가 수집 후 자동으로 해제해준다.


<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
