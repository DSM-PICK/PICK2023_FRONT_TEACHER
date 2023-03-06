import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@semicolondsm/ui";
import ConfirmBox from "@/components/common/confirm";
import { OutingStudentListType } from "@/models/outing/response";

const StudentBlock = (props: OutingStudentListType) => {
  const { end_time, student_id, student_name, student_number } = props;
  const [period, setPeriod] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickReturn = () => {
    setIsOpen(true);
  };

  // 외출 시간 받은 후 몇교시에 복귀했는지 계산하는 로직
  useEffect(() => {
    setPeriod(0);
    const date = new Date();
    const month = date.getMonth().toString();
    const day = date.getDay().toString();
    const year = date.getFullYear().toString();
    const today = year + "/" + month.padStart(2, "0");
    +"/" + day.padStart(2, "0");
    const dateA = new Date(today + " 17:30:00");
    const diffMSec = date.getTime() - dateA.getTime();
    const diffMin = diffMSec * (1 / (60 * 1000));

    if (diffMin <= 130) {
      setPeriod(9);
    } else if (diffMin > 130) {
      setPeriod(10);
    } else {
      setPeriod(8);
    }
  }, [isOpen]);

  return (
    <Wrapper>
      <TextContainer>
        <p>{student_number + " " + student_name}</p>
        <p>{end_time} 도착 예정</p>
      </TextContainer>
      <StyledButton size="sm" fill={"purple"} onClick={onClickReturn}>
        복귀
      </StyledButton>
      {isOpen && (
        <ConfirmBox
          setOpenModal={setIsOpen}
          student_id_array={[]} // 외출 복귀 수락/거절 때 사용... 추후 리펙토링 예정
          student_id={student_id}
          end_period={period}
          text={student_number + " " + student_name + " " + "학생의"}
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
