import { AttendanceStatusListDto } from "@/models/selfStudy/response";
import styled from "@emotion/styled";
import StudentState from "./StudentState";

interface Props {
  type: string;
  student: AttendanceStatusListDto[];
  move: AttendanceStatusListDto[];
}

const AttendanceDetail = ({ student, move, type }: Props) => {
  return (
    <StList>
      {type === "all"
        ? student.map((data) => {
            return (
              <StudentState
                key={data.student_id}
                classroom_name={data.classroom_name}
                student_id={data.student_id}
                student_name={data.student_name}
                student_number={data.student_number}
                type={data.type}
              />
            );
          })
        : move.map((data) => {
            return (
              <StudentState
                key={data.student_id}
                classroom_name={data.classroom_name}
                student_id={data.student_id}
                student_name={data.student_name}
                student_number={data.student_number}
                type={data.type}
              />
            );
          })}
    </StList>
  );
};

const StList = styled.main`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 25px;
`;

export default AttendanceDetail;
