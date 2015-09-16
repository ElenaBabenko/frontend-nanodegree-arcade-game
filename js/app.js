// ---- GAME class -----------------------------------
// Sets up generic variables used in the various methods and functions throughout the game
var Game = function() {
    this.rowHeight = 83;
    this.colWidth = 101;
    this.numRows = 6;
    this.numCols = 5;
    this.fieldWidth = this.colWidth * this.numCols;
    this.fieldHeight = this.colWidth * this.numRows;

    this.generateActorCoordinates();

};

// Assigning location of the rows the enemies and player (actors in the game) will be running on
Game.prototype.generateActorCoordinates = function() {

    // creating an array of y coordinates corresponding with 6 rows
    // row 0 - water, which player is trying to reach
    // row 1-3 - stone, where bugs run
    // row 4-5 - grass, where playes starts
    this.actorRowCoord = [];

    for (var i = 0; i < this.numRows; i++) {
        // 63 px is an arbitrary number that corresponds with the y coordinate for the chosen actor images
        // that seemed to visually positioning them in the center of a row
        // by offsetting extra white space at the top of the image
        // If you're changing the enemy image adjust this number accordingly
        var actorImgTopOffset = 63;

        this.actorRowCoord[i] = actorImgTopOffset + this.rowHeight * (this.actorRowCoord.length - 1);
    }
};

// ----- ENEMY class and methods ---------------------
// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // offScreen number is arbitrary, corresponding with the right edge of the bug image
    // If you're changing the enemy image adjust this number accordingly
    this.offScreen = -100;
    this.x = this.offScreen;
    this.speed = speed;
    this.row = row;
    // setting y coordinates for bug rows
    this.y = game.actorRowCoord[row];

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // when enemy gone off screen on the right restart it on the left
    if (this.x > game.fieldWidth) {
        this.x = this.offScreen;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ----- PLAYER class and methods ---------------------
// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.setInitalPosition();
};

// sets initial player position to come back to after position reset
Player.prototype.setInitalPosition = function() {
    // since player image width is exactly the same as column width and the canvas is 5 columns
    // that places the left edge (x coordinates) right at the end of the second column
    // that is why I'm multiplying col width by 2 to arrive at player x coordinates
    this.x = game.colWidth * 2;

    // placing player on the 5th row
    this.y = game.actorRowCoord[5];
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(direction) {
    // Defining player movement based on direction
    // stop moving to the right if player x coord aligns with the right edge of the 4th column
    // which means the player is in the rightmost, 5th column
    if (direction == 'right' && this.x < game.colWidth * 4) {
        this.x = this.x + game.colWidth;
        // stop moving to the left if player x coord aligns with the left edge of the 1st column
        // which means the player is in the leftmost column
    } else if (direction == 'left' && this.x >= game.colWidth) {
        this.x = this.x - game.colWidth;
        // stop moving up if player y coord match those of row 0
    } else if (direction == 'up' && this.y > game.actorRowCoord[0]) {
        this.y = this.y - game.rowHeight;
        // stop moving down if player y coord match those of row 5
    } else if (direction == 'down' && this.y != game.actorRowCoord[5]) {
        this.y = this.y + game.rowHeight;
    }

    // Assigning rows for later when determining collision with enemy
    this.row = game.actorRowCoord.indexOf(this.y);
};


// renders the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// send keys to the update() method
Player.prototype.handleInput = function(move) {
    this.update(move);
};


// Now instantiate your objects.
// Placing game object in a variable called game
var game = new Game();

// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(1, 40), new Enemy(1, 100), new Enemy(2, 20), new Enemy(2, 200), new Enemy(3, 80), new Enemy(3, 120)];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
