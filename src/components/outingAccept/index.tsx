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

interface Props {
  outing: OutingApplyListType[];
}

const OutingAccept = ({ outing }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [classes, setClasses] = useState(classNumArr[0].value);
  const [grade, setGrade] = useState(gradeNumArr[0].value);
  const [outingSelectList, setOutingSelectList] = useState<number[]>([]);
  const [outingStudentId, setOutingStudentId] = useState<string[]>([]);

  let isClick = outingSelectList.length > 0;

  const studentClick = (studentIdx: number, student_id: string) => {
    const isIncludes = outingSelectList.includes(studentIdx);

    if (isIncludes) {
      setOutingSelectList(
        outingSelectList.filter((id: number) => id !== studentIdx)
      );
      setOutingStudentId(
        outingStudentId.filter((id: string) => id !== student_id)
      );
    } else {
      setOutingSelectList([...outingSelectList, studentIdx]);
      setOutingStudentId([...outingStudentId, student_id]);
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
        toast.success("??????????????? ?????????????????????.", { duration: 1000 });
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
      <Title>?????? ?????? ??????</Title>
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
            ??????
          </RejectButton>
          <AcceptButton disabled={!isClick} onClick={onClickAccept}>
            ??????
          </AcceptButton>
        </Btns>
      </Header>
      <List>
        {outing.map((item, idx) => {
          const { reason, student_id, student_name, student_number } = item;
          let start = item.start_time.slice(0, 5);
          let end = item.end_time.slice(0, 5);
          return (
            <StudentBox
              key={student_id}
              onClick={() => studentClick(idx, item.student_id)}
              isClick={outingSelectList.includes(idx)}
            >
              <Student>
                <Name>{student_number + " " + student_name}</Name>
                <Time>{`${start} ~ ${end}`}</Time>
              </Student>
              <Reason isClick={outingSelectList.includes(idx)}>{reason}</Reason>
              {isOpen && (
                <ConfirmBox
                  setOpenModal={setIsOpen}
                  student_id_array={outingStudentId}
                  end_period={0}
                  student_id={student_id}
                  text={
                    outingStudentId.length > 1
                      ? `${student_number}` +
                        " " +
                        `${student_name}` +
                        " " +
                        "?????? ???" +
                        `${outingStudentId.length - 1}??????`
                      : `${student_number}` +
                        " " +
                        `${student_name}` +
                        " " +
                        "?????????"
                  }
                  type="accept"
                />
              )}
            </StudentBox>
          );
        })}
      </List>
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

export default OutingAccept;
