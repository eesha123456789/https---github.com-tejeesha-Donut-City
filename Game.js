var database
var allGameScore = 0

//Ping Pong Game
var ball, playerPaddle, computerPaddle
var topEdge, bottomEdge, rightEdge, leftEdge
var ballIMG, playerFallIMG, playerKickIMG, playerPlayIMG, computerPaddleIMG
var gameState ="serve"
var compScore=0
var playerScore = 0;
var level="level3"
var game1Score=0

//TRex Game
var trex, trexCollided, ground, invground, rand, cactus1, cactusGroup, cloudGroup, gameOver, restart
var trexGameState=1
var highScore=0;
var score=0;
var PLAY=1;
var END=0;
var next=0
var cloudImage, cactusImage1, cactusImage2, cactusImage3, cactusImage4, cactusImage5, cactusImage6, groundImage, trexImage, gameOverImage, restartImage, checkPointSound, dieSound, jumpSound;
var game2Score=0

//Angry Bird Game
const Engine=Matter.Engine; 
const Bodies=Matter.Bodies;
const Body=Matter.Body;
const World=Matter.World;
const Constraint=Matter.Constraint
var BirdGameState
var engine,world,object, bgImg, birdGround, ball, pig1, pig2,log1,log2, log3,log4
var bird, platform, bg1Picture, sling,bg2Picture,bg
var birdFly,birdSelect,pigSnort
var birdOnSling=1
var birdOffSling=0 
var box1,box2, box3, box4, box5;
var game3Score=0
var pigHit

function preload(){
  ballIMG=loadImage("PingPongIMG/ball.png");
  playerFallIMG=loadImage("PingPongIMG/littleboyFall.png");
  playerKickIMG=loadImage('PingPongIMG/littleboyKick.png')
  playerPlayIMG=loadImage('PingPongIMG/littleboyPlay.png')
  computerPaddleIMG=loadImage("PingPongIMG/robot.png");

  //trexImage=loadAnimation('TRexIMG/trex1.png','TRexIMG/trex3.png','TRexIMG/trex4.png');
  trexImage=loadImage('TRexIMG/trex1.png')
  trexCollided=loadImage('TRexIMG/trex_collided.png');
  groundImage=loadImage('TRexIMG/ground2.png');
  cloudImage=loadImage('TRexIMG/cloud.png');
  cactusImage1=loadImage('TRexIMG/obstacle1.png');
  cactusImage2=loadImage('TRexIMG/obstacle2.png');
  cactusImage3=loadImage('TRexIMG/obstacle3.png');
  cactusImage4=loadImage('TRexIMG/obstacle4.png');
  cactusImage5=loadImage('TRexIMG/obstacle5.png');
  cactusImage6=loadImage('TRexIMG/obstacle6.png');
  gameOverImage=loadImage('TRexIMG/gameOver.png');
  restartImage=loadImage('TRexIMG/restart.png');
  checkPointSound=loadSound('TRexIMG/checkPoint.mp3')
  dieSound=loadSound('TRexIMG/die.mp3');
  jumpSound=loadSound('TRexIMG/jump.mp3');

  getBackgroundImg();
  birdFly=loadSound('Angry Bird Game/bird_flying.mp3')
  birdSelect=loadSound('Angry Bird Game/bird_select.mp3')
  pigSnort=loadSound('Angry Bird Game/pig_snort.mp3')
}
function setupGame() {
  createCanvas(displayWidth,displayHeight);
  //database=firebase.database();
  //console.log("Inside setup function " + mouseY)
  pingpongSetup()
  trexSetup()
  angryBirdSetup()
}
function drawGame() {
  if(level==="level1"){
    PingPongGame()
  }
  if(level==="level2"){
    ball.visible=false
    computerPaddle.visible=false
    playerPaddle.visible=false
    topEdge.visible=false
    bottomEdge.visible=false
    rightEdge.visible=false
    leftEdge.visible=false

    ground.visible=true
    trex.visible=true

    trexGame()
  }
  if(level==="level3"){
    ground.visible=false
    trex.visible=false

    angryBirdGame()
  }
  if(level==="done"){
  
  }
  drawSprites();
}


function pingpongSetup(){
  ball = createSprite(200,200,10,10);
  ball.addImage(ballIMG)
  playerPaddle = createSprite(370,200,10,70);
  playerPaddle.addImage(playerPlayIMG)
  computerPaddle = createSprite(40,200,10,70);
  computerPaddle.addImage(computerPaddleIMG)
  topEdge=createSprite(425/2,0,425,5)
  bottomEdge=createSprite(425/2,400,425,5)
  rightEdge=createSprite(425,200,5,400)
  leftEdge=createSprite(0,200,5,400)
}
function PingPongGame(){
  if(mouseY<400){
    background("white");
    playerPaddle.y = mouseY;
  }
  if (gameState === "serve") {
    background("white");
    text("Press Space to Serve",150,180);
  }
  if(gameState==="play"){
    if(frameCount%10===0){
      game1Score=game1Score+1
    }
  }
  if(gameState==="play" || gameState==="over"){
    background("white");
  }
  text(compScore, 170,20);
  text(playerScore, 230,20);
  computerPaddle.y = ball.y;
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  } 
  
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(computerPaddle);
  ball.bounceOff(playerPaddle)
  playerPaddle.bounceOff(topEdge)
  playerPaddle.bounceOff(bottomEdge)

  if (keyDown("space") &&  gameState === "serve") {
    playerPaddle.addImage(playerPlayIMG)
    ball.velocityX = 3;
    ball.velocityY = 4;
    gameState = "play";
  }
   if (keyWentDown("a"))
   {
     playerPaddle.addImage(playerKickIMG)  
   }
   if (keyWentUp("a"))
   {
     playerPaddle.addImage(playerPlayIMG);
   }
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400 || ball.isTouching(playerPaddle)) {
      compScore = compScore + 1;
      playerPaddle.addImage(playerFallIMG)
      background("white");
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
  }
  if (playerScore === 1 || compScore === 1){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'Enter' to move to the next level",150,180);
  }
  if (keyDown("Enter") && gameState === "over") {
    compScore=0
    playerScore=0
    level="level2"
    trexGameState=1
  }

  
}
 

function trexSetup(){
  invground = createSprite(200,390,displayWidth,10);
  invground.shapeColor='white'
  invground.visible=false;
  trex = createSprite(200,340,10,10);
  trex.addImage(trexImage)
  trex.addImage(trexCollided)
  trex.scale=0.7
  trex.visible=false
  ground = createSprite(200,380,displayWidth,20);
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  ground.visible=false
  cactusGroup=new Group();
  cloudGroup=new Group();
  gameOver = createSprite(200,200,20,20);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible=false;
  gameOver.scale=0.6;
  restart = createSprite(200,250,20,20);
  restart.addImage("restart", restartImage);
  restart.visible=false;
  restart.scale=0.5;

}
function trexGame(){
  background(160);
//  ground.depth=trex.depth-1
  trex.collide(invground)

  fill("white");
  textSize(15); 
  text("score: "+game2Score,310,30);
  if(game2Score%100===0 && game2Score>0){
    checkPointSound.play();
  }

  if (trexGameState===1){
    if(frameCount%10===0){
      game2Score=game2Score+1
    }
    if(highScore===0){
      fill(165);
    }
    text("HI:"+highScore,220,30);
      ground.velocityX=-4
    if (ground.x < 100){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && 346<trex.y){
       trex.velocityY = -12 ;  
       jumpSound.play(); 
    }

    trex.velocityY = trex.velocityY + 0.7;
    spawnClouds();
    spawnCactus();
  }
  if(trexGameState===0){
    trex.velocityY=0; 
    ground.velocityX=0;
    cactusGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    trex.addImage(trexCollided);
    
    if(highScore<game2Score){
      highScore=game2Score;
    }
      fill("white");
      text("HI:"+highScore,220,30);
    dieSound.play();
  }
  trex.setCollider("circle",0,0,40)
  if(trex.isTouching(cactusGroup))
  {
    trexGameState=0;
  }
  if(keyWentDown("r") && trexGameState===0)
  {
    gameOver.visible=false;
    restart.visible=false;
    //cactusGroup.destroyEach();
    //cloudGroup.destroyEach();
    trex.addImage(trexImage)
    cactusGroup.destroyEach();
    cloudGroup.destroyEach();
    level="level3" 
  }
  drawSprites();
  
}
function spawnClouds(){

  if(frameCount%100===0)
  {
  cloud=createSprite(displayWidth,200,50,50);
  cloud.addImage(cloudImage);
  rand=random(100,300);
  cloud.velocityX=-3;
  cloud.y=rand;
  trex.depth=cloud.depth+1;
  cloud.lifetime=displayWidth/cloud.velocityX;
  cloudGroup.add(cloud);
  }

}
function spawnCactus(){
  if(frameCount%75===0)
  {
    cactus1=createSprite(displayWidth,370);
    var rand1=Math.round(random(1,6));
    cactus1.velocityX=-(4+frameCount/100);
    switch(rand1){
      case 1:cactus1.addImage("obstacle1",cactusImage1);
        break;
      case 2:cactus1.addImage("obstacle2",cactusImage2);
        break;
      case 3:cactus1.addImage("obstacle3",cactusImage3);
        break;
      case 4:cactus1.addImage("obstacle4",cactusImage4);
        break;
      case 5:cactus1.addImage("obstacle5",cactusImage5);
        break;
      case 6:cactus1.addImage("obstacle6",cactusImage6);
        break;
      default:
        break;
    }
    cactus1.scale=0.5;
    cactus1.lifetime=displayWidth/cactus1.velocityX;
    cactusGroup.add(cactus1);
    
  }
}


function angryBirdSetup(){
  engine=Engine.create();
  world=engine.world;
  box1 = new Box(displayWidth/2,displayHeight-50,70,70);
  box2= new Box(displayWidth/2 + 150,displayHeight-50,70,70);
  box3= new Box(displayWidth/2,displayHeight-125,70,70);
  box4 = new Box(displayWidth/2 + 150,displayHeight -125,70,70)
  box5 = new Box(displayWidth/2 + 75,displayHeight - 200,70,70)
  platform = new Ground(120,displayHeight-120,400,300)
  birdGround = new Ground(displayWidth/2,displayHeight-10,displayWidth,15);
  pig1 = new Pig(displayWidth/2 + 75,displayHeight-50);
  pig2 = new Pig(displayWidth/2 + 75,displayHeight - 125);
  pig3 = new Pig(displayWidth/2,displayHeight- 200);
  pig4 = new Pig(displayWidth/2 + 150,displayHeight - 200);
  //log1 = new Log(displayWidth/2 + 75,displayHeight-100,200,PI/2)
  //log2 = new Log(displayWidth/2 + 75,displayHeight-200,200,PI/2)
  //log3 = new Log(880,800,100,180)
  //log4 = new Log(965,800,100,180)
  bird = new Bird(325,380)
  sling=new Slingshot(bird.body,{x:325,y:600})
}
function angryBirdGame(){
  background(bgImg);  
  Engine.update(engine);
  if(bird.velocityX===0 && bird.velocityY===0){
    level==="GameOver"
  }
  birdGround.display();
  platform.display();
  box1.display();
  box2.display();
  pig1.display();
  //log1.display();
  box3.display();
  pig2.display();
  box4.display();
  //log2.display();
  box5.display();
  pig3.display();
  pig4.display();
  //log3.display();
  //log4.display();
  bird.display();
  sling.display();
}
function mouseDragged(){
  if(level==="level3"){
  BirdGameState=birdOnSling
  birdSelect.play()
  if(BirdGameState===birdOnSling){
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
    bird.trajectory=[]
  }
  } 
}
function mouseReleased(){
  if(level==="level3"){
  BirdGameState=birdOffSling
  birdFly.play();
  Matter.Body.setPosition(bird.body,{x:bird.body.position.x,y:bird.body.position.y})
  sling.fly();
  }
}
function keyPressed(){
  if(keyCode===32){
    /*BirdGameState=birdOnSling
    bird.trajectory=[]
    Matter.Body.setPosition(bird.body,{x:225,y:380})
    sling.attach(bird.body);
    bird.Visiblity=255*/
  }
}
async function getBackgroundImg()
{
  var response = await fetch('http://worldclockapi.com/api/json/pst/now') 

  var responseJSON = await response.json();

  var datetime=responseJSON.currentDateTime;
  var hour=datetime.slice(11,13);
  if(hour>6 && hour<17){
    bg='Angry Bird Game/bg.png'
     }
  else{
    bg='Angry Bird Game/bg2.jpg'
  }
bgImg=loadImage(bg);
}