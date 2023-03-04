import Link from "next/link";
import styled from "@emotion/styled";
import { Button } from "@semicolondsm/ui";
import { ChargeClassDto } from "@/models/selfStudy/response";

interface Props {
  floor: string | [];
  classroom_List: ChargeClassDto[];
}

const Check = ({ classroom_List, floor }: Props) => {
  return (
    <Wrapper>
      <TitleContainer>
        <TitleText>출석 확인 </TitleText>
        <LayerText> - {floor}층</LayerText>
      </TitleContainer>
      <MainContainer>
        {classroom_List.map((item) => (
          <Link
            href={`/attendance/${item.id}`}
            style={{ textDecoration: "none" }}
          >
            <TextBtn key={item.name}>
              {item.description
                ? item.name + `(${item.description})`
                : item.name}
            </TextBtn>
          </Link>
        ))}
      </MainContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 16px 0 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  > div {
    display: flex;
    line-height: 28px;
  }
`;

const LayerText = styled.div`
  margin-left: 5px;
  font-weight: 500;
  font-size: 20px;
`;

const TitleText = styled.div`
  font-weight: 500;
  font-size: 20px;
`;

const MainContainer = styled.div``;

const TextBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 52px;
  margin-bottom: 12px;
  border-radius: 12px;

  > div {
    font-size: 16px;
    font-weight: 500;
  }
`;

export default Check;
