---
title:  "[puppeteer] puppeteer 사용 후기와 기본 사용법 정리" 



categories:
  - Javascript
tags:
  - [puppeteer, Javascript]

toc: true
toc_sticky: true

date: 2022-10-14
last_modified_at: 2022-10-14
---


# Puppeteer란?
- Puppeteer는 DevTools 프로토콜을 통해 Chrome 또는 Chromium을 제어하는 ​​고급 API를 제공하는 노드 라이브러리입니다. Puppeteer는 기본적으로 헤드리스로 실행되지만 전체(헤드리스가 아닌) Chrome 또는 Chromium을 실행하도록 구성할 수 있습니다.
- 위의 정의는 공식문서를 번역한 것입니다.
- 개인적으로는  "크롬을 이용한 UI 테스트 툴" 이라고 정의했고, 간단하게 SPA 크롤링하기 좋은 툴! 이라고 생각한다.

# 언제, 왜 사용했나?
- 국비지원 학원에서 마지막 프로젝트때 필요한 raw data를 얻기 위해서 몇몇 사이트들을 크롤링 할 필요가 있었다.
- 과거에 댓글 크롤링할때 사용했던 python을 이용할까 하다가 Javascript를 배우기도 했고, 요즘 nodeJS 모듈이 정말 정말 많다고 들어서 이것저것 검색을 했다.
- 구글에 크롤링 검색 시 당연하게도 처음으로 python, 그리고 js는 보통 cheerio + axios를 이용한 방법이 제일 많이 나왔다.
- 그래서 한번은 해본 python 보다는(이미 다 까먹었지만..) 새롭게 js를 이용해서 할 생각으로 node 설치 후 cheerio + axios 조합으로 크롤링을 하기로 했다.

# SPA라는 난관에 봉착했다.
- 당연히 cheerio + axios 정도면 충분하다고 생각했는데 나의 너무 큰 오산이었다. 
- 과거에 python으로 했을 때는 SPA/SSR이 그렇게 많지 않았는데 요즘 트렌트가 SPA였어서 html 태그를 검색하는 것보다 버튼을 눌러서 새로운 데이터나 사진을 변경해서 읽는 부분이 너무 많았다.
- 그래도 다들 이 방법으로 했으니 나도 되겠지..하면서 시도를 하다가 반복되는 것도 너무 심하고 약간 아니라는 생각도 들어서 SPA용으로 사용할 수 있는 라이브러리를 찾았다.
- 그러다가 찾은 것이 puppeteer였다.

# SPA 컨트롤은 어느정도 가능했다. 하지만...
- 어떤 라이브러리나 api도 장점과 단점이 있듯이 puppeteer가 SPA를 컨트롤 하기에는 좋았지만 몇가지 단점도 존재했다.
- 첫번째. 조금 마이너한 라이브러리이다보니 한국어로 된 자료가 엄청 많지는 않았다.
- 두번째. 개인적으로 사용한 경험으로는 뭔가 정확히 작동되는 것 같지가 않았다. 예를 들어서 버튼 클릭을 해야되는 경우가 제일 많았는데, 분명히 사용하라고 만들어둔 메서드가 제대로 동작을 안하는 일이 발생했다.
- 물론 결국 우리의 친구 stackoverflow에서 잘 동작하는 클릭 코드를 찾아내서 사용했지만 라이브러리 자체에서 제공하는 부분이 조금 미흡하다는 생각이 들었다.
- 거기에 나의 숙련도가 낮은 것도 이유였다.
- 여튼 그래도 이것저것 잘 만져서 잘 사용해서 원하는 부분의 크롤링은 성공적으로 끝냈다.

# 기본 사용법
- 메서드를 하나하나 설명하는 것도 좋지만, 이건 코드로 설명하는 게 더 좋을 것 같다.

- 사용하려면 nodeJS 설치 + npm install puppeteer 면 된다.
- 
```js

const puppeteer = require("puppeteer");
//모듈 선언

function runCrawl() {
    const browser = await puppeteer.launch({ headless: true }); // 1
    const page = await browser.newPage(); // 2
    await page.setViewport({ width: 1920, height: 1080 });  // 3

    await page.goto("url"); // 4

    /*

    크롤링 코드
    ...

    */

    page.close(); // 5
    browser.close();  // 6
  }
```
- 주석 설명
1. 브라우저를 실행시킨다. (headless:) 는 true면 헤드리스, false면 브라우저가 실행된다. 처음 사용할때나 어떻게 동작하는지 보고 싶다면 false로 두면 된다.
2. 새로운 탭 실행
3. 새로운 탭의 크기 설정
4. 해당 url로 이동
5. 탭 닫기
6. 브라우저 종료

- 기본적인 동작코드는 이런 방식이고 중앙의 크롤링 코드 부분에서 크롤링을 하면 된다.

# 사용한 함수


## element.evaluate((arg) => arg.click());

```js
const btn = await page.waitForSelector(accoSelector.SELLER_INFO.BUTTON);
  await btn.evaluate((b) => b.click());
```
- 단순히 클릭하는 코드이다. 버튼이나 a태그 div 등 거의 모든 element를 클릭할 수 있다.
- !!!!!다만 사실 이게 제일 중요한 함수다!!!!!
- 별표 5개도 안아깝다.. 진짜 이거만 써도 거의 모든 동작을 다 할 수 있다.
- SPA를 컨트롤하려고 puppeteer를 사용하는 건데 처음에는 ElementHandle을 반환해주고 내부적으로 아래 코드의 클릭만을 사용했다.

```java
// 초기 페이지에서 3번 클릭해서 넘겨야 하는 부분이 있었다.
  arg.click();
  arg.click();
  arg.click();

  // await arg.click();
  // await arg.click();
  // await arg.click();
```

- 당연히 될줄 알았는데 안됐다. 그래서 비동기 문제인가 싶어서 아래 주석과 같이 await를 붙였는데도 안됐다. (click의 반환값은 promise다)
- 이 문제로 3번 클릭하면 되는 걸 거의 10번클릭하는 코드를 사용해서라도 해결해보려 했지만 실패했다.
- 다행히도 추후에 위의 evaluate(click) 코드를 사용해서 문제를 해결했다.
- 
<br/>
<br/>

## page.$$
```js 
// page 내에서 selector를 찾아서 배열로 반환해준다.
  await page.$$(selector);
```


```html
 <!-- 현재 페이지에 아래 같은 html 태그가 존재할때  -->
<div>
  <ul>
    <li class="pupp"></li>
    <li class="pupp"></li>
    <li class="pupp"></li>
  </ul>
</div>
```

```js
// elements는 pupp 클래스 element를 3개 가진 배열이다.
  const elements = await page.$$('div > ul > li.pupp'); 
```

- 참고로 puppeteer를 사용하면 ElementHandle 같이 puppeteer에서 정의한 래퍼로 감싸서 반환해준다.

<br/>
<br/>


## element.$eval
```js
const elements = await page.$$(selector);

  for (const element of elements) {
    const iconName = await element.$eval(attr, (el) => el.getAttribute("alt"));
  }
```

```js
// puppeteer로 찾은 element에서 속성을 검색할때 사용한다.
element.$eval(attr, (el) => el.getAttribute("alt"));
```
<br/>
<br/>

## page.$

```js
const numberOfPictures = await page.$(numberOfPictureSelector);
  const count = await page.evaluate((el) => el.textContent, numberOfPictures);
```

- page.$는 document.querySelector과 같다고 보면된다.
- page.evaluate 첫번째는 evaluate 내부에서 javascript 코드를 사용할 수 있고 두번째는 위의 방식처럼 func, arg 로 사용할 수 있다.
- 
<br/>
<br/>



## page.waitForTimeout

```js
  await page.waitForTimeout(200);
```
- 메서드명만 봐도 알 수 있듯이 sleep같은 메서드이다.
- 공식문서에 이제는 사용하지 않고 ``` new Promise(r => setTimeout(r, milliseconds)); ``` 을 추천하고 있다.

<br/>
<br/>


## page.$x

```js 
const savePicture = async (page, index, title) => {
  const [target] = await page.$x(`//*[@id='${index}']/div/span/img`);
};
```

- XPath 를 이용해서 요소를 반환한다.

<br/>
<br/>


## getProperty("attribute"), jsonValue();

```js 
const savePicture = async (page, index, title) => {
  const [target] = await page.$x(`//*[@id='${index}']/div/span/img`);
  const src = await target.getProperty("src");
  const image = await src.jsonValue();

  makeFolder(`${__dirname}\\..\\lowData\\${title}\\images`);
  await download(image, `${__dirname}\\..\\lowData\\${title}\\images\\image${index}.jpg`);
};
```

- XPath를 이용해서 가져온 객체에서 attr을 찾고 그 값을 가져오는 코드다.
- 솔직하게 말해서 이 부분은 스택오버플로에서 가져온 코드라서 내용은 알겠는데 각 메서드의 정확한 기능은 모르겠다.


# 사용후기
- 처음에는 당연하지만, 문법을 몰라서 헤메는 부분이 많았는데 사용하다보니 은근히 사용법이 쉬워서 나중에는 이렇게 이렇게 하면 되겠지~ 라는 생각이 많이 들고 selector 때문에 코드가 지저분 해지는 것 말고는 꽤 잘 사용했다.
- 버전이 조금 더 업그레이드 되면 더 사용하기 좋아질 것 같다.

<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
