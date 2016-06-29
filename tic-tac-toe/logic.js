var compMove;
var boardCheck;
var checkWin;
var c1;
var c2;
var c3;
var c4;
var c5;
var c6;
var c7;
var c8;
var c9;
var gameEnded = false;
var turn = 0;               //human = 'x'   comp = 'o'

var newGame = function(){
    $('td').one('click', function(event){
        if (turn == 0) {
            $(this).text('x');  //human score
            boardCheck();
            checkWin();
            turn = 1;
            compMove();
            boardCheck();
            checkWin();
        }
    });
};

$(document).ready(function(){
    newGame();
});

boardCheck = function () {
    c1 = $('#c1').html();
    c2 = $('#c2').html();
    c3 = $('#c3').html();
    c4 = $('#c4').html();
    c5 = $('#c5').html();
    c6 = $('#c6').html();
    c7 = $('#c7').html();
    c8 = $('#c8').html();
    c9 = $('#c9').html();
};



compMove = function(){
    if (c1 == "" && ((c4=='x' && c7=='x') || 
	(c2=='x' && c3=='x') || (c5=='x' && c9=='x'))) {
		$('#c1').text("o");
        turn = 0;
	}
	else {
		if (c2=="" && ((c5=='x' && c8=='x') || (c1=='x' && c3=='x'))) {
			$('#c2').text("o");
            turn = 0;
		}
		else {
			if (c3 == "" && ((c1=='x' && c2=='x') || (c6=='x' && c9=='x') || 
			(c5=='x' && c7=='x'))) {
				$('#c3').text("o");
                turn = 0;
			}
			else{
				if(c4 == "" && ((c5=='x' && c6=='x') || (c1=='x' && c7=='x'))){
					$('#c4').text("o");
                    turn = 0;
				}
				else{
					if(c5 == "" && ((c2=='x' && c8=='x') || (c4=='x' && c6=='x') ||
					(c3=='x' && c7=='x') || (c1=='x' && c9=='x'))){
						$('#c5').text("o");
                        turn = 0;
					}
					else{
						if(c6 == "" && ((c3=='x' && c9=='x') || (c5=='x' && c4=='x'))){
							$('#c6').text("o");
                            turn = 0;
						}
						else{
							if(c7 == "" && ((c1=='x' && c4=='x') || (c5=='x' && c3=='x') ||
							(c8=='x' && c9=='x'))){
								$('#c7').text("o");
                                turn = 0;
							}
							else{
								if(c8 == "" && ((c2=='x' && c5=='x') || (c7=='x' && c9=='x'))){
									$('#c8').text("o");
                                    turn = 0;
								}
								else{
									if(c9 == "" && ((c3=='x' && c6=='x') || (c1=='x' && c5=='x') ||
									(c7=='x' && c8=='x'))){
										$('#c9').text("o");
                                        turn = 0;
									}
									else{
										if(c1==""){
											$('#c1').text("o");
                                            turn = 0;
										}
										else{
											if(c4 == ""){
												$('#c4').text("o");
                                                turn = 0;
											}
											else{
												if(c5 == ""){
													$('#c5').text("o");
                                                    turn = 0;
												}
												else{
													if(c8 == ""){
														$('#c8').text("o");
                                                        turn = 0;
													}
													else{
														if(c9 == ""){
															$('#c9').text("o");
                                                            turn = 0;
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

checkWin = function () {
    if (gameEnded) {
		return;
	}

    var currElement;
	var arrElements = [];
	for(var i=1; i<=9;i++)
	{
		currElement = "c" + i;
		arrElements.push($('#'+currElement).html());
	}

    if (jQuery.inArray("", arrElements)!=-1) {
        //vertical
        for (var j = 0; j <= 2; j++) {
            if (arrElements[j] == arrElements[j + 3] && arrElements[j] == arrElements[j + 6] && arrElements[j] == 'x') {
                alert('You win!');
                gameEnded = true;
            }
            else if (arrElements[j] == arrElements[j + 3] && arrElements[j] == arrElements[j + 6] && arrElements[j] == 'o') {
                alert('You lose!');
                gameEnded = true;
            }
        }

        //horizontal
        for (var k = 0; k < 6; k = k + 3) {
            if (arrElements[k] == arrElements[k + 1] && arrElements[k] == arrElements[k + 2] && arrElements[k] == 'x') {
                 alert('You win!');
                 gameEnded = true;
            }
            else if (arrElements[k] == arrElements[k + 1] && arrElements[k] == arrElements[k + 2] && arrElements[k] == 'o') {
                 alert('You lose!');
                 gameEnded = true;
            }
        }
        //diagonals
        for(var m = 0; m < 9; m = m + 4){
            if (arrElements[m] == arrElements[m + 4] && arrElements[m] == arrElements[m + 8] && arrElements[m] == 'x') {
                alert('You win!');
                 gameEnded = true;
            }
            if (arrElements[m] == arrElements[m + 4] && arrElements[m] == arrElements[m + 8] && arrElements[m] == 'o') {
                alert('You lose!');
                 gameEnded = true;
            }
        }

        for(var n = 2; n < 7; n = n + 2){
            if (arrElements[n] == arrElements[n + 2] && arrElements[n] == arrElements[n + 4] && arrElements[n] == 'x') {
                alert('You win!');
                 gameEnded = true;
            }
            if (arrElements[n] == arrElements[n + 2] && arrElements[n] == arrElements[n + 4] && arrElements[n] == 'o') {
                alert('You lose!');
                 gameEnded = true;
            }
        }
    }
    else{
        alert("It's a tie!");
        gameEnded = true;
    }
};
