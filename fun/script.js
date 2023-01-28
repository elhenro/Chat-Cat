// a pokemon like game, that runs in the browser
// the character is a cat and moves with the arrow keys
// the cat can eat food and get stronger
// the cat can fight other cats
// the cat can level up
// the cat can get new items

// start function to create canvas
function createCanvas() {
    // create canvas element
    const canvas = document.createElement('canvas');
    // set canvas width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // return canvas
    return canvas;
}

// start function to create context
function createContext(canvas) {
    // create context
    const context = canvas.getContext('2d');
    // return context
    return context;
}

// start function to create cat
function createCat() {
    // create cat
    const cat = {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        speed: 10,
        color: 'red',
        draw() {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        },
    };
    // return cat
    return cat;
}

// start function to create food
function createFood() {
    // create food
    const food = {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        color: 'green',
        draw() {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        },
    };
    // return food
    return food;
}

// start function to create enemy
function createEnemy() {
    // create enemy
    const enemy = {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        color: 'blue',
        draw() {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        },
    };
    // return enemy
    return enemy;
}

// start function to create game
function createGame() {
    // create game
    const game = {
        // create game properties
        cat: createCat(),
        food: createFood(),
        enemy: createEnemy(),
        // create game methods
        start() {
            // start game
            this.cat.x = 0;
            this.cat.y = 0;
            this.food.x = 100;
            this.food.y = 100;
            this.enemy.x = 200;
            this.enemy.y = 200;
        },
        draw() {
            // draw game
            this.cat.draw();
            this.food.draw();
            this.enemy.draw();
        },
    };
    // return game
    return game;
}

// create canvas
const canvas = createCanvas();
// get body
const body = document.querySelector('body');
console.log({ body })
body.appendChild(canvas);
// create context
const context = createContext(canvas);
// create game
const game = createGame();
// start game
game.start();
// draw game
game.draw();

// start function to handle key down
function handleKeyDown(event) {
    // get key code
    const keyCode = event.keyCode;
    // check key code
    if (keyCode === 37) {
        // left
        game.cat.x -= game.cat.speed;
    } else if (keyCode === 38) {
        // up
        game.cat.y -= game.cat.speed;
    } else if (keyCode === 39) {
        // right
        game.cat.x += game.cat.speed;
    } else if (keyCode === 40) {
        // down
        game.cat.y += game.cat.speed;
    }
    // draw game
    game.draw();
}

// add event listener to handle key down
document.addEventListener('keydown', handleKeyDown);