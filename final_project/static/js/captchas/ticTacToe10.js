
/**
 * Takes in a board state and checks for a winner 
 * 
 *  @param {String[][]} array - the current board
 *  @returns {String} the winner, if there is non returns "_"
 * 
 */
function find_winner(board){

    //horizontal 
    if ((board[0][0] == board[0][1]) &&
        (board[0][1] == board[0][2]) && 
        (board[0][0] != "_")){
        console.log("horiz win")
        return board[0][0];
    }
    if ((board[1][0] == board[1][1]) &&
        (board[1][1] == board[1][2]) && 
        (board[1][0] != "_")){
        console.log("horiz win")
        return board[1][0];
    }
    if ((board[2][0] == board[2][1]) &&
        (board[2][1] == board[2][2]) && 
        (board[2][0] != "_")){
        console.log("horiz win")
        return board[2][0];
    }
    //vertical
    if ((board[0][0] == board[1][0]) &&
        (board[1][0] == board[2][0]) && 
        (board[0][0] != "_")){
        console.log("vert win")
        return board[0][0];
    }
    if ((board[0][1] == board[1][1]) &&
        (board[1][1] == board[2][1]) && 
        (board[0][1] != "_")){

        return board[0][1];
    }
    if ((board[0][2] == board[1][2]) &&
        (board[1][2] == board[2][2]) && 
        (board[0][2] != "_")){
        console.log("vert win")
        return board[0][2];
    }
    //diagonal 
    if ((board[0][0] == board[1][1]) &&
        (board[1][1] == board[2][2]) && 
        (board[0][0] != "_")){
        console.log("diag win")
        return board[0][0];
    }
    if ((board[0][2] == board[1][1]) &&
        (board[1][1] == board[2][0]) && 
        (board[0][2] != "_")){
        console.log("diag win")
        return board[0][2];
    }
    return "_"; // means no winner was found
}
/**
 * Takes in a board state and checks if the board is full
 * 
 *  @param {String[][]} array - the current board
 *  @returns {boolean} returns true if the board is full, false otherwise
 * 
 */
function is_draw(board){
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if (board[i][j] == "_"){
                return false;
            }
        }
    }
    return true;
} 
/**
 * Takes in a board state and checks if the game is over
 * 
 *  @param {String[][]} array - the current board
 *  @returns {boolean} returns true if the game is over, false otherwise 
 * 
 */
function is_end(board){
    return (is_draw(board) || (find_winner(board) != "_"));
}

/**
 * Takes in a board state and a locationa and checks if the square is empty
 * 
 *  @param {String[][]} array - the current board
 *  @param {int[]} location - the location being checked
 *  @returns {boolean} returns true if the square is empty, otherwise returns false 
 * 
 */
function is_empty(board,location){
    const row = location[0];
    const col = location[1];
    if (board[row][col] == "_"){
        return true;
    }
    return false;
}

/**
 * Takes in a board state a player, and a location to place a peice and places it
 * does not check if move is valid, does not update player
 * 
 *  @param {String[][]} array - the current board
 *  @param {string} player - the current player
 *  @param {number[]} move - location where move is played 
 * 
 */
function play_move(board, player, move){
    const row = move[0];
    const col = move[1];
    board[row][col] = player;
}
/**
 * Takes in a board state and returns all possible moves
 * 
 *  @param {String[][]} array - the current board
 *  @returns {number[][]} a list of all the current board squares 
 * 
 */
function get_moves(board){
   let moves = []
   for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if (board[i][j] == "_"){
                const coord = [i,j];
                moves.push(coord);
            }
        }
    }
    return moves
}
/**
 * Takes in a board state and makes a move
 * Chooses the first possible move
 * 
 *  @param {String[][]} array - the current board
 *  @param {String} player - the current player
 *  @returns {number[]} returns the move the bot wants to make
 * 
 */
function tttBot(board, player){
    console.log("ttt bot move")
    const moves = get_moves(board);
    const move = moves[0];
    play_move(board, player, move);
    return move;
}
/**
 * Main render function, renders the board 
 * 
 *  @param {HTMLElement} container- where the captcah is creates
 *  @param {Function} nextStage - function that moves on to the next stage
 *  @param {Function} failGame - function that restarts if the player messes up
 * 
 */
export function renderStage10(container,nextStage, failGame) {
    let board = [["_","_","_"],["_","_","_"],["_","_","_"]];
    let turn = "X"; //player 1 is X, player 2 is O

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>Tic Tac Toe:</p>
        <button class = "ticTacToe" id="ttt(0,0)">_</button>
        <button class = "ticTacToe" id="ttt(0,1)">_</button>
        <button class = "ticTacToe" id="ttt(0,2)">_</button>
        <br>
        <button class = "ticTacToe" id="ttt(1,0)">_</button>
        <button class = "ticTacToe" id="ttt(1,1)">_</button>
        <button class = "ticTacToe" id="ttt(1,2)">_</button>
        <br>
        <button class = "ticTacToe" id="ttt(2,0)">_</button>
        <button class = "ticTacToe" id="ttt(2,1)">_</button>
        <button class = "ticTacToe" id="ttt(2,2)">_</button>
    `;

    container.appendChild(wrapper);

    //gets all the buttons
    const ttt1 = document.getElementById('ttt(0,0)');
    const ttt2 = document.getElementById('ttt(0,1)');
    const ttt3 = document.getElementById('ttt(0,2)');
    const ttt4 = document.getElementById('ttt(1,0)');
    const ttt5 = document.getElementById('ttt(1,1)');
    const ttt6 = document.getElementById('ttt(1,2)');
    const ttt7 = document.getElementById('ttt(2,0)');
    const ttt8 = document.getElementById('ttt(2,1)');
    const ttt9 = document.getElementById('ttt(2,2)');
    const buttons = [ttt1,ttt2,ttt3,ttt4,ttt5,ttt6,ttt7,ttt8,ttt9];
    const coords = get_moves(board);

    console.log(
        board[0].join(" ") + "\n" +
        board[1].join(" ") + "\n" +
        board[2].join(" ")
    );

    // sets up the buttons
    for(let i = 0; i<9; i++){
        buttons[i].addEventListener('click', () => {
            //checks if the move is valid 
            if(is_empty(board,coords[i])){
                buttons[i].textContent = "X";
                turn = "X";
                play_move(board,turn,coords[i]);
                turn ="O";
                let move = tttBot(board,turn)
                buttons[move[0]*3+move[1]].textContent = "O"
            }

            console.log(
                board[0].join(" ") + "\n" +
                board[1].join(" ") + "\n" +
                board[2].join(" ")
            );

            //checks if the game is over
            if(is_end(board) == true){
                if(find_winner(board) == "X"){
                    nextStage();
                    console.log("player win")
                }
                else{
                    failGame();
                    console.log("player loss")
                }
            }

        });
    }
    


}

