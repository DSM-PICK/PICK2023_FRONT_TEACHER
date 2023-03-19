import styled from "@emotion/styled";
import StudentBlock from "./student";
import { OutingStudentListType } from "@/models/outing/response";
import NoData from "../common/nodata";

interface Props {
  outing: OutingStudentListType[];
}

const OutList = ({ outing }: Props) => {
  return (
    <Wrapper>
      <TitleContainer>
        <TitleText>외출자 목록</TitleText>
      </TitleContainer>
      <StudentContainer>
        {outing.length ? outing.map((item) => {
          let EndTime = item.end_time.slice(1, 5);
          return (
            <StudentBlock
              key={item.student_id}
              student_id={item.student_id}
              student_number={item.student_number}
              student_name={item.student_name}
              end_time={EndTime}
            />
          );
        }) : <NoData />}
      </StudentContainer>
    </Wrapper>
  );
};

export default OutList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 14px 0;
`;

const TitleText = styled.h1`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.gray900};
`;

const StudentContainer = styled.div`
  display: flex;
  height: fit-content;
  padding: 16px 0;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  height: calc(100vh - 106px);
  overflow-y: scroll;
`;
