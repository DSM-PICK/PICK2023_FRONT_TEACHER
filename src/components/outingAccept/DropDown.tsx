import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import { dropDown } from "@/assets/outingAccept";
import { IDropdownProps, ISortOption } from "./constants";
import Image from "next/image";
import OutSideClickHandler from "../common/outsideclickhandler/OutSideClickHandler";

const DropDown = ({ width, onChangeValue, options, value }: IDropdownProps) => {
  const [isFold, setIsFold] = useState<boolean>(false);

  const onClickOption = (clickedOption: string) => {
    onChangeValue(clickedOption);
    setIsFold(false);
  };

  const selectedValue = useMemo(() => {
    const index = options.findIndex((i: ISortOption) => i.value === value);
    if (index === -1) return value;
    return options[index].option;
  }, [value]);

  return (
    <>
      <OutSideClickHandler onOutSideClick={() => setIsFold(false)}>
        <SelectBoxContainer width={width}>
          <SelectButton onClick={() => setIsFold(!isFold)}>
            {selectedValue}
            <Image width={8} height={4} src={dropDown} alt="" />
          </SelectButton>
          {isFold && (
            <SelectList>
              {options.map((item, idx) => (
                <span key={idx} onClick={() => onClickOption(item.value)}>
                  {item.option}
                </span>
              ))}
            </SelectList>
          )}
        </SelectBoxContainer>
      </OutSideClickHandler>
    </>
  );
};

const SelectBoxContainer = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const SelectButton = styled.label`
  height: 32px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  border: none;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

const SelectList = styled.div`
  width: 120px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  gap: 20px;
  padding: 16px;
  position: fixed;
  top: 116px;
`;

export default DropDown;
