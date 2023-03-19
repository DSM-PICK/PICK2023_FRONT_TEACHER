import styled from "@emotion/styled";
import background from "../assets/login/background.png";
import Input from "@/components/common/input";
import { Button } from "@semicolondsm/ui";
import { useState } from "react";
import { NextPage } from "next";
import cookies from "react-cookies";
import { userLogin } from "@/utils/api/login";

const Home: NextPage = () => {
  const { mutate: loginMutate, isLoading } = userLogin();

  const [loginData, setLoginData] = useState({
    account_id: "",
    password: "",
  });

  const onClickLogin = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    loginMutate(loginData);
    setLoginData({ account_id: "", password: "" });
  };

  return (
    <LoginContainer>
      <LoginWrapper
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputContainer>
          <p>로그인</p>
          <Input
            placeholder="아이디를 입력하세요"
            name="account_id"
            value={loginData.account_id}
            onChange={(e) =>
              setLoginData((state) => ({
                ...state,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Input
            placeholder="비밀번호를 입력하세요"
            name="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((state) => ({
                ...state,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </InputContainer>
        <LoginButton
          loading={isLoading}
          fullWidth
          fill="purple"
          onClick={onClickLogin}
        >
          로그인
        </LoginButton>
      </LoginWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100vh;
  justify-content: center;
  background-image: url(${background.src});
  background-size: cover;
`;

const LoginWrapper = styled.form`
  width: 100%;
  height: 100%;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  > p {
    font-size: 24px;
    margin-bottom: 75px;
  }
`;

const LoginButton = styled(Button)`
  border-radius: 12px;
  margin-top: 30px;
`;

export default Home;
