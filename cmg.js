angular.module('cmg', []).controller('GameController', ['$scope', function($scope) {
	
	//Draw the board game
    $scope.size = 4;
    $scope.widths = [];

    //Draw board
    for(var i = 0; i < $scope.size; i++) { 
        $scope.widths.push(i);
    }


}]);


$(document).ready(function() {   
    var themes = [
        {
            name: 'CLASSIC',
            boardBorderColor: '#666',
            lightBoxColor: 'transparent',
            darkBoxColor: 'transparent',
            optionColor: '#000',
            optionHoverColor: '#999'
        },
        {   
            name: 'WOOD',
            boardBorderColor: '##803E04',
            lightBoxColor: 'transparent',
            darkBoxColor: 'transparent',
            optionColor: '#803E04',
            optionHoverColor: '#311B0B'
        },
        {
            name: 'OCEAN',
            boardBorderColor: '#023850',
            lightBoxColor: '#fff',
            darkBoxColor: '#0A85AE',
            optionColor: '#023850',
            optionHoverColor: '#3385ff'
        },
        {
            name: 'FOREST',
            boardBorderColor: '#005900',
            lightBoxColor: '#CAC782',
            darkBoxColor: '#008C00',
            optionColor: '#005900',
            optionHoverColor: '#0c0'
        },
        {
            name: 'BLOOD',
            boardBorderColor: '#f3f3f3',
            lightBoxColor: '#f3f3f3',
            darkBoxColor: '#f00',
            optionColor: '#f00',
            optionHoverColor: '#f99'
        }
    ];
    
    var colors = [
        {
            name: 'BLACK',
            color: '#000'
        }, 
        {
            name: 'GREEN',
            color: '#030'
        }, 
        {
            name: 'BLUE',
            color: '#036'
        }, 
        {
            name: 'PINK',
            color: '#606'
        }, 
        {
            name: 'BROWN',
            color: '#630'
        }
    ];
    
    var colorOption = 0;
    var themeOption = 1;
    
    //Change theme
    $('#theme-option').on('click', function() {
        themeOption === themes.length - 1 ? themeOption = 0 : themeOption++;
        
        setTheme();
    });
    
    //Set up theme
    var setTheme = function() {
        var theme = themes[themeOption];
        
        $('#theme-option').html(theme.name);
        
        $('#board').css('border-color', theme.boardBorderColor);
        $('.light-box').css('background', theme.lightBoxColor);
        $('.dark-box').css('background', theme.darkBoxColor);
        
        $('.option-nav').css('color', theme.optionColor);
        
        //Option button effect
        $('#option').css('color', theme.optionColor);
        $('#option').hover(
            function() {
                $(this).css('color', theme.optionHoverColor);
            }, function() {
                $(this).css('color', theme.optionColor);
            }
        );
        
        //Undo button effect
        $('#undo-btn').css('color', theme.optionColor);
        $('#undo-btn').hover(
            function() {
                $(this).css('color', theme.optionHoverColor);
            }, function() {
                $(this).css('color', theme.optionColor);
            }
        );
        
        //Option Menu effect
        $('#option-menu').css('color', theme.optionColor);
        $('.button').css('color', theme.optionColor);
        $('.button').hover(
            function() {
                $(this).css('color', theme.optionHoverColor);
            }, function() {
                $(this).css('color', theme.optionColor);
            }
        );
    }
    
    //Change color
    $('#color-option').on('click', function() {
       colorOption === colors.length - 1 ? colorOption = 0 : colorOption++;
        
        setColor();
    });
    
    //Set up color for chess pieces
    var setColor = function() {
        var color = colors[colorOption];
        
        $('#color-option').html(color.name);
        
        $('.box').css('color', color['color']);
        
        $('#pawn-promotion-option').css('color', color['color']);
        
        $('#player').css('color', color['color']);
    }
	 
	 //=====GLOBAL VARIABLES=========//

	//Chess pieces
	var chessPieces = {
		 'white': {
			  'king': '&#9812;',
			  'queen': '&#9813;',
			  'rook': '&#9814;',
			  'bishop': '&#9815;',
			  'knight': '&#9816;',
			  'pawn': '&#9817;'
		 },
		 'black': {
			  'king': '&#9818;',
			  'queen': '&#9819;',
			  'rook': '&#9820;',
			  'bishop': '&#9821;',
			  'knight': '&#9822;',
			  'pawn': '&#9823;'
		 }
	};

	var player = 'black'; //First player

	//Selected chess piece to move
	var select = {
		 canMove: false, //Ready to move of not
		 piece: '',      //Color, type of the piece
		 box: ''         //Position of the piece
	}

	//Game's history (pieces + positions)
	var historyMoves = [];

	//Position and color of pawn promotion
	var promotion = {};

	//Set up board game
	$(function() {		 
		$('#player').html(chessPieces.black.king);


	    //Set up color for boxes, chess pieces
		 for (var y = 0; y < 1; y++) {
		     for (var x = 0; x < 8; x++) {
		         var box = $('#box-R01-' + x + '-' + y);
		         box.addClass('dark-box');
		         r = 1;
		         setNewBoard(box, x, y, r); //Set up all chess pieces
		     }
		 }
		 for (var y = 0; y < 1; y++) {
		     for (var x = 0; x < 8; x++) {
                 var box = $('#box-R02-' + x + '-' + y);
		         box.addClass('light-box');
		         r = 2;
                 setNewBoard(box, x, y, r); //Set up all chess pieces
		     }
		 }
		 setColor();
		 setTheme();
	});

	//==============CLICK EVENTS==================//

		$(function() {
			 //Option menu
			 $('#option').on('click', function() {
				  if($('#option-menu').hasClass('hide')) {
						$('#game').css('opacity', '0.3');
						$('#option-menu').removeClass('hide');
				  } else {
						$('#game').css('opacity', '1');
						$('#option-menu').addClass('hide');
				  }
			 });

			 //Back button
			 //Return to game
			 $('#back-btn').on('click', function() {
				  $('#option-menu').addClass('hide');
				  $('#game').css('opacity', '1');
			 });
			
		 //Undo button 
		 $('#undo-btn').on('click', function() {
			  if(historyMoves.length === 0) {
					return;
			  }

			  var move = historyMoves.pop();

			  var previous = move.previous;        
			  setPiece($('#' + previous.box), previous.piece.split('-')[0], previous.piece.split('-')[1]);

			  var current = move.current;
			  if(current.piece === '') {
					var currentBox = $('#' + current.box);
					currentBox.html('');
					currentBox.attr('piece', '');
					currentBox.removeClass('placed');
			  } else {
					setPiece($('#' + current.box), current.piece.split('-')[0], current.piece.split('-')[1]);
			  }

			  //Reset all changes
			  $('.box').removeClass('selected');
			  $('.box').removeClass('suggest');

			  switchPlayer();

			  select = { canMove: false, piece: '', box: '' };
		 });

		 //Pawn promotion event
		 $('#pawn-promotion-option .option').on('click', function() {

			  var newType = $(this).attr('id');
			  promotion.box.html(chessPieces[promotion.color][newType]);
			  promotion.box.addClass('placed');
			  promotion.box.attr('piece', promotion.color + '-' + newType);

			  $('#pawn-promotion-option').addClass('hide');
			  $('#game').css('opacity', '1');

			  promotion = {};
		 });

		 //Reset game
		 $('#restart-btn').on('click', function() {
			  resetGame(); 
		 });

		 //Restart when game over
		 $('#result').on('click', function() {
			  resetGame();
		 });

		 //Box click event
		 $('.box').on('click', function() {
			  if($(this).hasClass('selected')) { //Undo to select new box
					$(this).removeClass('selected');

					$('.box').removeClass('suggest');
					select = { canMove: false, piece: '', box: '' };
					return;
			  }

			  //Select new box
			  if(!select.canMove) {
					//Check the right color to play
					if($(this).attr('piece').indexOf(player) >= 0) {
						 //Select a piece to move
						 selectPiece($(this));
					}
			  }

			  //Set up new destination for selected box
			  else if(select.canMove) { 
					var selectedPieceInfo = select.piece.split('-');
					var color = selectedPieceInfo[0];
					var type = selectedPieceInfo[1];

					//Select new piece to move if 2 colors are the same
					if($(this).attr('piece').indexOf(color) >= 0) {
						 $('#' + select.box).removeClass('selected');
						 $('.box').removeClass('suggest');
						 //Select a piece to move
						 selectPiece($(this));
						 return;
					}

					//Can move if it is valid
					if($(this).hasClass('suggest')) { 

						 //Save move in history
						 var move = {
							  previous: {},
							  current: {}
						 }

						 move.previous.piece = select.piece;
						 move.previous.box = select.box;

						 move.current.piece = $(this).attr('piece');
						 move.current.box = $(this).attr('id');

						 historyMoves.push( move );

						 //Move selected piece successfully
						 setPiece($(this), color, type);

						 //Delete moved box
						 deleteBox($('#' + select.box));

						 $('.box').removeClass('suggest');

						 select = { canMove: false, piece: '', box: '' };

						 //Switch player
						 switchPlayer();
					}
			  }
		 });
	});

	//Get piece and position of the selected piece
	var selectPiece = function(box) {
		 box.addClass('selected');
		 select.box = box.attr('id');
		 select.piece = box.attr('piece');
		 select.canMove = true;

		 suggestNextMoves(getNextMoves(select.piece, select.box));
	}

	//CALCULATE VALID MOVES=======//

	//Returns possible moves of the selected piece
	var getNextMoves = function(selectedPiece, selectedBox) {
		 var selectedPieceInfo = selectedPiece.split('-');
		 var color = selectedPieceInfo[0];
		 var type = selectedPieceInfo[1];

		 var id = selectedBox.split('-');
		 var i = parseInt(id[2]);
		 var j = parseInt(id[3]);

		 var nextMoves = [];

		 switch(type) {
			  case 'pawn':
					if(color === 'black') {
						 var moves = [
                             [0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3],
                             [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]
						 ];
					} else {
						 var moves = [
							  [0, -1], [0, -2], [1, -1], [-1, -1]
						 ];
					}
					nextMoves = getPawnMoves(0, 0, color, moves);
					break;
			  case 'rook':
					var moves = [
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getQueenMoves(i, j, color, moves);
					break;
			  case 'knight':
					var moves = [
						 [-1, -2], [-2, -1], [1, -2], [-2, 1],
						 [2, -1], [-1, 2], [2, 1], [1, 2]
					];
					nextMoves = getKnightMoves(i, j, color, moves);
					break;
			  case 'bishop':
					var moves = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1]
					];
					nextMoves = getQueenMoves(i, j, color, moves);
					break;
			  case 'queen':
					var moves1 = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1]
					];
					var moves2 = [
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getQueenMoves(i, j, color, moves1)
									.concat(getQueenMoves(i, j, color, moves2));
					break;
			  case 'king':
					var moves = [
						 [1, 1], [1, -1], [-1, 1], [-1, -1],
						 [0, 1], [0, -1], [1, 0], [-1, 0]
					];
					nextMoves = getKnightMoves(i, j, color, moves);
					break;
			  default: 
					break;
         }
		 return nextMoves;
	}

	//Calculate next moves for pawn pieces
	var getPawnMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var index = 0; index < moves.length; index++) {
			  var tI = i + moves[index][0];
              var tJ = j + moves[index][1];
             if (!outOfBounds(tI, tJ)) {
                 var box = $('#box-' + tI + '-' + tJ);
                 if (box.attr('piece') == '') {
                     nextMoves.push([tI, tJ]);
                 }
             }
             else {
                 console.log(tI + '-' + tJ);
             }
         }
         console.log(nextMoves);
		 return nextMoves;
	}

	//Calculate next move of rook, bishop and queen pieces
	var getQueenMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var move of moves) {
			  var tI = i + move[0];
			  var tJ = j + move[1];
			  var sugg = true;
			  while(sugg && !outOfBounds(tI, tJ)) {
					var box = $('#box-' + tI + '-' + tJ);
					if(box.hasClass('placed')) {
						 if(box.attr('piece').indexOf(color) >= 0) {
							  sugg = false;
						 } else {
							  nextMoves.push([tI, tJ]);
							  sugg = false;
						 }
					}
					if(sugg) {
						 nextMoves.push([tI, tJ]);
						 tI += move[0];
						 tJ += move[1];
					}
			  }
		 }
		 return nextMoves;
	}

	//Calculate next moves for knight or king pieces
	var getKnightMoves = function(i, j, color, moves) {
		 var nextMoves = [];
		 for(var move of moves) {
			  var tI = i + move[0];
			  var tJ = j + move[1];
			  if( !outOfBounds(tI, tJ) ) {
					var box = $('#box-' + tI + '-' + tJ);
					if(!box.hasClass('placed') || box.attr('piece').indexOf(color) < 0) {
						 nextMoves.push([tI, tJ]);
					}
			  }
		 }
		 return nextMoves;
	}

	//Check if position i, j is in the board game
	var outOfBounds = function(i, j) {
		 return ( i < 0 || i >= 4 || j < 0 || j >= 4 );
	}

	//Show possible moves by add suggestion to boxes
	var suggestNextMoves = function(nextMoves) {
		 for(var move of nextMoves) {
              var box = $('#box-' + move[0] + '-' + move[1]);
			  box.addClass('suggest');
		 }
	}

	//=============================================//

	//Set up piece for clicked box
	var setPiece = function(box, color, type) {
		 //Check end game (if king is defeated)
		 if(box.attr('piece').indexOf('king') >= 0) {
			  showWinner(player);

			  box.html(chessPieces[color][type]);
			  box.addClass('placed');
			  box.attr('piece', color + '-' + type);

			  return;
		 }

		 //Check if pawn reached the last line
		 var j = parseInt(box.attr('id').charAt(6));
		 if(type === 'pawn') {
			  if( (player === 'black' && j === 7) ||
					(player === 'white' && j === 0)) {
					$('#game').css('opacity', '0.5');

					var option = $('#pawn-promotion-option');
					option.removeClass('hide');
					option.find('#queen').html(chessPieces[player].queen);
					option.find('#rook').html(chessPieces[player].rook);
					option.find('#knight').html(chessPieces[player].knight);
					option.find('#bishop').html(chessPieces[player].bishop);

					promotion = { box: box, color: color };

					return;
			  }
		 }

		 box.html(chessPieces[color][type]);
		 box.addClass('placed');
		 box.attr('piece', color + '-' + type);
	}

	//Delete selected element
    var deleteBox = function (box) {
		 box.removeClass('placed');
		 box.removeClass('selected');
		 box.removeClass('suggest');
		 box.html('');
		 box.attr('piece', '');
	}

	//Default reserve state
	var setNewBoard = function(box, i, j, r) {
	    if (r === 2) {
	        if (i === 0) {
	            setPiece(box, 'white', 'pawn');
	        } else if (i === 1) {
	            setPiece(box, 'white', 'knight');
	        } else if (i === 2) {
	            setPiece(box, 'white', 'bishop');
	        } else if (i === 3) {
	            setPiece(box, 'white', 'queen');
	        } else if (i === 4) {
	            setPiece(box, 'white', 'king');
	        } else if (i === 5) {
                setPiece(box, 'white', 'pawn');
	        } else if (i === 6) {
                setPiece(box, 'white', 'rook');
	        } else if (i === 7) {
	            setPiece(box, 'white', 'pawn');
	        }
	    } else if (r === 1) {
	        if (i === 0) {
	            setPiece(box, 'black', 'pawn');
	        } else if (i === 1) {
	            setPiece(box, 'black', 'knight');
	        } else if (i === 2) {
	            setPiece(box, 'black', 'bishop');
	        } else if (i === 3) {
	            setPiece(box, 'black', 'queen');
	        } else if (i === 4) {
	            setPiece(box, 'black', 'king');
	        } else if (i === 5) {
                setPiece(box, 'black', 'pawn');
	        } else if (i === 6) {
                setPiece(box, 'black', 'rook');
	        } else if (i === 7) {
	            setPiece(box, 'black', 'pawn');
	        }
	    }
	}

	//Switch player
	var switchPlayer = function() {
		 if(player === 'black') {
			  $('#player').html(chessPieces.white.king);
			  player = 'white';
		 } else {
			  $('#player').html(chessPieces.black.king);
			  player = 'black';
		 }
	}

	//Restart game
	var resetGame = function() {
		 deleteBox($('.box'));
		 $('#player').html(chessPieces.black.king);
		 $('#result').addClass('hide');
		 $('#option-menu').addClass('hide');
		 $('#game').css('opacity', '1');

         //Set up color for boxes, cards
         for (var y = 0; y < 1; y++) {
             for (var x = 0; x < 8; x++) {
                 var box = $('#box-R01-' + x + '-' + y);
                 box.addClass('dark-box');
                 r = 1;
                 setNewBoard(box, x, y, r); //Set up player 1 cards
             }
         }
         for (var y = 0; y < 1; y++) {
             for (var x = 0; x < 8; x++) {
                 var box = $('#box-R02-' + x + '-' + y);
                 box.addClass('light-box');
                 r = 2;
                 setNewBoard(box, x, y, r); //Set up all player 2 cards
             }
         }


		 //Set global variables to default
		 player = 'black';
		 select = {
			  canMove: false,
			  piece: '',
			  box: ''
		 };

		 historyMoves = [];
		 promotion = {};
	}

	//Announce the winner
	var showWinner = function(winner) {

		 historyMoves = [];
		 promotion = {};

		 setTimeout(function() {
			  if(winner === 'DRAW') { //Game is draw
					$('#result').css('color', '#000');
					$('#result').html(winner);
			  } else { //There is a winner
					$('#result').css('color', winner + '');
					$('#result').html(chessPieces[winner].king + ' wins!');
			  }
			  $('#result').removeClass('hide');
			  $('#game').css('opacity', '0.5');
		 }, 1000);
	}
    
});
