(function($){
$.widget("ui.ticTacToe",{      
        _create: function(){
            this._render();
            this._start();
        },
        _render: function(){
            var countCells = 0;
            var table = $('<table></table>').addClass('tic-tac-toe1');
            $('#divId').append(table);
            for(var i = 0; i < 3; i++){
                var row = $('<tr></tr>').addClass('row');
                row.appendTo(table);
                for(var j = 0; j < 3; j++)
                {
                    var cell = $('<td></td>', {id: "c" + countCells}).addClass("cell").appendTo(row);
                    countCells++;
                }    
            }         
        },
        _start: function(){
            var self = this;
            $('td').one('click', function(event){
                var count = 1, gameEnded = false, arrElements = new Array(9);
                var turn = 0;           //human = 'x'   comp = 'o'
                if (turn == 0) {
                    $(this).text('x');  //human score
                    self.boardCheck(arrElements);
                    self.checkWin(gameEnded, arrElements);
                    turn = 1;
                    self.compMove(count, turn, arrElements);
                    self.boardCheck(arrElements);
                    self.checkWin(gameEnded, arrElements);
                }
            });
        },
        boardCheck: function(arrElements){
            for(var i = 0; i < 9; i++)
                {
                    arrElements[i] = $('#c'+i).html();
                }
        },
        compMove: function(count, turn, arrElements){
            var flag = true;
            for(var p = 0; p < 9; p++){
                if(p >= 0 && p < 3){    //check vertical for first row
                    if(arrElements[p] == "" && (arrElements[p+3] == arrElements[p+6] && arrElements[p+3] == "o")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && (arrElements[p+3] == arrElements[p+6] && arrElements[p+3] == "x")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if(p >= 3 && p < 6){   //check vertical for second row
                    if(arrElements[p] == "" && (arrElements[p+3] == arrElements[p-3] && arrElements[p+3] == "o")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && (arrElements[p+3] == arrElements[p-3] && arrElements[p+3] == "x")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if(p >=6 && p < 9){    //check vertical for third row
                    if(arrElements[p] == "" && (arrElements[p-3] == arrElements[p-6] && arrElements[p-3] == "o")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && (arrElements[p-3] == arrElements[p-6] && arrElements[p-3] == "x")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if(p == 1 || p == 4 || p == 7){     //check horizontal for seond column
                    if(arrElements[p] == "" && (arrElements[p-1] == arrElements[p+1] && arrElements[p-1] == "o")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && (arrElements[p-1] == arrElements[p+1] && arrElements[p-1] == "x")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                if(p == 2 || p == 5 || p == 8){      //check horizontal for third column
                    if(arrElements[p] == "" && (arrElements[p-1] == arrElements[p-2] && arrElements[p-1] == "o")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && (arrElements[p-1] == arrElements[p-2] && arrElements[p-1] == "x")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if(p == 0 || p == 3 || p == 6){      //check horizontal for first column
                    if(arrElements[p] == "" && (arrElements[p+1] == arrElements[p+2] && arrElements[p+1] == "o")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && (arrElements[p+1] == arrElements[p+2] && arrElements[p+1] == "x")){  
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
                //check for diagonals
                if(p == 0){     
                    if(arrElements[p] == "" && (arrElements[p+4] == arrElements[p+8] && arrElements[p+4] == "o"))
                    {
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && (arrElements[p+4] == arrElements[p+8] && arrElements[p+4] == "x"))
                    {
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if(p == 2){
                    if(arrElements[p] ==  "" && (arrElements[p+2] == arrElements[p+4] && arrElements[p+2] == "o")){
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] ==  "" && (arrElements[p+2] == arrElements[p+4] && arrElements[p+2] == "x")){
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if(p == 4){
                    if(arrElements[p] == "" && ((arrElements[p+2] == arrElements[p-2] && arrElements[p-2] == "o") || (arrElements[p+4] == arrElements[p-4] && arrElements[p-4] == "o"))){
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && ((arrElements[p+2] == arrElements[p-2] && arrElements[p-2] == "x") || (arrElements[p+4] == arrElements[p-4] && arrElements[p-4] == "x"))){
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if(p == 6){
                    if(arrElements[p] ==  "" && (arrElements[p-2] == arrElements[p-4] && arrElements[p-2] == "o")){
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] ==  "" && (arrElements[p-2] == arrElements[p-4] && arrElements[p-2] == "x")){
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }

                if(p == 8){     
                    if(arrElements[p] == "" && (arrElements[p-4] == arrElements[p-8] && arrElements[p-4] == "o"))
                    {
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                    else if(arrElements[p] == "" && (arrElements[p-4] == arrElements[p-8] && arrElements[p-4] == "x"))
                    {
                        $('#c' + p).text("o");
                        turn = 0;
                        flag = false;
                        return;
                    }
                }
            }
        
            if(flag)
            {
                if(arrElements[0] == ""){
                    $('#c0').text("o");
                    turn = 0;
                }
                else{
                    if(arrElements[3] == ""){
                        $('#c3').text("o");
                        turn = 0;
                    }
                    else{
                        if(arrElements[4] == ""){
                            $('#c4').text("o");
                            turn = 0;
                        }
                        else{
                            if(arrElements[7] == ""){
                                $('#c7').text("o");
                                turn = 0;
                            }
                            else{
                                if(arrElements[8] == ""){
                                    $('#c8').text("o");
                                    turn = 0;
                                }
                            }
                        }
                    }
                }
            }
        },
        checkWin: function(gameEnded, arrElements){
            if (gameEnded) {
                return;
            }
            if (jQuery.inArray("", arrElements)!=-1) {
                //vertical
                for (var u = 0; u <= 2; u++) {
                    if (arrElements[u] == arrElements[u + 3] && arrElements[u] == arrElements[u + 6] && arrElements[u] == 'x') {
                        alert('You win!');
                        gameEnded = true;
                    }
                    else if (arrElements[u] == arrElements[u + 3] && arrElements[u] == arrElements[u + 6] && arrElements[u] == 'o') {
                        alert('You lose!');
                        gameEnded = true;
                    }
                }

                //horizontal
                for (var h = 0; h < 6; h = h + 3) {
                    if (arrElements[h] == arrElements[h + 1] && arrElements[h] == arrElements[h + 2] && arrElements[h] == 'x') {
                        alert('You win!');
                        gameEnded = true;
                    }
                    else if (arrElements[h] == arrElements[h + 1] && arrElements[h] == arrElements[h + 2] && arrElements[h] == 'o') {
                        alert('You lose!');
                        gameEnded = true;
                    }
                }
                //diagonals
                for(var g = 0; g < 9; g = g + 4){
                    if (arrElements[g] == arrElements[g + 4] && arrElements[g] == arrElements[g + 8] && arrElements[g] == 'x') {
                        alert('You win!');
                        gameEnded = true;
                    }
                    else if (arrElements[g] == arrElements[g + 4] && arrElements[g] == arrElements[g + 8] && arrElements[g] == 'o') {
                        alert('You lose!');
                        gameEnded = true;
                    }
                }

                for(var b = 2; b < 7; b = b + 2){
                    if (arrElements[b] == arrElements[b + 2] && arrElements[b] == arrElements[b + 4] && arrElements[b] == 'x') {
                        alert('You win!');
                        gameEnded = true;
                    }
                    else if (arrElements[b] == arrElements[b + 2] && arrElements[b] == arrElements[b + 4] && arrElements[b] == 'o') {
                        alert('You lose!');
                        gameEnded = true;
                    }
                }
            }
            else{
                alert("It's a tie!");
                gameEnded = true;
            }
        }
    });
} (jQuery));