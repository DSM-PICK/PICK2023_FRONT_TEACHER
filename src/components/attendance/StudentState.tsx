import { AttendanceStatusListDto } from "@/models/selfStudy/response";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { attandanceStatusChange } from "@/utils/api/selfStudy/index";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-hot-toast";

interface ObjType {
  [index: string]: () => void;
}

const StudentState = (props: AttendanceStatusListDto) => {
  const { classroom_name, student_id, student_name, student_number, type } =
    props;
  const [name, setName] = useState<string>("");
  const [period, setPeriod] = useState<number>(0);
  const Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = Ref;

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
        FIELDTRIP: () => {
          current.style.backgroundColor = "#F0e6ff";
          setName("현체");
        },
        EMPLOYMENT: () => {
          current.style.backgroundColor = "#F0e6ff";
          setName("취업");
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
        AWAIT: () => {
          setName("대기");
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
  const { handleError } = useApiError();
  const { mutate } = useMutation(attandanceStatusChange, {
    onError: handleError,
    onSettled: () => {
      queryClient.invalidateQueries("attendance");
    },
    onSuccess: () => {
      toast.success("상태가 변경되었습니다.", { duration: 1000 });
    },
  });

  const onClickPatchStudentState = async () => {
    if (type === "ATTENDANCE") {
      mutate({
        user_id: student_id,
        period: period,
        status: "DISALLOWED",
      });
    } else if (type === "DISALLOWED") {
      mutate({
        user_id: student_id,
        period: period,
        status: "ATTENDANCE",
      });
    } else {
      toast.error("출석 및 무단을 제외한 상태는 변경 할 수 없습니다.");
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
