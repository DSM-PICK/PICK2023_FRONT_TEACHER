import styled from "@emotion/styled";
import { Select } from "@semicolondsm/ui";
import { useState } from "react";
import { gradeNumArr, classNumArr } from "./constants";

const OutingAccept = () => {
  const [gradeNum, setGradeNum] = useState<string>("학년");
  const [classNum, setClassNum] = useState<string>("반");
  const [outingSelectList, setOutingSelectList] = useState<number[]>([]);
  const isClick = outingSelectList.length > 0;

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

  const selectBoxClick = (idx: number) => {
    if (isSelectBoxClick === idx) {
      setIsSelectBoxClick(8);
    } else {
      setIsSelectBoxClick(idx);
    }
  };

  return (
    <Wrapper>
      <Title>외출 신청 수락</Title>
      <Header>
        <Btns>
          {selectBoxArr.map((data, idx) => (
            <SelectBoxContainer key={idx}>
              <SelectButton
                width={data.width}
                onClick={() => selectBoxClick(idx)}
              >
                {data.value}
                <Image width={8} height={4} src={dropDown} alt="" />
              </SelectButton>
              {isSelectBoxClick === idx && (
                <SelectList>
                  {data.arr.map((info, idx) => (
                    <span key={idx} onClick={() => onChange(info)}>
                      {info.title}
                    </span>
                  ))}
                </SelectList>
              )}
            </SelectBoxContainer>
          ))}
        </Btns>
        <Btns>
          <AcceptButton isClick={isClick}>거절</AcceptButton>
          <RejectButton isClick={isClick}>수락</RejectButton>
        </Btns>
      </Header>
      <List>
        {outingRequestList.map((student) => (
          <StudentBox
            key={student.name}
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

const SelectBoxContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const SelectButton = styled.button<{ width: string }>`
  width: ${(props) => props.width};
  height: 32px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  border: none;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

const SelectList = styled.div`
  width: 120px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  gap: 20px;
  padding: 16px;
  position: fixed;
  top: 116px;
`;

const List = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  gap: 8px;
`;

const StudentBox = styled.div<{ isClick: boolean }>`
  width: 91vw;
  max-height: ${({ isClick }) => (isClick ? "130px" : "56px")};
  border-radius: 12px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isClick }) =>
    isClick ? theme.colors.purple50 : theme.colors.gray50};
  transition: all 0.3s;
  overflow: hidden;
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
  transition: all 3s;
  overflow-y: scroll;
`;

export default OutingAccept;
