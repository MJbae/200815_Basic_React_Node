// 필요한 모듈 사용
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const connect = mongoose
  .connect(
    "mongodb+srv://manjin:abcd1234@boilerplate.dq0kk.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const { Todos } = require("./models/Todos");

// express server 생성
const app = express();
// json 형태 요청에 대해 파싱 가능
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.status(200).send("good");
});

// client의 입력값을 DB에 저장
app.post("/api/inputTodos", function (req, res) {
  const todo = new Todos(req.body);

  todo.save((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// DB data를 client에 보내서 출력
app.get("/api/printTodos", function (req, res) {
  Todos.find({}, function (err, result) {
    if (err) return res.status(400).send(err);
    res.status(200).send(result);
  });
});

// todos 모두 삭제
app.get("/api/removeTodos", function (req, res) {
  Todos.remove({}, function (err, result) {
    if (err) return res.status(400).send(err);
    res.status(200).send(result);
  });
});

// 5000포트 사용하여 app 시작
app.listen(5000, () => {
  console.log("app start at 5000 port");
});
