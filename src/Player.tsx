import React from "react";
import styled from "styled-components";

const Player: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <Button>b</Button>
      <Button>p</Button>
      <Button>f</Button>
    </div>
  );
};

export default Player;

const Button = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  margin: 0px 10px;
  &:focus {
    outline: none;
  }
  &:active {
    opacity: 0.5;
  }
`;
