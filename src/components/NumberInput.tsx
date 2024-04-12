import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";
import styled from "styled-components";

const NumberInput = ({ id, type, min, max, defaultValue, onChange }: InputHTMLAttributes<HTMLInputElement>) => {
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
    <Wrapper $isFocused={isFocused} onMouseOver={() => console.log("mouse is over")}>
      <Border $isFocused={isFocused}>
        <input
          ref={inputRef}
          id={id}
          type={type}
          min={min}
          max={max}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={() => setIsFocused(false)}
        />
      </Border>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $isFocused: boolean }>`
  box-sizing: border-box;
  background: white;
  max-width: 70px;
  height: 36px;
  border-radius: 4px;
  border: ${({ $isFocused }) => ($isFocused ? "1px solid #ed5b3a" : "1px solid rgba(0, 0, 0, 0.23)")};
  &:hover {
    border: 1px solid #ed5b3a;
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
