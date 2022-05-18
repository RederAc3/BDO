import React from "react";

import { Container, Name, Value } from './style'

const Property = ({ title, value }) => (
    <Container>
        <Name>
            {title}
        </Name>
        <Value numberOfLines={4}>
            {value}
        </Value>
    </Container>
);

export default Property;