import React from "react";
import {HomeItemWrapper, Container, TextHeader, TextDesc } from './style';

const HomeItem = ({ title, desc, onPress }) => {

    return (
        <HomeItemWrapper onPress={onPress}>
            <Container>
                <TextHeader>{title}</TextHeader>
                <TextDesc>{desc}</TextDesc>
            </Container>
        </HomeItemWrapper>
    )
}

export default HomeItem;