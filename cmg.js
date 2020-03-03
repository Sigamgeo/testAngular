angular.module('cmg', []).controller('ControladorJogo', ['$scope', function ($scope) {
	
	//Desenha o tabuleiro
    $scope.tamanho = 4;
    $scope.campos = [];

    for (var i = 0; i < $scope.tamanho; i++) {
        $scope.campos.push(i);
    }


}]);


$(document).ready(function() {   
    var themes = [
        {
            //name: 'CLASSIC',
            //boardBorderColor: '#666',
            //lightBoxColor: '#fff',
            //darkBoxColor: '#ccc',
            //optionColor: '#000',
            //optionHoverColor: '#999'
            name: 'CLASSIC',
            boardBorderColor: '#666',
            lightBoxColor: 'transparent',
            darkBoxColor: 'transparent',
            optionColor: '#000',
            optionHoverColor: '#999'
        },
        {   
            //name: 'WOOD',
            //boardBorderColor: '#803E04',
            //lightBoxColor: '#FFCE9E',
            //darkBoxColor: '#D18B47',
            //optionColor: '#803E04',
            //optionHoverColor: '#311B0B'
            name: 'WOOD',
            boardBorderColor: '#000000',
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
            name: 'vermelho',
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
    
    //Set up color for chess cartas
    var setColor = function() {
        var color = colors[colorOption];
        
        $('#color-option').html(color.name);
        
        $('.box').css('color', color['color']);
        
        $('#pawn-promotion-option').css('color', color['color']);
        
        $('#jogador').css('color', color['color']);
    }
	 
	 //=====GLOBAL VARIABLES=========//

	//Cards
	var cards = {
		 'azul': {
			  'king': '2',
			  'queen': '&#9813;',
			  'rook': '&#9814;',
			  'bishop': '&#9815;',
			  'knight': '&#9816;',
		      'pawn': '&#9817;'
		 },
		 'vermelho': {
		      'king': '1',
			  'queen': '&#9819;',
			  'rook': '&#9820;',
			  'bishop': '&#9821;',
			  'knight': '&#9822;',
			  'pawn': '&#9823;'
		 }
	};

	var jogador = 'vermelho'; //First jogador

	//Selected chess carta to move
	var select = {
		 canMove: false, //Ready to move of not
		 carta: '',      //Color, type of the carta
		 box: ''         //Position of the carta
	}

	//Game's history (cartas + positions)
	var historyMoves = [];

	//Position and color of pawn promotion
	var promotion = {};


    //Define tabuleiro
	$(function () {
	    $('#jogador').html(cards.vermelho.king);


	    //Define cores para boxes, cartas
	    for (var y = 0; y < 1; y++) {
	        for (var x = 0; x < 8; x++) {
	            var box = $('#box-R01-' + x + '-' + y);
	            box.addClass('ng-scope'); //ng-scope para definir imagem
	            r = 1;
	            setNewBoard(box, x, y, r); //Define todas as cartas
	        }
	    }
	    for (var y = 0; y < 1; y++) {
	        for (var x = 0; x < 8; x++) {
	            var box = $('#box-R02-' + x + '-' + y);
	            box.addClass('ng-scope');
	            //box.addClass('light-box');
	            r = 2;
	            setNewBoard(box, x, y, r); //Define todas as cartas
	        }
	    }
	    setColor();
	    setTheme();
	});

    //==============CLICK EVENTS==================//

	$(function () {
	    //Menu de opcoes
	    $('#option').on('click', function () {
	        if ($('#option-menu').hasClass('hide')) {
	            $('#game').css('opacity', '0.3');
	            $('#option-menu').removeClass('hide');
	        } else {
	            $('#game').css('opacity', '1');
	            $('#option-menu').addClass('hide');
	        }
	    });

	    //Botao de voltar
	    //Volta ao jogo
	    $('#back-btn').on('click', function () {
	        $('#option-menu').addClass('hide');
	        $('#game').css('opacity', '1');
	    });

	    //Botao de desfazer
	    $('#undo-btn').on('click', function () {
	        if (historyMoves.length === 0) {
	            return;
	        }

	        var move = historyMoves.pop();

	        var previous = move.previous;
	        defineCarta($('#' + previous.box), previous.carta.split('-')[0], previous.carta.split('-')[1]);

	        var current = move.current;
	        if (current.carta === '') {
	            var currentBox = $('#' + current.box);
	            currentBox.html('');
	            currentBox.attr('carta', '');
	            currentBox.removeClass('placed');
	        } else {
	            defineCarta($('#' + current.box), current.carta.split('-')[0], current.carta.split('-')[1]);
	        }

	        //Redefine todas mudancas
	        $('.box').removeClass('selected');
	        $('.box').removeClass('suggest');

	        trocaJogador();

	        select = { canMove: false, carta: '', box: '' };
	    });

	    //Pawn promotion event
	    $('#pawn-promotion-option .option').on('click', function () {

	        var newType = $(this).attr('id');
	        promotion.box.html(cards[promotion.color][newType]);
	        promotion.box.addClass('placed');
	        promotion.box.attr('carta', promotion.color + '-' + newType);

	        $('#pawn-promotion-option').addClass('hide');
	        $('#game').css('opacity', '1');

	        promotion = {};
	    });

	    //Reinicia jogo
	    $('#restart-btn').on('click', function () {
	        resetGame();
	    });

	    //Reinicia o jogo apos termino
	    $('#result').on('click', function () {
	        resetGame();
	    });

	    //Box click event
	    $('.box').on('click', function () {
	        if ($(this).hasClass('selected')) { //Undo to select new box
	            $(this).removeClass('selected');

	            $('.box').removeClass('suggest');
	            select = { canMove: false, carta: '', box: '' };
	            return;
	        }

	        //Seleciona novo box
	        if (!select.canMove) {
	            //verifica a cor correta a jogar
	            if ($(this).attr('carta').indexOf(jogador) >= 0) {
	                //Seleciona a carta a mover
	                selecionaCarta($(this));
	            }
	        }

	        //Set up new destination for selected box
	        else if (select.canMove) {
	            var selectedcartaInfo = select.carta.split('-');
	            var color = selectedcartaInfo[0];
	            var type = selectedcartaInfo[1];

	            //Select new carta to move if 2 colors are the same
	            if ($(this).attr('carta').indexOf(color) >= 0) {
	                $('#' + select.box).removeClass('selected');
	                $('.box').removeClass('suggest');
	                //Select a carta to move
	                selecionaCarta($(this));
	                return;
	            }

	            //Pode mover se e valido
	            if ($(this).hasClass('suggest')) {

	                //Salava movimento no historico
	                var move = {
	                    previous: {},
	                    current: {}
	                }

	                move.previous.carta = select.carta;
	                move.previous.box = select.box;

	                move.current.carta = $(this).attr('carta');
	                move.current.box = $(this).attr('id');

	                historyMoves.push(move);

	                //Move carta selecionada com sucesso
	                defineCarta($(this), color, type);

	                //Apaga box movido
	                deleteBox($('#' + select.box));

	                $('.box').removeClass('suggest');

	                select = { canMove: false, carta: '', box: '' };

	                //Troca jogador
	                trocaJogador();
	            }
	        }
	    });
	});

    //Guarda carta e posicao da carta selecionada
	var selecionaCarta = function (box) {
	    box.addClass('selected');
	    select.box = box.attr('id');
	    select.carta = box.attr('carta');
	    select.canMove = true;

	    suggestNextMoves(getNextMoves());
	}

    //CALCULA MOVIMENTOS VALIDOS=======//

    //Retorna movimentos possiveis da carta selecionada
	var getNextMoves = function () {

	    var nextMoves = [];

        //todas as areas do tabuleiro
	    var moves = [
                        [0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3],
                        [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]
	    ];
	    nextMoves = getCardMoves(0, 0, moves); //busca locais possiveis de se colocar a carta

	    return nextMoves; //retorna locais possiveis
	}

    //retorna movimentos possiveis no tabuleiro
	var getCardMoves = function (i, j, moves) {
	    var nextMoves = [];
	    for (var index = 0; index < moves.length; index++) {
	        var tI = i + moves[index][0];
	        var tJ = j + moves[index][1];
	        if (!outOfBounds(tI, tJ)) {
	            var box = $('#box-' + tI + '-' + tJ);
	            if (box.attr('carta') == '') {
	                nextMoves.push([tI, tJ]);
	            }
	        }
	        else {
	            console.log(tI + '-' + tJ);
	        }
	    }
	    return nextMoves;
	}

    //Verifica se posicao i, j esta no tabuleiro
	var outOfBounds = function (i, j) {
	    return (i < 0 || i >= 4 || j < 0 || j >= 4);
	}

    //Mostra movimentos possiveis ao adicionar sugestoes aos boxes
	var suggestNextMoves = function (nextMoves) {
	    for(var move of nextMoves) {
	        var box = $('#box-' + move[0] + '-' + move[1]);
	        box.addClass('suggest');
	    }
	}

    //=============================================//

    //Define carta para box clicado
	var defineCarta = function (box, color, type) {
	    //Check end game (if king is defeated)
	    if (box.attr('carta').indexOf('king') >= 0) {
	        showWinner(jogador);

	        box.html(cards[color][type]);
	        box.addClass('placed');
	        box.attr('carta', color + '-' + type);

	        return;
	    }

	    //Check if pawn reached the last line
	    var j = parseInt(box.attr('id').charAt(6));
	    if (type === 'pawn') {
	        if ((jogador === 'vermelho' && j === 7) ||
                  (jogador === 'azul' && j === 0)) {
	            $('#game').css('opacity', '0.5');

	            var option = $('#pawn-promotion-option');
	            option.removeClass('hide');
	            option.find('#queen').html(cards[jogador].queen);
	            option.find('#rook').html(cards[jogador].rook);
	            option.find('#knight').html(cards[jogador].knight);
	            option.find('#bishop').html(cards[jogador].bishop);

	            promotion = { box: box, color: color };

	            return;
	        }
	    }

	    //Define background-image
	    if (type === 'pawn' && color === 'vermelho') {
	        box.attr('style', 'background-image: url(\'cards/logoSIPAI-red.png\'); background-tamanho: cover;');
	    } else if (type === 'pawn' && color === 'azul') {
	        box.attr('style', 'background-image: url(\'cards/logoSIPAI-blue.png\'); background-tamanho: cover;');
	    } else if (type === 'knight' && color === 'vermelho') {
	        box.attr('style', 'background-image: url(\'cards/logoNascentes-red.png\'); background-tamanho: cover;');
	    } else if (type === 'knight' && color === 'azul') {
	        box.attr('style', 'background-image: url(\'cards/logoNascentes-blue.png\'); background-tamanho: cover;');
	    }

	    box.html(cards[color][type]);
	    box.addClass('placed');
	    box.attr('carta', color + '-' + type);

	}

    //Apaga elemento selecionado
	var deleteBox = function (box) {
	    box.removeClass('placed');
	    box.removeClass('selected');
	    box.removeClass('suggest');
	    box.html('');
	    box.attr('carta', '');
	    box.attr('style', ''); //remove imagem do box agora vazio
	}

    //Sorteia cartas iniciais nas reservas
	var setNewBoard = function (box, i, j, r) {
	    if (r === 2) {
	        if (i === 0) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'azul', cardNome);
	        } else if (i === 1) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'azul', cardNome);
	        } else if (i === 2) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'azul', cardNome);
	        } else if (i === 3) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'azul', cardNome);
	        } else if (i === 4) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'azul', cardNome);
	        } else if (i === 5) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'azul', cardNome);
	        } else if (i === 6) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'azul', cardNome);
	        } else if (i === 7) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'azul', cardNome);
	        }
	    } else if (r === 1) {
	        if (i === 0) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'vermelho', cardNome);
	        } else if (i === 1) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'vermelho', cardNome);
	        } else if (i === 2) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'vermelho', cardNome);
	        } else if (i === 3) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'vermelho', cardNome);
	        } else if (i === 4) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'vermelho', cardNome);
	        } else if (i === 5) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'vermelho', cardNome);
	        } else if (i === 6) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'vermelho', cardNome);
	        } else if (i === 7) {
	            cardNum = Math.floor((Math.random() * 6) + 1);
	            if (cardNum === 1) {
	                cardNome = 'pawn';
	            } else if (cardNum === 2) {
	                cardNome = 'rook';
	            } else if (cardNum === 3) {
	                cardNome = 'bishop';
	            } else if (cardNum === 4) {
	                cardNome = 'knight';
	            } else if (cardNum === 5) {
	                cardNome = 'queen';
	            } else if (cardNum === 6) {
	                cardNome = 'king';
	            }
	            defineCarta(box, 'vermelho', cardNome);
	        }
	    }
	}

    //Troca jogador
	var trocaJogador = function () {
	    if (jogador === 'vermelho') {
	        $('#jogador').html(cards.azul.king);
	        jogador = 'azul';
	    } else {
	        $('#jogador').html(cards.vermelho.king);
	        jogador = 'vermelho';
	    }
	}

    //Reinicia jogo
	var resetGame = function () {
	    deleteBox($('.box'));
	    $('#jogador').html(cards.vermelho.king);
	    $('#result').addClass('hide');
	    $('#option-menu').addClass('hide');
	    $('#game').css('opacity', '1');

	    //Define cores para boxes, cards
	    for (var y = 0; y < 1; y++) {
	        for (var x = 0; x < 8; x++) {
	            var box = $('#box-R01-' + x + '-' + y);
	            box.addClass('ng-scope');
	            r = 1;
	            setNewBoard(box, x, y, r); //Define cards do jogador 1
	        }
	    }
	    for (var y = 0; y < 1; y++) {
	        for (var x = 0; x < 8; x++) {
	            var box = $('#box-R02-' + x + '-' + y);
	            box.addClass('ng-scope');
	            r = 2;
	            setNewBoard(box, x, y, r); //Define cards do jogador 2
	        }
	    }


	    //Define variaveis global para o padrao
	    jogador = 'vermelho';
	    select = {
	        canMove: false,
	        carta: '',
	        box: ''
	    };

	    historyMoves = [];
	    promotion = {};
	}

    //Anuncia o vencedor
	var showWinner = function (winner) {

	    historyMoves = [];
	    promotion = {};

	    setTimeout(function () {
	        if (winner === 'DRAW') { //Jogo empatou
	            $('#result').css('color', '#000');
	            $('#result').html(winner);
	        } else { //Ha um vencedor
	            $('#result').css('color', winner + '');
	            $('#result').html(cards[winner].king + ' ganhou!');
	        }
	        $('#result').removeClass('hide');
	        $('#game').css('opacity', '0.5');
	    }, 1000);
	}

});
