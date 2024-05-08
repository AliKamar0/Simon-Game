const buttonColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Player interaction on the buttons
$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    console.log(userClickedPattern);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//event function
$(document).keydown(function(){
    if (!started) {
    nextSequence();
    started = true;
    }
});

//generate game
function nextSequence()   {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    
    
}

//Play Sounds
function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}


//Button animation
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");

    setTimeout(function(){
        $("."+currentColor).removeClass('pressed');
        //....and whatever else you need to do
}, 100);
}

//Check player sequence
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
        
    }}
    else{
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}

//Restarting the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}