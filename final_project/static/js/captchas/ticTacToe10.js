

function find_winner(board){

    //horizontal 
    if ((board[0][0] == board[0][1]) &&
        (board[0][1] == board[0][2]) && 
        (board[0][0] != "_")){

        return board[0][0];
    }
    if ((board[1][0] == board[1][1]) &&
        (board[1][1] == board[1][2]) && 
        (board[1][0] != "_")){
        
        return board[0][0];
    }
    if ((board[2][0] == board[2][1]) &&
        (board[2][1] == board[2][2]) && 
        (board[2][0] != "_")){
        
        return board[0][0];
    }
    //vertical
    if ((board[0][0] == board[1][0]) &&
        (board[1][0] == board[2][0]) && 
        (board[0][0] != "_")){

        return board[0][0];
    }
    if ((board[0][1] == board[1][1]) &&
        (board[1][1] == board[2][1]) && 
        (board[0][1] != "_")){

        return board[0][0];
    }
    if ((board[0][2] == board[1][2]) &&
        (board[1][2] == board[2][2]) && 
        (board[0][2] != "_")){

        return board[0][0];
    }
    if ((board[0][0] == board[1][0]) &&
        (board[1][0] == board[2][0]) && 
        (board[0][0] != "_")){

        return board[0][0];
    }
    //diagonal 
    if ((board[0][0] == board[1][1]) &&
        (board[1][1] == board[2][2]) && 
        (board[0][0] != "_")){

        return board[0][0];
    }
    if ((board[0][2] == board[1][1]) &&
        (board[1][1] == board[2][0]) && 
        (board[0][2] != "_")){

        return board[0][0];
    }
    return "_"; // means no winner was found
}
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
function is_end(board){
    return (is_draw(board) || (find_winner != "_"));
}
function is_empty(board,location){
    const row = location[0];
    const col = location[1];
    if (board[row][col] == "_"){
        return true;
    }
    return false;
}
function play_move(board, player, move){
    const row = move[0];
    const col = move[1];
    board[row][col] = player;
    if(player == "O"){
        return "X";
    }
    return "O";
}
function get_moves(board){
    /*
    returns a list of possible moves 
    */
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
function tttBot(board, player){
    const moves = get_moves(board);
    const move = moves[0];
    play_move(board, player, move);
}

export function renderStage10(container,nextStage, startGame) {
    /*
    Main game loop for tic tac toe
    */
    let board = [["_","_","_"],["_","_","_"],["_","_","_"]];
    let turn = "X"; //player 1 is X, player 2 is O

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>Tic Tac Toe:</p>
        <button class = "ticTacToe" id="ttt(0,0)"></button>
        <button class = "ticTacToe" id="ttt(0,1)"></button>
        <button class = "ticTacToe" id="ttt(0,2)"></button>
        <br>
        <button class = "ticTacToe" id="ttt(1,0)"></button>
        <button class = "ticTacToe" id="ttt(1,1)"></button>
        <button class = "ticTacToe" id="ttt(1,2)"></button>
        <br>
        <button class = "ticTacToe" id="ttt(2,0)"></button>
        <button class = "ticTacToe" id="ttt(2,1)"></button>
        <button class = "ticTacToe" id="ttt(2,2)"></button>
    `;

    container.appendChild(wrapper);

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
    
    for(let i = 0; i<9; i++){
        buttons[i].addEventListener('click', () => {
            if(is_empty(board,coords[i])){
                play_move(board,turn,cooords[i])
                tttBot(board,turn)
            }

        });
    }
    if(is_end() == true){
        if(find_winner == "X"){
            nextStage();
        }
        else{
            nextStage(true)
        }
    }


}

