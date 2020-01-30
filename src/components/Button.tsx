import styled from "styled-components";

interface ButtonProps {
  readonly color: string;
  readonly rounded?: boolean;
}
const Button = styled.button<ButtonProps>`
  height: ${props => (props.rounded ? "50px" : "fit-content")};
  width: ${props => (props.rounded ? "50px" : "fit-content")};
  border-radius: ${props => (props.rounded ? "50%" : "5px")};
  background-color: transparent;
  border: 2px solid;
  border-color: ${props => props.color};
  color: ${props => props.color};
  margin: 0px 10px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  &:focus {
    outline: none;
  }
  &:active {
    opacity: 0.5;
  }
`;

export default Button;
