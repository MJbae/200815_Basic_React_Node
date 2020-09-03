const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(bodyParser.json());

// DB list 테이블 생성
// db.pool.query(
//   `CREATE TABLE lists (
//   id INTEGER AUTO_INCREMENT,
//   value TEXT,
//   PRIMARY KEY (id)
// )`,
//   (err, results, fileds) => {
//     console.log("results", results);
//   }
// );

// DB lists 테이블에 있는 모든 데이터를 프런트 서버에 전송
app.get("/api/values", function (req, res) {
  //데이테베이스에서 모든 정보 가져오기
  console.log("11");
  db.pool.query("SELECT * FROM lists;", (err, results, fileds) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

// 클라이언트 입력 값을 DB lists 테이블에 삽입
app.post("/api/value", function (req, res, next) {
  //데이터베이스에 값 넣어주기
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fileds) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log("app start with 5000 port");
});
