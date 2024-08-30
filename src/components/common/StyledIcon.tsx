import styled from "styled-components";

const StyledIcon = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.span`
  line-height: 5px;
  cursor: pointer;
`;

export default StyledIcon;
