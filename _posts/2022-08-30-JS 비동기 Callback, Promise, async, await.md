---
title:  "[JavaScript]JS 비동기 Callback, Promise, async, await" 

categories:
  - JavaScript
tags:
  - [JavaScript]

toc: true
toc_sticky: true

date: 2022-08-30
last_modified_at: 2022-08-30
---

## 참고 블로그
[비동기](https://elvanov.com/2597){:target="_blank"}  



# 비동기가 무엇인가
 - JS에서는 아주아주 많은 부분들을 비동기로 처리합니다.
 - 애니메이션, 통신, 타이머 등등 굉장히 많은 부분들을 비동기로 처리합니다.
 - 다만 많은 분들이 알고 있듯이 JS는 싱글스레드 언어이기 때문에 원래라면 비동기로 처리할 수 없지만, 
 - 브라우저에서 지원을 해주기 때문에 이런 비동기 방식이 가능합니다.
 - 브라우저에서 어떻게 비동기 방식을 처리해주는 지는 다음 포스팅으로..





# Callback 함수
 - 간단하게 말해서 함수의 매개변수로 주어져서 실행되어지는 함수, 혹은 그 다음에 실행되는 함수를 말합니다.
 - 사실 콜백함수는 그 자체로는 비동기와는 관련이 없습니다. 다만 어떠한 작업이 이루어 지고 난 후에 실행된다는 이유 때문에
 - JS에서 비동기를 말할 때 꼭 빠지지 않고 등장합니다. 물론 제일 많은 부분은 보통 콜백지옥을 설명하기 위해서 입니다.

```js
function learn(result, nextLearn) {
  
}

learn("good", () => {
  learn("fail", () => {
    learn("result", () => {
      learn("good", () => {
        learn("good", () => {
          learn("no", () => {

          })
        })
      })  
    })
  })  
})

```
- 콜백지옥이란 이렇게 가독성이 나빠서 코드가 한눈에 들어오지 않게 되는 부분을 말합니다.


# Promise
 - 위와 같이 콜백지옥을 만들지 않으면 좋겠지만, 실제로 개발을 하다보면 비동기 부분을 할때 비동기 작업이 완료되면 다음 비동기를 처리하고 또 완료되면 처리하고
 - 이렇게 연속해서 이어지는 부분이 계속해서 만들어집니다.
 - 이때 위와 같은 콜백지옥을 방지하기 위해서 나온 문법이 바로 Promise입니다.

```js
const promise1 = new Promise((resolve, reject) => {
  //비동기로 해야할 작업(애니메이션, http요청)
});
```
 - 프로미스는 위의 콜백지옥에서 적당히 벗어나게 해줍니다. 다만 완전히 벗어나기는 힘듭니다.
 - 그리고 이때 개인적으로 이해가 가지 않았던 부분이 resolve와 reject메서드인데 resolve는 비동기 작업이 성공했을 때 실행하는 함수이고
 - reject는 비동기 작업이 실패하거나 에러가 발생했을 때 실행하는 함수입니다.
 - 참고로 에러가 나면 reject함수는 자동으로 실행이 되어서 catch로 받을 수 있지만 reject 함수는 프로그래머가 직접 성공을 했다는 것을 resolve 함수를
 - 사용해서 promise를 전달해주어야 합니다.

```js
const promise1 = new Promise((resolve, reject) => {
  //비동기로 해야할 작업(애니메이션, http요청)
}

  promise1.then(() => {})
  .then(() => {})
  .then(() => {})
  .then(() => {})
  .then(() => {})
  .catch(() => {})
);
```
 - 위의 콜백지옥보다는 약간 가독성이 올라간 느낌이 듭니다.
 - 다만 이 promise를 제대로 활용하기 위해서는 async와 await 까지 배워야 정말 콜백지옥을 벗었났구나라는 생각이 듭니다.



# async / await
 - async: 메서드를 비동기작업으로 만들 수 있다.
 - await: Promise 가 끝날 때까지 기다리거라.
 - async와 await를 사용하면 비동기 작업의 코드를 좀 더 동기적인 코드로 보이게 해주어서 가독성을 높여줍니다.


```js
async function fetchAuthorName(postId) {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await postResponse.json();
  const userId = post.userId;
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = await userResponse.json();
  return user.name;
}

fetchAuthorName(1).then((name) => console.log("name:", name));
```


 - 아주 전형적인 비동기 코드이지만 마치 동기 코드처럼 보이기 때문에 가독성이 올라갑니다.


# 마무리
 - [비동기 설명 추천](https://elvanov.com/2597){:target="_blank"}
 - 비동기 함수를 잘 쓰고 싶어서 정말 꽤 많은 문서와 유튜브 영상을 봤는데 봐도봐도 이해하기 너무 힘들었다.
 - 개념 자체는 이해가 갔지만 이걸 어떻게 써야할지 await는 어디서 써야할지 도저히 모르겠었다.
 - 정말 너무너무 이해가 안되어서, reslove는 언제 쓰고 왜 쓰고 어떻게 쓰는건지 조차도 너무 이해하기 힘들었는데
 - 위 블로그의 설명으로 그래도 꽤 많이 이해가 되었다.
 - 저 블로그를 계속 보는데도 만약 이해가 끝까지 가지 않는다면...... 아마도 그럴 일은 없을 거라고 생각한다.
 - 정말 설명을 너무 잘해놓았다.
 - 이제 비동기 작업 방식으로 애니메이션을 좀 잘 구현해볼 수 있을 것 같다.

<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
