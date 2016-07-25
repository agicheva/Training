(function ($) {
    $.widget("ui.ticTacToe", {
        options: {
            width: '222px',
            height: '222px',
            backgroundColor: '#8EFCFA',
            xColor: 'black',
            oColor: 'black'
            //firstPlayer: 'x',
            //secondPlayer: 'o'
        },

        css: {
            cell: "cell",
            x: "x",
            o: "o"
        },

        _create: function () {
            this._SetButtons();
        },

        _SetButtons: function () {
            var self = this;
            arrElements = this.boardCheck();
            this.btnStart = $("<button>", {
                text: "Start"
            }).appendTo(this.element).button().one("click", function () {
                self._render();
                self._startGame();
            });
            this.btnReset = $("<button>", {
                text: "Reset",
                type: "reset"
            }).appendTo(this.element).button().on("click", function () {
                for (var i = 0; i < arrElements.length; i++) {
                    arrElements[i] = "";
                }
                $('.' + self.css.cell).text("");
                self._detachEvents();
                self._startGame();
            });
        },

        _render: function () {
            var countCells = 0;
            var table = $('<table></table>');
            table.addClass('tic-tac-toe1')
                .height(this.options.height)
                .width(this.options.width);
            $(this.element).append(table);
            for (var i = 0; i < 3; i++) {
                var row = $('<tr></tr>').addClass('row');
                row.appendTo(table);
                for (var j = 0; j < 3; j++) {
                    var cell = $('<td></td>', { id: "c" + countCells })
                        .addClass(this.css.cell)
                        .appendTo(row);
                    countCells++;
                }
            }
        },

        setOption: function (option, value) {
            var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "width":
					this._setWidth(value);
					break;
				case "height":
					this._setHeight(value);
					break;
                case "xColor":
                    this._setXColor(value);
                    break;
			    case "oColor":
			        this._setOColor(value);
			        break;
			    //case "firstPlayer":
			    //    this._setFirstPlayerIndex(value);
			    //    break;
			    //case "secondPlayer":
			    //    this._setSecondPlayerIndex(value);
			    //    break;
				default:
					break;
			}
        },
        
        _setWidth: function(value){
            this.css.width = value;
        },

         _setHeight: function(value){
            this.css.hight = value;
        },

        _setXColor: function(value){
            this.options.xColor = value;
            this._applyXColor();
        },

        _setOColor: function (value) {
            this.options.oColor = value;
            this._applyOColor();
        },

        //_setFirstPlayerIndex: function(value){
        //    this.options.firstPlayer = value;
        //    this._applyFirstPlayer();
        //},
        
        //_applyFirstPlayer: function(){
        //    $('.' + this.css.x).css("text", this.options.firstPlayer);
        //},

        _applyXColor(){
            $('.' + this.css.x).css("color", this.options.xColor);
        },

        _applyOColor: function () {
            $('.' + this.css.o).css("color", this.options.oColor);
        },

        _startGame: function () {
            var self = this;
            var gameEnded = false;
            var self = this;
            $('.'+this.css.cell).one('click', function (event) {  
                var count = 1;
                var turn = 0;           //human = 'x'   comp = 'o'
                if (turn == 0) {
                    var humanX = $('<span>x</span>')
                        .addClass(self.css.x)
                        .appendTo(this);  //human score
                    //var humanX = $('<span></span>').addClass(self.css.x).appendTo(this);
                    self._applyXColor();
                    //self._applyFirstPlayer();
                    self.boardCheck();
                    gameEnded = self.checkWin(gameEnded, self.boardCheck());
                    turn = 1;
                    if (gameEnded) {
                        return;
                    }
                
                   if (!gameEnded && turn == 1) {
                        self.compMove(count, turn, self.boardCheck(), gameEnded);
                        self.boardCheck();
                        self.checkWin(gameEnded, self.boardCheck());
                        turn = 0;
                    }
                }
            });
        },

        _detachEvents: function(){
            $('.' + this.css.cell).off('click');
        },

        boardCheck: function () {
            var arrElements = new Array(9);
            for (var i = 0; i < 9; i++) {
                arrElements[i] = $('#c' + i + " span").html();
            }
            return arrElements;
        },

        compMove: function (count, turn, arrElements, gameEnded) {
            var flag = true;
            var self = this;
            for (var p = 0; p < 9; p++) {
                if (p >= 0 && p < 3) {    //check vertical for first row
                    if (arrElements[p] == undefined && (arrElements[p + 3] == arrElements[p + 6] && arrElements[p + 3] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);  
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 3] == arrElements[p + 6] && arrElements[p + 3] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p >= 3 && p < 6) {   //check vertical for second row
                    if (arrElements[p] == undefined && (arrElements[p + 3] == arrElements[p - 3] && arrElements[p + 3] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 3] == arrElements[p - 3] && arrElements[p + 3] == "x")) {
                        $('<span>o</span>')
                         .addClass(self.css.o)
                         .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p >= 6 && p < 9) {    //check vertical for third row
                    if (arrElements[p] == undefined && (arrElements[p - 3] == arrElements[p - 6] && arrElements[p - 3] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 3] == arrElements[p - 6] && arrElements[p - 3] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 1 || p == 4 || p == 7) {     //check horizontal for seond column
                    if (arrElements[p] == undefined && (arrElements[p - 1] == arrElements[p + 1] && arrElements[p - 1] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 1] == arrElements[p + 1] && arrElements[p - 1] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                if (p == 2 || p == 5 || p == 8) {      //check horizontal for third column
                    if (arrElements[p] == undefined && (arrElements[p - 1] == arrElements[p - 2] && arrElements[p - 1] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 1] == arrElements[p - 2] && arrElements[p - 1] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 0 || p == 3 || p == 6) {      //check horizontal for first column
                    if (arrElements[p] == undefined && (arrElements[p + 1] == arrElements[p + 2] && arrElements[p + 1] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 1] == arrElements[p + 2] && arrElements[p + 1] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                //check for diagonals
                if (p == 0) {
                    if (arrElements[p] == undefined && (arrElements[p + 4] == arrElements[p + 8] && arrElements[p + 4] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 4] == arrElements[p + 8] && arrElements[p + 4] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 2) {
                    if (arrElements[p] == undefined && (arrElements[p + 2] == arrElements[p + 4] && arrElements[p + 2] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 2] == arrElements[p + 4] && arrElements[p + 2] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 4) {
                    if (arrElements[p] == undefined && ((arrElements[p + 2] == arrElements[p - 2] && arrElements[p - 2] == "o") || (arrElements[p + 4] == arrElements[p - 4] && arrElements[p - 4] == "o"))) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && ((arrElements[p + 2] == arrElements[p - 2] && arrElements[p - 2] == "x") || (arrElements[p + 4] == arrElements[p - 4] && arrElements[p - 4] == "x"))) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 6) {
                    if (arrElements[p] == undefined && (arrElements[p - 2] == arrElements[p - 4] && arrElements[p - 2] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 2] == arrElements[p - 4] && arrElements[p - 2] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 8) {
                    if (arrElements[p] == undefined && (arrElements[p - 4] == arrElements[p - 8] && arrElements[p - 4] == "o")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 4] == arrElements[p - 8] && arrElements[p - 4] == "x")) {
                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applyOColor();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
            }

            if (flag) {
                if (arrElements[0] == undefined) {
                    $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c0');
                    self._applyOColor();
                    turn = 0;
                    return;
                }
                else {
                    if (arrElements[3] == undefined) {
                        $('<span>o</span>')
                         .addClass(self.css.o)
                         .appendTo("#c3");
                        self._applyOColor();
                        turn = 0;
                        return;
                    }
                    else {
                        if (arrElements[4] == undefined) {
                            $('<span>o</span>')
                         .addClass(self.css.o)
                         .appendTo('#c4');
                            self._applyOColor();
                            turn = 0;
                            return;
                        }
                        else {
                            if (arrElements[7] == undefined) {
                                $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c7');
                                self._applyOColor();
                                turn = 0;
                                return;
                            }
                            else {
                                if (arrElements[8] == undefined) {
                                    $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c8');
                                    self._applyOColor();
                                    turn = 0;
                                    return;
                                }
                                else {
                                    if (arrElements[5] == undefined) {
                                        $('<span>o</span>')
                        .addClass(self.css.o)
                        .appendTo('#c5');
                                        self._applyOColor();
                                        turn = 0;
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        },

        checkWin: function (gameEnded, arrElements) {
            if (jQuery.inArray(undefined, arrElements) !== -1) {
                //vertical
                for (var u = 0; u <= 2; u++) {
                    if (arrElements[u] == arrElements[u + 3] && arrElements[u] == arrElements[u + 6] && arrElements[u] == 'x') {
                        gameEnded = true;
                        alert('You win!');
                        return gameEnded;

                    }
                    else if (arrElements[u] == arrElements[u + 3] && arrElements[u] == arrElements[u + 6] && arrElements[u] == 'o') {
                        gameEnded = true;
                        alert('You lose!');
                        return gameEnded;
                    }
                }

                //horizontal
                for (var h = 0; h < 6; h = h + 3) {
                    if (arrElements[h] == arrElements[h + 1] && arrElements[h] == arrElements[h + 2] && arrElements[h] == 'x') {
                        gameEnded = true;
                        alert('You win!');
                        return gameEnded;

                    }
                    else if (arrElements[h] == arrElements[h + 1] && arrElements[h] == arrElements[h + 2] && arrElements[h] == 'o') {
                        gameEnded = true;
                        alert('You lose!');
                        return gameEnded;

                    }
                }
                //diagonals
                for (var g = 0; g < 9; g = g + 4) {
                    if (arrElements[g] == arrElements[g + 4] && arrElements[g] == arrElements[g + 8] && arrElements[g] == 'x') {
                        gameEnded = true;
                        alert('You win!');
                        return gameEnded;

                    }
                    else if (arrElements[g] == arrElements[g + 4] && arrElements[g] == arrElements[g + 8] && arrElements[g] == 'o') {
                        gameEnded = true;
                        alert('You lose!');
                        return gameEnded;

                    }
                }

                for (var b = 2; b < 7; b = b + 2) {
                    if (arrElements[b] == arrElements[b + 2] && arrElements[b] == arrElements[b + 4] && arrElements[b] == 'x') {
                        gameEnded = true;
                        alert('You win!');
                        return gameEnded;

                    }
                    else if (arrElements[b] == arrElements[b + 2] && arrElements[b] == arrElements[b + 4] && arrElements[b] == 'o') {
                        gameEnded = true;
                        alert('You lose!');
                        return gameEnded;

                    }
                }
            }
            else {
                gameEnded = true;
                alert("It's a tie!");
                return gameEnded;
            }
        }
    });
}(jQuery));