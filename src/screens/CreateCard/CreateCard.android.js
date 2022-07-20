import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import { Container, ButtonWrapper } from './style';

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButtom from "../../components/CustomButton/CustomButton";
import CustomPicker from "./CustomPicker/CustomPicker";
import createCard from "../../functions/BDOApi/createCard";

const CreateCard = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateTime, setDateTime] = useState();
    const [selectedCompany, setSelectedCompany] = useState();
    const [selectedPlace, setSelectedPlace] = useState();
    const [selectedWasteCodeId, setselectedWasteCodeId] = useState();
    const [selectedVehicle, setSelectedVehicle] = useState();
    const [date, setDate] = useState();
    const [wasteMass, setWasteMass] = useState();
    const [errorCheck, setErrorCheck] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('Stwórz zaplanowaną kartę');

    const showDateTimePicker = () => {
        setDatePickerVisibility(true);
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
    }
    const onPlannedCardPressed = async () => {
        checkErrors()
        let ok = !!(selectedCompany && selectedPlace && selectedVehicle && selectedWasteCodeId && wasteMass && date)

        ok ? setButtonTitle(<ActivityIndicator />) : ''

        ok ? await createCard(selectedCompany, selectedPlace, selectedWasteCodeId, selectedVehicle, parseFloat(wasteMass), date) : ''
        ok ? (
            setButtonTitle('Stworzono kartę!'),
            setTimeout(() => setButtonTitle('Stwórz zaplanowaną kartę'), 4000)
        ) : ""
    }

    return (
        <Container
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
        >
            <CustomPicker
                title='Przejmujący'
                selectedValue={selectedCompany}
                onValueChange={setSelectedCompany}
                error={errorCheck}
                items={[
                    {
                        label: 'Wybierz przejmującego',
                        value: '',
                    },
                    {
                        label: 'BSK RETURN SPÓŁKA AKCYJNA',
                        value: '8a8c5425-4fb7-4a8a-a89e-f49b1af1077c',
                    }
                ]}
            />
            <CustomPicker
                title='Miejsce prowadzenia działalności'
                selectedValue={selectedPlace}
                onValueChange={setSelectedPlace}
                error={errorCheck}
                items={[
                    {
                        label: 'Wybierz miejsce działalności',
                        value: '',
                    },
                    {
                        label: 'Zawiercie Okólna 10',
                        value: 'b996fc4d-fbae-4ffa-8bec-48e73f21951b',
                    }
                ]}
            />
            <CustomPicker
                title='Rodzaj odpadu'
                selectedValue={selectedWasteCodeId}
                onValueChange={setselectedWasteCodeId}
                error={errorCheck}
                items={[
                    {
                        label: 'Wybierz rodzaj odpadu',
                        value: '',
                    },
                    {
                        label: 'Żelazo i stal',
                        value: '854',
                    },
                    {
                        label: 'Odpady z toczenia i piłowania żelaza oraz jego stopów',
                        value: '647',
                    }
                ]}
            />
            <CustomPicker
                title='Pojazd'
                selectedValue={selectedVehicle}
                onValueChange={setSelectedVehicle}
                error={errorCheck}
                items={[
                    {
                        label: 'Wybierz pojazd',
                        value: '',
                    },
                    {
                        label: 'SMT 53SW',
                        value: 'SMT53SW',
                    },
                    {
                        label: 'SWE 42FH',
                        value: 'SWE42FH',
                    }
                ]}
            />
            <CustomInput
                title='Waga'
                value={wasteMass}
                placeholder='Podaj wagę'
                keyboardType='numeric'
                onChangeText={setWasteMass}
                error={errorCheck}
            />
            <CustomInput
                title='Data i godzina'
                value={dateTime}
                placeholder='Kliknij aby ustawić'
                editable={false}
                onPress={showDateTimePicker}
                error={errorCheck}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={new Date()}
                minimumDate={new Date()}
                locale={"en_GB"}
                onConfirm={dateTimeConfirm}
                onCancel={hideDateTimePicker}
            />
            <ButtonWrapper>
                <CustomButtom title={buttonTitle} onPress={onPlannedCardPressed} />
            </ButtonWrapper>
        </Container>
    )
}

export default CreateCard;