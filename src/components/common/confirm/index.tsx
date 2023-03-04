import styled from "@emotion/styled";
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
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  end_period: number;
}

const ConfirmBox = ({
  text,
  type,
  student_id,
  end_period,
  student_id_array,
  setOpenModal,
}: Props) => {
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
    setOpenModal(false);
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
      setOpenModal(false);
    } else {
      patchOutingApplyList();
      setOpenModal(false);
    }
  };

  return (
    <ModalWrapper>
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
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(33, 33, 33, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101 !important;
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
