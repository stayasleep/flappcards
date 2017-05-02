// 1. Make your cards with the cardMaker function
var cards = []; // Holds the cards you make
function cardMaker(question, answer) {
    return cards.push({question: question, answer: answer});
}

cardMaker("A structural crosspiece sometimes forming a seat for a passenger in a boat, especially a rower.", "Thwart");
cardMaker("A flat termination to a stern, that rises above the water line.", "Transom");
cardMaker("The longitudinal structure along the centerline at the bottom of a vessel's hull, on which the rest of the hull is built, in some vessels extended downward as a blade or ridge to increase stability.", "Keel");
cardMaker("A type of retractable keel used on sailing vessels to prevent drifting downwind.", "Centerboard");
cardMaker("A large piece of shaped timber fitted horizontally in the bows of a boat, used to connect the sides to the stem.", "Breasthook");
cardMaker("A tall upright post, spar, or other structure in sailing vessels generally carrying a sail or sails.n", "Mast");
cardMaker("Wooden support brace used to strengthen the location where two timbers were joined or crossing.", "Knee");
cardMaker("The top egg of the side of a boat.", "Gunwale");
cardMaker("The forward part of the hull of a boat, the point that is usually most forward when the vessel is underway.", "Bow");
cardMaker("The aft-most part of a boat.", "Stern");

// 2. Once you've made your cards, use the stackMaker function to complete the stack

function stackMaker(category, subject, cardsArray,createdBy, createdOn, stackRating) {
    return {subject:subject, category:category, cards:cardsArray,totalCards: cardsArray.length, createdBy:createdBy,createdOn:createdOn, stackRating:stackRating}
}
var boatStack = stackMaker("Boatbuilding", "Parts of a boat", cards, "Regis", "2017-04-30", 0.95);
console.log(boatStack);


// 3. Once you've made your cards and made your stack, call the formatStack function to spit out JSON formatted data
function formatStack(stack) {
    return JSON.stringify(stack);
}

var boatStackJSON = formatStack(boatStack);
