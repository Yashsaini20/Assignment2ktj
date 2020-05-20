const can = document.getElementById('canvas');
const canx = can.getContext('2d');

//audios
var audio = new Audio();
audio.src ="title.mp3";

var audio1 = new Audio();
audio1.src ="hiss.mp3";

var audio2 = new Audio();
audio2.src ="turn1.mp3";

var audio3 = new Audio();
audio3.src ="food.wav";

var audio4 = new Audio();
audio4.src ="hit1.mp3";
//unit

const box = 32;

//inamges
var back = new Image();
back.src="back.jpg";

var foodimg = new Image(box,box);
foodimg.src="food.png";

//snake

let snake=[];
snake[0]={
    x: 10*box,
    y: 15*box
}
//walls

let wall=[40];
for(let j=1,k=11;j<=10;j++,k++)
{
    wall[j-1]={
       x: (4*box)+(j*box),
       y:3*box
    }

    wall[k-1]={
       x: (4*box)+box,
       y:(3*box)+(j*box)
    }
}


j=1;
for(let p=21,m=31;p<=30;m++,p++)
{
    wall[p-1]={
       x: (8*box)+(j*box),
       y:7*box
    }

    wall[m-1]={
       x: (8*box)+box,
       y:(7*box)+(j*box)
    }
j++;
}

//food create
let food={
    x : Math.floor(Math.random()*20 + 1) * box,
    y : Math.floor(Math.random()*17 + 1) * box
}; 
for(let i=0;i<40;i++)
{
    if((food.x == wall[i].x && food.y == wall[i].y) || (food.x == snake[0].x && food.y == snake[0].y))
    {
        food={
            x : Math.floor(Math.random()*20 + 1) * box,
            y : Math.floor(Math.random()*17 + 1) * box
        }; 
       i=0;
    }
    
}
//score
let score=0;



//control
let d;
var startX,startY;
function touchstart(event){
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}
function touchmove(event){
    var touch = event.touches[0];
    var moveX = startX - touch.clientX;
    var moveY = startY - touch.clientY;
   var mx = moveX;
   var my = moveY;
   if(moveX<0)
   {
       mx = -moveX;
   }
   if(moveY<0)
   {
       my = -moveY;
   }
   
   
   
   if(mx >= my)    
   {
       if(moveX<0 && d !="LEFT")
    {
        audio2.play();    
        d="RIGHT";
    }
    else if(moveX>0 && d !="RIGHT")
    {
        audio2.play();
        d="LEFT";  
    }
    }
else{
    if(moveY<0 && d !="UP")
    {
        audio2.play();    
        d="DOWN";
    }
    else if(moveY>0 && d !="DOWN")
    {
        audio2.play();
        d="UP";  
    }
  }
  event.preventDefault();
}




document.addEventListener("keydown",direction);


function direction(event)
{ 
   
    if(event.keyCode == 37  && d !="RIGHT"){
        audio2.play();
        d="LEFT"; 
    }
    else if(event.keyCode == 38  && d !="DOWN"){
        audio2.play();
        d="UP";
    }
    else if(event.keyCode == 39  && d !="LEFT"){
    d="RIGHT";
    audio2.play();
    }
    else if(event.keyCode == 40   && d !="UP"){
        audio2.play();    
        d="DOWN";
    }
}


    


//collision
function collision(head,array){
for(let i=0 ; i<array.length;i++)
{
if(head.x == array[i].x   && head.y == array[i].y)
return true;
}
return false;

}

//collidewall
function collidewall(head,wall){
    for(let i=0 ; i<40;i++)
    {
    if(head.x == wall[i].x   && head.y == wall[i].y)
    return true;
    }
    return false;
    
    }

    
 
 //replay   
function replay(){
d = null;
    snake.length=0;
 snake[0]={
    x: 13*box,
    y:12*box
}

//food create
 food={
    x : Math.floor(Math.random()*20 + 1) * box,
    y : Math.floor(Math.random()*17 + 1) * box
}; 
for(i=0;i<40;i++)
{
    if((food.x == wall[i].x && food.y == wall[i].y) || (food.x == snake[0].x && food.y == snake[0].y))
    {
        food={
            x : Math.floor(Math.random()*20 + 1) * box,
            y : Math.floor(Math.random()*17 + 1) * box
        }; 
        i=0;
    }
}
//score
 score = 0;
}





//drawing
function draw(){
canx.drawImage(back,-26,-26,752,659);
for(let i=0;i<snake.length;i++){
    canx.fillStyle=(i==0)?"red":"white";
    canx.fillRect(snake[i].x,snake[i].y,box,box) ;
    canx.strokeStyle = 'blue';
    canx.strokeRect(snake[i].x,snake[i].y,box,box);
}

//OLD HEAD
let snakeX = snake[0].x;
let snakeY = snake[0].y;

let snakexy={
    x:snakeX,
    y:snakeY
};
canx.beginPath();
canx.moveTo(5*box,3*box);
canx.lineTo(15*box,3*box);
canx.stroke();


for(i=0;i<40;i++)
{  if(i==0 || i == 1 || i==4 || i==5 || i==8 || i==9 ||i==10 || i == 11 || i==14 || i==15 || i==18 || i==19 || i==20 || i == 21 || i==24 || i==25 || i==28 || i==29||i==30 || i == 31 || i==34 || i==35 || i==38 || i==39)
    {
        canx.fillStyle="#7e4b13";
    }
    else
    {
        canx.fillStyle="#8d5c26";
    }
    canx.fillRect(wall[i].x,wall[i].y,box,box);
    
}

canx.strokeStyle = "black";
for(i=0;i<40;i++)
    {  if(i%2 == 0 &&(i<10 || (i>19 && i<30)))
        canx.strokeRect(wall[i].x,wall[i].y,2*box,box);
      
        if(i%2 == 0 &&((i>=10 && i<20) || i>=30))
        canx.strokeRect(wall[i].x,wall[i].y,box,2*box);


    }

       


//movement

if(d=="LEFT") snakeX -= box;
if(d=="RIGHT") snakeX += box;
if(d=="UP") snakeY -= box;
if(d=="DOWN") snakeY += box;

canx.drawImage(foodimg,food.x,food.y,box+10,box);




//get the food
if(snakeX == food.x && snakeY == food.y)
{
    food={
        x : Math.floor(Math.random()*17 + 1) * box,
        y : Math.floor(Math.random()*15 + 1) * box
    };
   for(i=0;i<40;i++)
{ 
    for(let j=0;j<snake.length;j++)
{
    if((food.x == wall[i].x && food.y == wall[i].y) || (food.x == snake[j].x && food.y == snake[j].y))
    {
        food={
            x : Math.floor(Math.random()*20 + 1) * box,
            y : Math.floor(Math.random()*17 + 1) * box
        }; 
        j=0;
    }
}
}
    audio3.play();   
    score++;
}

else{
    //remove the tail
    snake.pop();
}
let newhead={
    x:snakeX,
    y:snakeY
};






    if(collision(newhead,snake) || snakeX < box || snakeX > 20*box || snakeY < box || snakeY > 17*box || collidewall(newhead,wall))
    {   
        audio4.play(); 
        clearInterval(game);
    audio.pause();
    count=0;
    }

    snake.unshift(newhead);
    document.getElementById("scores").innerHTML=score;
}


let count=0;
let game;

document.getElementById("speed1").onclick=function(){
    if(count == 0)
    {
        audio.play();
    }

    audio1.play(); 
    replay();
    c=0;
   count++;
   clearInterval(game);
   game = undefined;
        delete(game);
        game = setInterval("draw()",70);
    }
document.getElementById("speed2").onclick=function(){
    
    if(count == 0)
  {
      audio.play();
  }
  audio1.play(); 
    count++;
    replay();
    c=0;
    clearInterval(game);
    game = undefined;
        delete(game);
        game = setInterval("draw()",100);
}
document.getElementById("speed3").onclick=function(){
    if(count == 0)
    {
        audio.play();
    }
    audio1.play(); 
    count++;
    replay();
    c=0;
    clearInterval(game);
    game = undefined;
        delete(game);
    game = setInterval("draw()",200);

   
}
document.getElementById("speed4").onclick=function(){
    if(count == 0)
  {
      audio.play();
  }
  audio1.play(); 
    count++;
    replay();
    c=0;
    clearInterval(game);
    game = undefined;
        delete(game);
        game = setInterval("draw()",500);
}
