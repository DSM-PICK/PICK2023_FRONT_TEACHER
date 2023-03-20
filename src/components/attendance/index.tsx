import { AttendanceStatusListDto } from "@/models/selfStudy/response";
import styled from "@emotion/styled";
import NoData from "../common/nodata";
import StudentState from "./StudentState";

interface Props {
  type: string;
  student: AttendanceStatusListDto[];
  move: AttendanceStatusListDto[];
}

const AttendanceDetail = ({ student, move, type }: Props) => {
  return (
    <StList>
      {type === "all" ? (
        student.length ? (
          student.map((data) => {
            return (
              <StudentState
                toggleType={type}
                key={data.student_id}
                classroom_name={data.classroom_name}
                student_id={data.student_id}
                student_name={data.student_name}
                student_number={data.student_number}
                type={data.type}
              />
            );
          })
        ) : (
          <NoData text="학생 데이터가 없습니다." />
        )
      ) : move.length ? (
        move.map((data) => {
          return (
            <StudentState
              toggleType={type}
              key={data.student_id}
              classroom_name={data.classroom_name}
              student_id={data.student_id}
              student_name={data.student_name}
              student_number={data.student_number}
              type={data.type}
            />
          );
        })
      ) : (
        <NoData text="학생 데이터가 없습니다." />
      )}
    </StList>
  );
};

const StList = styled.main`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 25px;
`;

const NoDataContainer = styled.div`
  display: flex;
  margin-top: 170px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

export default AttendanceDetail;
