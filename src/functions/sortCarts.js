const sortCards = cards => {
    cards.sort((card1, card2) => {
        const date1 = new Date(card1.plannedTransportTime);
        const date2 = new Date(card2.plannedTransportTime);
        const result = date1.getTime() - date2.getTime();
        return result
    })
    return cards.reverse();
}

export default sortCards;