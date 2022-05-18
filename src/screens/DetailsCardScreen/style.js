import styled from "styled-components";

export const Loader = styled.View`
position: absolute;
justify-content: center;
align-items: center;
right: 0;
bottom: 300px;
left: 0;
`;

export const Container = styled.ScrollView`
width: 100%;
`;

export const LineContainer = styled.View`
flex-direction: row;
align-items: center;
`;

export const Line = styled.View`
flex: 1;
height: 1px;
background-color: #000;
`;

export const InfContainer = styled.View`
padding: 20px 0;
`;

export const CompanyItem = styled.View`
padding: 10px;
`;

export const RoleText = styled.Text`
font-weight: 500;
font-size: 12px;
text-align: center;
`;

export const CompanyText = styled.Text`
font-weight: 700;
color: #000;
text-align: center;
`;

export const DetailContainer = styled.View`
flex-direction: row;
`;

export const ButtonContainer = styled.View`
padding: 0 30px 30px;
`;
