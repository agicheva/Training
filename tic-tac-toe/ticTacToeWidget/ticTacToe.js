(function ($) {
    $.widget("ui.ticTacToe", {
        vars: {
            _arrayCells: []
        },

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
            secondPlayer: 'o',
            /*type="bool Allow setting start button to the widget." */
            enableStartButton: false,
            /*type="bool Allow setting reset button to the widget." */
            enableResetButton: false
        },

        css: {
            /* Class applied to the td element in the table. */
            cell: "tic-tac-toe-tableCell",
            /* Class applied to the index of the first player. */
            firstPlayer: "x",
            /* Class applied to the index of the second player. */
            secondPlayer: "o",
            /* Class applied to the dialog shown at the end of the game. */
            dialog: "tic-tac-toe-dialog",
            /* Class applied to the tr element in the table. */
            row: "tic-tac-toe-tableRow",
            /* Class applied to the table element. */
            table: "tic-tac-toe"
        },

        events: {
            /* ticTacToe events go here */

            /* cancel="true"  Event which is raised before rendering of the ticTacToe widget completes. */
            rendering: "rendering",
            /* cancel="false"  Event which is raised after rendering of the ticTacToe widget completes. */
            rendered: "rendered",
            /* cancel="false" Event which is raised on click of start button. */
            gameStarted: "gameStarted",
            /* cancel="true" Event which is raised before click of start button. */
            gameStarting: "gameStarting",
            /* cancel="false" Event which is raised on click of reset button. */
            gameEnded: "gameEnded",
            /*cancel="true" Event which is raised before the game is ended. */
            gameEnding: "gameEnding",
            /*cancel="false" Event which is raised after cell is rendered. */
            cellRendered: "cellRendered",
            /*cancel="true" Event which is raised before cell is rendered. */
            cellRendering: "cellRendering"
        },

        _create: function () {
            /* tocTacToe widget constructor goes here */
            if (this.options.enableStartButton) {
                this._renderStartButton();
            }
            if (this.options.enableResetButton) {
                this._renderResetButton();
            }
            else {
                this._render();
            }
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
            return this._trigger(this.events.gameStarted, null, args);
        }, 

        _triggerGameStarting: function () {
            var args = {
                element: this.element,
                owner: this
            };

            return this._trigger(this.events.gameStarting, null, args);
        },

        _triggerGameEnded: function(){
            var args = {
                element: this.element,
                owner: this
            };
            return this._trigger(this.events.gameEnded, null, args);
        },
        
        _triggerGameEnding: function(){
            var args = {
                element: this.element,
                owner: this
            };
            return this._trigger(this.events.gameEnding, null, args);
        },

        _trigerCellRendered: function(){
            var args = {
                element: this.element,
                owner: this
            };
            return this._trigger(this.events.cellRendered, null, args);
        },

        _triggerCellRendering: function(){
            var args = {
                element: this.element.children().children().children(),
                owner: this
            };
            return this._trigger(this.events.cellRendering, null, args);
        },

        _renderStartButton: function () {
            this.btnStart = $("<button>", {
                text: "Start",
                type: "start"
            }).addClass("start").appendTo(this.element).button();
            this._attachButtonsEvents("start", this.btnStart);
        },

        _renderResetButton: function(){
            this.btnReset = $("<button>", {
                text: "Reset",
                type: "reset"
            }).addClass("reset").appendTo(this.element).button();
            this._attachButtonsEvents("reset", this.btnReset);
        },

        _attachButtonsEvents: function(type, target){
            var self = this;
            if (!target) {
                return;
            }
            target.on({
                "click.button": function (event) {
                    self._triggerButtonClick(event, type);
                }
            })
        },
        
        _triggerButtonClick: function (event, buttonType) {
            if (buttonType) {
                switch (buttonType) {
                    case "start": {
                        var isGameStarting = this._triggerGameStarting();
                        if (isGameStarting) {
                            this._triggerGameStarted();
                        }
                    }
                        break;
                    case "reset": {
                        var isGameEnding = this._triggerGameEnding();
                        for (var i = 0; i < 9; i++) {
                            this.vars._arrayCells[i].children().remove();
                        }
                        if (isGameEnding) {
                            this._triggerGameEnded(this.vars._arrayCells);
                        }
                    }
                        break;
                }
            }
        },

        destroy: function(){
            this._detachEvents();

            $.Widget.prototype.destroy.apply(this, arguments);
        },

        _render: function () {
            var self = this;
            var gameEnded = false;
            var arrayCells = [];
            var isRendering = this._triggerRendering();
            if (isRendering) {
                var table = $('<table></table>');
                table.addClass(this.css.table)
                    .height(this.options.height)
                    .width(this.options.width);
                $(this.element).append(table);
                this._applyBackgroundColor(table);
                for (var i = 0; i < 3; i++) {
                    var row = $('<tr></tr>').addClass(this.css.row);
                    row.appendTo(table);
                    this._triggerCellRendering();
                    for (var j = 0; j < 3; j++) {
                        var cell = $('<td></td>')      
                            .addClass(this.css.cell)
                            .appendTo(row)
                            .on("click", function () {
                                self._makeMoves(this, gameEnded, arrayCells);
                            });
                        arrayCells.push(cell);
                    }
                    this._triggerRendered();
                }
            }
            this.vars._arrayCells = arrayCells;
        },
        
        _makeMoves: function(element, gameEnded, arrayCells){
            var turn = 0;
            if (turn === 0) {
                var span = $('<span></span>').addClass(this.css.firstPlayer);
                $(element).append(span);
                this._setFirstPlayerIndex(span);
                this._applyfirstColor(span);
                gameEnded = this.checkWin(gameEnded, arrayCells);
                turn = 1;
                if (gameEnded) {
                    return;
                }

                if (!gameEnded && turn === 1) {
                    this.compMove(turn, gameEnded, arrayCells);
                    this.checkWin(gameEnded, arrayCells);
                    turn = 0;
                }
            }
        },      

        _setOption: function (option, value) {
            var self = this;
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
                    if (this.options.firstPlayer !== this.options.secondPlayer) {
                        this._setSecondPlayerIndex(value);
                    } else {
                        this.options.secondPlayer = prevValue;
                    }
                    break;
                case "backgroundColor":
                    this._setBackgroundColor(value);
                    break;
			    case "enableStartButton":
			        this._setStartButton(value);
			        break;
			    case "enableResetButton":
			        this._setResetButton(value);
			        break;
				default:
					break;
			}
        },
        
        _setStartButton: function(value){
            this.options.enableStartButton = value;
        },

        _setResetButton: function(value){
            this.options.enableResetButton = value;
        },

        _setWidth: function(value){
            this.element.css('width', value);
        },

         _setHeight: function(value){
             this.element.css('height', value);
        },

        _setfirstColor: function(value){
            this.options.firstColor = value;
            this._applyfirstColor();
        },

        _setsecondColor: function (value) {
            this.options.secondColor = value;
            this._applysecondColor();
        },

        _setFirstPlayerIndex: function (appendSpan) {
            $(appendSpan).html(this.options.firstPlayer);
        },

        _setSecondPlayerIndex: function (appendSpan) {
            $(appendSpan).html(this.options.secondPlayer);
        },

        _applyfirstColor(appendSpan){
            $(appendSpan).css("color", this.options.firstColor);
        },

        _applysecondColor: function (appendSpan) {
            $(appendSpan).css("color", this.options.secondColor);
        },

        _setBackgroundColor: function(value){
            this.options.backgroundColor = value;
        },

        _applyBackgroundColor: function(element)
        {
            $(element).css("backgroundColor", this.options.backgroundColor);
        },

        _detachEvents: function () {
            for (var i = 0; i < 9; i++) {
                $(this.vars._arrayCells[i]).off('click');
            }
        },

        compMove: function (turn, gameEnded, arrayCells) {
            var flag = true;
            var self = this;
            for (var p = 0; p < 9; p++) {
                if (p >= 0 && p < 3) {    //check vertical for first row
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p + 3].children().html() === arrayCells[p + 6].children().html() && arrayCells[p + 3].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p + 3].children().html() === arrayCells[p + 6].children().html() && arrayCells[p + 3].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p >= 3 && p < 6) {   //check vertical for second row
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p + 3].children().html() === arrayCells[p - 3].children().html() && arrayCells[p + 3].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p + 3].children().html() === arrayCells[p - 3].children().html() && arrayCells[p + 3].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p >= 6 && p < 9) {    //check vertical for third row
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p - 3].children().html() === arrayCells[p - 6].children().html() && arrayCells[p - 3].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p - 3].children().html() === arrayCells[p - 6].children().html() && arrayCells[p - 3].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0
                        flag = false;
                        return;
                    }
                }

                if (p === 1 || p === 4 || p === 7) {     //check horizontal for seond column
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p - 1].children().html() === arrayCells[p + 1].children().html() && arrayCells[p - 1].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p - 1].children().html() === arrayCells[p + 1].children().html() && arrayCells[p - 1].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                if (p === 2 || p === 5 || p === 8) {      //check horizontal for third column
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p - 1].children().html() === arrayCells[p - 2].children().html() && arrayCells[p - 1].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p - 1].children().html() === arrayCells[p - 2].children().html() && arrayCells[p - 1].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                                                                                                                                  
                if (p === 0 || p === 3 || p === 6) {      //check horizontal for first column
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p + 1].children().html() === arrayCells[p + 2].children().html() && arrayCells[p + 1].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p + 1].children().html() === arrayCells[p + 2].children().html() && arrayCells[p + 1].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                //check for diagonals
                if (p === 0) {
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p + 4].children().html() === arrayCells[p + 8].children().html() && arrayCells[p + 4].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p + 4].children().html() === arrayCells[p + 8].children().html() && arrayCells[p + 4].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p === 2) {
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p + 2].children().html() === arrayCells[p + 4].children().html() && arrayCells[p + 2].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p + 2].children().html() === arrayCells[p + 4].children().html() && arrayCells[p + 2].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p === 4) {
                    if (arrayCells[p].children().html() === undefined && ((arrayCells[p + 2].children().html() === arrayCells[p - 2].children().html() && arrayCells[p - 2].children().html() === self.options.secondPlayer) || (arrayCells[p + 4].children().html() === arrayCells[p - 4].children().html() && arrayCells[p - 4].children().html() === self.options.secondPlayer))) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && ((arrayCells[p + 2].children().html() === arrayCells[p - 2].children().html() && arrayCells[p - 2].children().html() === self.options.firstPlayer) || (arrayCells[p + 4].children().html() === arrayCells[p - 4].children().html() && arrayCells[p - 4].children().html() === self.options.firstPlayer))) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p === 6) {
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p - 2].children().html() === arrayCells[p - 4].children().html() && arrayCells[p - 2].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p - 2].children().html() === arrayCells[p - 4].children().html() && arrayCells[p - 2].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if (p === 8) {
                    if (arrayCells[p].children().html() === undefined && (arrayCells[p - 4].children().html() === arrayCells[p - 8].children().html() && arrayCells[p - 4].children().html() === self.options.secondPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if (arrayCells[p].children().html() === undefined && (arrayCells[p - 4].children().html() === arrayCells[p - 8].children().html() && arrayCells[p - 4].children().html() === self.options.firstPlayer)) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[p]).append(span);
                        self._applysecondColor(span);
                        self._setSecondPlayerIndex(span);
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
            }
                                                                                                                                  
            if (flag) {
                if (arrayCells[0].children().html() === undefined) {
                    var span = $('<span></span>').addClass(self.css.secondPlayer);
                    $(arrayCells[0]).append(span);                
                    self._applysecondColor(span);
                    self._setSecondPlayerIndex(span);
                    turn = 0;
                    return;
                }
                else {
                    if (arrayCells[3].children().html() === undefined) {
                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                        $(arrayCells[3]).append(span);
                        self._setSecondPlayerIndex(span);
                        self._applysecondColor(span);
                        turn = 0;
                        return;
                    }
                    else {
                        if (arrayCells[4].children().html() === undefined) {
                            var span = $('<span></span>').addClass(self.css.secondPlayer);
                            $(arrayCells[4]).append(span);
                            self._applysecondColor(span);
                            self._setSecondPlayerIndex(span);
                            turn = 0;
                            return;
                        }
                        else {
                            if (arrayCells[7].children().html() === undefined) {
                                var span = $('<span></span>').addClass(self.css.secondPlayer);
                                $(arrayCells[7]).append(span);
                                self._applysecondColor(span);
                                self._setSecondPlayerIndex(span);
                                turn = 0;
                                return;
                            }
                            else {
                                if (arrayCells[8].children().html() === undefined) {
                                    var span = $('<span></span>').addClass(self.css.secondPlayer);
                                    $(arrayCells[8]).append(span);
                                    self._applysecondColor(span);
                                    self._setSecondPlayerIndex(span);
                                    turn = 0;
                                    return;
                                }
                                else {
                                    if (arrayCells[5].children().html() === undefined) {
                                        var span = $('<span></span>').addClass(self.css.secondPlayer);
                                        $(arrayCells[5]).append(span);
                                        self._applysecondColor(span);
                                        self._setSecondPlayerIndex(span);
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

        _alertGameEndFirstPlayerWin: function(){
            $('<div></div>')
                .addClass(this.css.dialog)
                .dialog({
                    title: "Result Dialog"
                });
            $('<p></p>').appendTo('.' + this.css.dialog)
            .html("Congrads you win!");
        },

        _alertGameEndSecondPlayerWin: function () {
            $('<div></div>')
                .addClass(this.css.dialog)
                .dialog({
                    title: "Result Dialog"
                });
            $('<p></p>').appendTo('.' + this.css.dialog)
            .html("Sorry, you lose!");
        },

        checkWin: function (gameEnded, arrayCells) {
            //var arrayCells = this._render();
            var arrayOfSpans = new Array();
            for (var t = 0; t < 9; t++) {
                var index = arrayCells[t].html();
                arrayOfSpans.push(index);
            } 
            if (jQuery.inArray("", arrayOfSpans) !== -1) {
                //vertical
                for (var u = 0; u <= 2; u++) {
                    if (arrayCells[u].children().html() === arrayCells[u + 3].children().html() && arrayCells[u].children().html() === arrayCells[u + 6].children().html() && arrayCells[u].children().html() === this.options.firstPlayer) {
                        gameEnded = true;
                        this._alertGameEndFirstPlayerWin();
                        return gameEnded;

                    }
                    else if (arrayCells[u].children().html() === arrayCells[u + 3].children().html() && arrayCells[u].children().html() === arrayCells[u + 6].children().html() && arrayCells[u].children().html() === this.options.secondPlayer) {
                        gameEnded = true;
                        this._alertGameEndSecondPlayerWin();
                        return gameEnded;
                    }
                }

                //horizontal
                for (var h = 0; h < 6; h = h + 3) {
                    if (arrayCells[h].children().html() === arrayCells[h + 1].children().html() && arrayCells[h].children().html() === arrayCells[h + 2].children().html() && arrayCells[h].children().html() === this.options.firstPlayer) {
                        gameEnded = true;
                        this._alertGameEndFirstPlayerWin();
                        return gameEnded;

                    }
                    else if (arrayCells[h].children().html() === arrayCells[h + 1].children().html() && arrayCells[h].children().html() === arrayCells[h + 2].children().html() && arrayCells[h].children().html() === this.options.secondPlayer) {
                        gameEnded = true;
                        this._alertGameEndSecondPlayerWin();
                        return gameEnded;

                    }
                }
                //diagonals

                if (arrayCells[0].children().html() === arrayCells[4].children().html() && arrayCells[0].children().html() === arrayCells[8].children().html() && arrayCells[0] === this.options.firstPlayer) {
                    gameEnded = true;
                    this._alertGameEndFirstPlayerWin();
                    return gameEnded;

                }
                else if (arrayCells[0].children().html() === arrayCells[4].children().html() && arrayCells[0].children().html() === arrayCells[8] && arrayCells[0].children().html() === this.options.secondPlayer) {
                    gameEnded = true;
                    this._alertGameEndSecondPlayerWin();
                    return gameEnded;

                }

                if (arrayCells[2].children().html() === arrayCells[4].children().html() && arrayCells[2].children().html() === arrayCells[6].children().html() && arrayCells[2].children().html() === this.options.firstPlayer) {
                    gameEnded = true;
                    this._alertGameEndFirstPlayerWin();
                    return gameEnded;

                }
                else if (arrayCells[2].children().html() === arrayCells[4].children().html() && arrayCells[2].children().html() === arrayCells[6].children().html() && arrayCells[2].children().html() === this.options.secondPlayer) {
                    gameEnded = true;
                    this._alertGameEndSecondPlayerWin();
                    return gameEnded;

                }
            }
            else {
                gameEnded = true;
                $('<div></div>')
                .addClass(this.css.dialog)
                .dialog({
                    title: "Result Dialog"
                });
                $('<p></p>').appendTo('.' + this.css.dialog)
                .html("It's a tie! Try again.");
                return gameEnded;
            }
        }
    });
}(jQuery));