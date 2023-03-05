interface Props {
  color?: boolean;
}

const List = ({ color }: Props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="6" height="6" rx="1" fill={color ? "#3F3C42" : "#DBD7E0"} />
      <rect
        x="8"
        width="6"
        height="6"
        rx="1"
        fill={color ? "#3F3C42" : "#DBD7E0"}
      />
      <rect
        y="8"
        width="6"
        height="6"
        rx="1"
        fill={color ? "#3F3C42" : "#DBD7E0"}
      />
      <rect
        x="8"
        y="8"
        width="6"
        height="6"
        rx="1"
        fill={color ? "#3F3C42" : "#DBD7E0"}
      />
    </svg>
  );
};

export default List;
