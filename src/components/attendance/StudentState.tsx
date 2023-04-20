import { AttendanceStatusListDto } from "@/models/selfStudy/response";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { attandanceStatusChange } from "@/utils/api/selfStudy/index";
import { usePeriod } from "@/hooks/usePeriod";
import { toast } from "react-hot-toast";

interface ObjType {
  [index: string]: () => void;
}

const StudentState = (props: AttendanceStatusListDto) => {
  const { classroom_name, student_id, student_name, student_number, type } =
    props;
  const [name, setName] = useState<string>("");
  const Ref = useRef<HTMLDivElement>(null);

  let period = usePeriod().getPeriod();

  let today = new Date();
  let hours = today.getHours();

  useEffect(() => {
    const { current } = Ref;

    if (current !== null) {
      const stateStyle: ObjType = {
        MOVEMENT: () => {
          current.style.backgroundColor = "#9650fa";
          current.style.color = "#ffffff";
          current.style.border = "0";
          setName("이동");
        },
        PICNIC: () => {
          current.style.backgroundColor = "#9650fa";
          current.style.color = "#ffffff";
          current.style.border = "0";
          setName("외출");
        },
        FIELD_TRIP: () => {
          current.style.backgroundColor = "#F0e6ff";
          setName("현체");
        },
        EMPLOYMENT: () => {
          current.style.backgroundColor = "#F0e6ff";
          setName("취업");
        },
        HOME: () => {
          current.style.backgroundColor = "#F0e6ff";
          setName("귀가");
        },
        LEAVE: () => {
          current.style.backgroundColor = "#F0e6ff";
          setName("조퇴");
        },
        DISALLOWED: () => {
          current.style.backgroundColor = "#f04d51";
          current.style.border = "0";
          current.style.color = "#ffffff";
          setName("무단");
        },
        ATTENDANCE: () => {
          setName("출석");
        },
      };

      const selectedStateStyle = stateStyle[type];
      if (selectedStateStyle) {
        selectedStateStyle(); // stateStyle 함수를 실행하여 style 변경
      }

      return () => {
        // cleanup 함수에서는 이전 스타일을 초기화해야함
        current.style.backgroundColor = "";
        current.style.color = "";
        current.style.border = "";
        setName("");
      };
    }
  }, [type, Ref]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(attandanceStatusChange, {
    onSettled: () => {
      queryClient.invalidateQueries("attendance");
    },
  });

  const onClickPatchStudentState = async () => {
    if (hours > 21 || hours < 16) {
      toast.error("지금 시간에는 학생 상태 변경을 할 수 없습니다.");
    } else {
      if (type === "ATTENDANCE") {
        mutate({
          user_id: student_id,
          period: period,
          status: "DISALLOWED",
        });
      } else {
        mutate({
          user_id: student_id,
          period: period,
          status: "ATTENDANCE",
        });
      }
    }
  };

  return (
    <Container>
      <p>
        {student_number} {student_name}
      </p>
      <p>{classroom_name ? classroom_name : "-"}</p>
      <StateBox onClick={onClickPatchStudentState} ref={Ref}>
        {name}
      </StateBox>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StateBox = styled.div`
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f7fa;
  border: 1px solid #b7b4bd;
  border-radius: 8px;
  color: #5c5961;
`;
export default StudentState;
