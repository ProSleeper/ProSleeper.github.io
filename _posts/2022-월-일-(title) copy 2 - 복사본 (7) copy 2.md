---
title:  "[Java] try catch문을 코드 여러군데에서 사용하는 이유" 



categories:
  - Java
tags:
  - [Java]

toc: true
toc_sticky: true

date: 2022-09-15
last_modified_at: 2022-09-15
---


# Java console프로그램을 기준으로 try catch이나 throws exception을 main메서드 한곳에만 써도 모든 오류를 "확인" 하는 것은 가능하다.
- 설명보다 직접 코드를 보면 이해가 쉽다.
```java
import java.lang.Thread;

class Playground {
    public static void main(String[ ] args) {
        String URL = "https://test.com";
        Browser browser = new Browser();
        try {
          browser.commandDownload(URL);
        } catch (Exception e) {
          System.out.println(e.toString());
        }
        
    }
}

class Browser{
    public void commandDownload(String url){
        Download download = new Download(url);
        download.pictureDowndload();
    }
}

class Download{
  
    private String url = null;

    public Download(String url){
        this.url = url;
    }

    public void pictureDowndload(){
        
        System.out.println(url + "다운로드 시작");
        try{
            Thread.sleep(4000);
            throw new Exception("에러: 1");  
        }catch(Exception e){
            System.out.println(e.toString());
        }
        System.out.println("다운로드 완료");

        throw new Exception("에러: 2");  
        System.out.println("그림 열기");
    }
}
```

# 


# 

# 

# 


<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
