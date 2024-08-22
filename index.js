var buttonColors = ["red", "blue","green", "yellow"];
    var gamePattern = [];
    var level = 0;
    var userClickedPattern = [];
    for(var i = 0; i < $(".btn").length;i++){
        $(".btn").eq(i).on("click", function(){
            buttonClicked(this.id);
        });
    }
    var clickedButtons = 0;
function nextSequence(){
    var randNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColors[randNumber];

    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").html("level " + (level++));
}

$(document).keypress(function(){
    nextSequence();
});
  
function buttonClicked(id){
    userClickedPattern.push(id);
    if(userClickedPattern[clickedButtons] != gamePattern[clickedButtons]){
        gameOver();
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("p").remove();
            $("h1").html("Press A Key to Start");
               
            
        },3000);
        playSound("wrong"); 
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        clickedButtons = 0;
        
        
    }
    else if(clickedButtons != gamePattern.length - 1){
        clickedButtons++;
        playSound(id);
    }
    else{
        clickedButtons = 0;
        
        userClickedPattern = [];
        setTimeout(function() {
            nextSequence()
        },1000);
        playSound(id);    
    }
    
    
    console.log(userClickedPattern);
    animatePress(id);
}
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);   
}


function gameOver(){
    $("body").addClass("game-over");
    $("h1").html("<span style = 'color: black'> GAME OVER </span>");
    $("h1").after("<p> New game starts in 3 seconds... </p>");
}

