const express = require("express");
const app = express();
const port = 3000;
// mongoDB key 값 불러올 경로 설정
const config = require("./config/key");
const bodyParser = require("body-parser");
const { User } = require("./models/User");

// application/x-www-form-urlencoded 형태의 data를 parser
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 형태 데이터 parser
app.use(bodyParser.json());

// mongoose 활용 mongo db 연결
const mongoose = require("mongoose");
// 에러방지 목적으로 connect의 두번째 인자로 객체 전달
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  // 정상 연결시 아래와 같은 log 발생
  .then(() => console.log("MongoDB Connected..."))
  // 비정상 연결 시 erro 발생
  .catch((err) => console.log);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// 회원가입 시 필요정보를 client에서 받아오면, 데이터베이스에 저장
app.post("/register", (req, res) => {
  // req.body 내부에는 json 형식으로 id, password 등의 회원가입 정보가 저장됨
  // -> bodyParser의 도움으로 json 형식으로 저장됨
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    // status(200): 정상
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  // 1. 요청된 이메일 주소를 DB에서 검색
  User.findOne({ email: req.body.email }, (err, user) => {
    // 요청한 이메일 주소가 없다면
    if (!user) {
      return res.json({
        loginSueccess: false,
        message: "해당하는 이메일이 없습니다.",
      });
    }

    // 2. 요청한 이메일이 DB 내 있다면, 비밀번호 일치여부 확인
    user.comparePassword(req.body.password, (err, inMatch) => {
      if (!isMatch)
        return res.json({
          loginSueccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      // 3. 비밀번호 일치 시 토큰 생성 TODO: 토큰의 데이터 유효성 검사는 ?
      user.generateToken((err, user) => {});
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
