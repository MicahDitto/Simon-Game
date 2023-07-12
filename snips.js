function evaluate() {
  buttonIsCorrect = true;
  loopIsDone = false;

  alert("User: " + userPattern + " Game: " + gamePattern);
  for (let i = 0; i < gamePattern.length; i++) {
    if (userPattern[i] == null) {
      console.log("break " + i);
      break;
    } else if (userPattern[i] != gamePattern[i]) {
      alert("Game over");
      //Reset Game
      $("#level-title").html(
        "Sorry You got it wrong... But you made it to Level " + level
      );
      buttonIsCorrect = false;
      break;
    } else {
      if ((i = gamePattern.length - 1)) {
        loopIsDone = true;
      }
    }
  }
  if (loopIsDone) {
    nextSequence();
  }

  // return buttonIsCorrect;
}
