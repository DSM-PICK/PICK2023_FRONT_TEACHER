import styled from "@emotion/styled";
import StudentBlock from "./student";

const OutList = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <TitleText>외출자 목록</TitleText>
      </TitleContainer>
      <StudentContainer>
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
        <StudentBlock gcn={1234} returnTime="19:30" studentName="이경수" />
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
