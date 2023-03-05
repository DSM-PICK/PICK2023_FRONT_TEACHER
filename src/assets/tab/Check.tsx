interface Props {
  color?: boolean;
}

const Check = ({ color }: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3.75736 8C3.49701 7.73965 3.49701 7.31754 3.75736 7.05719C4.01771 6.79684 4.43982 6.79684 4.70017 7.05719L7.05719 9.41421L11.2998 5.17157C11.5602 4.91122 11.9823 4.91122 12.2426 5.17157C12.503 5.43192 12.503 5.85403 12.2426 6.11438L7.5286 10.8284C7.26825 11.0888 6.84614 11.0888 6.58579 10.8284L3.75736 8Z"
        fill={color ? "#3F3C42" : "#DBD7E0"}
      />
    </svg>
  );
};

export default Check;
