import Start from "@/components/start";
import { useQuery } from "react-query";
import {
  getTodaySelfStudyTeacher,
  getTodaySelfStudyTeacherWhether,
} from "@/utils/api/selfStudy";
import { useApiError } from "@/hooks/useApiError";

export default function Home() {
  const { handleError } = useApiError();
  const { data } = useQuery("postlist", () => getTodaySelfStudyTeacher(), {
    onError: handleError,
  });
  const { data: state } = useQuery(
    "state",
    () => getTodaySelfStudyTeacherWhether(),
    {
      onError: handleError,
    }
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
