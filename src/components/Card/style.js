import styled from 'styled-components';

export const Container = styled.View`
background-color: #fff; 
margin: 10px;
padding: 10px;
border-radius: 10px;
`;

export const Header = styled.View`
width: 100%;

`;

export const HeaderText = styled.Text`
text-align: center;
font-weight: bold;
font-size: 18px;
color: #000;
`;

export const StatusText = styled.Text`
text-align: center;
text-transform: uppercase;
`;

export const PropertiesWrapper = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`;

export const ButtonsWrapper = styled.View`
display:flex; 
flex-direction: row;
justify-content: space-evenly;
`;