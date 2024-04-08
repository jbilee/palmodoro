import styled from "styled-components";
import { useAppSelector } from "../hooks";
import type { ReactNode } from "react";

const Wallpaper = ({ children }: { children: ReactNode }) => {
  const wallpaper = useAppSelector((state) => state.wallpaper);
  return (
    <Background $image={wallpaper}>
      <Foreground>{children}</Foreground>
    </Background>
  );
};

const Background = styled.div<{ $image: string }>`
  height: 100vh;
  background-image: ${({ $image }) => `url(${$image})`};
  background-size: cover;
  box-shadow: 0 0 300px rgba(0, 0, 0, 0.7) inset;
  background-color: #3e3789;
  background-blend-mode: hard-light;
`;

const Foreground = styled.div`
  padding: 36px;
  backdrop-filter: blur(3px);
  height: inherit;
`;

export default Wallpaper;
