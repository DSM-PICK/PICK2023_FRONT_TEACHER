import OutingAccept from "@/components/outingAccept";
import { useQuery } from "react-query";
import { getOutingApplyList } from "@/utils/api/outing";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OutingApplyListPage = () => {
  const gradeNum = useSelector(
    (state: RootState) => state.counter.initalState.setGradetate
  );
  const classNum = useSelector(
    (state: RootState) => state.counter.initalState.setClassState
  );

  const { data: outingApply } = useQuery(
    ["applyList", gradeNum, classNum],
    () => {
      getOutingApplyList({ grade: gradeNum, classNum: classNum });
    }
  );

  console.log(gradeNum, classNum);
  console.log(outingApply);

  return <OutingAccept outing={outingApply || []} />;
};

export default OutingApplyListPage;
