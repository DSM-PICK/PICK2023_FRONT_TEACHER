import { ToggleButton } from "@semicolondsm/ui";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getAttendanceStatusList,
  movementStudentListGet,
} from "@/utils/api/selfStudy";
import { useRouter } from "next/router";
import AttendanceDetail from "@/components/attendance";
import Image from "next/image";
import arrow from "@/assets/arrow.png";
import { getNowPeriod } from "@/utils/function/getNowPeriod";

const AttendanceDetalis = () => {
  const [changeTap, setChangeTap] = useState(true);
  const [toggleValue, setToggleValue] = useState<string>("all");

  const toggle = [
    {
      title: "전체",
      onClick: () => {
        setChangeTap(true);
      },
    },
    {
      title: "이동한 학생",
      onClick: () => {
        setChangeTap(false);
      },
    },
  ];

  useEffect(() => {
    if (changeTap === true) {
      setToggleValue("all");
    } else {
      setToggleValue("movement");
    }
  }, [changeTap]);

  const router = useRouter();
  const { id, name, description } = router.query;

  const onClickArrow = () => {
    router.push("/tab");
  };

  const { data: attendance } = useQuery(
    ["attendance", toggleValue],
    () => getAttendanceStatusList(id as string),
    {
      cacheTime: 0,
    }
  );

  const { data: moveAttendance } = useQuery(
    ["moveAttendance", toggleValue],
    () => movementStudentListGet(id as string),
    {
      cacheTime: 0,
    }
  );

  return (
    <Wrapper>
      <Head>
        <div onClick={onClickArrow}>
          <Image src={arrow} alt="<-" />
        </div>
        <p>{description ? `${name} + (${description})` : name}</p>
        <p>{getNowPeriod()}</p>
      </Head>
      <ToggleButton items={toggle} containStyle={{ margin: "22px 0 37px 0" }} />
      <AttendanceDetail
        type={toggleValue}
        student={attendance?.students || []}
        move={moveAttendance?.movement_student_list || []}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 24px;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
  > div {
    position: absolute;
    top: 0px;
    left: 0px;
  }
  > p {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

export default AttendanceDetalis;
