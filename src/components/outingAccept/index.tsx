import styled from "@emotion/styled";
import { Select } from "@semicolondsm/ui";
import { useState } from "react";

const OutingAccept = () => {
  const [gradeNum, setGradeNum] = useState<string>("학년");
  const [classNum, setClassNum] = useState<string>("반");
  const gradeNumArr = ["1학년", "2학년", "3학년"];
  const classNumArr = ["1반", "2반", "3반", "4반"];

  const outingRequestList = [
    {
      name: "2101 강석현",
      time: "16:30 ~ 18:30",
      reason: "저 꼬리뼈 다쳐서 정형외과 다녀와야할 것 같아요 보내주세요 찡찡",
      id: 1,
    },
    {
      name: "2102 김경호",
      time: "16:30 ~ 19:30",
      reason: "저 안경이 부러졌어요",
      id: 2,
    },
    {
      name: "2106 김의찬",
      time: "16:30 ~ 20:30",
      reason: "이유가 없습니다.",
      id: 3,
    },
    {
      name: "2110 문정민",
      time: "16:30 ~ 19:30",
      reason: "이유가 없습니다.",
      id: 4,
    },
    {
      name: "2120 추혜연",
      time: "16:30 ~ 20:00",
      reason: "이유가 없습니다.",
      id: 5,
    },
  ];
  const [outingSelectList, setOutingSelectList] = useState<number[]>([]);
  const isClick = outingSelectList.length > 0;

  const click = (studentId: number) => {
    const isIncludes = outingSelectList.find((id: number) => id === studentId);

    if (isIncludes) {
      setOutingSelectList(
        outingSelectList.filter((id: number) => id !== studentId)
      );
    } else {
      setOutingSelectList([...outingSelectList, studentId]);
    }
  };

  return (
    <Wrapper>
      <Title>외출 신청 수락</Title>
      <Header>
        <Btns>
          {/* <SelectBox
            items={gradeNumArr}
            placeholder={gradeNum}
            onChange={setGradeNum}
          />
          <SelectBox
            items={classNumArr}
            placeholder={classNum}
            onChange={setClassNum}
          /> */}
          <S1 />
          <S2 />
          {/* 기존 셀렉트박스의 사이즈 조절이 안 돼서 임시로 만들어놓은 S1, S2 */}
        </Btns>
        <Btns>
          <AcceptButton isClick={isClick}>거절</AcceptButton>
          <RejectButton isClick={isClick}>수락</RejectButton>
        </Btns>
      </Header>
      <List>
        {outingRequestList.map((student) => (
          <StudentBox
            onClick={() => click(student.id)}
            isClick={outingSelectList.includes(student.id)}
          >
            <Student>
              <Name>{student.name}</Name>
              <Time>{student.time}</Time>
            </Student>
            {outingSelectList.includes(student.id) && (
              <Reason>{student.reason}</Reason>
            )}
          </StudentBox>
        ))}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 38px 16px 0 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.div`
  display: flex;
  margin-top: 18px;
  justify-content: space-between;
`;

const Btns = styled.div`
  display: flex;
  gap: 8px;
`;

const SelectBox = styled(Select)`
  height: 32px;
  border-radius: 16px;
`;

const AcceptButton = styled.button<{ isClick: boolean }>`
  width: 58px;
  height: 32px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  border: none;
  background-color: ${({ theme, isClick }) =>
    isClick ? theme.colors.red400 : theme.colors.red50};
`;

const RejectButton = styled.button<{ isClick: boolean }>`
  width: 58px;
  height: 32px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  border: none;
  background-color: ${({ theme, isClick }) =>
    isClick ? theme.colors.purple400 : theme.colors.purple50};
`;

const S1 = styled.div`
  width: 74px;
  height: 32px;
  background-color: lightgray;
  border-radius: 16px;
`;

const S2 = styled.div`
  width: 61px;
  height: 32px;
  background-color: lightgray;
  border-radius: 16px;
`;

const List = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  gap: 8px;
`;

const StudentBox = styled.div<{ isClick: boolean }>`
  width: 91vw;
  min-height: 56px;
  border-radius: 12px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isClick }) =>
    isClick ? theme.colors.purple50 : theme.colors.gray50};
`;

const Student = styled.div`
  display: flex;
  width: calc(91vw - 32px);
  justify-content: space-between;
  margin: 20px;
`;

const Name = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  line-height: 24px;
`;

const Time = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  line-height: 24px;
`;

const Reason = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray900};
  width: calc(91vw - 32px);
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
  line-height: 24px;
`;

export default OutingAccept;
