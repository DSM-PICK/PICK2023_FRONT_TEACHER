import { ToggleButton } from "@semicolondsm/ui";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAttendanceStatusList } from "@/utils/api/selfStudy";
import { useRouter } from "next/router";
import AttendanceDetail from "@/components/attendance";
import { useApiError } from "@/hooks/useApiError";

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
  const { id } = router.query;
  const { handleError } = useApiError();

  const { data: attendance } = useQuery(
    ["attendance", toggleValue],
    () =>
      getAttendanceStatusList({
        classRoom: id as string,
        type: toggleValue,
      }),
    {
      onError: handleError,
      cacheTime: 0,
    }
  );

  return (
    <Wrapper>
      <ToggleButton items={toggle} containStyle={{ margin: "22px 0 37px 0" }} />
      <AttendanceDetail student={attendance?.data.students || []} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 24px;
`;

export default AttendanceDetalis;
