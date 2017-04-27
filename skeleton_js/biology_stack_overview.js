
const biologyCard1 = {
    question: "What is the powerhouse of the cell?",
    answer: "Mitochondria"
};
const biologyCard2 = {
    question: "How do plants make food?",
    answer: "Photosynthesis"
};
const biologyCard3 = {
    question: "What does DNA stand for?",
    answer: "Deoxyribose nucleic acid"
};

const biologyCard4 = {
    question: "What does biology mean?",
    answer: "The study of living things"
};

const biologyCard5 = {
    question: "Humans breathe out what compound?",
    answer: "Carbon Dioxide"
};

const singleStack = {
    subject: 'Cellular',
    category: 'Biology',
    totalCards: 5,
    cards: [biologyCard1, biologyCard2, biologyCard3, biologyCard4, biologyCard5],
    createdBy: 'user2',
    createdOn: '2017-04-25',
    stackRating: 0.70
};


function makeCards(cardObject) {
    let card = document.createElement('div'); // Create div that will be the card
    card.className = 'mdl-card mdl-shadow--2dp'; // Add the Material Design card attribute: <div class="mdl-card mdl-shadow--2dp">
    let cardTitleDiv = document.createElement('div');
    cardTitleDiv.className = 'mdl-card__title'; // <div class="mdl-card__title">
    let cardTitleHeader = document.createElement('h2');
    cardTitleHeader.className = 'mdl-card__title-text'; // <h2 class="mdl-card__title-text">
    let questionText = document.createTextNode(cardObject.question); // Make text node for question text
    cardTitleHeader.appendChild(questionText); // text -> h2
    cardTitleDiv.appendChild(cardTitleHeader); // h2 -> div
    card.appendChild(cardTitleDiv); // ((text-> h2) -> div) -> div
    componentHandler.upgradeElement(card);
    document.getElementById('content').appendChild(card);
}

singleStack.cards.map(makeCards);



