import styled from "styled-components";

export const Button = styled.TouchableOpacity`
    margin-top: 20px;
    background-color: ${({ color }) => color || '#0010CF'};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    padding: 10px 30px;
`;

export const ButtonText = styled.Text`
    font-weight: 700;
    font-size: 12px;
    color: #fff;
`;