var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

//key down press
$(document).keypress(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//user click detect
$(".btn").click(function(){
	
		var userChosenColour = $(this).attr("id");
		//push elements 
		userClickedPattern.push(userChosenColour);
		playSound(userChosenColour);
  		animatePress(userChosenColour);
  		
  		//call for check answer
  		checkAnswer(userClickedPattern.length-1);
  		
	});
	

//output checking

function checkAnswer(currentLevel)
{	
	
	
	if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
	{
		console.log("Success");
		if(userClickedPattern.length === gamePattern.length )
		{
			setTimeout(function(){
		
				nextSequence();
		
			}, 1000);
			
		}
	}
	else
	{
		console.log("Fail");
		var audio = new Audio("sounds/wrong.mp3");
		audio.play();
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
			}, 200);
		//changing h1
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}	
	
	
}

//start-over
function startOver()
{
	level=0;
	gamePattern=[];
	started=false;
}


function nextSequence()
{
	//empty array after one game
	 userClickedPattern = [];
	//Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  	level++;

  	//Inside nextSequence(), update the h1 with this change in the value of level.
  	$("#level-title").text("Level " + level);
	var randomNumber=Math.floor(Math.random() * 4);
	var randomChosenColour=buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	
	//flash
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	
	
	
	
  	playSound(randomChosenColour);
 
  
  	

	
}
function playSound(name)
{
	var audio = new Audio("sounds/" + name + ".mp3"); //sounds/green.mp3
  	audio.play();

}

function animatePress(currentColor) {

	//animation to the button clicked  
  $("#" + currentColor).addClass("pressed");

  //flashin for 100 millisec
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


