//Restart buttton
let restart = document.getElementById("restart");
restart.addEventListener('click',()=>{
    Gameflow.restart()
})

//Player name change module
const initname = (()=>{
    var obscure = document.getElementById("obscure");
    var playermod = document.getElementById("playmod");
    var nameinput = document.getElementById("formsub");
    var play1 = document.getElementById("player1name");
    var play2 = document.getElementById("player2name");
    var play1display = document.getElementById("playernam1");
    var play2display = document.getElementById("playernam2");

    nameinput.addEventListener('click',(event)=>{
    if(play1.value != "" & play2.value != ""){
        Gameboard.Player1.name = play1.value;
        Gameboard.Player2.name = play2.value;
        event.preventDefault();
        obscure.style.opacity = 0;
        playermod.style.opacity = 0;
        
        setTimeout(function() {
            obscure.remove();
        }, 500);
        
        setTimeout(function() {
            playermod.remove();
        }, 500);
        Gameboard.changeplayerturn(Gameboard.currentplayer);
        play1display.textContent = play1.value;
        play2display.textContent = play2.value;
    }
    },500)
})()

//Player factory function
const playerFactory = (name,symbol) =>{
    return{name,symbol};
}

//Gameboard module
const Gameboard = (()=>{
    var State = ["","","","","","","","",""];
    var tiles = document.querySelectorAll(".tile");
    var Player1 = playerFactory("Player1","X");
    var Player2 = playerFactory("Player2","O");
    var currentplayer = Player1;
    var playturn = document.getElementById("playerturn");
    playturn.textContent = `It is ${currentplayer.name}'s turn.`;

    //function to get the State of the board
    var getstate = function(){
        State[0] = document.getElementById("A1").textContent;
        State[1] = document.getElementById("B1").textContent;
        State[2] = document.getElementById("C1").textContent;
        State[3] = document.getElementById("A2").textContent;
        State[4] = document.getElementById("B2").textContent;
        State[5] = document.getElementById("C2").textContent;
        State[6] = document.getElementById("A3").textContent;
        State[7] = document.getElementById("B3").textContent;
        State[8] = document.getElementById("C3").textContent;
    }

    //function to check if a tile is empty
    var checkempty = function(tileid){
        switch(tileid){
            case "A1": if(State[0] == ""){return("TRUE")} else{return("FALSE")}
            case "B1": if(State[1] == ""){return("TRUE")} else{return("FALSE")}
            case "C1": if(State[2] == ""){return("TRUE")} else{return("FALSE")}
            case "A2": if(State[3] == ""){return("TRUE")} else{return("FALSE")}
            case "B2": if(State[4] == ""){return("TRUE")} else{return("FALSE")}
            case "C2": if(State[5] == ""){return("TRUE")} else{return("FALSE")}
            case "A3": if(State[6] == ""){return("TRUE")} else{return("FALSE")}
            case "B3": if(State[7] == ""){return("TRUE")} else{return("FALSE")}
            case "C3": if(State[8] == ""){return("TRUE")} else{return("FALSE")}
        }
    }

    //function to update the State array
    var updatestate = function(tileid,symbol){
        switch(tileid){
            case "A1": State[0] = symbol; break;
            case "B1": State[1] = symbol; break;
            case "C1": State[2] = symbol; break;
            case "A2": State[3] = symbol; break;
            case "B2": State[4] = symbol; break;
            case "C2": State[5] = symbol; break;
            case "A3": State[6] = symbol; break;
            case "B3": State[7] = symbol; break;
            case "C3": State[8] = symbol; break;
        }
    }
    //function to check if a winning condition appeared
    var wincheck = function(state){
        const winningCombi = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
        ]
        var winningplayer = "";
        for (let i=0; i<winningCombi.length;i++){
            if(state[winningCombi[i][0]]===state[winningCombi[i][1]] && state[winningCombi[i][1]]===state[winningCombi[i][2]] && state[winningCombi[i][2]]!==""){
                switch(State[winningCombi[i][0]]){
                    case "X" : winningplayer = Gameboard.Player1.name; break;
                    case "O" : winningplayer = Gameboard.Player2.name; break;
                }
                var winningcase = winningCombi[i];
                var winq = "WIN";
                break;
            }
            else if(!state.includes("")){
                var winq = "DRAW";
                var winningplayer = "None";
                var winningcase = "None";
            }
            else{
                winningplayer = "None";
                winningcase = "None";
                winq = "FALSE";
            }
        }
        var winning = [winq,winningplayer,winningcase];
        return(winning)
    }

    //function to change the player turn message
    var changeplayerturn = function(currentplayer){
        var playturn = document.getElementById("playerturn");
        playturn.textContent = `It is ${currentplayer.name}'s turn.`;
    }

    tiles.forEach(function(tile){
        tile.addEventListener('click',()=>{
            Gameflow.mark(currentplayer,event.target.id)
        })
    })

    return{currentplayer,updatestate,getstate,State,Player1,Player2,
        checkempty,changeplayerturn,wincheck}
})()

//Gameflow module
const Gameflow = (()=>{
    var gameover = "FALSE";
    var changeplayer = function(player){
        if(player == Gameboard.Player1){
            Gameboard.currentplayer = Gameboard.Player2;
        }
        else{
            Gameboard.currentplayer = Gameboard.Player1;
        }
    }

    //Gameover function
    var overgame = function(wincom){
        wincom.forEach((val) => {
            switch(val){
                case 0: {
                    var inc = document.getElementById("A1");
                    inc.style.animation = "increase 2s infinite";
                    break;
                }
                case 1:  {
                    var inc = document.getElementById("B1");
                    inc.style.animation = "increase 2s infinite";
                    break;
                }
                case 2:{
                    var inc = document.getElementById("C1");
                    inc.style.animation = "increase 2s infinite";
                    break;
                }
                case 3:{
                    var inc = document.getElementById("A2");
                    inc.style.animation = "increase 2s infinite";
                    break;
                }
                case 4:{
                    var inc = document.getElementById("B2");
                    inc.style.animation = "increase 2s infinite";
                    break;
                }
                case 5:{
                    var inc = document.getElementById("C2");
                    inc.style.animation = "increase 2s infinite";
                    break;
                }
                case 6:{
                    var inc = document.getElementById("A3");
                    inc.style.animation = "increase 2s infinite";
                    break;
                }
                case 7:{
                    var inc = document.getElementById("B3");
                    inc.style.animation = "increase 2s infinite";
                    break;
                }
                case 8:{
                    var inc = document.getElementById("C3");
                    inc.style.animation = "increase 2s infinite";
                    break;
                } 
            }
        });
    }

    //function to add a mark to the board
    var mark = function(currentplayer,tileid){
            if(gameover !== "TRUE"){
            currentplayer = Gameboard.currentplayer;
            var tiletomark = document.getElementById(tileid);
            if(Gameboard.checkempty(tileid)== "TRUE"){
                if(currentplayer == Gameboard.Player1){
                    tiletomark.style.color = "#FEA1A1";
                }
                else{tiletomark.style.color= "#827ae7"}
                tiletomark.textContent = currentplayer.symbol;
                Gameboard.getstate();
                Gameboard.updatestate(tileid,currentplayer.symbol);
                Gameflow.changeplayer(currentplayer);
                Gameboard.changeplayerturn(Gameboard.currentplayer);

                if(Gameboard.wincheck(Gameboard.State)[0]=="WIN"){
                    var playturn = document.getElementById("playerturn");
                    playturn.textContent = `${Gameboard.wincheck(Gameboard.State)[1]} won!`;
                    gameover = "TRUE";
                    overgame(Gameboard.wincheck(Gameboard.State)[2]);
                }
                else if(Gameboard.wincheck(Gameboard.State)[0]=="DRAW"){
                    var playturn = document.getElementById("playerturn");
                    playturn.textContent = `It's a draw!`;
                    gameover = "TRUE";
                }
            }
        }
    }

    var restart = function(){
        gameover = "FALSE";
        var tiles = document.querySelectorAll(".tile");
        tiles.forEach(function(tile){
            tile.textContent = "";
            tile.style.animation = "idle";
        })
        Gameboard.getstate();
        Gameboard.currentplayer = Gameboard.Player1;
        Gameboard.changeplayerturn(Gameboard.currentplayer)
    }

    return{changeplayer,mark,gameover,overgame,restart};
})()