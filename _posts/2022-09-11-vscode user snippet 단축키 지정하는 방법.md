---
title: "[VScode] vscode user snippet 단축키 지정하는 방법" 



categories:
  - VScode
tags:
  - [VScode, snippet]

toc: true
toc_sticky: true

date: 2022-09-11
last_modified_at: 2022-09-11
---

## VSCode에서 단축키로 snippet을 입력해보자.
- js를 사용하다보니 화살표함수 만드는 게 은근 번거로웠다.
- 그래서 => 적으면 나오도록 했는데 ctrl + space 누르면 나오긴 했는데 그거 조차 좀 번거로웠다.
- 그래서 아예 단축키로 나오도록 변경했는데 방법을 기록 안해두면 잊어버릴 것 같아서 포스팅

## 사용자 snippet(기본snippet도 됨) 단축키로 입력하기
- ctrl + shift + p 누르고 user snippet 으로 검색해서 원하는 언어의 json 파일을 열어줌.(내 경우는 javascript)
```js
"Arrow function": { // 해당 snippet의 이름(중요)
		"prefix": "=>", // => 적거나 적은 후 ctrl + space 누르면 나오게 할 약어?
		"body": [       // 실제 입력될 부분 여기서 $1 $2 이런게 있는데 $1은 첫번째 마우스가 위치할 곳 $2는 탭누르면 이동할 다음 포인트
			"() => {",    // 여러줄로 적고 싶으면 이렇게 줄마다 "" 따로 줘야한다.
			"  $1",
			"}"
		],
		"description": "Arrow function" // ctrl + space 누르면 나오는설명
	}
```
- json파일을 열면 어떻게 작성해야하는지 예제가 적혀있다. 예시대로 적으면 되고 간단한 설명을 해두었다.
- ctrl + shift + p 를 누르고 key 로 검색, keybindings.json 을 열어준다.

```js
{
        "key": "ctrl+.",                          // 사용할 단축키(참고로 기본 단축키와 겹치면 다시 덮어쓴다.)
        "command": "editor.action.insertSnippet", // 이건 여러가지 있다. 그 중에서 영어뜻 대로 snippet입력
        "args": {"name": "Arrow function"}  // 위에 적었던 snippet의 이름
    },
```

## 이제 직접 써보자.
- 내 경우는 아무것도 안겹치는 ctrl + . 으로 화살표 함수를 만들었다.
- 잘된다.


<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
