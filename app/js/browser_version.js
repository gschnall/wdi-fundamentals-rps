$(document).ready(function(){
////////////////////////////////////////////////
/*   Provided Code - Please Don't Edit   */
////////////////////////////////////////////////
'use strict';

function getInput() {
    console.log("Please choose either 'rock', 'paper', or 'scissors'.")
    return prompt();
}
function randomPlay() {
    var randomNumber = Math.random();
    if (randomNumber < 0.33) {
        return "rock";
    } else if (randomNumber < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}
////////////////////////////////////////////////
/*           Write Your Code Below            */
////////////////////////////////////////////////
  

function getPlayerMove(move) {
    // Write an expression that operates on a variable called `move`
    // If a `move` has a value, your expression should evaluate to that value.
    // However, if `move` is not specified / is null, your expression should equal `getInput()`.
    return move || getInput();
}

function getComputerMove(move) {
    // Write an expression that operates on a variable called `move`
    // If a `move` has a value, your expression should evaluate to that value.
    // However, if `move` is not specified / is null, your expression should equal `randomPlay()`.
    return randomPlay();
}

function getWinner(playerMove,computerMove) {
    var winner = 'player';
    if (playerMove == computerMove){ winner = 'tie'}
    else if (playerMove == 'rock' && computerMove == 'paper'){ winner = 'computer'}
    else if (playerMove == 'paper' && computerMove == 'rock'){ winner = 'player'}
    else if (playerMove == 'scissors' && computerMove == 'paper'){ winner = 'player'}
    else if (playerMove == 'paper' && computerMove == 'scissors'){ winner = 'computer'}
    else if (playerMove == 'scissors' && computerMove == 'rock'){ winner = 'computer'}
    // Write code that will set winner to either 'player', 'computer', or 'tie' based on the values of playerMove and computerMove.
    // Assume that the only values playerMove and computerMove can have are 'rock', 'paper', and 'scissors'.
    // The rules of the game are that 'rock' beats 'scissors', 'scissors' beats 'paper', and 'paper' beats 'rock'.
    /* YOUR CODE HERE */
    return winner;
}

function playToFive() {
    console.log("Let\'s play Rock, Paper, Scissors");
    var playerWins = 0;
    var computerWins = 0;
    // Write code that plays 'Rock, Paper, Scissors' until either the player or the computer has won five times.
    while( playerWins < 5 && computerWins < 5) {
      var playerMove = getPlayerMove()
      var computerMove = getComputerMove()
      var winner = getWinner(playerMove, computerMove)
      if ( winner === "player"){ playerWins += 1}
      else if ( winner === "computer"){ computerWins += 1}
      console.log('Player chose ' + playerMove + " and Computer chose " + computerMove);
      console.log(' ');
      if (winner === 'tie'){ console.log( "It's a tie.")}
      else{ console.log( winner + ' wins this round!');}
      console.log(' ')
      console.log('The score is currently - Player: ' +  playerWins + ' Computer: ' + computerWins );
    }
    /* YOUR CODE HERE */
    return [playerWins, computerWins];
}

function changeImages(player_move, computer_move){
  var player_image_src = "./imgs/scissors.png"
  if (player_move === "rock"){ player_image_src = "./imgs/rock.png"}
  else if( player_move === "paper"){ player_image_src = "./imgs/paper.jpg"}
  $('.player_move').attr('src', player_image_src) 
  
  var computer_image_src = "./imgs/scissors.png"
  if (computer_move === "rock"){ computer_image_src = "./imgs/rock.png"}
  else if( computer_move === "paper"){ computer_image_src = "./imgs/paper.jpg"}
  $('.computer_move').attr('src', computer_image_src) 
}

  // Audio Files:
  var start_audio = new Audio("../app/audio/click.mp3")
  var player_audio = new Audio("../app/audio/player_wins.mp3")
  var computer_audio = new Audio("../app/audio/computer_wins.mp3")
  var player_celebrate = new Audio("../app/audio/player_celebrate.mp3")
  var computer_celebrate = new Audio("../app/audio/computer_celebrate.mp3")
  
  // function to restart audio files
  function restart_audio(){
      var audio_variable_list = [start_audio, player_audio, computer_audio, player_celebrate, computer_celebrate]
      audio_variable_list.forEach( function(item){ item.pause(); item.currentTime = 0.0 })
      // start click audio for input button 
      start_audio.play()
  } 
  
  // Write code that plays 'Rock, Paper, Scissors' until either the player or the computer has won five times.
  var playerWins = 0;
  var computerWins = 0;
  $("#play_game").on("click", function(){
    // restart audio files for a smooth transition:
    restart_audio();
    // restart game if game is over
    if(playerWins === 5 || computerWins === 5){ 
      playerWins = 0;
      $('#player_wins').text("Player Wins: " + String(playerWins))
      computerWins = 0;
      $('#computer_wins').text("Computer Wins: " + String(computerWins))
    }
    // start round
    var playerMove = $('#player_input').val().toLowerCase()
    var computerMove = getComputerMove()
    // update images
    changeImages(playerMove, computerMove);
    // get winner of round
    var winner = getWinner(playerMove, computerMove)
    if ( winner === "player"){ playerWins += 1; $('#player_wins').text("Player Wins: " + String(playerWins)); player_audio.play() }
    else if ( winner === "computer"){ computerWins += 1; $('#computer_wins').text("Computer Wins: " + String(computerWins)); computer_audio.play() }
    // Display Winner of game - if there is one at the time 
    if(playerWins ===5){ $('#player_wins').text("PLAYER WINS!!! Continue Playing to Start a New Game"); player_celebrate.play() }
    else if(computerWins === 5){ $('#computer_wins').text("COMPUTER WINS!!! Continue Playing to Start a New Game"); computer_celebrate.play() }
  }); 

});
