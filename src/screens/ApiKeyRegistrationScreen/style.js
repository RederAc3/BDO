import styled from "styled-components";

export const Container = styled.View`
position: relative;
background-color: #fff;
width: 100%;
height: 100%;
align-items: center;
padding-bottom: 50px;
    justify-content: center;
`;

export const Info = styled.Text`
    font-size: 12px;
`;

export const ApiTitle = styled.Text`
font-size: 30px;
font-weight: bold;
color: #000;
text-align: center;
margin: 5px 0;
`;

export const ErrorText = styled.Text`
    color: #DB5F5F;
    margin: 20px 0 5px;
`;

export const TouchableOpacitySubmitButton = styled.TouchableOpacity`
    width: 250px;
    height: 40px;
    margin-top: 20px;
    background-color: #0010CF;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin: 20px auto 0;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
`;

export const InputSelect = styled.TextInput`
    min-width: 80%;
    max-width: 90%;
    height: 50px;
    height: 40px;
    margin: 5px 0;
    padding: 0 10px;
    background-color: #EFEFEF;
    border-radius: 10px;
    ${({ error, value }) => error ? !value.length ? 'border: 1px solid #CC0000' : '' : ''};
`;

export const LabelInputText = styled.Text`
/* margin-top: 20px; */
`;