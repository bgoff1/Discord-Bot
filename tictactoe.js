let board = [ "1" ,  "2"  , "3"  ,
              "4" ,  "5"  , "6"  ,
              "7" ,  "8"  , "9"  ]

function printBoard(bot, channelID) 
{
    let boardToPrint = "\n----------------------\n";
    let a = 0;
    for (let spot = 0; spot < board.length / 3; spot++)
    {
        for (let i = 0; i <= 12; ++i)
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
                boardToPrint += "\t";
            }
        }
        boardToPrint += "\n----------------------\n";
    }
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
    if (!findWinner('X', board))
        makeMoveAI();
}

function makeMoveAI()
{
    let spot;
    // if its the second move and the player went in the middle
    if (getMoveCount() == 1 && board[4] != '5')
    {
        let rand = Math.floor(Math.random() * 4) + 1;
        switch (rand)
        {
            case 1:
                spot = 0;
                board[0] = 'O';
                break;
            case 2:
                spot = 2;
                board[2] = 'O';
                break;
            case 3:
                spot = 6;
                board[6] = 'O';
                break;
            case 4:
                spot = 8;
                board[8] = 'O';
                break;
        }
    }
    else if (getMoveCount() == 1)
    {
        spot = 4;
        board[4]  = 'O';
    }
    else {
        for (let i = 0; i < board.length; i++)
        {
            if (board[i] == i + 1)
            {
                let boardToCheck = [];
                for (let t = 0; t < board.length; t++)
                {
                    boardToCheck[t] = board[t];
                }
                boardToCheck[i] = 'X';
                let isWinner = findWinner('X', boardToCheck);
                if (isWinner)
                {
                    spot = i;
                    board[i] = 'O';
                    break;
                }
            }
        }
    }
    if (!spot)
    {
        do {
            spot = Math.floor(Math.random() * board.length);
        } while (board[spot] != spot + 1);
        board[spot] = 'O';
    }
}

function getMoveCount()
{
    let result = 9;
    for (let i = 0; i < board.length; i++)
    {
        if (board[i] == i + 1)
        {
            --result;
        }
    }
    return result;
}

function findWinner(user, boardToCheck)
{
    if ((boardToCheck[0] == user &&
        boardToCheck[1] == user &&
        boardToCheck[2] == user) // top row
         ||
        (boardToCheck[3] == user &&
        boardToCheck[4] == user &&
        boardToCheck[5] == user) // middle row
        ||
        (boardToCheck[6] == user &&
        boardToCheck[7] == user &&
        boardToCheck[8] == user) // bottom row
        || 
        (boardToCheck[0] == user &&
        boardToCheck[4] == user &&
        boardToCheck[8] == user) // top left to bottom right
        ||
        (boardToCheck[0] == user &&
        boardToCheck[3] == user &&
        boardToCheck[6] == user) // first column
        || 
        (boardToCheck[1] == user &&
        boardToCheck[4] == user &&
        boardToCheck[7] == user) // second column
        ||
        (boardToCheck[2] == user &&
        boardToCheck[5] == user &&
        boardToCheck[8] == user) // third column
        ||
        (boardToCheck[2] == user &&
        boardToCheck[4] == user &&
        boardToCheck[6] == user)) // top right to bottom left
    {
        return true;
    }
    else 
    {
        return false;
    }
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
    findWinner,
    board
}