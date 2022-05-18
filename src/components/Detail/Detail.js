import React from 'react';

import { Container, DetailName, DetailValue } from './style';

const Detail = ({ name, value, size}) => {

    return (
        <Container size={size}>
            <DetailName>{name}</DetailName>
            <DetailValue>{value}</DetailValue>
        </Container>
    )
}

export default Detail;