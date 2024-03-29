---
title:  "[JavaScript] 자바스크립트에서 일급함수를 사용해서 더 좋은 코드를 작성해보자" 



categories:
  - JavaScript
tags:
  - [JavaScript]

toc: true
toc_sticky: true

date: 2022-09-18
last_modified_at: 2022-09-18
---

#

## 자바스크립트는 일급함수를 지원하는 언어다. 정확히 무슨말일까?
- 일급 함수란, 함수를 변수에 저장하거나 매개변수로 함수를 전달하거나 리턴값으로 함수를 사용 가능할 때 표현하는 말이다.
- 배울때는 이렇게 들었는데 막상 어떻게 사용해야할지는 몰랐다.
- 다만 자바스크립트를 사용하면 사용법은 몰라도 되게 자동으로 사용해지긴 한다.(콜백함수라던가..콜백함수라던가..)
- 그리고 사람은 뭔가를 배우면 써봐야 더 잘 알 수 있고 복습을 해야 더 잘 알게 되는 것 같다.
- 프로젝트를 위해서 리액트 기초를 보는데 이런방식으로 함수를 사용하면 더 좋은 코드를 짤 수 있겠다 라는 생각이 들어서 기록으로 남겨둔다.

<br/>

```js

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}


function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

```
- 리액트 문서에 적힌 내용으로 tryConvert는 올바르지 않은 입력 값에 대해서 빈 문자열을 반환하는 함수이고
- toCelsius(); toFahrenheit(); 함수는 각각 섭씨를 화씨로, 화씨를 섭씨로 변환해주는 함수이다.
- 아마 나라면 tryConvert를 만들어서 그 인자로 변환함수를 받는 방식으로 코드를 짜기보다는 들어오는 입력값은 항상 제대로 된 값이라고 생각해서
- toCelsius(); 와 toFahrenheit(); 메서드를 조합해서 하나의 함수로 만드는 부분에 집중을 했을 것 같다.
- 그러면 아래같이 코드가 됐을 것이다.


```js
function toConvert(temperature, type) {
  if(type == 'celsius'){
    return (temperature - 32) * 5 / 9;
  }
  return (temperature * 9 / 5) + 32;
}

function tryConvert(temperature, convert, type) {
  ...생략

  const output = toConvert(input, type);
  ...생략
}
```


- 특별하게 코드 양이 많아지거나 한것은 아니지만 매개변수가 하나 늘어나서 조금 더 복잡해졌고
- 제일 중요한 것은 현재는 온도라는 2가지의 종류만 있는 구현이라서 더 늘어날 부분이 없지만
- 만약 어떠한 물건에 대해서 구현한 코드라면 물건이 하나 늘어날 때마다 toConvert 함수 내부에 if문을 점점 늘려나가야 한다.
- 당연한 말이지만 SOLID의 O원칙(소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.) 을 아주 제대로 위반하는 것이다.
- 현재 코드보다 위에서 toCelsius(); 와 toFahrenheit(); 만든 코드를 비교하면 만약 온도의 종류가 1가지가 더 생긴다면 두개의 to함수를 변경할것 없이
- 새로운 toTeperate(); 같은 함수를 만들어서 convert의 인자로 전달해주면 끝이다. 훨씬 직관적이고 깔끔하고 객체지향 원칙까지도 지킬 수 있는 것 같다.



## SOLID를 지키려고 노력해보자.
- 위에 말했듯이 나였으면 두 함수를 함쳐서 중복코드를 제거하려고 했을 것 같다. 다만 한 줄 코드를 줄여봐야 뭘 줄일 수 있을지 모르겠고, 더 복잡해질것만 같다.
- 그리고 SRP를 지키려면 현재 상태가 좋고, 또 다른 사람이 보기에도 한 눈에 이해되는 이런 코드가 좋은 코드 같다.
- 아직 배울게 많아서 힘들지만 한편으로는 재밌기도 하다. 아마 내가 눈 감는 그 순간까지 이 개발이라는 것은 다 못배울듯하니 끝까지 재밌겠다.





<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
