/**
 * Created by Bri on 4/20/2017.
 */
//login screen
let credentials = {
    username: 'user1',
    password: 'pass123',

};

// Registration
let registerInfo = {
    fullName: "Brian Bernstein",
    userName: "stayasleep",
    user_pw: "Password1",
    user_email: "email@Server.com",
    birthday: "01/01/1900"
};
//will take object and send to node --> db, respond success: true

//landing page, it is an aggregate of community content to explore  and your most recent stacks
let userRecent = {
    item1: {
        subject: 'Math',
        subSubHeader: 'Calc 1',
        created: "02/01/1978",
        rating: "4/5"
    },
    item2:{
        subject: 'Biology',
        subSubHeader:'Human Biology',
        created: "02/01/1978",
        rating: "4/5"
    }
};
let getAllSample={
    item1:{
        subject: 'Math',
        subSubHeader: 'Calc 2',
        user: 'Brian',
        rating: '4/5'
    },
    item2:{
        subject: 'Math',
        subSubHeader: 'Calc 3',
        user: 'Chalmers',
        rating: '4/5'
    },
    item3:{
        subject: 'Math',
        subSubHeader: 'Geometry',
        user: 'Andres',
        rating: '4/5'
    },
    item4:{
        subject: 'Physics',
        subSubHeader: 'Physics For Future Presidents',
        user: 'Jinwoo',
        rating: '4/5'
    }
};
let userSeatch={
    search: 'Physics'
};


//registration page
let userReg={
    username: 'user1',
    password: 'pass123',
    email: 'test@aol.com',
    location: 'Irvine, Ca'
};


//Profile Settings
let userProfile={
    username: 'user1',
    location: 'Irvine, Ca'
};


//the returned results on SEARCH PAGE
//Search query is 'physics'

let userSearch= {
    item1: {
        subject: 'Physics',
        subSubHeader: 'Physics For Future Presidents',
        user: 'Jinwoo',
        rating: '4/5'
    },
    item2: {
        subject: 'Physics',
        subSubHeader: 'Physics 7A',
        user: 'Chalmers',
        rating: '4/5'
    }
};

let singleStack = {
    stackID: 1,

}

let singleCardJSONObject = {
    subject: null,
    subSection: null,
    question: "Question goes here",
    answer: "Answer goes here"
};

// The format for single cards will look something like this, so we're looking for you to come up with a question and an answer



// For login page
const testUser = {
    username: "user1",
    password: "password1"
};

// For user dashboard

const userDash = {
    recent: [
        {
            subject: 'Calc 2',
            category: 'Math',
            totalCards: 5,
            createdBy: 'user1',
            createdOn: '2017-04-25',
            stackRating: 0.80
        },
        {
            subject: 'Cellular',
            category: 'Biology',
            totalCards: 5,
            createdBy: 'user1',
            createdOn: '2017-04-25',
            stackRating: 0.70
        }],
    aggregated: [
        {
            subject: 'Cellular',
            category: 'Biology',
            totalCards: 5,
            createdBy: 'user2',
            createdOn: '2017-04-25',
            stackRating: 0.70
        },
        {
            subject: 'Cellular',
            category: 'Biology',
            totalCards: 5,
            createdBy: 'user2',
            createdOn: '2017-04-25',
            stackRating: 0.70
        }
    ]
};


// For Dashboard page
const singleStack = {
    subject: 'Cellular',
    category: 'Biology',
    totalCards: 5,
    cards: [card1, card2, card3, card4, card5],
    createdBy: 'user2',
    createdOn: '2017-04-25',
    stackRating: 0.70
};

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


// For "My Shelf"

const userShelf = [
    {
        subject: 'Calc 1',
        category: 'Math',
        totalCards: 5,
        createdBy: 'user2',
        createdOn: '2017-04-25',
        stackRating: 0.70
    },
    { subject: 'Calc 2',
        category: 'Math',
        totalCards: 5,
        createdBy: 'user2',
        createdOn: '2017-04-25',
        stackRating: 0.70},
    {
        subject: 'Cellular',
        category: 'Biology',
        totalCards: 5,
        createdBy: 'user2',
        createdOn: '2017-04-25',
        stackRating: 0.70
    }
];

// For biology page after clicking the view in the my shelf page

const biologyCardView= {
    subject: 'Cellular',
    category: 'Biology',
    cards: [biologyCard1, biologyCard2, biologyCard3, biologyCard4, biologyCard5],
    totalCards: 5,
    createdBy: 'user2',
    createdOn: '2017-04-25',
    stackRating: 0.70
};


const mathCardView = {
    subject: 'Calc I',
    category: 'Math',
    cards: [mathCard1, mathCard2, mathCard3, mathCard4, mathCard5],
    totalCards: 5,
    createdBy: 'user2',
    createdOn: '2017-04-25',
    stackRating: 0.70
};


const mathCard1 = {
    question: "What is the Pythagorean Card?",
    answer: "???"
};
const mathCard2 = {
    question: "What is the Pythagorean Card?",
    answer: "???"
};
const mathCard3 = {
    question: "What is the Pythagorean Card?",
    answer: "???"
};
const mathCard4 = {
    question: "What is the Pythagorean Card?",
    answer: "???"
};
const mathCard5 = {
    question: "What is the Pythagorean Card?",
    answer: "???"
};


// Taken from front end create deck page
const sampleCreateDeck = {
    subject: null, // Input fields
    category: null, // Input fields
    cards: null, // Input fields; an array of objects styled as follows- {question: ..., answer:...}
};
