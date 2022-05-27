import React, { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import moment from 'moment';

import { Container, ModalPicker, ConfirmPickerContainer, Confirm, ButtonWrapper } from './style';

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButtom from "../../components/CustomButtom/CustomButton";
import createCard from "../../functions/BDOApi/createCard";

const CreateCard = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isVehiclePickerVisible, setIsVehiclePickerVisibility] = useState(false);
    const [isReceiverPickerVisible, setIsReceiverPickerVisibility] = useState(false);
    const [isWasteCodePickerVisible, setIsWasteCodePickerVisibility] = useState(false);
    const [isPlacePickerVisible, setIsPlacePickerVisibility] = useState(false);
    const [dateTime, setDateTime] = useState('Kliknij aby ustawić');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedWasteCodeId, setSelectedWasteCodeId] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [date, setDate] = useState('');
    const [wasteMass, setWasteMass] = useState('');
    const [errorCheck, setErrorCheck] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('Stwórz zaplanowaną kartę');

    const showDateTimePicker = () => {
        setDatePickerVisibility(true);
        console.log(isDatePickerVisible)
    };

    const hideDateTimePicker = () => {
        setDatePickerVisibility(false);
    };

    const offsetDate = (date) => {
        const dateTime = new Date(date).setHours(date.getHours() - (date.getTimezoneOffset() / 60) );
        return new Date(dateTime)
    }
    
    const dateTimeConfirm = (date) => {
        hideDateTimePicker();
        setDateTime(moment(date).format('DD/MM/YYYY HH:mm'));
        setDate(offsetDate(date));
    };

    const checkErrors = () => {
        !(selectedCompany && selectedPlace && selectedVehicle && selectedWasteCodeId && wasteMass && date) ? (
            setErrorCheck(true),
            Alert.alert(
                'Wypełnij wszystkie pola!',
                '',
                [{
                    text: "OK"
                }]
            )
        ) : setErrorCheck(false)
    };

    const onPlannedCardPressed = async () => {
        checkErrors();
        let ok = !!(selectedCompany && selectedPlace && selectedVehicle && selectedWasteCodeId && wasteMass && date)
        ok ? setButtonTitle(<ActivityIndicator />) : ''
        ok ? await createCard(selectedCompany, selectedPlace, selectedWasteCodeId, selectedVehicle, parseFloat(wasteMass), date) : ''
        ok ? (
            setButtonTitle('Stworzono kartę!'),
            setTimeout(() => setButtonTitle('Stwórz zaplanowaną kartę'), 4000)
        ) : ""
    }

    const openVehiclePicker = () => {
        setIsVehiclePickerVisibility(true);
    }

    const closeVehiclePicker = () => {
        setIsVehiclePickerVisibility(false);
    }

    const openWasteCodePicker = () => {
        setIsWasteCodePickerVisibility(true)
    }

    const closeWasteCodePicker = () => {
        setIsWasteCodePickerVisibility(false)
    }

    const openPlacePicker = () => {
        setIsPlacePickerVisibility(true)
    }

    const closePlacePicker = () => {
        setIsPlacePickerVisibility(false)
    }

    const openReceiverPicker = () => {
        setIsReceiverPickerVisibility(true)
    }

    const closeReceiverPicker = () => {
        setIsReceiverPickerVisibility(false)
    }

    return (
        <Container
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}>

            {isReceiverPickerVisible ? (
                <ModalPicker>
                    <ConfirmPickerContainer onPress={closeReceiverPicker}>
                        <Confirm>OK</Confirm>
                    </ConfirmPickerContainer>
                    <Picker
                        selectedValue={selectedCompany}
                        onValueChange={itemValue => setSelectedCompany(itemValue)}>
                        <Picker.Item label="Wybierz przejmującego" value="" />
                        <Picker.Item label="BSK RETURN SPÓŁKA AKCYJNA" value="8a8c5425-4fb7-4a8a-a89e-f49b1af1077c" />

                    </Picker>
                </ModalPicker>
            ) : <></>}

            {!isReceiverPickerVisible ? (
                <CustomInput
                    mode='text'
                    title='Miejsce prowadzenia działalności'
                    value={selectedCompany}
                    placeholder='Kliknij aby wybrać z listy'
                    editable={false}
                    error={errorCheck}
                    onPressIn={openReceiverPicker} />
            ) : <></>}

            {isPlacePickerVisible ? (
                <ModalPicker>
                    <ConfirmPickerContainer onPress={closePlacePicker}>
                        <Confirm>OK</Confirm>
                    </ConfirmPickerContainer>
                    <Picker
                        selectedValue={selectedPlace}
                        onValueChange={itemValue => setSelectedPlace(itemValue)}>
                        <Picker.Item label="Wybierz miejsce działalności" value="" />
                        <Picker.Item label="Zawiercie Okólna 10" value="b996fc4d-fbae-4ffa-8bec-48e73f21951b" />
                    </Picker>
                </ModalPicker>
            ) : <></>}

            {!isPlacePickerVisible ? (
                <CustomInput
                    mode='text'
                    title='Miejsce prowadzenia działalności'
                    value={selectedPlace}
                    placeholder='Kliknij aby wybrać z listy'
                    editable={false}
                    error={errorCheck}
                    onPressIn={openPlacePicker} />
            ) : <></>}

            {isWasteCodePickerVisible ? (
                <ModalPicker>
                    <ConfirmPickerContainer onPress={closeWasteCodePicker}>
                        <Confirm>OK</Confirm>
                    </ConfirmPickerContainer>
                    <Picker
                        selectedValue={selectedWasteCodeId}
                        onValueChange={itemValue => setSelectedWasteCodeId(itemValue)}>
                        <Picker.Item label="Wybierz rodzaj odpadu" value="" />
                        <Picker.Item label="Odpady z toczenia i piłowania żelaza oraz jego stopów" value="647" />
                        <Picker.Item label="Żelazo i stal" value="854" />
                        <Picker.Item label="Odpady z rozdrabniania odpadów zawierających metale" value="974" />

                    </Picker>
                </ModalPicker>
            ) : <></>}

            {!isWasteCodePickerVisible ? (
                <CustomInput
                    mode='text'
                    title='Rodzaj odpadu'
                    value={selectedWasteCodeId}
                    placeholder='Kliknij aby wybrać z listy'
                    editable={false}
                    error={errorCheck}
                    onPressIn={openWasteCodePicker} />
            ) : <></>}

            {isVehiclePickerVisible ? (
                <ModalPicker>
                    <ConfirmPickerContainer onPress={closeVehiclePicker}>
                        <Confirm>OK</Confirm>
                    </ConfirmPickerContainer>
                    <Picker
                        selectedValue={selectedVehicle}
                        style={{
                            height: 20,
                        }}
                        mode='dropdown'
                        onValueChange={itemValue => setSelectedVehicle(itemValue)}>
                        <Picker.Item label="Wybierz pojazd" value="" />
                        <Picker.Item label="SMT 53SW" value="SMT53SW" />

                    </Picker>
                </ModalPicker>
            ) : <></>}

            {!isVehiclePickerVisible ? (
                <CustomInput
                    mode='text'
                    title='Pojazd'
                    value={selectedVehicle}
                    placeholder='Kliknij aby wybrać z listy'
                    editable={false}
                    error={errorCheck}
                    onPressIn={openVehiclePicker} />
            ) : <></>}

            <CustomInput
                mode='text'
                title='Waga'
                value={wasteMass}
                placeholder='Podaj wagę'
                error={errorCheck}
                keyboardType='numeric'
                onChangeText={setWasteMass}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={new Date()}
                locale={"en_GB"}
                display="inline"
                minimumDate={new Date()}
                cancelTextIOS="Anuluj"
                confirmTextIOS="Potwierdź"
                onConfirm={dateTimeConfirm}
                onCancel={hideDateTimePicker}
            />
            <CustomInput
                mode='text'
                title='Data i godzina'
                value={dateTime}
                placeholder='Kliknij aby ustawić'
                editable={false}
                error={errorCheck}
                onPressIn={showDateTimePicker}
            />

            <ButtonWrapper>
                <CustomButtom title={buttonTitle} onPress={onPlannedCardPressed} />
            </ButtonWrapper>
        </Container>
    )
}

export default CreateCard;