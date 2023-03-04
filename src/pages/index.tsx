import Start from "@/components/start";
import { useQuery } from "react-query";
import {
  getTodaySelfStudyTeacher,
  getTodaySelfStudyTeacherWhether,
} from "@/utils/api/selfStudy";

export default function Home() {
  const { data } = useQuery("postlist", () => getTodaySelfStudyTeacher());
  const { data: state } = useQuery("state", () =>
    getTodaySelfStudyTeacherWhether()
  );

  return (
    <>
      <Start
        name={state?.data.name!}
        floor={state?.data.floor || []}
        fourth_floor={data?.data.fourth_floor!}
        second_floor={data?.data.second_floor!}
        third_floor={data?.data.third_floor!}
      />
    </>
  );
}
