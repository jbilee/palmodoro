import styled from "styled-components";
import ImageUploader from "./ImageUploader";
import { useAppSelector } from "../hooks";
import type { ReactNode } from "react";
import Settings from "./Settings";

const Layout = ({ children }: { children: ReactNode }) => {
  const wallpaper = useAppSelector((state) => state.wallpaper);
  return (
    <Background $image={wallpaper}>
      <Settings />
      <Foreground>
        <MenuBar></MenuBar>
        <ImageUploader />
        {children}
      </Foreground>
    </Background>
  );
};

const Background = styled.div<{ $image: string }>`
  height: 100vh;
  background-image: ${({ $image }) => `url(${$image})`};
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 300px rgba(0, 0, 0, 0.7) inset;
  background-color: #171130eb;
  background-blend-mode: hard-light;
  transition: background-image 800ms;
`;

const Foreground = styled.div`
  display: grid;
  place-content: center center;
  padding: 36px;
  backdrop-filter: blur(3px);
  height: inherit;
`;

const MenuBar = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

export default Layout;
