import styled from "@emotion/styled";
import { Body3 } from "@semicolondsm/ui";

interface Props {
  Icon: JSX.Element;
  title: string;
  isState: boolean;
  background: boolean;
  onClick: () => void;
}

const TabItem = ({ Icon, onClick, isState, title, background }: Props) => {
  return (
    <TabItemWrapper background={background} onClick={() => onClick()}>
      {Icon}
      <TabTitle isState={isState}>{title}</TabTitle>
    </TabItemWrapper>
  );
};

const TabItemWrapper = styled.div<{ background: boolean }>`
  border: none;
  background-color: ${({ theme, background }) =>
    background ? "rgba(33, 33, 33, 0)" : theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TabTitle = styled(Body3)<{ isState: boolean }>`
  font-weight: 400;
  margin-top: 5px;
  color: ${({ isState, theme }) =>
    isState ? theme.colors.black : theme.colors.gray300};
`;

export default TabItem;
