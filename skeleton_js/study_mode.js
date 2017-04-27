document.getElementById('questionCard').addEventListener("click", flipCard);
document.getElementById('answerCard').addEventListener("click",flipCard);
function flipCard() {
    let questionCard = document.getElementById('questionCard');
    let answerCard = document.getElementById('answerCard');
    answerCard.style.display = "block";
    this.classList.toggle("flippedCard");  // Flip card

    if (questionCard.style.display === "block") {

        questionCard.style.display="none";
    }
    else {
        answerCard.style.display="none";
        questionCard.style.display= "block";
    }
}
