import { ReactElement, useState } from "react";
import styled from "@emotion/styled";
import {
  onAttendance,
  offAttendance,
  offCheck,
  offList,
  onCheck,
  onList,
} from "@/assets/tab";
import Image from "next/image";
import { Body3 } from "@semicolondsm/ui";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import OutingAccept from "../../outingAccept";
import CheckPage from "@/pages/check";
import OutList from "../../list";

interface TabProps {
  [key: number]: ReactElement;
}

const Tab = () => {
  const tabInfo = [
    { title: "출석 확인", onImg: onAttendance, offImg: offAttendance },
    { title: "외출 목록", onImg: onList, offImg: offList },
    { title: "외출 수락", onImg: onCheck, offImg: offCheck },
  ];
  const tab: TabProps = {
    0: <CheckPage />,
    1: <OutList />,
    2: <OutingAccept />,
  };

  const [activetab, setActiveTab] = useState<number>(0);

  const backgroundState = useSelector(
    (state: RootState) => state.counter.initalState.backgroundColor
  );

  const onClickTab = (idx: number) => {
    setActiveTab(idx);
  };

  return (
    <>
      {tab[activetab]}

      <TabWrapper backgroundState={backgroundState}>
        {tabInfo.map((info, idx) => (
          <TabItem
            disabled={backgroundState}
            key={info.title}
            onClick={() => onClickTab(idx)}
          >
            <Image
              width={14}
              height={14}
              src={activetab === idx ? info.onImg : info.offImg}
              alt=""
            />
            <TabTitle isState={activetab === idx}>{info.title}</TabTitle>
          </TabItem>
        ))}
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

const TabItem = styled.button`
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :disabled {
    opacity: 0.5;
    background-color: rgba(33, 33, 33, 0.001);
  }
`;

const TabTitle = styled(Body3)<{ isState: boolean }>`
  font-weight: 400;
  margin-top: 5px;
  color: ${({ isState, theme }) =>
    isState ? theme.colors.black : theme.colors.gray300};
`;

export default Tab;
