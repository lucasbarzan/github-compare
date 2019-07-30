import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 4px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }
`;

export const Button = styled.button`
  width: 125px;
  height: 55px;
  background: ${props => {
    if (props.action === "refresh") {
      return "#5DADE2";
    } else if (props.action === "delete") {
      return "#EC7063";
    }
  }};
  color: #fff;
  border: 0;
  font-size: 20px;
  font-weight: bold;
  border-bottom-left-radius: ${props => {
    if (props.pos === "left") {
      return "4px";
    } else if (props.pos === "right") {
      return "0";
    } else {
      return "0";
    }
  }};
  border-bottom-right-radius: ${props => {
    if (props.pos === "left") {
      return "0";
    } else if (props.pos === "right") {
      return "4px";
    } else {
      return "0";
    }
  }};

  &:hover {
    background: ${props => {
      if (props.type === "refresh") {
        return "#2E86C1";
      } else if (props.type === "delete") {
        return "#CB4335";
      }
    }};
    cursor: pointer;
  }
`;
