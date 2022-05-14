function checkSolution() {
    var answers = document.getElementsByClassName("answers");
    var isCorrect = document.getElementsByClassName("isCorrect");

    for (let i = 0; i < answers.length; i++) {
        if (isCorrect[i].checked == false) {
            answers[i].style.color = "red";
        }
    }
}