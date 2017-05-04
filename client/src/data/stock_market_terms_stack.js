// 1. Make your cards with the cardMaker function
var cards = []; // Holds the cards you make
function cardMaker(question, answer) {
    return cards.push({question: question, answer: answer});
}

cardMaker("What is a financial security?", "A security is a financial instrument that represents an ownership position in a publicly-traded corporation (stock), a creditor relationship with governmental body or a corporation (bond), or rights to ownership as represented by an option");
cardMaker("What is a short position?", "A short, or short position, is a directional trading or investment strategy where the investor sells shares of borrowed stock in the open market");
cardMaker("What is a long position?", "A long (or long position) is the buying of a security such as a stock, commodity or currency with the expectation the asset will rise in value");
cardMaker("What is a bull market?", "A bull market is a financial market of a group of securities in which prices are rising or expected to rise");
cardMaker("What is a bear market?", "A bear market is a condition in which securities prices fall and widespread pessimism causes the stock maket's downward spiral to be self-sustaining");
cardMaker("What is technical analysis?", "Technical analysis is a trading tool employed to evaluate securities and attempt to forecast their future movement by analyzing statistics gathered from trading activity, such as price movement and volume");
cardMaker("What is fundamental analysis?", "Fundamental analysis is a method of evaluating a security in an attempt to measure its intrinsic value, by examining related economic, financial and other qualitative and quantitative factors");
cardMaker("What is a market bubble?", "A bubble is an economic cycle characterized by rapid escalation of asset prices followed by a contraction");
cardMaker("What is a market crash?", "A stock market crash is a rapid and often unanticipated drop in stock prices");
cardMaker("What is a market correction?", "A correction is a reverse movement, usually negative, of at least 10% in a stock, bond, commodity or index to adjust for an overvaluation");

// 2. Once you've made your cards, use the stackMaker function to complete the stack

function stackMaker(category, subject, cardsArray,createdBy, createdOn, stackRating) {
    return {subject:subject, category:category, cards:cardsArray,totalCards: cardsArray.length, createdBy:createdBy,createdOn:createdOn, stackRating:stackRating}
}
var financeStack = stackMaker("Finance", "Markets", cards, "Jonathan", "2017-04-30", 0.70);
console.log(financeStack);


// 3. Once you've made your cards and made your stack, call the formatStack function to spit out JSON formatted data
function formatStack(stack) {
    return JSON.stringify(stack);
}

var financeStackJSON = formatStack(financeStack);
