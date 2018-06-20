let board = [ "1" ,  "2"  , "3"  ,
              "4" ,  "5"  , "6"  ,
              "7" ,  "8"  , "9"  ]

function printBoard(bot, channelID) 
{
    let boardToPrint = "";
    let a = 0;
    for (let spot = 0; spot < board.length / 3; spot++)
    {
        for (let i = 1; i < 12; ++i)
        {
            if (i % 4 == 0)
            {
                boardToPrint += "|";
            }
            else if (i % 2 == 0) {
                boardToPrint += board[a];
                ++a;
            }
            else {
                boardToPrint += " ";
            }
        }
        boardToPrint += "\n----------\n";
    }
    console.log("a");
    bot.sendMessage({
        to: channelID,
        message: `${boardToPrint}`
    });
}

function makeMoveUser(bot, message, channelID) 
{
    let slot = parseInt(message, 10) - 1;
    if (message == board[slot])
    {
        board[slot] = 'X';
    }
    else {
        bot.sendMessage({
            to: channelID,
            message: `You cannot move in spot ${message}. Pick another location.`
        });
    }
    console.log("done moving");
    makeMoveAI(bot, message, channelID);
}

function makeMoveAI(bot, channelID)
{
    console.log("moving ai");
    let spot = Math.floor(Math.random() * board.length);
    let count = 0;
    while (count < 100 && board[spot] == 'X' || board[spot] == 'O') 
    {
        spot = Math.floor(Math.random() * board.length);
        ++count;
    }
    if (count >= 100)
    {
        findWinner(bot, channelID);
    }
    else {
        board[spot] = 'O';
    }
}

function findWinner(bot, channelID, user)
{       
    if ((board[0] == user &&
        board[1] == user &&
        board[2] == user) // top row
         ||
        (board[3] == user &&
        board[4] == user &&
        board[5] == user) // middle row
        ||
        (board[6] == user &&
        board[7] == user &&
        board[8] == user) // bottom row
        || 
        (board[0] == user &&
        board[4] == user &&
        board[8] == user) // top left to bottom right
        ||
        (board[0] == user &&
        board[3] == user &&
        board[6] == user) // first column
        || 
        (board[1] == user &&
        board[4] == user &&
        board[7] == user) // second column
        ||
        (board[2] == user &&
        board[5] == user &&
        board[8] == user) // third column
        ||
        (board[2] == user &&
        board[4] == user &&
        board[6] == user)) // top right to bottom left
    {
        return user;
    }
    else return false;
}

function resetBoard()
{
    board = [ "1" , "2" , "3" ,
              "4" , "5" , "6" ,
              "7" , "8" , "9" ]
}

module.exports = {
    printBoard, 
    makeMoveUser,
    resetBoard,
    findWinner
}