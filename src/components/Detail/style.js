import styled from "styled-components";

export const Container = styled.View`
align-items: center;
padding: 10px;
width: ${({ size }) => 100 / size}%;
`;
export const DetailName = styled.Text`
text-align: center;
`;

export const DetailValue = styled.Text`
text-align: center;
color: #000;
padding: 3px 0;
`;