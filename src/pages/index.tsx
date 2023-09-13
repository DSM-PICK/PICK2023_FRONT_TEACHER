import styled from "@emotion/styled";
import background from "../assets/login/background.png";
import Input from "@/components/common/input";
import { Button, Body1 } from "@semicolondsm/ui";
import { useState } from "react";
import { NextPage } from "next";
import cookies from "react-cookies";
import { userLogin } from "@/utils/api/login";
import { useApiError } from "@/hooks/useApiError";
import { useQuery } from "react-query";
import { getTodaySelfStudyTeacher } from "@/utils/api/selfStudy";

const Home: NextPage = () => {
  const { mutate: loginMutate, isLoading } = userLogin();

  const [loginData, setLoginData] = useState({
    account_id: "",
    password: "",
  });

  const { handleError } = useApiError();
  const { data } = useQuery("postlist", () => getTodaySelfStudyTeacher(), {
    onError: handleError,
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
          <MainWrapper>
            <MainTitle>오늘의 자습감독</MainTitle>
            <MainContainer>
              <Body1 color="black">2층 {data?.second_floor!}선생님</Body1>
              <Body1 color="black">3층 {data?.third_floor!}선생님</Body1>
              <Body1 color="black">4층 {data?.fourth_floor!}선생님</Body1>
            </MainContainer>
          </MainWrapper>
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
            type="text"
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
            type="password"
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
    margin-bottom: 20px;
  }
`;

const LoginButton = styled(Button)`
  border-radius: 12px;
  margin-top: 30px;
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray900};
  margin-left: 8px;
  margin-bottom: 8px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 144px;
  padding: 20px;
  border: none;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray50};
  gap: 16px;

  > p {
    font-weight: 400;
  }
`;

export default Home;
