function generateWinningNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
  var length = arr.length, t, i;
  while (length) {
    i = Math.floor(Math.random() * length--);
    t = arr[length];
    arr[length] = arr[i];
    arr[i] = t;
  }
  return arr;
}

function Game(){
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
	var diff = this.playersGuess - this.winningNumber;
	if(diff < 0){
		return diff * -1;
	}
	return diff;
}

Game.prototype.isLower = function(){
	return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(guess){
	if(typeof guess !== 'number' || guess < 1 || guess > 100){
		throw "That is an invalid guess.";
	}else{
		this.playersGuess = guess;		
	}
	return this.checkGuess();
}

Game.prototype.checkGuess = function(){
	if(this.playersGuess === this.winningNumber){
		$('#hint, #submitButton').prop('disabled', true);
		$('#subtitle').text('Press the reset button to play again!');
		return 'You Win!';
	}else if(this.pastGuesses.indexOf(this.playersGuess) !== -1){
		return 'You have already guessed that number.';
	}
	this.pastGuesses.push(this.playersGuess);
	$('#guesses li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess)
	if(this.pastGuesses.length === 5){
		$('#hint, #submitButton').prop('disabled', true);
		$('#subtitle').text("press the reset button to play again!");
		return 'You Lose.';
	}
	if(this.isLower()) {
        $('#subtitle').text("Guess Higher!")
    } else {
        $('#subtitle').text("Guess Lower!")
    }
	if(this.difference() < 10){
		return "You're burning up!";
	}else if(this.difference() < 25){
		return "You're lukewarm.";
	}else if(this.difference() < 50){
		return "You're a bit chilly."
	}else{
		return "You're ice cold!"
	}
}

function newGame(){
	return new Game;
}

Game.prototype.provideHint = function(){
	var hintArr = [];
	hintArr.push(this.winningNumber, generateWinningNumber(), generateWinningNumber());
	return shuffle(hintArr);
}


function makeAGuess(game){
	var guess = $('#userGuess').val();
	$('#userGuess').val('');
	var output = game.playersGuessSubmission(parseInt(guess, 10));
	$('h1').text(output);
}

$(document).ready(function(){

	var game = new Game;


	$('#submitButton').on('click', function(event){
		makeAGuess(game);
	});	

	$('#userGuess').keypress(function(event){
		if(event.which == 13){
			makeAGuess(game);
		}
	});

	$('#hint').click(function(event){
		game = newGame();
		$('h1').text('Play the Guessing Game!');
    	$('#subtitle').text('Guess a number between 1-100!')
    	$('.guess').text('-');
    	$('#hint, #submitButton').prop("disabled",false);
	});

	$('#hint').click(function() {
    	var hints = game.provideHint();
    	$('h1').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
	});

});






