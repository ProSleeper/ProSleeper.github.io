---
title:  "[http] Http 응답(Response)의 종류"


categories:
  - http
tags:
  - [http, CS]

toc: true
toc_sticky: true

date: 2022-09-21
last_modified_at: 2022-09-21
---
[MDN HTTP 설명 페이지](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

- http는 클라이언트와 서버가 통신을 계속해서 연결해두지 않는다.
- 클라이언트는 필요한 것을 서버로 요청하고 서버는 해당 요청에 대해서 응답을 하는 방식이다.
- 연결을 지속적으로 하는 것보다 효율적으로 자원을 관리할 수 있다.

## 기본적인 http의 응답 코드
- backEnd, frontEnd를 가리지 않고 기본적인 요청과 응답 2가지의 종류는 알고 있어야 한다.
- 응답은 클라이언트가 보낸 요청을 서버에서 처리 해주는 것을 말한다.
- 단순하게 말해서 요청이 없으면 응답도 없다.
- 여기서는 응답에 대해서 정리해보려고 한다.


### 1xx: (정보) - 요청을 받았으며 프로세스를 계속 진행합니다.
- 서버가 요청을 받아서 해당 요청을 처리하고 있다는 응답이다.
- 이 응답을 받는다면 서버가 요청을 잘 처리하고 있다고 생각하면 된다.

### 2xx: (성공) - 요청을 성공적으로 받았으며 인식했고 수용하였습니다.
- 일반적으로 어떤 요청을 보냈을 때 2xx를 받으면 성공이기 때문에 이 응답을 받고 필요한 처리를 수행하는 코드를 짤때가 많다.

### 3xx: (리다이렉션) - 요청 완료를 위해 추가 작업 조치가 필요합니다.
- 보통 301과 302를 많이 받게 되고 둘다 리다이렉션인데 둘의 차이는 301은 영구적으로 새로운 주소로 옮겼다는 뜻이고
- 302는 일시적으로 옮겼다는 뜻이다.
- 실제로 도메인 연결을 시키다가 301과 302를 선택하라고 했을 때 뭘 선택해야할지 몰랐는데 임시적인 변경이 아니므로 301을 선택하면 된다.

### 4xx: (클라이언트 오류) - 요청의 문법이 잘못되었거나 요청을 처리할 수 없습니다.
- 아마 웹개발자도, 사용자도 제일 많이 보게 되는 번호가 404일것이다.
- 404는 요청한 웹페이지가 서버에서 존재하지 않을 때의 응답이다.
- 가령 "https://www.naver.com/abcdefg" 처럼 서버에 존재하지 않는 주소로 요청을 보냈을 때 서버에서 보내주는 응답니다.
- 간단하게 말해서 클라이언트가 잘못 된 요청을 한것이다.

### 5xx: (서버 오류) - 서버가 명백히 유효한 요청에 대한 충족을 실패했습니다.
- 서버가 응답을 할 수 없다는 의미이며 요청이 올바른지는 알 수가 없다.
- 클라이언트의 요청을 처리할 수 없다는 의미이다.
- 서버가 내려갔거나, 서버가 켜지지 않았거나 등등 서버 자체를 사용할 수 없을 때 받는 응답이다.



## 자세한 응답 코드

<div style="line-height: 20px; color: rgb(102, 102, 102); font-size: 13px; text-align: justify;">
    <table class="__se_tbl" border="0" cellspacing="1" cellpadding="0" style="border: medium none; background-color: rgb(199, 199, 199);">
        <tbody>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(51, 51, 51); width: 118px; height: 20px; color: rgb(255, 255, 255);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;응답 코드</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(51, 51, 51); width: 500px; height: 20px; color: rgb(255, 255, 255);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">설명&nbsp;</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">100&nbsp;</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Continue (클라이언트로 부터 일부 요청을 받았으며 나머지 정보를 계속 요청함)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;101</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Switching protocols</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;200</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;OK(요청이 성공적으로 수행되었음)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;201</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Created (PUT 메소드에 의해 원격지 서버에 파일 생성됨)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;202</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Accepted(웹 서버가 명령 수신함)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;203</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Non-authoritative information (서버가 클라이언트 요구 중 일부만 전송)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;204</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;No content, (사용자 요구 처리하였으나 전송할 데이터가 없음)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;301</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Moved permanently (요구한 데이터를 변경된 타 URL에 요청함)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;302</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Not temporarily</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;304</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Not modified (컴퓨터 로컬의 캐시 정보를 이용함, 대개 gif 등은 웹 서버에 요청하지 않음)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;400</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Bad request (사용자의 잘못된 요청을 처리할 수 없음)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;401</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Unauthorized (인증이 필요한 페이지를 요청한 경우)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;402</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Payment required(예약됨)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;403</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Forbidden (접근 금지, 디렉터리 리스팅 요청 및 관리자 페이지 접근 등을 차단)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;404</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Not found, (요청한 페이지 없음)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;405</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Method not allowed (혀용되지 않는 http method 사용함)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;407</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Proxy authentication required (프락시 인증 요구됨)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;408</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Request timeout (요청 시간 초과)</p>
                </td>
            </tr>
            <tr>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(248, 248, 248); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;410</p>
                </td>
                <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                    <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Gone (영구적으로 사용 금지)</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<table class="__se_tbl" border="0" cellspacing="1" cellpadding="0" style="color: rgb(102, 102, 102); font-size: 13px; line-height: 20px; border: medium none; background-color: rgb(199, 199, 199);">
    <tbody>
        <tr>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;412</p>
            </td>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Precondition failed (전체 조건 실패)</p>
            </td>
        </tr>
        <tr>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;414</p>
            </td>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Request-URI too long (요청 URL 길이가 긴 경우임)</p>
            </td>
        </tr>
        <tr>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;500</p>
            </td>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Internal server error (내부 서버 오류)</p>
            </td>
        </tr>
        <tr>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;501</p>
            </td>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Not implemented (웹 서버가 처리할 수 없음)</p>
            </td>
        </tr>
        <tr>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;503</p>
            </td>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Service unnailable (서비스 제공 불가)</p>
            </td>
        </tr>
        <tr>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;504</p>
            </td>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;Gateway timeout (게이트웨이 시간 초과)</p>
            </td>
        </tr>
        <tr>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 118px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;505</p>
            </td>
            <td style="border: medium none; padding: 3px 4px 2px; background-color: rgb(255, 255, 255); width: 500px; height: 20px; color: rgb(102, 102, 102);">
                <p style="margin: 0px; padding: 0px; line-height: 1.5;">&nbsp;HTTP version not supported (해당 http 버전 지원되지 않음)</p>
            </td>
        </tr>
    </tbody>
</table>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
