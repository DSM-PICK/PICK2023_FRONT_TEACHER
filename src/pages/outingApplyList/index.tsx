import OutingAccept from "@/components/outingAccept";
import { useQuery } from "react-query";
import { getOutingApplyList } from "@/utils/api/outing";
import { getDateType } from "@/utils/api/common";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { todayDate } from "@/utils/function/toDayDate";
import { useState } from "react";

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

  const { data: outingApply } = useQuery(
    ["applyList", gradeNum, classNum, todayType],
    () =>
      getOutingApplyList({
        grade: gradeNum,
        classNum: classNum,
        type: (todayType?.data.type as string) || "SELF_STUDY",
      })
  );

  return <OutingAccept outing={outingApply?.outing || []} />;
};

export default OutingApplyListPage;
