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

    var checkfinished = function(){
        if(
        (State[0]==State[1]==State[2]==(Player1.symbol))|
        (State[3]==State[4]==State[5]==(Player1.symbol))|
        (State[6]==State[7]==State[8]==(Player1.symbol))|
        (State[0]==State[3]==State[6]==(Player1.symbol))|
        (State[1]==State[4]==State[7]==(Player1.symbol))|
        (State[2]==State[5]==State[8]==(Player1.symbol))|
        (State[0]==State[4]==State[8]==(Player1.symbol))|
        (State[2]==State[4]==State[6]==(Player1.symbol))
        )
        {
            playturn.textContent = `${Player1.name} won!`
            return("TRUE");    
        }
        else if(
            (State[0]==State[1]==State[2]==(Player2.symbol))|
            (State[3]==State[4]==State[5]==(Player2.symbol))|
            (State[6]==State[7]==State[8]==(Player2.symbol))|
            (State[0]==State[3]==State[6]==(Player2.symbol))|
            (State[1]==State[4]==State[7]==(Player2.symbol))|
            (State[2]==State[5]==State[8]==(Player2.symbol))|        
            (State[0]==State[4]==State[8]==(Player2.symbol))|
            (State[2]==State[4]==State[6]==(Player2.symbol))
        )
        {
            playturn.textContent = `${Player2.name} won!`;
            return("TRUE");
        }
        else{
            return("FALSE");
        }
    }

    var changeplayerturn = function(currentplayer){
        var playturn = document.getElementById("playerturn");
        playturn.textContent = `It is ${currentplayer.name}'s turn.`;
    }

    tiles.forEach(function(tile){
        tile.addEventListener('click',()=>{
            Gameflow.mark(currentplayer,event.target.id);
        })
    })

    return{currentplayer,updatestate,getstate,State,Player1,Player2,checkempty,changeplayerturn,checkfinished}
})()

//Gameflow module
const Gameflow = (()=>{
    var changeplayer = function(player){
        if(player == Gameboard.Player1){
            Gameboard.currentplayer = Gameboard.Player2;
        }
        else{
            Gameboard.currentplayer = Gameboard.Player1;
        }
    }

    var mark = function(currentplayer,tileid){
        currentplayer = Gameboard.currentplayer;
        var tiletomark = document.getElementById(tileid);
        if(Gameboard.checkempty(tileid)== "TRUE"){
        tiletomark.textContent = currentplayer.symbol;
        Gameboard.getstate();
        Gameboard.updatestate(tileid,currentplayer.symbol);
        Gameflow.changeplayer(currentplayer);
        Gameboard.changeplayerturn(Gameboard.currentplayer);
        Gameboard.checkfinished();
        }
    }

    return{changeplayer,mark};
})()