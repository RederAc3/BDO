import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { View, Keyboard, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  LoginTitleText,
  InfoText,
  TouchableOpacitySubmitButton,
  SubmitButtonText,
  InputSelect,
  LabelInputText,
  RegistrationButton,
  RegistrationText
} from './style';

import { backend } from '../../functions/BDOApi/config'

const LoginScreen = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState(route.params ? route.params.message : '');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setInfo(route.params ? route.params.message : '')
      return () => {
        setUsername('');
        setPassword('');
        setError('');
        setInfo('')
      }
    }, [])
  )

  const onLoginButtonPressed = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      if (username.length && password.length) {

        const { status, message, token, companyId } = (await axios.post(`${backend}/app/FPRRMUXZIDKIOKXOPI/signin`, { username, password })).data;
        if (status === 'success') {
          Keyboard.dismiss()
          const expiresTime = ((token.ExpiresIn * 1000) + Date.now()).toString()

          AsyncStorage.setItem('token', token.AccessToken)
          AsyncStorage.setItem('username', username)
          AsyncStorage.setItem('expiresTime', expiresTime)
          AsyncStorage.setItem('companyId', companyId)
          navigation.navigate("Home")
        } else setError(message)

      } else validateInput()

    } catch (err) {
      setError(err.message)
      setTimeout(() => setError(''), 2000)
    }
    setLoading(false);
  }

  const validateInput = () => {
    !username.length || !password.length ? setError('Podaj dane!') : setError(''), setInfo('');
  }

  const onRegistrationButtonPressed = () => {
    navigation.navigate('Rejestracja');
  }

  return (
    <Container>
      <LoginTitleText>{'Logowanie'}</LoginTitleText>
      <InfoText error={error}>{error ? error : info}</InfoText>
      <View>
        <LabelInputText>{'Login'}</LabelInputText>
        <InputSelect
          placeholder={'Podaj login...'}
          value={username.trim()}
          error={error}
          onChangeText={setUsername}
          onSubmitEditing={validateInput}
        />

        <LabelInputText>{'Has??o'}</LabelInputText>
        <InputSelect
          placeholder={'Podaj has??o...'}
          secureTextEntry={true}
          value={password.trim()}
          error={error}
          onChangeText={setPassword}
          onSubmitEditing={validateInput}
        />

        <TouchableOpacitySubmitButton onPress={onLoginButtonPressed}>
          <SubmitButtonText>{loading ? <ActivityIndicator /> : 'Zaloguj'}</SubmitButtonText>
        </TouchableOpacitySubmitButton>

        <RegistrationButton onPress={onRegistrationButtonPressed}>
          <RegistrationText>{'Stw??rz konto'}</RegistrationText>
        </RegistrationButton>

      </View>
    </Container>
  );
};



export default LoginScreen;