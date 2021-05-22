var database, ball
var playerCount=0
var distance=0
var gameStateData=0;
var game, player, form, gState, allplayers, minute

function setup(){
    createCanvas(displayWidth - 20,displayHeight - 30)
    database=firebase.database();
    game=new Game()
    game.getState();
    game.start();
}
function draw(){
    //background("red")
    if(playerCount===2){
        game.writeState(1)
    }
    if(gameStateData===1){
        clear()
        //getTime()
        game.play()
        //game.writeTime(minute)

    }
    if(gameStateData===2){
        game.end();
    }
}
