import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

interface StateProps {
  data: {
    number: string;
    name: string;
    state: string;
    isMove?: string;
  };
}

const studentState = (props: StateProps) => {
  const Ref = useRef<HTMLDivElement>(null);
  const { number, name, state, isMove } = props.data;

  useEffect(() => {
    const { current } = Ref;
    if (current !== null) {
      interface ObjType {
        [index: string]: () => void;
      }
      const stateStyle: ObjType = {
        이동: () => {
          current.style.backgroundColor = "#9650fa";
          current.style.color = "#ffffff";
          current.style.border = "0";
        },
        외출: () => {
          current.style.backgroundColor = "#9650fa";
          current.style.color = "#ffffff";
          current.style.border = "0";
        },
        현체: () => {
          current.style.backgroundColor = "#F0e6ff";
        },
        취업: () => {
          current.style.backgroundColor = "#F0e6ff";
        },
        무단: () => {
          current.style.backgroundColor = "#f04d51";
          current.style.border = "0";
          current.style.color = "#ffffff";
        },
      };
      return stateStyle[state];
    }
  });
  return (
    <Container>
      <p>
        {number} {name}
      </p>
      <p>{isMove ? isMove : "-"}</p>
      <StateBox ref={Ref}>{state}</StateBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StateBox = styled.div`
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f7fa;
  border: 1px solid #b7b4bd;
  border-radius: 8px;
  color: #5c5961;
`;

export default studentState;