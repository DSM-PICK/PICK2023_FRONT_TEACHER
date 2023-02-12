import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@semicolondsm/ui";
import ConfirmBox from "@/components/common/confirm";
import { setBackgroundColor, setConfirmState } from "@/store/createSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { OutingStudentListType } from "@/models/outing/response";

const StudentBlock = (props: OutingStudentListType) => {
  const { end_time, student_id, student_name, student_number } = props;
  const dispatch = useDispatch();

  const confirmState = useSelector(
    (state: RootState) => state.counter.initalState.setConfirmState
  );

  const onClickReturn = () => {
    dispatch(setConfirmState({ setConfirmState: true }));
    dispatch(setBackgroundColor({ backgroundColor: true }));
  };

  return (
    <Wrapper>
      <TextContainer>
        <p>{student_number + " " + student_name}</p>
        <p>{end_time} 도착 예정</p>
      </TextContainer>
      <StyledButton size="sm" fill={"purple"} onClick={onClickReturn}>
        복귀
      </StyledButton>
      {confirmState && (
        <ConfirmBox
          text={student_number + " " + student_name + "의"}
          type="list"
        />
      )}
    </Wrapper>
  );
};

export default StudentBlock;

const Wrapper = styled.div`
  padding: 0 16px;
  width: 100%;
  height: 56px;
  background: ${({ theme }) => theme.colors.gray50};
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-radius: 12px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  font-family: "Noto Sans KR";
`;

const TextContainer = styled.div`
  width: 206px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
`;
