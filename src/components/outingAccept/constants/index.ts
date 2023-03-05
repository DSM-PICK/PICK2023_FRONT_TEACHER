export interface ISortOption {
  option: string;
  value: string;
}

export interface IDropdownProps {
  width: number;
  options: Array<ISortOption>;
  value: string;
  onChangeValue: (value: string) => void;
}

export const gradeNumArr: ISortOption[] = [
  { option: "1학년", value: "1" },
  { option: "2학년", value: "2" },
  { option: "3학년", value: "3" },
];

export const classNumArr: ISortOption[] = [
  { option: "1반", value: "1" },
  { option: "2반", value: "2" },
  {
    option: "3반",
    value: "3",
  },
  { option: "4반", value: "4" },
];
