const express = require("express");
const app = express();
const port = 3000;

// mongoose 활용 mongo db 연결
const mongoose = require("mongoose");
// 에러방지 목적으로 connect의 두번째 인자로 객체 전달
mongoose
  .connect(
    "mongodb+srv://manjin:abcd1234@boilerplate.dq0kk.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  // 정상 연결시 아래와 같은 log 발생
  .then(() => console.log("MongoDB Connected..."))
  // 비정상 연결 시 erro 발생
  .catch((err) => console.log);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
