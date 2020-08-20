import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  // Redux 활용 step 2: request(-> server) 코드 생성 후, type과 함께 객체 형태 action 반환(-> reducer)
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
