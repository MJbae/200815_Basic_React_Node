const mongoose = require("mongoose");

// Schema: 테이블 각 속성을 정의함
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // space 제거
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // 관리자(1)와 일반유저(0) 구분
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  // 데이터 유효성 관리
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// model: Schema를 감싸서 관리
const User = mongoose.model("User", userSchema);

// User model export
module.exports = { User };
