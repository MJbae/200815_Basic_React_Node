import { combineReducers } from "redux";
import user from "./user_reducer";

// 여러 reducer를 combine해서 관리 편의 높아짐
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
