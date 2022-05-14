const express = require("express");
const router = express.Router();

const db = require("../models/persistence");
const flashcards = db.flashcards;

// Routen auf der Router-Instanz definieren
router.get("/category[\$]*=:id", function(req, res) {
    const category = db.getCategoryOfID(req.params.id);
    const flashcards = db.getFlashcardsForCategory(category);
    
    res.render("category", {category: category, 
                            flashcards: flashcards});
});

router.get("/learnCategory[\$]*=:id", function(req, res) {
    const category = db.getCategoryOfID(req.params.id);
    const randomcard = db.getRandomCardOfCategory(category);

    res.render("learncard", {randomcard: randomcard,
                            category: category});
});

router.post("/newCategory", function(req, res) {
    categoryExists = false;

    db.categories.forEach(category => {
        if (category.name == req.body.newCategory) {
            categoryExists = true;
        }
    })

    if (!categoryExists) {
        db.categories.push(new db.Category(req.body.newCategory));
    } else {
        console.log("Category already exists!");
    }

    res.redirect("/");
});

router.post("/newCard[\$]*=:id", function(req, res) {
    var category = db.getCategoryOfID(req.params.id);
    var title = req.body.title;
    var question = req.body.question;
    var answers = req.body.answer;
    var isCorrect = [req.body.isCorrect1, req.body.isCorrect2, req.body.isCorrect3, req.body.isCorrect4, req.body.isCorrect5];
    
    var card = new db.Flashcard(title, question, category);
    let answersArray = new Array();

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] != "") {
            if (isCorrect[i] == "isCorrect") {
                answersArray.push(new db.Answer(answers[i], true));
            } else {
                answersArray.push(new db.Answer(answers[i], false));
            }
        }
    }

    card.addAnswers(answersArray);
    flashcards.push(card);

    res.redirect("/category$" + category.name + "=" + category.id);
});

router.use(function(req, res) {
    const categories = db.categories;
    res.render("index", {categories: categories,
                        db: db});
});


// Router zugreifbar machen
module.exports = router;