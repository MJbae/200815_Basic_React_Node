const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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
  } else {
    next();
  }
});

// TODO: comparePassword, isMatch 탐구(User.js <-> index.js)
userSchema.methods.comparePassword = function (plainPassword, callback) {
  // 사용자에 의해 입력된 비밀번호와 DB내 hashed 비밀번호간 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  var user = this;

  // jsonwebtoken 활용 token 생성
  // sign의 인자로 plain object로 만들기 위해 toHexString 붙임??
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  // schema token 필드에 삽입
  user.token = token;

  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

// model: Schema를 감싸서 관리
const User = mongoose.model("User", userSchema);

// User model export
module.exports = { User };
