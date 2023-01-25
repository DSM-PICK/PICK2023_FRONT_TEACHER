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
import Start from "../start";
import OutingAccept from "../outingAccept";
import OutList from "../list";
import Check from "../check";

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
    // 1하년들 퍼블리싱 후 수정 0은 출석 확인 페이지, 1은 외출 목록 페이지, 2는 외출 수락 페이지
    0: <Check />,
    1: <OutList />,
    2: <OutingAccept />,
  };

  const [activetab, setActiveTab] = useState<number>(0);

  const onClickTab = (idx: number) => {
    setActiveTab(idx);
  };

  return (
    <>
      {tab[activetab]}
      <Wrapper>
        {tabInfo.map((info, idx) => (
          <TabItem key={info.title} onClick={() => onClickTab(idx)}>
            <Image
              width={14}
              height={14}
              src={activetab === idx ? info.onImg : info.offImg}
              alt=""
            />
            <TabTitle isState={activetab === idx}>{info.title}</TabTitle>
          </TabItem>
        ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 7px 31.5px;
  display: flex;
  justify-content: space-between;
`;

const TabItem = styled.div`
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

export default Tab;
