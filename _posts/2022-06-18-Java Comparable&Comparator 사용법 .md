---
title:  "[Java] java.lang.Comparable / java.util.Comparator 사용법" 

categories:
  - Java
tags:
  - [Java, Algorithm]

toc: true
toc_sticky: true

date: 2022-06-17
last_modified_at: 2022-06-17
---

# 내가 이해한 Comparable & Comparator 의 동작 방식

1. Comparable 은 객체 자신의 정렬기준을 사용함. 그래서 인자를 1개만 받는다. (ex. Object.Sort(Object);)
2. Comparator 은 정렬기준만 있는 객체를 생성해서 사용함. 그래서 인자를 2개 받는다. (ex. Array.Sort(Object, Object);)
 - 두 방식 모두 사용자가 직접 정렬 방식을 만들 수 있지만, Comparable은 interface를 상속해서 구현해야하고
 - Comparator는 정렬기준 객체는 만들어서 넣어준다.
3. 두 방식 모두 정렬을 할때 객체를 반대로 넣어서 비교를 하기 때문에 이것을 알고 쓰는 것과 모르고 쓰는 것은 차이가 있을 것 같아서 확실이 알아두려고 정리.
4. 그리고 직접 구현한 비교 부분의 return 값으로는 -1, 0, 1 이 가능하고 -1을 return 할때 두 값을 서로 바꿔주고 0과 1일때는 값을 그대로 둔다.


[출처](https://codevang.tistory.com/288){:target="_blank"}  

# java.lang.Comparable / java.util.Comparator 사용법

## [ java.lang.Comparable ]
- 객체 자신이 가지고 있는 자신의 정렬 기준을 정의하는 인터페이스
- Arrays.sort() 및 Collection.sort() 메소드의 기준으로 적용

- Comparable은 직접 클래스를 만들 때 해당 클래스 객체의 정렬 기준을 미리 설정해 두기 위해 구현하는 인터페이스입니다. 
- 래퍼 클래스나 String과 같이 자바에서 정렬이 가능한 타입들은 모두 Comparable을 구현하고 있습니다. 내부적인 정렬 기준을 이미 가지고 있다는 의미입니다.

* 내부적인 Comparable 구현 정렬 기준
  - 숫자 : 오름차순
  - 문자 : 사전순

- 이미 구현이 완료된 기본 클래스들은 이미 Comparable 인터페이스를 구현해서 정렬 기준을 정해뒀고, 우리가 코드를 수정할 수 없습니다. 
- 따라서 Comparable 인터페이스를 구현해 정렬 기준을 부여할 수 있는 것은 직접 만드는 클래스 객체입니다.

- 반면에 Comparator 인터페이스는 정렬 기준만 가진 객체를 구현하는 인터페이스입니다. 
- sort() 메소드에 이 정렬 기준을 부여해주면 Comparable로 구현된 디폴트 기준을 무시하고 Comparator의 정렬 기준으로 정렬시켜줍니다.
- 따라서 보통 코드 수정이 불가한 기본 객체들을 디폴트와 다른 기준으로 정렬하기 위해 사용됩니다.

- 또한 Comparator 객체를 이용한 정렬은 일반 배열, 컬렉션 리스트에서 모두 사용이 가능하지만, Comparable 인터페이스를 구현한 객체는 일반 배열에서만 적용됩니다. 

 

## [ Comparable 인터페이스 구현 ]

  - 정렬이 필요한 객체(클래스)를 작성할 때 Comparable 인터페이스를 구현한 뒤 정렬 기준을 정하는 compareTo() 메소드를 오버라이딩해주면 됩니다.
  - 같은 객체 타입 하나를 받아서 비교해주면 되는데, int 타입으로 비교 결과를 리턴해주면 됩니다.

### int compareTo() 메소드 리턴값
  - 음수일경우 : 두 요소의 위치를 바꿈
  - 양수일 경우 : 두 요소의 위치를 그대로 둠

  - 인터넷에 보면 대부분 양수(1)일 때 위치 변경이 되고 0이나 음수(-1)일 경우 그대로 둔다고 돼있는 것 같습니다. 
  - 하지만 사실은 반대입니다. -1이 리턴될 때 바꿔줍니다. 
  - 많은 사람들이 1일 때 바꿔준다고 생각하는 이유는 비교대상으로 들어오는 객체의 순서가 반대로 되어 있기 때문입니다.

  - 배열끼리의 정렬 등으로 조금 더 응용하기 위해서는 이 개념을 잘 이해해야할 것 같습니다. 
  - 일단 예를 들어 아래와 같은 코드는 대표적인 객체 내림차순 정렬의 코드입니다. 
  - 요소 배열을 { 1, 5 } 두개로 넣어뒀습니다.
  - 대부분 이 코드의 해석을 1이 비교대상 5보다 작으면(this.a < o.a) 위치를 바꿔라(return 1), 그렇지 않으면 그대로 둬라(return -1)로 알고 있는 것 같습니다. 

 

실제로 결과를 보면 내림차순이 잘 되긴 합니다. 

```java
import java.util.Arrays;
import java.util.Comparator;

public class Combination {
	public static void main(String[] ar) {

		testComparable test1 = new testComparable(1);
		testComparable test2 = new testComparable(5);
		testComparable[] arr = new testComparable[] { test1, test2 };

		System.out.print("정렬 전 : ");
		for (int i = 0; i < arr.length; i++) {
			System.out.print(arr[i].getA() + " ");
		}

		Arrays.sort(arr);

		System.out.print("\n정렬 후 : ");
		for (int i = 0; i < arr.length; i++) {
			System.out.print(arr[i].getA() + " ");
		}

	}
}

class testComparable implements Comparable<testComparable> {

	private int a;

	public testComparable(int a) {
		super();
		this.a = a;
	}

	@Override
	public int compareTo(testComparable o) {

		if (this.a < o.a) {
			System.out.println("\n리턴값 : 1");
			return 1;
		}

		System.out.println("\n리턴값  : -1");
		return -1;
	}

	public int getA() {
		return a;
	}
}
 ```

- 하지만 디버깅을 해보거나 println()을 리턴마다 찍어보면 위 코드에서 정렬 시 리턴되는 값은 -1 입니다. 즉, -1이 리턴될 때 요소의 위치가 서로 바뀐다는 것입니다.
- 디버깅을 한번 해보면 sort() 메소드가 두 요소를 비교할 때 아래와 같이 compareTo() 메소드를 실행하는 것을 볼 수 있습니다. 

- 현재 배열 { 1, 5 }를 정렬하는데 비교 대상인 compareTo()의 매개변수가 1이 들어왔습니다. "1과 5를 비교하면 5를 기준으로 1을 비교한다" 라는 것입니다. 이 순서가 보이는 것과 반대이니 - 리턴값을 반대로(1이 바꾸고 -1이 바꾸지 않는다) 이해해도 역의 역이 성립해 참이 되는 것입니다.
 
- 일반적인 배열의 경우 위와 같이 반대로 이해해도 전혀 사용 상 문제는 없습니다. 직관적으로 사용하기도 훨씬 편하기도 합니다. 
- 하지만 단순한 정렬이 아니라 특정 조건에 한해 변경시킬 경우 문제가 될 수 있습니다. 
- "if문의 조건이 참일 때 요소의 위치를 바꾸겠다" 라고 생각하고 if문 안에 리턴값을 1로 줬을 경우 요소 위치가 바뀌지 않기 때문이죠. 
- 따라서 이 개념을 잘 이해하고 있어야 응용이 가능할 것 같습니다. 
- Comparable의 구현이 완료됐다면 Arrays.sort() 메소드를 사용해주면 됩니다. 퀵정렬, 병합정렬 등 NlogN의 시간복잡도를 가진 알고리즘을 사용합니다.

## [ Comparator 인터페이스 구현 ]
## [ java.util.Comparator ]
- Arrays.sort() 및 Collection.sort() 메소드의 기준으로 삽입해주는 정렬 기준을 가진 인터페이스

- 위에서 설명했듯이 정렬 기준 자체만을 가진 객체를 만들어줍니다. 
- 먼저 위의 예시 코드를 그대로 사용해 Comparator로 정렬 기준을 바꿔보겠습니다. 정렬 기준만 1회용으로 사용하기 위해 보통 익명 클래스로 작성하는 경우가 많습니다.

* int compare(o1, o2) 리턴값

  - 리턴값의 의미는 Comparable과 동일

- 이것도 헷갈리게 매개변수가 반대로 들어옵니다. { 1, 5 } 를 비교한다면 "o1 = 5", "o2 = 1"로 매개변수가 들어옵니다. 
- 그래서 위에서 얘기했던 Comparable과 동일하게 서로 반대로 생각해도 오름차순, 내림차순이 잘 적용됩니다.
- 이 역시 반대로 이해하고 있어도 단순 정렬을 하는데 문제는 전혀 없지만 좀 더 복잡한 조건에서 요소 위치를 바꿔주기 위해서는 이해를 하고 있어야할 내용입니다. 
- 중요한 건 "매개변수는 직관적인 순서와 반대로 들어오며, 리턴 또한 음수일 때 요소 위치를 바꿔준다" 라는 것을 알고 있는 것입니다. 
-그리고 Comparable 인터페이스가 구현된 객체라도 Comparator 객체를 매개변수로 주면 Comparator의 기준이 적용됩니다. 

```java
package pojoPrj;

import java.util.Arrays;
import java.util.Comparator;

public class Combination {
	public static void main(String[] ar) {

		testComparable test1 = new testComparable(1);
		testComparable test2 = new testComparable(5);
		testComparable[] arr = new testComparable[] { test1, test2 };

		System.out.print("정렬 전 : ");
		for (int i = 0; i < arr.length; i++) {
			System.out.print(arr[i].getA() + " ");
		}

		class Sort implements Comparator<testComparable> {

			@Override
			public int compare(testComparable o1, testComparable o2) {

				if (o1.getA() < o2.getA()) {
					System.out.println("\n리턴 : 1");
					return 1;
				}
				System.out.println("\n리턴 : -1");
				return -1;
			}
		}

		Arrays.sort(arr, new Sort());

		System.out.print("\n정렬 후 : ");
		for (int i = 0; i < arr.length; i++) {
			System.out.print(arr[i].getA() + " ");
		}

	}
}

class testComparable implements Comparable<testComparable> {

	private int a;

	public testComparable(int a) {
		super();
		this.a = a;
	}

	@Override
	public int compareTo(testComparable o) {

		if (this.a < o.a) {
			System.out.println("\n리턴값 : 1");
			return 1;
		}

		System.out.println("\n리턴값  : -1");
		return -1;
	}

	public int getA() {
		return a;
	}
}

- 익명 클래스를 사용하면 위 코드를 조금 더 간략하게 바꿀 수 있는데 크게 차이는 없을 것 같고 정말 간단하게 바꾸려면 람다식으로 바꾸는것이 나을 듯합니다.

- [JAVA/- 기본 문법] - 람다식(Lamdba Expressions)

 ```java
		Comparator<testComparable> comp = (o1, o2) -> {
			if(o1.getA() < o2.getA()) {
				return 1;
			}
			return -1;
		};
		
		Arrays.sort(arr, comp);
 ```

- 아예 별도 명시적인 객체 생성 없이 sort()의 매개변수 안에서 람다식으로 써도 됩니다.

```java
		Arrays.sort(arr, (o1, o2) -> {

			if (o1.getA() < o2.getA()) {
				return 1;
			}
			return -1;

		});
```
<br>

<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
