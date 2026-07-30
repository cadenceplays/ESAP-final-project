

function is_win(board){

    //horizontal 
    if ((board[0][0] == board[0][1]) &&
        (board[0][1] == board[0][2]) && 
        (board[0][0] != "_")){

        return true;
    }
    if ((board[1][0] == board[1][1]) &&
        (board[1][1] == board[1][2]) && 
        (board[1][0] != "_")){
        
        return true;
    }
    if ((board[2][0] == board[2][1]) &&
        (board[2][1] == board[2][2]) && 
        (board[2][0] != "_")){
        
        return true;
    }
    //vertical
    if ((board[0][0] == board[1][0]) &&
        (board[1][0] == board[2][0]) && 
        (board[0][0] != "_")){

        return true;
    }
    if ((board[0][1] == board[1][1]) &&
        (board[1][1] == board[2][1]) && 
        (board[0][1] != "_")){

        return true;
    }
    if ((board[0][2] == board[1][2]) &&
        (board[1][2] == board[2][2]) && 
        (board[0][2] != "_")){

        return true;
    }
    if ((board[0][0] == board[1][0]) &&
        (board[1][0] == board[2][0]) && 
        (board[0][0] != "_")){

        return true;
    }
    //diagonal 
    if ((board[0][0] == board[1][1]) &&
        (board[1][1] == board[2][2]) && 
        (board[0][0] != "_")){

        return true;
    }
    if ((board[0][2] == board[1][1]) &&
        (board[1][1] == board[2][0]) && 
        (board[0][2] != "_")){

        return true;
    }
    return false;
}
function is_draw(board){
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if (board[i][j] == "_"){
                return false
            }
        }
    }
    return true
} 
function is_empty(board,location){
    const row = location[0];
    const col = location[1];
    if (board[row][col] == "_"){
        return true
    }
    return false
}
function play_move(board, player, move){
    const row = move[0];
    const col = move[1];
    board[row][col] = player
    if(player == "O"){
        return "X"
    }
    return "O"
}
function get_moves(board){
    /*
    returns a list of possible moves 
    */
   let moves = []
   for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if (board[i][j] == "_"){
                const coord = [i,j]
                moves.push(coord)
            }
        }
    }
    return moves
}

export function renderStage10(container,nextStage, startGame) {
    /*
    Main game loop for tic tac toe
    */
    let board = [["_","_","_"],["_","_","_"],["_","_","_"]];
    const turn = "X"; //player 1 is true, player 2 is false

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <p>solve the following problem:</p>
        <div style="font-size: 20px; font-weight: bold; margin: 15px 0;">
            ${selectedQuestion.problem}
        </div>
        <input type="text" id="math-input" placeholder="answer...">
        <button id="math-submit-btn">submit</button>
    `;

    container.appendChild(wrapper);

    const submitBtn = document.getElementById('math-submit-btn')

    submitBtn.addEventListener('click', () => {
        const userInput = document.getElementById('math-input').value.trim();

        if (userInput === selectedQuestion.answer){
            nextStage();
        } else {
            alert(`nope! sorry clanker`);
            nextStage(true);
        }
    });
}

