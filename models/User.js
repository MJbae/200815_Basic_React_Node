const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

// userSchema가 save 메소드 호출 전 아래와 같은 함수를 실행함
// pre는 mongoDB에서 지원하는 기능
userSchema.pre("save", function (next) {
  // TODO: var 대체하자
  let user = this;

  // userSchema 내 여러 필드 중 password 필드가 변경될 때만 아래와 같이 비밀번호 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // error 발생 시, next 실행(=save 함수로 이동)
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
  next();
});

// model: Schema를 감싸서 관리
const User = mongoose.model("User", userSchema);

// User model export
module.exports = { User };
