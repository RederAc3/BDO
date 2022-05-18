import React from "react";
import { ActivityIndicator } from 'react-native';
import { Container, LoadingImage } from './style';

const loadingLogo = require('../../../assets/img/loadingLogo.png')

const LoadingScreen = () => {

    return (
        <Container>
            <LoadingImage
                resizeMode='center'
                source={loadingLogo} />
            <ActivityIndicator size="large" />
        </Container>
    )
}

export default LoadingScreen;