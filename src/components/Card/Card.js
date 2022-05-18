import React from "react";
import { useNavigation } from '@react-navigation/native';
import moment from "moment";

import Property from './Property/Property';
import CustomButton from "../CustomButtom/CustomButton";

import { Container, Header, HeaderText, StatusText, PropertiesWrapper, ButtonsWrapper} from './style'

const Card = ({
    role,
    plannedTransportTime,
    wasteCodeDescription,
    cardStatus,
    cardStatusCodeName,
    receiverName,
    kpoId,
}) => {

const { navigate } = useNavigation()

const moreButtonPress = () => {
    navigate('Informacje', { kpoId, role, cardStatusCodeName, wasteCodeDescription });
}

return (
        <Container>
            <Header>
                <HeaderText>
                    {receiverName}
                </HeaderText>
            </Header>

            <StatusText>
                {cardStatus}
            </StatusText>

            <PropertiesWrapper>
                <Property title={'rodzaj'} value={wasteCodeDescription} />
                <Property title={'Data i godzina'} value={moment(plannedTransportTime).format('DD/MM/YYYY hh:mm')} />
            </PropertiesWrapper>

            <ButtonsWrapper>
                    <CustomButton title="Więcej" onPress={moreButtonPress} />
            </ButtonsWrapper>
        </Container>
    )
};

export default Card;