import Link from "next/link";
import styled from "@emotion/styled";
import { Button } from "@semicolondsm/ui";
import { ChargeClassDto } from "@/models/selfStudy/response";
import NoData from "../common/nodata";
import { getNowPeriod } from "@/utils/function/toDayDate";

interface Props {
  floor: string;
  responsible_classroom_list: ChargeClassDto[];
}

const Check = ({ responsible_classroom_list, floor }: Props) => {
  return (
    <Wrapper>
      <TitleContainer>
        <TitleText>출석 확인 </TitleText>
        <LayerText> - {floor}층</LayerText>
        <Period>{getNowPeriod()}</Period>
      </TitleContainer>
      <MainContainer>
        {responsible_classroom_list.length ? (
          responsible_classroom_list.map((item) => {
            return (
              <Link
                key={item.name}
                href={`/attendance/${item.id}?name=${
                  item.name + item.description
                }`}
                style={{ textDecoration: "none" }}
              >
                <TextBtn key={item.name}>
                  {item.description
                    ? item.name + `(${item.description})`
                    : item.name}
                </TextBtn>
              </Link>
            );
          })
        ) : (
          <NoDataContainer>
            <NoData text="교실 데이터가 없습니다." />
          </NoDataContainer>
        )}
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

const NoDataContainer = styled.div`
  margin: auto;
`;

const Period = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.purple400};
`;

export default Check;
