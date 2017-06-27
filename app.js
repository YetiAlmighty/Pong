let game = document.getElementById('game');
let gameContext = game.getContext('2d');
let player1 = {
    color: 'white',
    paddleHeight: 100,
    x: 0,
    y: 250,
};

let ball = {
    x: game.width / 2,
    y: game.height / 2,
    width: 10,
    color: 'white',
    xSpeed: 10,
    ySpeed: 4,
};

window.onload = () => {
    let fps = 1000 / 60;
    setInterval(() => {
        move();
        draw();
    }, fps);
    game.addEventListener('mousemove', event => {
        let mousePos = getMousePos(event);
        // Centers the paddle where the mouse is
        player1.y = mousePos.y - (player1.paddleHeight / 2);
    });
};

function move(){
    updateBall();
}

function draw(){
    // Draw background
    colorRect(0,0, game.width, game.height, 'black');
    // Draw left paddle
    colorRect(player1.x, player1.y, 10, 100, player1.color);
    // Draw ball
    drawBall(ball.x, ball.y, ball.width, ball.color);
}

function drawBall(x, y, radius, color){
    gameContext.fillStyle = color;
    gameContext.beginPath();
    // Location (x,y), size, start angle, a circle (2PI * r)
    gameContext.arc(x, y, radius, 0, Math.PI * 2, true);
    //Actually draws from previous calls.
    gameContext.fill();
}

function updateBall(){
    // Controls ball x movement
    if (ball.x >= game.width) {
        //  if its going out of bounds on the right
        //  reverse
        ball.xSpeed = -ball.xSpeed;
    }
    if (ball.x <= 0){
        //If its oob on the left
        ball.xSpeed = -ball.xSpeed;
    }

    if (ball.y >= game.height) {
        // bottom of the canvas
        ball.ySpeed = -ball.ySpeed;
    }
    if (ball.y <= 0){
        // 0 is the top of the canvas
        ball.ySpeed = -ball.ySpeed;
    }

    //Always moving the ball
    ball.y += ball.ySpeed;
    ball.x += ball.xSpeed;
}

function colorRect(leftX, topY, w, h, drawColor) {
    gameContext.fillStyle = drawColor;
    gameContext.fillRect(leftX, topY, w, h);
}

function getMousePos(event){
    // Gets the size of the game area
    let rect = game.getBoundingClientRect();
    //Returns the HTML for the page.
    let root = document.documentElement;
    // Forces out mouse x and y to  stay within the limits of the canvas
    // by taking our events (MouseMove) clientX and clientY
    // and removing the boundary/padding from the where the mouse is
    // along with how much you're scrolled in any direction.
    let mouseX = event.clientX - rect.left - root.scrollLeft;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY,
    };
}
