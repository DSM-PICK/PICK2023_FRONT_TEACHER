import { useState, useMemo } from "react";
import styled from "@emotion/styled";

export interface OptionArrType {
  option: string;
  value: string;
}

interface DropDownProps {
  options: Array<OptionArrType>;
  value: string;
  onChangeValue: (value: string) => void;
}

const DropDown = ({ onChangeValue, options, value }: DropDownProps) => {
  const [isFold, setIsFold] = useState<boolean>(false);

  const onClickOption = (clickedOption: string) => {
    onChangeValue(clickedOption);
    setIsFold(false);
  };

  const selectedValue = useMemo(() => {
    const index = options.findIndex((i: OptionArrType) => i.value === value);
    if (index === -1) return value;
    return options[index].option;
  }, [value]);

  return (
    <Wrapper>
      <label onClick={() => setIsFold(!isFold)}>
        <p>{selectedValue}</p>
      </label>
      {isFold && (
        <ListWrapper>
          {options.map((item, idx) => (
            <ListOptionBox key={idx} onClick={() => onClickOption(item.value)}>
              {item.value}
            </ListOptionBox>
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};

export default DropDown;

const Wrapper = styled.div`
  position: relative;
  width: 100px;
  height: 32px;
  background-color: #f9f7fa;
  border: 1px solid #b7b4bd;
  border-radius: 8px;
  color: #5c5961;
  > label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 32px;
  }
`;

const ListWrapper = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  z-index: 99;
  width: 100px;
  background-color: #f9f7fa;
  border: 1px solid #b7b4bd;
  border-radius: 8px;
  color: #5c5961;
`;

const ListOptionBox = styled.div`
  border: 1px solid #b7b4bd;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
`;
