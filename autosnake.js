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


//food create
let food={
    x : Math.floor(Math.random()*20 + 1) * box,
    y : Math.floor(Math.random()*17 + 1) * box
}; 

    if(food.x == snake[0].x && food.y == snake[0].y)
    {
        food={
            x : Math.floor(Math.random()*20 + 1) * box,
            y : Math.floor(Math.random()*17 + 1) * box
        }; 
      
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

let cons=0;
var btn;


//AUTONOMOUS


document.getElementById("buttons").onclick=function(){
    if(cons==0)
    {
    btn = document.createElement("BUTTON");
    btn.innerHTML="Autonomous";
    document.body.appendChild(btn);
    btn.style.cssText='position:absolute;left:50%;transform:translate(-100%,0);height:30px;border:none;border-radius:5px;font-weight:bold;font-size:150%;letter-spacing:2px;color:green';
    cons++;
    }
}

function collision2(head,array){
    for(let i=1 ; i<array.length;i++)
    {
    if(head.x == array[i].x   && head.y == array[i].y)
    return true;
    }
    return false;
    
    }


//auto
let c = 0;
function self(snakexy){
btn.onclick=function(snakexy){
        c++;
        var diffx = snake[0].x - food.x;
        var diffy = snake[0].y - food.y;
    
      //first
        if(diffx >=0 && diffy>=0)
        {  
            if(diffx == 0 && diffy != 0 && d != "DOWN")
            {
                d ="UP";
                if(collision2(snakexy,snake)){
                    d="LEFT";
                    if(collision2(snakexy,snake)){
                        d="RIGHT";
                    }

                }
            }
            else if(diffx == 0 && diffy != 0 && d == "DOWN"){
                d="RIGHT";
                if(collision2(snakexy,snake))
                {
                    d="LEFT";
                }
            }
          else if(diffy == 0 && diffx != 0 && d != "RIGHT")
            {
                d ="LEFT";
                if(collision2(snakexy,snake)){
                    d="UP";
                    if(collision2(snakexy,snake)){
                        d="DOWN";
                    }

                }
            }
            else if(diffy == 0 && diffx != 0 && d == "RIGHT"){
                d="UP";
                if(collision2(snakexy,snake))
                {
                    d="DOWN";
                }
            }
            else{
            if(snake.length != 1)
            { 
            if(diffx != 0 && diffy != 0 && d != "RIGHT")
            {      
                d="LEFT";
            if(collision2(snakexy,snake))
            {
         
              d="UP";
              if(collision2(snakexy,snake))
            {
                d="DOWN";
            }
          }
        }
        else if(d == "RIGHT"){
            d="UP";
            if(collision2(snakexy,snake))
          {
              d="DOWN";
              if(collision2(snakexy,snake))
          {
              d="RIGHT";
          }
              
          }
        }
    }
        else {
            if(diffx != 0 && diffy != 0 && d != "RIGHT")
        {      
            d="LEFT";
        }
      else{
          d="UP";
      }

        }
    }
        }
         //Second
        else if(diffx >=0 && diffy <=0)
         {
            
            if(diffx == 0 && diffy != 0 && d != "UP")
            {
                d ="DOWN";
                if(collision2(snakexy,snake)){
                    d="LEFT";
                    if(collision2(snakexy,snake)){
                        d="RIGHT";
                    }

                }
            }
            else if(diffx == 0 && diffy != 0 && d == "UP"){
                d="RIGHT";
                if(collision2(snakexy,snake))
                {
                    d="LEFT";
                }
            }

           else if(diffy == 0 && diffx != 0 && d != "RIGHT")
            {
                d ="LEFT";
                if(collision2(snakexy,snake)){
                    d="UP";
                    if(collision2(snakexy,snake)){
                        d="DOWN";
                    }

                }
            }
            else if(diffy == 0 && diffx != 0 && d == "RIGHT"){
                d="UP";
                if(collision2(snakexy,snake))
                {
                    d="DOWN";
                }
            }

            else{
            if(snake.length != 1)
            { 
            if(diffx != 0 && diffy != 0 && d != "RIGHT")
            {      
                d="LEFT";
            if(collision2(snakexy,snake))
            {
                d="DOWN";
                if(collision2(snakexy,snake))
            {
                d="UP";
            }
            }
        }
        else if(d == "RIGHT"){
            d ="DOWN";
            if(collision2(snakexy,snake))
            {
                d="UP";
                if(collision2(snakexy,snake))
            {
                d="RIGHT";
            }
            }
        }
    }
         else{
            if(diffx != 0 && diffy != 0 && d != "RIGHT")
            {      
                d="LEFT";
            }
            else{
                d="DOWN";
            }

         }
        }
        }

         
        
        //THIRD
     else if(diffx <=0 && diffy >=0)
         {
            
            if(diffx == 0 && diffy != 0 && d != "DOWN")
            {
                d ="UP";
                if(collision2(snakexy,snake)){
                    d="LEFT";
                    if(collision2(snakexy,snake)){
                        d="RIGHT";
                    }

                }
            }
            else if(diffx == 0 && diffy != 0 && d == "DOWN"){
                d="RIGHT";
                if(collision2(snakexy,snake))
                {
                    d="LEFT";
                }
            }
           else if(diffy == 0 && diffx != 0 && d != "LEFT")
            {
                d ="RIGHT";
                if(collision2(snakexy,snake)){
                    d="UP";
                    if(collision2(snakexy,snake)){
                        d="DOWN";
                    }

                }
            }
            else if(diffy == 0 && diffx != 0 && d == "LEFT"){
                d="UP";
                if(collision2(snakexy,snake))
                {
                    d="DOWN";
                }
            }
            else{
            if(snake.length != 1)
            {
            
            if(diffx != 0 && diffy != 0 && d != "LEFT")
            {      
                d="RIGHT";
            if(collision2(snakexy,snake))
            {
            
                d="UP";
                if(collision2(snakexy,snake))
            {
                d="DOWN";
            }
            }
        }
        else if(d =="LEFT"){
             d="UP";
             if(collision2(snakexy,snake))
            {
                d="DOWN";
                if(collision2(snakexy,snake))
            {
                d="LEFT";
            }
            }
        }
    }
        else{
            if(diffx != 0 && diffy != 0 && d != "LEFT")
            {      
                d="RIGHT";
            }
            else{
                d="UP";
            }
        }
    }
    }

    //last
       else if(diffx <=0 && diffy <=0) 
         {
            
            if(diffx == 0 && diffy != 0 && d != "UP")
            {
                d ="DOWN";
                if(collision2(snakexy,snake)){
                    d="LEFT";
                    if(collision2(snakexy,snake)){
                        d="RIGHT";
                    }

                }
            }
            else if(diffx == 0 && diffy != 0 && d == "UP"){
                d="RIGHT";
                if(collision2(snakexy,snake))
                {
                    d="LEFT";
                }
            }
            
            else if(diffy == 0 && diffx != 0 && d != "LEFT")
            {
                d ="RIGHT";
                if(collision2(snakexy,snake)){
                    d="UP";
                    if(collision2(snakexy,snake)){
                        d="DOWN";
                    }

                }
            }
            else if(diffy == 0 && diffx != 0 && d == "LEFT"){
                d="UP";
                if(collision2(snakexy,snake))
                {
                    d="DOWN";
                }
            }
            else{
            if(snake.length != 1)
            {
                if(diffx != 0 && diffy != 0 && d != "LEFT")
            {      
                d="RIGHT";
                if(collision2(snakexy,snake))
            {
               d="DOWN";
               if(collision2(snakexy,snake))
            {
                d="UP";
            }
           }
            }
            else if(d == "LEFT"){
                d="DOWN";
                if(collision2(snakexy,snake))
            {
                d="UP";
                if(collision2(snakexy,snake))
            {
                d="LEFT";
            }
            }
            }
        }
            else{
                if(diffx != 0 && diffy != 0 && d != "LEFT")
                {      
                    d="RIGHT";
                }
               else{
                   d="DOWN";
               }
            }
            }
         }
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

    if( food.x == snake[0].x && food.y == snake[0].y)
    {
        food={
            x : Math.floor(Math.random()*20 + 1) * box,
            y : Math.floor(Math.random()*17 + 1) * box
        }; 
        
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

    //auto

    

     self(snakexy);
     if(c ==1)
     {
        var diffx = snake[0].x - food.x;
        var diffy = snake[0].y - food.y;
    
      //first
        if(diffx >=0 && diffy>=0)
        {  
            if(diffx == 0 && diffy != 0 && d != "DOWN")
            {
                d ="UP";
                if(d=="UP") snakeY -= box;
                if(collision2(snakexy,snake)){
                    d="LEFT";
                    if(d=="LEFT") snakeX -= box;
                    
                    if(collision2(snakexy,snake)){
                        d="RIGHT";
                        if(d=="RIGHT") snakeX += box;
                    }

                }
            }
            else if(diffx == 0 && diffy != 0 && d == "DOWN"){
                d="RIGHT";
                if(d=="RIGHT") snakeX += box;
                if(collision2(snakexy,snake))
                {
                    d="LEFT";
                    if(d=="LEFT") snakeX -= box;
                }
            }
          else if(diffy == 0 && diffx != 0 && d != "RIGHT")
            {
                d ="LEFT";
                if(d=="LEFT") snakeX -= box;
                
                if(collision2(snakexy,snake)){
                    d="UP";
                    if(d=="UP") snakeY -= box;
                    if(collision2(snakexy,snake)){
                        d="DOWN";if(d=="DOWN") snakeY += box;
                    }

                }
            }
            else if(diffy == 0 && diffx != 0 && d == "RIGHT"){
                d="UP";
                if(d=="UP") snakeY -= box;
                if(collision2(snakexy,snake))
                {
                    d="DOWN";if(d=="DOWN") snakeY += box;
                }
            }
            
            else{
            if(diffx != 0 && diffy != 0 && d != "RIGHT")
            {      
                d="LEFT";
                if(d=="LEFT") snakeX -= box;
                
            if(collision2(snakexy,snake))
            {
         
              d="UP";
              if(d=="UP") snakeY -= box;
              if(collision2(snakexy,snake))
            {
                d="DOWN";if(d=="DOWN") snakeY += box;
            }
          }
        }
        else if(diffx != 0 && diffy != 0 && d == "RIGHT"){
            d="UP";
            if(d=="UP") snakeY -= box;
            if(collision2(snakexy,snake))
          {
              d="RIGHT";
              if(d=="RIGHT") snakeX += box;
              
              if(collision2(snakexy,snake))
          {
              d="DOWN";if(d=="DOWN") snakeY += box;
          }
              
          }
        }
    
      
    }
        }
         //Second
        else if(diffx >=0 && diffy <=0)
         {
            
            if(diffx == 0 && diffy != 0 && d != "UP")
            {
                d ="DOWN";
                if(d=="DOWN") snakeY += box;
                if(collision2(snakexy,snake)){
                    d="LEFT";
                    if(d=="LEFT") snakeX -= box;
                    
                    if(collision2(snakexy,snake)){
                        d="RIGHT";
                        if(d=="RIGHT") snakeX += box;
                    }

                }
            }
            else if(diffx == 0 && diffy != 0 && d == "UP"){
                d="RIGHT";
                if(d=="RIGHT") snakeX += box;
                
                if(collision2(snakexy,snake))
                {
                    d="LEFT";
                }
            }

           else if(diffy == 0 && diffx != 0 && d != "RIGHT")
            {
                d ="LEFT";
                if(d=="LEFT") snakeX -= box;
                
                if(collision2(snakexy,snake)){
                    d="UP";
                    if(d=="UP") snakeY -= box;
                    if(collision2(snakexy,snake)){
                        d="DOWN";if(d=="DOWN") snakeY += box;
                    }

                }
            }
            else if(diffy == 0 && diffx != 0 && d == "RIGHT"){
                d="UP";
                if(d=="UP") snakeY -= box;
                if(collision2(snakexy,snake))
                {
                    d="DOWN";if(d=="DOWN") snakeY += box;
                }
            }

            else{
           
            if(diffx != 0 && diffy != 0 && d != "RIGHT")
            {      
                d="LEFT";
                if(d=="LEFT") snakeX -= box;
                
            if(collision2(snakexy,snake))
            {
                d="DOWN";
                if(d=="DOWN") snakeY += box;
                if(collision2(snakexy,snake))
            {
                d="UP";
                if(d=="UP") snakeY -= box;
            }
            }
        }
        else if(diffx != 0 && diffy != 0 && d == "RIGHT"){
            d ="DOWN";
            if(d=="DOWN") snakeY += box;
            if(collision2(snakexy,snake))
            {
                d="UP";
                if(d=="UP") snakeY -= box;
                if(collision2(snakexy,snake))
            {
                d="RIGHT";
                if(d=="RIGHT") snakeX += box;
            }
            }
       
    }
         
        }
        }

         
        
        //THIRD
     else if(diffx <=0 && diffy >=0)
         {
            
            if(diffx == 0 && diffy != 0 && d != "DOWN")
            {
                d ="UP";
                if(d=="UP") snakeY -= box;
                if(collision2(snakexy,snake)){
                    d="LEFT";
                    if(d=="LEFT") snakeX -= box;
                    
                    if(collision2(snakexy,snake)){
                        d="RIGHT";
                        if(d=="RIGHT") snakeX += box;
                    }

                }
            }
            else if(diffx == 0 && diffy != 0 && d == "DOWN"){
                d="RIGHT";
                if(d=="RIGHT") snakeX += box;
                
                if(collision2(snakexy,snake))
                {
                    d="LEFT";
                    if(d=="LEFT") snakeX -= box;
                }
            }
           else if(diffy == 0 && diffx != 0 && d != "LEFT")
            {
                d ="RIGHT";
                if(d=="RIGHT") snakeX += box;
                
                if(collision2(snakexy,snake)){
                    d="UP";
                    if(d=="UP") snakeY -= box;
                    if(collision2(snakexy,snake)){
                        d="DOWN";if(d=="DOWN") snakeY += box;
                    }

                }
            }
            else if(diffy == 0 && diffx != 0 && d == "LEFT"){
                d="UP";
                if(d=="UP") snakeY -= box;
                if(collision2(snakexy,snake))
                {
                    d="DOWN";if(d=="DOWN") snakeY += box;
                }
            }
            else{
           
            
            if(diffx != 0 && diffy != 0 && d != "LEFT")
            {      
                d="RIGHT";
                if(d=="RIGHT") snakeX += box;
                
            if(collision2(snakexy,snake))
            {
                 d="UP";
                 if(d=="UP") snakeY -= box;
                if(collision2(snakexy,snake))
            {
                d="DOWN";if(d=="DOWN") snakeY += box;
            }
            }
        }
        else if(diffx != 0 && diffy != 0 && d =="LEFT"){
             d="UP";
             if(d=="UP") snakeY -= box;
             if(collision2(snakexy,snake))
            {
                d="DOWN";
                if(d=="DOWN") snakeY += box;
                if(collision2(snakexy,snake))
            {
                d="LEFT";
                if(d=="LEFT") snakeX -= box;
            }
            }
        }
    
        
    }
    }

    //last
       else if(diffx <=0 && diffy <=0) 
         {
            
            if(diffx == 0 && diffy != 0 && d != "UP")
            {
                d ="DOWN";
                if(d=="DOWN") snakeY += box;
                if(collision2(snakexy,snake)){
                    d="LEFT";
                    if(d=="LEFT") snakeX -= box;
                    
                    if(collision2(snakexy,snake)){
                        d="RIGHT";
                        if(d=="RIGHT") snakeX += box;
                    }

                }
            }
            else if(diffx == 0 && diffy != 0 && d == "UP"){
                d="RIGHT";
                if(d=="RIGHT") snakeX += box;
                
                if(collision2(snakexy,snake))
                {
                    d="LEFT";
                    if(d=="LEFT") snakeX -= box;
                }
            }
            
            else if(diffy == 0 && diffx != 0 && d != "LEFT")
            {
                d ="RIGHT";
                if(d=="RIGHT") snakeX += box;
                
                if(collision2(snakexy,snake)){
                    d="UP";
                    if(d=="UP") snakeY -= box;
                    if(collision2(snakexy,snake)){
                        d="DOWN";if(d=="DOWN") snakeY += box;
                    }

                }
            }
            else if(diffy == 0 && diffx != 0 && d == "LEFT"){
                d="UP";
                if(d=="UP") snakeY -= box;
                if(collision2(snakexy,snake))
                {
                    d="DOWN";if(d=="DOWN") snakeY += box;
                }
            }
            else{
           
                if(diffx != 0 && diffy != 0 && d != "LEFT")
            {      
                d="RIGHT";
                if(d=="RIGHT") snakeX += box;
                
                if(collision2(snakexy,snake))
            {
               d="DOWN";if(d=="DOWN") snakeY += box;
               
               if(collision2(snakexy,snake))
            {
                d="UP";
                if(d=="UP") snakeY -= box;
            }
           }
            }
            else if(diffx != 0 && diffy != 0 && d == "LEFT"){
                d="DOWN";
                if(d=="DOWN") snakeY += box;   
                if(collision2(snakexy,snake))
            {
                d="UP";
                if(d=="UP") snakeY -= box;   
                if(collision2(snakexy,snake))
            {
                d="LEFT";
                if(d=="LEFT") snakeX -= box;
            }
            }
            }
            }
         }
         
        }
 

//movement
if(c==0)
{
    if(d=="LEFT") snakeX -= box;
if(d=="RIGHT") snakeX += box;
if(d=="UP") snakeY -= box;
if(d=="DOWN") snakeY += box;
    }
canx.drawImage(foodimg,food.x,food.y,box+10,box);




//get the food
if(snakeX == food.x && snakeY == food.y)
{
    food={
        x : Math.floor(Math.random()*17 + 1) * box,
        y : Math.floor(Math.random()*15 + 1) * box
    };
 
    for(let j=0;j<snake.length;j++)
{
    if( food.x == snake[j].x && food.y == snake[j].y)
    {
        food={
            x : Math.floor(Math.random()*20 + 1) * box,
            y : Math.floor(Math.random()*17 + 1) * box
        }; 
        j=0;
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






    if(collision(newhead,snake) || snakeX < box || snakeX > 20*box || snakeY < box || snakeY > 17*box)
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
