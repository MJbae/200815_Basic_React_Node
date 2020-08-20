import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

// Redux 활용 step 2: request(-> server) 코드 생성 후, type과 함께 객체 형태 action 반환(-> reducer)
export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
