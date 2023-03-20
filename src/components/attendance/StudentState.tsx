import { AttendanceStatusListDto } from "@/models/selfStudy/response";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { attandanceStatusChange } from "@/utils/api/selfStudy/index";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-hot-toast";
import { OptionArrType } from "../common/dropdown";
import DropDown from "../common/dropdown";
import { usePeriod } from "@/hooks/usePeriod";

interface ObjType {
  [index: string]: () => void;
}

// 임시 방편
const DropDownOption: OptionArrType[] = [
  { option: "출석", value: "출석" },
  { option: "무단", value: "무단" },
  { option: "외출", value: "외출" },
  { option: "이동", value: "이동" },
];

const StudentState = (props: AttendanceStatusListDto) => {
  const {
    classroom_name,
    student_id,
    student_name,
    student_number,
    type,
    toggleType,
  } = props;
  const [name, setName] = useState<string>("");
  const Ref = useRef<HTMLDivElement>(null);
  const [sort, setSort] = useState(DropDownOption[0].value);
  const [state, setState] = useState<string>("");

  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { getPeriod } = usePeriod();

  const onChangeSort = (sort: string) => {
    const sortValue = sort;
    setSort(sortValue);

    if (sort === "출석") {
      mutate({
        user_id: student_id,
        period: getPeriod(),
        status: "ATTENDANCE",
      });
    } else if (sort === "무단") {
      mutate({
        user_id: student_id,
        period: getPeriod(),
        status: "DISALLOWED",
      });
    } else if (sort === "이동") {
      mutate({
        user_id: student_id,
        period: getPeriod(),
        status: "MOVEMENT",
      });
    } else {
      mutate({
        user_id: student_id,
        period: getPeriod(),
        status: "PICNIC",
      });
    }
  };

  const { mutate } = useMutation(attandanceStatusChange, {
    onError: handleError,
    onSettled: () => {
      queryClient.invalidateQueries("attendance");
    },
    onSuccess: () => {
      toast.success("상태가 변경되었습니다.", { duration: 1000 });
    },
  });

  useEffect(() => {
    const { current } = Ref;

    // 임시 코드
    if (type === "ATTENDANCE") {
      setName("출석");
    } else if (type === "DISALLOWED") {
      setName("무단");
    } else if (type === "MOVEMENT") {
      setName("이동");
    } else {
      setName("외출");
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

  // const onClickPatchStudentState = async () => {
  //   if (type === "ATTENDANCE") {
  //     mutate({
  //       user_id: student_id,
  //       period: period,
  //       status: "DISALLOWED",
  //     });
  //   } else if (type === "DISALLOWED") {
  //     mutate({
  //       user_id: student_id,
  //       period: period,
  //       status: "ATTENDANCE",
  //     });
  //   } else {
  //     toast.error("출석 및 무단을 제외한 상태는 변경 할 수 없습니다.");
  //   }
  // };

  return (
    <Container>
      <p>
        {student_number} {student_name}
      </p>
      <p>{classroom_name ? classroom_name : "-"}</p>
      {/* <StateBox onClick={onClickPatchStudentState} ref={Ref}>
        {name}
      </StateBox> */}
      {toggleType === "all" && (
        <DropDown
          onChangeValue={onChangeSort}
          value={name}
          options={DropDownOption}
        />
      )}
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
