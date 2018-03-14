(() => {
    console.log('Loaded');

    const gameWidth = 768;
    const gameHeight = 512;
    var gameLive = true;
    var level = 1;
    var life = 5;
    var map = {
        cols: 12,
        rows: 12,
        tsize: 64,
        tiles: [
         3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3,
         3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
         3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
         3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
         3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
         3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
         3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
         3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3
        ],
        getTile: function (col, row) {
          return this.tiles[row * map.cols + col];
        }
    };
    var rightKey = false;
    var leftKey = false;
    var upKey = false;
    var downKey = false;
    var spacePressed = false;
    var isMoving = false;
    var spriteWidth = 102;

    //Map image
    var tileSheet = new Image();
    tileSheet.src = 'images/tileset.png';

    //Bugs
    var bugs = [
        {
            x: 200, //x coordinate
            y: 100, //y coordinate
            speedY: 2, //speed in Y
            w: 30, //width
            h: 40, //height
            srcX: 37, //Initial Sprite x Source
            srcY: 0 //Initial Sprite y Source
        },
        {
            x: 300,
            y: 0,
            speedY: 2,
            w: 30,
            h: 40,
            srcX: 37,
            srcY: 0
        },
        {
            x: 430,
            y: 100,
            speedY: 3,
            w: 30,
            h: 40,
            srcX: 37,
            srcY: 0
        },
        {
            x: 550,
            y: 100,
            speedY: -3,
            w: 30,
            h: 40,
            srcX: 0,
            srcY: 0
        }
    ];

    //Bug Image
    // var bugReady = false;
    var bugImage = new Image();
    // bugImage.onload = function () {
    //     bugReady = true;
    // };
    bugImage.src = "images/bugset.png";

    //Hero
    var hero = {
        x: 70,
        y: 250,
        speed: 12,
        w: 33,
        h: 50,
        width: 34,
        height: 50,
        srcX: 34,
        srcY: 51,
        up: 0,
        right: 51,
        down: 102,
        left: 153
    };

    //Hero Image
    // var heroReady = false;
    var heroImage = new Image();
    // heroImage.onload = function () {
    //     heroReady = true;
    // };
    heroImage.src = "images/heroset.png";

    //Ship
    var ship = {
        x: 630,
        y: 250,
        w: 30,
        h: 30
    }

    //Ship Image
    // var shipReady = false;
    var shipImage = new Image();
    // shipImage.onload = function () {
    //     shipReady = true;
    // };
    shipImage.src = "images/ship.png";

    //Returns the drawing context on the canvas
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    // Keyboard
    function keyDownHandler(event) {
        if(event.keyCode == 39) {
            rightKey = true;
            isMoving = true;
        }
        else if(event.keyCode == 37) {
            leftKey = true;
            isMoving = true;
        }
        if(event.keyCode == 40) {
        	downKey = true;
            isMoving = true;
        }
        else if(event.keyCode == 38) {
        	upKey = true;
            isMoving = true;
        }
        if(event.keyCode == 32) {
            spacePressed = true;
        }
    }

    function keyUpHandler(event) {
        if(event.keyCode == 39) {
            rightKey = false;
            isMoving = false;
        }
        else if(event.keyCode == 37) {
            leftKey = false;
            isMoving = false;
        }
        if(event.keyCode == 40) {
        	downKey = false;
            isMoving = false;
        }
        else if(event.keyCode == 38) {
        	upKey = false;
            isMoving = false;
        }
        if(event.keyCode == 32) {
            spacePressed = false;
        }
    }

    //Updated the Game
    var update = function() {
        //Level Won
        if(checkCollision(hero, ship)) {
            alert('Congratulations! Go to Next Level');
            level += 1;
            hero.speed += 3;
            hero.x = 70;
            hero.y = 250;
            hero.srcX = 34;
            hero.srcY = 50;

            // Increases Bug Speed at each level
            for(var ab = 0; ab<bugs.length; ab++){
                if(bugs[ab].speedY > 1){
                bugs[ab].speedY += 1 ;
                }
                else{
                    bugs[ab].speedY -= 1 ;
                }
            }
        }

        //Keyboard Move Hero and Define Sprite Sheet
        if (isMoving) {
            if(rightKey == true) {
                hero.x += hero.speed,
                hero.srcY = hero.right
            }
            else if(leftKey == true) {
                hero.x -= hero.speed,
                hero.srcY = hero.left
            }
            else if(downKey == true) {
                hero.y += hero.speed,
                hero.srcY = hero.down
            }
            else if(upKey == true) {
                hero.y -= hero.speed,
                hero.srcY = hero.up
            }

            hero.srcX += hero.width;

            if (hero.srcX >= spriteWidth) {
            hero.srcX = 0;
            }
        }

        // Bugs Var
        var i = 0;
        var n = bugs.length;

        // Bugs Functions (Move, Collision)
        bugs.forEach(function(bug, index) {
          //Lose Live at Collision with Bug
            if(checkCollision(hero, bug)) {
                //Stop the Game and Reduce Life
                if(life === 0) {
                    alert('Game Over'); // If lives === 0 then Game Over
                    for(var ab = 0; ab < bugs.length; ab++){
                        if(bugs[ab].speedY > 1){
                            bugs[ab].speedY -= (level - 1) ;
                        }
                        else {
                            bugs[ab].speedY += (level - 1) ;
                        }
                    }
                    level = 1;
                    life = 6;
                    hero.speed = 12;
                }
                if(life > 0) {
                    life -= 1 ;
                }
                hero.x = 70;
                hero.y = 250;
                hero.srcX = 34;
                hero.srcY = 50;
            }

            //Move the Bugs
            bug.y += bug.speedY;

            //Define Borders for Bugs
            if(bug.y <= 60) {
                bug.y = 60;
                bug.speedY *= -1;
                bug.srcX = 37;
                bug.srcY = 0;
            }
            else if(bug.y >= gameHeight - 110) {
                bug.y = gameHeight - 110;
                bug.speedY *= -1;
                bug.srcX = 0;
                bug.srcY = 0;
            }
        });

        //Define Map Borders for Hero
        if(hero.y <= 60) {
            hero.y = 60;
        }
        else if(hero.y >= gameHeight - 110) {
            hero.y = gameHeight - 110;
        }
        if(hero.x <= 64) {
            hero.x = 64;
        }
        else if(hero.x >= gameWidth - 90) {
            hero.x = gameWidth - 90;
        }
    };

    //Draw the map
    function drawMap() {
        for (var c = 0; c < map.cols; c++) {
            for (var r = 0; r < map.rows; r++) {
                var tile = map.getTile(c, r);
                if (tile !== 0) { // 0 => empty tile
                    ctx.drawImage(
                        tileSheet, // image
                        (tile - 1) * map.tsize, // source x
                        0, // source y
                        map.tsize, // source width
                        map.tsize, // source height
                        c * map.tsize,  // target x
                        r * map.tsize, // target y
                        map.tsize, // target width
                        map.tsize // target height
                    );
                }
            }
        }
    }

    //Draw the Game
    var draw = function() {
        //Clear the Canvas
        // ctx.clearRect(0,0,gameWidth,gameHeight);

        //Draw Canvas
        drawMap();
        document.querySelector('#level').textContent = "Level: " + level, 10, 15;
        document.querySelector('#lifes').textContent = "Life: " + life, 10, 35;

        //Draw Hero
        ctx.drawImage(heroImage, hero.srcX, hero.srcY, hero.width, hero.height, hero.x, hero.y, hero.width, hero.height);

        //Draw Bugs
        bugs.forEach(function(bug, index){
             ctx.drawImage(bugImage, bug.srcX, bug.srcY, 37, 50, bug.x, bug.y, 37, 50);
        });

        //Draw Ship
        ctx.drawImage(shipImage, ship.x, ship.y);
    };

    //Game Loop
    var init = function() {
        update();
        draw();
        if(gameLive) {
            window.requestAnimationFrame(init);
        isMoving = false;
        }
    };

    //Define Collision Area
    var checkCollision = function(area1, area2) {
        var colWidth = Math.abs(area1.x - area2.x) <= Math.max(area1.w, area2.w);
        var colHeight = Math.abs(area1.y - area2.y) <= Math.max(area1.h, area2.h);
        return colWidth && colHeight;
    }

    //Event Listeners
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    //Initialize
    init();

})();
