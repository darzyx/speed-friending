import styled, { css } from "styled-components";

export const centerMiddleCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type CenterMiddlePropsType = { textAlign?: string };
const CenterMiddle = styled.div<CenterMiddlePropsType>`
  ${centerMiddleCSS}
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
`;

export default CenterMiddle;
