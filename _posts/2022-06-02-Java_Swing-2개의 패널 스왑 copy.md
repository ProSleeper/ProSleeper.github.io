---
title:  "[Java Swing] 2개의 패널 스왑효과" 

categories:
  - Java
tags:
  - [Java, Java Swing]

toc: true
toc_sticky: true

date: 2022-06-02
last_modified_at: 2022-06-02
---


# 2개의 패널 스왑효과

출처:
[2개의 패널 스왑효과](https://developer-salieri.tistory.com/185){:target="_blank"}  


```java
package com.example;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
 
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
//위에 import한 것들은 사실 뭐 다 필요해서 했겠지.. 하고 넘어간다. 

 
//여기 코드에서 왜 써져 있는 건지 이해 안되는 부분 2
@SuppressWarnings("serial")
class JPanel01 extends JPanel { // 1번째 패널
 
    private JButton jButton1;		
    private JScrollPane jScrollPane1;	// TextArea에서 사용할 스크롤 선언
    private JTextArea jTextArea1;		// TextArea에서 선언
    private JPanelTest win;
 
    public JPanel01(JPanelTest win) {
        this.win = win;	//이 panel을 컨트롤 할 수 있도록 선언한 JPanelTest win에 매개변수로 받은 win을 넣어줌.(문득 생각났는데 자바는 이렇게 객체로 넣어주면 call by reference라서 매개변수로 넣어주면 동일한 객체를 가리키게 된다.
        setLayout(null);
 
        jButton1 = new JButton("버튼");
        jButton1.setSize(70, 20);
        jButton1.setLocation(10, 10);
        add(jButton1);
 
        jTextArea1 = new JTextArea();
 
        jScrollPane1 = new JScrollPane(jTextArea1);	//스크롤패널 생성
        jScrollPane1.setSize(200, 150);				//크기 지정
        jScrollPane1.setLocation(10, 40);			//위치 지정
        add(jScrollPane1);
 
        jButton1.addActionListener(new MyActionListener());
    }
 
    class MyActionListener implements ActionListener { // 버튼 키 눌리면 패널 2번 호출
        @Override
        public void actionPerformed(ActionEvent e) {
            win.change("panel02");
        }
    }
}
 
//여기 코드에서 왜 써져 있는 건지 이해 안되는 부분 2
@SuppressWarnings("serial")
class JPanel02 extends JPanel { // 2번째 패널
    private JTextField textField;			//텍스트필드 선언
    private JPasswordField passwordField;	//패스워드필드 선언
    private JPanelTest win;					//이 Panel02를 컨트롤 할 수 있도록 win을 선언?
 
    public JPanel02(JPanelTest win) {
        setLayout(null);	//모든 레이아웃 설정 초기화(이걸 안하면 swing자체에서 지정한 레이아웃을 가지고 배치가 된다)
        this.win = win;		//위에서 선언한 win에 매개변수로 받아온 win을 이어준다? 넣어준다?
        JLabel lblLbl = new JLabel("아이디:");	//아이디 라벨
        lblLbl.setBounds(31, 40, 67, 15);		//아이디 위치 지정(보통 이렇게 4가지 숫자가 나오면 x, y, width, height 라고 보면 된다.
        add(lblLbl);	//JFrame에 추가 시켜서 화면에 보여준다.(이걸 안하면 화면에 안보인다.
 
        textField = new JTextField();	//TextField 생성(텍스트를 입력에는 TextField와 TextArea 2개가 있다고 하는데 여러줄을 쓸때는 area, 한 줄정도 쓸때는 field를 쓴다고 한다.
        textField.setBounds(123, 40, 116, 21);	//위치 지정
        add(textField);	//위 lblLbl과 동일하게 frame에 추가 시킴
        textField.setColumns(10);	//이건 아마 텍스트필드의 기본 크기를 10칸으로 해준다는 뜻인 것 같다.
 
        JLabel lblLbl_1 = new JLabel("암호:");	//암호 라벨
        lblLbl_1.setBounds(31, 84, 67, 15);		//위치 지정
        add(lblLbl_1);	//위 lblLbl과 동일하게 frame에 추가 시킴
 
        passwordField = new JPasswordField();	//패스워드필드 생성
        passwordField.setBounds(123, 84, 116, 21);	//위치 지정
        add(passwordField);	//위 lblLbl과 동일하게 frame에 추가 시킴
 
        JButton btn = new JButton("버튼");	//버튼 생성
        btn.setSize(70, 20);	//크기 지정
        btn.setLocation(10, 10);	//위치 지정인데..(위에 setBounds처럼 한번에 지정은 안되나? 되겠지?)
        add(btn);	//frame에 추가
        btn.addActionListener(new MyActionListener());	//버튼을 누르면 실행 시킬 이벤트 생성
    }
 
    //버튼을 누르면 실행할 이벤트
    class MyActionListener implements ActionListener { // 버튼 키 눌리면 패널 1번 호출
        @Override
        public void actionPerformed(ActionEvent e) {
            win.change("panel01");
        }
    }
}
 
 
//여기 코드에서 왜 써져 있는 건지 이해 안되는 부분 1 serial로 예측해보건데 아마 직렬화?
@SuppressWarnings("serial")			
class JPanelTest extends JFrame {
 
    public JPanel01 jpanel01 = null;		//이 객체에서 컨트롤할 패널1
    public JPanel02 jpanel02 = null;		//패널2
 
    public void change(String panelName) { 	//패널 1번과 2번 변경 후 재설정
 
        if (panelName.equals("panel01")) {	//패널 이름에 panel01이 왔으면
            getContentPane().removeAll();	//이미 그려진 패널에서 전부 지우고
            getContentPane().add(jpanel01);	//jpanel01을 add한 후 
            revalidate();					//아마 이 revalidate 와 repaint는 확인하고 화면에 다시 뿌려주는 역할인 것 같다.
            repaint();						//나중에 배우게 되면 그때 확실하게 이해하는 걸로.
        } else {
            getContentPane().removeAll();	//위와 동일하다.
            getContentPane().add(jpanel02);
            revalidate();
            repaint();
        }
    }
 
}
 
public class Example2 {
    public static void main(String[] args) {
 
        JPanelTest win = new JPanelTest();	//패널 2개를 컨트롤 하기 위한 클래스. 근데 사실 뜯어보면 패널 2개를 지니고 change 해주는 함수가 있을 뿐이다.
 
        win.setTitle("frame test");			//패널 타이틀
        win.jpanel01 = new JPanel01(win);	//컨트롤 할 패널1 생성 및 할당
        win.jpanel02 = new JPanel02(win);	//컨트롤 할 패널2 생성 및 할당
 
        win.add(win.jpanel01);				//생성한 패널은 frame에 할당
        win.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);	//x버튼을 누르면 프로그램을 종료 해줌.(안하면 x를 눌러서 창은 없어져도 실제 프로그램은 계속 돌아간다.
        win.setSize(300, 300);				//프레임 사이즈
        win.setVisible(true);				//프레임 활성화(보이도록
    }
}

```
앞으로 할 개인프로젝트를 위해서 자바 스윙을 한번 다뤄보기로 했다. 다루면서 느낀 건 참.. window api 다루는 느낌하고 비슷하다는 것이다.
현재 시점에서 사용하기에는 뭔가 되게 불필요하게 자잘자잘한 설정들이 많다.
복붙해서 가져온 코드이기는 하지만 내용이 거의 이해하기 쉬운 수준이다. 아직 자바에 익숙하지 않아서 class 다루는 거나, 상속, 파일 나눠서 코딩하는 부분을
하나도 몰라서 계속 좀 봐야겠다.
일부러 공부하려고 주석 한줄한줄 다 달아봤다. 진짜 다행히도 이해 안되는 코드가 없어서 좋았다. ㅠㅠ



<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
