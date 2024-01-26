import styled from 'styled-components'

export const TaskField = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: calc(100% - 10px);

  div {
    display: flex;
    gap: 5px;
  }

  input[type='checkbox']:checked ~ p {
    color: #ccc;
    text-decoration: line-through;
  }
`
