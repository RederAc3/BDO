import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    margin: 10px;
`;

export const ModalPicker = styled.View`
    width: 100%;
    height: 250px;
    background-color: #fff;
    border-radius: 10px;
    overflow:hidden;
`;

export const ConfirmPickerContainer = styled.TouchableOpacity`
    align-items: center;
`;

export const Confirm = styled.Text`
    padding: 20px 20px 0;
    color: #0010CF;
`;

export const ButtonWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 0 0 20px;
`;