import styled from "@emotion/styled";
import { setBackgroundColor, setConfirmState } from "@/store/confirmSlice";
import { useDispatch } from "react-redux";

interface Props {
  type: "list" | "accept";
  text1: string;
  text2: string;
}

const ConfirmBox = ({ text1, text2, type }: Props) => {
  const dispatch = useDispatch();

  let btnText;
  if (type === "list") {
    btnText = "확인하기";
  } else {
    btnText = "수락하기";
  }

  const onClickNextTime = () => {
    dispatch(setBackgroundColor({ backgroundColor: false }));
    dispatch(setConfirmState({ setConfirmState: false }));
  };

  return (
    <>
      <Background />
      <Wrapper>
        <TextContainer>
          <p>{text1}</p>
          <p>{text2}</p>
        </TextContainer>
        <ButtonContainer>
          <GrayButton onClick={onClickNextTime}>
            <p>다음에 하기</p>
          </GrayButton>
          <PurpleButton>
            <p>{btnText}</p>
          </PurpleButton>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(33, 33, 33, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 220px;
  width: 296px;
  height: 168px;
  border-radius: 12px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  > p {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const ButtonContainer = styled.div`
  width: 256px;
  height: 52px;
  display: flex;
  justify-content: space-between;
`;

const GrayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 122px;
  height: 52px;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray50};

  > p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

const PurpleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 122px;
  height: 52px;
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.purple400};

  > p {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default ConfirmBox;
