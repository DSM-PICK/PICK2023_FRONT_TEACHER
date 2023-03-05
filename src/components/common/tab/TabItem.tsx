import styled from "@emotion/styled";
import { Body3 } from "@semicolondsm/ui";

interface Props {
  Icon: JSX.Element;
  title: string;
  isState: boolean;
  onClick: () => void;
}

const TabItem = ({ Icon, onClick, isState, title }: Props) => {
  return (
    <TabItemWrapper onClick={() => onClick()}>
      {Icon}
      <TabTitle isState={isState}>{title}</TabTitle>
    </TabItemWrapper>
  );
};

const TabItemWrapper = styled.button`
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const TabTitle = styled(Body3)<{ isState: boolean }>`
  font-weight: 400;
  margin-top: 5px;
  color: ${({ isState, theme }) =>
    isState ? theme.colors.black : theme.colors.gray300};
`;

export default TabItem;
