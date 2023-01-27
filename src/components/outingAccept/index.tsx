import styled from "@emotion/styled";
import { useState } from "react";
import { gradeNumArr, classNumArr, outingRequestList } from "./constants";
import { dropDown } from "@/assets/outingAccept";
import Image from "next/image";

interface StudentClass {
  gradeNum: string;
  classNum: string;
}

interface InfoPropsType {
  name: string;
  title: string;
}

const OutingAccept = () => {
  const [outingSelectList, setOutingSelectList] = useState<number[]>([]);
  const [isSelectBoxClick, setIsSelectBoxClick] = useState<number>(8);
  const [studentClass, setStudentClass] = useState<StudentClass>({
    gradeNum: "학년",
    classNum: "반",
  });
  const { gradeNum, classNum } = studentClass;

  const isClick = outingSelectList.length > 0;

  const selectBoxArr = [
    { width: "74px", value: gradeNum, arr: gradeNumArr },
    { width: "61px", value: classNum, arr: classNumArr },
  ];

  const onChange = (info: InfoPropsType) => {
    const { title, name } = info;
    setStudentClass({
      ...studentClass,
      [name]: title,
    });
    setIsSelectBoxClick(8);
  };

  const studentClick = (studentId: number) => {
    const isIncludes = outingSelectList.includes(studentId);

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
            onClick={() => studentClick(student.id)}
            isClick={outingSelectList.includes(student.id)}
          >
            <Student>
              <Name>{student.name}</Name>
              <Time>{student.time}</Time>
            </Student>
            <Reason isClick={outingSelectList.includes(student.id)}>
              {student.reason}
            </Reason>
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
  width: 100%;
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
  padding: 16px 0;
  flex-shrink: 0;
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

const Reason = styled.p<{ isClick: boolean }>`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray900};
  width: calc(91vw - 32px);
  display: flex;
  justify-content: flex-start;
  line-height: 24px;
  overflow-y: scroll;
  padding-bottom: ${({ isClick }) => (isClick ? "16px" : 0)};
  transition: padding-bottom 0.3s;
`;

export default OutingAccept;
