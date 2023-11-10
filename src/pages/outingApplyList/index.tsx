import OutingAccept from "@/components/outingAccept";
import { useQuery } from "react-query";
import { getOutingApplyList } from "@/utils/api/outing";
import { getDateType, getMyClass } from "@/utils/api/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { todayDate } from "@/utils/function/toDayDate";
import { useEffect } from "react";
import { setClassNumber, setGradeNumber } from "@/store/createSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (myClass) {
      dispatch(setGradeNumber({ setGradeState: myClass.grade }));
      dispatch(setClassNumber({ setClassState: myClass.class_num }));
    }
  }, [myClass]);

  const { data: outingApply } = useQuery(
    ["applyList", gradeNum, classNum, todayType],
    () =>
      getOutingApplyList({
        grade: gradeNum,
        classNum: classNum,
        type: (todayType?.type as string) || "SELF_STUDY",
      })
  );

  return <OutingAccept outing={outingApply?.outing || []} />;
};

export default OutingApplyListPage;
