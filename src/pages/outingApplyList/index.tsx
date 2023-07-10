import OutingAccept from "@/components/outingAccept";
import { useQuery } from "react-query";
import { getOutingApplyList } from "@/utils/api/outing";
import { getDateType, getMyClass } from "@/utils/api/common";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { todayDate } from "@/utils/function/toDayDate";

const OutingApplyListPage = () => {
  const gradeNum = useSelector(
    (state: RootState) => state.counter.initalState.setGradetate
  );
  const classNum = useSelector(
    (state: RootState) => state.counter.initalState.setClassState
  );

  const { data: todayType } = useQuery("todayType", () =>
    getDateType(todayDate())
  );

  const { data: myClass } = useQuery("myClass", getMyClass);

  const { data: outingApply } = useQuery(
    ["applyList", gradeNum, classNum, todayType],
    () =>
      getOutingApplyList({
        grade: myClass?.grade as number,
        classNum: myClass?.class_num as number,
        type: (todayType?.data.type as string) || "SELF_STUDY",
      })
  );

  return <OutingAccept outing={outingApply?.outing || []} />;
};

export default OutingApplyListPage;
