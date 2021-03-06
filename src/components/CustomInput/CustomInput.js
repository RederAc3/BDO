import React from "react";
import { TouchableOpacity } from 'react-native'

import { Container, TitleInput, InputElement, IconTouch } from './style'

const CustomInput = ({ title, value, placeholder, editable, keyboardType, onPress, onChangeText, error, onPressIn, icon, onPressIcon }) => {

    return (
        <Container style={{
            borderWidth: error ? ( !value ? 1 : 0 ) : 0,
            flexDirection: title ? 'column' : 'row'
        }}>
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
            { icon && <IconTouch onPress={onPressIcon}>{ icon }</IconTouch> }
        </Container>
    )
}

export default CustomInput;