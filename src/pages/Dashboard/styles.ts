import styled from "styled-components";
import { darken } from "polished";

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #7209b7;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;

  input {
    width: 100%;
    height: 70px;
    padding: 0 24px;
    border: 2px solid ${(props) => (props.hasError ? " #ff0000" : "#fff")};
    border-radius: 10px 0 0 10px;
    color: #3a3a3a;

    &::placeholder {
      color: #c77dff;
    }
  }

  button {
    min-width: 210px;
    height: 70px;
    background: #7209b7;
    border-radius: 0 10px 10px 0;;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, "#c77dff")};
    }
  }
`;

export const Error = styled.span`
  color: #ff0000;
  margin-top: 16px;
  display: block;
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 10px;
    width: 100%;
    padding: 24px;
    transition: transform 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      transform: translateX(15px);
    }

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;
      display: flex;
      flex-direction: column;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      span {
        font-size: 18px;
        color: #c77dff;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
    }
  }
`;
