let game = document.getElementById('game');
let gameContext = game.getContext('2d');
let player1 = {
    color: 'white',
    paddleHeight: 100,
    x: 0,
    y: game.height / 2,
}

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
        player1.y = mousePos.y;
    });
};

function move(){
    updateBall();
};

function draw(){
    // Draw background
    colorRect(0,0, game.width, game.height, 'black');
    // Draw left paddle
    colorRect(player1.x, player1.y, 10, 100, player1.color);
    // Draw ball
    drawBall(ball.x, ball.y, ball.width, ball.color);
};

function drawBall(x, y, radius, color){
    gameContext.fillStyle = color;
    gameContext.beginPath();
    gameContext.arc(x, y, radius, 0, Math.PI * 2, true);
    gameContext.fill();
};

function updateBall(){
    if (ball.x >= game.width) {
        ball.xSpeed = -ball.xSpeed;
    }
    if (ball.x <= 0){
        ball.xSpeed = -ball.xSpeed;
    }

    if (ball.y >= game.height) {
        ball.ySpeed = -ball.ySpeed;
    }
    if (ball.y <= 0){
        ball.ySpeed = -ball.ySpeed;
    }

    ball.y += ball.ySpeed;
    ball.x += ball.xSpeed;
};

function colorRect(leftX, topY, w, h, drawColor) {
    gameContext.fillStyle = drawColor;
    gameContext.fillRect(leftX, topY, w, h);
};

function getMousePos(event){
    let rect = game.getBoundingClientRect();
    console.log(rect);
    let root = document.documentElement;
    console.log(root.scrollLeft, root.scrollTop);
    let mouseX = event.clientX - rect.left - root.scrollLeft;
    let mouseY = event.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY,
    };
};
