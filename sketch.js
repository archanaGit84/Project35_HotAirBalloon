var balloon, database;
var bkgImg, balloon_moving, balloonPosition;

function preload(){
  bkgImg = loadImage("images/Hot Air Ballon-01.png")
  balloon_moving = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
}

function setup() {
  createCanvas(700,500);
  balloon = createSprite(200, 400, 50, 50);
  balloon.scale = 0.5;
  balloon.addAnimation("moving", balloon_moving);

  database = firebase.database();

  var balloonPosRef = database.ref("balloon/position");
  balloonPosRef.on("value", 
  function(snapshot){
    balloonPosition = snapshot.val();
    balloon.x = balloonPosition.x;
    balloon.y = balloonPosition.y;
    console.log(balloonPosition);

  }, 
  function(){
    console.log("Error in writing to the database");
  });
}

function draw() {
  background(bkgImg);  

  if(keyDown(LEFT_ARROW)){
    updateHeight(-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(5,0);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-5);
    balloon.scale -= 0.006;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,5);
    balloon.scale += 0.006;
  }

  drawSprites();
}

function updateHeight(x,y){

  database.ref("balloon/position").update({
    x: balloon.x + x,
    y: balloon.y +y
  })
 
}