---
title:  "[JSP, Servlet] jsp,servlet 오류시 .java 파일 경로" 

categories:
  - Java
tags:
  - [JSP, Servlet]

toc: true
toc_sticky: true

date: 2022-07-28
last_modified_at: 2022-07-28
---


# JSP, Servlet의 오류에서 나오는 파일은 어디에 있는가
- .java파일은 오류가 나면 어디서 나는지 있는 그대로 알려줬고
- oracle은 오류가 나도 정확히 어디가 오류인지 잘 안알려주는건지, 내가 모르는 건지 여튼 좀 별로 였고(오류코드는 알려주지만)
- jsp와 servlet은 오류가 난다고 알려주긴 알려주는데 도대체 그 파일은 어디 있고, 왜 내가 짠 .jsp파일의 줄 번호로 안알려주지라고 화났지만!
- 다행히도 저 깊숙히 안쪽에 .jsp파일을 .java파일로 만들어주는 곳을 배워서 조금 더 쉬운 디버깅을 할 수 있었다.
- 짧막한 팁으로는 다들 알겠지만 .jsp파일은 .java로 변환되고 그걸 다시 compile해서 .class파일로 만들어서
- jvm이 읽을 수 있는 javabytecode로 만들어준다. jvm은 읽어서 javabytecode를 읽어서 우리에게 보여준다.


# 나의 경로
- C:\Users\user\Documents\jsp-servlet\workSpace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\work\Catalina\localhost\study\org\apache\jsp

# 상대 경로
- \projectFolder\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\work\Catalina\localhost\study\org\apache\jsp
- 보통 .metadata폴더는 다들 어디 있는지 알테니 그 하위로 쭉 따라가다보면 찾을 수 있다.




<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
