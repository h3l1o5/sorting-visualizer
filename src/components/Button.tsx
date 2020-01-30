import styled from "styled-components";
import { colors } from "../utils";

interface ButtonProps {
  readonly color?: string;
  readonly rounded?: boolean;
  readonly selected?: boolean;
}
const Button = styled.button<ButtonProps>`
  height: ${props => (props.rounded ? "50px" : "fit-content")};
  width: ${props => (props.rounded ? "50px" : "fit-content")};
  border-radius: ${props => (props.rounded ? "50%" : "5px")};
  background-color: transparent;
  border: 2px solid;
  border-color: ${props => (props.selected ? colors.selected : props.color ? props.color : colors.white)};
  color: ${props => (props.selected ? colors.selected : props.color ? props.color : colors.white)};
  margin: 0px 10px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  transition: all 300ms;

  &:focus {
    outline: none;
  }
  &:active {
    opacity: 0.5;
  }
`;

export default Button;
