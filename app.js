let game = document.getElementById('game');
let gameContext = game.getContext('2d');
let hit1 = new Audio('./assets/hit1.wav');
let hit2 = new Audio('./assets/hit2.wav');
game.centerX = game.width / 2;
game.centerY = game.height / 2;

let ball = {
    x: game.width / 2,
    y: game.height / 2,
    width: 10,
    color: 'white',
    xSpeed: 10,
    ySpeed: 4,
    default: {
        x: game.width / 2,
        y: game.height / 2,
    }
};

let player1 = {
    color: 'white',
    paddleHeight: 100,
    x: 0,
    y: 0,
    score: 0,
    size: 10,
};

let player2 = {
    color: 'white',
    paddleHeight: player1.paddleHeight,
    x: game.width - 10,
    y: 0,
    size: 10,
    score: 0,
}
player1.y = game.centerY - (player1.paddleHeight / 2);


window.onload = () => {
    let fps = 1000 / 60;
    setInterval(() => {
        updateBall();
        draw();
    }, fps);
    game.addEventListener('mousemove', event => {
        let mousePos = getMousePos(event);
        // Centers the paddle where the mouse is
        player1.y = mousePos.y - (player1.paddleHeight / 2);
    });
};

function draw(){
    // Draw background
    colorRect(0,0, game.width, game.height, 'black');
    // Draw left paddle
    colorRect(player1.x,
            player1.y,
            player1.size,
            player1.paddleHeight,
            player1.color);
    // Draw right paddle
    colorRect(player2.x,
            ball.y - (player2.paddleHeight / 2),
            player2.size,
            player2.paddleHeight,
            player2.color);
    player2.y = ball.y - (player2.paddleHeight / 2);
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
    if (ball.x < 10) {

        if(ball.y > player1.y - 5 && ball.y < player1.y + player1.paddleHeight + 5){
            hit1.play();
            ball.xSpeed = -ball.xSpeed;
        } else {
            player2.score++;
            ballReset();
        }
    }

    if (ball.x > game.width) {

        if(ball.y > player2.y && ball.y < player2.y + player2.paddleHeight){
            hit2.play();
            ball.xSpeed = -ball.xSpeed;
        } else {
            player1.score++;
            ballReset();
        }
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

function ballReset() {
    ball.x = ball.default.x;
    ball.y = ball.default.y;

    // Randomize the direction depending on if
    if(Math.round(Math.random())){
        ball.xSpeed = -ball.xSpeed;
    }
    if(Math.round(Math.random())){
        ball.ySpeed = -ball.ySpeed;
    }
}
