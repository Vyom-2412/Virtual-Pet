//Create variables here
var dog, HungryDog, happyDog, database, foodS, foodStock, database;
function preload()
{
   HungryDog = loadImage('images/dogImg.png');
   happyDog = loadImage('images/dogImg1.png');
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref('foodS');
  foodStock.on("value",readStock);
  foodStock.set(20);
  dog = createSprite(250,400,40,40);
  dog.addImage(HungryDog);
  dog.scale= 0.2;
}


function draw() {  
  background(46, 139, 87);
  //add styles here
   textSize(20);
   fill(255);
   text("NOTE :- Press up arrow key to feed Drago milk", 50,250);
   text("Food Remaining : " +foodS,150,150);

  if(keyWentDown(UP_ARROW))
  {
     foodS = foodS - 1;
     writeStock(foodS);
     dog.addImage(happyDog);
  }
  if(keyWentUp(UP_ARROW))
  {
     dog.addImage(HungryDog);
  }

  if(foodS === 0)
  {
     foodS = 20;
  }

  drawSprites();
}

function writeStock(x)
{
   if(x<=0)
   {
      x= 0;
   }
   else
   {
      x = x-1;
   }

   database.ref('/').update({
       Food:x
     })
}

function readStock(data)
{
   foodS = data.val();
}