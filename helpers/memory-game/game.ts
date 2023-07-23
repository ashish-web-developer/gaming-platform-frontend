
const getRandomSuit = ()=>{
    const cardSuits = ['♠', '♣', '♦', '♥'];
    const cardSuitsLength = cardSuits.length;
    const randomIndex = Math.floor(Math.random()*cardSuitsLength);
    return cardSuits[randomIndex]
}

const getRandomImage = (files:string[])=>{
    const randomIndex = Math.floor(Math.random()*files.length);
    return files[randomIndex];

}

const getRandomCardNumber = ()=>{
    const suitWithCards  = ['♚','♛','♞','A',2,3,4,5,6,7,8,9,10]
    const randomIndex = Math.floor(Math.random()*suitWithCards.length);
    return suitWithCards[randomIndex];
}


const getRandomCard = ()=>{
    const suit = getRandomSuit();
    const cardNumber = getRandomCardNumber();
    return {
        suit,
        card:cardNumber,
        cardColor:['♦', '♥'].includes(suit)?"red":"black"
    }
}


export {
    getRandomCard,
    getRandomImage,
    getRandomSuit,
    getRandomCardNumber
}