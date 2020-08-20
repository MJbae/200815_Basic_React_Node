import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

// option 설명
// null: 아무나 출입 가능, true: only 로그인 유저 출입 가능, false: 로그인 유저 출입 X

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
