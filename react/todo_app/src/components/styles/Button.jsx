import styled from 'styled-components'

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$btnColor || '#426eff'};
  border: none;
  padding: 15px;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => props.$btnColor || '#426eff'};
    color: ${(props) => props.$btnColor || '#426eff'};
    background-color: white;
    padding: 14px;
  }
`
