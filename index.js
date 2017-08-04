var Card = require("./cards/BasicCard");
var Data = require("./card.json");
var inquirer = require("inquirer");

startGame();

function startGame() {

  var currentCard;
  var cardArray = [];
  var initialScore = 0;
  var initialIndex = 0;

  for(var i = 0; i < Data.length; i++) {
    currentCard = new Card(Data[i].front, Data[i].back);
    cardArray.push(currentCard);
  }

    playRound(initialScore, cardArray, initialIndex);
  }

  function gameOver(score) {
    console.log("Game Over!");
    console.log("Your score is:" + score);
    inquirer.prompt([{
      type: "input",
      name: "text",
      message: "Start New Game?"
    }]).then(function(answer){

      if(answer.text.charAt(0).toLowerCase === "y") {
        startGame();
      }
      else {
        console.log("Thanks for playing!");
        console.log("Goodbye");
      }
    });
  }

  function playRound(currentScore, cardArray, currentIndex) {
    var card = cardArray[currentIndex];

    inquirer.prompt([{
      type: "input",
      name: "text",
      message: card.front + "\nAnswer:"
    }]).then(function(answer) {

      if (answer.text.trim().toLowerCase() === card.back.trim().toLowerCase()) {

        currentScore++;
        console.log("THAT IS COORRRECCCT");
      }
      else {
        console.log("Hmm that seems off, the COORRRECCCT response was '" + card.back + "'.");
      }

      currentIndex++;
      console.log("_____-------_____------_____");

      playRound(currentScore, cardArray, currentIndex);
    });
  }
