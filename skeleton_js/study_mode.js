let flip = true;
document.getElementById('questionCard').addEventListener('click',switchDisplay);
function switchDisplay(){
    let questionCard = document.getElementById('questionCard');
    if(flip){
        this.classList.toggle('flippedCard');
        setTimeout(function(){
            document.getElementById('question').style.display='none';
            document.getElementById('answer').style.display='block';
            flip=false;
        },
            300);
    }
    else {
        this.classList.toggle('flippedCard');
        setTimeout(function(){
            document.getElementById('question').style.display='block';
            document.getElementById('answer').style.display='none';
            flip=true;
        },300);
    }
}