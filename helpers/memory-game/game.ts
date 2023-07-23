
const getRandomSuit = ()=>{
    const cardSuits = ['♠', '♣', '♦', '♥'];
    const cardSuitsLength = cardSuits.length;
    const randomIndex = Math.floor(Math.random()*cardSuitsLength);
    return cardSuits[randomIndex]
}

const getRandomImage = ()=>{
    const backgroundImages = ['image-1.jpeg','image-2.jpeg','image-3.jpeg','image-4.png'];
    const backgroundImagesLength = backgroundImages.length;
    const randomIndex = Math.floor(Math.random()*backgroundImagesLength);
    return backgroundImages[randomIndex];

}

const getRandomCardNumber = ()=>{
    const suitWithCards  = ['♚','♛','♞','A',2,3,4,5,6,7,8,9,10]
    const randomIndex = Math.floor(Math.random()*suitWithCards.length);
    return suitWithCards[randomIndex];
}


const getRandomCard = ()=>{
    const suit = getRandomSuit();
    const backgroundImage= getRandomImage();
    const cardNumber = getRandomCardNumber();
    return {
        suit,
        backgroundImage,
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