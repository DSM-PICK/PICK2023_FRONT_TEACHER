import styled from "@emotion/styled";
import { Body1, Button } from "@semicolondsm/ui";
import { useRouter } from "next/router";

const Start = () => {
  const router = useRouter();

  const onClickStart = () => {
    router.push("/tab");
  };

  return (
    <Wrapper>
      <TitleContainer>
        <TitleText>OOO선생님은</TitleText>
        <div>
          <LayerText>0층</LayerText>
          <TitleText>자습감독입니다.</TitleText>
        </div>
      </TitleContainer>
      <MainWrapper>
        <MainTitle>오늘의 자습감독</MainTitle>
        <MainContainer>
          <Body1 color="black">2층 OOO선생님</Body1>
          <Body1 color="black">3층 OOO선생님</Body1>
          <Body1 color="black">4층 OOO선생님</Body1>
        </MainContainer>
      </MainWrapper>
      <ButtonContainer>
        <StartButton onClick={onClickStart} fullWidth fill="purple">
          서비스 시작하기
        </StartButton>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px 0 16px;
  margin-top: 84px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    display: flex;
    line-height: 40px;
  }
`;

const TitleText = styled.h1`
  font-weight: 500;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.black};
`;

const LayerText = styled.h1`
  margin-right: 8px;
  font-weight: 500;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.purple400};
`;

const MainWrapper = styled.div`
  width: 100%;
  margin-top: 56px;
  display: flex;
  flex-direction: column;
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 88px;
`;

const StartButton = styled(Button)`
  height: 52px;
  border-radius: 12px;
  > div {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Start;