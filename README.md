# ALGO111


## Introduction

ALGO111는 '하루 한 시간 한 문제' 알고리즘 문제를 푸는 웹 어플리케이션입니다.

<https://www.algo111.online/>

![](https://algo111.s3.ap-northeast-2.amazonaws.com/readme.gif)

## Content

* Requirements
* Installation
* Features
* Skills
* Tests
* Deployment & Continuous Integration
* Project management
* Things To Do

## Requirements
* 1024px 이상의 큰 브라우저 환경에서 실행해야 합니다.
* 구글 계정이 필요한 서비스입니다.
* 브라우저는 최신 버전 크롭을 사용해야 합니다.

## Installation

### Client
<pre>
git clone https://github.com/wooder2050/algo111-client.git
cd algo111-client
npm install
npm start
</pre>

### Client
<pre>
git clone https://github.com/wooder2050/algo111-server.git
cd algo111-server
npm install
npm start
</pre>

## Features

* auth0를 이용한 소셜 로그인 구현(구글)
* JSON Web Token Authentication 
* CodeMirror를 이용해서 코드 작성 기능 구현
* 작성된 JavaScript 코드 채점 기능
* 문제 풀이 시간과 시도 횟수 제한 기능
* 레벨 별 알고리즘 문제 접근 기능
* 풀이한 코드 다시 보기 가능
* 유저 랭킹 Top 10 보기 

## Skills

### Client
* ES2015+
* React
* React Router
* Redux 
* auth0 Authentication
* Sass

### Server
* Node.js
* Express
* ES2015+
* VM (Executing JavaScript)
* MongoDB
* Mongoose
* Atlas

## Test

* PropTypes
* Unit Test (Jest)
* Component Unit Test (Jest, Enzyme)
* cypress E2E test 

[![Video Label](http://img.youtube.com/vi/tAtuviDDGuc/0.jpg)](https://www.youtube.com/watch?v=tAtuviDDGuc)

## Deployment & Continuous Integration

### Client
* Netlify 를 통해 배포 자동화

### Server
* AWS Elastic beanstalk를 통해 서비스 배포
* CircleCI를 통한 배포 자동화

## Project management
* Git, Github
* Trello를 이용한 일정관리

## Challenges
* 알고리즘 문제를 푸는 권한을 제한하는 방법에 있어서 많은 어려움을 겪었습니다. 처음에는 시간을 한 시간으로 제한하는 방식으로 접근해서 'Window.localStorage'에 시간을 저장해 관리했습니다. 하지만 state, props와 별개로 시간을 관리하다 보니, 상태 관리가 제대로 되지 않았습니다. 그래서 '한 번 시도할 때 한 시간, 시도는 다섯 번'으로 제한 방식을 바뀌었습니다. 프로젝트가 끝난 후 시간 관리를 socket.io를 활용해 서버와 Datebase에서 입력하는 아이디어를 제한 받았습니다. 다음 번에 시간을 관리하는 프로젝트를 개발할 기회가 생긴다면 socket.io를 활용해 구현해보고 싶습니다.

* Jest, Enzyme 를 이용해 Component Unit Test를 하고 Cypress.io를 활용해 E2E test를 진행했습니다. test를 작성하면서 구현 단계에서 발견하지 못했던 많은 에러를 찾게 되었고 수정했습니다. test를 작성한 후에도 추가적인 기능을 구현하였는데 테스트 덕분에 예측하지 못했던 에러를 바로 찾을 수 있어서 좋았지만 추가적인 기능 구현을 할 때 더 많은 사항을 고려하게 되었습니다. 이번 프로젝트를 초반부터 테스트 기반의 개발을 하지 못해서 많은 아쉬움이 남았습니다. 다음 프로젝트에는 초기 단계부터 테스트를 작성해 테스트 기반의 개발을 할 것입니다.

* Client는 Netlify를 통해 배포를 하고 Server는 AWS Elastic beanstalk와 CircleCI를 통해서 배포하였습니다. 배포할 때 http와 https에 대한 이해 부족으로 인해 많은 어려움을 겪었습니다. 도메인을 구해서 Client 주소를 https로 변경하였고 서버 또한 도메인을 구매한 서비스에서 "api."를 추가한 url를 설정하여 배포에 성공하였습니다. http와 aws 배포 환경에 대한 이해를 더 높이고 싶습니다.


## Things To Do
* 알고리즘 시간복잡도와 공간복잡도 측정
* 한 문제에 제출한 코드 히스토리 만들기
* 문제 해결한 유저끼리 정답을 공유하는 기능
* 문제 만들기 기능 

