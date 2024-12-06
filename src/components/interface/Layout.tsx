import styled from "styled-components";
import Settings from "./Settings";
import { useAppSelector } from "../../reducers/hooks";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const wallpaper = useAppSelector((state) => state.wallpaper);
  return (
    <Background $image={wallpaper}>
      <Settings />
      <Foreground>{children}</Foreground>
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
  padding: 54px 24px 0;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  @media (min-width: 600px) {
    padding: 0;
    place-content: center;
    height: inherit;
  }
`;

export default Layout;
