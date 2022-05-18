import React from "react";
import Card from '../../components/Card/Card';
import { Container, TextEmpty, Cards } from './style';

const CardsListScreen = ({ route }) => {
    const cards = route.params.cards;
    const role = route.params.role;

    return (
        <Container>
            {cards.length === 0 ? <TextEmpty>Brak kart do wyświetlenia</TextEmpty> : (
                <Cards
                    data={cards}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Card key={item.kpoId} role={role} {...item} />}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Container>
    )
}

export default CardsListScreen;