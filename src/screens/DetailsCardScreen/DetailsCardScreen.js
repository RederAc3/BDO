import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import prompt from 'react-native-prompt-android';
import moment from 'moment';
import RNPrint from 'react-native-print';

import {
    Loader,
    Container,
    LineContainer,
    Line,
    InfContainer,
    CompanyItem,
    RoleText,
    CompanyText,
    DetailContainer,
    ButtonContainer
} from './style'

import Detail from '../../components/Detail/Detail';
import CustomButton from "../../components/CustomButton/CustomButton";

import getCardDetails from '../../functions/BDOApi/getCardDetails';
import generateConfirmation from '../../functions/BDOApi/generateConfirmation';
import confirmCard from '../../functions/BDOApi/confirmCard';
import withdrawCard from '../../functions/BDOApi/withdrawCard';
import deleteCard from '../../functions/BDOApi/deleteCard';
import rejectCard from '../../functions/BDOApi/rejectCard';
import confirmReceived from '../../functions/BDOApi/confirmReceived';
import confirmTransport from '../../functions/BDOApi/confirmTransport';
import correctCard from '../../functions/BDOApi/correctCard';
import getUrlConfirmation from '../../functions/getUrlConfirmation';
import getUrlCard from '../../functions/getUrlCard';


const isAndroid = Platform.OS === 'android';

const DetailsCardScreen = ({ route }) => {
    const { kpoId, role, cardStatusCodeName, wasteCodeDescription } = route.params

    const [details, setDetails] = useState({});
    const [isSending, setIsSending] = useState(false);
    const { popToTop } = useNavigation();
    const [printConfirmationTitleButton, setPrintConfirmationTitleButton] = useState("Drukuj potwierdzenie")
    const [printCardTitleButton, setPrintCardTitleButton] = useState("Drukuj kartę")
    
    const {
        cardNumber,
        wasteMass,
        wasteCodeExtended,
        wasteCodeExtendedDescription,
        wasteCodeId,
        vehicleRegNumber,
        approvalUser,
        plannedTransportTime,
        cardApprovalTime,
        realTransportTime,
        senderCompanyInfo,
        carrierCompanyInfo,
        receiverCompanyInfo,
        cardStatusId,
        remarks
    } = details;

    useEffect(() => {
        getCardDetails(kpoId, role, cardStatusCodeName, setDetails)
    }, [])

    let visibilityButton = {
        confirmTransport: cardStatusId === 7 && role === 1,
        confirmReceived: cardStatusId === 5 && role === 2,
        rejectCard: cardStatusId === 5 && role === 2,
        correctCard: cardStatusId === 6 && role === 0,
        confirmCard: cardStatusId === 1 && role === 0,
        generateConfirmation: cardStatusId === 2 && (role === 0 || role === 1 || role === 2),
        confirmAndGenerateConfirmation: cardStatusId === 1 && role === 0,
        printConfirmation: cardStatusId === 5 && (role === 0 || role === 1),
        printCard: cardStatusId != 1,
        withdraw: (cardStatusId === 2 || cardStatusId === 5) && role === 0,
        delete: cardStatusId === 1 && role === 0
    }

    const confirmTransportPress = () => {
        // POTWIERDZENIE PRZEJĘCIA -> POTWIERDZENIE TRANSPORTU
        Alert.alert(
            'Potwierdzić transport?',
            '',
            [{
                text: "NIE",
                onPress: () => console.log("Anulowano potwierdzanie karty "),
            },
            {
                text: "Zatwierdź", onPress: () => (
                    confirmTransport(kpoId),
                    setIsSending(true),
                    setTimeout(() => popToTop(), 3000)
                )
            }]
        )
    }
    const confirmReceivedPress = () => {
        // POTWIERDZENIE WYGENEROWANE -> POTWIERDZENIE PRZEJĘCIA
        Alert.alert(
            'Potwierdzić przejęcie?',
            `Waga: ${wasteMass}Mg`,
            [{
                text: "NIE"
            },
            {
                text: "Potwierdź", onPress: async () => (
                    setIsSending(true),
                    await confirmReceived(kpoId, wasteMass, ''),
                    setTimeout(() => popToTop(), 1000)
                )
            }]
        )

    }
    const rejectCardPress = () => {
        // POTWIERDZENIE WYGENEROWANE -> ODRZUCONA
        isAndroid ? (
            prompt(
                'Odrzuć kartę',
                null,
                [
                    { text: 'Anuluj' },
                    {
                        text: 'Odrzuć', onPress: async remarks => {
                            remarks ? (
                                setIsSending(true),
                                await rejectCard(kpoId, remarks),
                                setTimeout(() => popToTop(), 1000)
                            ) : null
                        }
                    },
                ],
                {
                    cancelable: false,
                    placeholder: 'Podód odrzucenia'
                }
            )
        ) : (
            Alert.prompt('Podaj powód odrzucenia ', null,
                [
                    {
                        text: 'Anuluj',
                        style: 'cancel',
                    },
                    {
                        text: 'Odrzuć',
                        onPress: async remarks => {
                            remarks ? (
                                setIsSending(true),
                                await rejectCard(kpoId, remarks),
                                setTimeout(() => popToTop(), 1000)
                            ) : null
                        },
                        style: 'destructive'
                    },
                ],
                'plain-text'
            )
        )
    }
    const correctCardPress = () => {
        // ODRZUCONA > POTWIERDZENIE WYGENEROWANE
        isAndroid ? (
            prompt(
                'Korekta karty',
                `Powód odrzucenia: ${remarks}`,
                [
                    { text: 'Anuluj' },
                    {
                        text: 'Koryguj', onPress: async remarks => {
                            remarks ? (
                                setIsSending(true),
                                await correctCard(kpoId, remarks, wasteCodeId),
                                setTimeout(() => popToTop(), 1000)
                            ) : null
                        }
                    },
                ],
                {
                    type: 'numeric',
                    cancelable: false,
                    keyboardType: 'decimal-pad',
                    placeholder: 'Podaj nową wagę...'
                }
            )
        ) : (
            Alert.prompt(`Korekta`, `Powód odrzucenia: ${remarks}`,
                [
                    {
                        text: 'Anuluj',
                        style: 'cancel',
                    },
                    {
                        text: 'Koryguj',
                        onPress: async remarks => {
                            remarks ? (
                                setIsSending(true),
                                await correctCard(kpoId, remarks, wasteCodeId),
                                setTimeout(() => popToTop(), 1000)
                            ) : null
                        },
                    },
                ],
                'default'
            )
        )
    }
    const confirmCardPress = () => {
        // PLANOWANA -> ZATWIERDZONA
        Alert.alert(
            'Zatwierdzić kartę?',
            null,
            [{
                text: "NIE",
                onPress: () => console.log("Anulowano potwierdzanie karty"),
            },
            {
                text: "Zatwierdź", onPress: async () => (
                    setIsSending(true),
                    await confirmCard(kpoId),
                    setTimeout(() => popToTop(), 1000)
                )
            }]
        )
    }
    const confirmAndGenerateConfirmationPress = () => {
        // PLANOWANA -> ZATWIERDZONA -> POTWIERDZENIE WYGENEROWANE
        Alert.alert(
            'Zatwierdzić i wygenerować potwierdzenie?',
            null,
            [{
                text: "NIE",
                onPress: () => console.log("Anulowano generowanie potwierdzenia"),
            },
            {
                text: "TAK", onPress: async () => (
                    await confirmCard(kpoId),
                    await generateConfirmation(kpoId),
                    setTimeout(() => popToTop(), 1000)
                )
            }]
        )
    }
    const generateConfirmationPress = () => {
        // ZATWIERDZONA -> POTWIERDZENIE WYGENEROWANE
        Alert.alert(
            'Wygenerować potwierdzenie?',
            null,
            [{
                text: "NIE",
                onPress: () => console.log("Anulowano generowanie potwierdzenia"),
            },
            {
                text: "Generuj", onPress: async () => (
                    await generateConfirmation(kpoId),
                    setTimeout(() => popToTop(), 1000)
                )
            }]
        )
    }
    const printConfirmationPress = async () => {

        setPrintConfirmationTitleButton(<ActivityIndicator/>)
        const { url } = await getUrlConfirmation(kpoId);
        url ? (
            await RNPrint.print({
                jobName: `confirmation-${kpoId}`,
                filePath: url
            })
        ) : (
            console.log('error')
        )
        setPrintConfirmationTitleButton("Drukuj potwierdzenie")
    }
    const printCardPress = async () => {

        setPrintCardTitleButton(<ActivityIndicator/>)
        const { url } = await getUrlCard(kpoId);
        url ? (
            await RNPrint.print({
                jobName: `card-${kpoId}`,
                filePath: url
            })
        ) : (
            console.log('error')
        )
        setPrintCardTitleButton("Drukuj kartę")
    }
    const withdrawCardPress = () => {
        // ZATWIERDZONA || POTWIERDZENIE WYGENEROWANE -> WYCOFANA
        
        isAndroid ? (
            prompt(
                'Wycofanie karty',
                null,
                [
                    { text: 'Anuluj' },
                    {
                        text: 'Wycofaj', onPress: async remarks => {
                            remarks ? (
                                setIsSending(true),
                                await withdrawCard(kpoId, remarks),
                                setTimeout(() => popToTop(), 1000)
                            ) : null
                        }
                    },
                ],
                {
                    cancelable: false,
                    placeholder: 'Powód wycofania...'
                }
            )
        ) : (
            Alert.prompt(`Podaj powód wycofania`, null,
                [
                    {
                        text: 'Anuluj',
                        style: 'cancel',
                    },
                    {
                        text: 'Wycofaj',
                        onPress: async remarks => {
                            remarks ? (
                                setIsSending(true),
                                await withdrawCard(kpoId, remarks),
                                setTimeout(() => popToTop(), 1000)
                            ) : null
                        },

                        style: 'destructive',
                    },
                ],
                'plain-text'
            )
        )
    }
    const deleteCardPress = () => {
        Alert.alert(
            'Usunąć kartę?',
            '',
            [{
                text: "NIE",
                onPress: () => console.log("Ok nie usuwam"),
            },
            {
                text: "Usuń", onPress: () => (
                    deleteCard(kpoId),
                    setIsSending(true),
                    setTimeout(() => popToTop(), 3000)
                )
            }]
        )
    }

    return (
        <Container>
            {!cardStatusId ? <ActivityIndicator /> : (
                <>
                    <InfContainer>
                        <CompanyItem>
                            <RoleText>{'Przekazujący'}</RoleText>
                            <CompanyText>{senderCompanyInfo.name || 'brak'}</CompanyText>
                        </CompanyItem>
                        <CompanyText>|</CompanyText>
                        <CompanyItem>
                            <RoleText>{'Transportujący'}</RoleText>
                            <CompanyText>{carrierCompanyInfo.name || 'brak'}</CompanyText>
                        </CompanyItem>
                        <CompanyText>|</CompanyText>
                        <CompanyItem>
                            <RoleText>{'Przejmujący'}</RoleText>
                            <CompanyText>{receiverCompanyInfo.name || 'brak'}</CompanyText>
                        </CompanyItem>
                    </InfContainer>
                    <LineContainer>
                        <Line></Line>
                    </LineContainer>
                    <DetailContainer>
                        <Detail name="KpoId:" value={kpoId} size={1} />
                    </DetailContainer>
                    {cardNumber ? (
                        <DetailContainer>
                            <Detail name="Numer karty:" value={cardNumber || '-'} size={1} />
                        </DetailContainer>
                    ) : <></>}
                    <DetailContainer>
                        <Detail name="Rodzaj odpadów:" value={wasteCodeDescription} size={1} />
                    </DetailContainer>
                    <DetailContainer>
                        <Detail name="Kod odpadu:" value={wasteCodeId} size={2} />
                        <Detail name="Masa (Mg):" value={wasteMass} size={2} />
                    </DetailContainer>

                    <DetailContainer>
                        {wasteCodeExtended ? <Detail name="Kod ex:" value={wasteCodeExtended} size={2} /> : <></>}
                        {wasteCodeExtendedDescription ? <Detail name="Rodzaj odpadu ex:" value={wasteCodeExtendedDescription} size={2} /> : <></>}
                    </DetailContainer>
                    <DetailContainer>
                        <Detail name="Numer rejestracyjny pojazdu, przyczemy lub naczepy:" value={vehicleRegNumber || '-'} size={1} />
                    </DetailContainer>
                    <DetailContainer>
                        {remarks ? <Detail name="Uwagi:" value={remarks} size={1} /> : <></>}
                    </DetailContainer>
                    <LineContainer>
                        <Line></Line>
                    </LineContainer>
                    {approvalUser ? (
                        <DetailContainer>
                            <Detail name="Imię i Nazwisko osoby, która wygenerowała potwierdzenie:" value={approvalUser || 'NIE WYGENEROWANO'} size={1} />
                        </DetailContainer>
                    ) : <></>}
                    <DetailContainer>
                        {realTransportTime ? (
                            <Detail name="Zatwierdzenie karty:" value={cardApprovalTime ? moment(cardApprovalTime).format('DD/MM/YYYY HH:mm') : '-'} size={2} />,
                            <Detail name="Rozpoczęcie transportu:" value={moment(realTransportTime).format('DD/MM/YYYY HH:mm')} size={2} />
                        ) : (
                            <Detail name="Planowane rozpoczęcie transportu:" value={moment(plannedTransportTime).format('DD/MM/YYYY HH:mm')} size={1} />
                        )}
                    </DetailContainer>
                    <ButtonContainer>
                        {visibilityButton.confirmTransport ? <CustomButton title="Potwierdź transport" color="#53B253" onPress={confirmTransportPress} /> : <></>}
                        {visibilityButton.confirmReceived ? <CustomButton title="Potwierdź przejęcie" color="#53B253" onPress={confirmReceivedPress} /> : <></>}
                        {visibilityButton.rejectCard ? <CustomButton title="Odrzuć" color="#DB5F5F" onPress={rejectCardPress} /> : <></>}
                        {visibilityButton.correctCard ? <CustomButton title="Skoryguj" color="#DB5F5F" onPress={correctCardPress} /> : <></>}
                        {visibilityButton.confirmCard ? <CustomButton title="Zatwierdź" onPress={confirmCardPress} /> : <></>}
                        {visibilityButton.generateConfirmation ? <CustomButton title="Wygeneruj potwierdzenie" onPress={generateConfirmationPress} /> : <></>}
                        {visibilityButton.confirmAndGenerateConfirmation ? <CustomButton title="Zatwierdź i wygeneruj potwierdzenie" onPress={confirmAndGenerateConfirmationPress} /> : <></>}
                        {visibilityButton.printConfirmation ? <CustomButton title={printConfirmationTitleButton} onPress={printConfirmationPress} /> : <></>}
                        {visibilityButton.printCard ? <CustomButton title={printCardTitleButton} onPress={printCardPress} /> : <></>}
                        {visibilityButton.withdraw ? <CustomButton title="Wycofaj" color="#DB5F5F" onPress={withdrawCardPress} /> : <></>}
                        {visibilityButton.delete ? <CustomButton title="Usuń" color="#DB5F5F" onPress={deleteCardPress} /> : <></>}
                    </ButtonContainer>
                </>
            )}
            {isSending ? <Loader><ActivityIndicator size="large" /></Loader> : <></>}
        </Container>
    )
}

export default DetailsCardScreen;
