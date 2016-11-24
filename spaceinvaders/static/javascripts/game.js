// Canvas Variables
var canvas = document.getElementById("myCanvas");
canvas.width = 1000;
canvas.height = 500;
var ctx = canvas.getContext("2d"); // store the 2D rendering context


// Boolean Button Press Checks
var rightPressed = false;
var leftPressed = false;

// Key Listeners
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("keypress",keyPressHandler,false);

var game = {
  score: 0,
  over: false,
};


var ship = {
    image: new Image(),
    width: canvas.width * .05,
    height: canvas.height * .05,
    lives: 3,
    bullets : [],
    X : canvas.width/2,
    Y : (canvas.height) - (canvas.height * 0.15),
    hitBox: {
        X1 : canvas.width/2,
        X2 : canvas.width/2 + canvas.width * .05,
        Y1 : (canvas.height) - (canvas.height * 0.15),
        Y2 : (canvas.height) - (canvas.height * 0.15) + canvas.height * .05,
    }

};

var aliens = {
    bottom : [],
    middle : [],
    top : [],
    cleared : false,
    bullets : []
};

/* Amount to move the aliens by */
var alienIncrementX = 1;
/* Boolean to check for a random fire event every other draw cycle */
var fireCheck = true;
/* Array of base objects */
var bases = [];



ship.image.src = 'static/images/ship.png';


function createInitialState(){
    var rowOffset= canvas.width*.20;
    // Create Row 1 - Bottom Aliens
    for (var i=0; i<11;i++){
        var alien = {
            image : new Image(),
            width : canvas.width * .03,
            height : canvas.height * .03,
            score : 10,
            X : rowOffset + (i*(canvas.width*.06)),
            Y : (canvas.height) - (canvas.height * 0.50),
            hitBox: {
                X1 : rowOffset + (i*(canvas.width*.06)),
                X2 : rowOffset + (i*(canvas.width*.06)) + canvas.width * .03,
                Y1 : (canvas.height) - (canvas.height * 0.50),
                Y2 : (canvas.height) - (canvas.height * 0.50) + canvas.height * 0.03
            }
        };
        alien.image.src = 'static/images/alien-bottom.png';
        aliens.bottom.push(alien);
    }
    // Create Row 2 - Bottom Aliens
    for (i=0; i<11;i++){
        alien = {
            image: new Image(),
            width: canvas.width * .03,
            height: canvas.height * .03,
            score: 10,
            X : rowOffset + (i*(canvas.width*.06)),
            Y :(canvas.height) - (canvas.height * 0.56),
            hitBox: {
                X1 : rowOffset + (i*(canvas.width*.06)),
                X2 : rowOffset + (i*(canvas.width*.06)) + canvas.width * .03,
                Y1 : (canvas.height) - (canvas.height * 0.56),
                Y2 : (canvas.height) - (canvas.height * 0.56) + canvas.height * 0.03
            }
        };
        alien.image.src = 'static/images/alien-bottom.png';
        aliens.bottom.push(alien);
    }
    // Create Row 3 - Middle Aliens
    for (i=0; i<11;i++){
        alien = {
            image: new Image(),
            width: canvas.width * .03,
            height: canvas.height * .03,
            score: 20,
            X : rowOffset + (i*(canvas.width*.06)),
            Y :(canvas.height) - (canvas.height * 0.62),
            hitBox: {
                X1 : rowOffset + (i*(canvas.width*.06)),
                X2 : rowOffset + (i*(canvas.width*.06)) + canvas.width * .03,
                Y1 : (canvas.height) - (canvas.height * 0.62),
                Y2 : (canvas.height) - (canvas.height * 0.62) + canvas.height * 0.03
            }
        };
        alien.image.src = 'static/images/alien-middle.png';
        aliens.bottom.push(alien);
    }


    // Create Row 4 - Middle Aliens
    for (i=0; i<11;i++){
        alien = {
            image: new Image(),
            width: canvas.width * .03,
            height: canvas.height * .03,
            score: 20,
            X : rowOffset + (i*(canvas.width*.06)),
            Y :(canvas.height) - (canvas.height * 0.68),
            hitBox: {
                X1 : rowOffset + (i*(canvas.width*.06)),
                X2 : rowOffset + (i*(canvas.width*.06)) + canvas.width * .03,
                Y1 : (canvas.height) - (canvas.height * 0.68),
                Y2 : (canvas.height) - (canvas.height * 0.68) + canvas.height * 0.03
            }
        };
        alien.image.src = 'static/images/alien-middle.png';
        aliens.bottom.push(alien);
    }

    // Create Row 5 - Top Aliens
    for (i=0; i<11;i++){
        alien = {
            image: new Image(),
            width: canvas.width * .03,
            height: canvas.height * .03,
            score: 30,
            X : rowOffset + (i*(canvas.width*.06)),
            Y :(canvas.height) - (canvas.height * 0.74),
            hitBox: {
                X1 : rowOffset + (i*(canvas.width*.06)),
                X2 : rowOffset + (i*(canvas.width*.06)) + canvas.width * .03,
                Y1 : (canvas.height) - (canvas.height * 0.74),
                Y2 : (canvas.height) - (canvas.height * 0.74) + canvas.height * 0.03
            }
        };
        alien.image.src = 'static/images/alien-top.png';
        aliens.bottom.push(alien);
    }
    // Create Row 6 - Top Aliens
    for (i=0; i<11;i++){
        alien = {
            image: new Image(),
            width: canvas.width * .03,
            height: canvas.height * .03,
            score: 30,
            X : rowOffset + (i*(canvas.width*.06)),
            Y :(canvas.height) - (canvas.height * 0.80),
            hitBox: {
                X1 : rowOffset + (i*(canvas.width*.06)),
                X2 : rowOffset + (i*(canvas.width*.06)) + canvas.width * .03,
                Y1 : (canvas.height) - (canvas.height * 0.80),
                Y2 : (canvas.height) - (canvas.height * 0.80) + canvas.height * 0.03
            }
        };
        alien.image.src = 'static/images/alien-top.png';
        aliens.bottom.push(alien);
    }

    // Setup Bases
    for (i=0; i<4; i++){
        base = {
            image: new Image(),
            width: canvas.width * .05,
            height: canvas.height * .05,
            health: 100,
            X : rowOffset + (i*(canvas.width*.20)),
            Y : (canvas.height) - (canvas.height * 0.25),
            hitBox: {
                X1 : rowOffset + (i*(canvas.width*.20)),
                X2 : rowOffset + (i*(canvas.width*.20)) + canvas.width * .05,
                Y1 : (canvas.height) - (canvas.height * 0.25),
                Y2 : (canvas.height) - (canvas.height * 0.25) + canvas.height * .05
            }
        };
        base.image.src = 'static/images/base.png';
        bases.push(base);
    }



}


/*
 * Check if the right or left key is pressed
 */
function keyDownHandler(e){
    if(e.keyCode==39){rightPressed=true;}
    else if(e.keyCode==37){leftPressed=true;}
}
/*
 * Check if key is released, set both right/left pressed to false
 */
function keyUpHandler(e){
    if(e.keyCode==39){rightPressed=false;}
    else if(e.keyCode==37){leftPressed=false;}
}

/*
 * Check if key is spacebar is pressed, create a bullet if so.
 */
function keyPressHandler(e){
    if(e.keyCode==32){
       var bullet = {
            width: canvas.width * .005,
            height: canvas.height * .03,
            X : ship.X + (ship.width/2),
            Y: ship.Y - ship.height
       };
       ship.bullets.push(bullet);
    }
}






/*
 * Handle the drawing functionality of the ship
 */
function drawShip(){
    ctx.drawImage(ship.image, ship.X, ship.Y, ship.width,ship.height);
}

/*
 * Handle the drawing functionality of the aliens
 */
function drawAliens() {
    // Draw Bottom Aliens
    for (var i=0; i<aliens.bottom.length; i++){
        var alien = aliens.bottom[i];
        ctx.drawImage(alien.image, alien.X, alien.Y, alien.width, alien.height);
    }
}

/*
 * Handle the drawing functionality of the four bases
 */
function drawBases() {
    for (var i=0; i<bases.length; i++){
        var base = bases[i];
        ctx.drawImage(base.image, base.X, base.Y, base.width, base.height);
    }
}




/*
 * Handle the drawing functionality of the ship
 */
function drawBullets() {
    if (ship.bullets.length > 0) {
        for (var i=0; i<ship.bullets.length; i++){
            bullet = ship.bullets[i];
            ctx.beginPath();
            ctx.rect(bullet.X, bullet.Y, bullet.width, bullet.height);
            ctx.fillstyle = "#15e337";
            ctx.fill();
            ctx.closePath();
        }
    }
}
/*
 * Handle the drawing functionality of the ship
 */
function drawLine(){
    ctx.beginPath();
    ctx.moveTo(0,(canvas.height) - (canvas.height * 0.09));
    ctx.lineTo(canvas.width,(canvas.height) - (canvas.height * 0.09));
    ctx.strokeStyle="#15e337";
    ctx.stroke();
    ctx.closePath();
}
/*
 * Draw the score at the top of the canvas
 */
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SCORE <"+game.score+">", canvas.width - (canvas.width *.99), canvas.height - (canvas.height *.95));

}
/*
 * Draw the lives at the bottom of the canvas.
 */
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(ship.lives, canvas.width - (canvas.width *.99) , canvas.height - (canvas.height *.05));
}

/*
 * Draw the bullets fired by the aliens
 */
function drawAlienFire() {
    if (aliens.bullets.length > 0) {
        for (var i=0; i<aliens.bullets.length; i++){
            bullet = aliens.bullets[i];
            ctx.beginPath();
            ctx.rect(bullet.X, bullet.Y, bullet.width, bullet.height);
            ctx.fillstyle = "#15e337";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function randomFire() {
   randomNum = Math.random();
   // If random number > .7
   if (randomNum >= (.96)) {
       // If random number > .8 - bottom row
       if (randomNum > (.98)) {
           if (aliens.bottom.length > 0) {
               var randomIndex = Math.floor(Math.random()*aliens.bottom.length);
               var bullet = {
                   width: canvas.width * .005,
                   height: canvas.height * .03,
                   X: aliens.bottom[randomIndex].X + (aliens.bottom[randomIndex].width / 2),
                   Y: aliens.bottom[randomIndex].Y - aliens.bottom[randomIndex].height
               };
               aliens.bullets.push(bullet);
           }
           // If random number > .9 - middle row
       } else if (randomNum > (.99)) {
           if (aliens.middle.length > 0) {
               randomIndex = Math.floor(Math.random()*aliens.middle.length);
               bullet = {
                   width: canvas.width * .005,
                   height: canvas.height * .03,
                   X: aliens.middle[randomIndex].X + (aliens.middle[randomIndex].width / 2),
                   Y: aliens.middle[randomIndex].Y - aliens.middle[randomIndex].height
               };
               aliens.bullets.push(bullet);

           }
       } // Else, the random number is between .7 & .8 - top row
         else {
           if (aliens.top.length > 0) {
               randomIndex = Math.floor(Math.random()*aliens.top.length);
               bullet = {
                   width: canvas.width * .005,
                   height: canvas.height * .03,
                   X: aliens.top[randomIndex].X + (aliens.top[randomIndex].width / 2),
                   Y: aliens.top[randomIndex].Y - aliens.top[randomIndex].height
               };
               aliens.bullets.push(bullet);

           }
       }
   }

}


function handleIncrements(){
    /* Increment Ship */
    if(rightPressed && ship.X<canvas.width-ship.width){
        ship.X +=7;
        ship.hitBox.X1 +=7;
        ship.hitBox.X2 +=7;
    }
    else if(leftPressed && ship.X>0 ){
        ship.X -= 7;
        ship.hitBox.X1 -=7;
        ship.hitBox.X2 -=7;
    }

    /* Increment Aliens - Check the outermost elements */

    if (aliens.bottom.length > 0){
        var bottomLeft = aliens.bottom[0];
        var bottomRight = aliens.bottom[(aliens.bottom.length-1)];
        if (bottomLeft.X <= 0){alienIncrementX=2;}
        if (bottomRight.X >=canvas.width){alienIncrementX=-2;}
    }
    if (aliens.middle.length > 0){
        var middleLeft = aliens.middle[0];
        var middleRight = aliens.middle[(aliens.middle.length-1)];
        if (middleLeft.X <= 0){alienIncrementX=2;}
        if (middleRight.X >=canvas.width){alienIncrementX=-2;}
    }
    if (aliens.top.length > 0){
        var topLeft = aliens.top[0];
        var topRight = aliens.top[(aliens.middle.length-1)];
        if (topLeft.X <= 0){alienIncrementX=2;}
        if (topRight.X >=canvas.width){alienIncrementX=-2;}
    }


    for (var i=0; i<aliens.bottom.length; i++){
        alien = aliens.bottom[i];
        alien.X += alienIncrementX;
        alien.hitBox.X1 += alienIncrementX;
        alien.hitBox.X2 += alienIncrementX;
    }
    for (i=0; i<aliens.middle.length; i++){
        alien = aliens.middle[i];
        alien.X += alienIncrementX;
        alien.hitBox.X1 += alienIncrementX;
        alien.hitBox.X2 += alienIncrementX;
    }
    for (i=0; i<aliens.top.length; i++){
        alien = aliens.top[i];
        alien.X += alienIncrementX;
        alien.hitBox.X1 += alienIncrementX;
        alien.hitBox.X2 += alienIncrementX;
    }


    /* Increment Bullets */
    if(ship.bullets.length > 0){
        for (i=0; i<ship.bullets.length; i++){
           bullet = ship.bullets[i];
           if (bullet.Y < 0){
              ship.bullets.splice(i,1);
           } else {
               bullet.Y -= 2;
           }
        }
    }

    /* Increment Alien Bullets */
    if(aliens.bullets.length > 0){
        for (i=0; i<aliens.bullets.length; i++){
            bullet = aliens.bullets[i];
            if (bullet.Y > canvas.height){
                aliens.bullets.splice(i,1);
            } else {
                bullet.Y += 2;
            }
        }
    }


}

function collisionDetection(){
    for (var i=0; i<ship.bullets.length; i++){
        bullet = ship.bullets[i];
        _checkBottomAliens(bullet, i);
        _checkMiddleAliens(bullet, i);
        _checkTopAliens(bullet, i);
        _checkBases(bullet, i, 0);
    }

    for (i=0; i< aliens.bullets.length; i++){
        bullet = aliens.bullets[i];
        _checkUserHit(bullet, i);
        _checkBases(bullet, i, 1);
    }
}

function _checkBottomAliens(bullet, index){
    for (var i=0; i<aliens.bottom.length; i++) {
        alien = aliens.bottom[i];
        if (alien.hitBox.X1 <= bullet.X && bullet.X <= alien.hitBox.X2 &&
            alien.hitBox.Y1 <= bullet.Y && bullet.Y <= alien.hitBox.Y2){
            ship.bullets.splice(index,1);
            aliens.bottom.splice(i, 1);
            game.score +=10;
        }
    }
}
function _checkMiddleAliens(bullet, index){
    for (var i=0; i<aliens.middle.length; i++){
        alien = aliens.middle[i];
        if (alien.hitBox.X1 <= bullet.X && bullet.X <= alien.hitBox.X2 &&
            alien.hitBox.Y1 <= bullet.Y && bullet.Y <= alien.hitBox.Y2){
            ship.bullets.splice(index,1);
            aliens.middle.splice(i,1);
            game.score +=20;
        }
    }
}
/*
 * Check for a bullet collision with the top row of aliens
 */
function _checkTopAliens(bullet, index){
    for (var i=0; i<aliens.top.length; i++){
        alien = aliens.top[i];
        if (alien.hitBox.X1 <= bullet.X && bullet.X <= alien.hitBox.X2 &&
            alien.hitBox.Y1 <= bullet.Y && bullet.Y <= alien.hitBox.Y2){
            ship.bullets.splice(index,1);
            aliens.top.splice(i,1);
            game.score +=30;
        }
    }
}

function _checkBases(bullet, index, shooter){
    for (var i=0; i<bases.length; i++){
        var base = bases[i];
        if (base.hitBox.X1 <= bullet.X && bullet.X <= base.hitBox.X2 &&
            base.hitBox.Y1 <= bullet.Y && bullet.Y <= base.hitBox.Y2){
            // Remove the bullet from the appropriate shooter's array
            if (shooter == 0){
                aliens.bullets.splice(index,1);
            } else if (shooter == 1){
                ship.bullets.splice(index,1);
            }
            console.log(base.health);
            // Decrement the health
            base.health = base.health - 10;
            console.log(base.health);

            // Remove from the array of bases if destroyed
            if (base.health <= 0){
                bases.splice(i,1);
            }
        }
    }
}


/*
 * Check for an alien -> user bullet collision
 */
function _checkUserHit(bullet, index){
    if (ship.hitBox.X1 <= bullet.X && bullet.X <= ship.hitBox.X2 &&
            ship.hitBox.Y1 <= bullet.Y && bullet.Y <= ship.hitBox.Y2)
        {
            aliens.bullets.splice(index,1);
            ship.lives = ship.lives -  1;
        }

}



/*
 * Handle all drawing calls and incrementing movement
 */
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    /* Draw all the things */
    drawShip();
    drawAliens();
    drawBases();
    drawBullets();
    drawLine();
    drawScore();
    drawLives();
    drawAlienFire();

    /* Check for a random fire event every other cycle. */
    if (fireCheck){
        randomFire();
        fireCheck = false;
    } else {
        fireCheck = true;
    }


    /* Increment moving objects */
    handleIncrements();

    /* If bullets exist, check for a collision */
    if (ship.bullets.length > 0 || aliens.bullets.length > 0){
        collisionDetection();
    }

    /* Check for loss */
    if (ship.lives == 0){
        alert("You LOSE");
        document.location.reload();
    }

    /* Check for win */
    if (game.score == 660){
        alert("You WIN!");
        document.location.reload();
    }


    requestAnimationFrame(draw);
}

createInitialState();
draw();




