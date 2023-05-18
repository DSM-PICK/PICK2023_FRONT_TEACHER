import styled from "@emotion/styled";
import { useState } from "react";
import { classNumArr, gradeNumArr } from "./constants";
import { useDispatch } from "react-redux";
import ConfirmBox from "../common/confirm";
import DropDown from "./DropDown";
import { setClassNumber, setGradeNumber } from "@/store/createSlice";
import { OutingApplyListType } from "@/models/outing/response/index";
import { useMutation, useQueryClient } from "react-query";
import { patchOutingRejectAccept } from "@/utils/api/outing";
import { useApiError } from "@/hooks/useApiError";
import { toast } from "react-hot-toast";
import NoData from "../common/nodata";

interface Props {
  outing: OutingApplyListType[];
}

const OutingAccept = ({ outing }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [classes, setClasses] = useState(classNumArr[0].value);
  const [grade, setGrade] = useState(gradeNumArr[0].value);
  const [outingSelectList, setOutingSelectList] = useState<number[]>([]);
  const [outingStudentId, setOutingStudentId] = useState<string[]>([]);
  const [outingStudentName, setOutingStudentName] = useState<string[]>([]);
  const [outingStudentNumber, setOutingStudentNumber] = useState<number[]>([]);

  let isClick = outingSelectList.length > 0;

  const studentClick = (
    studentIdx: number,
    student_id: string,
    student_name: string,
    student_number: number
  ) => {
    const isIncludes = outingSelectList.includes(studentIdx);
    if (isIncludes) {
      setOutingSelectList(
        outingSelectList.filter((id: number) => id !== studentIdx)
      );
      setOutingStudentId(
        outingStudentId.filter((id: string) => id !== student_id)
      );
      setOutingStudentName(
        outingStudentName.filter((name: string) => name !== student_name)
      );
      setOutingStudentNumber(
        outingStudentNumber.filter(
          (number: number) => number !== student_number
        )
      );
    } else {
      setOutingSelectList([...outingSelectList, studentIdx]);
      setOutingStudentId([...outingStudentId, student_id]);
      setOutingStudentName([...outingStudentName, student_name]);
      setOutingStudentNumber([...outingStudentNumber, student_number]);
    }
  };

  const onChangeGrade = (sort: string) => {
    const sortValue = sort;
    const dispatchValue = Number(sortValue);
    setGrade(sortValue);
    dispatch(setGradeNumber({ setGradeState: dispatchValue }));
  };

  const onChangeClass = (sort: string) => {
    const sortValue = sort;
    const dispatchValue = Number(sortValue);
    dispatch(setClassNumber({ setClassState: dispatchValue }));
    setClasses(sortValue);
  };

  const dispatch = useDispatch();
  const onClickAccept = () => {
    setIsOpen(true);
  };

  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { mutate: patchOutingApplyList } = useMutation(
    () => patchOutingRejectAccept("PICNIC_REJECT", outingStudentId),
    {
      onError: handleError,
      onSuccess: () => {
        toast.success("외출신청이 거절되었습니다.", { duration: 1000 });
        queryClient.invalidateQueries("applyList");
      },
    }
  );
  const onClickReject = () => {
    patchOutingApplyList();
    setOutingSelectList([]);
  };

  return (
    <Wrapper>
      <Title>외출 신청 수락</Title>
      <Header>
        <SelectBoxWrapper>
          <DropDown
            width={74}
            value={grade}
            onChangeValue={onChangeGrade}
            options={gradeNumArr}
          />
          <DropDown
            width={61}
            value={classes}
            onChangeValue={onChangeClass}
            options={classNumArr}
          />
        </SelectBoxWrapper>
        <Btns>
          <RejectButton disabled={!isClick} onClick={onClickReject}>
            거절
          </RejectButton>
          <AcceptButton disabled={!isClick} onClick={onClickAccept}>
            수락
          </AcceptButton>
        </Btns>
      </Header>
      <List>
        {outing.length ? (
          outing.map((item, idx) => {
            const { reason, student_id, student_name, student_number } = item;
            let start = item.start_time.slice(0, 5);
            let end = item.end_time.slice(0, 5);
            return (
              <StudentBox
                key={student_id}
                onClick={() =>
                  studentClick(
                    idx,
                    item.student_id,
                    student_name,
                    student_number
                  )
                }
                isClick={outingSelectList.includes(idx)}
              >
                <Student>
                  <Name>{student_number + " " + student_name}</Name>
                  <Time>{`${start} ~ ${end}`}</Time>
                </Student>
                <Reason isClick={outingSelectList.includes(idx)}>
                  {reason}
                </Reason>
              </StudentBox>
            );
          })
        ) : (
          <NoDataContainer>
            <NoData text="외출 신청한 학생이 없습니다." />
          </NoDataContainer>
        )}
      </List>
      {isOpen && (
        <ConfirmBox
          setOpenModal={setIsOpen}
          student_id_array={outingStudentId}
          end_period={0}
          student_id={outingStudentId[0]}
          text={
            outingStudentId.length > 1
              ? `${outingStudentNumber[0]}` +
                " " +
                `${outingStudentName[0]}` +
                " " +
                "학생 외" +
                `${outingStudentId.length - 1}명의`
              : `${outingStudentNumber[0]}` +
                " " +
                `${outingStudentName[0]}` +
                " " +
                "학생의"
          }
          type="accept"
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 16px 0 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const Header = styled.div`
  display: flex;
  margin-top: 18px;
  justify-content: space-between;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Btns = styled.div`
  display: flex;
  gap: 8px;
`;

const RejectButton = styled.button`
  width: 58px;
  height: 32px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  border: none;
  background-color: ${({ theme }) => theme.colors.red400};

  :disabled {
    background-color: ${({ theme }) => theme.colors.red50};
  }
`;

const AcceptButton = styled.button`
  width: 58px;
  height: 32px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  border: none;
  background-color: ${({ theme }) => theme.colors.purple400};

  :disabled {
    background-color: ${({ theme }) => theme.colors.purple50};
  }
`;

const List = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  gap: 8px;
`;

const StudentBox = styled.div<{ isClick: boolean }>`
  width: 100%;
  max-height: ${({ isClick }) => (isClick ? "130px" : "56px")};
  border-radius: 12px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isClick }) =>
    isClick ? theme.colors.purple50 : theme.colors.gray50};
  transition: all 0.3s;
  overflow: hidden;
`;

const Student = styled.div`
  display: flex;
  width: calc(91vw - 32px);
  justify-content: space-between;
  padding: 16px 0;
  flex-shrink: 0;
`;

const Name = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  line-height: 24px;
`;

const Time = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  line-height: 24px;
`;

const Reason = styled.p<{ isClick: boolean }>`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray900};
  width: calc(91vw - 32px);
  display: flex;
  justify-content: flex-start;
  line-height: 24px;
  overflow-y: scroll;
  padding-bottom: ${({ isClick }) => (isClick ? "16px" : 0)};
  transition: padding-bottom 0.3s;
`;

const NoDataContainer = styled.div`
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
`;

export default OutingAccept;
