import React from 'react';

import { Button, ButtonText } from './style';

const CustomButtom = ({ title, onPress, color, style }) => {

    return (
        <Button onPress={onPress} style={style} color={color}>
            <ButtonText>{title}</ButtonText>
        </Button>
    )
}

export default CustomButtom;