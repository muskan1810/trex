
var score; 
var PLAY = 1;
var END = 0;
var trex, trex_running, trex_collided,trex_dead;
var ground, invisibleGround, groundImage;

var asteroid , asteriod_blast;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score ; 

var gameState = PLAY;
var gameover , gameover_image
var restart , restart_image

let die, cp, jump; 

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  trex_dead = loadAnimation("dead.gif")
  asteroid = loadImage("ded.gif");
  asteroid_blast = loadImage("ded.gif");
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  gameover_image = loadImage("gameOver.png");
  restart_image = loadImage ("restart.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  die = loadSound('die.mp3', false);
   cp = loadSound('checkPoint.mp3', false);
  jump = loadSound('jump.mp3', false);

  
}

function setup() {
  createCanvas(600, 200);
  asteroid = createSprite(500,20,20,50);
  asteroid.addAnimation("blast", asteroid_blast);
  asteroid.scale = 0.4 ;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trex_collided);
  trex.scale = 0.5;
      
   
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
   
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
   gameover = createSprite(300,100);
  
 restart = createSprite(300,140);
  restart.addImage(restart_image);
   restart.scale = 0.5;

 gameover.addImage(gameover_image);
  gameover.scale = 0.5;


gameover.visible = false;
restart.visible = false;
  asteroid.visible = false;
  score = 0;
trex.visible = true;
  ground.visible = true;
  
 
}

function draw() {
  
  background(180);
   text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
  score = score + Math.round(getFrameRate()/60);
 
  if (score>0 && score%100 === 0){
      cp.play();
    }
  if(keyDown("space") && trex.y >= 155) {
    jump.play(); 
    trex.velocityY = -15  ;
    
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  

  spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
       gameState = END;
      die.play();
      
       
    } 
  }
  else if(gameState === END) {
    gameover.visible = true;
    restart.visible = true; 
    trex.changeAnimation("collide", trex_collided);
    //set velcity of each game object to 0
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    

    //change the trex animation
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
 if(mousePressedOver(restart)) {
    reset();
  }  
  }
  
    trex.collide(invisibleGround);
  
  drawSprites();
}
function reset(){
  gameState = PLAY;
    ground.velocityX = -6;
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 score = 0;
   
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}