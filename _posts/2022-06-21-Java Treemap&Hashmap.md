---
title:  "[Java] TreeMap & HashMap" 

categories:
  - Java
tags:
  - [Java, Algorithm]

toc: true
toc_sticky: true

date: 2022-06-21
last_modified_at: 2022-06-21
---



# TreeMap 과 HashMap 의 차이.
- Java는 다양한 자료구조를 지원해준다. 리스트, 스택, 큐, 맵 등등 필요한 자료구조를 사용하면 된다.
- 내가 혼자 코딩할때는 Map을 사용해야 할 때 HashMap을 사용했는데, 학원에서 배울때는 TreeMap을 사용했다.
- 원래 알기로는 Map을 사용하는 이유는 중복되지 않는 key를 통한 빠른 접근을 위해서라고 알고 있었고, 
- 요소를 하나씩 모두 접근하는 것은 가능하나 정렬은 안된다고 알고 있었다.
- 근데 TreeMap은 key값을 이용해서 정렬하는 것이 가능하다. 이유는 구조가 이름 그대로 이진트리로 되어있기 때문이었다.

## TreeMap
### 특징
1. 구조가 이진 트리 구조로 되어있기 때문에 key 정렬이 가능하다.
2. key 중복이 불가능하다.
3. 이진 트리 구조라서 기본적으로 검색이나 추가, 삭제가 빠르다. 시간복잡도는 O(logN).
![Red-black_tree_example svg](https://user-images.githubusercontent.com/25880465/174699793-3200bc27-5031-4cec-b8fe-c694533458be.png)




## HashMap
### 특징
1. 해시 알고리즘을 사용하여 검색속도가 매우 빠르다. 자바 문서에 따르면 시간복잡도는 O(1).
2. Map의 특성인 key가 중복이 안된다.
3. 정렬되지 않고, 순서를 보장하지 않는다.
![hashmap](https://user-images.githubusercontent.com/25880465/174699595-d619f362-7db4-4d67-9131-4c1769a84dd5.png)



## 정리
- 내가 지금 만드는 수준에서는 사실 TreeMap이나 HashMap이나 그게 그거다.
- 다만 TreeMap은 요소를 찾을 때 아무리 빠르게 찾아도 결국 검색방식을 이용하기 때문에 HashMap보다 느릴 수 밖에 없다.
- 개인적으로는 TreeMap이 훨씬 사용성은 좋다고 생각한다. 결국 자료구조를 사용할때는 요소를 하나씩 사용해야하는데 정렬이 되어 있으면 편의성이 증가한다고 생각해서이다.
- HashMap도 LinkedHashMap이 있기 때문에 입력 순서를 보장받거나 정렬을 하고 싶다면 다른 자료구조를 사용하면 된다.


<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
