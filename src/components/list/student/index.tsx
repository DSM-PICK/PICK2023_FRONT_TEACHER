import styled from "@emotion/styled";
import { Button } from "@semicolondsm/ui";

interface Props {
  gcn: number;
  studentName: string;
  returnTime: string;
}

const StudentBlock = (props: Props) => {
  const { gcn, returnTime, studentName } = props;

  const onClick = () => {
    const res = confirm(
      gcn + " " + studentName + " 학생의 외출이 끝나게 됩니다."
    );
  };

  return (
    <Wrapper>
      <TextContainer>
        <p>{gcn + " " + studentName}</p>
        <p>{returnTime} 도착 예정</p>
      </TextContainer>
      <StyledButton size="sm" fill={"purple"} onClick={onClick}>
        복귀
      </StyledButton>
    </Wrapper>
  );
};

export default StudentBlock;

const Wrapper = styled.div`
  padding: 0 16px;
  width: 100%;
  height: 56px;
  background: ${({ theme }) => theme.colors.gray50};
  color: ${({ theme }) => theme.colors.gray900};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-radius: 12px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  font-family: "Noto Sans KR";
`;

const TextContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
`;
