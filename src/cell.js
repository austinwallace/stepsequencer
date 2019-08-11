import styled from "styled-components";
import { darken } from "polished";
//switch statement for different styling of cells
const getBackground = (activated, triggered) => {
  switch (true) {
    case activated && triggered:
      return darken(0.2, "black");
    case activated && !triggered:
      return "grey";
    case !activated && triggered:
      return "#eef";
    default:
      return "#f9f9f9";
  }
};

const Cell = styled.div.attrs(({ activated, triggered }) => ({
  style: {
    background: getBackground(activated, triggered)
  }
}))`
  border-radius: 4px;
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  margin: 2px;
`;

export default Cell;
