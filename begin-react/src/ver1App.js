import React, { useState, useRef, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

/**
 * 코드의 흐름순서
 * 1. inputs/users init state(useState 사용)
 * 2. onChange 정의
 *  -> 기존 inputs 복사 및 e.target.name 지정에 따른 value 수정
 * 3. onCreate 정의
 *  -> useRef 객체 생성 / use 객체 생성 / 기존 객체 복사 및 use 더하기 / setInputs 초기화
 * 4. onRemove 정의
 * 5. onToggle 정의
 * 6. return 정의
 *  -> CreateUser 및 UserList 호출에 따른 변수 및 함수 전달
 */

function countActiveUsers(users) {
  return users.filter((user) => user.active).length;
}

function App() {
  // inputs init state
  // 배열과 객체를 구분하여 destructure 할 것
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  // users init state
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: true,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);

  // destructure inputs
  const { username, email } = inputs;

  // onChange: inputs 상태 관리, inputs 기존 객체 복사 후 새로 입력된 값 추가
  const onChange = useCallback(
    (e) => {
      const nextInputs = {
        //TODO: 이하와 같은 문제
        ...inputs,
      };
      nextInputs[e.target.name] = e.target.value;
      setInputs(nextInputs);
    },
    [inputs]
  );

  // useRef 객체 생성
  const nextId = useRef(4);
  // onCreate: 입력값으로 user 객체 content 생성 후 기존 객체에 추가, input 값 설정
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      // TODO: 풀어쓰면? ...inputs 외에 inputs.username inputs.email 쓰면 왜 안될까?
      ...inputs,
    };
    // users state update
    setUsers([...users, user]);
    // inputs state update(-> init)
    setInputs({
      ...inputs,
    });
    nextId.current += 1;
  }, [users, inputs]);

  const onRemove = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수: {count}</div>
    </>
  );
}

export default App;
