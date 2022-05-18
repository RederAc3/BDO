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

export const Error = styled.Text`
color: #CC0000;
font-size: 12px;
padding: 0 0 10px;
`;

export const LoginTitleText = styled.Text`
font-size: 30px;
font-weight: bold;
color: #000;
text-align: center;
margin: 15px 0;
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
height: 40px;
margin: 5px 0;
padding: 0 10px;
background-color: #EFEFEF;
border-radius: 10px;
${({ error, value }) => error ? !value.length ? 'border: 1px solid #CC0000' : '' : ''};
`;

export const LabelInputText = styled.Text`
margin: 0 5px;
`;

export const LoginContainer = styled.View`
margin: 15px 0;
justify-content: center;
align-items: center;
`;

export const BackLoginButton = styled.TouchableOpacity`
padding: 10px 50px;  
`;

export const BackLoginText = styled.Text`
font-size: 15px;
color: #0010CF;

`;