(function ($) {
    $.widget("ui.ticTacToe", {
        options: {
            /* type="string|number|null Gets/Sets how the width of the control can be set." 
                    string The widget width can be set in pixels (px) and percentage(%).
                    number The widget width can be set as a number in pixels.
                    null type="object" will stretch to fit data, if no other widths are defined.
            */
            width: null,
            /* type="string|number|null Gets/Sets how the height of the control can be set." 
                    string The widget height can be set in pixels (px) and percentage(%).
                    number The widget height can be set as a number in pixels.
                    null type="object" will stretch to fit data, if no other heights are defined.
            */
            height: null,
            /* type="color_name|hex_number|rgb_number Gets/Sets how the background color of the control can be set."
                    color_name type="string" Specifies the background color with a color name (like "red").
                    hex_number type="string" Specifies the background color with a hex code (like "ff0000").
                    rgb_number type="string" Specifies the background color with an rgb code (like "rgb(255,0,0)").
            */
            backgroundColor: '#8EFCFA',
            /* type="color_name|hex_number|rgb_number Gets/Sets how the color of the first player index can be set."
                    color_name type="string" Specifies the color of the first player index with a color name (like "red").
                    hex_number type="string" Specifies the color of the first player index with a hex code (like "ff0000").
                    rgb_number type="string" Specifies the color of the first player index with an rgb code (like "rgb(255,0,0)").
            */
            firstColor: 'black',
            /* type="color_name|hex_number|rgb_number Gets/Sets how the color of the second player index can be set."
                    color_name type="string" Specifies the color of the second player index with a color name (like "red").
                    hex_number type="string" Specifies the color of the second player index with a hex code (like "ff0000").
                    rgb_number type="string" Specifies the color of the second player index with an rgb code (like "rgb(255,0,0)").
            */
            secondColor: 'black',
            /* type="string Gets/Sets how the index of the first player can be set." */
            firstPlayer: 'x',
            /* type="string Gets/Sets how the index of the second player can be set." */
            secondPlayer: 'o'
        },

        css: {
            /* Class applied to the td element in the table. */
            cell: "cell",
            /* Class applied to the index of the first player. */
            x: "x",
            /* Class applied to the index of the second player. */
            o: "o"                                              
        },

        events: {
            /* ticTacToe events go here */

            /* cancel="true"  Event which is raised before rendering of the ticTacToe widget completes. */
            rendering: "rendering",
            /* cancel="false"  Event which is raised after rendering of the ticTacToe widget completes. */
            rendered: "rendered",
            /* cancel="false" Event which is raised on click of start button. */
            gameStarted: "gameStarted",
            /* cancel="false" Event which is raise on click of reset button. */
            gameEnded: "gameEnded",
            /*cancel="true" Event which is raise before the game is ended. */
            gameEnding: "gameEnding"
        },

        _create: function () {
            /* tocTacToe widget constructor goes here */
            this._setButtons();
        },

        _triggerRendering: function(){
            var args = {
                element: this.element,
                owner: this
            };
            return this._trigger(this.events.rendering, null, args);
        },

        _triggerRendered: function(){
            var args = {
                element: this.element,
                owner: this
            };
            this._trigger(this.events.rendered, null, args);
        },

        _triggerGameStarted: function(){
            var args = {
                element: this.element,
                owner: this
            };
            this._render();
            this._startGame();
            return this._trigger(this.events.gameStarted, null, args);
        },

        _triggerGameEnded: function(){
            var args = {
                element: this.element,
                owner: this
            };
            for (var i = 0; i < arrElements.length; i++) {
                arrElements[i] = "";
            }
            $('.' + this.css.cell).text("");
            this._detachEvents();
            this._startGame();
            return this._trigger(this.events.gameEnded, null, args);
        },
        
        _triggerGameEnding: function(){
            var args = {
                element: this.element,
                owner: this
            };
            return this._trigger(this.events.gameEnding, null, args);
        },

        _setButtons: function () {
            var self = this;
            arrElements = this.boardCheck();
            this.btnStart = $("<button>", {
                text: "Start"
            }).appendTo(this.element).button().one("click", function () {
                self._triggerGameStarted();
            });
            this.btnReset = $("<button>", {
                text: "Reset",
                type: "reset"
            }).appendTo(this.element).button().on("click", function () {
                var noCancelGameEnded = self._triggerGameEnding();
                if (noCancelGameEnded) {
                    self._triggerGameEnded();
                }
                //TOSHKO
            });
        },

        _render: function () {
            var noCancel = this._triggerRendering();
            if (noCancel) {
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
                this._triggerRendered();
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
                case "firstColor":
                    this._setfirstColor(value);
                    break;
			    case "secondColor":
			        this._setsecondColor(value);
			        break;
			    case "firstPlayer":
			        if (this.options.firstPlayer !== this.options.secondPlayer) {
			            this._setFirstPlayerIndex(value);
			        } else {
			            this.options.firstPlayer = prevValue;

			        }
			        break;
			    case "secondPlayer":
			        this._setSecondPlayerIndex(value);
			        if (this.options.firstPlayer !== this.options.secondPlayer) {
			            this._setSecondPlayerIndex(value);
			        } else {
			            this.options.secondPlayer = prevValue;

			        }
			        break;
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

        _setfirstColor: function(value){
            this.options.firstColor = value;
            this._applyfirstColor();
        },

        _setsecondColor: function (value) {
            this.options.secondColor = value;
            this._applysecondColor();
        },

        _setFirstPlayerIndex: function () {
            $('.' + this.css.x).html(this.options.firstPlayer);
        },

        _setSecondPlayerIndex: function () {
            $('.' + this.css.o).html(this.options.secondPlayer);
        },

        _applyfirstColor(){
            $('.' + this.css.x).css("color", this.options.firstColor);
        },

        _applysecondColor: function () {
            $('.' + this.css.o).css("color", this.options.secondColor);
        },

        _startGame: function () {
            var self = this;
            var gameEnded = false;
            var self = this;
            $('.'+this.css.cell).one('click', function (event) {  
                var count = 1;
                var turn = 0;           //human = 'x'   comp = 'o'
                if (turn == 0) {
                    var humanX = $('<span></span>')
                        .addClass(self.css.x)
                        .appendTo(this);  //human score
                    self._applyfirstColor();
                    self._setFirstPlayerIndex();
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
                    if (arrElements[p] == undefined && (arrElements[p + 3] == arrElements[p + 6] && arrElements[p + 3] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);  
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 3] == arrElements[p + 6] && arrElements[p + 3] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p >= 3 && p < 6) {   //check vertical for second row
                    if (arrElements[p] == undefined && (arrElements[p + 3] == arrElements[p - 3] && arrElements[p + 3] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 3] == arrElements[p - 3] && arrElements[p + 3] == self.options.firstPlayer)) {
                        $('<span></span>')
                         .addClass(self.css.o)
                         .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p >= 6 && p < 9) {    //check vertical for third row
                    if (arrElements[p] == undefined && (arrElements[p - 3] == arrElements[p - 6] && arrElements[p - 3] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 3] == arrElements[p - 6] && arrElements[p - 3] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0
                        flag = false;
                        return;
                    }
                }

                if (p == 1 || p == 4 || p == 7) {     //check horizontal for seond column
                    if (arrElements[p] == undefined && (arrElements[p - 1] == arrElements[p + 1] && arrElements[p - 1] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 1] == arrElements[p + 1] && arrElements[p - 1] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                if (p == 2 || p == 5 || p == 8) {      //check horizontal for third column
                    if (arrElements[p] == undefined && (arrElements[p - 1] == arrElements[p - 2] && arrElements[p - 1] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 1] == arrElements[p - 2] && arrElements[p - 1] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 0 || p == 3 || p == 6) {      //check horizontal for first column
                    if (arrElements[p] == undefined && (arrElements[p + 1] == arrElements[p + 2] && arrElements[p + 1] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 1] == arrElements[p + 2] && arrElements[p + 1] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                //check for diagonals
                if (p == 0) {
                    if (arrElements[p] == undefined && (arrElements[p + 4] == arrElements[p + 8] && arrElements[p + 4] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 4] == arrElements[p + 8] && arrElements[p + 4] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 2) {
                    if (arrElements[p] == undefined && (arrElements[p + 2] == arrElements[p + 4] && arrElements[p + 2] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p + 2] == arrElements[p + 4] && arrElements[p + 2] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 4) {
                    if (arrElements[p] == undefined && ((arrElements[p + 2] == arrElements[p - 2] && arrElements[p - 2] == self.options.secondPlayer) || (arrElements[p + 4] == arrElements[p - 4] && arrElements[p - 4] == self.options.secondPlayer))) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && ((arrElements[p + 2] == arrElements[p - 2] && arrElements[p - 2] == self.options.firstPlayer) || (arrElements[p + 4] == arrElements[p - 4] && arrElements[p - 4] == self.options.firstPlayer))) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 6) {
                    if (arrElements[p] == undefined && (arrElements[p - 2] == arrElements[p - 4] && arrElements[p - 2] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 2] == arrElements[p - 4] && arrElements[p - 2] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p == 8) {
                    if (arrElements[p] == undefined && (arrElements[p - 4] == arrElements[p - 8] && arrElements[p - 4] == self.options.secondPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrElements[p] == undefined && (arrElements[p - 4] == arrElements[p - 8] && arrElements[p - 4] == self.options.firstPlayer)) {
                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c' + p);
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
            }

            if (flag) {
                if (arrElements[0] == undefined) {
                    $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c0');
                    self._applysecondColor();
                    self._setSecondPlayerIndex();
                    turn = 0;
                    return;
                }
                else {
                    if (arrElements[3] == undefined) {
                        $('<span></span>')
                         .addClass(self.css.o)
                         .appendTo("#c3");
                        self._applysecondColor();
                        self._setSecondPlayerIndex();
                        turn = 0;
                        return;
                    }
                    else {
                        if (arrElements[4] == undefined) {
                            $('<span></span>')
                         .addClass(self.css.o)
                         .appendTo('#c4');
                            self._applysecondColor();
                            self._setSecondPlayerIndex();
                            turn = 0;
                            return;
                        }
                        else {
                            if (arrElements[7] == undefined) {
                                $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c7');
                                self._applysecondColor();
                                self._setSecondPlayerIndex();
                                turn = 0;
                                return;
                            }
                            else {
                                if (arrElements[8] == undefined) {
                                    $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c8');
                                    self._applysecondColor();
                                    self._setSecondPlayerIndex();
                                    turn = 0;
                                    return;
                                }
                                else {
                                    if (arrElements[5] == undefined) {
                                        $('<span></span>')
                        .addClass(self.css.o)
                        .appendTo('#c5');
                                        self._applysecondColor();
                                        self._setSecondPlayerIndex();
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
                    if (arrElements[u] == arrElements[u + 3] && arrElements[u] == arrElements[u + 6] && arrElements[u] == this.options.firstPlayer) {
                        gameEnded = true;
                        alert('You win!');
                        return gameEnded;

                    }
                    else if (arrElements[u] == arrElements[u + 3] && arrElements[u] == arrElements[u + 6] && arrElements[u] == this.options.secondPlayer) {
                        gameEnded = true;
                        alert('You lose!');
                        return gameEnded;
                    }
                }

                //horizontal
                for (var h = 0; h < 6; h = h + 3) {
                    if (arrElements[h] == arrElements[h + 1] && arrElements[h] == arrElements[h + 2] && arrElements[h] == this.options.firstPlayer) {
                        gameEnded = true;
                        alert('You win!');
                        return gameEnded;

                    }
                    else if (arrElements[h] == arrElements[h + 1] && arrElements[h] == arrElements[h + 2] && arrElements[h] == this.options.secondPlayer) {
                        gameEnded = true;
                        alert('You lose!');
                        return gameEnded;

                    }
                }
                //diagonals
                for (var g = 0; g < 9; g = g + 4) {
                    if (arrElements[g] == arrElements[g + 4] && arrElements[g] == arrElements[g + 8] && arrElements[g] == this.options.firstPlayer) {
                        gameEnded = true;
                        alert('You win!');
                        return gameEnded;

                    }
                    else if (arrElements[g] == arrElements[g + 4] && arrElements[g] == arrElements[g + 8] && arrElements[g] == this.options.secondPlayer) {
                        gameEnded = true;
                        alert('You lose!');
                        return gameEnded;

                    }
                }

                for (var b = 2; b < 7; b = b + 2) {
                    if (arrElements[b] == arrElements[b + 2] && arrElements[b] == arrElements[b + 4] && arrElements[b] == this.options.firstPlayer) {
                        gameEnded = true;
                        alert('You win!');
                        return gameEnded;

                    }
                    else if (arrElements[b] == arrElements[b + 2] && arrElements[b] == arrElements[b + 4] && arrElements[b] == this.options.secondPlayer) {
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