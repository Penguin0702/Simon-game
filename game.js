
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Start game
$(document).keypress(function(event){
  if (!started){
      $("#level-title").text("Level" + level);
      nextSequence();
      started = true;
  }
});


//Handle button colour user Click
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id") ;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  animatePress(userChosenColour);

  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});




//Random Sequence of button colour
function nextSequence(){
  userClickedPattern = [];

  level ++;
  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  //Add colour button generated to array
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);
  //Play audio when button flashed
  playSound(randomChosenColour);
  //Add flash effect to colour button generated
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
//Create function play sound when click
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentColour).removeClass("pressed");
  }, 100);
}

//Check Answer of user
function checkAnswer(currentLevel){
  //Check Each Click
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    //Reset when all click of user is right
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
    }, 200);
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
