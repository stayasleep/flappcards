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
    question: "Question 4",
    answer: "Answer 4"
};

const biologyCard5 = {
    question: "Question 5",
    answer: "Answer 5"
};

const biologyStack = {
    subject: 'Cellular',
    category: 'Biology',
    totalCards: 5,
    cards: [biologyCard1, biologyCard2, biologyCard3, biologyCard4, biologyCard5],
    createdBy: 'user2',
    createdOn: '2017-04-25',
    stackRating: 0.70
};

document.getElementById('questionCard').addEventListener("click",flipCard);
document.getElementById('answerCard').addEventListener("click",flipCard);

function flipCard() {
    let questionCard = document.getElementById('questionCard');
    let answerCard = document.getElementById('answerCard');
    if (questionCard.style.visibility === "visible") {
        questionCard.style.visibility = "hidden";
        answerCard.style.visibility = "visible";
    }
    else {
        questionCard.style.visibility = "visible";
        answerCard.style.visibility = "hidden";
    }
}
