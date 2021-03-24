---
title:  "C++ 비트연산자" 

categories:
  - Cpp
tags:
  - [Cpp]

toc: true
toc_sticky: true

date: 2021-03-23
last_modified_at: 2021-03-23
---
https://boycoding.tistory.com/163 소년코딩님의 자료를 참고했습니다.

<br>

03.07 - 비트 단위 연산자 (Bitwise operators)
비트 단위(bitwise) 연산자는 사용하기 어렵고 까다롭다. 비트 단위 연산자는 변수 내의 비트(bit)를 조작한다.

과거에 메모리는 매우 비싸서 컴퓨터는 메모리를 많이 가지고 있지 못했다. 그러므로 사용 가능한 메모리를 모두 사용하려고 하는 시도가 있었다. bool 자료형을 생각해보자. true와 false는 1비트 하나만 사용하지만 1바이트(8비트)나 차지한다. 메모리의 가장 작은 메모리 단위는 1바이트 이기 때문인데, 이는 1비트를 사용하고 7비트를 낭비하게 된다.

bitwise 연산자를 사용하면 8개 bool 값을 한 개의 1바이트 bool 변수에 압축하여 넣을 수 있으므로 메모리를 절약할 수 있다.

오늘날에는 하드웨어 발달로 유지 보수가 쉬운 코드를 코딩하는 것이 더 좋은 아이디어다. bitwise 연산자는 최적화가 필요한 특정 상황을 제외하고는 잘 쓰이지 않는다. (Ex. 방대한 데1이터를 사용하는 프로그램, 속도를 위해 비트 연산이 필요한 게임, 내장 메모리가 작은 하드웨어)

C++ 에는 6가지의 비트 단위(bitwise) 연산자가 있다.

Operator	Symbol	Form	Operation
left shift	<<	x << y	all bits in x shifted left y bits
right shift	>>	x >> y	all bits in x shifted right y bits
bitwise NOT	~	~x	all bits in x flipped
bitwise AND	&	x & y	each bit in x AND each bit in y
bitwise OR	l	x l y	each bit in x OR each bit in y
bitwise XOR	^	x ^ y	each bit in x XOR each bit in y
C++에서 비트 조작은 기호 있는(signed) 정수에서 적용 방식을 보장하지 않으므로 비트 단위 연산자는 부호 없는(unsigned) 정수 자료형을 사용해야 한다.

Bitwise left shift (<<) and bitwise right shift (>>) operators
편의와 이해를 돕기 위해서 앞으로 4bit binary를 사용할 것이다. C++에서 사용되는 비트 수는 자료형(byte당 8bit)의 크기에 따라 달라진다.

왼쪽 시프트 연산자(<<)는 각 비트를 왼쪽으로 이동시킨다. 왼쪽 피연산자는 이동할 수식이고 오른쪽 피연사자는 이동할 비트 정수 수다. 그래서 3 << 1은 리터럴 3의 비트를 왼쪽으로 1자리 이동시킨다.

예를 들어, 숫자 3(binary: 0011)을 가정해보자:
3 = 0011
3 << 1 = 0110 = 6
3 << 2 = 1100 = 12
3 << 3 = 1000 = 8
3 << 3 경우에, 이동한 비트가 왼쪽 끝 범위를 넘어간다. 이진수의 끝에서 벗어난 비트는 손실된다.

(여기서는 4bit로 가정하고 있다. 8bit일 경우 3 << 3은 0001 1000이 되어 24가 된다. 이 경우 4번째 비트는 5번째 비트로 이동되므로 손실되지 않는다.)

오른쪽 시프트 연산자(>>)는 각 비트를 오른쪽으로 이동시킨다.

12 = 1100
12 >> 1 = 0110 = 6
12 >> 2 = 0011 = 3
12 >> 3 = 0001 = 1
12 << 3 경우에, 이동한 비트가 오른쪽 끝 범위를 넘어간다. 이진수의 끝에서 벗어난 비트는 손실된다.

변수도 시프트할 수 있다:
unsigned int x = 4;
x = x << 1; // x will be 8
Bitwise NOT
비트 NOT 연산자(~)는 비트 단위 연산자 중 가장 이해하기 쉽다. 각 비트에서 0과 1을 서로 바꾼다. 결과값은 자료형의 크기에 따라 다르다.

4 bits:
4 = 0100
~4 = 1011 = 11 (decimal)
8 bits:
4 = 0000 0100
~4 = 1111 1011 = 251 (decimal)
Bitwise AND, OR, and XOR
비트 AND 연산자(&)와 비트 OR 연산자(|)는 논리 AND 연산자(&&) 및 논리 OR 연산자(||)와 비슷하게 동작한다. 그러나 bool 값을 평가하는 대신 각 비트에 적용된다. 예를 들어, 식 5 | 6은 binary에서 0101 | 0110로 적용된다.

0 1 0 1 // 5
0 1 1 0 // 6
비트의 각 열에 연산이 적용된다. 논리 OR 연산자(||)는 왼쪽 또는 오른쪽 피연산자 중 하나 이상이 true면 true로 평가된다. 비트 OR 연산자(|)는 비트 두개 중 하나 이상이 1이면 1로 평가된다.

5 | 6: 0111(7)
0 1 0 1 // 5
0 1 1 0 // 6
-------
0 1 1 1 // 7
비트 AND 연산자(&)도 비슷하게 작동한다. 논리 AND 연산자(&&)는 왼쪽과 오른쪽 피연산자가 모두 true일 경우에만 true로 평가된다. 비트 AND 연산자(&)는 두 비트 모두 1인 경우에만 1로 평가된다.

5 & 6: 0100(4)
0 1 0 1 // 5
0 1 1 0 // 6
--------
0 1 0 0 // 4
마지막 비트 단위 연산자는 비트 XOR 연산자(^)다. 두 연산자를 평가할 때, 한 개의 피연산자만 1인 경우에만 1로 평가된다. 두 비트 모두 1인 경우에는 0으로 평가된다.

5 ^ 6: 0101(5)
0 1 1 0 // 6

0 0 1 1 // 3
-------
0 1 0 1 // 5
Bitwise assignment operators
산술 할당 연산자(=)처럼, C++ 에는 변수를 쉽게 수정할 수 있도록 비트 할당 연산자를 제공한다.

perator	Symbol	Form	Operation
Left shift assignment	<<=	x <<= y	Shift x left by y bits
Right shift assignment	>>=	x >>= y	Shift x right by y bits
Bitwise OR assignment	l=	x l= y	Assign x \	y to x
Bitwise AND assignment	&=	x &= y	Assign x & y to x
Bitwise XOR assignment	^=	x ^= y	Assign x ^ y to x
예를 들어, x = x << 1을 쓰는 대신 x <<= 1 을 쓸 수 있다.

요약 (Summary)
열에서 비트를 평가하는 방법:
비트 OR 연산자(|): 열의 하나 이상 비트가 1이면 해당 열에 대한 결과는 1이다.
비트 AND 연산자(&): 열의 모든 비트가 1이면 해당 열에 대한 결과는 1이다.
비트 XOR 연산자(^): 열에서 한 개 비트만 1이면 해당 열에 대한 결과는 1이다.

<br>

[맨 위](#){: .btn .btn--primary }{: .align-right}