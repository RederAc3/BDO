import React from "react";
import { Picker } from "@react-native-picker/picker";

import { InputContainer, InputContainerTitle } from './style';

const CustomPicker = ({ title, selectedValue, onValueChange, items, error}) => {

    return (
        <InputContainer style={{
            borderWidth: error ? ( !selectedValue ? 1 : 0 ) : 0
            }}>
            <InputContainerTitle>{title}</InputContainerTitle>
            <Picker
                selectedValue={selectedValue}
                style={{
                    height: 50,
                    width: '100%'
                }}
                onValueChange={itemValue => onValueChange(itemValue)}
            >
                {items.map(({ label, value }) => <Picker.Item key={value} label={label} value={value} />)}
            </Picker>
        </InputContainer>
    )
}

export default CustomPicker;