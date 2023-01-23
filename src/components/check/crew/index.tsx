import styled from "@emotion/styled";
import { Body1, Button } from "@semicolondsm/ui";
import { useRouter } from "next/router";

const Check = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <TitleContainer>
        <TitleText>출석 확인 </TitleText>
        <LayerText> - 3층</LayerText>
      </TitleContainer>
      <MainContainer>
        <TextBtn fullWidth>세미나실 3-1(시나브로) </TextBtn>
        <TextBtn fullWidth>세미나실 3-2(GRAM)</TextBtn>
        <TextBtn fullWidth>세미나실 3-3(NS hub)</TextBtn>
        <TextBtn fullWidth>세미나실 3-4(코도모)</TextBtn>
        <TextBtn fullWidth>보안 1실(DMS)</TextBtn>
        <TextBtn fullWidth>보안 2실(INFO)</TextBtn>
      </MainContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px 0 16px;
  margin-top: 84px;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  > div {
    display: flex;
    line-height: 28px;
  }
`;

const TitleText = styled.div`
  font-weight: 500;
  font-size: 20px;
`;
const LayerText = styled.div`
  margin-left: 5px;
  font-weight: 500;
  font-size: 20px;
`;

const MainContainer = styled.div``;

const TextBtn = styled(Button)`
  height: 52px;
  margin-bottom: 12px;
  border-radius: 12px;
  > div {
    font-size: 16px;
    font-weight: 500;
  }
`;

export default Check;
