import React, { useState } from "react";
import axios from "axios";
import { View, Keyboard, ActivityIndicator } from 'react-native';
import isKeysCorrect from '../../functions/BDOApi/isKeysCorrect';

import { Container, Info, ApiTitle, ErrorText, TouchableOpacitySubmitButton, SubmitButtonText, InputSelect, LabelInputText } from './style' ;

const ApiKeyRegistrationScreen = ({ route, navigation }) => {
    const { username, password } = route.params
    const [buttonTitle, setButtonTitle] = useState('Zarejestruj');
    const [publicKey, setPublicKey] = useState('');
    const [secureKey, setSecureKey] = useState('');
    const [error, setError] = useState('')

    const createUser = async (publicKey, secureKey) => {
        const data = {
            username,
            password,
            ClientId: publicKey,
            ClientSecret: secureKey
        }

        return (await axios.post('https://bdo.rdnt.pl/app/FPRRMUXZIDKIOKXOPI/signup', data)).data;
    }
    const onRegistrationButtonPress = async () => {

        publicKey.length && secureKey.length ? (
            setButtonTitle(<ActivityIndicator />),

            await isKeysCorrect(publicKey, secureKey) ? (await createUser(publicKey, secureKey)).status === 'success' ? (
                setPublicKey(''),
                setSecureKey(''),
                navigation.navigate('Logowanie', { message: 'Rejestracja przebiegła poprawnie! \n Możesz się zalogować' })
            ) : (
                setError('Wystąpił błąd, spróbuj ponowie')
            ) : (
                setError('Klucze niepoprawne!'),
                setButtonTitle('Zarejestruj')
            )

        ) : setError('Wprowadź klucze aby kontynuować!')
        Keyboard.dismiss();
    }

    const validateInput = () => {
        !publicKey.length && !secureKey.length ? setError('Podaj klucze api!') : setError('');
    }

    return (
        <Container>
            <ApiTitle>{'Klucze API'}</ApiTitle>
            <Info>{'Znajdziesz je w sekcji: "Wybrany podmiot" Opcje > API'}</Info>
            <ErrorText>{error}</ErrorText>
            <View>
                <LabelInputText>{'Klucz publiczny'}</LabelInputText>
                <InputSelect placeholder={'PublicKeyID'} value={publicKey.trim()} error={error} onChangeText={setPublicKey} onSubmitEditing={validateInput} />

                <LabelInputText>{'Klucz prywatny'}</LabelInputText>
                <InputSelect placeholder={'SecureKeyID'} value={secureKey.trim()} error={error} onChangeText={setSecureKey} onSubmitEditing={validateInput} />

                <TouchableOpacitySubmitButton onPress={onRegistrationButtonPress}>
                    <SubmitButtonText>{buttonTitle}</SubmitButtonText>
                </TouchableOpacitySubmitButton>
            </View>
        </Container>
    )
}

export default ApiKeyRegistrationScreen;