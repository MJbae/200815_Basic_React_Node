import React, { useEffect } from "react";
import axios from "axios";
function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div
      // TODO: 아래 속성 확인하기
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작페이지</h2>
    </div>
  );
}

export default LandingPage;
