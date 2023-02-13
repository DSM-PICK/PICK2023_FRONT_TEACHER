import { ReactElement, useState } from "react";
import styled from "@emotion/styled";
import { attendance, check, list } from "@/assets/tab";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import CheckPage from "@/pages/check";
import OutingListPage from "@/pages/outingList";
import OutingApplyListPage from "@/pages/outingApplyList";
import TabItem from "./TabItem";

interface TabProps {
  [key: number]: ReactElement;
}

const Tab = () => {
  const [activetab, setActiveTab] = useState<number>(0);

  const tabInfo = [
    { title: "출석 확인", Icon: attendance },
    { title: "외출 목록", Icon: list },
    { title: "외출 수락", Icon: check },
  ];

  const tab: TabProps = {
    0: <CheckPage />,
    1: <OutingListPage />,
    2: <OutingApplyListPage />,
  };

  const backgroundState = useSelector(
    (state: RootState) => state.counter.initalState.backgroundColor
  );

  const onClickTab = (idx: number) => {
    setActiveTab(idx);
    console.log("1");
  };

  return (
    <>
      {tab[activetab]}

      <TabWrapper backgroundState={backgroundState}>
        {tabInfo.map((info, idx) => {
          const { Icon, title } = info;
          return (
            <TabItem
              key={title}
              Icon={<Icon color={idx === activetab} />}
              isState={activetab === idx}
              onClick={() => onClickTab(idx)}
              title={title}
            />
          );
        })}
      </TabWrapper>
    </>
  );
};

const TabWrapper = styled.div<{ backgroundState: boolean }>`
  z-index: 2;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 7px 31.5px;
  background-color: ${({ theme, backgroundState }) =>
    backgroundState ? "rgba(33, 33, 33, 0)" : theme.colors.white};
  display: flex;
  justify-content: space-between;
`;

export default Tab;
