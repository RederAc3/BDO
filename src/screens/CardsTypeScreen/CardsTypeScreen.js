import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Container } from './style';

import getSenderCards from '../../functions/BDOApi/getSenderCards';
import getCarrierCards from '../../functions/BDOApi/getCarrierCards';
import getReceiverCards from '../../functions/BDOApi/getReceiverCards';
import CustomButton from "../../components/CustomButtom/CustomButton";

const CardsTypeScreen = ({ route, navigation }) => {

    const companyType = route.name;
    const [senderCards, setSenderCard] = useState([]);
    const [carrierCards, setCarrierCard] = useState([]);
    const [receiverCards, setReceiverCard] = useState([]);
    const [role, setRole] = useState();

    let visibilityButton = {
        PLANNED: role === 0,
        APPROVED: role != 2,
        WITHDRAWN: true,
        TRANSPORT_CONFIRMATION: true,
        CONFIRMATION_GENERATED: true,
        REJECTED: true,
        RECEIVE_CONFIRMATION: true,
    };

    useFocusEffect(
        useCallback(() => {
            companyType === 'sender' ? (
                getSenderCards(setSenderCard),
                setRole(0)
            ) : {}
            companyType === 'carrier' ? (
                getCarrierCards(setCarrierCard),
                setRole(1)
            ) : {}
            companyType === 'receiver' ? (
                getReceiverCards(setReceiverCard),
                setRole(2)
            ) : {}
        }, []),
    );

    useEffect(() => {
        companyType === 'sender' ? (
            getSenderCards(setSenderCard),
            setRole(0)
        ) : {}
        companyType === 'carrier' ? (
            getCarrierCards(setCarrierCard),
            setRole(1)
        ) : {}
        companyType === 'receiver' ? (
            getReceiverCards(setReceiverCard),
            setRole(2)
        ) : {}
    }, [])

    const filterCards = (companyType, cardStatusCode) => {

        if (companyType === 'sender') {
            return senderCards.filter(val => val.cardStatusCodeName === cardStatusCode)
        }
        if (companyType === 'carrier') {
            return carrierCards.filter(val => val.cardStatusCodeName === cardStatusCode)
        }
        if (companyType === 'receiver') {
            return receiverCards.filter(val => val.cardStatusCodeName === cardStatusCode)
        }
    }

    const filteredCards = {
        PLANNED: filterCards(companyType, "PLANNED"),
        APPROVED: filterCards(companyType, "APPROVED"),
        WITHDRAWN: filterCards(companyType, "WITHDRAWN"),
        TRANSPORT_CONFIRMATION: filterCards(companyType, "TRANSPORT_CONFIRMATION"),
        CONFIRMATION_GENERATED: filterCards(companyType, "CONFIRMATION_GENERATED"),
        REJECTED: filterCards(companyType, "REJECTED"),
        RECEIVE_CONFIRMATION: filterCards(companyType, "RECEIVE_CONFIRMATION"),
    }

    const getPlannedCards = () => {
        navigation.navigate('Lista', { cards: filteredCards.PLANNED, role: role })
    }

    const getApprovedCards = () => {
        navigation.navigate('Lista', { cards: filteredCards.APPROVED, role: role })
    }

    const getWithdrawnCards = () => {
        navigation.navigate('Lista', { cards: filteredCards.WITHDRAWN, role: role })
    }

    const getTransportConfirmationCard = () => {
        navigation.navigate('Lista', { cards: filteredCards.TRANSPORT_CONFIRMATION, role: role })
    }

    const getConfirmationGeneratedCard = () => {
        navigation.navigate('Lista', { cards: filteredCards.CONFIRMATION_GENERATED, role: role })
    }

    const getRejectedCard = () => {
        navigation.navigate('Lista', { cards: filteredCards.REJECTED, role: role })
    }

    const getReceiveConfirmedCard = () => {
        navigation.navigate('Lista', { cards: filteredCards.RECEIVE_CONFIRMATION, role: role })
    }

    const getNumberOfCards = (statusCard) => {
        let number = '';

        statusCard === "PLANNED" && filteredCards.PLANNED.length ? number = `[ ${filteredCards.PLANNED.length} ]` : number
        statusCard === "APPROVED" && filteredCards.APPROVED.length ? number = `[ ${filteredCards.APPROVED.length} ]` : number
        statusCard === "WITHDRAWN" && filteredCards.WITHDRAWN.length ? number = `[ ${filteredCards.WITHDRAWN.length} ]` : number
        statusCard === "TRANSPORT_CONFIRMATION" && filteredCards.TRANSPORT_CONFIRMATION.length ? number = `[ ${filteredCards.TRANSPORT_CONFIRMATION.length} ]` : number
        statusCard === "CONFIRMATION_GENERATED" && filteredCards.CONFIRMATION_GENERATED.length ? number = `[ ${filteredCards.CONFIRMATION_GENERATED.length} ]` : number
        statusCard === "REJECTED" && filteredCards.REJECTED.length ? number = `[ ${filteredCards.REJECTED.length} ]` : number
        statusCard === "RECEIVE_CONFIRMATION" && filteredCards.RECEIVE_CONFIRMATION.length ? number = `[ ${filteredCards.RECEIVE_CONFIRMATION.length} ]` : number

        return number
    }

    return (
        <Container>
            {visibilityButton.PLANNED ? <CustomButton title={`Planowana ${getNumberOfCards("PLANNED")}`} onPress={getPlannedCards} /> : <></>}
            {visibilityButton.APPROVED ? <CustomButton title={`Zatwierdzone ${getNumberOfCards("APPROVED")}`} onPress={getApprovedCards} /> : <></>}
            <CustomButton title={`Wycofane ${getNumberOfCards("WITHDRAWN")}`} onPress={getWithdrawnCards} />
            <CustomButton title={`Potwierdzenie transportu ${getNumberOfCards("TRANSPORT_CONFIRMATION")}`} onPress={getTransportConfirmationCard} />
            <CustomButton title={`Potwierdzenie wygenerowane ${getNumberOfCards("CONFIRMATION_GENERATED")}`} onPress={getConfirmationGeneratedCard} />
            <CustomButton title={`Odrzucona ${getNumberOfCards("REJECTED")}`} onPress={getRejectedCard} />
            <CustomButton title={`Potwierdzenie przyjęcia ${getNumberOfCards("RECEIVE_CONFIRMATION")}`} onPress={getReceiveConfirmedCard} />
        </Container>
    )
}

export default CardsTypeScreen;