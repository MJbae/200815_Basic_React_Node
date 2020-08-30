# base image
FROM node:10

WORKDIR /usr/src/app

# COPY 명령어로 현재 폴더  내 모든 파일(./ ./)을 HD로 전달
# 기본 이미지로는 Dockerfile 내 참조하려는 파일(package.json, server.js)이 HD 내 전달 X
COPY ./ ./

# express 모듈을 사용하기 위해 npm install로 관련 모듈 설치 필요
RUN npm install

# server.js 실행
CMD ["node", "server.js"]