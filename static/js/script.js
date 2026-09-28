// HOME and Character Customization
// const dynamicId = "board-id";
// const canvasID = document.getElementById(dynamicId);

// const startScreen = document.querySelector("#start-screen");
// const charScreen = document.querySelector("#char-screen");
// const gameScreen = document.querySelector("#game-screen");

// const playButton = document.querySelector("#play-button");

// playButton.addEventListener("click", () => {
//     startScreen.hidden = true;
//     charScreen.hidden = false;
// });

function createImage(src){
    const image = new Image();
    image.src = src;
    return image;
}

const characters = {
    yotsugi: {
        snake: createImage("../static/images/yotsugi/snake.jpg"),
        food: createImage("../static/images/yotsugi/food.jpg")
        // background: "../static/images/yotsugi/background.png"
    },

    shinobu: {
        snake: createImage("../static/images/shinobu/snake.jpg"),
        food: createImage("../static/images/shinobu/food.jpg")
        // background: "../static/images/shinobu/background.png"
    }
};

let currentChara = characters.yotsugi;

// function charaSelection(chara){
//     switch (chara) {
//         case "yotsugi":
//             canvasID.id = "yotsugiCanvas";
//             break;

//         case "shinobu":
//             canvasID.id = "shinobuCanvas";
//             break;
        
//         default:
//             canvasID.id = "shinobuCanvas";
//             break;
//     }
// }



// variables and constants

let score = 0;
let highScore = 0;
let lastUpdate = 0;
const updateInterval = 100;
let snakeArr = [
    {x:7 , y:7}
];
let food = {x: 0 , y: 0};
let velocity = {x:0 , y:0};


// CANVAS
const fgCanvas = document.getElementById("board-id"); //change
const bgCanvas = document.getElementById("board-bg");
const fgctx = fgCanvas.getContext('2d');
const bgctx = bgCanvas.getContext('2d');

// Grid Configuration
const cellSize = 40;
const boardSize = 15;
const canvasSize = boardSize * cellSize;

// Grass Color
const lightGrass = '#4c9a2a';
const darkGrass = '#3b7a1e';




// Functions

// Drawing the Canvas
function drawGameBoard() {
    for (let r = 0; r < boardSize; r++){
        for (let c = 0; c < boardSize; c++){
            if ((r+c)%2 == 0){
                bgctx.fillStyle = lightGrass;
            }else{
                bgctx.fillStyle = darkGrass;
            }

            const x = c * cellSize;
            const y = r * cellSize;
            bgctx.fillRect(x, y, cellSize, cellSize);
        }
    }
}

function drawForeground() {
    // Remove prevoius frame
    fgctx.clearRect(0,0, fgCanvas.width, fgCanvas.height);

    drawFood();
    drawSnake();
}

// Game Loop
function main(timestamp) {
    window.requestAnimationFrame(main);

    if (timestamp - lastUpdate >= updateInterval) {
        lastUpdate = timestamp;
        gameEngine();
    }
}



function gameEngine() {
    updateSnake();

    if (collision(snakeArr)) {
        score = 0;
        window.location.reload();
    }

    //Visuals
    drawForeground();   
}

// MOVEMENT
function updateSnake(){
    //make a new head
    const newHead = { x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y};

    snakeArr.unshift(newHead); //make it the first item of the snake array, aka the head.

    // EAT?
    if(newHead.x === food.x && newHead.y === food.y) {
        score ++;
        if (score > highScore){
            highScore = score;
        }
        placeFood();
    }
    else { // Didn't eat
        snakeArr.pop(); // remove the tail
    }

}

// collision with body or walls
function collision(snake){
    for (let i = 1; i < snake.length; i++){
        // position of any part of body == position of head
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //boundaries
    if (snake[0].x >= boardSize || snake[0].x < 0 || snake[0].y >= boardSize || snake[0].y <  0){
        return true;
    }

    return false;
}

// randomly place food
function placeFood(){
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };
}

// draw the sprites of food
function drawFood(){
    fgctx.drawImage(currentChara.food, food.x * cellSize, food.y * cellSize, cellSize, cellSize);

}

// draw the sprites of snake
function drawSnake(){
    for (const segment of snakeArr){
        fgctx.drawImage(currentChara.snake, segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    }
}

// Keyboard Input
window.addEventListener('keydown', e =>{
    switch (e.key) {
        case "ArrowUp":
            if(velocity.y != 1){
                velocity.x = 0;
                velocity.y = -1;
            }
            break;
        
        case "ArrowDown":
            if(velocity.y != -1){
                velocity.x = 0;
                velocity.y = 1;
            }
            break;
        
        case "ArrowLeft":
            if(velocity.x != 1){
                velocity.x = -1;
                velocity.y = 0;
            }
            break;

        case "ArrowRight":
            if(velocity.x != -1){
                velocity.x = 1;
                velocity.y = 0;
            }
            break;
        default:
            break;
    }
});

drawGameBoard();
placeFood();
drawForeground();
window.requestAnimationFrame(main);

