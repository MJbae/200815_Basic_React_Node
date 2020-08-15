// DB key를 가져올 때, 개발환경이 Local일 경우 ./dev에서, Production인 경우 ./prod에서

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
