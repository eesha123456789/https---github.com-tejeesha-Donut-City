class Game{
    constructor(){

    }
    getState(){
        var gameStateRef = database.ref('gameState'); // Keeps a cursor at this reference
        gameStateRef.on('value', function(data){
        gameStateData=data.val();
        
        }); // two params --> execute the values + print some errors
    }
    writeState(gState){
        database.ref('/').update({
            gameState:gState
        })
    }
    /*writeTime(sTime){
        database.ref('/').update({
            startTime:sTime
        })
    }*/
    async start(){
        if(gameStateData===0){
            player=new Player()
            var playerCountRef=await database.ref('playerCount').once('value')
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val()
                player.getCount()
            }
            console.log(playerCount)
            form=new Form()
            form.display()
        }
        setupGame()
        /*car1=createSprite(100,200)
        car1.addImage(car1Img)
        car1.scale=2
        car2=createSprite(300,200)
        car2.addImage(car2Img)
        car2.scale=2
        cars=[car1,car2]*/
    }
    play(){
        form.hide()
        Player.getPlayerInfo();
        player.readCAE();
        if(allplayers!==undefined){
            //background(ground)
            //image(trackImg, 0,-displayHeight*3,displayWidth,displayHeight*4)
           // var displayPosition=130
           var index=0
           var x=350
           var y=0 
            for(var plr in allplayers){
                //setupGame()
                drawGame()
                index=index+1
                x=x+350
                y=displayHeight - allplayers[plr].distance
                //cars[index - 1].x=x
                //cars[index - 1].y=y

                if(index===player.index){
                    //cars[index - 1].shapeColor='red'
                    fill('lightblue')
                    ellipse(x,y,70,70)
                    //camera.position.x=displayWidth/2
                    //camera.position.y=cars[index - 1].y
                }
            }
        }
        if(player.distance===5500){
            gameStateData=2
            player.rank=player.rank+1
            Player.writeCAE(player.rank)
        }
        if(player.index!==null)
        {
            if(level==="level1" && gameState==="play"){
                player.score=allGameScore+game1Score;
                player.level=level
                player.update();
            }
            if(level==="level2" && trexGameState===1){
                player.score=allGameScore+game2Score;
                player.level=level
                player.update();
            }
            if(level==="level3"){
                player.score=allGameScore +game3Score;
                player.level=level
                player.update();
            }
            //console.log(player.distance)
        }

  /*var response = await fetch('http://worldclockapi.com/api/json/pst/now') 

  var responseJSON = await response.json();

  var datetime=responseJSON.currentDateTime;
  console.log(datetime);
  var minute=datetime.slice(15,17);
  console.log(minute);*/
        drawSprites();
    }
    end(){
        console.log("game is over")
        //console.log(player.rank)
    }
}