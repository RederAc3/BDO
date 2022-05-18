import React, { useState } from "react";
import axios from "axios";
import { View, Text, Keyboard, ActivityIndicator } from 'react-native';
import {
    Container,
    Error,
    LoginTitleText,
    TouchableOpacitySubmitButton,
    SubmitButtonText,
    InputSelect,
    LabelInputText,
    LoginContainer,
    BackLoginButton,
    BackLoginText
} from './style';

const RegistrationScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const avaliableUser = async username => {
        return (await axios.post('https://bdo.rdnt.pl/app/FPRRMUXZIDKIOKXOPI/signup', { username })).data;
    }

    const onRegisterButtonPress = async () => {
        if (loading) {
            return;
        }

        setLoading(true);
        setUsername(username.trim())
        setPassword(password.trim())
        setRepeatedPassword(repeatedPassword.trim())

        validate() === 'validated' ? (await avaliableUser(username)).status === 'success' ? (
            Keyboard.dismiss(),
            setError(''),
            setLoading(false),
            navigation.navigate('Klucze API', { username, password })
        ) : (
            setError('Nazwa użytkownika jest już zajęta!'),
            setLoading(false)
        ) : (
            setError(validate()),
            setLoading(false)
        )
        setLoading(false)
    }

    const validate = () => {
        return username.length && password.length ? password === repeatedPassword ? 'validated' : 'Hasła do siebie nie pasują' : 'Wypełnij wszystkie pola!'
    }

    const onBackLoginButtonPress = () => {
        navigation.navigate('Logowanie');
    }

    return (
        <Container>
            <LoginTitleText>{'Rejestracja'}</LoginTitleText>
            {error ? <Error>{error}</Error> : <></>}
            <View>
                <LabelInputText>{'Nazwa użytkownika'}</LabelInputText>
                <InputSelect
                    placeholder={'Podaj nazwę...'}
                    value={username}
                    error={error}
                    onChangeText={setUsername}
                    onSubmitEditing={validate}
                />

                <LabelInputText>{'Hasło'}</LabelInputText>
                <InputSelect
                    placeholder={'Podaj hasło...'}
                    secureTextEntry={true}
                    value={password}
                    error={error}
                    onChangeText={setPassword}
                    onSubmitEditing={validate}
                />

                <LabelInputText>{'Powtórz hasło'}</LabelInputText>
                <InputSelect
                    placeholder={'Podaj hasło...'}
                    secureTextEntry={true}
                    value={repeatedPassword}
                    error={error}
                    onChangeText={setRepeatedPassword}
                    onSubmitEditing={validate}
                />
                <TouchableOpacitySubmitButton onPress={onRegisterButtonPress}>
                    <SubmitButtonText>{loading ? <ActivityIndicator /> : 'Dalej'}</SubmitButtonText>
                </TouchableOpacitySubmitButton>
                <LoginContainer>
                    <Text>{'Masz już konto?'}</Text>
                    <BackLoginButton onPress={onBackLoginButtonPress}>
                        <BackLoginText>{'Zaloguj się'}</BackLoginText>
                    </BackLoginButton>
                </LoginContainer>
            </View>
        </Container>
    )
}

export default RegistrationScreen;