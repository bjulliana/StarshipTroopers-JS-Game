(() => {
    console.log('Loaded');

    const GAME_WIDTH = 768;
    const GAME_HEIGHT = 512;
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
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var spacePressed = false;

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
            h: 40, //heght
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
    var bugReady = false;
    var bugImage = new Image();
    bugImage.onload = function () {
        bugReady = true;
    };
    bugImage.src = "images/bugset.png";

    //Hero
    var hero = {
        x: 70,
        y: 250,
        speed: 2,
        w: 28,
        h: 50,
        srcX: 34,
        srcY: 50,
    };

    //Hero Image
    var heroReady = false;
    var heroImage = new Image();
    heroImage.onload = function () {
        heroReady = true;
    };
    heroImage.src = "images/heroset.png";

    //Ship
    var ship = {
        x: 630,
        y: 250,
        w: 30,
        h: 30
    }

    //Ship Image
    var shipReady = false;
    var shipImage = new Image();
    shipImage.onload = function () {
        shipReady = true;
    };
    shipImage.src = "images/ship.png";

    //Returns the drawing context on the canvas
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    // Keyboard
    function keyDownHandler(event) {
        if(event.keyCode == 39) {
            rightPressed = true;
        }
        else if(event.keyCode == 37) {
            leftPressed = true;
        }
        if(event.keyCode == 40) {
        	downPressed = true;
        }
        else if(event.keyCode == 38) {
        	upPressed = true;
        }
        if(event.keyCode == 32) {
            spacePressed = true;
        }
    }

    function keyUpHandler(event) {
        if(event.keyCode == 39) {
            rightPressed = false;
        }
        else if(event.keyCode == 37) {
            leftPressed = false;
        }
        if(event.keyCode == 40) {
        	downPressed = false;
        }
        else if(event.keyCode == 38) {
        	upPressed = false;
        }
        if(event.keyCode == 32) {
            spacePressed = false;
        }
    }

    //update the logic
    var update = function() {
        //Check if Level Won
        if(checkCollision(hero, ship)) {
            alert('Congratulations! On to the Next Level');
            level += 1;
            hero.speed += 1;
            hero.x = 70;
            hero.y = 250;
            hero.srcX = 34;
            hero.srcY = 50;

            for(var ab = 0; ab<bugs.length; ab++){
                if(bugs[ab].speedY > 1){
                bugs[ab].speedY += 1 ;
                }
                else{
                    bugs[ab].speedY -= 1 ;
                }
            }
        }

        //Keyboard Move
            if(rightPressed == true) {
                hero.x += hero.speed,
                hero.srcX = 34,
                hero.srcY = 50
            }
            else if(leftPressed == true) {
                hero.x -= hero.speed,
                hero.srcX = 34,
                hero.srcY = 150
            }
            else if(downPressed == true) {
                hero.y += hero.speed,
                hero.srcX = 34,
                hero.srcY = 100
            }
            else if(upPressed == true) {
                hero.y -= hero.speed,
                hero.srcX = 34,
                hero.srcY = 0
            }
            else if(spacePressed) {
                console.log(hero.x, hero.y, hero.srcX, hero.srcY);
            }
            // else {
            //     hero.x = hero.x;
            //     hero.y = hero.y;
            // }

        //Update the Bugs
        var i = 0;
        var n = bugs.length;

        bugs.forEach(function(element, index){
          //Check for Collision with Bug
            if(checkCollision(hero, element)) {
                //Stop the Game and Reduce Life
                if(life === 0){
                    alert('Game Over');
                    for(var ab = 0; ab < bugs.length; ab++){
                        if(bugs[ab].speedY > 1){
                            bugs[ab].speedY -= (level - 1) ;
                        }
                        else{
                            bugs[ab].speedY += (level - 1) ;
                        }
                    }
                    level = 1;
                    life = 6;
                    hero.speed = 2;
                }
                if(life > 0){
                    life -= 1 ;
                }
                hero.x = 70;
                hero.y = 250;
                hero.srcX = 34;
                hero.srcY = 50;
            }

            //Move the Bugs
            element.y += element.speedY;

            //Define Borders for Bugs
            if(element.y <= 60) {
                element.y = 60;
                element.speedY *= -1;
                element.srcX = 37;
                element.srcY = 0;
            }
            else if(element.y >= GAME_HEIGHT - 110) {
                element.y = GAME_HEIGHT - 110;
                element.speedY *= -1;
                element.srcX = 0;
                element.srcY = 0;
            }
        });

        //Define Map Borders for Hero
        if(hero.y <= 60) {
            hero.y = 60;
        }
        else if(hero.y >= GAME_HEIGHT - 110) {
            hero.y = GAME_HEIGHT - 110;
        }
        else if(hero.x <= 64) {
            hero.x = 64;
        }
        else if(hero.x >= GAME_WIDTH - 90) {
            hero.x = GAME_WIDTH - 90;
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
        // ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

        //Draw Canvas
        drawMap();
        ctx.font = "15px Verdana";
        ctx.fillText("Level: " + level, 10, 15);
        ctx.fillText("Life: " + life, 10, 35);
        ctx.fillText("Speed: " + hero.speed, 10, 55);

        //Draw Hero
        ctx.drawImage(heroImage, hero.srcX, hero.srcY, 34, 50, hero.x, hero.y, 34, 50);

        //Draw Bugs
        bugs.forEach(function(element, index){
             ctx.drawImage(bugImage, element.srcX, element.srcY, 37, 50, element.x, element.y, 37, 50);
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
