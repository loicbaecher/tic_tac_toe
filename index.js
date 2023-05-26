document.addEventListener("DOMContentLoaded",function(){
    var obscure = document.getElementById("obscure");
    var formsub = document.getElementById("formsub");
    var playermod = document.getElementById("playmod");
    var play1 = document.getElementById("player1name");
    var play2 = document.getElementById("player2name");
    var selplayer1 = document.getElementById("playernam1");
    var selplayer2 = document.getElementById("playernam2");

    formsub.addEventListener("click",()=>{
        if(play1.value != "" && play2.value != ""){
            player1.name = play1.value;
            player2.name = play2.value;
            selplayer1.textContent = play1.value;
            selplayer2.textContent = play2.value;
            event.preventDefault();
            obscure.style.opacity = 0;
            playermod.style.opacity = 0;
            
            setTimeout(function() {
                obscure.remove();
            }, 500);
            
            setTimeout(function() {
                playermod.remove();
            }, 500);
        }
    },500)
})

const playerFactory = (name,symbol)=>{
    return{name,symbol,};
}

player1 = playerFactory("","X");
player2 = playerFactory("","0");

const Gameboard=(()=>{
    state = ["","","","","","","","",""];
    
    var updateBoard = function(state){
        var A1 = document.getElementById("A1");
        var B1 = document.getElementById("B1");
        var C1 = document.getElementById("C1");
        var A2 = document.getElementById("A2");
        var B2 = document.getElementById("B2");
        var C2 = document.getElementById("C2");
        var A3 = document.getElementById("A3");
        var B3 = document.getElementById("B3");
        var C3 = document.getElementById("C3");
    
        A1.textContent = state[0];
        B1.textContent = state[1];
        C1.textContent = state[2];
        A2.textContent = state[3];
        B2.textContent = state[4];
        C2.textContent = state[5];
        A3.textContent = state[6];
        B3.textContent = state[7];
        C3.textContent = state[8];
    }
})()

var mark = function(player){
    
}