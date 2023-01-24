import Tab from "@/components/tab";
import { ToggleButton, Button } from "@semicolondsm/ui";
import styled from "@emotion/styled";
import { useState } from "react";
import StudentState from "@/components/studentState/index";

const AttendanceDetalis = () => {
  const [changeTap, setChangeTap] = useState(true);

  const toggle = [
    {
      title: "전체",
      onClick: () => {
        setChangeTap(true);
      },
    },
    {
      title: "이동한 학생",
      onClick: () => {
        setChangeTap(false);
      },
    },
  ];

  //---------------------------------------------
  // 임시 데이터
  const [student, setStudent] = useState([
    {
      number: "2101",
      name: "강석현",
      state: "이동",
      isMove: "세미나실 3-1",
    },
    {
      number: "2102",
      name: "김경호",
      state: "무단",
    },
    {
      number: "2101",
      name: "강석현",
      state: "출석",
    },
    {
      number: "2101",
      name: "강석현",
      state: "외출",
    },
    {
      number: "2101",
      name: "강석현",
      state: "현체",
    },
    {
      number: "2101",
      name: "강석현",
      state: "취업",
    },
  ]);
  //---------------------------------------------

  return (
    <Wrapper>
      <ToggleButton items={toggle} containStyle={{ margin: "8px 0" }} />
      <StList>
        {student.map((data) => {
          return (
            <StudentState
              number={data.number}
              name={data.name}
              state={data.state}
              isMove={data.isMove}
            />
          );
        })}
      </StList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 24px;
`;

const StList = styled.main`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 25px;
`;

export default AttendanceDetalis;
