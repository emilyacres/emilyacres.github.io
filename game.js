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
		return 'You Win!';
	}else if(this.pastGuesses.indexOf(this.playersGuess) !== -1){
		return 'You have already guessed that number.';
	}
	this.pastGuesses.push(this.playersGuess);
	if(this.pastGuesses.length === 5){
		return 'You Lose.';
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



$(document).on('ready', function(){
	console.log('loaded');
	$('#submitButton').on('click', function(){
		console.log("clicked");
	});


	
})






