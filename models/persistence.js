var cardID = 0;
var categoryID = 0;

class Flashcard {
    constructor (title, question, category) {
        this.id = ++cardID;
        this.title = title;
        this.question = question;
        this.category = category;
        this.answers = new Array();
    }

    addAnswers(answers) {
        for (let answer of answers) {
            this.answers.push(answer);
        }
    }

    isMultipleChoice() {
        var correct = 0;

        this.answers.forEach(answer => {
            if (answer.isCorrect) {
                correct++;
            }
        });

        return correct >= 2;
    }
}

class Category {
    constructor (name) {
        this.id = ++categoryID;
        this.name = name;
    }
}

class Answer {
    constructor (text, isCorrect) {
        this.text = text;
        this.isCorrect = isCorrect;
    }
}


const flashcards = new Array();
const categories = new Array();


function getFlashcardsForCategory (category) {
    var cardsOfCategory = new Array();

    flashcards.forEach(flashcard => {
        if (flashcard.category == category) {
            cardsOfCategory.push(flashcard);
        }
    });

    return cardsOfCategory;
}

function getRandomCardOfCategory (category) {
    var deckOfCategory = getFlashcardsForCategory(category);

    if (deckOfCategory == null) {
        return null;
    }

    randomCard = deckOfCategory[Math.floor(Math.random() * deckOfCategory.length)];

    return randomCard;
}

function getCategoryOfID (id) {
    category = null;

    categories.forEach(element => {
        if (element.id == id) {
            category = element;
        }
    });

    return category;
}

function getNumberOfFlashcardsInCategory(category) {
    return getFlashcardsForCategory(category).length;
}


module.exports.Category = Category;
module.exports.Flashcard = Flashcard;
module.exports.Answer = Answer;

module.exports.getCategoryOfID = getCategoryOfID;
module.exports.getFlashcardsForCategory = getFlashcardsForCategory;
module.exports.getRandomCardOfCategory = getRandomCardOfCategory;
module.exports.getNumberOfFlashcardsInCategory = getNumberOfFlashcardsInCategory;

module.exports.flashcards = flashcards;
module.exports.categories = categories;