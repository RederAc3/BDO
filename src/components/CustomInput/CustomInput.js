import React from "react";
import { TouchableOpacity } from 'react-native'

import { Container, TitleInput, InputElement } from './style'

const CustomInput = ({ title, value, placeholder, editable, keyboardType, onPress, onChangeText, error, onPressIn }) => {

    return (
        <Container style={{borderWidth: error ? ( !value ? 1 : 0 ) : 0}}>
            <TitleInput>{title}</TitleInput>
            <TouchableOpacity onPress={onPress}>
                <InputElement
                    value={value}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    editable={editable}
                    onChangeText={onChangeText}
                    onPressIn={onPressIn}
                />
            </TouchableOpacity>
        </Container>
    )
}

export default CustomInput;