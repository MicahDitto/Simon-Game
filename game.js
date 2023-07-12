let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let userPattern = [];
let level = 0;
let place = 0;
let started = false;

const dropdownBtn = document.querySelector('.dropdown');
const dropdownList = document.querySelector('.collapse');

dropdownBtn.addEventListener('click', function() {
  dropdownList.classList.toggle('active');
});

$(document).keypress(function() {
  if (!started) {
    resetUserPattern();
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level = level + 1;

  $("#level-title").html("Level " + level);

  let randy = Math.random();
  randy = randy * 4;
  randy = Math.floor(randy);

  let chosenColor = buttonColors[randy];
  gamePattern.push(chosenColor);
  setTimeout(() => {
    playSound(chosenColor);
    $("#" + chosenColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
  }, 1000);
}

$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  playSound(userChosenColor);
  console.log(" -----  sound from CLICK -----");
  animatePress(userChosenColor);
  evaluate(level);
});

function evaluate(level) {
  let place = level - 1;
  let good = false;
  console.log("Evaluate() triggered..");
  console.log("userPattern: " + userPattern);
  console.log("gamePattern: " + gamePattern);
  console.log(" -                         " + userPattern[place]);
  console.log(" -                         " + gamePattern[place]);
  // 1 Check that userPattern[place] = gamePattern[place]

  for (let i = 0; i < gamePattern.length; i++) {
    if (userPattern[i] == null) {
      //                    v--------  For the first line
      console.log("!!!                break at index: " + i);
      break;
    } else if (userPattern[i] != gamePattern[i]) {
      console.log("x         Failed at index: " + i);
      console.log("                 userPattern: " + userPattern[i]);
      console.log("                 != ");
      console.log("                 gamePattern: " + gamePattern[i]);
      triggerFailure();
      good = false;
      buttonIsCorrect = false;
      break;
    } else {
      good = true;
      console.log("                 userPattern: " + userPattern[i]);
      console.log("                 == ");
      console.log("                 gamePattern: " + gamePattern[i]);
      // if ((i = gamePattern.length - 1)) {
      //   loopIsDone = true;
      // }
    }
  }

  // 4 Check if end of the array
  if (userPattern.length == gamePattern.length && good) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
    // 5 Reset userPattern
    userPattern = [];
  } else {
    console.log("...         next seq. not triggered");
  }
}

function resetUserPattern() {
  userPattern = [];
}

function playSound(name) {
  let sounds = new Audio("sounds/" + name + ".mp3");
  sounds.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function triggerFailure() {
  // Alert Game over
  console.log("  x - evaluated FALSE - x  ");
  alert("Game over");

  // Game title change
  $("#level-title").html(
    "Sorry You got it wrong... But you made it to Level " + level
  );
}
