let game = document.getElementById('game');
let gameContext = game.getContext('2d');
let hit1 = new Audio('./hit1.wav');
let hit2 = new Audio('./hit2.wav');
let maxScore = 5;
let gameOver = true;

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
        xSpeed: 10,
        ySpeed: 4,
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
        draw();
    }, fps);
    game.addEventListener('mousemove', event => {
        let mousePos = getMousePos(event);
        // Centers the paddle where the mouse is
        player1.y = mousePos.y - (player1.paddleHeight / 2);
    });
    game.addEventListener('mousedown', () => {
        player1.score = 0;
        player2.score = 0;
        gameOver = false;
    });
};
function comp1(){
    let center = player2.y + (player2.paddleHeight / 2);
    if (center < ball.y - 35) {
        player2.y += 6;
    } else if(center > ball.y + 35){
        player2.y -= 6;
    }
}
function draw(){
    if(gameOver){
        colorRect(0,0, game.width, game.height, 'black');
        gameContext.fillStyle = 'white';
        let winner = player1.score > player2.score ? '1' : '2';
        gameContext.fillText(`GAME OVER - PLAYER ${winner} WINS`, game.centerX - 50, game.centerY);
        gameContext.fillText('Click to continue', game.centerX - 25, game.centerY + 20);
    } else {
        updateBall();
        comp1();
        // Draw background
        colorRect(0,0, game.width, game.height, 'black');
        drawNet();
        // Draw left paddle
        colorRect(player1.x,
                player1.y,
                player1.size,
                player1.paddleHeight,
                player1.color);
        // Draw right paddle
        colorRect(player2.x,
                player2.y,
                player2.size,
                player2.paddleHeight,
                player2.color);
        // Draw ball
        drawBall(ball.x, ball.y, ball.width, ball.color);
        //Draw Scores
        gameContext.fillText(player1.score,100, 50);
        gameContext.fillText(player2.score, game.width - 100, 50);
    }
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

        if(ball.y > player1.y - 10 && ball.y < player1.y + player1.paddleHeight + 10){
            hit1.play();
            ball.xSpeed = -ball.xSpeed;
            let center = ball.y - (player1.y + player1.paddleHeight /2);
            ball.ySpeed = center * 0.35;
        } else {
            player2.score++;
            ballReset();
        }
    }

    if (ball.x > game.width) {

        if(ball.y > player2.y - 10 && ball.y < player2.y + player2.paddleHeight + 10){
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
    if(player1.score >= maxScore || player2.score >= maxScore){
        gameOver = true;
    } else {
        ball.x = ball.default.x;
        ball.y = ball.default.y;
        ball.xSpeed = ball.default.xSpeed;
        ball.ySpeed = ball.default.ySpeed;
        // Randomize the direction depending on if
        if(Math.round(Math.random())){
            ball.xSpeed = -ball.xSpeed;
        }
        if(Math.round(Math.random())){
            ball.ySpeed = -ball.ySpeed;
        }
    }
}

function drawNet(){
    for (var i = 0; i < game.height; i+= 40) {
        colorRect(game.width/2-1, i, 2, 20, 'white');
    }
}
