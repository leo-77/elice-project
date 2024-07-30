1. 개요
  Next.js, React를 사용하여 개발한 Elice 프로젝트

2. 주요 기능
  * 검색 및 필터링
  * 페이지네이션
  * 강좌 카드

3. 설치 및 실행
  * Node.js(v14 이상)
  * npm 또는 yarn
  * 설치
    > 프로젝트 클론
     - git clone https://github.com/leo-77/elice-project.git  
     - cd elice-project
    > 패키지 설치
     - npm install (또는 yarn install)
    > 개발 서버 실행
     - npm run dev (또는 yarn dev)
    > 확인
     - http://localhost:3000 으로 결과 확인
    > 빌드 및 배포
     - npm run build (또는 yarn build)
     - npm start (yarn start)
     
4. 과제해결 방식
  * 기본 요구사항을 기반으로 개발 환경설정
  * https://academy.elice.io/edu 에 접속 후 큰 영역으로 컴퍼넌트 구성
    > 이후 서비스별 컴퍼넌트로 분할 (처음엔 퍼블리싱을 임으로 작성하다가 오히려 시간이 지체되어 실제 서비스 페이지의 개발자도구를 열어놓고 참고함)
  * api 연동
    > https://api-rest.elice.io/org/academy/course/list/ 를 호출하여 현재 화면에 필요한 프로퍼티만 interface 에 등록 후 화면과 맴핑
  * 검색 기능, 페이징 추가
    > filter 들의 모든 값을 체크하다가 시간이 중도에 포기하고 '가격'부분만 표현
    > 페이징은 실제 서비스 페이지와 똑같은 count를 요구하지 않아 기본요구사항을 기반으로 작업
  * 강좌 영역에 대한 추가 퍼블리싱
    > 색상 및 속성에 대한 프러퍼티를 유추한후 적용
    > '분야' 영역은 뒤늦게 파악하였으나 시간관계상 포기(생략)
  


