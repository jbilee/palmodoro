import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const NumberInput = ({ id, min = 1, max, defaultValue, onChange }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    const inputField = inputRef.current;
    const focusOn = () => setIsFocused(true);
    const focusOff = () => setIsFocused(false);
    inputField.addEventListener("focus", focusOn);
    inputField.addEventListener("blur", focusOff);
    return () => {
      inputField.removeEventListener("focus", focusOn);
      inputField.removeEventListener("blur", focusOff);
    };
  }, []);

  return (
    <Wrapper $isFocused={isFocused}>
      <Border $isFocused={isFocused}>
        <input
          type="number"
          inputMode="numeric"
          ref={inputRef}
          onBlur={() => setIsFocused(false)}
          {...{ id, min, max, defaultValue, onChange }}
        />
      </Border>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isFocused: boolean }>`
  box-sizing: border-box;
  background: white;
  width: 60px;
  height: 36px;
  border-radius: 4px;
  border: ${({ $isFocused }) => ($isFocused ? "1px solid #ed5b3a" : "1px solid rgba(0, 0, 0, 0.23)")};
  &:hover {
    border: 1px solid #ed5b3a;
  }
  @media (min-width: 600px) {
    width: 70px;
  }
`;

const Border = styled.div<{ $isFocused: boolean }>`
  border-radius: 3px;
  border: ${({ $isFocused }) => ($isFocused ? "1px solid #ed5b3a" : "1px solid rgba(0, 0, 0, 0)")};
  & > input {
    border-radius: inherit;
    border: none;
    padding: 8px 8px;
    width: 100%;
    font-size: 0.9rem;
    text-align: center;
  }
`;

export default NumberInput;
