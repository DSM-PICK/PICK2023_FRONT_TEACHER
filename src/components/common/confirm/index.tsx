import styled from "@emotion/styled";
import { setBackgroundColor, setConfirmState } from "@/store/createSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import {
  patchOutingStudentState,
  patchOutingRejectAccept,
} from "@/utils/api/outing";

interface Props {
  type: "list" | "accept";
  text: string;
  student_id: string;
  student_id_array: string[];
  end_period: number;
}

const ConfirmBox = ({
  text,
  type,
  student_id,
  end_period,
  student_id_array,
}: Props) => {
  const dispatch = useDispatch();

  let finishText;
  let btnText;
  if (type === "list") {
    btnText = "확인하기";
    finishText = "외출이 끝나게 됩니다.";
  } else {
    btnText = "수락하기";
    finishText = "외출을 허가합니다.";
  }

  const onClickNextTime = () => {
    dispatch(setBackgroundColor({ backgroundColor: false }));
    dispatch(setConfirmState({ setConfirmState: false }));
  };

  const queryClient = useQueryClient();
  const { mutate: patchOutingStudent } = useMutation(
    () => patchOutingStudentState(student_id, end_period),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("outing");
      },
    }
  );

  const { mutate: patchOutingApplyList } = useMutation(
    () => patchOutingRejectAccept("PICNIC", student_id_array),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("applyList");
      },
    }
  );

  const onClickAction = (type: string) => {
    if (type === "list") {
      patchOutingStudent();
      dispatch(setConfirmState({ setConfirmState: false }));
      dispatch(setBackgroundColor({ backgroundColor: false }));
    } else {
      patchOutingApplyList();
      dispatch(setConfirmState({ setConfirmState: false }));
      dispatch(setBackgroundColor({ backgroundColor: false }));
    }
  };

  return (
    <>
      <Background />
      <Wrapper>
        <TextContainer>
          <p>{text}</p>
          <p>{finishText}</p>
        </TextContainer>
        <ButtonContainer>
          <GrayButton onClick={onClickNextTime}>
            <p>다음에 하기</p>
          </GrayButton>
          <PurpleButton onClick={() => onClickAction(type)}>
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
  background-color: rgba(33, 33, 33, 0.1);
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

  :active {
    opacity: 0.6;
  }

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

  :active {
    opacity: 0.6;
  }

  > p {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default ConfirmBox;
