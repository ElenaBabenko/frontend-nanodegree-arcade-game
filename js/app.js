// ----- ENEMY class and methods ---------------------
// Enemies our player must avoid
var Enemy = function(posY,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -95;
    this.y = posY;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // when enemy gone off screen on the right restart it on the left
    if (this.x > 505) {
        this.x = -95;
    }

    // Assigning rows for later when determining collision with player
    if (this.y == 63) {
        this.row = 1;
    } else if (this.y == 146) {
        this.row = 2;
    } else if (this.y == 229) {
        this.row = 3;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// ----- PLAYER class and methods ---------------------
// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.setInitalPosition();
}

// sets initial player position to come back to after position reset
Player.prototype.setInitalPosition = function() {
    this.x = 200;
    this.y = 400;
};


// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(direction) {
// Defining player movement based on direction
    if (direction == 'right' && this.x <= 303) {
        this.x = this.x + 101;
    } else if (direction == 'left' && this.x >= 0) {
        this.x = this.x - 101;
    } else if (direction == 'up' && this.y > 0) {
        this.y = this.y - 83;
    } else if (direction == 'down' && this.y != 400) {
        this.y = this.y + 83;
    }

// Assigning rows for later when determining collision with enemy
    if (this.y == -15) {
        this.row = 0;
    } else if (this.y == 68) {
        this.row = 1;
    } else if (this.y == 151) {
        this.row = 2;
    } else if (this.y == 234) {
        this.row = 3;
    } else if (this.y == 317) {
        this.row = 4;
    } else if (this.y == 400) {
        this.row = 5;
    }

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
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(63,40),new Enemy(63,200),new Enemy(146,20),new Enemy(229,80),new Enemy(146,150),new Enemy(229,80)];

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
