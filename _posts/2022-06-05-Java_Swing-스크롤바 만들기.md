---
title:  "[Java Swing] 스크롤바 만들기" 

categories:
  - Java
tags:
  - [Java, Algorithm]

toc: true
toc_sticky: true

date: 2022-06-05
last_modified_at: 2022-06-05
---


# 스크롤바 만들기

todolist라는 것은 보통 사용자가 추가해서 만드는 것이 보통이기 때문에 스크롤바가 거의 필수적으로 필요하다. 내가 사용한 todolist 프로그램이나 앱 중에서 개수 제한 있는 것은 본적이 없으니까 말이다.
그래서 역시나 우리의 친구 구글에서 열심히 java swing scrollbar, java swing panel scrollable 등등 검색했다. 한가지 방법이 아니라 꽤 여러가지 방법이 나와서 몇가지 해봤는데
그 중에서 약간 수정하니 현재 내가 쓰고 있는 부분을 만들 수 있었다.

혹시 모르니 그냥 .java 파일 통으로 가져왔다.
여기서 실제로 만드는 부분은 scrollPanelCreate 메서드가 거의 전부이다.

```java
package com.ToDoList;


import java.awt.Dimension;
import java.awt.FlowLayout;
import java.util.ArrayList;

import javax.swing.BoxLayout;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.ScrollPaneConstants;

public class Home_Panel extends JPanel{

	ArrayList<IndicateOneToDo_Panel> ip = new ArrayList<>();
	JPanel scrollPanel;
	Main_Frame mainFrame;
	
	// 체크박스와 버튼을 하나의 패널로
	public Home_Panel(Main_Frame mainFrame)  {
		this.mainFrame = mainFrame;
		this.setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
		
		
		scrollPanelCreate();
		
	}
	
	void scrollPanelCreate(){
		scrollPanel = new JPanel();
		scrollPanel.setPreferredSize(new Dimension( 437,30));
		scrollPanel.setLayout(new FlowLayout(FlowLayout.LEFT, 3, 5));
		JScrollPane scrollFrame = new JScrollPane(scrollPanel);
		scrollFrame.getVerticalScrollBar().setUnitIncrement(16);
		scrollFrame.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);
		scrollFrame.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		scrollPanel.setAutoscrolls(true);
		scrollFrame.setPreferredSize(new Dimension(800,540));
		this.add(scrollFrame);
	}

	public void addToDoList(ToDoList_Object tdo)
	{
		IndicateOneToDo_Panel local_iotdp = new IndicateOneToDo_Panel(tdo);
		ip.add(local_iotdp);
		scrollPanel.add(local_iotdp);
		scrollPanel.setPreferredSize(new Dimension( 437,30 + ip.size() * 57));
		System.out.println(ip.size());
		this.revalidate();
	}
	
}

```

# 코드 구현 설명
```java
void scrollPanelCreate(){
		scrollPanel = new JPanel(); //스크롤을 구현하려면 역
		scrollPanel.setPreferredSize(new Dimension( 437,30)); //layout관리자를 쓸 때는 거의 setSize가 먹히지 않기 때문에(물론 이 pre도 다 먹히는 것은 아니다.)setLayout(null)이 아니라면 이 메서드를 써야 크기 조정이 가능하다.
		scrollPanel.setLayout(new FlowLayout(FlowLayout.LEFT, 3, 5)); //flowlayout의 정렬과 위 아래 gap을 설정해주었다. flowlayout는 기본 레이아웃이지만 gap이 5, 5라서 3, 5로 바꿔주기 위해서 사용했다.
		JScrollPane scrollFrame = new JScrollPane(scrollPanel);       //스크롤 패널인데 이것을 구현하기 위해서는 스크롤을 사용할 수 있는 기본 panel이 매개변수로 꼭 필요하다.
		scrollFrame.getVerticalScrollBar().setUnitIncrement(16);      //휠로 스크롤을 움직일때의 속도이다. 숫자가 크면 휠 속도가 빨라진다.
		scrollFrame.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED); //세로 스크롤이 언제 나올지 결정해주는 메서드이다. 현재는 필요할때만(즉 패널을 넘어설때만) 나오게 되어있다.
		scrollFrame.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER); //위와 반대로 가로 스크롤을 지정해주는 것이고, NEVER는 나오지 않게 해주는 것이다.
		scrollPanel.setAutoscrolls(true);   //코드 보면 스크롤을 가능하게 해준다는 것 같은데 false나 주석처리 안해도 스크롤은 잘 작동한다. 검색해도 정확한 게 안나오고, 문서 봐도 잘 이해가 안간다..(영어라서 해석을 못하는 것도 있지만)
		scrollFrame.setPreferredSize(new Dimension(800,540)); //위와 마찬가지로 layout관리자를 사용하면 setSize가 안먹히기 때문에 크기 조절을 위해서 사용한다.
		this.add(scrollFrame);  //이 부분이 어찌보면 제일 중요한데, 위에서 만든 JPanel과 JScrollPane을 합쳐서 add해준다. add는 패널도 가능하고 frame도 가능하다. 내가 사용할 패널이나 프레임에 붙이면된다.
	}
```


# 스크롤 보이기 세부 설명

```java
  scrollFrame.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED); 
	scrollFrame.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
```

구현설명에서 설명했지만 그림으로 보여주면 이해가 빠를 것 같아서 첨부.

![스크롤 나오기 전](https://user-images.githubusercontent.com/25880465/172065829-9ceaeaca-6824-4aeb-aa2e-b1a28d9e3042.png){: width="50%" height="50%"0}{: .left}

위 사진은 아직 요소의 범위가 패널을 넘어가지 않았기 때문에 필요할때만 나오라는 VERTICAL_SCROLLBAR_AS_NEEDED 조건에 맞게 스크롤바가 보이지 않는다.

![스크롤 나온 후](https://user-images.githubusercontent.com/25880465/172065827-afe590f0-352a-4250-9b70-479637544115.png){: width="50%" height="50%"0}{: .left}

위 사진은 요소가 패널을 넘어서서 스크롤이 나온 것이다.


# 간단한 Layout 설명

![boxlayout 2개 추가](https://user-images.githubusercontent.com/25880465/172065841-e3e8c71b-cf62-41b5-ad77-3fe422f30b34.png){: width="50%" height="50%"0}{: .left}

boxlayout을 사용하고 요소 2개를 추가 한 상황이다. 패널 전체를 2개의 요소가 차지하고 있다. 물론 일정 갯수가 넘어가면 더 이상은 크기가 줄어들지 않고 일정 크기로 스크롤이 가능하지만 너무 이상해서 일단은 사용보류 했다.
아마 크기를 고정하는 메서드가 있을텐데 찾지 못해서 flowlayout을 사용 중이다.

![flowlayout 2개 추가](https://user-images.githubusercontent.com/25880465/172065843-0c819d4c-b13e-481e-9c10-62653c8e896d.png){: width="50%" height="50%"0}{: .left}

위와 동일하게 요소 2개를 추가 했을 때 flowlayout이다. boxlayout을 Y축으로 주었을 때 내가 얻고자 하는 모양이 이런건데 잘 안된다. 물론 현재 코드의 문제점은 가로가 넓어지면 flowlayout은 가로부터 채우기 때문에
옆으로 요소가 배치된다. 다만 난 resize를 막아놓고 현재 크기로만 만들 것이기 때문에 이러한 사용이 가능했다.







스크롤바는 나중에도 잘 써먹을 수 있을 것 같다. 그리고 다른 scrollbar 구현도 있으니, 다음에는 다른 구현으로도 시도해보자.


<br>



<!-- [맨 위](#){: .btn .btn--primary }{: .align-right} 스크롤시 자동으로 up to 화살표가 나오므로 삭제 -->
